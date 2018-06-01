<?php

namespace Tests\Feature\Products;

use Tests\TestCase;
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
    public function a_customer_can_view_a_deleted_product_even_if_its_model_is_not_published()
    {
        $product = $this->create('Product');
        $product->delete();
        $product->model->published = false;
        $product->model->save();

        $this->get(route('products.show', [$product->brand_id, $product]))
            ->assertStatus(200);
    }

    /** @test */
    public function a_customer_can_view_a_deleted_product_even_if_its_model_is_deleted()
    {
        $product = $this->create('Product');
        $product->delete();
        $product->model->delete();

        $this->get(route('products.show', [$product->brand_id, $product]))
            ->assertStatus(200);
    }
}
