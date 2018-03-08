<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Item;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ItemTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function an_item_can_be_reserved()
    {
        $item = $this->create('Item');
        $this->assertNull($item->fresh()->reserved_at);

        $item->reserve();

        $this->assertNotNull($item->fresh()->reserved_at);
    }

    /** @test */
    public function an_item_can_be_released()
    {
        $item = $this->create('Item', 1, [], 'reserved');
        $this->assertNotNull($item->reserved_at);

        $item->release();

        $this->assertNull($item->fresh()->reserved_at);
    }
}
