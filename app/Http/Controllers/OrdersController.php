<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Classes\Reservation;
use App\Classes\PaymentGateway;
use App\Exceptions\PaymentFailedException;
use App\Exceptions\NotEnoughItemsException;

class OrdersController extends Controller
{
    private $paymentGateway;

    public function __construct(PaymentGateway $paymentGateway)
    {
        $this->paymentGateway = $paymentGateway;
    }

    public function store($productId)
    {
        $product = Product::wherePublished(true)->findOrFail($productId);

        request()->validate([
            'email'         => 'required|email',
            'quantity'      => 'required|integer|min:1',
            'payment_token' => 'required'
        ]);

        try {
            $items = $product->findItems(request('quantity'));
            $reservation = new Reservation($items);

            $this->paymentGateway->charge($reservation->totalCost(), request('payment_token'));

            $order = Order::forItems(request('email'), $items, $reservation->totalCost());

            return response()->json($order, 201);
        } catch (PaymentFailedException $e) {
            return response()->json([], 422);
        } catch (NotEnoughItemsException $e) {
            return response()->json([], 422);
        }
    }
}
