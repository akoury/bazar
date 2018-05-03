@extends('layouts.app')

@section('title', $product->name)

@section('content')
    @auth
        <a href="{{ route('products.edit', $product) }}">Edit</a>
        <h2>Sold: {{ $product->itemsSold() }}</h2>
        <h2>Revenue: {{ $product->revenue() }}</h2>
        <h2>Items Remaining: {{ $product->itemsRemaining() }}</h2>
    @endauth

    <div class="py-4 container mx-auto">
        <div class="flex flex-wrap rounded-lg bg-white shadow-md">
            <div class="w-full sm:w-3/5 max-h-screen overflow-hidden flex items-center content-center p-2 sm:p-4 border-b sm:border-r border-grey-lighter">
                <img src="{{ url($product->image_path) }}" class="mx-auto" alt="product">
            </div>
            <div class="w-full sm:w-2/5 p-6">
                <h1 class="text-black text-3xl font-semibold mb-6">{{ $model->name }}</h1>
                <h2 class="text-teal text-4xl font-light mb-6">$ {{ $product->price() }}</h1>
                <h3 class="text-grey-dark text-xl font-light leading-normal mb-6">{{ $model->description }}</h1>

                @foreach($model->attributes() as $attribute)
                    <label class="uppercase tracking-wide text-teal-light text-sm font-bold">
                        {{ $attribute->name }}
                    </label>
                    <div class="relative">
                        <select class="appearance-none w-full bg-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded mt-2 mb-6">
                            @foreach($attribute->values as $value)
                                @if($product->values->contains($value))
                                    <option selected>{{ $value->name}}</option>
                                @else
                                    <option>{{ $value->name}}</option>
                                @endif
                            @endforeach
                        </select>
                        <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 pb-4 text-grey-darker">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                @endforeach

                <product-checkout product-id="{{ $product->id }}" product-price="{{ $product->price }}" user-email="{{ optional(auth()->user())->email }}"></product-checkout>
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