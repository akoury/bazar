<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Order;
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

    protected function setUp()
    {
        parent::setUp();
        $this->paymentGateway = new FakePaymentGateway;
        $this->app->instance(PaymentGateway::class, $this->paymentGateway);
        Notification::fake();
    }

    private function orderItems($product, $params)
    {
        $savedRequest = $this->app['request'];
        $response = $this->json('POST', "products/{$product->id}/orders", $params);
        $this->app['request'] = $savedRequest;
        return $response;
    }

    /** @test */
    public function a_customer_can_purchase_items_of_a_published_product()
    {
        $product = factory(Product::class)->create(['price' => 3250])->addItems(3);

        $response = $this->orderItems($product, [
            'email'         => 'customer@example.com',
            'quantity'      => 3,
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ]);

        $order = Order::first();

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
        $this->assertEquals(3, $order->itemQuantity());

        Notification::assertSentTo(new AnonymousNotifiable(), OrderConfirmation::class, function ($notification, $channels, $notifiable) use ($order) {
            return $notifiable->routes['mail'] == 'customer@example.com'
                && $notification->order->id == $order->id;
        });
    }

    /** @test */
    public function a_customer_cannot_purchase_items_from_an_unpublished_product()
    {
        $product = factory(Product::class)->states('unpublished')->create()->addItems(3);

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
        $product = factory(Product::class)->create(['price' => 3250])->addItems(3);

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
        $product = factory(Product::class)->create()->addItems(20);

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
        $product = factory(Product::class)->create(['price' => 1200])->addItems(3);

        $this->paymentGateway->beforeFirstCharge(function ($paymentGateway) use ($product) {
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

    private function assertValidationError($response, $field)
    {
        $response->assertStatus(422);
        $this->assertArrayHasKey($field, $response->decodeResponseJson()['errors']);
    }

    /** @test */
    public function email_is_required_to_purchase_items()
    {
        $product = factory(Product::class)->create();

        $response = $this->orderItems($product, [
            'quantity'      => 3,
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ]);

        $this->assertValidationError($response, 'email');
    }

    /** @test */
    public function email_must_be_valid_to_purchase_items()
    {
        $product = factory(Product::class)->create();

        $response = $this->orderItems($product, [
            'email'         => 'not-an-email',
            'quantity'      => 3,
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ]);

        $this->assertValidationError($response, 'email');
    }

    /** @test */
    public function item_quantity_is_required_to_purchase_items()
    {
        $product = factory(Product::class)->create();

        $response = $this->orderItems($product, [
            'email'         => 'customer@example.com',
            'payment_token' => $this->paymentGateway->getValidTestToken(),
        ]);

        $this->assertValidationError($response, 'quantity');
    }

    /** @test */
    public function item_quantity_must_be_at_least_1_to_purchase_items()
    {
        $product = factory(Product::class)->create();

        $response = $this->orderItems($product, [
            'email'         => 'john@example.com',
            'quantity'      => 0,
            'payment_token' => $this->paymentGateway->getValidTestToken(),
        ]);

        $this->assertValidationError($response, 'quantity');
    }

    /** @test */
    public function payment_token_is_required()
    {
        $product = factory(Product::class)->create();

        $response = $this->orderItems($product, [
            'email'    => 'john@example.com',
            'quantity' => 3,
        ]);
        $this->assertValidationError($response, 'payment_token');
    }
}
