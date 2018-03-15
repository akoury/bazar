@extends('layouts.app')

@section('title', 'Your Dashboard')

@section('content')
    <h1>Your Cart</h1>
    @foreach($products as $product)
        <h1>
            {{ $product->quantity ?? $product->cart->quantity }} of 
            <a href="{{ route('products.show', [$product->brand_id, $product]) }}">{{ $product->name }}</a> ${{ $product->price() }}
        </h1> 
    @endforeach
@endsection