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

    public function add($product, $requestedQuantity)
    {
        $productAlreadyInCart = $this->products->first(function ($i) use ($product) {
            return $i->is($product);
        });

        $itemsAlreadyInCart = optional($productAlreadyInCart)->quantity ?? 0;
        $itemsRemaining = $product->itemsRemaining();

        if ($itemsRemaining == 0 || $itemsRemaining == $itemsAlreadyInCart) {
            throw new NotEnoughItemsException();
        } elseif ($itemsRemaining >= $itemsAlreadyInCart + $requestedQuantity) {
            $requestedQuantity += $itemsAlreadyInCart;
            $addedItems = $requestedQuantity;
        } else {
            $requestedQuantity = $itemsRemaining;
            $addedItems = 'Not enought items, ' . ($itemsRemaining - $itemsAlreadyInCart);
        }

        if ($productAlreadyInCart) {
            $productAlreadyInCart->quantity = $requestedQuantity;

            return $addedItems;
        }

        $product->quantity = $requestedQuantity;
        $this->products->push($product);

        return $addedItems;
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
