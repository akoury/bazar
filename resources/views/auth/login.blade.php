@extends('layouts.app')

@section('title', 'Login')

@section('content')
    <form method="POST" action="{{ route('login') }}">
        {{ csrf_field() }}

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

        <label>
            <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> Remember Me
        </label>
        
        <button type="submit">Login</button>
        <a href="{{ route('password.request') }}">Forgot Your Password?</a>
    </form>
@endsection
