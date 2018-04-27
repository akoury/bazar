<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Product;
use App\Models\ProductModel;
use App\Jobs\ProcessProductModelImage;

class ProductsController extends Controller
{
    public function show($brandId, $id)
    {
        $product = Product::with('model')->findOrFail($id);

        abort_if(! $product->published, 404);

        return view('products.show', compact('product'));
    }

    public function index($brandId)
    {
        $brand = Brand::findOrFail($brandId);
        $models = $brand->models()->wherePublished(true)->with('products')->get();

        return view('products.index', compact('brand', 'models'));
    }

    public function create($brandId)
    {
        $brand = auth()->user()->brands()->findOrFail($brandId);

        return view('products.create', compact('brand'));
    }

    public function store($brandId)
    {
        // dd(request()->all());
        $brand = auth()->user()->brands()->findOrFail($brandId);

        request()->validate([
            'name'                     => 'required',
            'description'              => 'required',
            'published'                => 'nullable|boolean',
            'product_image'            => 'required|image',
            'products'                 => 'required|array',
            'products.*.price'         => 'required|numeric|min:0',
            'products.*.item_quantity' => 'required|integer|min:0',
        ]);

        $model = ProductModel::create([
            'name'        => request('name'),
            'description' => request('description'),
            'published'   => request()->filled('published'),
            'brand_id'    => $brand->id,
            'image_path'  => request('product_image')->store('products', 'public'),
        ]);

        foreach (request('products') as $product) {
            Product::create([
                'product_model_id' => $model->id,
                'price'            => $product['price'] * 100,
            ])->addItems($product['item_quantity']);
        }

        ProcessProductModelImage::dispatch($model);

        return redirect($model->url());
    }

    public function edit($id)
    {
        $product = Product::with('model')->findOrFail($id);

        auth()->user()->brands()->findOrFail($product->brand_id);

        return view('products.edit', compact('product'));
    }

    public function update($id)
    {
        $product = Product::findOrFail($id);

        auth()->user()->brands()->findOrFail($product->brand_id);

        request()->validate([
            'name'        => 'required',
            'description' => 'required',
            'price'       => 'required|numeric|min:0',
            'published'   => 'sometimes|accepted',
        ]);

        $product->model->update([
            'name'        => request('name'),
            'description' => request('description'),
            'published'   => request()->filled('published'),
        ]);

        $product->update([
            'price' => request('price') * 100,
        ]);

        return redirect($product->url());
    }
}
