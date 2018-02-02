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

    /** @test */
    public function a_user_can_view_published_products()
    {
        $product = factory(Product::class)->create([
            'name'  => 'iPhone X',
            'price' => 10000
        ]);

        $product2 = factory(Product::class)->create([
            'name'  => 'Galaxy S8',
            'price' => 50000
        ]);

        $product3 = factory(Product::class)->states('unpublished')->create();

        $products = Product::wherePublished(true)->get();

        $this->get(route('products.index'))
            ->assertStatus(200)
            ->assertViewHas('products', function ($viewProducts) use ($products) {
                return $products->diff($viewProducts)->count() === 0;
            })
            ->assertSee('iPhone X')
            ->assertSee('100.00')
            ->assertSee('Galaxy S8')
            ->assertSee('500.00');
    }
}
