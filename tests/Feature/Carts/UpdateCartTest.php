<?php

namespace Tests\Feature\Carts;

use Tests\TestCase;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UpdateCartTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_guests_cart_is_updated_when_viewed()
    {
        $productA = $this->create('Product')->addItems(3);
        $productB = $this->create('Product')->addItems(1);
        $this->post(route('carts.store', $productA), ['quantity' => 3]);
        $this->post(route('carts.store', $productB), ['quantity' => 1]);

        $productA->reserveItems(1, 'other-customer@example.com');
        $this->get(route('carts.show'));

        $this->assertEquals(2, cart()->findProduct($productA)['quantity']);
        $this->assertEquals(1, cart()->findProduct($productB)['quantity']);

        $productA->reserveItems(2, 'other-customer@example.com');
        $this->get(route('carts.show'));

        $this->assertFalse(cart()->findProduct($productA));
        $this->assertEquals(1, cart()->findProduct($productB)['quantity']);
    }

    /** @test */
    public function a_users_cart_is_updated_when_viewed()
    {
        $user = $this->create('User');
        $this->signIn($user);
        $productA = $this->create('Product')->addItems(3);
        $productB = $this->create('Product')->addItems(1);
        $this->post(route('carts.store', $productA), ['quantity' => 3]);
        $this->actingAs($user->fresh())->post(route('carts.store', $productB), ['quantity' => 1]);
        $productA->reserveItems(1, 'other-customer@example.com');

        $this->signIn($user->fresh());
        $this->get(route('carts.show'));

        $this->signIn($user->fresh());
        $this->assertEquals(2, cart()->findProduct($productA)['quantity']);
        $this->assertEquals(1, cart()->findProduct($productB)['quantity']);

        $productA->reserveItems(2, 'other-customer@example.com');
        $this->get(route('carts.show'));

        $this->signIn($user->fresh());
        $this->assertFalse(cart()->findProduct($productA));
        $this->assertEquals(1, cart()->findProduct($productB)['quantity']);
    }

    /** @test */
    public function if_a_product_is_unpublished_it_is_removed_from_the_cart_when_viewed()
    {
        $product = $this->create('Product')->addItems(3);
        $this->post(route('carts.store', $product), ['quantity' => 3]);

        $product->published = false;
        $product->save();
        $this->get(route('carts.show'));

        $this->assertFalse(cart()->findProduct($product));
    }

    /** @test */
    public function if_a_guest_has_items_in_cart_and_logs_in_while_that_product_was_made_unpublished_those_items_are_not_added_to_his_user_cart()
    {
        $product = $this->create('Product')->addItems(3);
        $this->post(route('carts.store', $product), ['quantity' => 3]);

        $product->published = false;
        $product->save();

        $user = $this->create('User', 1, ['password' => bcrypt($password = 'my-password')]);
        $this->post(route('login'), [
            'email'    => $user->email,
            'password' => $password,
        ]);

        $this->signIn($user->fresh());
        $this->assertFalse(cart()->findProduct($product));
    }
}
