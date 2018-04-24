<?php

namespace Tests\Unit\Billing;

use App\Classes\MercadoPagoPaymentGateway;

/**
 * @group integration
 */
class MercadoPagoGatewayTest extends PaymentGatewayContractTest
{
    const TEST_CARD_NUMBER = '4009348888881881';

    protected function getPaymentGateway()
    {
        return new MercadoPagoPaymentGateway();
    }

    protected function getValidTestToken()
    {
        return 'fake-valid-nonce';
    }

    public function newCharges($chargeCallback)
    {
    }
}
