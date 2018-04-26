<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Jobs\ProcessProductImage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProcessProductImageTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_optimizes_the_products_image()
    {
        Storage::fake('public');

        $image = UploadedFile::fake()->image('example-image.png', 1000, 1000);
        Storage::disk('public')->putFileAs('products', $image, 'example-image.png');

        $product = $this->createProductsForModel([
            'image_path' => 'products/example-image.png',
        ]);

        ProcessProductImage::dispatch($product);

        $originalSize = filesize($image);
        $optimizedImageSize = Storage::disk('public')->size('products/example-image.png');
        $this->assertLessThan($originalSize, $optimizedImageSize);
    }
}
