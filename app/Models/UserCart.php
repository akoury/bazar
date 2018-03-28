<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserCart extends Model
{
    protected $primaryKey = 'user_id';

    public $incrementing = false;

    protected $guarded = [];

    public function getCartAttribute($cart)
    {
        return unserialize($cart);
    }

    public function setCartAttribute($cart)
    {
        $this->attributes['cart'] = serialize($cart);
    }

    public function products()
    {
        return $this->cart->products;
    }
}
