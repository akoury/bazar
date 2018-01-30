<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Product;
use App\Classes\PaymentGateway;
use Tests\Fakes\FakePaymentGateway;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PurchaseProductsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp()
    {
        parent::setUp();
        $this->paymentGateway = new FakePaymentGateway;
        $this->app->instance(PaymentGateway::class, $this->paymentGateway);
    }

    private function orderProducts($product, $params)
    {
        return $this->json('POST', "products/{$product->id}/orders", $params);
    }

    /** @test */
    public function a_customer_can_purchase_a_published_product()
    {
        $product = factory(Product::class)->create(['price' => 3250]);

        $response = $this->orderProducts($product, [
            'email'         => 'customer@example.com',
            'quantity'      => 3,
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ]);

        $response->assertStatus(201);

        $this->assertEquals(9750, $this->paymentGateway->totalCharges());

        $order = $product->orders()->where('email', 'customer@example.com')->first();
        $this->assertNotNull($order);
        $this->assertEquals(3, $order->items->count());
    }

    /** @test */
    public function an_order_is_not_created_if_payment_fails(Type $var = null)
    {
        $product = factory(Product::class)->create(['price' => 3250]);

        $response = $this->orderProducts($product, [
            'email'         => 'customer@example.com',
            'quantity'      => 3,
            'payment_token' => 'invalid-payment-token',
        ]);

        $response->assertStatus(422);
        $order = $product->orders()->where('email', 'customer@example.com')->first();
        $this->assertNull($order);
    }

    /** @test */
    public function a_customer_cannot_purchase_an_unpublished_product()
    {
        $product = factory(Product::class)->states('unpublished')->create();

        $response = $this->orderProducts($product, [
            'email'         => 'customer@example.com',
            'quantity'      => 3,
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ]);

        $response->assertStatus(404);
        $this->assertEquals(0, $product->orders->count());
        $this->assertEquals(0, $this->paymentGateway->totalCharges());
    }

    private function assertValidationError($response, $field)
    {
        $response->assertStatus(422);
        $this->assertArrayHasKey($field, $response->decodeResponseJson()['errors']);
    }

    /** @test */
    public function email_is_required_to_purchase_products()
    {
        $product = factory(Product::class)->create();

        $response = $this->orderProducts($product, [
            'quantity'      => 3,
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ]);

        $this->assertValidationError($response, 'email');
    }

    /** @test */
    public function email_must_be_valid_to_purchase_tickets()
    {
        $product = factory(Product::class)->create();

        $response = $this->orderProducts($product, [
            'email'         => 'not-an-email',
            'quantity'      => 3,
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ]);

        $this->assertValidationError($response, 'email');
    }

    /** @test */
    public function product_quantity_is_required_to_purchase_products()
    {
        $product = factory(Product::class)->create();

        $response = $this->orderProducts($product, [
            'email'         => 'customer@example.com',
            'payment_token' => $this->paymentGateway->getValidTestToken(),
        ]);

        $this->assertValidationError($response, 'quantity');
    }

    /** @test */
    public function product_quantity_must_be_at_least_1_to_purchase_products()
    {
        $product = factory(Product::class)->create();

        $response = $this->orderProducts($product, [
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

        $response = $this->orderProducts($product, [
            'email'           => 'john@example.com',
            'ticket_quantity' => 3,
        ]);
        $this->assertValidationError($response, 'payment_token');
    }
}
