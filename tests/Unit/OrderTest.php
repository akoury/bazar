<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function items_are_released_when_an_order_is_cancelled()
    {
        $product = factory(Product::class)->create()->addItems(10);
        $order = $product->orderItems('customer@example.com', 2);
        $this->assertEquals(8, $product->itemsRemaining());

        $order->cancel();

        $this->assertEquals(10, $product->itemsRemaining());
        $this->assertNull($order->fresh());
    }
}
