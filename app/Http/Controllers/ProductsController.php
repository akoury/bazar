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
        $product = Product::withTrashed()->findOrFail($id);

        if ($product->trashed()) {
            $model = ProductModel::with(['products' => function ($query) use ($product) {
                $query->withTrashed()->where('id', $product->id);
            }, 'products.items' => function ($query) {
                $query->available();
            }, 'products.values.attribute'])->findOrFail($product->product_model_id);
        } else {
            $model = ProductModel::with(['products.items' => function ($query) {
                $query->available();
            }, 'products.values.attribute'])->wherePublished(true)->findOrFail($product->product_model_id);
        }

        $model->products->transform(function ($product) {
            $product->setAttribute('item_count', $product->items->count());
            unset($product->items);
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

        request()['products'] = json_decode(request('products'), true);

        $attributeRules = [];
        if (! empty(request()['products'][0]['attributes']) && is_array(request()['products'][0]['attributes'])) {
            $attributeKeys = array_keys(request()['products'][0]['attributes']);
            foreach ($attributeKeys as $key) {
                $attributeRules['products.*.attributes.' . $key] = 'required|string';
            }
        }

        request()->validate(array_merge([
            'name'                     => 'required',
            'description'              => 'required',
            'published'                => 'boolean|required',
            'product_image'            => 'required|image',
            'products'                 => 'required|array',
            'products.*.price'         => 'required|numeric|min:0',
            'products.*.item_quantity' => 'required|integer|min:0',
            'products.*.attributes'    => 'sometimes|required|array|max:4',
            'products.*.attributes.*'  => 'required|string',
        ], $attributeRules));

        $model = ProductModel::create([
            'name'        => request('name'),
            'description' => request('description'),
            'published'   => request('published'),
            'brand_id'    => $brand->id,
            'image_path'  => request('product_image')->store('products', 'public'),
        ]);

        $products = collect(request('products'))->map(function ($product) {
            if (isset($product['attributes'])) {
                $product['attributes'] = array_map('strtolower', $product['attributes']);
                $product['attributes'] = array_change_key_case($product['attributes'], CASE_LOWER);
            }
            return $product;
        });

        if (isset($products[0]['attributes'])) {
            $attributes = Attribute::whereIn('name', array_keys($products[0]['attributes']))->get();
            $values = Value::whereIn('name', $products->pluck('attributes')->flatten()->unique())->get();
        }

        foreach ($products as $product) {
            $newProduct = Product::create([
                'product_model_id' => $model->id,
                'price'            => $product['price'] * 100,
            ])->addItems($product['item_quantity']);

            if (isset($product['attributes'])) {
                $productValues = collect();

                foreach ($product['attributes'] as $attributeName => $valueName) {
                    $foundAttribute = $attributes->firstWhere('name', $attributeName);
                    if (! $foundAttribute) {
                        $foundAttribute = Attribute::create(['name' => $attributeName]);
                        $attributes->push($foundAttribute);
                    }

                    $foundValue = $values->where('attribute_id', $foundAttribute->id)->firstWhere('name', $valueName);
                    if (! $foundValue) {
                        $foundValue = Value::create(['attribute_id' => $foundAttribute->id, 'name' => $valueName]);
                        $values->push($foundValue);
                    }

                    $productValues->push($foundValue);
                }

                $newProduct->values()->attach($productValues->pluck('id'));
            }
        }

        ProcessProductModelImage::dispatch($model);

        return response()->json($model->url(), 201);
    }

    public function edit($id)
    {
        $model = ProductModel::with(['products.items' => function ($query) {
            $query->available();
        }, 'products.values.attribute'])->findOrFail($id);

        auth()->user()->brands()->findOrFail($model->brand_id);

        $model->products->transform(function ($product) {
            $product->setAttribute('item_quantity', $product->items->count());
            unset($product->items);
            return $product;
        });

        $attributes = Attribute::with('values')->get();

        return view('products.edit', compact('model', 'attributes'));
    }

    public function update($id)
    {
        $model = ProductModel::findOrFail($id);

        auth()->user()->brands()->findOrFail($model->brand_id);

        request()['products'] = json_decode(request('products'), true);

        $attributeRules = [];
        if (! empty(request()['products'][0]['attributes']) && is_array(request()['products'][0]['attributes'])) {
            $attributeKeys = array_keys(request()['products'][0]['attributes']);
            foreach ($attributeKeys as $key) {
                $attributeRules['products.*.attributes.' . $key] = 'required|string';
            }
        }

        request()->validate(array_merge([
            'name'                     => 'required',
            'description'              => 'required',
            'published'                => 'boolean|required',
            'products'                 => 'required|array',
            'products.*.price'         => 'required|numeric|min:0',
            'products.*.item_quantity' => 'required|integer|min:0',
            'products.*.attributes'    => 'sometimes|required|array|max:4',
            'products.*.attributes.*'  => 'required|string',
        ], $attributeRules));

        $model->update([
            'name'        => request('name'),
            'description' => request('description'),
            'published'   => request('published'),
        ]);

        $products = collect(request('products'))->map(function ($product) {
            if (isset($product['attributes'])) {
                $product['attributes'] = array_map('strtolower', $product['attributes']);
                $product['attributes'] = array_change_key_case($product['attributes'], CASE_LOWER);
            }
            return $product;
        });

        if (isset($products[0]['attributes'])) {
            $attributes = Attribute::whereIn('name', array_keys($products[0]['attributes']))->get();
            $values = Value::whereIn('name', $products->pluck('attributes')->flatten()->unique())->get();
        }

        foreach ($products as $product) {
            if (isset($product['id'])) {
                $newProduct = Product::findOrFail($product['id'])->setItemsRemaining($product['item_quantity']);
                $newProduct->update([
                    'price' => $product['price'] * 100,
                ]);
            } else {
                $newProduct = Product::create([
                    'product_model_id' => $model->id,
                    'price'            => $product['price'] * 100,
                ])->addItems($product['item_quantity']);
            }

            if (isset($product['attributes'])) {
                $productValues = collect();

                foreach ($product['attributes'] as $attributeName => $valueName) {
                    $foundAttribute = $attributes->firstWhere('name', $attributeName);
                    if (! $foundAttribute) {
                        $foundAttribute = Attribute::create(['name' => $attributeName]);
                        $attributes->push($foundAttribute);
                    }

                    $foundValue = $values->where('attribute_id', $foundAttribute->id)->firstWhere('name', $valueName);
                    if (! $foundValue) {
                        $foundValue = Value::create(['attribute_id' => $foundAttribute->id, 'name' => $valueName]);
                        $values->push($foundValue);
                    }

                    $productValues->push($foundValue);
                }

                $newProduct->values()->detach();
                $newProduct->values()->attach($productValues->pluck('id'));
            }
        }

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
