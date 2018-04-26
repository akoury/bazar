<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Product::class, function (Faker $faker) {
    return [
        'product_model_id' => function () {
            return factory(App\Models\ProductModel::class)->create()->id;
        },
        'price' => $faker->numberBetween(100, 10000)
    ];
});
