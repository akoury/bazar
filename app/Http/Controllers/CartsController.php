<?php

namespace App\Http\Controllers;

use App\Classes\Cart;
use App\Models\Product;

class CartsController extends Controller
{
    public function show()
    {
        $cart = cart()->update();

        $products = Product::fromCart($cart);

        return view('cart', compact('cart', 'products'));
    }

    public function store($productId)
    {
        $product = Product::wherePublished(true)->findOrFail($productId);

        request()->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = cart();
        $itemsAdded = $cart->add($product, request('quantity'));

        if ($itemsAdded === 0) {
            return response()->json(['There are not enough available items of this product'], 422);
        }

        $cart->save();
        return response()->json([ $itemsAdded . ' ' . $product->name . ' are now in your cart'], 201);
    }

    public function update($productId)
    {
        $product = Product::wherePublished(true)->findOrFail($productId);

        request()->validate([
            'quantity' => 'required|integer|min:0',
        ]);

        $cart = cart();

        if ($cart->findProduct($product)['quantity'] != request('quantity')) {
            $cart->remove($product);
            $itemsAdded = $cart->add($product, request('quantity'));

            if ($itemsAdded === 0) {
                return redirect()->back();
            }

            $cart->save();
        }

        return redirect()->back();
    }

    public function destroy($productId)
    {
        $product = Product::findOrFail($productId);

        cart()->remove($product)->save();

        return redirect()->back();
    }
}
