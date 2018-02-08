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

    public function create()
    {
        return view('products.create');
    }

    public function store()
    {
        request()->validate([
            'name'          => 'required',
            'description'   => 'required',
            'price'         => 'required|numeric|min:0',
            'published'     => 'required|boolean',
            'item_quantity' => 'required|integer|min:0'
        ]);

        $product = Product::create([
            'name'        => request('name'),
            'description' => request('description'),
            'price'       => request('price') * 100,
            'published'   => request('published'),
        ])->addItems(request('item_quantity'));

        return redirect()->route('products.show', $product);
    }
}
