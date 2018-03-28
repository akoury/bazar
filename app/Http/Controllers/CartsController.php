<?php

namespace App\Http\Controllers;

use App\Classes\Cart;
use App\Models\Product;
use App\Exceptions\NotEnoughItemsException;

class CartsController extends Controller
{
    public function store($productId)
    {
        $product = Product::findOrFail($productId);

        request()->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        try {
            if (auth()->check()) {
                $cart = auth()->user()->cart->cart ?? new Cart();
            } else {
                $cart = session('cart') ?? new Cart();
            }
            $cart->add($product, request('quantity'));
            $cart->save();

            return response()->json(['Product added to cart'], 201);
        } catch (NotEnoughItemsException $e) {
            return response()->json(['The number of items you requested is not available'], 422);
        }
    }

    public function show()
    {
        $products = collect();

        if (auth()->check() && auth()->user()->cart) {
            $products = auth()->user()->cart->products();
        } elseif (auth()->guest() && session()->has('cart')) {
            $products = session('cart')->products;
        }

        return view('cart', compact('products'));
    }
}
