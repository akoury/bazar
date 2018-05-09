<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductModel extends Model
{
    protected $guarded = [];

    protected $casts = [
        'published' => 'boolean',
    ];

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

    public function attributes()
    {
        $values = $this->products->pluck('values')->flatten()->unique('id');

        return $values->pluck('attribute')->unique('id')->map(function ($attribute) use ($values) {
            return $attribute->setRelation('values', $values->where('attribute_id', $attribute->id)->each->setRelation('attribute', null));
        });
    }
}
