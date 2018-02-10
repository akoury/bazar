@extends('layouts.app')

@section('title', 'Reset Password')

@section('content')
    <form method="POST" action="{{ route('password.request') }}">
        {{ csrf_field() }}
        <input type="hidden" name="token" value="{{ $token }}">

        <label for="email">Email</label>
        <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus>
        @if ($errors->has('email'))
            {{ $errors->first('email') }}
        @endif
        
        <label for="password">New Password</label>
        <input id="password" type="password" name="password" required>
        @if ($errors->has('password'))
            {{ $errors->first('password') }}
        @endif

        <label for="password-confirm">Confirm Password</label>
        <input id="password-confirm" type="password" name="password_confirmation" required>
        @if ($errors->has('password_confirmation'))
            {{ $errors->first('password_confirmation') }}
        @endif

        <button type="submit">Reset Password</button>
    </form>
@endsection
