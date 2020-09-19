<?php

namespace Tests\Unit\Billing;

use Tests\Fakes\FakePaymentGateway;

class FakePaymentGatewayTest extends PaymentGatewayContractTest
{
    private $paymentGateway;

    protected function setUp(): void
    {
        parent::setUp();
        $this->paymentGateway = new FakePaymentGateway;
    }

    protected function getPaymentGateway()
    {
        return $this->paymentGateway;
    }

    protected function getValidTestToken()
    {
        return $this->paymentGateway->getValidTestToken();
    }

    protected function newCharges($callback)
    {
        $chargesFrom = $this->paymentGateway->charges->count();
        $callback();
        return $this->paymentGateway->charges->slice($chargesFrom)->reverse()->values();
    }

    /** @test */
    public function running_a_hook_before_the_first_charge()
    {
        $timesCallbackRan = 0;

        $this->paymentGateway->beforeFirstCharge(function () use (&$timesCallbackRan) {
            $timesCallbackRan++;
            $this->paymentGateway->charge(2500, $this->paymentGateway->getValidTestToken());
            $this->assertEquals(2500, $this->paymentGateway->totalCharges());
        });

        $this->paymentGateway->charge(2500, $this->paymentGateway->getValidTestToken());
        $this->assertEquals(1, $timesCallbackRan);
        $this->assertEquals(5000, $this->paymentGateway->totalCharges());
    }
}
