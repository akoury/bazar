<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ViewProductTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_view_a_published_product()
    {
        $product = factory(Product::class)->create([
            'name'        => 'iPhone X',
            'description' => 'Coming in 2017',
            'price'       => 10000
        ]);

        $this->get(route('products.show', ['id' => $product->id]))
            ->assertSee('iPhone X')
            ->assertSee('Coming in 2017')
            ->assertSee('100.00');
    }

    /** @test */
    public function a_user_cannot_view_an_unpublished_product()
    {
        $product = factory(Product::class)->states('unpublished')->create();

        $response = $this->get(route('products.show', $product->id));

        $response->assertStatus(404);
    }
}
