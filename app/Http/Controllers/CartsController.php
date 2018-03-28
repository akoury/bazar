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
            $cart = cart();
            $itemsAdded = $cart->add($product, request('quantity'));
            $cart->save();

            return response()->json([ $itemsAdded . ' ' . $product->name . ' added to your cart'], 201);
        } catch (NotEnoughItemsException $e) {
            return response()->json(['There are not enough available items of this product'], 422);
        }
    }

    public function show()
    {
        $products = cart()->products;

        return view('cart', compact('products'));
    }
}
