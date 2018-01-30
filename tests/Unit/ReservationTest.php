<?php

namespace Tests\Unit;

use Mockery;
use Tests\TestCase;
use App\Models\Item;
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

    /** @test */
    public function reserved_items_are_released_when_a_reservation_is_cancelled()
    {
        $items = collect([
            Mockery::spy(Item::class),
            Mockery::spy(Item::class),
            Mockery::spy(Item::class),
        ]);

        $reservation = new Reservation($items);

        $reservation->cancel();

        $items->each->shouldHaveReceived('release');
    }
}
