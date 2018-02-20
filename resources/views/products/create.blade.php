@extends('layouts.app')

@section('title', 'Create a Product')

@section('content')
    <h1>Create a Product</h1>
    <form method="POST" action="{{ route('products.store') }}" enctype="multipart/form-data">
        {{ csrf_field() }}

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
        
        <label for="price">Price</label>
        <input id="price" type="number" name="price" step="0.01" value="{{ old('price') }}" required>
        @if ($errors->has('price'))
            {{ $errors->first('price') }}
        @endif

        <label for="item_quantity">Item Quantity</label>
        <input id="item_quantity" type="number" name="item_quantity" value="{{ old('item_quantity') }}" required>
        @if ($errors->has('item_quantity'))
            {{ $errors->first('item_quantity') }}
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