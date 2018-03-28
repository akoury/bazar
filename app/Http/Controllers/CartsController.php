<?php

namespace App\Http\Controllers;

use App\Classes\Cart;
use App\Models\Product;

class CartsController extends Controller
{
    public function store($productId)
    {
        $product = Product::findOrFail($productId);

        request()->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = cart();
        $itemsAdded = $cart->add($product, request('quantity'));

        if ($itemsAdded === 0) {
            return response()->json(['There are not enough available items of this product'], 422);
        }

        $cart->save();
        return response()->json([ $itemsAdded . ' ' . $product->name . ' added to your cart'], 201);
    }

    public function show()
    {
        $products = cart()->products;

        return view('cart', compact('products'));
    }
}
