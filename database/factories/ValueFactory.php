<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Value::class, function (Faker $faker) {
    return [
        'name'         => $faker->name,
        'attribute_id' => function () {
            return factory(App\Models\Attribute::class)->create()->id;
        }
    ];
});
