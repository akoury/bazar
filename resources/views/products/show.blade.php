@extends('layouts.app')

@section('title', 'Product')

@section('content')
    <h1>{{ $product->name }}</h1>
    <h1>{{ $product->description }}</h1>
    <h1>{{ number_format($product->price / 100, 2) }}</h1>
@endsection