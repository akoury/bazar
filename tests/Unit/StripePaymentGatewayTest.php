<?php

namespace Tests\Unit;

use App\Classes\Charge;
use App\Classes\StripePaymentGateway;

/**
 * @group integration
 */
class StripePaymentGatewayTest extends PaymentGatewayContractTest
{
    protected function getPaymentGateway()
    {
        return new StripePaymentGateway(config('services.stripe.secret'));
    }

    protected function getValidTestToken()
    {
        return 'tok_visa';
    }

    public function newChargesDuring($chargeCallback)
    {
        $latestCharge = $this->lastCharge();
        $chargeCallback();
        return $this->newChargesSince($latestCharge)->map(function ($stripeCharge) {
            return new Charge([
                'amount'         => $stripeCharge['amount'],
                'card_last_four' => $stripeCharge['source']['last4'],
            ]);
        });
    }

    private function lastCharge()
    {
        return array_first(\Stripe\Charge::all([
            'limit' => 1
        ], ['api_key' => config('services.stripe.secret')])['data']);
    }

    private function newChargesSince($charge = null)
    {
        $newCharges = \Stripe\Charge::all([
            'ending_before' => $charge ? $charge->id : null,
        ], ['api_key' => config('services.stripe.secret')])['data'];

        return collect($newCharges);
    }
}
