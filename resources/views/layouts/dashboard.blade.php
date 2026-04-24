<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Dashboard') - HotelBénin</title>

    @vite(['resources/css/app.css', 'resources/js/app.tsx'])

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        body {
            font-family: 'Inter', sans-serif;
            background: #f8fafc;
        }

        .sidebar {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
        }

        .nav-link {
            transition: all 0.3s ease;
        }

        .nav-link:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateX(5px);
        }

        .nav-link.active {
            background: rgba(249, 115, 22, 0.2);
            border-right: 3px solid #f97316;
        }

        .gradient-bg {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
    </style>
</head>
<body class="gradient-bg">
    <div class="min-h-screen flex">
        <!-- Sidebar -->
        <aside class="sidebar w-64 min-h-screen text-white">
            <div class="p-6">
                <div class="flex items-center space-x-3 mb-8">
                    <div class="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                        <span class="text-white font-bold text-lg">H</span>
                    </div>
                    <span class="text-xl font-bold">HotelBénin</span>
                </div>

                <nav class="space-y-2">
                    @if(auth()->user()->role === 'admin')
                        <!-- Admin Navigation -->
                        <a href="{{ route('admin.dashboard') }}" class="nav-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }} flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"/>
                            </svg>
                            <span>Dashboard</span>
                        </a>

                        <a href="{{ route('admin.reservations') }}" class="nav-link {{ request()->routeIs('admin.reservations') ? 'active' : '' }} flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11M9 11h6"/>
                            </svg>
                            <span>Réservations</span>
                        </a>

                        <a href="{{ route('admin.chambres') }}" class="nav-link {{ request()->routeIs('admin.chambres') ? 'active' : '' }} flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                            </svg>
                            <span>Chambres</span>
                        </a>

                        <a href="{{ route('admin.users') }}" class="nav-link {{ request()->routeIs('admin.users') ? 'active' : '' }} flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                            </svg>
                            <span>Utilisateurs</span>
                        </a>

                        <a href="{{ route('admin.services') }}" class="nav-link {{ request()->routeIs('admin.services') ? 'active' : '' }} flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            <span>Services</span>
                        </a>
                    @else
                        <!-- Client Navigation -->
                        <a href="{{ route('dashboard.index') }}" class="nav-link {{ request()->routeIs('dashboard.index') ? 'active' : '' }} flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"/>
                            </svg>
                            <span>Dashboard</span>
                        </a>

                        <a href="{{ route('dashboard.reservations') }}" class="nav-link {{ request()->routeIs('dashboard.reservations') ? 'active' : '' }} flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11M9 11h6"/>
                            </svg>
                            <span>Mes Réservations</span>
                        </a>

                        <a href="{{ route('dashboard.chambres') }}" class="nav-link {{ request()->routeIs('dashboard.chambres') ? 'active' : '' }} flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                            </svg>
                            <span>Chambres</span>
                        </a>

                        <a href="{{ route('dashboard.paiements') }}" class="nav-link {{ request()->routeIs('dashboard.paiements') ? 'active' : '' }} flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                            </svg>
                            <span>Paiements</span>
                        </a>

                        <a href="{{ route('dashboard.profil') }}" class="nav-link {{ request()->routeIs('dashboard.profil') ? 'active' : '' }} flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                            <span>Profil</span>
                        </a>
                    @endif
                </nav>
            </div>

            <!-- User Info & Logout -->
            <div class="absolute bottom-0 left-0 right-0 p-6">
                <div class="bg-white/10 rounded-xl p-4 mb-4">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                            <span class="text-white font-bold">{{ strtoupper(substr(auth()->user()->name, 0, 1)) }}</span>
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-white font-medium text-sm truncate">{{ auth()->user()->name }}</p>
                            <p class="text-white/70 text-xs">{{ auth()->user()->role === 'admin' ? 'Administrateur' : 'Client' }}</p>
                        </div>
                    </div>
                </div>

                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <button type="submit" class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        <span>Déconnexion</span>
                    </button>
                </form>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1">
            <!-- Header -->
            <header class="bg-white shadow-sm border-b border-gray-200">
                <div class="px-8 py-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">@yield('title', 'Dashboard')</h1>
                            <p class="text-gray-600 mt-1">@yield('subtitle', 'Bienvenue sur votre tableau de bord')</p>
                        </div>

                        <div class="flex items-center space-x-4">
                            <a href="/" class="text-gray-600 hover:text-orange-600 transition-colors">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Page Content -->
            <div class="p-8">
                @yield('content')
            </div>
        </main>
    </div>
</body>
</html>