<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Product;
use App\Classes\Reservation;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ReservationTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function calculating_the_total_cost()
    {
        $product = factory(Product::class)->create(['price' => 1200])->addItems(3);
        $items = $product->findItems(3);

        $reservation = new Reservation($items);

        $this->assertEquals(3600, $reservation->totalCost());
    }
}
