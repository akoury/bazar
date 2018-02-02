<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $guarded = [];

    public static function forItems($email, $items, $amount)
    {
        $order = self::create([
            'confirmation_number' => static::generateConfirmationNumber(),
            'email'               => $email,
            'amount'              => $amount
        ]);

        $order->items()->saveMany($items);

        return $order;
    }

    public static function generateConfirmationNumber()
    {
        $pool = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        return substr(str_shuffle(str_repeat($pool, 24)), 0, 24);
    }

    public static function findByConfirmationNumber($confirmationNumber)
    {
        return self::where('confirmation_number', $confirmationNumber)->firstOrFail();
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
            'confirmation_number' => $this->confirmation_number,
            'email'               => $this->email,
            'quantity'            => $this->itemQuantity(),
            'amount'              => $this->amount,
        ];
    }
}
