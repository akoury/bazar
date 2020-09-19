<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Item;
use App\Models\Order;
use App\Classes\Charge;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_create_an_order_from_an_email_items_and_charge()
    {
        $items = $this->create('Item', 3);
        $charge = new Charge(3600, '1234');

        $order = Order::forItems('customer@example.com', $items, $charge);

        $this->assertEquals('customer@example.com', $order->email);
        $this->assertEquals(3, $order->itemQuantity());
        $this->assertEquals(3600, $order->amount);
        $this->assertEquals('1234', $order->card_last_four);
    }

    /** @test */
    public function retrieving_an_order_by_confirmation_number()
    {
        $order = $this->create('Order', 1, [
            'confirmation_number' => '123456789'
        ]);

        $foundOrder = Order::findByConfirmationNumber($order->confirmation_number);

        $this->assertEquals($order->fresh(), $foundOrder);
    }

    /** @test */
    public function retrieving_a_nonexistent_order_by_confirmation_number_throws_an_exception()
    {
        $this->expectException(ModelNotFoundException::class);

        Order::findByConfirmationNumber('NONEXISTENTCONFIRMATIONNUMBER');
    }

    /** @test */
    public function convert_order_to_an_array()
    {
        $order = $this->create('Order', 1, [
            'confirmation_number' => 'CONFIRMATIONNUMBER123',
            'email'               => 'customer@example.com',
            'amount'              => 6000
        ]);
        $order->items()->saveMany($this->create('Item', 5));

        $result = $order->toArray();

        $this->assertEquals([
            'confirmation_number' => 'CONFIRMATIONNUMBER123',
            'email'               => 'customer@example.com',
            'quantity'            => 5,
            'amount'              => 6000
        ], $result);
    }

    /** @test */
    public function confirmation_number_must_be_24_characters_long()
    {
        $confirmationNumber = Order::generateConfirmationNumber();
        $this->assertEquals(24, strlen($confirmationNumber));
    }

    /** @test */
    public function confirmation_number_can_only_contain_uppercase_letters_and_numbers()
    {
        $confirmationNumber = Order::generateConfirmationNumber();
        $this->assertMatchesRegularExpression('/^[A-Z0-9]+$/', $confirmationNumber);
    }

    /** @test */
    public function confirmation_number_cannot_contain_ambiguous_characters()
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
