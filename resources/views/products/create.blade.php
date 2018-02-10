@extends('layouts.app')

@section('title', 'Create a Product')

@section('content')
    <h1>Create a Product</h1>
    <form method="POST" action="{{ route('products.store') }}">
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
            <input type="checkbox" name="published" value="1" checked>Publish
        </label>
        @if ($errors->has('published'))
            {{ $errors->first('published') }}
        @endif
        
        <button type="submit">Create</button>
    </form>
@endsection