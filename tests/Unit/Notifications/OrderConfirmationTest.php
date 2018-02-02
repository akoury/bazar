<?php

namespace Tests\Unit\Notifications;

use Tests\TestCase;
use App\Models\Order;
use App\Notifications\OrderConfirmation;
use Illuminate\Notifications\AnonymousNotifiable;

class OrderConfirmationTest extends TestCase
{
    /** @test */
    public function email_contains_a_link_to_the_order_confirmation_page()
    {
        $order = factory(Order::class)->make([
           'confirmation_number' => 'CONFIRMATIONNUMBER123'
        ]);

        $notification = (new OrderConfirmation($order))->toMail(new AnonymousNotifiable());

        $this->assertContains(route('orders.show', ['confirmation_number' => $order->confirmation_number]), $notification->data());
    }
}
