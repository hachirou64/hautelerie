@extends('layouts.dashboard')

@section('title', 'Gestion des Chambres')
@section('subtitle', 'Administrez l\'inventaire des chambres')

@section('content')
<div class="space-y-6">
    <!-- Header with Add Button -->
    <div class="flex justify-between items-center">
        <div>
            <h2 class="text-2xl font-bold text-gray-900">Chambres</h2>
            <p class="text-gray-600 mt-1">Gérez toutes les chambres de l'hôtel</p>
        </div>
        <button class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            + Ajouter une chambre
        </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-gray-600 text-sm">Total Chambres</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $chambres->total() }}</p>
                </div>
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-gray-600 text-sm">Disponibles</p>
                    <p class="text-2xl font-bold text-green-600">{{ $chambres->where('disponible', true)->count() }}</p>
                </div>
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-gray-600 text-sm">Occupées</p>
                    <p class="text-2xl font-bold text-orange-600">{{ $chambres->where('disponible', false)->count() }}</p>
                </div>
                <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <!-- Chambres Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @foreach($chambres as $chambre)
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div class="relative">
                <img src="{{ $chambre->image ?: '/images/placeholder-room.jpg' }}" alt="{{ $chambre->nom }}" class="w-full h-48 object-cover">
                <div class="absolute top-4 right-4">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full
                        {{ $chambre->disponible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                        {{ $chambre->disponible ? 'Disponible' : 'Occupée' }}
                    </span>
                </div>
            </div>

            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-semibold text-gray-900">{{ $chambre->nom }}</h3>
                    <span class="text-sm text-gray-500">{{ $chambre->type }}</span>
                </div>

                <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ $chambre->description }}</p>

                <div class="flex justify-between items-center mb-4">
                    <div class="text-2xl font-bold text-orange-600">{{ number_format($chambre->prix, 0, ',', ' ') }} FCFA</div>
                    <div class="text-sm text-gray-500">/nuit</div>
                </div>

                <div class="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <span>{{ $chambre->capacite }} personne{{ $chambre->capacite > 1 ? 's' : '' }}</span>
                    <span>{{ $chambre->localisation }}</span>
                </div>

                <div class="flex space-x-2">
                    <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                        Modifier
                    </button>
                    <button class="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                        Voir détails
                    </button>
                </div>
            </div>
        </div>
        @endforeach
    </div>

    <!-- Pagination -->
    @if($chambres->hasPages())
    <div class="flex justify-center">
        {{ $chambres->links() }}
    </div>
    @endif
</div>
@endsection