@extends('layouts.app')

@section('title', 'Products')

@section('content')
    @auth
        <a href="{{ route('products.create') }}">Create</a>
    @endauth
    @foreach ($products as $product)
        <h1><a href="{{ route('products.show', $product) }}">{{ $product->name }}</a></h1>
        <h1>{{ $product->description }}</h1>
        <h1>{{ $product->price() }}</h1>
    @endforeach
@endsection