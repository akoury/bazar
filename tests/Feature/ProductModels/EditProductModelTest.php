<?php

namespace Tests\Feature\Products;

use Tests\TestCase;
use App\Models\Value;
use App\Models\Product;
use App\Models\Attribute;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Queue;
use App\Jobs\ProcessProductModelImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EditProductModelTest extends TestCase
{
    use RefreshDatabase;

    private function oldAttributes($overrides = [])
    {
        return array_merge([
            'name'        => 'Old name',
            'description' => 'Old description',
            'price'       => 2000,
            'published'   => true
        ], $overrides);
    }

    private function validParams($overrides = [])
    {
        $params = array_replace_recursive([
            'name'        => 'iPhone 8',
            'description' => 'The new iPhone',
            'published'   => true,
            'products'    => [
                [
                    'price'         => 2000,
                    'item_quantity' => 2
                ]
            ],
        ], $overrides);

        $params['products'] = json_encode($params['products']);

        return $params;
    }

    private function productForUserBrand()
    {
        $brand = $this->brandForSignedInUser();

        return $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));
    }

    private function updateProduct($product, $overridenParams)
    {
        return $this->json('PATCH', route('product-models.update', $product->product_model_id), $this->validParams($overridenParams));
    }

    /** @test */
    public function a_user_can_view_the_edit_product_form_for_his_brand()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel(['brand_id' => $brand]);

        $response = $this->get(route('product-models.edit', $product->product_model_id));

        $response->assertStatus(200);
    }

    /** @test */
    public function a_user_cannot_view_the_edit_product_form_of_a_brand_he_does_not_own()
    {
        $this->signIn();
        $product = $this->create('Product');

        $response = $this->get(route('product-models.edit', $product->product_model_id));

        $response->assertStatus(404);
    }

    /** @test */
    public function guests_cannot_view_the_edit_product_form()
    {
        $product = $this->create('Product');

        $this->get(route('product-models.edit', $product->product_model_id))
            ->assertStatus(302)
            ->assertRedirect(route('login'));
    }

    /** @test */
    public function a_user_can_edit_his_brands_product()
    {
        $brand = $this->brandForSignedInUser();

        $product = $this->createProductsForModel([
            'name'        => 'Old name',
            'description' => 'Old description',
            'price'       => 2000,
            'published'   => true,
            'brand_id'    => $brand->id
        ])->addItems(3);

        $response = $this->json('PATCH', route('product-models.update', $product->product_model_id), [
            'name'        => 'New name',
            'description' => 'New description',
            'published'   => false,
            'products'    => json_encode([[
                'id'            => $product->id,
                'price'         => '50.00',
                'item_quantity' => 2,
            ]]),
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment([$product->model->url()]);

        $product = $product->fresh();

        $this->assertEquals('New name', $product->name);
        $this->assertEquals('New description', $product->description);
        $this->assertEquals(5000, $product->price);
        $this->assertEquals(2, $product->itemsRemaining());
        $this->assertFalse($product->published);
    }

    /** @test */
    public function a_user_can_edit_his_brands_product_and_add_new_ones()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'products' => [
                [
                    'id'            => $product->id,
                    'price'         => '50.00',
                    'item_quantity' => 2,
                ],
                [
                    'price'         => '30.00',
                    'item_quantity' => 5,
                ],
            ],
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment([$product->model->url()]);

        $model = $product->fresh()->model;

        $this->assertCount(2, $model->products);
        $this->assertEquals(5000, $model->products->first()->price);
        $this->assertEquals(2, $model->products->first()->itemsRemaining());
        $this->assertEquals(3000, $model->products->last()->price);
        $this->assertEquals(5, $model->products->last()->itemsRemaining());
    }

    /** @test */
    public function a_user_can_edit_his_brands_products_with_attributes()
    {
        $product = $this->productForUserBrand();

        $attribute = $this->create('Attribute', 1, [
            'name' => 'color',
        ]);

        $value = $this->create('Value', 1, [
            'name'         => 'black',
            'attribute_id' => $attribute->id
        ]);

        $product->values()->attach($value);

        $response = $this->updateProduct($product, [
            'products' => [
                [
                    'id'            => $product->id,
                    'price'         => '50.00',
                    'item_quantity' => 2,
                    'attributes'    => [
                        'color'     => 'green',
                        'capacity'  => '64gb',
                        'engraving' => 'false',
                        'unlocked'  => 'yes'
                    ],
                ],
                [
                    'price'         => '30.00',
                    'item_quantity' => 5,
                    'attributes'    => [
                        'color'     => 'GREEN',
                        'capacity'  => '32gb',
                        'engraving' => 'true',
                        'unlocked'  => 'yes',
                    ],
                ],
            ],
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment([$product->model->url()]);

        $model = $product->fresh()->model;

        $productAValues = $model->products->first()->values->pluck('name');
        $this->assertFalse($productAValues->contains('black'));
        $this->assertTrue($productAValues->contains('green'));
        $this->assertTrue($productAValues->contains('64gb'));
        $this->assertTrue($productAValues->contains('false'));
        $this->assertTrue($productAValues->contains('yes'));

        $productBValues = $model->products->last()->values->pluck('name');
        $this->assertTrue($productBValues->contains('green'));
        $this->assertTrue($productBValues->contains('32gb'));
        $this->assertTrue($productBValues->contains('true'));
        $this->assertTrue($productBValues->contains('yes'));

        $this->assertCount(1, Attribute::whereName('color')->get());
        $this->assertCount(1, Value::whereName('green')->get());
        $this->assertCount(1, Value::whereName('yes')->get());
    }

    /** @test */
    public function a_user_can_edit_the_image_of_a_product_while_removing_the_previous_one()
    {
        Storage::fake('public');
        Queue::fake();

        $product = $this->productForUserBrand();
        $oldFilePath = $product->image_path;
        Storage::disk('public')->putFileAs('', UploadedFile::fake()->image($oldFilePath), $oldFilePath);

        $newFile = UploadedFile::fake()->image('new-product-image.png');
        $this->updateProduct($product, ['product_image' => $newFile])->assertStatus(200);

        $this->assertNotEquals($oldFilePath, $product->fresh()->image_path);
        Storage::disk('public')->assertExists($product->fresh()->image_path);
        $this->assertFileEquals($newFile->getPathname(), Storage::disk('public')->path($product->fresh()->image_path));
        Storage::disk('public')->assertMissing($oldFilePath);
    }

    /** @test */
    public function an_image_optimizer_job_is_queued_when_a_product_is_edited_with_a_new_image()
    {
        Storage::fake('public');
        Queue::fake();
        $product = $this->productForUserBrand();

        $this->updateProduct($product, ['product_image' => UploadedFile::fake()->image('new-product-image.png')])->assertStatus(200);

        Queue::assertPushed(ProcessProductModelImage::class, function ($job) use ($product) {
            return $job->model->is($product->model);
        });
    }

    /** @test */
    public function an_image_optimizer_job_is_not_queued_when_a_product_is_edited_without_a_new_image()
    {
        Queue::fake();
        $product = $this->productForUserBrand();

        $this->updateProduct($product, [])->assertStatus(200);

        Queue::assertNotPushed(ProcessProductModelImage::class);
    }

    /** @test */
    public function a_user_cannot_update_a_product_from_a_brand_he_does_not_own()
    {
        $this->signIn();
        $product = $this->createProductsForModel($this->oldAttributes());

        $response = $this->json('PATCH', route('product-models.update', $product->product_model_id), $this->validParams());

        $response->assertStatus(404);
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function a_guest_cannot_update_a_product()
    {
        $product = $this->createProductsForModel($this->oldAttributes());

        $this->json('PATCH', route('product-models.update', $product->product_model_id), $this->validParams())
            ->assertStatus(401);

        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function name_is_required_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'name' => ''
        ]);

        $this->assertValidationError($response, 'name');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function description_is_required_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'description' => ''
        ]);

        $this->assertValidationError($response, 'description');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function published_is_required_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'published' => '',
        ]);

        $this->assertValidationError($response, 'published');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function published_must_be_boolean_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'published' => 'not-a-boolean'
        ]);

        $this->assertValidationError($response, 'published');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function products_are_required_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'products' => '',
        ]);

        $this->assertValidationError($response, 'products');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function products_must_be_an_array_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'products' => 'not-an_array',
        ]);

        $this->assertValidationError($response, 'products');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function price_is_required_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'products' => [
                ['price' => '']
            ]
        ]);

        $this->assertValidationError($response, 'products.0.price');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function price_must_be_numeric_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'products' => [
                ['price' => 'not-numeric']
            ]
        ]);

        $this->assertValidationError($response, 'products.0.price');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function price_must_be_0_or_more_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'products' => [
                ['price' => '-1']
            ]
        ]);

        $this->assertValidationError($response, 'products.0.price');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function item_quantity_is_required_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'products' => [
                ['item_quantity' => '']
            ]
        ]);

        $this->assertValidationError($response, 'products.0.item_quantity');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function item_quantity_must_be_an_integer_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'products' => [
                ['item_quantity' => '1.2']
            ]
        ]);

        $this->assertValidationError($response, 'products.0.item_quantity');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function item_quantity_must_be_0_or_more_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'products' => [
                ['item_quantity' => '-1']
            ]
        ]);

        $this->assertValidationError($response, 'products.0.item_quantity');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function attributes_are_required_when_present_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'products' => [
                ['attributes' => '']
            ]
        ]);

        $this->assertValidationError($response, 'products.0.attributes');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function attributes_must_be_an_array_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'products' => [
                ['attributes' => 'not-an-array']
            ]
        ]);

        $this->assertValidationError($response, 'products.0.attributes');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function attributes_must_be_less_than_5_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'products' => [
                ['attributes' => [
                    'attribute1' => 'value1',
                    'attribute2' => 'value2',
                    'attribute3' => 'value3',
                    'attribute4' => 'value4',
                    'attribute5' => 'value5'
                ]]
            ]
        ]);

        $this->assertValidationError($response, 'products.0.attributes');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function all_products_must_have_the_same_attributes_to_edit_a_product_model()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
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
        ]);

        $this->assertValidationError($response, 'products.1.attributes.firstAttribute');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function values_are_required_to_edit_a_product_with_attributes()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'products' => [
                ['attributes' => [
                    'attribute' => '',
                ]]
            ]
        ]);

        $this->assertValidationError($response, 'products.0.attributes.attribute');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function values_must_be_a_string_to_edit_a_product_with_attributes()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'products' => [
                ['attributes' => [
                    'attribute' => 100,
                ]]
            ]
        ]);

        $this->assertValidationError($response, 'products.0.attributes.attribute');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function product_image_must_be_an_image()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'product_image' => UploadedFile::fake()->create('not-an-image.pdf')
        ]);

        $this->assertValidationError($response, 'product_image');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }
}
