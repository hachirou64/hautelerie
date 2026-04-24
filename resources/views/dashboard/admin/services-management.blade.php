@extends('layouts.dashboard')

@section('title', 'Gestion des Services')
@section('subtitle', 'Administrez les services de l\'hôtel')

@section('content')
<div class="space-y-6">
    <!-- Header with Add Button -->
    <div class="flex justify-between items-center">
        <div>
            <h2 class="text-2xl font-bold text-gray-900">Services</h2>
            <p class="text-gray-600 mt-1">Gérez tous les services proposés par l'hôtel</p>
        </div>
        <button class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            + Ajouter un service
        </button>
    </div>

    <!-- Services Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @forelse($services ?? [] as $service)
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                    <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                    </div>
                    <div class="flex space-x-2">
                        <button class="text-blue-600 hover:text-blue-900 p-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                        </button>
                        <button class="text-red-600 hover:text-red-900 p-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ $service->nom }}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ $service->description }}</p>

                <div class="flex items-center justify-between">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Actif
                    </span>
                    <span class="text-sm text-gray-500">Icône: {{ $service->icon }}</span>
                </div>
            </div>
        </div>
        @empty
        <div class="col-span-full">
            <div class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun service</h3>
                <p class="mt-1 text-sm text-gray-500">Commencez par ajouter votre premier service.</p>
                <div class="mt-6">
                    <button class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700">
                        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                        Ajouter un service
                    </button>
                </div>
            </div>
        </div>
        @endforelse
    </div>

    <!-- Stats Section -->
    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Statistiques des Services</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
                <div class="text-2xl font-bold text-blue-600">{{ $services->count() ?? 0 }}</div>
                <div class="text-sm text-gray-600">Services actifs</div>
            </div>
            <div class="text-center">
                <div class="text-2xl font-bold text-green-600">{{ $services->where('created_at', '>=', now()->startOfMonth())->count() ?? 0 }}</div>
                <div class="text-sm text-gray-600">Ajoutés ce mois</div>
            </div>
            <div class="text-center">
                <div class="text-2xl font-bold text-purple-600">{{ $services->where('updated_at', '>=', now()->startOfWeek())->count() ?? 0 }}</div>
                <div class="text-sm text-gray-600">Modifiés cette semaine</div>
            </div>
        </div>
    </div>
</div>
@endsection