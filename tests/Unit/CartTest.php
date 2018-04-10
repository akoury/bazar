<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Classes\Cart;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CartTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_cart_can_have_a_product_added_to_it()
    {
        $cart = new Cart();
        $product = $this->create('Product')->addItems(1);

        $cart->add($product, 1);

        $this->assertCount(1, $cart->products);
        $this->assertTrue($cart->findProduct($product)['id'] === $product->id);
    }

    /** @test */
    public function a_cart_can_have_a_product_added_to_it_multiple_times()
    {
        $cart = new Cart();
        $product = $this->create('Product')->addItems(3);

        $cart->add($product, 1);
        $cart->add($product, 2);

        $this->assertEquals(3, $cart->findProduct($product)['quantity']);
    }

    /** @test */
    public function a_user_cart_can_be_saved_to_the_database()
    {
        $user = $this->create('User');
        $this->signIn($user);
        $cart = new Cart();
        $product = $this->create('Product')->addItems(2);

        $cart->add($product, 2);
        $cart->save();

        $this->assertNotNull($user->cart);
        $this->assertEquals(2, cart()->findProduct($product)['quantity']);
    }

    /** @test */
    public function a_guest_cart_can_be_saved_to_the_session()
    {
        $cart = new Cart();
        $product = $this->create('Product')->addItems(2);

        $cart->add($product, 2);
        $cart->save();

        $this->assertTrue(session()->has('cart'));
        $this->assertEquals(2, cart()->findProduct($product)['quantity']);
    }

    /** @test */
    public function a_cart_can_find_products_that_are_in_it()
    {
        $cart = new Cart();
        $productA = $this->create('Product')->addItems(2);
        $productB = $this->create('Product')->addItems(1);
        $cart->add($productA, 2);

        $this->assertTrue($cart->findProduct($productA)['id'] === $productA->id);
        $this->assertFalse($cart->findProduct($productB));
    }

    /** @test */
    public function a_cart_can_have_a_product_removed_from_it()
    {
        $cart = new Cart();
        $productA = $this->create('Product')->addItems(2);
        $productB = $this->create('Product')->addItems(1);
        $cart->add($productA, 2);
        $cart->add($productB, 1);
        $this->assertTrue($cart->findProduct($productA)['id'] === $productA->id);
        $this->assertTrue($cart->findProduct($productB)['id'] === $productB->id);

        $cart->remove($productA);

        $this->assertFalse($cart->findProduct($productA));
        $this->assertTrue($cart->findProduct($productB)['id'] === $productB->id);
    }

    /** @test */
    public function a_cart_can_calculate_its_total()
    {
        $cart = new Cart();
        $productA = $this->create('Product', 1, ['price' => 3250])->addItems(2);
        $productB = $this->create('Product', 1, ['price' => 2720])->addItems(1);
        $cart->add($productA, 2);
        $cart->add($productB, 1);

        $this->assertEquals(9220, $cart->total());
    }

    /** @test */
    public function a_cart_can_be_cleared()
    {
        $cart = new Cart();
        $productA = $this->create('Product')->addItems(2);
        $productB = $this->create('Product')->addItems(1);
        $cart->add($productA, 2);
        $cart->add($productB, 1);
        $this->assertTrue($cart->findProduct($productA)['id'] === $productA->id);
        $this->assertTrue($cart->findProduct($productB)['id'] === $productB->id);

        $cart->clear();

        $this->assertEmpty($cart->products);
    }
}
