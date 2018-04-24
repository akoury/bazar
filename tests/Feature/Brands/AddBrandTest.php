<?php

namespace Tests\Feature\Brands;

use Tests\TestCase;
use App\Models\User;
use App\Models\Brand;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AddBrandTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_view_the_brand_creation_form()
    {
        $this->signIn();

        $response = $this->get(route('brands.create'));

        $response->assertStatus(200);
    }

    /** @test */
    public function guests_cannot_view_the_brand_creation_form()
    {
        $this->get(route('brands.create'))
            ->assertStatus(302)
            ->assertRedirect(route('login'));
    }

    /** @test */
    public function a_user_can_create_a_brand()
    {
        $user = $this->create('User');
        $this->signIn($user);

        $response = $this->post(route('brands.store'), [
            'name'   => 'Apple',
            'slogan' => 'Think different',
        ]);

        $brand = Brand::first();

        $response->assertStatus(302)
            ->assertRedirect(route('brands.show', $brand));

        $this->assertTrue($user->brands->contains($brand));
        $this->assertEquals('Apple', $brand->name);
        $this->assertEquals('Think different', $brand->slogan);
    }

    /** @test */
    public function a_guest_cannot_create_a_brand()
    {
        $response = $this->post(route('brands.store'), [
            'name'   => 'Apple',
            'slogan' => 'Think different',
        ]);

        $response->assertStatus(302)
            ->assertRedirect(route('login'));

        $this->assertEquals(0, Brand::count());
    }

    private function validParams($overrides = [])
    {
        return array_merge([
            'name'   => 'Apple',
            'slogan' => 'Think different',
        ], $overrides);
    }

    /** @test */
    public function name_is_required_to_create_a_brand()
    {
        $this->signIn();

        $response = $this->from(route('brands.create'))->post(route('brands.store'), $this->validParams([
            'name' => '',
        ]));

        $this->assertValidationError($response, 'name', route('brands.create'));
        $this->assertEquals(0, Brand::count());
    }

    /** @test */
    public function slogan_is_optional_to_create_a_brand()
    {
        $this->signIn();

        $response = $this->from(route('brands.create'))->post(route('brands.store'), $this->validParams([
            'slogan' => '',
        ]));

        $brand = Brand::first();

        $response->assertStatus(302)
            ->assertRedirect(route('brands.show', $brand));
    }
}
