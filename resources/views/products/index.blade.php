@extends('layouts.app')

@section('title', 'Product')

@section('content')
    @foreach ($products as $product)
        <h1><a href="{{ route('products.show', ['id' => $product->id]) }}">{{ $product->name }}</a></h1>
        <h1>{{ $product->description }}</h1>
        <h1>{{ $product->price() }}</h1>
    @endforeach
@endsection