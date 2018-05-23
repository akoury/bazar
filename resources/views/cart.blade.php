@extends('layouts.app')

@section('title', 'Your Cart')

@section('content')
    <h1>Your Cart</h1>
    @if($products->isNotEmpty())
        <a href="{{ route('orders.create') }}">Proceed to Checkout</a>
        <h1>Total: ${{ $total }}</h1>
    @endif
    @foreach($cart->products as $cartProduct)
        @php($product = $products->firstWhere('id', $cartProduct['id']))
        <h1>
            {{ $cartProduct['quantity'] }} of
            <a href="{{ $product->url() }}">{{ $product->fullName }}</a> ${{ $product->price() }}
        </h1>
        <form method="POST" action="{{ route('carts.destroy', $product) }}">
            @csrf
            @method('DELETE')
            <button type="submit">Remove</button>
        </form>
        <form method="POST" action="{{ route('carts.update', $product) }}">
            @csrf
            <label for="quantity">New Quantity</label>
            <input id="quantity" type="number" name="quantity" value="{{ old('quantity', $cartProduct['quantity']) }}" min="0" required>
            @if ($errors->has('quantity'))
                {{ $errors->first('quantity') }}
            @endif
            <button type="submit">Edit</button>
        </form>
    @endforeach
@endsection