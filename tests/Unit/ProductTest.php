<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Item;
use App\Models\Order;
use App\Models\Product;
use App\Exceptions\NotEnoughItemsException;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_get_a_products_price_with_decimals()
    {
        $product = factory(Product::class)->make([
            'price' => 6750,
        ]);

        $this->assertEquals('67.50', $product->price());
    }

    /** @test */
    public function can_add_items()
    {
        $product = factory(Product::class)->create()->addItems(20);

        $this->assertEquals(20, $product->itemsRemaining());
    }

    /** @test */
    public function items_remaining_does_not_include_items_associated_with_an_order()
    {
        $product = factory(Product::class)->create();
        $product->items()->saveMany(factory(Item::class, 10)->create(['order_id' => 1]));
        $product->items()->saveMany(factory(Item::class, 2)->create(['order_id' => null]));

        $this->assertEquals(2, $product->itemsRemaining());
    }

    /** @test */
    public function trying_to_reserve_more_items_than_remain_throws_an_exception()
    {
        $product = factory(Product::class)->create()->addItems(10);

        try {
            $reservation = $product->reserveItems(11, 'customer@example.com');
        } catch (NotEnoughItemsException $e) {
            $this->assertEquals(10, $product->itemsRemaining());
            return;
        }

        $this->fail('Order succeeded even though there were not enough items remaining.');
    }

    /** @test */
    public function a_customer_can_reserve_available_items()
    {
        $product = factory(Product::class)->create()->addItems(3);
        $this->assertEquals(3, $product->itemsRemaining());

        $reservation = $product->reserveItems(2, 'customer@example.com');

        $this->assertCount(2, $reservation->items());
        $this->assertEquals('customer@example.com', $reservation->email());
        $this->assertEquals(1, $product->itemsRemaining());
    }

    /** @test */
    public function a_customer_cannot_reserve_items_that_have_already_been_purchased()
    {
        $product = factory(Product::class)->create()->addItems(3);
        $order = factory(Order::class)->create();
        $order->items()->saveMany($product->items->take(2));

        try {
            $product->reserveItems(2, 'personB@example.com');
        } catch (NotEnoughItemsException $e) {
            $this->assertEquals(1, $product->itemsRemaining());
            return;
        }

        $this->fail('Reserving items succeeded even though the items were already sold');
    }

    /** @test */
    public function a_customer_cannot_reserve_items_that_have_already_been_reserved()
    {
        $product = factory(Product::class)->create()->addItems(3);
        $product->reserveItems(2, 'personA@example.com');

        try {
            $product->reserveItems(2, 'personB@example.com');
        } catch (NotEnoughItemsException $e) {
            $this->assertEquals(1, $product->itemsRemaining());
            return;
        }

        $this->fail('Reserving items succeeded even though the items were already reserved');
    }
}
