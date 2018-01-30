<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $guarded = [];

    public function items()
    {
        return $this->hasMany(Item::class);
    }

    public function cancel()
    {
        foreach ($this->items as $item) {
            $item->release();
        }

        $this->delete();
    }

    public function itemQuantity()
    {
        return $this->items()->count();
    }
}
