<?php

namespace App\Classes;

use Stripe\Exception\InvalidRequestException;
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

            return new Charge($charge['amount'], $charge['source']['last4']);
        } catch (InvalidRequestException $e) {
            throw new PaymentFailedException;
        }
    }
}
