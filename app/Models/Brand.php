<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $guarded = [];

    public function users()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }

    public function models()
    {
        return $this->hasMany(ProductModel::class);
    }

    public function products()
    {
        return $this->hasManyThrough(Product::class, ProductModel::class);
    }
}
