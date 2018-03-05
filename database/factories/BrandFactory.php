<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Brand::class, function (Faker $faker) {
    return [
        'name'   => $faker->name,
        'slogan' => $faker->sentence(6),
    ];
});
