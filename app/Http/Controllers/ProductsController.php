<?php

namespace App\Http\Controllers;

use App\Models\Product;

class ProductsController extends Controller
{
    public function show($id)
    {
        $product = Product::wherePublished(true)->findOrFail($id);

        return view('products.show', compact('product'));
    }

    public function index()
    {
        $products = Product::wherePublished(true)->get();

        return view('products.index', compact('products'));
    }
}
