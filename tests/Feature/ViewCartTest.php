<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Classes\Cart;
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
        $products = $this->create('Product', 2);
        $user->products()->attach([
            $products->first()->id => ['quantity' => 1],
            $products->last()->id  => ['quantity' => 1]
        ]);

        $this->get(route('carts.show'))
            ->assertStatus(200)
            ->assertViewHas('products', function ($viewProducts) use ($products) {
                return $products->equals($viewProducts);
            });
    }

    /** @test */
    public function a_guest_can_view_the_products_in_his_cart()
    {
        $this->withoutExceptionHandling();
        $productA = $this->create('Product')->addItems(2);
        $productB = $this->create('Product')->addItems(1);
        $products = Product::all();
        $cart = new Cart();
        $cart->add($productA, 2);
        $cart->add($productB, 1);
        session(['cart' => $cart]);

        $this->get(route('carts.show'))
            ->assertStatus(200)
            ->assertViewHas('products', function ($viewProducts) use ($products) {
                return $products->equals($viewProducts);
            });
    }
}
