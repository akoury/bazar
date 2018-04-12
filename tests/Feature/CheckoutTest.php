<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Order;
use App\Classes\PaymentGateway;
use Tests\Fakes\FakePaymentGateway;
use App\Notifications\OrderConfirmation;
use Illuminate\Support\Facades\Notification;
use Illuminate\Notifications\AnonymousNotifiable;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CheckoutTest extends TestCase
{
    use RefreshDatabase;

    private $paymentGateway;

    protected function setUp()
    {
        parent::setUp();
        $this->paymentGateway = new FakePaymentGateway;
        $this->app->instance(PaymentGateway::class, $this->paymentGateway);
        Notification::fake();
    }

    /** @test */
    public function a_guest_can_checkout_his_cart()
    {
        $productA = $this->create('Product', 1, ['price' => 3250])->addItems(1);
        $productB = $this->create('Product', 1, ['price' => 2000])->addItems(2);

        $this->post(route('carts.store', $productA), ['quantity' => 1]);
        $this->post(route('carts.store', $productB), ['quantity' => 2]);

        $response = $this->post(route('orders.store.cart'), [
            'email'         => 'customer@example.com',
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ]);

        $order = $response->original;

        $response->assertStatus(201)
            ->assertJson([
                'confirmation_number' => $order->confirmation_number,
                'email'               => 'customer@example.com',
                'amount'              => 7250
            ]);

        $this->assertEquals(7250, $this->paymentGateway->totalCharges());

        $order = Order::first();
        $this->assertNotNull($order);
        $this->assertNull($order->user);
        $this->assertEmpty(cart()->products);

        Notification::assertSentTo(new AnonymousNotifiable(), OrderConfirmation::class, function ($notification, $channels, $notifiable) use ($order) {
            return $notifiable->routes['mail'] == 'customer@example.com'
                && $notification->order->id == $order->id;
        });
    }

    /** @test */
    public function a_user_can_checkout_his_cart_and_have_the_order_belong_to_him()
    {
        $user = $this->create('User', 1, ['email' => 'user@example.com']);
        $this->signIn($user);
        $productA = $this->create('Product', 1, ['price' => 3250])->addItems(1);
        $productB = $this->create('Product', 1, ['price' => 2000])->addItems(2);

        $this->post(route('carts.store', $productA), ['quantity' => 1]);
        $this->actingAs($user->fresh())->post(route('carts.store', $productB), ['quantity' => 2]);

        $response = $this->actingAs($user->fresh())->post(route('orders.store.cart'), [
            'email'         => 'user@example.com',
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ]);

        $order = Order::first();
        $this->assertTrue($order->user->is($user));
        $this->signIn($user->fresh());
        $this->assertEmpty(cart()->products);
    }
}
