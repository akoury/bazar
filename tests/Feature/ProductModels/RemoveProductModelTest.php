<?php

namespace Tests\Feature\Products;

use Tests\TestCase;
use App\Models\Product;
use App\Models\ProductModel;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RemoveProductModelTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_guest_cannot_remove_a_product_model()
    {
        $model = $this->create('ProductModel');

        $this->json('DELETE', route('product-models.destroy', $model->id))
            ->assertStatus(401);

        $this->assertFalse($model->fresh()->trashed());
    }

    /** @test */
    public function a_user_cannot_remove_a_product_model_from_a_brand_he_does_not_own()
    {
        $this->signIn();
        $model = $this->create('ProductModel');

        $this->json('DELETE', route('product-models.destroy', $model->id))
            ->assertStatus(404);

        $this->assertFalse($model->fresh()->trashed());
    }

    /** @test */
    public function a_user_can_remove_a_product_model_from_his_brand()
    {
        $brand = $this->brandForSignedInUser();
        $product = $this->createProductsForModel([
            'brand_id' => $brand->id
        ])->addItems(4);

        $this->json('DELETE', route('product-models.destroy', $product->model->id))
            ->assertStatus(200)
            ->assertJsonFragment([route('product-models.index', $product->brand_id)]);

        $this->assertTrue($product->model->fresh()->trashed());
        $this->assertFalse($product->model->fresh()->published);
        $this->assertTrue($product->fresh()->trashed());
        $this->assertEquals(0, $product->fresh()->itemsRemaining());
    }
}
