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

class CreateProductModelTest extends TestCase
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

        $this->get(route('product-models.create', $brand))
            ->assertStatus(200);
    }

    /** @test */
    public function a_user_cannot_view_the_add_product_form_for_a_brand_he_does_not_own()
    {
        $this->signIn();
        $brand = $this->create('Brand');

        $this->get(route('product-models.create', $brand))
            ->assertStatus(404);
    }

    /** @test */
    public function guests_cannot_view_the_add_product_form_for_a_brand()
    {
        $brand = $this->create('Brand');

        $this->get(route('product-models.create', $brand))
            ->assertStatus(302)
            ->assertRedirect(route('login'));
    }

    /** @test */
    public function a_user_can_add_a_product_to_his_brand()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), [
            'name'           => 'iPhone 8',
            'description'    => 'The new iPhone',
            'published'      => true,
            'product_images' => [UploadedFile::fake()->image('product-image.png')],
            'products'       => json_encode([
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
    public function a_user_can_add_multiple_products_from_the_same_model_to_his_brand()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), [
            'name'           => 'iPhone 8',
            'description'    => 'The new iPhone',
            'published'      => true,
            'product_images' => [UploadedFile::fake()->image('product-image.png')],
            'products'       => json_encode([
                [
                    'price'         => '700.50',
                    'item_quantity' => 2
                ],
                [
                    'price'         => '200.50',
                    'item_quantity' => 0
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
        $this->assertEquals(0, $model->products->last()->itemsRemaining());
    }

    /** @test */
    public function a_user_can_add_products_with_attributes_associated_to_it()
    {
        $brand = $this->brandForSignedInUser();

        $attributeA = $this->create('Attribute', 1, ['name' => 'COLOR']);
        $attributeB = $this->create('Attribute', 1, ['name' => 'capacity']);

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'products' => [
                [
                    'price'         => '700.50',
                    'item_quantity' => 2,
                    'attributes'    => [
                        $attributeA->name => 'BLACK',
                        'capaCity'        => '32gb'
                    ]
                ],
                [
                    'price'         => '800.50',
                    'item_quantity' => 1,
                    'attributes'    => [
                        $attributeA->name => 'Gold',
                        'capaCity'        => '32gb'
                    ]
                ]
            ]
        ]));

        $products = Product::all();

        $this->assertEquals('color', $products->first()->values->first()->attribute->name);
        $this->assertTrue($products->first()->values->first()->attribute->is($attributeA));
        $this->assertTrue($products->first()->values->last()->attribute->is($attributeB));
        $this->assertEquals('black', $products->first()->values->first()->name);
        $this->assertEquals('32gb', $products->first()->values->last()->name);
        $this->assertTrue($products->first()->values->first()->attribute->is($attributeA));
        $this->assertTrue($products->first()->values->last()->attribute->is($attributeB));
        $this->assertTrue($products->last()->values->first()->attribute->is($attributeA));
        $this->assertEquals('capacity', $products->last()->values->last()->attribute->name);
    }

    private function validParams($overrides = [])
    {
        $params = array_replace_recursive([
            'name'           => 'iPhone 8',
            'description'    => 'The new iPhone',
            'published'      => true,
            'product_images' => [UploadedFile::fake()->image('product-image.png')],
            'products'       => [
                [
                    'price'         => '700.50',
                    'item_quantity' => 2,
                ]
            ]
        ], $overrides);

        $params['products'] = json_encode($params['products']);

        return $params;
    }

    /** @test */
    public function a_user_cannot_add_a_product_to_a_brand_he_does_not_own()
    {
        $this->signIn();
        $brand = $this->create('Brand');

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams());

        $response->assertStatus(404);
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function a_guest_cannot_add_a_product()
    {
        $brand = $this->create('Brand');

        $this->json('POST', route('product-models.store', $brand), $this->validParams())
            ->assertStatus(401);

        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function product_images_are_uploaded_when_creating_a_product()
    {
        Queue::fake();
        $brand = $this->brandForSignedInUser();
        $file = UploadedFile::fake()->image('product-image.png');

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'product_images' => [$file]
        ]));
        $product = Product::first();

        $this->assertNotNull($product->image_path);
        Storage::disk('public')->assertExists($product->image_path);
        $this->assertFileEquals($file->getPathname(), Storage::disk('public')->path($product->image_path));
    }

    /** @test */
    public function a_user_can_add_a_product_with_multiple_images()
    {
        Queue::fake();
        $brand = $this->brandForSignedInUser();
        $files = [UploadedFile::fake()->image('product-image.png'), UploadedFile::fake()->image('product-image-2.png')];

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'product_images' => $files
        ]));

        $product = Product::first();

        $response->assertStatus(201)
            ->assertJsonFragment([$product->model->url()]);

        $this->assertNotNull($product->image_path);
        Storage::disk('public')->assertExists($product->image_path);
        $this->assertFileEquals($files[0]->getPathname(), Storage::disk('public')->path($product->image_path));
    }

    /** @test */
    public function an_image_optimizer_job_is_queued_when_a_product_is_created()
    {
        Queue::fake();
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams());

        $model = ProductModel::first();

        Queue::assertPushed(ProcessProductModelImage::class, function ($job) use ($model) {
            return $job->model->is($model);
        });
    }

    /** @test */
    public function name_is_required_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'name' => ''
        ]));

        $this->assertValidationError($response, 'name');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function description_is_required_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'description' => ''
        ]));

        $this->assertValidationError($response, 'description');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function published_is_required_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'published' => '',
        ]));

        $this->assertValidationError($response, 'published');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function published_must_be_boolean_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'published' => 'not-a-boolean'
        ]));

        $this->assertValidationError($response, 'published');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function products_are_required_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'products' => ''
        ]));

        $this->assertValidationError($response, 'products');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function products_must_be_an_array_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'products' => 'not-an-array'
        ]));

        $this->assertValidationError($response, 'products');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function price_is_required_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'products' => [
                ['price' => '']
            ]
        ]));

        $this->assertValidationError($response, 'products.0.price');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function price_must_be_numeric_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'products' => [
                ['price' => 'not-numeric']
            ]
        ]));

        $this->assertValidationError($response, 'products.0.price');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function price_must_be_0_or_more_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'products' => [
                ['price' => '-1']
            ]
        ]));

        $this->assertValidationError($response, 'products.0.price');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function item_quantity_is_required_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'products' => [
                ['item_quantity' => '']
            ]
        ]));

        $this->assertValidationError($response, 'products.0.item_quantity');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function item_quantity_must_be_an_integer_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'products' => [
                ['item_quantity' => '1.3']
            ]
        ]));

        $this->assertValidationError($response, 'products.0.item_quantity');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function item_quantity_must_be_0_or_more_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'products' => [
                ['item_quantity' => '-1']
            ]
        ]));

        $this->assertValidationError($response, 'products.0.item_quantity');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function product_images_are_required_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'product_images' => null
        ]));

        $this->assertValidationError($response, 'product_images');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function product_images_must_be_an_array()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'product_images' => 'not-an-array'
        ]));

        $this->assertValidationError($response, 'product_images');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function product_images_must_have_at_least_one_image()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), [
            'name'           => 'iPhone 8',
            'description'    => 'The new iPhone',
            'published'      => true,
            'product_images' => [],
            'products'       => json_encode([[
                'price'         => '700.50',
                'item_quantity' => 2,
            ]])
        ]);

        $this->assertValidationError($response, 'product_images');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function product_images_contents_must_be_an_image()
    {
        $brand = $this->brandForSignedInUser();
        $file = UploadedFile::fake()->create('not-an-image.pdf');

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'product_images' => [UploadedFile::fake()->create('not-an-image.pdf')]
        ]));

        $this->assertValidationError($response, 'product_images.0');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function attributes_are_required_when_present_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'products' => [
                ['attributes' => '']
            ]
        ]));

        $this->assertValidationError($response, 'products.0.attributes');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function attributes_must_be_an_array_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'products' => [
                ['attributes' => 'not-an-array']
            ]
        ]));

        $this->assertValidationError($response, 'products.0.attributes');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function attributes_must_be_less_than_5_to_create_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'products' => [
                ['attributes' => [
                    'attribute1' => 'value1',
                    'attribute2' => 'value2',
                    'attribute3' => 'value3',
                    'attribute4' => 'value4',
                    'attribute5' => 'value5'
                ]]
            ]
        ]));

        $this->assertValidationError($response, 'products.0.attributes');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function all_products_must_have_the_same_attributes_to_edit_a_product_model()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'products' => [
                [
                    'price'         => 2000,
                    'item_quantity' => 2,
                    'attributes'    => [
                        'firstAttribute' => 'value1',
                    ]
                ],
                [
                    'price'         => 2000,
                    'item_quantity' => 2,
                    'attributes'    => [
                        'secondAttribute' => 'value2',
                    ]
                ],
            ]
        ]));

        $this->assertValidationError($response, 'products.1.attributes.firstAttribute');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function values_are_required_to_create_a_product_with_attributes()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'products' => [
                ['attributes' => [
                    'attribute' => '',
                ]]
            ]
        ]));

        $this->assertValidationError($response, 'products.0.attributes.attribute');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function values_must_be_a_string_to_edit_a_product_with_attributes()
    {
        $brand = $this->brandForSignedInUser();

        $response = $this->json('POST', route('product-models.store', $brand), $this->validParams([
            'products' => [
                ['attributes' => [
                    'attribute' => 100,
                ]]
            ]
        ]));

        $this->assertValidationError($response, 'products.0.attributes.attribute');
        $this->assertEquals(0, Product::count());
    }
}
