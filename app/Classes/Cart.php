<?php

namespace App\Classes;

use App\Models\UserCart;
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

        $itemsRemaining = $product->itemsRemaining();

        if ($productInCart && $itemsRemaining >= $productInCart->quantity + $quantity) {
            $productInCart->quantity += $quantity;
        } elseif (! $productInCart && $itemsRemaining >= $quantity) {
            $product->quantity = $quantity;
            $this->products->push($product);
        } else {
            throw new NotEnoughItemsException();
        }
    }

    public function save()
    {
        if (auth()->check()) {
            UserCart::updateOrCreate(['user_id' => auth()->id()], ['cart' => $this]);
        } else {
            session(['cart' => $this]);
        }
    }
}
