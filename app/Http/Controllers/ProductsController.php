<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Jobs\ProcessProductImage;

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
            'published'     => 'nullable|boolean',
            'item_quantity' => 'required|integer|min:0',
            'product_image' => 'required|image'
        ]);

        $product = Product::create([
            'name'        => request('name'),
            'description' => request('description'),
            'price'       => request('price') * 100,
            'published'   => request()->filled('published'),
            'image_path'  => request('product_image')->store('products', 'public'),
        ])->addItems(request('item_quantity'));

        ProcessProductImage::dispatch($product);

        return redirect()->route('products.show', $product);
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);

        return view('products.edit', compact('product'));
    }

    public function update($id)
    {
        $product = Product::findOrFail($id);

        request()->validate([
            'name'        => 'required',
            'description' => 'required',
            'price'       => 'required|numeric|min:0',
            'published'   => 'sometimes|accepted',
        ]);

        $product->update([
            'name'        => request('name'),
            'description' => request('description'),
            'price'       => request('price') * 100,
            'published'   => request()->filled('published'),
        ]);

        return redirect()->route('products.show', $product);
    }
}
