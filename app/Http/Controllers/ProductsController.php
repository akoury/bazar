<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Product;
use App\Models\Attribute;
use App\Models\ProductModel;
use App\Http\Requests\ProductRequest;

class ProductsController extends Controller
{
    public function show($brandId, $id)
    {
        $product = Product::withTrashed()->findOrFail($id);

        if ($product->trashed()) {
            $model = ProductModel::with(['products' => function ($query) use ($product) {
                $query->withTrashed()->where('id', $product->id);
            }, 'products.items' => function ($query) {
                $query->available();
            }, 'products.values.attribute'])->findOrFail($product->product_model_id)->loadItemQuantity();
        } else {
            $model = ProductModel::with(['products.items' => function ($query) {
                $query->available();
            }, 'products.values.attribute'])->wherePublished(true)->findOrFail($product->product_model_id)->loadItemQuantity();
        }

        $product = $model->products->firstWhere('id', $id);

        return view('products.show', compact('model', 'product'));
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

        $attributes = Attribute::with('values')->get();

        return view('products.create', compact('brand', 'attributes'));
    }

    public function store($brandId, ProductRequest $request)
    {
        $brand = auth()->user()->brands()->findOrFail($brandId);

        $model = ProductModel::create([
            'name'        => $request->name,
            'description' => $request->description,
            'published'   => $request->published,
            'brand_id'    => $brand->id,
            'image_path'  => $request->product_image->store('products', 'public'),
        ]);

        $request->addProductsToModel($model);

        return response()->json($model->url(), 201);
    }

    public function edit($id)
    {
        $model = ProductModel::with(['products.items' => function ($query) {
            $query->available();
        }, 'products.values.attribute'])->findOrFail($id)->loadItemQuantity();

        auth()->user()->brands()->findOrFail($model->brand_id);

        $attributes = Attribute::with('values')->get();

        return view('products.edit', compact('model', 'attributes'));
    }

    public function update($id, ProductRequest $request)
    {
        $model = ProductModel::findOrFail($id);

        auth()->user()->brands()->findOrFail($model->brand_id);

        $model->update([
            'name'        => $request->name,
            'description' => $request->description,
            'published'   => $request->published,
            'image_path'  => $request->has('product_image') ? $request->product_image->store('products', 'public') : $model->image_path,
        ]);

        $request->addProductsToModel($model);

        return response()->json($model->url(), 200);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        auth()->user()->brands()->findOrFail($product->brand_id);

        $product->setItemsRemaining(0)->delete();

        if ($product->model->products->count() === 0) {
            $product->model->update(['published' => false]);
        }

        return response()->json(200);
    }
}
