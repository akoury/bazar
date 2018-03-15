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
                $userProduct = auth()->user()->products()->find($product->id);
                if ($userProduct && $product->itemsRemaining() >= $userProduct->cart->quantity + request('quantity')) {
                    auth()->user()->products()->updateExistingPivot($product->id, ['quantity' => $userProduct->cart->quantity + request('quantity')]);
                } elseif ($product->itemsRemaining() >= request('quantity')) {
                    auth()->user()->products()->attach($product, ['quantity' => request('quantity')]);
                } else {
                    throw new NotEnoughItemsException();
                }
            } else {
                $cart = session('cart') ?? new Cart();
                $cart->add($product, request('quantity'));
                session(['cart' => $cart]);
            }
            return response()->json(['Product added to cart'], 201);
        } catch (NotEnoughItemsException $e) {
            return response()->json(['The number of items you requested is not available'], 422);
        }
    }

    public function show()
    {
        $products = collect();

        if (auth()->check()) {
            $products = auth()->user()->products;
        } else {
            if (session()->has('cart')) {
                $products = session('cart')->products;
            }
        }

        return view('cart', compact('products'));
    }
}
