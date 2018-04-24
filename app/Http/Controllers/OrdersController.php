<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Classes\Reservation;
use App\Classes\PaymentGateway;
use App\Notifications\OrderConfirmation;
use App\Classes\MercadoPagoPaymentGateway;
use App\Exceptions\PaymentFailedException;
use App\Exceptions\NotEnoughItemsException;
use Illuminate\Support\Facades\Notification;
use App\Exceptions\UnpublishedProductException;

class OrdersController extends Controller
{
    public function create()
    {
        $cart = cart()->update();

        if ($cart->isEmpty()) {
            return redirect()->route('carts.show');
        }

        $products = Product::fromCart($cart);

        $total = $cart->total($products);

        $paymentGateway = new MercadoPagoPaymentGateway;
        $link = $paymentGateway->generateLink($total);

        return view('orders.create', compact('cart', 'products', 'total', 'link'));
    }

    public function store($productId = null, PaymentGateway $paymentGateway)
    {
        request()->validate([
            'email'         => 'required|email',
            'quantity'      => 'sometimes|required|integer|min:1',
            'payment_token' => 'required'
        ]);

        try {
            if ($productId) {
                $product = Product::findOrFail($productId);
                $reservation = $product->reserveItems(request('quantity'), request('email'));
            } else {
                $reservation = new Reservation(request('email'));
            }

            $order = $reservation->complete($paymentGateway, request('payment_token'));

            Notification::route('mail', $order->email)->notify(new OrderConfirmation($order));

            if (! $productId) {
                cart()->clear();
            }

            return response()->json($order, 201);
        } catch (UnpublishedProductException $e) {
            return response()->json(['A product you requested is not available'], 422);
        } catch (NotEnoughItemsException $e) {
            return response()->json(['The items you requested are not available'], 422);
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
