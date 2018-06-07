<?php

namespace Tests\Feature\Carts;

use Tests\TestCase;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ViewCartTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_view_the_products_in_his_cart()
    {
        $user = $this->create('User');
        $this->signIn($user);
        $productA = $this->create('Product')->addItems(2);
        $productB = $this->create('Product')->addItems(1);
        $products = Product::all();
        $this->postJson(route('carts.store', $productA), ['quantity' => 2]);
        $this->actingAs($user->fresh())->postJson(route('carts.store', $productB), ['quantity' => 1]);

        $this->actingAs($user->fresh())
            ->get(route('carts.show'))
            ->assertStatus(200)
            ->assertViewHas('products', function ($viewProducts) use ($products) {
                return $this->assertCollectionsAreEqual($viewProducts, $products);
            });
    }

    /** @test */
    public function a_user_can_view_his_empty_cart()
    {
        $user = $this->create('User');
        $this->signIn($user);

        $this->get(route('carts.show'))
            ->assertStatus(200);
    }

    /** @test */
    public function a_guest_can_view_the_products_in_his_cart()
    {
        $productA = $this->create('Product')->addItems(2);
        $productB = $this->create('Product')->addItems(1);
        $this->postJson(route('carts.store', $productA), ['quantity' => 2]);
        $this->postJson(route('carts.store', $productB), ['quantity' => 1]);
        $products = Product::all();

        $this->get(route('carts.show'))
            ->assertStatus(200)
            ->assertViewHas('products', function ($viewProducts) use ($products) {
                return $this->assertCollectionsAreEqual($viewProducts, $products);
            });
    }

    /** @test */
    public function a_guest_can_view_his_empty_cart()
    {
        $this->get(route('carts.show'))
            ->assertStatus(200);
    }

    /** @test */
    public function a_guest_can_view_his_emptied_cart()
    {
        $product = $this->create('Product')->addItems(2);
        $this->postJson(route('carts.store', $product), ['quantity' => 2]);

        cart()->clear();

        $this->get(route('carts.show'))
            ->assertStatus(200);
    }
}
