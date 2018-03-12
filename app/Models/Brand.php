<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $guarded = [];

    public function users()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
        ;
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function link()
    {
        if ($this->custom) {
            return $this->name;
        }

        return $this->name . '.' . parse_url(config('app.url'), PHP_URL_HOST);
    }
}
