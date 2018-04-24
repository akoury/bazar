<?php

namespace App\Classes;

use MercadoPago\SDK;
use MercadoPago\Item;
use MercadoPago\Payer;
use MercadoPago\Preference;

class MercadoPagoPaymentGateway implements PaymentGateway
{
    public function __construct()
    {
        SDK::setClientId('4785622013819404');
        SDK::setClientSecret('GxLksVeP2no2XNXOKZ8AgmILrWRANYaw');
    }

    public function generateLink($amount)
    {
        $preference = new Preference;

        $item = new Item;
        $item->title = 'Your Bazar Cart';
        $item->quantity = 1;
        $item->currency_id = 'VEF';
        $item->picture_url = 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif';
        $item->unit_price = number_format($amount / 100, 2, '.', '');
        $preference->items = [$item];

        // $preference->back_urls = [
        //     'success' => route('accepted'),
        //     'failure' => 'http://www.failure.com',
        //     'pending' => 'http://www.tu-sitio/pending'
        // ];
        // $preference->auto_return = 'approved';
        $preference->notification_url = 'https://ac537d7c.ngrok.io/payments';

        if (auth()->check()) {
            $payer = new Payer;
            $payer->email = auth()->user()->email;
            $preference->payer = $payer;
        }

        $preference->save();

        return $preference->sandbox_init_point;
    }

    public function charge($amount, $token)
    {
        $payment_methods = SDK::get('/v1/payment_methods');

        return new Charge($amount, 1234);
    }

    public function payment()
    {
        return SDK::get('/merchant_orders/711186224');
    }
}
