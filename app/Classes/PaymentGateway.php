<?php

namespace App\Classes;

interface PaymentGateway
{
    public function charge($amount, $token);
}
