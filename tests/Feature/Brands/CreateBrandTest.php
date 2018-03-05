<?php

namespace Tests\Feature\Brands;

use Tests\TestCase;
use App\Models\User;
use App\Models\Brand;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CreateBrandTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_view_the_brand_creation_form()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->get(route('brands.create'));

        $response->assertStatus(200);
    }

    /** @test */
    public function guests_cannot_view_the_brand_creation_form()
    {
        $response = $this->get(route('brands.create'));

        $response->assertStatus(302)
            ->assertRedirect(route('login'));
    }

    /** @test */
    public function a_user_can_create_a_brand()
    {
        $user = factory(User::class)->create();

        $response = $this->actingAs($user)->post(route('brands.store'), [
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
}
