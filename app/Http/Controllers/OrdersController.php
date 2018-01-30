<?php

namespace App\Http\Controllers;

use App\Models\Product;
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
            $order = $product->orderItems(request('email'), request('quantity'));
            $this->paymentGateway->charge(request('quantity') * $product->price, request('payment_token'));
            return response()->json([], 201);
        } catch (PaymentFailedException $e) {
            $order->cancel();
            return response()->json([], 422);
        } catch (NotEnoughItemsException $e) {
            return response()->json([], 422);
        }
    }
}
