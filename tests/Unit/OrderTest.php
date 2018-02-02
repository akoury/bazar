<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Item;
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
        $order = factory(Order::class)->create([
            'confirmation_number' => 'CONFIRMATIONNUMBER123',
            'email'               => 'customer@example.com',
            'amount'              => 6000
        ]);
        $order->items()->saveMany(factory(Item::class, 5)->create());

        $result = $order->toArray();

        $this->assertEquals([
            'confirmation_number' => 'CONFIRMATIONNUMBER123',
            'email'               => 'customer@example.com',
            'quantity'            => 5,
            'amount'              => 6000
        ], $result);
    }

    /** @test */
    public function must_be_24_characters_long()
    {
        $confirmationNumber = Order::generateConfirmationNumber();
        $this->assertEquals(24, strlen($confirmationNumber));
    }

    /** @test */
    public function can_only_contain_uppercase_letters_and_numbers()
    {
        $confirmationNumber = Order::generateConfirmationNumber();
        $this->assertRegExp('/^[A-Z0-9]+$/', $confirmationNumber);
    }

    /** @test */
    public function cannot_contain_ambiguous_characters()
    {
        $confirmationNumber = Order::generateConfirmationNumber();
        $this->assertFalse(strpos($confirmationNumber, '1'));
        $this->assertFalse(strpos($confirmationNumber, 'I'));
        $this->assertFalse(strpos($confirmationNumber, '0'));
        $this->assertFalse(strpos($confirmationNumber, 'O'));
    }

    /** @test */
    public function confirmation_numbers_must_be_unique()
    {
        $confirmationNumbers = array_map(function () {
            return Order::generateConfirmationNumber();
        }, range(1, 100));

        $this->assertCount(100, array_unique($confirmationNumbers));
    }
}
