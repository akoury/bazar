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
        $product = $this->create('Product', 1, [
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
        $product = $this->create('Product', 1, [], 'unpublished');

        $response = $this->get(route('products.show', [$product->brand_id, $product]));

        $response->assertStatus(404);
    }

    /** @test */
    public function a_user_can_view_a_brands_published_products()
    {
        $brand = $this->create('Brand');

        $product = $this->create('Product', 1, [
            'name'     => 'iPhone X',
            'price'    => 10000,
            'brand_id' => $brand
        ]);

        $product2 = $this->create('Product', 1, [
            'name'     => 'Galaxy S8',
            'price'    => 50000,
            'brand_id' => $brand
        ]);

        $product3 = $this->create('Product', 1, [
            'name'     => 'Google Pixel',
            'brand_id' => $brand
        ], 'unpublished');

        $products = $brand->products()->wherePublished(true)->get();

        $this->get(route('products.index', $brand))
            ->assertStatus(200)
            ->assertViewHas('products', function ($viewProducts) use ($products) {
                return $this->assertCollectionsAreEqual($viewProducts, $products);
            })
            ->assertSee('iPhone X')
            ->assertSee('100.00')
            ->assertSee('Galaxy S8')
            ->assertSee('500.00')
            ->assertDontSee('Google Pixel');
    }
}
