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
            $reservation = $product->reserveItems(request('quantity'), request('email'));
            $order = $reservation->complete($this->paymentGateway, request('payment_token'));
            return response()->json($order, 201);
        } catch (PaymentFailedException $e) {
            $reservation->cancel();
            return response()->json([], 422);
        } catch (NotEnoughItemsException $e) {
            return response()->json([], 422);
        }
    }
}
