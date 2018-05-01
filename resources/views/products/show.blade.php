@extends('layouts.app')

@section('title', $product->name)

@section('content')
    @auth
        <a href="{{ route('products.edit', $product) }}">Edit</a>
        <h2>Sold: {{ $product->itemsSold() }}</h2>
        <h2>Revenue: {{ $product->revenue() }}</h2>
    @endauth
    <img src="{{ url($product->image_path) }}" alt="product" height="100px">
    <h2>Items Remaining: {{ $product->itemsRemaining() }}</h2>
    <h1>{{ $model->name }}</h1>
    <h1>{{ $model->description }}</h1>
    <h1>{{ $product->price() }}</h1>

    @foreach($model->attributes() as $attribute)
        <h3>{{ $attribute->name . ':'}}</h3>
        @foreach($attribute->values as $value)
            @if($product->values->contains($value))
                <h3>{{ $value->name}}</h3>
            @else
                <p>{{ $value->name}}</p>
            @endif
        @endforeach
    @endforeach

    <product-checkout product-id="{{ $product->id }}" product-price="{{ $product->price }}" user-email="{{ optional(auth()->user())->email }}"></product-checkout>
@endsection

@push('scripts')
    <meta name="turbolinks-visit-control" content="reload">
    <script src="https://checkout.stripe.com/checkout.js"></script>
    <script>
        var App = {
            stripeKey: '{{ config('services.stripe.key') }}',
        }
    </script>
@endpush