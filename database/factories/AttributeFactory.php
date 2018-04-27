<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Attribute::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
    ];
});
