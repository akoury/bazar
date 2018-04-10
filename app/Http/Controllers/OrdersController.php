<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Classes\Reservation;
use App\Classes\PaymentGateway;
use App\Notifications\OrderConfirmation;
use App\Exceptions\PaymentFailedException;
use App\Exceptions\NotEnoughItemsException;
use Illuminate\Support\Facades\Notification;

class OrdersController extends Controller
{
    public function create()
    {
        $cart = cart();

        $products = Product::fromCart($cart);

        $total = $cart->total($products);

        return view('orders.create', compact('cart', 'products', 'total'));
    }

    public function store($productId, PaymentGateway $paymentGateway)
    {
        $product = Product::wherePublished(true)->findOrFail($productId);

        request()->validate([
            'email'         => 'required|email',
            'quantity'      => 'required|integer|min:1',
            'payment_token' => 'required'
        ]);

        try {
            $reservation = $product->reserveItems(request('quantity'), request('email'));
            $order = $reservation->complete($paymentGateway, request('payment_token'));

            Notification::route('mail', $order->email)->notify(new OrderConfirmation($order));

            return response()->json($order, 201);
        } catch (NotEnoughItemsException $e) {
            return response()->json(['The number of items you requested is not available'], 422);
        } catch (PaymentFailedException $e) {
            $reservation->cancel();
            return response()->json(['Your payment could not be processed'], 422);
        }
    }

    public function storeCart(PaymentGateway $paymentGateway)
    {
        request()->validate([
            'email'         => 'required|email',
            'payment_token' => 'required'
        ]);

        try {
            $reservation = new Reservation(request('email'));
            $order = $reservation->complete($paymentGateway, request('payment_token'));

            Notification::route('mail', $order->email)->notify(new OrderConfirmation($order));

            cart()->clear();

            return response()->json($order, 201);
        } catch (PaymentFailedException $e) {
            $reservation->cancel();
            return response()->json(['Your payment could not be processed'], 422);
        }
    }

    public function show($confirmationNumber)
    {
        $order = Order::findByConfirmationNumber($confirmationNumber);

        return view('orders.show', compact('order'));
    }

    public function index()
    {
        $orders = auth()->user()->orders;

        return view('orders.index', compact('orders'));
    }
}
