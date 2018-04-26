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
        $model = $this->create('ProductModel', 1, [
            'name'        => 'iPhone X',
            'description' => 'Coming in 2017',
        ]);

        $product = $this->create('Product', 1, [
            'product_model_id' => $model->id,
            'price'            => 10000
        ]);

        $this->get(route('products.show', [$model->brand_id, $product]))
            ->assertSee('iPhone X')
            ->assertSee('Coming in 2017')
            ->assertSee('100.00');
    }

    /** @test */
    public function a_user_cannot_view_an_unpublished_product()
    {
        $model = $this->create('ProductModel', 1, ['published' => false]);

        $product = $this->create('Product', 1, [
            'product_model_id' => $model->id,
        ]);

        $response = $this->get(route('products.show', [$model->brand_id, $product]));

        $response->assertStatus(404);
    }

    /** @test */
    public function a_user_can_view_a_brands_published_products()
    {
        $brand = $this->create('Brand');

        $modelA = $this->create('ProductModel', 1, ['name' => 'iPhone X', 'brand_id' => $brand->id]);
        $modelB = $this->create('ProductModel', 1, ['name' => 'iPhone 8', 'brand_id' => $brand->id, 'published' => false]);

        $product1 = $this->create('Product', 1, [
            'price'            => 10000,
            'product_model_id' => $modelA->id,
        ]);

        $product2 = $this->create('Product', 1, [
            'price'            => 50000,
            'product_model_id' => $modelA->id,
        ]);

        $product3 = $this->create('Product', 1, [
            'price'            => 60000,
            'product_model_id' => $modelB->id
        ]);

        $products = $brand->products->where('published', true);

        $this->get(route('products.index', $brand))
            ->assertStatus(200)
            ->assertViewHas('products', function ($viewProducts) use ($products) {
                return $this->assertCollectionsAreEqual($viewProducts, $products);
            })
            ->assertSee('iPhone X')
            ->assertSee('100.00')
            ->assertSee('500.00')
            ->assertDontSee('iPhone 8')
            ->assertDontSee('600.00');
    }
}
