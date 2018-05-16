<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Value;
use App\Models\Product;
use App\Models\Attribute;
use App\Models\ProductModel;
use App\Jobs\ProcessProductModelImage;

class ProductsController extends Controller
{
    public function show($brandId, $id)
    {
        $model = Product::with(['model.products.items' => function ($query) {
            $query->available();
        }, 'model.products.values.attribute'])->findOrFail($id)->model;

        abort_if(! $model->published, 404);

        $model->products->transform(function ($product) {
            $product->setAttribute('item_count', $product->items->count());
            $product->setRelation('items', null);
            return $product;
        });

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

    public function store($brandId)
    {
        $brand = auth()->user()->brands()->findOrFail($brandId);

        request()->validate([
            'name'                     => 'required',
            'description'              => 'required',
            'published'                => 'boolean',
            'product_image'            => 'required|image',
            'products'                 => 'required|json',
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

        $products = json_decode(request('products'), true);

        foreach ($products as $product) {
            $newProduct = Product::create([
                'product_model_id' => $model->id,
                'price'            => $product['price'] * 100,
            ])->addItems($product['item_quantity']);

            if (isset($product['attributes'])) {
                $values = collect();

                foreach ($product['attributes'] as $name => $value) {
                    $values->push(Value::firstOrCreate(['attribute_id' => Attribute::firstOrCreate(['name' => strtolower($name)])->id, 'name' => strtolower($value)]));
                }

                $newProduct->values()->attach($values->pluck('id'));
            }
        }

        ProcessProductModelImage::dispatch($model);

        return response()->json($model->url(), 201);
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
