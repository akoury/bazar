<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $guarded = [];

    public static function forItems($email, $items, $amount)
    {
        $order = self::create([
            'email'  => $email,
            'amount' => $amount
        ]);

        $order->items()->saveMany($items);

        return $order;
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function itemQuantity()
    {
        return $this->items()->count();
    }

    public function toArray()
    {
        return [
            'email'    => $this->email,
            'quantity' => $this->itemQuantity(),
            'amount'   => $this->amount,
        ];
    }
}
