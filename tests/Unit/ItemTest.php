<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ItemTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function an_item_can_be_released()
    {
        $product = factory(Product::class)->create()->addItems(1);
        ;
        $order = $product->orderItems('customer@example.com', 1);
        $item = $order->items()->first();
        $this->assertEquals($order->id, $item->order_id);

        $item->release();

        $this->assertNull($item->fresh()->order_id);
    }
}
