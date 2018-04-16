<?php

namespace App\Classes;

use Braintree\Gateway;
use App\Exceptions\PaymentFailedException;

class BraintreePaymentGateway implements PaymentGateway
{
    public $gateway;

    public function __construct()
    {
        $this->gateway = new Gateway([
            'environment' => 'sandbox',
            'merchantId'  => env('BRAINTREE_MERCHANT_ID'),
            'publicKey'   => env('BRAINTREE_KEY'),
            'privateKey'  => env('BRAINTREE_SECRET')
        ]);
    }

    public function charge($amount, $token)
    {
        $charge = $this->gateway->transaction()->sale([
            'amount'             => number_format($amount / 100, 2),
            'paymentMethodNonce' => $token,
            'options'            => [
                'submitForSettlement' => true
            ]
        ]);

        if (! $charge->success) {
            throw new PaymentFailedException;
        }

        return new Charge(number_format($charge->transaction->amount * 100, 0, '.', ''), $charge->transaction->creditCard['last4']);
    }
}
