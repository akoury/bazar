<?php

use App\Classes\Cart;

function cart()
{
    if (auth()->check()) {
        return auth()->user()->cart->cart ?? new Cart();
    }

    return $cart = session('cart') ?? new Cart();
}
