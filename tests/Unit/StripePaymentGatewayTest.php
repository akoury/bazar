<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Classes\StripePaymentGateway;
use App\Exceptions\PaymentFailedException;

/**
 * @group integration
 */
class StripePaymentGatewayTest extends Testcase
{
    protected function setUp()
    {
        parent::setUp();
        $this->lastCharge = $this->lastCharge();
    }

    /** @test */
    public function charges_with_a_valid_payment_token_are_successful()
    {
        $paymentGateway = new StripePaymentGateway(config('services.stripe.secret'));

        $paymentGateway->charge(2500, 'tok_visa');

        $this->assertCount(1, $this->newCharges());
        $this->assertEquals(2500, $this->lastCharge()->amount);
    }

    /** @test */
    public function charges_with_an_invalid_payment_token_fail()
    {
        try {
            $paymentGateway = new StripePaymentGateway(config('services.stripe.secret'));
            $paymentGateway->charge(2500, 'invalid-token');
        } catch (PaymentFailedException $e) {
            $this->assertCount(0, $this->newCharges());
            return;
        }

        $this->fail('Charging with an invalid payment token did not throw a PaymentFailedException.');
    }

    private function lastCharge()
    {
        return array_first(\Stripe\Charge::all(
            ['limit' => 1],
            ['api_key' => config('services.stripe.secret')]
        )['data']);
    }

    private function newCharges()
    {
        return \Stripe\Charge::all(
            ['ending_before' => $this->lastCharge ? $this->lastCharge->id : null],
            ['api_key' => config('services.stripe.secret')]
        )['data'];
    }
}
