<?php

namespace Tests\Feature\Products;

use Tests\TestCase;
use App\Models\Value;
use App\Models\Product;
use App\Models\Attribute;
use Illuminate\Testing\Assert;
use Illuminate\Http\UploadedFile;
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
        return $this->patchJson(route('product-models.update', $product->product_model_id), $this->validParams($overridenParams));
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

        $response = $this->patchJson(route('product-models.update', $product->product_model_id), [
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
    public function a_user_can_add_images_to_a_product_when_editing()
    {
        Storage::fake('public');
        $product = $this->productForUserBrand();
        $oldFile = UploadedFile::fake()->image('old-product-image.png');
        $oldFileContents = file_get_contents($oldFile);
        $product->model->addMedia($oldFile)->toMediaCollection();
        $newFile = UploadedFile::fake()->image('new-product-image.png');
        $newFileContents = file_get_contents($newFile);

        $this->updateProduct($product, ['product_images' => [$newFile]])->assertStatus(200);

        $this->assertEquals(2, $product->model->getMedia()->count());
        Storage::disk('public')->assertExists(explode('public/', $product->model->getFirstMediaPath())[1]);
        Storage::disk('public')->assertExists(explode('public/', $product->model->getMedia()[1]->getPath())[1]);
        $this->assertEquals($oldFileContents, file_get_contents(Storage::disk('public')->path(explode('public/', $product->model->getFirstMediaPath())[1])));
        $this->assertEquals($newFileContents, file_get_contents(Storage::disk('public')->path(explode('public/', $product->model->getMedia()[1]->getPath())[1])));
    }

    /** @test */
    public function a_user_cannot_update_a_product_from_a_brand_he_does_not_own()
    {
        $this->signIn();
        $product = $this->createProductsForModel($this->oldAttributes());

        $response = $this->patchJson(route('product-models.update', $product->product_model_id), $this->validParams());

        $response->assertStatus(404);
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function a_guest_cannot_update_a_product()
    {
        $product = $this->createProductsForModel($this->oldAttributes());

        $this->patchJson(route('product-models.update', $product->product_model_id), $this->validParams())
            ->assertStatus(401);

        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function name_is_required_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'name' => ''
        ]);

        $this->assertValidationError($response, 'name');
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function description_is_required_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'description' => ''
        ]);

        $this->assertValidationError($response, 'description');
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function published_is_required_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'published' => '',
        ]);

        $this->assertValidationError($response, 'published');
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function published_must_be_boolean_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'published' => 'not-a-boolean'
        ]);

        $this->assertValidationError($response, 'published');
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function products_are_required_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'products' => '',
        ]);

        $this->assertValidationError($response, 'products');
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function products_must_be_an_array_to_edit_a_product()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'products' => 'not-an_array',
        ]);

        $this->assertValidationError($response, 'products');
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
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
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
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
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
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
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
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
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
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
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
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
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
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
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
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
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
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
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
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
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
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
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
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
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function product_images_must_be_an_array_if_present()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'product_images' => 'not-an-array'
        ]);

        $this->assertValidationError($response, 'product_images');
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function product_images_must_have_at_least_one_image_when_present()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'product_images' => []
        ]);

        $this->assertValidationError($response, 'product_images');
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function product_images_contents_must_be_an_image()
    {
        $product = $this->productForUserBrand();

        $response = $this->updateProduct($product, [
            'product_images' => [UploadedFile::fake()->create('not-an-image.pdf')]
        ]);

        $this->assertValidationError($response, 'product_images.0');
        Assert::assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }
}
