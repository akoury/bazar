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
            ->assertSee('Coming in 2017');
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
    public function a_user_can_view_a_brands_published_product_models()
    {
        $brand = $this->create('Brand');

        $productA = $this->createProductsForModel([
            'name'      => 'iPhone X',
            'published' => true,
            'brand_id'  => $brand->id
        ]);

        $productB = $this->createProductsForModel([
            'name'      => 'iPhone 8',
            'published' => false,
            'brand_id'  => $brand->id
        ]);

        $models = $brand->models()->wherePublished(true)->get();

        $this->get(route('products.index', $brand))
            ->assertStatus(200)
            ->assertViewHas('models', function ($viewModels) use ($models) {
                return $this->assertCollectionsAreEqual($viewModels, $models);
            })
            ->assertSee('iPhone X')
            ->assertDontSee('iPhone 8');
    }
}
