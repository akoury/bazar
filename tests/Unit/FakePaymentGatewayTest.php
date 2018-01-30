<?php

namespace Tests\Unit;

use Tests\TestCase;
use Tests\Fakes\FakePaymentGateway;
use App\Exceptions\PaymentFailedException;

class FakePaymentGatewayTest extends Testcase
{
    /** @test */
    public function charges_with_a_valid_payment_token_are_successful()
    {
        $paymentGateway = new FakePaymentGateway;

        $paymentGateway->charge(2500, $paymentGateway->getValidTestToken());

        $this->assertEquals(2500, $paymentGateway->totalCharges());
    }

    /** @test */
    public function charges_with_an_invalid_payment_token_fail()
    {
        try {
            $paymentGateway = new FakePaymentGateway;
            $paymentGateway->charge(2500, 'invalid-token');
        } catch (PaymentFailedException $e) {
            $this->assertTrue(true);
            return;
        }

        $this->fail();
    }
}
