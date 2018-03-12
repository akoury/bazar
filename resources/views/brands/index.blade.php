@extends('layouts.app')

@section('title', 'All Brands')

@section('content')
    @foreach ($brands as $brand)
        <h1><a href="{{ route('brands.show', $brand->name) }}">{{ $brand->name }}</a></h1>
        <h1>{{ $brand->slogan }}</h1>
    @endforeach
@endsection