<?php

namespace App\Http\Requests;

use App\Models\Value;
use App\Models\Product;
use App\Models\Attribute;
use App\Jobs\ProcessProductModelImage;
use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        $this->merge(['products' => json_decode($this->products, true)]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $attributeRules = [];
        if (! empty($this->products[0]['attributes']) && is_array($this->products[0]['attributes'])) {
            $attributeKeys = array_keys($this->products[0]['attributes']);
            foreach ($attributeKeys as $key) {
                $attributeRules['products.*.attributes.' . $key] = 'required|string';
            }
        }

        return array_merge([
            'name'                     => 'required',
            'description'              => 'required',
            'published'                => 'boolean|required',
            'product_image'            => 'sometimes|required|image',
            'products'                 => 'required|array',
            'products.*.price'         => 'required|numeric|min:0',
            'products.*.item_quantity' => 'required|integer|min:0',
            'products.*.attributes'    => 'sometimes|required|array|max:4',
            'products.*.attributes.*'  => 'required|string',
        ], $attributeRules);
    }

    public function addProductsToModel($model)
    {
        $products = collect($this->products)->map(function ($product) {
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
            $newProduct = Product::updateOrCreate(['id' => $product['id'] ?? null], [
                'product_model_id' => $model->id,
                'price'            => $product['price'] * 100
            ])->setItemsRemaining($product['item_quantity']);

            if (isset($product['attributes'])) {
                $newProduct->values()->detach();
                $newProduct->values()->attach($this->getValues($product, $attributes, $values));
            }
        }

        if ($this->has('product_image')) {
            ProcessProductModelImage::dispatch($model);
        }
    }

    private function getValues($product, $attributes, $values)
    {
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

        return $productValues->pluck('id');
    }
}
