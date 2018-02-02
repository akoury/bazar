<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Order::class, function (Faker $faker) {
    return [
        'amount'              => 5250,
        'email'               => 'customer@example.com',
        'confirmation_number' => 'CONFIRMATIONNUMBER123',
        'card_last_four'      => '1234',
    ];
});
