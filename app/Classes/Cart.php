<?php

namespace App\Classes;

use App\Exceptions\NotEnoughItemsException;

class Cart
{
    public $products;

    public function __construct()
    {
        $this->products = collect();
    }

    public function add($product, $quantity)
    {
        $productInCart = $this->products->first(function ($i) use ($product) {
            return $i->is($product);
        });

        if ($productInCart && $product->itemsRemaining() >= $productInCart->quantity + $quantity) {
            $productInCart->quantity += $quantity;
        } elseif (! $productInCart && $product->itemsRemaining() >= $quantity) {
            $product->quantity = $quantity;
            $this->products->push($product);
        } else {
            throw new NotEnoughItemsException();
        }
    }
}
