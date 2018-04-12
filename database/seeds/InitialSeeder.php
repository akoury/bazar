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
            'name'   => 'Apple',
            'slogan' => 'Think different',
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
            'confirmation_number' => '123',
            'user_id'             => $user
        ]);

        $order2 = factory(Order::class)->create([
            'confirmation_number' => '1234',
            'user_id'             => $user
        ]);

        $item = factory(Item::class, 3)->create([
            'order_id'   => $order->id,
            'product_id' => $product->id,
            'price'      => $product->price
        ]);
    }
}
