<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Order::class, function (Faker $faker) {
    return [
        'amount'              => 5250,
        'email'               => 'customer@example.com',
        'confirmation_number' => $faker->bankAccountNumber(),
        'card_last_four'      => '1234',
    ];
});
