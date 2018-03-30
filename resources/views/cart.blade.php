@extends('layouts.app')

@section('title', 'Your Dashboard')

@section('content')
    <h1>Your Cart</h1>
    @foreach($cart->products as $cartProduct)
        @php($product = $products->firstWhere('id', $cartProduct['id']))
        <h1>
            {{ $cartProduct['quantity'] }} of 
            <a href="{{ route('products.show', [$product->brand_id, $product]) }}">{{ $product->name }}</a> ${{ $product->price() }}
        </h1> 
    @endforeach
@endsection