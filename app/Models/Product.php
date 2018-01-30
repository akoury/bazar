<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $guarded = [];

    public function getPriceWithDecimalsAttribute()
    {
        return number_format($this->price / 100, 2);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function orderItems($email, $quantity)
    {
        $order = $this->orders()->create(['email' => $email]);

        foreach (range(1, $quantity) as $i) {
            $order->items()->create([]);
        }

        return $order;
    }
}
