<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AddProductTest extends TestCase
{
    use RefreshDatabase;

    private function validParams($overrides = [])
    {
        return array_merge([
            'name'          => 'iPhone 8',
            'description'   => 'The new iPhone',
            'price'         => '700.50',
            'published'     => true,
            'item_quantity' => 20
        ], $overrides);
    }

    /** @test */
    public function sellers_can_view_the_add_product_form()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->get(route('products.create'));

        $response->assertStatus(200);
    }

    /** @test */
    public function guests_cannot_view_the_add_product_form()
    {
        $response = $this->get(route('products.create'));

        $response->assertStatus(302)
            ->assertRedirect(route('login'));
    }

    /** @test */
    public function a_seller_can_add_a_product()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->post(route('products.store', [
            'name'          => 'iPhone 8',
            'description'   => 'The new iPhone',
            'price'         => '700.50',
            'published'     => true,
            'item_quantity' => 20
        ]));

        $product = Product::first();

        $response->assertStatus(302)
            ->assertRedirect(route('products.show', $product));

        $this->assertEquals('iPhone 8', $product->name);
        $this->assertEquals('The new iPhone', $product->description);
        $this->assertEquals(70050, $product->price);
        $this->assertTrue($product->published);
        $this->assertEquals(20, $product->itemsRemaining());
    }

    /** @test */
    public function a_guest_cannot_add_a_product()
    {
        $response = $this->post(route('products.store', $this->validParams()));

        $response->assertStatus(302)
            ->assertRedirect(route('login'));

        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function name_is_required_to_create_a_product()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->from(route('products.create'))->post(route('products.store', $this->validParams([
            'name' => ''
        ])));

        $response->assertStatus(302)
            ->assertRedirect(route('products.create'))
            ->assertSessionHasErrors('name');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function description_is_required_to_create_a_product()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->from(route('products.create'))->post(route('products.store', $this->validParams([
            'description' => ''
        ])));

        $response->assertStatus(302)
            ->assertRedirect(route('products.create'))
            ->assertSessionHasErrors('description');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function price_is_required_to_create_a_product()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->from(route('products.create'))->post(route('products.store', $this->validParams([
            'price' => ''
        ])));

        $response->assertStatus(302)
            ->assertRedirect(route('products.create'))
            ->assertSessionHasErrors('price');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function price_must_be_numeric_to_create_a_product()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->from(route('products.create'))->post(route('products.store', $this->validParams([
            'price' => 'not-numeric'
        ])));

        $response->assertStatus(302)
            ->assertRedirect(route('products.create'))
            ->assertSessionHasErrors('price');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function price_must_be_0_or_more_to_create_a_product()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->from(route('products.create'))->post(route('products.store', $this->validParams([
            'price' => '-1'
        ])));

        $response->assertStatus(302)
            ->assertRedirect(route('products.create'))
            ->assertSessionHasErrors('price');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function published_is_optional_to_create_a_product()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->from(route('products.create'))->post(route('products.store', $this->validParams([
            'published' => null
        ])));

        $product = Product::first();

        $response->assertStatus(302)
            ->assertRedirect(route('products.show', $product));

        $this->assertFalse($product->published);
    }

    /** @test */
    public function published_must_be_boolean_to_create_a_product()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->from(route('products.create'))->post(route('products.store', $this->validParams([
            'published' => 'not-a-boolean'
        ])));

        $response->assertStatus(302)
            ->assertRedirect(route('products.create'))
            ->assertSessionHasErrors('published');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function item_quantity_is_required_to_create_a_product()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->from(route('products.create'))->post(route('products.store', $this->validParams([
            'item_quantity' => ''
        ])));

        $response->assertStatus(302)
            ->assertRedirect(route('products.create'))
            ->assertSessionHasErrors('item_quantity');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function item_quantity_must_be_an_integer_to_create_a_product()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->from(route('products.create'))->post(route('products.store', $this->validParams([
            'item_quantity' => '1.3'
        ])));

        $response->assertStatus(302)
            ->assertRedirect(route('products.create'))
            ->assertSessionHasErrors('item_quantity');
        $this->assertEquals(0, Product::count());
    }

    /** @test */
    public function item_quantity_must_be_0_or_more_to_create_a_product()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->from(route('products.create'))->post(route('products.store', $this->validParams([
            'item_quantity' => '-1'
        ])));

        $response->assertStatus(302)
            ->assertRedirect(route('products.create'))
            ->assertSessionHasErrors('item_quantity');
        $this->assertEquals(0, Product::count());
    }
}
