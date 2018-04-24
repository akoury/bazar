<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Item;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ViewOrderTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_customer_can_view_his_order_confirmation()
    {
        $product = $this->create('Product', 1, [
            'name' => 'iPhone X'
        ]);

        $order = $this->create('Order', 1, [
            'amount'              => 8500,
            'confirmation_number' => '123456789',
            'card_last_four'      => 4242
        ]);

        $item = $this->create('Item', 1, [
            'product_id' => $product->id,
            'order_id'   => $order->id
        ]);

        $this->get(route('orders.show', ['confirmation_number' => 123456789]))
            ->assertStatus(200)
            ->assertViewHas('order', function ($viewOrder) use ($order) {
                return $viewOrder->is($order);
            })
            ->assertSee('123456789')
            ->assertSee('85.00')
            ->assertSee('**** **** **** 4242')
            ->assertSee('iPhone X');
    }

    /** @test */
    public function a_user_can_view_his_orders()
    {
        $user = $this->create('User');
        $this->signIn($user);
        $orders = $this->create('Order', 3, [
            'user_id' => $user->id
        ]);

        $this->get(route('orders.index'))
            ->assertStatus(200)
            ->assertViewHas('orders', function ($viewOrders) use ($orders) {
                return $this->assertCollectionsAreEqual($orders, $viewOrders);
            });
    }

    /** @test */
    public function a_user_cannot_view_another_users_orders()
    {
        $otherOrders = $this->create('Order', 2);
        $user = $this->create('User');
        $this->signIn($user);
        $userOrders = $this->create('Order', 2, [
            'user_id' => $user->id
        ]);

        $this->get(route('orders.index'))
            ->assertStatus(200)
            ->assertViewHas('orders', function ($viewOrders) use ($otherOrders, $userOrders) {
                return $this->assertCollectionsAreEqual($viewOrders, $userOrders) && ! $this->assertCollectionsAreEqual($viewOrders, $otherOrders);
            });
    }

    /** @test */
    public function a_guest_cannot_view_his_orders()
    {
        $this->get(route('orders.index'))
            ->assertStatus(302)
            ->assertRedirect(route('login'));
    }
}
