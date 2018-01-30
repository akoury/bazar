<?php

namespace App\Classes;

class Reservation
{
    private $items;

    public function __construct($items)
    {
        $this->items = $items;
    }

    public function totalCost()
    {
        return $this->items->sum('price');
    }

    public function cancel()
    {
        $this->items->each->release();
    }
}
