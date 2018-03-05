<?php

namespace Tests\Feature\Brands;

use Tests\TestCase;
use App\Models\Brand;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ViewBrandTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_view_a_brand()
    {
        $brand = factory(Brand::class)->create([
            'name'   => 'Apple',
            'slogan' => 'Think different',
        ]);

        $this->get(route('brands.show', $brand))
            ->assertSee('Apple')
            ->assertSee('Think different')
            ->assertViewHas('brand', function ($viewBrand) use ($brand) {
                return $viewBrand->is($brand);
            });
    }
}
