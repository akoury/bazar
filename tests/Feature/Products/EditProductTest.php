<?php

namespace Tests\Feature\Products;

use Tests\TestCase;
use App\Models\Value;
use App\Models\Product;
use App\Models\Attribute;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EditProductTest extends TestCase
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

    /** @test */
    public function a_user_can_view_the_edit_product_form_for_his_brand()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel(['brand_id' => $brand]);

        $response = $this->get(route('products.edit', $product->product_model_id));

        $response->assertStatus(200);
    }

    /** @test */
    public function a_user_cannot_view_the_edit_product_form_of_a_brand_he_does_not_own()
    {
        $this->signIn();
        $product = $this->create('Product');

        $response = $this->get(route('products.edit', $product->product_model_id));

        $response->assertStatus(404);
    }

    /** @test */
    public function guests_cannot_view_the_edit_product_form()
    {
        $product = $this->create('Product');

        $this->get(route('products.edit', $product->product_model_id))
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

        $attributeA = factory(Attribute::class)->create([
            'name' => 'color',
        ]);

        $valueA = factory(Value::class)->create([
            'name'         => 'black',
            'attribute_id' => $attributeA->id
        ]);

        $attributeB = factory(Attribute::class)->create([
            'name' => 'capacity',
        ]);

        $valueB = factory(Value::class)->create([
            'name'         => '32gb',
            'attribute_id' => $attributeB->id
        ]);

        $valueC = factory(Value::class)->create([
            'name'         => '64gb',
            'attribute_id' => $attributeB->id
        ]);

        $attributeC = factory(Attribute::class)->create([
            'name' => 'engraved',
        ]);

        $valueD = factory(Value::class)->create([
            'name'         => 'yes',
            'attribute_id' => $attributeC->id
        ]);

        $product->values()->attach($valueA);
        $product->values()->attach($valueB);
        $product->values()->attach($valueD);

        $response = $this->json('PATCH', route('products.update', $product->product_model_id), [
            'name'        => 'New name',
            'description' => 'New description',
            'published'   => false,
            'products'    => json_encode([
                [
                    'id'            => $product->id,
                    'price'         => '50.00',
                    'item_quantity' => 2,
                    'attributes'    => [
                        'color'     => 'green',
                        'capacity'  => '64gb',
                        'engraving' => 'true',
                        'unlocked'  => 'yes'
                    ],
                ],
                [
                    'id'            => null,
                    'price'         => '30.00',
                    'item_quantity' => 5,
                    'attributes'    => [
                        'color'     => 'green',
                        'capacity'  => '32gb',
                        'engraving' => 'true',
                        'unlocked'  => 'yes',
                    ],
                ],
            ]),
        ]);

        $response->assertStatus(200)
            ->assertJsonFragment([$product->model->url()]);

        $product = $product->fresh();

        $this->assertEquals('New name', $product->name);
        $this->assertEquals('New description', $product->description);
        $this->assertEquals(5000, $product->price);
        $this->assertEquals(2, $product->itemsRemaining());
        $this->assertFalse($product->published);
        $this->assertTrue($product->values->pluck('name')->contains('green'));
        $this->assertFalse($product->values->pluck('name')->contains('black'));
        $this->assertTrue($product->values->pluck('name')->contains('64gb'));
        $this->assertTrue($product->values->pluck('name')->contains('true'));
        $this->assertTrue($product->values->pluck('name')->contains('yes'));
        $this->assertCount(2, $product->model->products);
        $this->assertEquals(3000, $product->model->products->last()->price);
        $this->assertEquals(5, $product->model->products->last()->itemsRemaining());
        $this->assertTrue($product->model->products->last()->values->pluck('name')->contains('green'));
        $this->assertTrue($product->model->products->last()->values->pluck('name')->contains('32gb'));
        $this->assertTrue($product->model->products->last()->values->pluck('name')->contains('true'));
        $this->assertTrue($product->model->products->last()->values->pluck('name')->contains('yes'));
    }

    /** @test */
    public function a_user_cannot_update_a_product_from_a_brand_he_does_not_own()
    {
        $this->signIn();
        $product = $this->createProductsForModel($this->oldAttributes());

        $response = $this->json('PATCH', route('products.update', $product->product_model_id), $this->validParams());

        $response->assertStatus(404);
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function a_guest_cannot_update_a_product()
    {
        $product = $this->createProductsForModel($this->oldAttributes());

        $this->json('PATCH', route('products.update', $product->product_model_id), $this->validParams())
            ->assertStatus(401);

        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function name_is_required_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->json('PATCH', route('products.update', $product->product_model_id), $this->validParams([
            'name' => ''
        ]));

        $this->assertValidationError($response, 'name');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function description_is_required_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->json('PATCH', route('products.update', $product->product_model_id), $this->validParams([
            'description' => ''
        ]));

        $this->assertValidationError($response, 'description');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function published_is_required_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->json('PATCH', route('products.update', $product->product_model_id), $this->validParams([
            'published' => '',
        ]));

        $this->assertValidationError($response, 'published');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function published_must_be_boolean_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->json('PATCH', route('products.update', $product->product_model_id), $this->validParams([
            'published' => 'not-a-boolean'
        ]));

        $this->assertValidationError($response, 'published');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function products_are_required_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->json('PATCH', route('products.update', $product->product_model_id), $this->validParams([
            'products' => '',
        ]));

        $this->assertValidationError($response, 'products');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function products_must_be_an_array_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->json('PATCH', route('products.update', $product->product_model_id), $this->validParams([
            'products' => 'not-an_array',
        ]));

        $this->assertValidationError($response, 'products');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function price_is_required_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->json('PATCH', route('products.update', $product->product_model_id), $this->validParams([
            'products' => [
                ['price' => '']
            ]
        ]));

        $this->assertValidationError($response, 'products.0.price');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function price_must_be_numeric_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->json('PATCH', route('products.update', $product->product_model_id), $this->validParams([
            'products' => [
                ['price' => 'not-numeric']
            ]
        ]));

        $this->assertValidationError($response, 'products.0.price');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function price_must_be_0_or_more_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->json('PATCH', route('products.update', $product->product_model_id), $this->validParams([
            'products' => [
                ['price' => '-1']
            ]
        ]));

        $this->assertValidationError($response, 'products.0.price');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function item_quantity_is_required_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->json('PATCH', route('products.update', $product->product_model_id), $this->validParams([
            'products' => [
                ['item_quantity' => '']
            ]
        ]));

        $this->assertValidationError($response, 'products.0.item_quantity');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function item_quantity_must_be_an_integer_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->json('PATCH', route('products.update', $product->product_model_id), $this->validParams([
            'products' => [
                ['item_quantity' => '1.2']
            ]
        ]));

        $this->assertValidationError($response, 'products.0.item_quantity');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function item_quantity_must_be_0_or_more_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->json('PATCH', route('products.update', $product->product_model_id), $this->validParams([
            'products' => [
                ['item_quantity' => '-1']
            ]
        ]));

        $this->assertValidationError($response, 'products.0.item_quantity');
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }
}
