<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Product;
use App\Classes\PaymentGateway;
use Tests\Fakes\FakePaymentGateway;
use App\Notifications\OrderConfirmation;
use Illuminate\Support\Facades\Notification;
use Illuminate\Notifications\AnonymousNotifiable;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PurchaseItemsTest extends TestCase
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

    private function orderItems($product, $params)
    {
        return $this->json('POST', "products/{$product->id}/orders", $params);
    }

    /** @test */
    public function a_guest_can_purchase_items_of_a_published_product()
    {
        $product = $this->create('Product', 1, ['price' => 3250])->addItems(3);

        $response = $this->orderItems($product, [
            'email'         => 'customer@example.com',
            'quantity'      => 3,
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ]);

        $order = $response->original;

        $response->assertStatus(201)
            ->assertJson([
                'confirmation_number' => $order->confirmation_number,
                'email'               => 'customer@example.com',
                'quantity'            => 3,
                'amount'              => 9750
            ]);

        $this->assertEquals(9750, $this->paymentGateway->totalCharges());

        $order = $product->orders()->where('email', 'customer@example.com')->first();
        $this->assertNotNull($order);
        $this->assertNull($order->user);
        $this->assertEquals(3, $order->itemQuantity());

        Notification::assertSentTo(new AnonymousNotifiable(), OrderConfirmation::class, function ($notification, $channels, $notifiable) use ($order) {
            return $notifiable->routes['mail'] == 'customer@example.com'
                && $notification->order->id == $order->id;
        });
    }

    /** @test */
    public function a_user_can_purchase_items_of_a_published_product_and_have_the_order_belong_to_him()
    {
        $user = $this->create('User');
        $this->signIn($user);
        $product = $this->create('Product', 1)->addItems(3);

        $response = $this->orderItems($product, $this->validParams());
        $order = $response->original;

        $this->assertTrue($order->user->is($user));
    }

    /** @test */
    public function a_customer_cannot_purchase_items_from_an_unpublished_product()
    {
        $product = $this->create('Product', 1, [], 'unpublished')->addItems(3);

        $response = $this->orderItems($product, [
            'email'         => 'customer@example.com',
            'quantity'      => 3,
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ]);

        $response->assertStatus(404);
        $this->assertEquals(0, $product->orders()->count());
        $this->assertEquals(0, $this->paymentGateway->totalCharges());
    }

    /** @test */
    public function an_order_is_not_created_if_payment_fails()
    {
        $product = $this->create('Product', 1, ['price' => 3250])->addItems(3);

        $response = $this->orderItems($product, [
            'email'         => 'customer@example.com',
            'quantity'      => 3,
            'payment_token' => 'invalid-payment-token',
        ]);

        $response->assertStatus(422);
        $order = $product->orders()->where('email', 'customer@example.com')->first();
        $this->assertNull($order);
        $this->assertEquals(3, $product->itemsRemaining());
    }

    /** @test */
    public function a_customer_cannot_purchase_more_items_than_remain()
    {
        $product = $this->create('Product')->addItems(20);

        $response = $this->orderItems($product, [
            'email'         => 'customer@example.com',
            'quantity'      => 21,
            'payment_token' => $this->paymentGateway->getValidTestToken(),
        ]);

        $response->assertStatus(422);
        $order = $product->orders()->where('email', 'customer@example.com')->first();
        $this->assertNull($order);
        $this->assertEquals(0, $this->paymentGateway->totalCharges());
        $this->assertEquals(20, $product->itemsRemaining());
    }

    /** @test */
    public function a_customer_cannot_purchase_items_another_customer_is_already_purchasing()
    {
        $product = $this->create('Product', 1, ['price' => 1200])->addItems(3);

        $this->paymentGateway->beforeFirstCharge(function () use ($product) {
            $response = $this->orderItems($product, [
                'email'         => 'personB@example.com',
                'quantity'      => 1,
                'payment_token' => $this->paymentGateway->getValidTestToken(),
            ]);

            $response->assertStatus(422);
            $order = $product->orders()->where('email', 'personB@example.com')->first();
            $this->assertNull($order);
            $this->assertEquals(0, $this->paymentGateway->totalCharges());
        });

        $response = $this->orderItems($product, [
            'email'         => 'personA@example.com',
            'quantity'      => 3,
            'payment_token' => $this->paymentGateway->getValidTestToken(),
        ]);

        $this->assertEquals(3600, $this->paymentGateway->totalCharges());
        $order = $product->orders()->where('email', 'personA@example.com')->first();
        $this->assertNotNull($order);
        $this->assertEquals(3, $order->itemQuantity());
    }

    private function validParams($overrides = [])
    {
        return array_merge([
            'email'         => 'customer@example.com',
            'quantity'      => 3,
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ], $overrides);
    }

    /** @test */
    public function email_is_required_to_purchase_items()
    {
        $product = $this->create('Product');

        $response = $this->orderItems($product, $this->validParams([
            'email' => '',
        ]));

        $this->assertJsonValidationError($response, 'email');
    }

    /** @test */
    public function email_must_be_valid_to_purchase_items()
    {
        $product = $this->create('Product');

        $response = $this->orderItems($product, $this->validParams([
            'email' => 'not-an-email',
        ]));

        $this->assertJsonValidationError($response, 'email');
    }

    /** @test */
    public function item_quantity_is_required_to_purchase_items()
    {
        $product = $this->create('Product');

        $response = $this->orderItems($product, $this->validParams([
            'quantity' => '',
        ]));

        $this->assertJsonValidationError($response, 'quantity');
    }

    /** @test */
    public function item_quantity_must_be_at_least_1_to_purchase_items()
    {
        $product = $this->create('Product');

        $response = $this->orderItems($product, $this->validParams([
            'quantity' => 0,
        ]));

        $this->assertJsonValidationError($response, 'quantity');
    }

    /** @test */
    public function payment_token_is_required()
    {
        $product = $this->create('Product');

        $response = $this->orderItems($product, $this->validParams([
            'payment_token' => '',
        ]));

        $this->assertJsonValidationError($response, 'payment_token');
    }
}
