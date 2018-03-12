<?php

use App\Models\Item;
use App\Models\User;
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
        $user = factory(User::class)->create([
            'email'    => 'user@gmail.com',
            'password' => bcrypt('123123123')
        ]);

        $brand = $user->brands()->create([
            'name'   => 'epa.bazar.test',
            'slogan' => 'Think different',
            'custom' => true
        ]);

        $product = factory(Product::class)->create([
            'name'     => 'iPhone X',
            'brand_id' => $brand->id
        ])->addItems(5);

        $product2 = factory(Product::class)->create([
            'name'     => 'iPhone 8',
            'brand_id' => $brand->id
        ])->addItems(2);

        $order = factory(Order::class)->create([
            'confirmation_number' => '123'
        ]);

        $item = factory(Item::class, 3)->create([
            'order_id'   => $order->id,
            'product_id' => $product->id
        ]);
    }
}
