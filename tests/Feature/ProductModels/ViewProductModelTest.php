<?php

namespace Tests\Feature\Products;

use Tests\TestCase;
use App\Models\Brand;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ViewProductModelTest extends TestCase
{
    use RefreshDatabase;

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

        $this->get(route('product-models.index', $brand))
            ->assertStatus(200)
            ->assertViewHas('models', function ($viewModels) use ($models) {
                return $this->assertCollectionsAreEqual($viewModels, $models);
            })
            ->assertSee('iPhone X')
            ->assertDontSee('iPhone 8');
    }
}
