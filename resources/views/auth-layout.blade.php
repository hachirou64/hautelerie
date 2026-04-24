<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'HotelBénin')</title>
    
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    
    @stack('styles')
</head>
<body class="min-h-screen">
    @yield('content')
</body>
</html>

