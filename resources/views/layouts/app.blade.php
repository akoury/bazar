<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>@yield('title', 'Bazar')</title>

        <link rel="stylesheet" href="{{ mix('/css/app.css') }}" data-turbolinks-track="reload">
        <script src="{{ mix('/js/app.js') }}" data-turbolinks-track="reload" defer></script>
        @stack('scripts')
    </head>
    <body>
        <div id="app">
            @include('layouts.header')

            @yield('content')

            @include('layouts.footer')
        </div>
    </body>
</html>
