<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Product::class, function (Faker $faker) {
    return [
        'name'        => $faker->name,
        'description' => $faker->sentence(6),
        'price'       => $faker->numberBetween(100, 10000),
        'published'   => true,
        'image_path'  => 'product-image.png'
    ];
});

$factory->state(App\Models\Product::class, 'unpublished', function (Faker $faker) {
    return [
        'published' => false,
    ];
});
