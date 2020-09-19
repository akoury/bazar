<?php

namespace Database\Seeders;

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
        $user = User::factory()->create([
            'email'    => 'user@gmail.com',
            'password' => bcrypt('123123123')
        ]);

        $brand = $user->brands()->create([
            'name'   => 'Apple',
            'slogan' => 'Think different',
        ]);

        $model = ProductModel::factory()->create([
            'name'     => 'iPhone X',
            'brand_id' => $brand->id
        ]);

        $attribute = Attribute::factory()->create([
            'name' => 'color',
        ]);

        $valueA = Value::factory()->create([
            'name'         => 'black',
            'attribute_id' => $attribute->id
        ]);

        $valueB = Value::factory()->create([
            'name'         => 'gold',
            'attribute_id' => $attribute->id
        ]);

        $attributeB = Attribute::factory()->create([
            'name' => 'capacity',
        ]);

        $valueC = Value::factory()->create([
            'name'         => '32gb',
            'attribute_id' => $attributeB->id
        ]);

        $valueD = Value::factory()->create([
            'name'         => '64gb',
            'attribute_id' => $attributeB->id
        ]);

        $attributeC = Attribute::factory()->create([
            'name' => 'gender',
        ]);

        $valueE = Value::factory()->create([
            'name'         => 'male',
            'attribute_id' => $attributeC->id
        ]);

        $valueF = Value::factory()->create([
            'name'         => 'female',
            'attribute_id' => $attributeC->id
        ]);

        $product = Product::factory()->create([
            'product_model_id' => $model->id
        ])->addItems(5);

        $product->values()->attach($valueA);
        $product->values()->attach($valueC);
        $product->values()->attach($valueE);

        $product2 = Product::factory()->create([
            'product_model_id' => $model->id
        ])->addItems(3);

        $product2->values()->attach($valueB);
        $product2->values()->attach($valueD);
        $product2->values()->attach($valueF);

        $product3 = Product::factory()->create([
            'product_model_id' => $model->id
        ])->addItems(2);

        $product3->values()->attach($valueA);
        $product3->values()->attach($valueC);
        $product3->values()->attach($valueF);

        $product3 = Product::factory()->create([
            'product_model_id' => $model->id
        ])->addItems(1);

        $product3->values()->attach($valueA);
        $product3->values()->attach($valueD);
        $product3->values()->attach($valueF);

        $model = ProductModel::factory()->create([
            'name'     => 'iPhone 8',
            'brand_id' => $brand->id
        ]);

        $product3 = Product::factory()->create([
            'product_model_id' => $model->id
        ])->addItems(2);

        $order = Order::factory()->create([
            'confirmation_number' => '123',
            'user_id'             => $user
        ]);

        $order2 = Order::factory()->create([
            'confirmation_number' => '1234',
            'user_id'             => $user
        ]);

        $item = Item::factory()->count(3)->create([
            'order_id'   => $order->id,
            'product_id' => $product->id,
            'price'      => $product->price
        ]);
    }
}
