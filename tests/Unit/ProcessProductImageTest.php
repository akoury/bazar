<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use App\Jobs\ProcessProductModelImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProcessProductImageTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_optimizes_the_products_image()
    {
        Storage::fake('public');

        //The image is 3000x3000 to force PHP's memory limit to be high (512M)
        $image = UploadedFile::fake()->image('example-image.png', 3000, 3000);

        Storage::disk('public')->putFileAs('products', $image, 'example-image.png');

        $model = $this->create('ProductModel', 1, [
            'image_path' => 'products/example-image.png',
        ]);

        ProcessProductModelImage::dispatch($model);

        $originalSize = filesize($image);
        $optimizedImageSize = Storage::disk('public')->size('products/example-image.png');
        $this->assertLessThan($originalSize, $optimizedImageSize);
    }
}
