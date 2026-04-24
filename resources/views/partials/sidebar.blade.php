<nav class="sidebar fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform -translate-x-full lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-200 ease-in-out">
    <div class="flex items-center justify-between h-20 px-6 border-b bg-gradient-to-r from-orange-50 to-red-50">
        <a href="{{ route('dashboard') }}" class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
                <span class="text-white font-bold text-xl">H</span>
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Dashboard</span>
        </a>
        <button class="lg:hidden p-1 -mr-1 rounded-md text-gray-400 hover:text-gray-900 focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    </div>

    <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
        <div class="px-4 space-y-1">
            @if(Auth::user()->role === 'client')
                <!-- Client Menu -->
                <x-nav-link href="{{ route('dashboard') }}" :active="request()->routeIs('dashboard')">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    <span>Tableau de bord</span>
                </x-nav-link>

                <x-nav-link href="{{ route('dashboard.reservations') }}" :active="request()->routeIs('dashboard.reservations')">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span>Mes Réservations</span>
                </x-nav-link>

                <x-nav-link href="{{ route('dashboard.chambres') }}" :active="request()->routeIs('dashboard.chambres')">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <span>Chambres</span>
                </x-nav-link>

                <x-nav-link href="{{ route('dashboard.paiements') }}" :active="request()->routeIs('dashboard.paiements')">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                    <span>Paiements</span>
                </x-nav-link>

                <x-nav-link href="{{ route('dashboard.profil') }}" :active="request()->routeIs('dashboard.profil')">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span>Profil</span>
                </x-nav-link>

                <x-nav-link href="{{ route('dashboard.support') }}" :active="request()->routeIs('dashboard.support')">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 4.582 9 9z"></path>
                    </svg>
                    <span>Support</span>
                </x-nav-link>
            @else
                <!-- Admin Menu -->
                <x-nav-link href="{{ route('admin.dashboard') }}" :active="request()->routeIs('admin.dashboard')">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    <span>Tableau de bord</span>
                </x-nav-link>

                <x-nav-link href="{{ route('admin.reservations') }}" :active="request()->routeIs('admin.reservations')">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                    <span>Réservations</span>
                </x-nav-link>

                <x-nav-link href="{{ route('admin.chambres') }}" :active="request()->routeIs('admin.chambres')">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <span>Chambres</span>
                </x-nav-link>

                <x-nav-link href="{{ route('admin.users') }}" :active="request()->routeIs('admin.users')">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    <span>Utilisateurs</span>
                </x-nav-link>

                <x-nav-link href="{{ route('admin.paiements') }}" :active="request()->routeIs('admin.paiements')">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                    <span>Paiements</span>
                </x-nav-link>

                <x-nav-link href="{{ route('admin.services') }}" :active="request()->routeIs('admin.services')">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <span>Services</span>
                </x-nav-link>
@endif\n\n            {{-- Logout --}}\n            <div class="mt-8 px-4 pt-4 border-t border-gray-200">\n                <form method="POST" action="{{ route('logout') }}" class="inline">\n                    @csrf\n                    <button type="submit" class="w-full group flex items-center px-4 py-3 text-sm font-medium text-gray-600 border border-transparent rounded-xl hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-all duration-200">\n                        <svg class="w-5 h-5 mr-3 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>\n                        </svg>\n                        <span>Déconnexion</span>\n                    </button>\n                </form>\n            </div>\n        </div>\n    </div>\n</nav>

{{-- Nav Link Component --}}
@php
$navClasses = fn ($active = false) => ($active ? 'bg-orange-50 border-r-2 border-orange-500 text-orange-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900') . ' group flex items-center px-4 py-3 text-sm font-medium border-l-4 border-transparent';
@endphp

<a {{ $attributes->merge(['class' => $navClasses(request()->routeIs($active ?? ''))]) }}>
    {{ $slot }}
</a>
