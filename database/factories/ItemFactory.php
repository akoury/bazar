<?php

use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(App\Models\Item::class, function (Faker $faker) {
    return [
        'product_id' => function () {
            return factory(App\Models\Product::class)->create()->id;
        }
    ];
});

$factory->state(App\Models\Item::class, 'reserved', function (Faker $faker) {
    return [
        'reserved_at' => Carbon::now(),
    ];
});
