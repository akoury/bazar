<?php

namespace Tests\Feature\Brands;

use Tests\TestCase;
use App\Models\Brand;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ViewBrandTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_guest_can_view_a_brand()
    {
        $brand = $this->create('Brand', 1, [
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

    /** @test */
    public function a_guest_can_view_all_brands()
    {
        $brands = $this->create('Brand', 3);

        $this->get(route('brands.index'))
            ->assertStatus(200)
            ->assertViewHas('brands', function ($viewBrands) use ($brands) {
                return $brands->diff($viewBrands)->count() === 0;
            });
    }
}
