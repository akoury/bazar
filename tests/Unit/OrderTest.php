<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function creating_an_order_from_email_items_and_amount()
    {
        $product = factory(Product::class)->create()->addItems(5);
        $this->assertEquals(5, $product->itemsRemaining());

        $order = Order::forItems('customer@example.com', $product->findItems(3), 3600);

        $this->assertEquals('customer@example.com', $order->email);
        $this->assertEquals(3, $order->itemQuantity());
        $this->assertEquals(3600, $order->amount);
        $this->assertEquals(2, $product->itemsRemaining());
    }

    /** @test */
    public function retrieving_an_order_by_confirmation_number()
    {
        $order = factory(Order::class)->create([
            'confirmation_number' => '123456789'
        ]);

        $foundOrder = Order::findByConfirmationNumber($order->confirmation_number);

        $this->assertEquals($order->fresh(), $foundOrder);
    }

    /** @test */
    public function convert_order_to_an_array()
    {
        $product = factory(Product::class)->create(['price' => 1200])->addItems(5);
        $order = $product->orderItems('customer@example.com', 5);

        $result = $order->toArray();

        $this->assertEquals([
            'email'    => $order->email,
            'quantity' => $order->itemQuantity(),
            'amount'   => 6000
        ], $result);
    }
}
