@extends('layouts.app')

@section('title', 'Register a new account')

@section('content')
    <form method="POST" action="{{ route('register') }}">
        @csrf

        <label for="email">Email</label>
        <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus>
        @if ($errors->has('email'))
            {{ $errors->first('email') }}
        @endif
        
        <label for="password">Password</label>
        <input id="password" type="password" name="password" required>
        @if ($errors->has('password'))
            {{ $errors->first('password') }}
        @endif
        
        <button type="submit">Register</button>
    </form>
@endsection
