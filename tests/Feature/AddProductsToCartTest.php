<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AddProductsToCartTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_add_a_product_to_his_cart()
    {
        $user = $this->create('User');
        $this->signIn($user);
        $product = $this->create('Product')->addItems(3);

        $this->post(route('carts.store', $product), ['quantity' => 3]);

        $this->assertEquals(3, $user->products->first()->cart->quantity);
        $this->assertTrue($user->products->first()->is($product));
    }

    /** @test */
    public function a_user_cannot_add_more_products_to_his_cart_than_remain_at_once()
    {
        $user = $this->create('User');
        $this->signIn($user);
        $product = $this->create('Product')->addItems(1);

        $this->post(route('carts.store', $product), ['quantity' => 3]);

        $this->assertCount(0, $user->products);
    }

    /** @test */
    public function a_user_cannot_add_more_products_to_his_cart_than_remain_at_different_times()
    {
        $user = $this->create('User');
        $this->signIn($user);
        $product = $this->create('Product')->addItems(2);

        $this->post(route('carts.store', $product), ['quantity' => 2]);
        $this->post(route('carts.store', $product), ['quantity' => 1]);

        $this->assertEquals(2, $user->products->first()->cart->quantity);
        $this->assertTrue($user->products->first()->is($product));
    }

    /** @test */
    public function a_user_can_add_different_products_to_his_cart()
    {
        $user = $this->create('User');
        $this->signIn($user);
        $productA = $this->create('Product')->addItems(3);
        $productB = $this->create('Product')->addItems(1);

        $this->post(route('carts.store', $productA), ['quantity' => 3]);
        $this->post(route('carts.store', $productB), ['quantity' => 1]);

        $this->assertCount(2, $user->products);
        $this->assertTrue($user->products->first()->is($productA));
        $this->assertEquals(3, $user->products->first()->cart->quantity);
        $this->assertTrue($user->products->last()->is($productB));
        $this->assertEquals(1, $user->products->last()->cart->quantity);
    }

    /** @test */
    public function a_user_can_add_the_same_product_to_his_cart_multiple_times()
    {
        $user = $this->create('User');
        $this->signIn($user);
        $product = $this->create('Product')->addItems(3);

        $this->post(route('carts.store', $product), ['quantity' => 1]);
        $this->post(route('carts.store', $product), ['quantity' => 1]);
        $this->post(route('carts.store', $product), ['quantity' => 1]);

        $this->assertEquals(3, $user->products->first()->cart->quantity);
        $this->assertTrue($user->products->first()->is($product));
    }

    /** @test */
    public function a_guest_can_add_different_products_to_his_cart()
    {
        $productA = $this->create('Product')->addItems(2);
        $productB = $this->create('Product')->addItems(1);

        $this->post(route('carts.store', $productA), ['quantity' => 2]);
        $this->post(route('carts.store', $productB), ['quantity' => 1]);

        $this->assertTrue(session('cart')->products->first()->is($productA));
        $this->assertEquals(2, session('cart')->products->first()->quantity);
        $this->assertTrue(session('cart')->products->last()->is($productB));
        $this->assertEquals(1, session('cart')->products->last()->quantity);
    }

    /** @test */
    public function a_guest_can_add_the_same_product_to_his_cart_multiple_times()
    {
        $product = $this->create('Product')->addItems(3);

        $this->post(route('carts.store', $product), ['quantity' => 1]);
        $this->post(route('carts.store', $product), ['quantity' => 1]);
        $this->post(route('carts.store', $product), ['quantity' => 1]);

        $this->assertTrue(session('cart')->products->first()->is($product));
        $this->assertEquals(3, session('cart')->products->first()->quantity);
    }

    /** @test */
    public function a_guest_cannot_add_more_products_to_his_cart_than_remain_at_once()
    {
        $product = $this->create('Product')->addItems(1);

        $this->post(route('carts.store', $product), ['quantity' => 3]);

        $this->assertFalse(session()->has('cart'));
    }

    /** @test */
    public function a_guest_cannot_add_more_products_to_his_cart_than_remain_at_different_times()
    {
        $product = $this->create('Product')->addItems(2);

        $this->post(route('carts.store', $product), ['quantity' => 2]);
        $this->post(route('carts.store', $product), ['quantity' => 1]);

        $this->assertTrue(session('cart')->products->last()->is($product));
        $this->assertEquals(2, session('cart')->products->last()->quantity);
    }
}
