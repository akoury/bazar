<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ViewProduct extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_view_a_product()
    {
        $product = Product::create([
            'name'        => 'iPhone X',
            'description' => 'Coming in 2017',
            'price'       => 10000,
        ]);

        $this->get(route('products.show', $product->id))
            ->assertSee('iPhone X')
            ->assertSee('Coming in 2017')
            ->assertSee('100.00');
    }
}
