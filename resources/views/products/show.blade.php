@extends('layouts.app')

@section('title', $product->name)

@section('content')
    @auth
        <a href="{{ route('products.edit', $product->product_model_id) }}">Edit</a>
        <h2>Sold: {{ $product->itemsSold() }}</h2>
        <h2>Revenue: {{ $product->revenue() }}</h2>
        <h2>Items Remaining: {{ $product->item_count }}</h2>
    @endauth

    <div class="py-4 container mx-auto">
        <div class="flex flex-wrap rounded-lg bg-white shadow-md sm:h-full">
            <div class="w-full sm:w-3/5 h-64 sm:h-auto overflow-hidden flex items-center content-center p-2 sm:p-4 border-b sm:border-r border-grey-lighter">
                <img src="{{ url($product->image_path) }}" class="mx-auto" alt="product">
            </div>
            <div class="sm:w-2/5 p-6">
                <product-checkout :model="{{ $model }}" :attributes="{{ $model->attributes() }}" product-id="{{ $product->id }}" user-email="{{ optional(auth()->user())->email }}"></product-checkout>
            </div>
        </div>
    </div>
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