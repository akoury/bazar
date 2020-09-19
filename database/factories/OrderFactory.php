<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'amount'              => 5250,
            'email'               => 'customer@example.com',
            'confirmation_number' => $this->faker->bankAccountNumber(),
            'card_last_four'      => '1234',
            'user_id'             => null,
        ];
    }
}
