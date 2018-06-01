@extends('layouts.app')

@section('title', $brand->name)

@section('content')
    <h1>{{ $brand->name }}</h1>
    <h2>{{ $brand->slogan }}</h2>
    <a href="{{ route('product-models.index', $brand) }}">View products</a>
    @auth
        <a href="{{ route('product-models.create', $brand) }}">Add a product</a>
    @endauth
@endsection