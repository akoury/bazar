<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductModel extends Model
{
    use SoftDeletes;

    protected $guarded = [];

    protected $casts = ['published' => 'boolean'];

    protected $dates = ['deleted_at'];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function url()
    {
        return $this->products->firstWhere('price', $this->products->min('price'))->url($this->brand_id);
    }

    public function price()
    {
        return price($this->products->min('price'));
    }

    public function scopeWithRelationships($query, $id)
    {
        return $query->findOrFail($id)->loadMissing(['products.items' => function ($query) {
            $query->available();
        }, 'products.values.attribute'])->loadItemQuantity();
    }

    public function attributes()
    {
        $values = $this->loadMissing('products.values.attribute')->products->pluck('values')->flatten()->unique('id');

        return $values->pluck('attribute')->unique('id')->map(function ($attribute) use ($values) {
            $attribute->setRelation('values', $values->where('attribute_id', $attribute->id)->values());
            $attribute->values->map(function ($value) {
                unset($value->attribute);
                unset($value->pivot);
            });
            return $attribute;
        });
    }

    public function loadItemQuantity()
    {
        $this->products->transform(function ($product) {
            $product->setAttribute('item_quantity', $product->items->count());
            unset($product->items);
            return $product;
        });

        return $this;
    }
}
