@extends('layouts.app')

@section('title', 'Your Order')

@section('content')
    <h1>Order #{{ $order->confirmation_number }}</h1>
    <h1>For: {{ $order->email }}</h1>
    <h1>${{ $order->amount() }}</h1>
    <h1> **** **** **** {{ $order->card_last_four }} </h1>
    <h1>Items</h1>
    @foreach ($order->items as $item)
        <h1>
            <a href="{{ $item->product->url() }}">{{ $item->product->fullName }}</a> ${{ $item->price() }}
        </h1>
    @endforeach
@endsection