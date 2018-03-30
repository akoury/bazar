@extends('layouts.app')

@section('title', 'Your Cart')

@section('content')
    <h1>Your Cart</h1>
    @foreach($cart->products as $cartProduct)
        @php($product = $products->firstWhere('id', $cartProduct['id']))
        <h1>
            {{ $cartProduct['quantity'] }} of 
            <a href="{{ route('products.show', [$product->brand_id, $product]) }}">{{ $product->name }}</a> ${{ $product->price() }}
        </h1> 
        <form method="POST" action="{{ route('carts.destroy', $product) }}">
            @csrf
            <button type="submit">Remove</button>
        </form>
        <form method="POST" action="{{ route('carts.update', $product) }}">
            @csrf
            <label for="quantity">New Quantity</label>
            <input id="quantity" type="number" name="quantity" value="{{ old('quantity', $cartProduct['quantity']) }}" required>
            @if ($errors->has('quantity'))
                {{ $errors->first('quantity') }}
            @endif
            <button type="submit">Edit</button>
        </form>
    @endforeach
@endsection