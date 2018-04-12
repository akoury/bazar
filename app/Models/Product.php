<?php

namespace App\Models;

use App\Classes\Reservation;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use App\Exceptions\NotEnoughItemsException;
use App\Exceptions\UnpublishedProductException;

class Product extends Model
{
    protected $guarded = [];

    protected $casts = [
        'published' => 'boolean',
    ];

    public function orders()
    {
        return Order::whereIn('id', $this->items()->pluck('order_id'));
    }

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function price()
    {
        return number_format($this->price / 100, 2);
    }

    public function reserveItems($quantity, $email)
    {
        $items = DB::transaction(function () use ($quantity) {
            // Finds items and locks them to avoid race conditions
            $items = $this->items()->available()->take($quantity)->lockForUpdate()->get();

            if ($items->count() < $quantity) {
                throw new NotEnoughItemsException;
            }

            $items->transform(function ($item) {
                $item->price = $this->price;
                $item->reserve();
                return $item;
            });

            return $items;
        });

        return new Reservation($email, $items);
    }

    public function addItemsToReservation($quantity)
    {
        if (! $this->published) {
            throw new UnpublishedProductException;
        }

        $items = DB::transaction(function () use ($quantity) {
            $items = $this->items()->available()->take($quantity)->lockForUpdate()->get();

            if ($items->count() < $quantity) {
                throw new NotEnoughItemsException;
            }

            $items->transform(function ($item) {
                $item->price = $this->price;
                $item->reserve();
                return $item;
            });

            return $items;
        });

        return $items;
    }

    public function addItems($quantity)
    {
        foreach (range(1, $quantity) as $i) {
            $this->items()->create();
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

    public static function fromCart($cart)
    {
        return self::find($cart->products->pluck('id'));
    }
}
