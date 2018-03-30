<?php

namespace App\Http\Controllers\Auth;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/dashboard';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    protected function authenticated(Request $request, $user)
    {
        if (session()->has('cart')) {
            $guestCart = session('cart');
            $userCart = cart();

            $products = Product::fromCart($guestCart);
            $guestCart->products->each(function ($product) use ($products, $userCart) {
                $userCart->add($products->firstWhere('id', $product['id']), $product['quantity']);
            });

            $userCart->save();
            session()->forget('cart');
        }

        return redirect()->intended($this->redirectPath());
    }
}
