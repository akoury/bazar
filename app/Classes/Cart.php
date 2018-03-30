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

    public function findProduct($product)
    {
        return $this->products->firstWhere('id', $product['id']);
    }

    public function add($product, $requestedQuantity)
    {
        $productFromCart = $this->findProduct($product);

        $quantity = $this->determineQuantity($product, $productFromCart, $requestedQuantity);

        if ($quantity === 0) {
            return 0;
        }

        $this->remove($product);
        $this->products->prepend(['id' => $product->id, 'quantity' => $quantity]);

        return $quantity;
    }

    public function remove($product)
    {
        $this->products->keyBy('id')->forget($product->id);
    }

    public function determineQuantity($product, $productFromCart, $requestedQuantity)
    {
        $itemsRemaining = $product->itemsRemaining();
        $itemsInCart = $productFromCart['quantity'] ?? 0;

        if ($itemsRemaining == 0 || $itemsRemaining == $itemsInCart) {
            return 0;
        }

        if ($itemsRemaining >= $itemsInCart + $requestedQuantity) {
            return $itemsInCart + $requestedQuantity;
        }

        return $itemsRemaining;
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
