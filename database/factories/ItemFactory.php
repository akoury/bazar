<?php

namespace Database\Factories;

use Carbon\Carbon;
use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Item::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'product_id' => function () {
                return \App\Models\Product::factory()->create()->id;
            },
        ];
    }

    /**
     * Indicate that the item is reserved.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function reserved()
    {
        return $this->state([
            'reserved_at' => Carbon::now(),
        ]);
    }
}
