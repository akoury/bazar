<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductModel;

class ProductsController extends Controller
{
    public function show($brandId, $id)
    {
        $product = Product::withTrashed()->findOrFail($id);

        if ($product->trashed()) {
            $model = ProductModel::withTrashed()->with(['products' => function ($query) use ($product) {
                $query->withTrashed()->findOrFail($product->id);
            }])->withRelationships($product->product_model_id);
        } else {
            $model = ProductModel::wherePublished(true)->withRelationships($product->product_model_id);
        }

        $product = $model->products->firstWhere('id', $id);

        return view('products.show', compact('model', 'product'));
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
