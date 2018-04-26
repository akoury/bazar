<?php

namespace Tests\Feature\Products;

use Tests\TestCase;
use App\Models\Product;
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
        return array_merge([
            'name'        => 'iPhone 8',
            'description' => 'The new iPhone',
            'price'       => '700.50',
            'published'   => true,
        ], $overrides);
    }

    /** @test */
    public function a_user_can_view_the_edit_product_form_for_his_brand()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel(['brand_id' => $brand]);

        $response = $this->get(route('products.edit', $product));

        $response->assertStatus(200);
    }

    /** @test */
    public function a_user_cannot_view_the_edit_product_form_of_a_brand_he_does_not_own()
    {
        $this->signIn();
        $product = $this->create('Product');

        $response = $this->get(route('products.edit', $product));

        $response->assertStatus(404);
    }

    /** @test */
    public function guests_cannot_view_the_edit_product_form()
    {
        $product = $this->create('Product');

        $this->get(route('products.edit', $product))
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
        ]);

        $response = $this->patch(route('products.update', $product), [
            'name'        => 'New name',
            'description' => 'New description',
            'price'       => '50.00',
        ]);

        $response->assertRedirect(route('products.show', [$product->brand_id, $product]));

        $product = $product->fresh();

        $this->assertEquals('New name', $product->name);
        $this->assertEquals('New description', $product->description);
        $this->assertEquals(5000, $product->price);
        $this->assertFalse($product->published);
    }

    /** @test */
    public function a_user_cannot_update_a_product_from_a_brand_he_does_not_own()
    {
        $this->signIn();
        $product = $this->createProductsForModel($this->oldAttributes());

        $response = $this->patch(route('products.update', $product), $this->validParams());

        $response->assertStatus(404);
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function a_guest_cannot_update_a_product()
    {
        $product = $this->createProductsForModel($this->oldAttributes());

        $this->patch(route('products.update', $product), $this->validParams())
            ->assertStatus(302)
            ->assertRedirect(route('login'));

        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function name_is_required_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->from(route('products.edit', $product))->patch(route('products.update', $product), $this->validParams([
            'name' => ''
        ]));

        $this->assertValidationError($response, 'name', route('products.edit', $product));
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function description_is_required_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->from(route('products.edit', $product))->patch(route('products.update', $product), $this->validParams([
            'description' => ''
        ]));

        $this->assertValidationError($response, 'description', route('products.edit', $product));
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function price_is_required_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->from(route('products.edit', $product))->patch(route('products.update', $product), $this->validParams([
            'price' => ''
        ]));

        $this->assertValidationError($response, 'price', route('products.edit', $product));
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function price_must_be_numeric_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->from(route('products.edit', $product))->patch(route('products.update', $product), $this->validParams([
            'price' => 'not-numeric'
        ]));

        $this->assertValidationError($response, 'price', route('products.edit', $product));
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function price_must_be_0_or_more_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->from(route('products.edit', $product))->patch(route('products.update', $product), $this->validParams([
            'price' => '-1'
        ]));

        $this->assertValidationError($response, 'price', route('products.edit', $product));
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }

    /** @test */
    public function published_is_optional_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->from(route('products.edit', $product))->patch(route('products.update', $product), [
            'name'        => 'New name',
            'description' => 'New description',
            'price'       => '50.00',
        ]);

        $response->assertStatus(302)
            ->assertRedirect(route('products.show', [$product->brand_id, $product]));

        $product = $product->fresh();

        $this->assertFalse($product->published);
        $this->assertEquals('New name', $product->name);
        $this->assertEquals('New description', $product->description);
        $this->assertEquals(5000, $product->price);
    }

    /** @test */
    public function published_must_be_boolean_to_edit_a_product()
    {
        $brand = $this->brandForSignedInUser();

        $product = $this->createProductsForModel($this->oldAttributes([
            'brand_id' => $brand->id
        ]));

        $response = $this->from(route('products.edit', $product))->patch(route('products.update', $product), $this->validParams([
            'published' => 'not-a-boolean'
        ]));

        $this->assertValidationError($response, 'published', route('products.edit', $product));
        $this->assertArraySubset($this->oldAttributes(), array_merge($product->fresh()->getAttributes(), $product->fresh()->model->getAttributes()));
    }
}
