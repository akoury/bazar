<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProductModelTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_get_the_products_attributes_and_corresponding_values()
    {
        $model = $this->create('ProductModel');
        $products = $this->create('Product', 2, ['product_model_id' => $model->id]);

        $attributeA = $this->create('Attribute', 1, [
            'name' => 'color',
        ]);

        $valueA = $this->create('Value', 1, [
            'name'         => 'black',
            'attribute_id' => $attributeA->id
        ]);

        $attributeB = $this->create('Attribute', 1, [
            'name' => 'capacity',
        ]);

        $valueB = $this->create('Value', 1, [
            'name'         => '32gb',
            'attribute_id' => $attributeB->id
        ]);

        $valueC = $this->create('Value', 1, [
            'name'         => '64gb',
            'attribute_id' => $attributeB->id
        ]);

        $model->products->first()->values()->attach($valueA);
        $model->products->first()->values()->attach($valueB);
        $model->products->last()->values()->attach($valueA);
        $model->products->last()->values()->attach($valueC);

        $attributes = $model->attributes();

        $this->assertCount(2, $attributes);
        $this->assertTrue($attributes->first()->is($attributeA));
        $this->assertTrue($attributes->first()->values->first()->is($valueA));
        $this->assertTrue($attributes->last()->is($attributeB));
        $this->assertTrue($attributes->last()->values->first()->is($valueB));
        $this->assertTrue($attributes->last()->values->last()->is($valueC));
        $this->assertArrayNotHasKey('attribute', $attributes->first()->values->first()->toArray());
        $this->assertArrayNotHasKey('pivot', $attributes->first()->values->first()->toArray());
    }

    /** @test */
    public function can_load_the_products_item_quantities()
    {
        $model = $this->create('ProductModel');
        $this->create('Product', 1, ['product_model_id' => $model->id])->addItems(1);
        $this->create('Product', 1, ['product_model_id' => $model->id])->addItems(3);

        $model->loadItemQuantity();

        $this->assertEquals(1, $model->products->first()->item_quantity);
        $this->assertEquals(3, $model->products->last()->item_quantity);
        $this->assertArrayNotHasKey('items', $model->products->first()->toArray());
    }

    /** @test */
    public function can_get_the_models_url_for_the_product_with_the_lowest_price()
    {
        $model = $this->create('ProductModel');
        $productA = $this->create('Product', 1, ['product_model_id' => $model->id, 'price' => 300]);
        $productB = $this->create('Product', 1, ['product_model_id' => $model->id, 'price' => 100]);
        $productC = $this->create('Product', 1, ['product_model_id' => $model->id, 'price' => 200]);

        $this->assertEquals($model->url(), route('products.show', [$model->brand_id, $productB->id]));
    }
}
