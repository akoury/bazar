<?php

namespace Tests\Feature\Products;

use Tests\TestCase;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Attribute;
use App\Models\ProductModel;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Queue;
use App\Jobs\ProcessProductModelImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AddProductTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp()
    {
        parent::setUp();
        Storage::fake('public');
    }

    /** @test */
    public function a_user_can_view_the_add_product_form_for_his_brand()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->get(route('products.create', $brand));

        $response->assertStatus(200);
    }

    /** @test */
    public function a_user_cannot_view_the_add_product_form_for_a_brand_he_does_not_own()
    {
        $this->signIn();
        $brand = $this->create('Brand');

        $response = $this->get(route('products.create', $brand));

        $response->assertStatus(404);
    }

    /** @test */
    public function guests_cannot_view_the_add_product_form_for_a_brand()
    {
        $brand = $this->create('Brand');

        $this->get(route('products.create', $brand))
            ->assertStatus(302)
            ->assertRedirect(route('login'));
    }

    /** @test */
    public function a_user_can_add_a_product_to_his_brand()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->post(route('products.store', $brand), [
            'name'          => 'iPhone 8',
            'description'   => 'The new iPhone',
            'published'     => true,
            'product_image' => UploadedFile::fake()->image('product-image.png'),
            'products'      => json_encode([
                [
                    'price'         => '700.50',
                    'item_quantity' => 2,
                ]
            ])
        ]);

        $product = Product::first();

        $response->assertStatus(201)
            ->assertJsonFragment([$product->model->url()]);

        $this->assertEquals('iPhone 8', $product->name);
        $this->assertEquals('The new iPhone', $product->description);
        $this->assertTrue($product->published);
        $this->assertTrue($product->brand->is($brand));
        $this->assertEquals(70050, $product->price);
        $this->assertEquals(2, $product->itemsRemaining());
    }

    /** @test */
    public function a_product_can_have_attributes_associated_to_it()
    {
        $brand = $this->brandForSignedInUser();

        $attributeA = $this->create('Attribute', 1, ['name' => 'COLOR']);
        $attributeB = $this->create('Attribute', 1, ['name' => 'capacity']);

        $response = $this->from(route('products.create', $brand))->post(route('products.store', $brand), $this->validParams([
            'products' => json_encode([
                [
                    'price'         => '700.50',
                    'item_quantity' => 2,
                    'attributes'    => [
                        $attributeA->name => 'BLACK',
                        $attributeB->name => '32gb'
                    ]
                ]
            ])
        ]));

        $product = Product::first();
        $this->assertEquals('color', $product->values->first()->attribute->name);
        $this->assertTrue($product->values->last()->attribute->is($attributeB));
        $this->assertEquals('black', $product->values->first()->name);
        $this->assertEquals('32gb', $product->values->last()->name);
        $this->assertEquals('color', $product->values->first()->attribute->name);
        $this->assertTrue($product->values->last()->attribute->is($attributeB));
    }

    /** @test */
    public function a_user_can_add_multiple_products_from_the_same_model_to_his_brand()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->post(route('products.store', $brand), [
            'name'          => 'iPhone 8',
            'description'   => 'The new iPhone',
            'published'     => true,
            'product_image' => UploadedFile::fake()->image('product-image.png'),
            'products'      => json_encode([
                [
                    'price'         => '700.50',
                    'item_quantity' => 2
                ],
                [
                    'price'         => '200.50',
                    'item_quantity' => 1
                ],
            ]),
        ]);

        $model = ProductModel::first();

        $response->assertStatus(201)
            ->assertJsonFragment([$model->url()]);

        $this->assertEquals('iPhone 8', $model->name);
        $this->assertEquals('The new iPhone', $model->description);
        $this->assertTrue($model->published);
        $this->assertTrue($model->brand->is($brand));
        $this->assertEquals(70050, $model->products->first()->price);
        $this->assertEquals(2, $model->products->first()->itemsRemaining());
        $this->assertEquals(20050, $model->products->last()->price);
        $this->assertEquals(1, $model->products->last()->itemsRemaining());
    }

    private function validParams($overrides = [])
    {
        return array_replace_recursive([
            'name'          => 'iPhone 8',
            'description'   => 'The new iPhone',
            'published'     => true,
            'product_image' => UploadedFile::fake()->image('product-image.png'),
            'products'      => json_encode([
                [
                    'price'         => '700.50',
                    'item_quantity' => 2,
                ]
            ])
        ], $overrides);
    }

    /** @test */
    public function a_user_cannot_add_a_product_to_a_brand_he_does_not_own()
    {
        $this->signIn();
        $brand = $this->create('Brand');

        $response = $this->post(route('products.store', $brand), $this->validParams());

        $response->assertStatus(404);
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function a_guest_cannot_add_a_product()
    {
        $brand = $this->create('Brand');

        $this->post(route('products.store', $brand), $this->validParams())
            ->assertStatus(302)
            ->assertRedirect(route('login'));

        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function product_image_is_uploaded()
    {
        Queue::fake();
        $brand = $this->brandForSignedInUser();
        $file = UploadedFile::fake()->image('product-image.png');

        $response = $this->post(route('products.store', $brand), $this->validParams([
            'product_image' => $file
        ]));
        $product = Product::first();

        $this->assertNotNull($product->image_path);
        Storage::disk('public')->assertExists($product->image_path);
        $this->assertFileEquals($file->getPathname(), Storage::disk('public')->path($product->image_path));
    }

    /** @test */
    public function an_image_optimizer_job_is_queued_when_a_product_is_created()
    {
        Queue::fake();
        $brand = $this->brandForSignedInUser();

        $response = $this->post(route('products.store', $brand), $this->validParams());

        $model = ProductModel::first();

        Queue::assertPushed(ProcessProductModelImage::class, function ($job) use ($model) {
            return $job->model->is($model);
        });
    }

    /** @test */
    public function name_is_required_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->from(route('products.create', $brand))->post(route('products.store', $brand), $this->validParams([
            'name' => ''
        ]));

        $this->assertValidationError($response, 'name', route('products.create', $brand));
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function description_is_required_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->from(route('products.create', $brand))->post(route('products.store', $brand), $this->validParams([
            'description' => ''
        ]));

        $this->assertValidationError($response, 'description', route('products.create', $brand));
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function published_must_be_boolean_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->from(route('products.create', $brand))->post(route('products.store', $brand), $this->validParams([
            'published' => 'not-a-boolean'
        ]));

        $this->assertValidationError($response, 'published', route('products.create', $brand));
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function products_are_required_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->from(route('products.create', $brand))->post(route('products.store', $brand), $this->validParams([
            'products' => ''
        ]));

        $this->assertValidationError($response, 'products', route('products.create', $brand));
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function products_must_be_json_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->from(route('products.create', $brand))->post(route('products.store', $brand), $this->validParams([
            'products' => 'not-json'
        ]));

        $this->assertValidationError($response, 'products', route('products.create', $brand));
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function price_is_required_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->from(route('products.create', $brand))->post(route('products.store', $brand), $this->validParams([
            'products' => [
                ['price' => '']
            ]
        ]));

        $this->assertValidationError($response, 'products.*.price', route('products.create', $brand));
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function price_must_be_numeric_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->from(route('products.create', $brand))->post(route('products.store', $brand), $this->validParams([
            'products' => [
                ['price' => 'not-numeric']
            ]
        ]));

        $this->assertValidationError($response, 'products.*.price', route('products.create', $brand));
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function price_must_be_0_or_more_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->from(route('products.create', $brand))->post(route('products.store', $brand), $this->validParams([
            'products' => [
                ['price' => '-1']
            ]
        ]));

        $this->assertValidationError($response, 'products.*.price', route('products.create', $brand));
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function item_quantity_is_required_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->from(route('products.create', $brand))->post(route('products.store', $brand), $this->validParams([
            'products' => [
                ['item_quantity' => '']
            ]
        ]));

        $this->assertValidationError($response, 'products.*.item_quantity', route('products.create', $brand));
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function item_quantity_must_be_an_integer_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->from(route('products.create', $brand))->post(route('products.store', $brand), $this->validParams([
            'products' => [
                ['item_quantity' => '1.3']
            ]
        ]));

        $this->assertValidationError($response, 'products.*.item_quantity', route('products.create', $brand));
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function item_quantity_must_be_0_or_more_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->from(route('products.create', $brand))->post(route('products.store', $brand), $this->validParams([
            'products' => [
                ['item_quantity' => '-1']
            ]
        ]));

        $this->assertValidationError($response, 'products.*.item_quantity', route('products.create', $brand));
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function product_image_must_be_an_image()
    {
        $brand = $this->brandForSignedInUser();
        $file = UploadedFile::fake()->create('not-an-image.pdf');

        $response = $this->from(route('products.create', $brand))->post(route('products.store', $brand), $this->validParams([
            'product_image' => $file
        ]));

        $this->assertValidationError($response, 'product_image', route('products.create', $brand));
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function product_image_is_required_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->from(route('products.create', $brand))->post(route('products.store', $brand), $this->validParams([
            'product_image' => null
        ]));

        $this->assertValidationError($response, 'product_image', route('products.create', $brand));
        $this->assertEquals(0, Product::count());
    }
}
