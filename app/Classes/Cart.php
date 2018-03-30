<?php

namespace App\Classes;

use App\Models\Product;
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
        return $this->products->firstWhere('id', $product['id']) ?? false;
    }

    public function add($product, $requestedQuantity)
    {
        if (! $product->published) {
            $this->remove($product);
            return 0;
        }

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
        $this->products = $this->products->keyBy('id')->forget($product->id ?? $product['id']);

        return $this;
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

    public function update()
    {
        if ($this->products->count() > 0) {
            $products = Product::fromCart($this);

            $this->products->each(function ($product) use ($products) {
                $this->remove($product);
                $quantity = $product['quantity'];
                $product = $products->firstWhere('id', $product['id']);
                if ($product) {
                    $this->add($product, $quantity);
                }
            });

            $this->save();
        }

        return $this;
    }

    public function addCartContents($cart)
    {
        $products = Product::fromCart($cart);

        $cart->products->each(function ($product) use ($products) {
            $quantity = $product['quantity'];
            $product = $products->firstWhere('id', $product['id']);
            if ($product) {
                $this->add($product, $quantity);
            }
        });

        $this->save();
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
