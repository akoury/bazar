@extends('layouts.app')

@section('title', 'Create a Product')

@section('content')
    <h1>Create a Product</h1>
    <form method="POST" action="{{ route('products.store', $brand) }}" enctype="multipart/form-data">
        @csrf

        <label for="name">Name</label>
        <input id="name" type="text" name="name" value="{{ old('name') }}" required autofocus>
        @if ($errors->has('name'))
            {{ $errors->first('name') }}
        @endif

        <label for="description">Description</label>
        <textarea id="description" name="description" rows="3" required>{{ old('description') }}</textarea>
        @if ($errors->has('description'))
            {{ $errors->first('description') }}
        @endif

        <label for="price">Price 1:</label>
        <input id="price" type="number" name="products[0][price]" step="0.01" value="{{ old('products.0.price') }}" required>
        @if ($errors->has('products.0.price'))
            {{ $errors->first('products.0.price') }}
        @endif

        <label for="item_quantity">Item Quantity 1:</label>
        <input id="item_quantity" type="number" name="products[0][item_quantity]" value="{{ old('products.0.item_quantity') }}" required>
        @if ($errors->has('products.0.item_quantity'))
            {{ $errors->first('products.0.item_quantity') }}
        @endif

        <label for="price">Price 2:</label>
        <input id="price" type="number" name="products[1][price]" step="0.01" value="{{ old('products.1.price') }}" required>
        @if ($errors->has('products.1.price'))
            {{ $errors->first('products.1.price') }}
        @endif

        <label for="item_quantity">Item Quantity 2:</label>
        <input id="item_quantity" type="number" name="products[1][item_quantity]" value="{{ old('products.1.item_quantity') }}" required>
        @if ($errors->has('products.1.item_quantity'))
            {{ $errors->first('products.1.item_quantity') }}
        @endif

        <label>
            <input type="checkbox" name="published" value="1" {{ old('published') ? 'checked' : '' }}>Publish
        </label>
        @if ($errors->has('published'))
            {{ $errors->first('published') }}
        @endif

        <label for="product_image">Product Image</label>
        <input id="product_image" type="file" name="product_image" value="{{ old('product_image') }}">
        @if ($errors->has('product_image'))
            {{ $errors->first('product_image') }}
        @endif
        
        <button type="submit">Create</button>
    </form>
@endsection