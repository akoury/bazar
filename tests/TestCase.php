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
            $response->assertStatus(422);
            $this->assertArrayHasKey($field, $response->decodeResponseJson()['errors']);
        } else {
            $response->assertStatus(302)
                ->assertRedirect($from)
                ->assertSessionHasErrors($field);
        }
    }

    protected function assertCollectionsAreEqual($collectionA, $collectionB)
    {
        $intersectionACount = $collectionA->intersect($collectionB)->count();
        $intersectionBCount = $collectionB->intersect($collectionA)->count();

        if ($intersectionACount === $intersectionBCount && $intersectionACount === $collectionA->count() && $collectionA->count() === $collectionB->count()) {
            return true;
        }

        return false;
    }
}
