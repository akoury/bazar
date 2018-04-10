@extends('layouts.app')

@section('title', 'Checkout')

@section('content')
    <h1>Checkout</h1>
    @foreach($products as $product)
        <h1>
            {{ $cart->findProduct($product)['quantity'] }} of
            {{ $product->name }} ${{ $product->price() }}
        </h1>
    @endforeach
    <checkout total-price="{{ $total }}" email="{{ optional(auth()->user())->email }}"></checkout>
@endsection