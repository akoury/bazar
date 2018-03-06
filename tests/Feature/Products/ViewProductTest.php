<?php

namespace Tests\Feature\Products;

use Tests\TestCase;
use App\Models\Brand;
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

        $this->get(route('products.show', [$product->brand_id, $product]))
            ->assertSee('iPhone X')
            ->assertSee('Coming in 2017')
            ->assertSee('100.00');
    }

    /** @test */
    public function a_user_cannot_view_an_unpublished_product()
    {
        $product = factory(Product::class)->states('unpublished')->create();

        $response = $this->get(route('products.show', [$product->brand_id, $product]));

        $response->assertStatus(404);
    }

    /** @test */
    public function a_user_can_view_a_brands_published_products()
    {
        $brand = factory(Brand::class)->create();

        $product = factory(Product::class)->create([
            'name'     => 'iPhone X',
            'price'    => 10000,
            'brand_id' => $brand
        ]);

        $product2 = factory(Product::class)->create([
            'name'     => 'Galaxy S8',
            'price'    => 50000,
            'brand_id' => $brand
        ]);

        $product3 = factory(Product::class)->states('unpublished')->create([
            'name'     => 'Google Pixel',
            'brand_id' => $brand
        ]);

        $products = $brand->products()->wherePublished(true)->get();

        $this->get(route('products.index', $brand))
            ->assertStatus(200)
            ->assertViewHas('products', function ($viewProducts) use ($products) {
                return $products->diff($viewProducts)->count() === 0;
            })
            ->assertSee('iPhone X')
            ->assertSee('100.00')
            ->assertSee('Galaxy S8')
            ->assertSee('500.00')
            ->assertDontSee('Google Pixel');
    }
}
