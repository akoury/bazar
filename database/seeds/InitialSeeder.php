<?php

use App\Models\Item;
use App\Models\User;
use App\Models\Order;
use App\Models\Value;
use App\Models\Product;
use App\Models\Attribute;
use App\Models\ProductModel;
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

        $model = factory(ProductModel::class)->create([
            'name'     => 'iPhone X',
            'brand_id' => $brand->id
        ]);

        $attribute = factory(Attribute::class)->create([
            'name' => 'Color',
        ]);

        $valueA = factory(Value::class)->create([
            'name'         => 'black',
            'attribute_id' => $attribute->id
        ]);

        $valueB = factory(Value::class)->create([
            'name'         => 'gold',
            'attribute_id' => $attribute->id
        ]);

        $attributeB = factory(Attribute::class)->create([
            'name' => 'Capacity',
        ]);

        $valueC = factory(Value::class)->create([
            'name'         => '32gb',
            'attribute_id' => $attributeB->id
        ]);

        $product = factory(Product::class)->create([
            'product_model_id' => $model->id
        ])->addItems(5);

        $product->values()->attach($valueA);
        $product->values()->attach($valueC);

        $product2 = factory(Product::class)->create([
            'product_model_id' => $model->id
        ])->addItems(3);

        $product2->values()->attach($valueB);
        $product2->values()->attach($valueC);

        $model = factory(ProductModel::class)->create([
            'name'     => 'iPhone 8',
            'brand_id' => $brand->id
        ]);

        $product3 = factory(Product::class)->create([
            'product_model_id' => $model->id
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
