<?php

use App\Models\Item;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Seeder;

class InitialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $product = factory(Product::class)->create([
            'name' => 'iPhone X'
        ]);

        $product2 = factory(Product::class)->create([
            'name' => 'iPhone 8',
        ]);

        $order = factory(Order::class)->create([
            'confirmation_number' => '123'
        ]);

        $item = factory(Item::class, 3)->create([
            'order_id'   => $order->id,
            'product_id' => $product->id
        ]);
    }
}
