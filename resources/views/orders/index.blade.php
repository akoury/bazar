@extends('layouts.app')

@section('title', 'Your Orders')

@section('content')
    @foreach ($orders as $order)
        <h1>
            <a href="{{ route('orders.show', $order->confirmation_number) }}">Order #{{ $order->confirmation_number }}</a> ${{ $order->amount }}
        </h1>
    @endforeach
@endsection