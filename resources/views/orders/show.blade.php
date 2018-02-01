@extends('layouts.app')

@section('title', 'order')

@section('content')
    <h1>{{ number_format($order->amount / 100, 2) }}</h1>
    <h1>{{ $order->email }}</h1>
    <h1>{{ $order->confirmation_number }}</h1>
    <h1> **** **** **** {{ $order->card_last_four }} </h1>
    @foreach ($order->items as $item)
        <h1>{{ $item->product->name }}</h1>
    @endforeach
@endsection