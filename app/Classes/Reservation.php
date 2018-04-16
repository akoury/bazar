<?php

namespace App\Classes;

use App\Models\Order;
use App\Models\Product;
use App\Exceptions\NotEnoughItemsException;

class Reservation
{
    private $items;

    private $email;

    public function __construct($email, $items = null)
    {
        $this->email = $email;

        if ($items) {
            $this->items = $items;
        } else {
            $cart = cart();
            $this->items = Product::fromCart($cart)->flatMap(function ($product) use ($cart) {
                return $product->reserveItems($cart->findProduct($product)['quantity']);
            });

            if ($this->items->isEmpty()) {
                throw new NotEnoughItemsException;
            }
        }
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
        $charge = $paymentGateway->charge($this->totalCost(), $paymentToken);

        return Order::forItems($this->email, $this->items, $charge);
    }

    public function cancel()
    {
        $this->items->each->release();
    }
}
