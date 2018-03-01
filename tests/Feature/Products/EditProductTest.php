<?php

namespace Tests\Feature\Products;

use Tests\TestCase;
use App\Models\User;
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
    public function a_seller_can_view_the_edit_product_page()
    {
        $user = factory(User::class)->create();

        $product = factory(Product::class)->create();

        $response = $this->actingAs($user)->get(route('products.edit', $product));

        $response->assertStatus(200);
    }

    /** @test */
    public function guests_cannot_view_the_edit_product_page()
    {
        $product = factory(Product::class)->create();

        $response = $this->get(route('products.edit', $product));

        $response->assertStatus(302)
            ->assertRedirect(route('login'));
    }

    /** @test */
    public function a_seller_can_edit_his_product()
    {
        $user = factory(User::class)->create();
        $product = factory(Product::class)->create([
            'name'        => 'Old name',
            'description' => 'Old description',
            'price'       => 2000,
            'published'   => true
        ]);

        $response = $this->actingAs($user)->patch(route('products.update', $product), [
            'name'        => 'New name',
            'description' => 'New description',
            'price'       => '50.00',
        ]);

        $response->assertRedirect(route('products.show', $product));

        $product = $product->fresh();

        $this->assertEquals('New name', $product->name);
        $this->assertEquals('New description', $product->description);
        $this->assertEquals(5000, $product->price);
        $this->assertFalse($product->published);
    }

    /** @test */
    public function a_guest_cannot_update_a_product()
    {
        $product = factory(Product::class)->create($this->oldAttributes());

        $response = $this->patch(route('products.update', $product), $this->validParams());

        $response->assertStatus(302)
            ->assertRedirect(route('login'));

        $this->assertArraySubset($this->oldAttributes(), $product->fresh()->getAttributes());
    }

    /** @test */
    public function name_is_required_to_edit_a_product()
    {
        $user = factory(User::class)->create();

        $product = factory(Product::class)->create($this->oldAttributes());

        $response = $this->actingAs($user)->from(route('products.edit', $product))->patch(route('products.update', $product), $this->validParams([
            'name' => ''
        ]));

        $response->assertStatus(302)
            ->assertRedirect(route('products.edit', $product))
            ->assertSessionHasErrors('name');

        $this->assertArraySubset($this->oldAttributes(), $product->fresh()->getAttributes());
    }

    /** @test */
    public function description_is_required_to_edit_a_product()
    {
        $user = factory(User::class)->create();

        $product = factory(Product::class)->create($this->oldAttributes());

        $response = $this->actingAs($user)->from(route('products.edit', $product))->patch(route('products.update', $product), $this->validParams([
            'description' => ''
        ]));

        $response->assertStatus(302)
            ->assertRedirect(route('products.edit', $product))
            ->assertSessionHasErrors('description');

        $this->assertArraySubset($this->oldAttributes(), $product->fresh()->getAttributes());
    }

    /** @test */
    public function price_is_required_to_edit_a_product()
    {
        $user = factory(User::class)->create();

        $product = factory(Product::class)->create($this->oldAttributes());

        $response = $this->actingAs($user)->from(route('products.edit', $product))->patch(route('products.update', $product), $this->validParams([
            'price' => ''
        ]));

        $response->assertStatus(302)
            ->assertRedirect(route('products.edit', $product))
            ->assertSessionHasErrors('price');

        $this->assertArraySubset($this->oldAttributes(), $product->fresh()->getAttributes());
    }

    /** @test */
    public function price_must_be_numeric_to_edit_a_product()
    {
        $user = factory(User::class)->create();

        $product = factory(Product::class)->create($this->oldAttributes());

        $response = $this->actingAs($user)->from(route('products.edit', $product))->patch(route('products.update', $product), $this->validParams([
            'price' => 'not-numeric'
        ]));

        $response->assertStatus(302)
            ->assertRedirect(route('products.edit', $product))
            ->assertSessionHasErrors('price');

        $this->assertArraySubset($this->oldAttributes(), $product->fresh()->getAttributes());
    }

    /** @test */
    public function price_must_be_0_or_more_to_edit_a_product()
    {
        $user = factory(User::class)->create();

        $product = factory(Product::class)->create($this->oldAttributes());

        $response = $this->actingAs($user)->from(route('products.edit', $product))->patch(route('products.update', $product), $this->validParams([
            'price' => '-1'
        ]));

        $response->assertStatus(302)
            ->assertRedirect(route('products.edit', $product))
            ->assertSessionHasErrors('price');

        $this->assertArraySubset($this->oldAttributes(), $product->fresh()->getAttributes());
    }

    /** @test */
    public function published_is_optional_to_edit_a_product()
    {
        $user = factory(User::class)->create();

        $product = factory(Product::class)->create($this->oldAttributes());

        $response = $this->actingAs($user)->from(route('products.edit', $product))->patch(route('products.update', $product), [
            'name'        => 'New name',
            'description' => 'New description',
            'price'       => '50.00',
        ]);

        $response->assertStatus(302)
            ->assertRedirect(route('products.show', $product));

        $product = $product->fresh();

        $this->assertFalse($product->published);
        $this->assertEquals('New name', $product->name);
        $this->assertEquals('New description', $product->description);
        $this->assertEquals(5000, $product->price);
    }

    /** @test */
    public function published_must_be_boolean_to_edit_a_product()
    {
        $user = factory(User::class)->create();

        $product = factory(Product::class)->create($this->oldAttributes());

        $response = $this->actingAs($user)->from(route('products.edit', $product))->patch(route('products.update', $product), $this->validParams([
            'published' => 'not-a-boolean'
        ]));

        $response->assertStatus(302)
            ->assertRedirect(route('products.edit', $product))
            ->assertSessionHasErrors('published');

        $this->assertArraySubset($this->oldAttributes(), $product->fresh()->getAttributes());
    }
}
