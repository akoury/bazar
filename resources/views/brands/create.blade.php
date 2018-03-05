@extends('layouts.app')

@section('title', 'Create a Brand')

@section('content')
    <h1>Create a Brand</h1>
    <form method="POST" action="{{ route('brands.store') }}">
        @csrf

        <label for="name">Name</label>
        <input id="name" type="text" name="name" value="{{ old('name') }}" required autofocus>
        @if ($errors->has('name'))
            {{ $errors->first('name') }}
        @endif

        <label for="slogan">Slogan</label>
        <input id="slogan" type="text" name="slogan" value="{{ old('slogan') }}">
        @if ($errors->has('slogan'))
            {{ $errors->first('slogan') }}
        @endif
        
        <button type="submit">Create</button>
    </form>
@endsection