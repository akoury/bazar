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
        return $this->products->first()->url($this->brand_id);
    }

    public function attributes()
    {
        return $this->products->load('attributes')->pluck('attributes')->collapse()->pluck('name', 'id')->toArray();
    }

    public function values($id)
    {
        return $this->products->load('values')->pluck('values')->collapse()->where('attribute_id', $id)->pluck('name')->unique();
    }
}
