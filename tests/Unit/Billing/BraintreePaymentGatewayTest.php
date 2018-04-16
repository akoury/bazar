<?php

namespace Tests\Unit\Billing;

use App\Classes\Charge;
use Braintree\Transaction;
use Braintree\TransactionSearch;
use App\Classes\BraintreePaymentGateway;

/**
 * @group integration
 */
class BraintreePaymentGatewayTest extends PaymentGatewayContractTest
{
    const TEST_CARD_NUMBER = '4009348888881881';

    protected function getPaymentGateway()
    {
        return new BraintreePaymentGateway();
    }

    protected function getValidTestToken()
    {
        return 'fake-valid-nonce';
    }

    public function newCharges($chargeCallback)
    {
        $latestCharge = $this->lastCharge();
        $chargeCallback();
        return $this->newChargesSince($latestCharge)->map(function ($charge) {
            return new Charge(number_format($charge->amount * 100, 0, '.', ''), $charge->creditCard['last4']);
        });
    }

    private function lastCharge()
    {
        sleep(2);
        return $this->getPaymentGateway()->gateway->transaction()->search([
            TransactionSearch::type()->is(Transaction::SALE),
        ])->firstItem();
    }

    private function newChargesSince($charge)
    {
        sleep(2);
        $transactions = $this->getPaymentGateway()->gateway->transaction()->search([
            TransactionSearch::type()->is(Transaction::SALE)
        ]);

        $charges = collect();

        foreach ($transactions as $transaction) {
            if ($transaction->id === $charge->id) {
                break;
            }
            $charges->push($transaction);
        }

        return $charges;
    }
}
