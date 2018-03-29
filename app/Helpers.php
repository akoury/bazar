<?php

use App\Classes\Cart;

function cart()
{
    if (auth()->check()) {
        return new Cart(auth()->user()->cart->contents ?? null);
    }

    return session('cart') ?? new Cart();
}
