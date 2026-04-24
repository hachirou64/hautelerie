@extends('layouts.dashboard')
@section('title', 'Tableau de bord')
@section('header', 'Tableau de bord')

@section('content')
<div class="max-w-7xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Stats Cards -->
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex items-center">
                <div class="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Réservations actives</p>
                    <p class="text-3xl font-bold text-gray-900">{{ $stats['reservations_count'] ?? 0 }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex items-center">
                <div class="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12"></path>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Total dépensé</p>
                    <p class="text-3xl font-bold text-gray-900">0 FCFA</p>
                </div>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex items-center">
                <div class="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"></path>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Chambres consultées</p>
                    <p class="text-3xl font-bold text-gray-900">{{ $stats['favorite_chambres']->count() ?? 0 }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div class="flex items-center">
                <div class="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z"></path>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Note moyenne</p>
                    <p class="text-3xl font-bold text-gray-900">4.8 / 5</p>
                </div>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Quick Actions -->
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Actions rapides</h3>
            <div class="grid grid-cols-2 gap-4">
                <a href="{{ route('dashboard.reservations') }}" class="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all border border-blue-100 hover:-translate-y-1">
                    <svg class="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <h4 class="text-lg font-semibold text-gray-900 mb-1">Mes Réservations</h4>
                    <p class="text-blue-700 text-sm">Gérer vos séjours en cours</p>
                </a>

                <a href="{{ route('dashboard.chambres') }}" class="group p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl hover:shadow-lg transition-all border border-emerald-100 hover:-translate-y-1">
                    <svg class="w-12 h-12 text-emerald-600 mx-auto mb-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <h4 class="text-lg font-semibold text-gray-900 mb-1">Découvrir Chambres</h4>
                    <p class="text-emerald-700 text-sm">Réserver votre prochaine chambre</p>
                </a>
            </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 class="text-xl font-bold text-gray-900 mb-6">Activité récente</h3>
            <div class="space-y-4">
                <div class="flex items-center p-4 bg-gray-50 rounded-xl">
                    <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm mr-4">
                        CH
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="font-semibold text-gray-900 truncate">Chambre Deluxe consultée</p>
                        <p class="text-sm text-gray-500">Il y a 2 heures</p>
                    </div>
                    <span class="text-sm font-medium text-emerald-600">✓ Confirmée</span>
                </div>

                <div class="flex items-center p-4 bg-gray-50 rounded-xl">
                    <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm mr-4">
                        € 45k
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="font-semibold text-gray-900 truncate">Paiement reçu</p>
                        <p class="text-sm text-gray-500">Il y a 1 jour</p>
                    </div>
                    <span class="text-sm font-medium text-emerald-600">✓ Payé</span>
                </div>

                <div class="flex items-center p-4 bg-gray-50 rounded-xl">
                    <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm mr-4">
                        PRO
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="font-semibold text-gray-900 truncate">Profil mis à jour</p>
                        <p class="text-sm text-gray-500">Il y a 3 jours</p>
                    </div>
                    <span class="text-sm font-medium text-blue-600">Info</span>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-12 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <h3 class="text-xl font-bold text-gray-900 mb-6">Chambres recommandées</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @foreach($stats['favorite_chambres'] ?? [] as $chambre)
            <div class="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2">
                <div class="h-48 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-orange-50 group-hover:to-red-50 transition-all">
                    <img src="{{ $chambre->image ?? 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400' }}" alt="{{ $chambre->nom }}" class="w-full h-full object-cover">
                </div>
                <div class="p-6">
                    <h4 class="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{{ $chambre->nom }}</h4>
                    <div class="flex items-center text-yellow-400 mb-3">
                        @for($i = 1; $i <= 5; $i++)
                            <svg class="w-5 h-5 {{ $i <= $chambre->note ? 'fill-current text-yellow-400' : 'text-gray-300' }}" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                            </svg>
                        @endfor
                        <span class="ml-2 text-sm text-gray-500">({{ $chambre->avis_count ?? 0 }})</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-2xl font-bold text-orange-600">{{ number_format($chambre->prix, 0, ',', ' ') }} FCFA</span>
                        <a href="#" class="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">Réserver</a>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</div>
@endsection
