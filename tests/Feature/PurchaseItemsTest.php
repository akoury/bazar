<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Product;
use App\Classes\PaymentGateway;
use Tests\Fakes\FakePaymentGateway;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PurchaseItemsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp()
    {
        parent::setUp();
        $this->paymentGateway = new FakePaymentGateway;
        $this->app->instance(PaymentGateway::class, $this->paymentGateway);
    }

    private function orderItems($product, $params)
    {
        return $this->json('POST', "products/{$product->id}/orders", $params);
    }

    /** @test */
    public function a_customer_can_purchase_items_of_a_published_product()
    {
        $this->withoutExceptionHandling();
        $product = factory(Product::class)->create(['price' => 3250])->addItems(3);

        $response = $this->orderItems($product, [
            'email'         => 'customer@example.com',
            'quantity'      => 3,
            'payment_token' => $this->paymentGateway->getValidTestToken()
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'email'    => 'customer@example.com',
                'quantity' => 3,
                'amount'   => 9750
            ]);

        $this->assertEquals(9750, $this->paymentGateway->totalCharges());

        $order = $product->orders()->where('email', 'customer@example.com')->first();
        $this->assertNotNull($order);
        $this->assertEquals(3, $order->itemQuantity());
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
        $this->assertEquals(0, $product->orders->count());
        $this->assertEquals(0, $this->paymentGateway->totalCharges());
    }

    /** @test */
    public function an_order_is_not_created_if_payment_fails(Type $var = null)
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
