<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Classes\PaymentGateway;
use App\Classes\PaymentFailedException;

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
            $this->paymentGateway->charge(request('quantity') * $product->price, request('payment_token'));
            $order = $product->orderItems(request('email'), request('quantity'));

            return response()->json([], 201);
        } catch (PaymentFailedException $e) {
            return response()->json([], 422);
        }
    }
}
