<?php

namespace App\Classes;

use Stripe\Error\InvalidRequest;
use App\Exceptions\PaymentFailedException;

class StripePaymentGateway implements PaymentGateway
{
    private $apiKey;

    public function __construct($apiKey)
    {
        $this->apiKey = $apiKey;
    }

    public function charge($amount, $token)
    {
        try {
            $charge = \Stripe\Charge::create([
                'amount'   => $amount,
                'currency' => 'usd',
                'source'   => $token
            ], ['api_key' => $this->apiKey]);

            return new Charge([
                'amount'         => $charge['amount'],
                'card_last_four' => $charge['source']['last4']
            ]);
        } catch (InvalidRequest $e) {
            throw new PaymentFailedException;
        }
    }
}
