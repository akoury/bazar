@extends('layouts.app')

@section('title', 'Product')

@section('content')
    <h1>{{ $product->name }}</h1>
    <h1>{{ $product->description }}</h1>
    <h1>{{ $product->price() }}</h1>
    <product-checkout></product-checkout>
@endsection