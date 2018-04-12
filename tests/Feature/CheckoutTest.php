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

        $response = $this->post(route('orders.store'), [
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

        $response = $this->actingAs($user->fresh())->post(route('orders.store'), [
            'email'         => 'user@example.com',
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ]);

        $order = Order::first();
        $this->assertTrue($order->user->is($user));
        $this->signIn($user->fresh());
        $this->assertEmpty(cart()->products);
    }

    /** @test */
    public function a_guest_cannot_checkout_with_an_unpublished_product_in_his_cart()
    {
        $productA = $this->create('Product', 1, ['price' => 3250])->addItems(1);
        $productB = $this->create('Product', 1, ['price' => 2000])->addItems(2);

        $this->post(route('carts.store', $productA), ['quantity' => 1]);
        $this->post(route('carts.store', $productB), ['quantity' => 2]);

        $productA->update(['published' => false]);

        $response = $this->post(route('orders.store'), [
            'email'         => 'customer@example.com',
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ]);

        $response->assertStatus(422);
        $this->assertEquals(0, $this->paymentGateway->totalCharges());
        $order = Order::first();
        $this->assertNull($order);
        $this->assertEquals(1, $productA->itemsRemaining());
        $this->assertEquals(2, $productB->itemsRemaining());
    }

    /** @test */
    public function an_order_is_not_created_if_payment_fails()
    {
        $productA = $this->create('Product', 1, ['price' => 3250])->addItems(1);
        $productB = $this->create('Product', 1, ['price' => 2000])->addItems(2);

        $this->post(route('carts.store', $productA), ['quantity' => 1]);
        $this->post(route('carts.store', $productB), ['quantity' => 2]);

        $response = $this->post(route('orders.store'), [
            'email'         => 'customer@example.com',
            'payment_token' => 'invalid-payment-token'
        ]);

        $response->assertStatus(422);
        $this->assertEquals(0, $this->paymentGateway->totalCharges());
        $order = Order::first();
        $this->assertNull($order);
        $this->assertEquals(1, $productA->itemsRemaining());
        $this->assertEquals(2, $productB->itemsRemaining());
    }

    /** @test */
    public function a_customer_cannot_checkout_more_items_than_remain()
    {
        $this->withoutExceptionHandling();
        $productA = $this->create('Product', 1, ['price' => 3250])->addItems(1);
        $productB = $this->create('Product', 1, ['price' => 2000])->addItems(2);

        $this->post(route('carts.store', $productA), ['quantity' => 1]);
        $this->post(route('carts.store', $productB), ['quantity' => 2]);

        cart()->products->transform(function ($product) {
            $product['quantity'] = 10;
            return $product;
        });

        $response = $this->post(route('orders.store'), [
            'email'         => 'customer@example.com',
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ]);

        $response->assertStatus(422);
        $this->assertEquals(0, $this->paymentGateway->totalCharges());
        $order = Order::first();
        $this->assertNull($order);
        $this->assertEquals(1, $productA->itemsRemaining());
        $this->assertEquals(2, $productB->itemsRemaining());
    }

    /** @test */
    public function a_customer_cannot_checkout_items_another_customer_is_already_purchasing()
    {
        $product = $this->create('Product', 1, ['price' => 1200])->addItems(3);

        $userA = $this->create('User', 1, ['email' => 'userA@example.com']);
        $userB = $this->create('User', 1, ['email' => 'userB@example.com']);

        $this->actingAs($userA)->post(route('carts.store', $product), ['quantity' => 3]);
        $this->actingAs($userB)->post(route('carts.store', $product), ['quantity' => 1]);

        $this->paymentGateway->beforeFirstCharge(function () use ($userB, $product) {
            $response = $this->actingAs($userB->fresh())->post(route('orders.store'), [
                'email'         => 'userB@example.com',
                'payment_token' => $this->paymentGateway->getValidTestToken()
            ]);

            $response->assertStatus(422);
            $order = $product->orders()->where('email', 'userB@example.com')->first();
            $this->assertNull($order);
            $this->assertEquals(0, $this->paymentGateway->totalCharges());
        });

        $response = $this->actingAs($userA->fresh())->post(route('orders.store'), [
            'email'         => 'userA@example.com',
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ]);

        $this->assertEquals(3600, $this->paymentGateway->totalCharges());
        $order = $product->orders()->where('email', 'userA@example.com')->first();
        $this->assertNotNull($order);
        $this->assertEquals(3, $order->itemQuantity());
    }

    /** @test */
    public function if_checkout_fails_the_items_remain_in_the_customers_cart()
    {
        $productA = $this->create('Product', 1, ['price' => 3250])->addItems(1);
        $productB = $this->create('Product', 1, ['price' => 2000])->addItems(2);

        $this->post(route('carts.store', $productA), ['quantity' => 1]);
        $this->post(route('carts.store', $productB), ['quantity' => 2]);

        $response = $this->post(route('orders.store'), [
            'email'         => 'customer@example.com',
            'payment_token' => 'invalid-payment-token'
        ]);

        $response->assertStatus(422);
        $this->assertEquals(1, cart()->findProduct($productA)['quantity']);
        $this->assertTrue(cart()->findProduct($productA)['id'] === $productA->id);
        $this->assertEquals(2, cart()->findProduct($productB)['quantity']);
        $this->assertTrue(cart()->findProduct($productB)['id'] === $productB->id);
    }

    /** @test */
    public function email_is_required_to_checkout()
    {
        $response = $this->json('POST', route('orders.store'), [
            'email'         => '',
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ]);

        $this->assertJsonValidationError($response, 'email');
    }

    /** @test */
    public function email_must_be_valid_to_checkout()
    {
        $response = $this->json('POST', route('orders.store'), [
            'email'         => 'not-an-email',
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ]);

        $this->assertJsonValidationError($response, 'email');
    }

    /** @test */
    public function payment_token_is_required_to_checkout()
    {
        $response = $this->json('POST', route('orders.store'), [
            'email'         => 'customer@example.com',
            'payment_token' => ''
        ]);

        $this->assertJsonValidationError($response, 'payment_token');
    }
}
