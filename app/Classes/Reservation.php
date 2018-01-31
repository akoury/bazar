<?php

namespace App\Classes;

use App\Models\Order;

class Reservation
{
    private $items;

    private $email;

    public function __construct($items, $email)
    {
        $this->items = $items;
        $this->email = $email;
    }

    public function totalCost()
    {
        return $this->items->sum('price');
    }

    public function items()
    {
        return $this->items;
    }

    public function email()
    {
        return $this->email;
    }

    public function complete($paymentGateway, $paymentToken)
    {
        $paymentGateway->charge($this->totalCost(), $paymentToken);

        return Order::forItems($this->email, $this->items, $this->totalCost());
    }

    public function cancel()
    {
        $this->items->each->release();
    }
}
