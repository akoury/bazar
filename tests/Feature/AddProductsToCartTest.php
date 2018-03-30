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
        $product = $this->create('Product')->addItems(1);

        $this->post(route('carts.store', $product), ['quantity' => 1]);

        $this->signIn($user->fresh());
        $this->assertEquals(1, cart()->findProduct($product)['quantity']);
        $this->assertTrue(cart()->findProduct($product)['id'] === $product->id);
    }

    /** @test */
    public function a_user_can_add_different_products_to_his_cart()
    {
        $user = $this->create('User');
        $this->signIn($user);
        $productA = $this->create('Product')->addItems(3);
        $productB = $this->create('Product')->addItems(1);

        $this->actingAs($user)->post(route('carts.store', $productA), ['quantity' => 3]);
        $this->actingAs($user->fresh())->post(route('carts.store', $productB), ['quantity' => 1]);

        $this->signIn($user->fresh());
        $this->assertCount(2, cart()->products);
        $this->assertTrue(cart()->findProduct($productA)['id'] === $productA->id);
        $this->assertEquals(3, cart()->findProduct($productA)['quantity']);
        $this->assertTrue(cart()->findProduct($productB)['id'] === $productB->id);
        $this->assertEquals(1, cart()->findProduct($productB)['quantity']);
    }

    /** @test */
    public function a_user_can_add_the_same_product_to_his_cart_multiple_times()
    {
        $user = $this->create('User');
        $this->signIn($user);
        $product = $this->create('Product')->addItems(3);

        $this->post(route('carts.store', $product), ['quantity' => 1]);
        $this->actingAs($user->fresh())->post(route('carts.store', $product), ['quantity' => 1]);
        $this->actingAs($user->fresh())->post(route('carts.store', $product), ['quantity' => 1]);

        $this->signIn($user->fresh());
        $this->assertEquals(3, cart()->findProduct($product)['quantity']);
        $this->assertTrue(cart()->findProduct($product)['id'] === $product->id);
    }

    /** @test */
    public function a_user_cannot_add_products_to_his_cart_if_none_remain()
    {
        $user = $this->create('User');
        $this->signIn($user);
        $product = $this->create('Product');

        $this->post(route('carts.store', $product), ['quantity' => 1]);

        $this->assertNull($user->fresh()->cart);
    }

    /** @test */
    public function a_user_cannot_add_more_products_to_his_cart_if_none_others_remain()
    {
        $user = $this->create('User');
        $this->signIn($user);
        $product = $this->create('Product')->addItems(2);

        $this->post(route('carts.store', $product), ['quantity' => 2]);
        $this->actingAs($user->fresh())->post(route('carts.store', $product), ['quantity' => 1]);

        $this->signIn($user->fresh());
        $this->assertEquals(2, cart()->findProduct($product)['quantity']);
        $this->assertTrue(cart()->findProduct($product)['id'] === $product->id);
    }

    /** @test */
    public function if_a_user_adds_more_products_than_remain_to_his_cart_at_once_the_remainder_is_added()
    {
        $user = $this->create('User');
        $this->signIn($user);
        $product = $this->create('Product')->addItems(2);

        $this->post(route('carts.store', $product), ['quantity' => 3]);

        $this->signIn($user->fresh());
        $this->assertEquals(2, cart()->findProduct($product)['quantity']);
        $this->assertTrue(cart()->findProduct($product)['id'] === $product->id);
    }

    /** @test */
    public function if_a_user_adds_more_products_than_remain_to_his_cart_at_different_times_the_remainder_is_added()
    {
        $user = $this->create('User');
        $this->signIn($user);
        $product = $this->create('Product')->addItems(2);

        $this->post(route('carts.store', $product), ['quantity' => 1]);
        $this->actingAs($user->fresh())->post(route('carts.store', $product), ['quantity' => 2]);

        $this->signIn($user->fresh());
        $this->assertEquals(2, cart()->findProduct($product)['quantity']);
        $this->assertTrue(cart()->findProduct($product)['id'] === $product->id);
    }

    /** @test */
    public function a_guest_can_add_a_product_to_his_cart()
    {
        $product = $this->create('Product')->addItems(1);

        $this->post(route('carts.store', $product), ['quantity' => 1]);

        $this->assertTrue(cart()->findProduct($product)['id'] === $product->id);
        $this->assertEquals(1, cart()->findProduct($product)['quantity']);
    }

    /** @test */
    public function a_guest_can_add_different_products_to_his_cart()
    {
        $productA = $this->create('Product')->addItems(2);
        $productB = $this->create('Product')->addItems(1);

        $this->post(route('carts.store', $productA), ['quantity' => 2]);
        $this->post(route('carts.store', $productB), ['quantity' => 1]);

        $this->assertTrue(cart()->findProduct($productA)['id'] === $productA->id);
        $this->assertEquals(2, cart()->findProduct($productA)['quantity']);
        $this->assertTrue(cart()->findProduct($productB)['id'] === $productB->id);
        $this->assertEquals(1, cart()->findProduct($productB)['quantity']);
    }

    /** @test */
    public function a_guest_can_add_the_same_product_to_his_cart_multiple_times()
    {
        $product = $this->create('Product')->addItems(3);

        $this->post(route('carts.store', $product), ['quantity' => 1]);
        $this->post(route('carts.store', $product), ['quantity' => 1]);
        $this->post(route('carts.store', $product), ['quantity' => 1]);

        $this->assertTrue(cart()->findProduct($product)['id'] === $product->id);
        $this->assertEquals(3, cart()->findProduct($product)['quantity']);
    }

    /** @test */
    public function a_guest_cannot_add_products_to_his_cart_if_none_remain()
    {
        $product = $this->create('Product');

        $this->post(route('carts.store', $product), ['quantity' => 3]);

        $this->assertFalse(session()->has('cart'));
    }

    /** @test */
    public function a_guest_cannot_add_more_products_to_his_cart_if_none_others_remain()
    {
        $product = $this->create('Product')->addItems(2);

        $this->post(route('carts.store', $product), ['quantity' => 2]);
        $this->post(route('carts.store', $product), ['quantity' => 1]);

        $this->assertTrue(cart()->findProduct($product)['id'] === $product->id);
        $this->assertEquals(2, cart()->findProduct($product)['quantity']);
    }

    /** @test */
    public function if_a_guest_adds_more_products_than_remain_to_his_cart_at_once_the_remainder_is_added()
    {
        $product = $this->create('Product')->addItems(2);

        $this->post(route('carts.store', $product), ['quantity' => 3]);

        $this->assertTrue(cart()->findProduct($product)['id'] === $product->id);
        $this->assertEquals(2, cart()->findProduct($product)['quantity']);
    }

    /** @test */
    public function if_a_guest_adds_more_products_than_remain_to_his_cart_at_different_times_the_remainder_is_added()
    {
        $product = $this->create('Product')->addItems(2);

        $this->post(route('carts.store', $product), ['quantity' => 1]);
        $this->post(route('carts.store', $product), ['quantity' => 3]);

        $this->assertTrue(cart()->findProduct($product)['id'] === $product->id);
        $this->assertEquals(2, cart()->findProduct($product)['quantity']);
    }

    /** @test */
    public function a_guest_that_logs_in_with_products_in_his_cart_has_the_products_added_to_his_accounts_empty_cart()
    {
        $productA = $this->create('Product')->addItems(2);
        $productB = $this->create('Product')->addItems(1);
        $this->post(route('carts.store', $productA), ['quantity' => 1]);
        $this->post(route('carts.store', $productB), ['quantity' => 1]);
        $user = $this->create('User', 1, ['password' => bcrypt($password = 'my-password')]);
        $this->assertNull($user->cart);

        $this->post(route('login'), [
            'email'    => $user->email,
            'password' => $password,
        ]);

        $this->signIn($user->fresh());
        $this->assertTrue(cart()->findProduct($productA)['id'] === $productA->id);
        $this->assertEquals(1, cart()->findProduct($productA)['quantity']);
        $this->assertTrue(cart()->findProduct($productB)['id'] === $productB->id);
        $this->assertEquals(1, cart()->findProduct($productB)['quantity']);
    }

    /** @test */
    public function a_guest_that_logs_in_with_products_in_his_cart_has_the_products_added_to_his_accounts_non_empty_cart()
    {
        $productA = $this->create('Product')->addItems(3);
        $productB = $this->create('Product')->addItems(2);

        $user = $this->create('User', 1, ['password' => bcrypt($password = 'my-password')]);
        $this->signIn($user);
        $this->post(route('carts.store', $productA), ['quantity' => 3]);
        $this->signIn($user->fresh());
        $this->post(route('carts.store', $productB), ['quantity' => 1]);
        auth()->logout();

        $this->post(route('carts.store', $productA), ['quantity' => 2]);
        $this->post(route('carts.store', $productB), ['quantity' => 1]);

        $this->post(route('login'), [
            'email'    => $user->email,
            'password' => $password,
        ]);

        $this->signIn($user->fresh());
        $this->assertTrue(cart()->findProduct($productA)['id'] === $productA->id);
        $this->assertEquals(3, cart()->findProduct($productA)['quantity']);
        $this->assertTrue(cart()->findProduct($productB)['id'] === $productB->id);
        $this->assertEquals(2, cart()->findProduct($productB)['quantity']);
    }

    /** @test */
    public function a_guest_that_registers_with_products_in_his_cart_has_the_products_added_to_his_accounts_cart()
    {
        $productA = $this->create('Product')->addItems(2);
        $productB = $this->create('Product')->addItems(1);
        $this->post(route('carts.store', $productA), ['quantity' => 2]);
        $this->post(route('carts.store', $productB), ['quantity' => 1]);

        $this->post(route('register'), [
            'email'    => 'user@example.com',
            'password' => 'my-password',
        ]);

        $this->signIn(auth()->user()->fresh());
        $this->assertTrue(cart()->findProduct($productA)['id'] === $productA->id);
        $this->assertEquals(2, cart()->findProduct($productA)['quantity']);
        $this->assertTrue(cart()->findProduct($productB)['id'] === $productB->id);
        $this->assertEquals(1, cart()->findProduct($productB)['quantity']);
    }

    /** @test */
    public function quantity_is_required_to_add_a_product_to_the_cart()
    {
        $product = $this->create('Product')->addItems(1);

        $response = $this->from(route('products.show', [$product->brand_id, $product]))->post(route('carts.store', $product), ['quantity' => '']);

        $this->assertValidationError($response, route('products.show', [$product->brand_id, $product]), 'quantity');
        $this->assertFalse(session()->has('cart'));
    }

    /** @test */
    public function quantity_must_be_an_integer_to_add_a_product_to_the_cart()
    {
        $product = $this->create('Product')->addItems(1);

        $response = $this->from(route('products.show', [$product->brand_id, $product]))->post(route('carts.store', $product), ['quantity' => 1.3]);

        $this->assertValidationError($response, route('products.show', [$product->brand_id, $product]), 'quantity');
        $this->assertFalse(session()->has('cart'));
    }

    /** @test */
    public function quantity_must_be_at_least_1_to_add_a_product_to_the_cart()
    {
        $product = $this->create('Product')->addItems(1);

        $response = $this->from(route('products.show', [$product->brand_id, $product]))->post(route('carts.store', $product), ['quantity' => 0]);

        $this->assertValidationError($response, route('products.show', [$product->brand_id, $product]), 'quantity');
        $this->assertFalse(session()->has('cart'));
    }
}
