<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    protected function create($class, $times = null, $attributes = [], $states = null)
    {
        if ($times == 1) {
            $times = null;
        }

        if ($states) {
            return factory('App\Models\\' . $class, $times)->states($states)->create($attributes);
        }

        return factory('App\Models\\' . $class, $times)->create($attributes);
    }

    protected function make($class, $times = null, $attributes = [], $states = null)
    {
        if ($times == 1) {
            $times = null;
        }

        if ($states) {
            return factory('App\Models\\' . $class, $times)->states($states)->make($attributes);
        }

        return factory('App\Models\\' . $class, $times)->make($attributes);
    }

    protected function createProductsForModel($attributes = [], $times = 1)
    {
        if (property_exists($attributes, 'price')) {
            $price = $attributes['price'];
            unset($attributes['price']);
        }

        $model = $this->create('ProductModel', 1, $attributes);

        if ($times == 1) {
            $times = null;
        }

        if (isset($price)) {
            return $this->create('Product', $times, ['product_model_id' => $model->id, 'price' => $price]);
        }

        return $this->create('Product', $times, ['product_model_id' => $model->id]);
    }

    protected function signIn($user = null)
    {
        $user = $user ?: $this->create('User');

        $this->actingAs($user);

        return $this;
    }

    protected function brandForSignedInUser($user = null)
    {
        $user ?? $user = $this->create('User');
        $brand = $this->create('Brand');
        $user->brands()->attach($brand);

        $this->signIn($user);

        return $brand;
    }

    protected function assertValidationError($response, $field, $from = null)
    {
        if (request()->wantsJson()) {
            $response->assertStatus(422)
                ->assertJsonValidationErrors($field)
                ->assertJsonCount(1, 'errors');
        } else {
            $response->assertStatus(302)
                ->assertRedirect($from)
                ->assertSessionHasErrors($field);
            $this->assertEquals(1, count(session('errors')->default->messages()));
        }
    }

    protected function assertCollectionsAreEqual($collectionA, $collectionB)
    {
        return $collectionA->count() === $collectionB->count()
            &&
            $collectionA->zip($collectionB)->every(function ($itemPair) {
                return $itemPair[0]->is($itemPair[1]);
            });
    }
}
