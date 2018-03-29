<?php

namespace App\Classes;

use App\Models\UserCart;

class Cart
{
    public $products;

    public function __construct($cart = null)
    {
        $this->products = collect($cart['products'] ?? null);
    }

    public function add($product, $requestedQuantity)
    {
        $productAlreadyInCart = $this->products->first(function ($i) use ($product) {
            return $i['id'] === $product->id;
        });

        $itemsAlreadyInCart = $productAlreadyInCart['quantity'] ?? 0;

        $itemsRemaining = $product->itemsRemaining();

        if ($itemsRemaining == 0 || $itemsRemaining == $itemsAlreadyInCart) {
            return 0;
        } elseif ($itemsRemaining >= $itemsAlreadyInCart + $requestedQuantity) {
            $addedItems = $requestedQuantity;
            $requestedQuantity += $itemsAlreadyInCart;
        } else {
            $requestedQuantity = $itemsRemaining;
            $addedItems = 'Not enought items, ' . ($itemsRemaining - $itemsAlreadyInCart);
        }

        if ($productAlreadyInCart) {
            $this->products->transform(function ($product) use ($productAlreadyInCart, $requestedQuantity) {
                if ($product['id'] === $productAlreadyInCart['id']) {
                    $product['quantity'] = $requestedQuantity;
                }
                return $product;
            });
            return $addedItems;
        }

        $this->products->push([
            'id'       => $product->id,
            'quantity' => $requestedQuantity
        ]);

        return $addedItems;
    }

    public function save()
    {
        if (auth()->check()) {
            UserCart::updateOrCreate(['user_id' => auth()->id()], ['contents' => $this]);
        } else {
            session(['cart' => $this]);
        }
    }
}
