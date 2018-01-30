<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Exceptions\NotEnoughItemsException;

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

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function orderItems($email, $quantity)
    {
        $items = $this->items()->available()->take($quantity)->get();

        if ($items->count() < $quantity) {
            throw new NotEnoughItemsException;
        }

        $order = $this->orders()->create(['email' => $email]);

        foreach ($items as $item) {
            $order->items()->save($item);
        }

        return $order;
    }

    public function addItems($quantity)
    {
        foreach (range(1, $quantity) as $i) {
            $this->items()->create([]);
        }

        return $this;
    }

    public function itemsRemaining()
    {
        return $this->items()->available()->count();
    }
}
