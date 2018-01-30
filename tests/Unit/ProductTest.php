<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Product;
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

        $this->assertEquals('67.50', $product->price_with_decimals);
    }

    /** @test */
    public function can_order_items()
    {
        $product = factory(Product::class)->create();

        $order = $product->orderItems('customer@example.com', 3);

        $this->assertEquals('customer@example.com', $order->email);
        $this->assertEquals(3, $order->items()->count());
    }
}
