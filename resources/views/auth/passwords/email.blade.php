@extends('layouts.app')

@section('title', 'Forgot Password')

@section('content')
    @if (session('status'))
        <div class="alert alert-success">
            {{ session('status') }}
        </div>
    @endif
    <form method="POST" action="{{ route('password.email') }}">
        @csrf

        <label for="email">Email</label>
        <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus>
        @if ($errors->has('email'))
            {{ $errors->first('email') }}
        @endif
        
        <button type="submit">Send Password Reset Link</button>
    </form>
@endsection
