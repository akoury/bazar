<?php

namespace Tests\Fakes;

use App\Classes\Charge;
use App\Classes\PaymentGateway;
use App\Exceptions\PaymentFailedException;

class FakePaymentGateway implements PaymentGateway
{
    public $charges;
    public $beforeFirstChargeCallback;

    const TEST_CARD_NUMBER = '4242424242424242';

    public function __construct()
    {
        $this->charges = collect();
    }

    public function getValidTestToken()
    {
        return 'valid-token';
    }

    public function charge($amount, $token)
    {
        if ($this->beforeFirstChargeCallback !== null) {
            $callback = $this->beforeFirstChargeCallback;
            $this->beforeFirstChargeCallback = null;
            $callback($this);
        }

        if ($token !== $this->getValidTestToken()) {
            throw new PaymentFailedException;
        }

        return $this->charges[] = new Charge($amount, substr(self::TEST_CARD_NUMBER, -4));
    }

    public function totalCharges()
    {
        return $this->charges->map->amount()->sum();
    }

    public function beforeFirstCharge($callback)
    {
        $this->beforeFirstChargeCallback = $callback;
    }
}
