<?php

namespace App\Models;

use App\Classes\Reservation;
use Illuminate\Database\Eloquent\Model;
use App\Exceptions\NotEnoughItemsException;

class Product extends Model
{
    protected $guarded = [];

    protected $casts = [
        'published' => 'boolean',
    ];

    public function price()
    {
        return number_format($this->price / 100, 2);
    }

    public function orders()
    {
        return Order::whereIn('id', $this->items()->pluck('order_id'));
    }

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function reserveItems($quantity, $email)
    {
        return new Reservation($this->findItems($quantity)->each->reserve(), $email);
    }

    public function findItems($quantity)
    {
        $items = $this->items()->available()->take($quantity)->get();

        if ($items->count() < $quantity) {
            throw new NotEnoughItemsException;
        }

        return $items;
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

    public function itemsSold()
    {
        return $this->items()->sold()->count();
    }

    public function revenue()
    {
        return $this->orders()->sum('amount') / 100;
    }
}
