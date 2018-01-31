<?php

namespace Tests\Unit;

use Mockery;
use Tests\TestCase;
use App\Models\Item;
use App\Models\Product;
use App\Classes\Reservation;
use Tests\Fakes\FakePaymentGateway;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ReservationTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_calculate_the_total_cost()
    {
        $items = collect([
            (object) ['price' => 1200],
            (object) ['price' => 1200],
            (object) ['price' => 1200]
        ]);

        $reservation = new Reservation($items, 'customer@example.com');

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

        $reservation = new Reservation($items, 'customer@example.com');

        $reservation->cancel();

        $items->each->shouldHaveReceived('release');
    }

    /** @test */
    public function can_retrieve_a_reservations_items()
    {
        $items = collect([
            (object) ['price' => 1200],
            (object) ['price' => 1200],
            (object) ['price' => 1200]
        ]);

        $reservation = new Reservation($items, 'customer@example.com');

        $this->assertEquals($items, $reservation->items());
    }

    /** @test */
    public function can_retrieve_a_customers_email_from_the_reservation()
    {
        $reservation = new Reservation(collect(), 'customer@example.com');

        $this->assertEquals('customer@example.com', $reservation->email());
    }

    /** @test */
    public function can_complete_a_reservation()
    {
        $product = factory(Product::class)->create(['price' => 1200]);
        $items = factory(Item::class, 3)->create(['product_id' => $product->id]);
        $reservation = new Reservation($items, 'customer@example.com');
        $paymentGateway = new FakePaymentGateway;

        $order = $reservation->complete($paymentGateway, $paymentGateway->getValidTestToken());

        $this->assertEquals('customer@example.com', $order->email);
        $this->assertEquals(3, $order->itemQuantity());
        $this->assertEquals(3600, $order->amount);
        $this->assertEquals(3600, $paymentGateway->totalCharges());
    }
}
