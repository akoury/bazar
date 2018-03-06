@extends('layouts.app')

@section('title', 'Brands')

@section('content')
    @foreach ($brands as $brand)
        <h1><a href="{{ route('brands.show', $brand) }}">{{ $brand->name }}</a></h1>
        <h1>{{ $brand->slogan }}</h1>
    @endforeach
@endsection