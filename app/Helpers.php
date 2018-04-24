<?php

use App\Classes\Cart;

function cart()
{
    if (auth()->check()) {
        return new Cart(auth()->user()->cart->contents ?? null);
    }

    return session('cart') ?? new Cart();
}

function price($value)
{
    return number_format($value / 100, 2);
}
