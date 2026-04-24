@extends('layouts.dashboard')
@section('title', 'Mes Réservations')
@section('header', 'Mes Réservations')

@section('content')
<div class="max-w-7xl mx-auto">
    <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
                <h2 class="text-3xl font-bold text-gray-900">Mes Réservations</h2>
                <p class="text-gray-600 mt-1">Gérez vos séjours en cours et à venir</p>
            </div>
            <div class="mt-4 md:mt-0 md:ml-4">
                <select class="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option>Toutes</option>
                    <option>En attente</option>
                    <option>Confirmée</option>
                    <option>Terminée</option>
                    <option>Annulée</option>
                </select>
            </div>
        </div>
    </div>

    @if($reservations->count() > 0)
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Hôtel/Chambre</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Dates</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Statut</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Prix</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        @foreach($reservations as $reservation)
                            <tr class="hover:bg-gray-50 transition-colors">
                                <td class="px-6 py-6 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mr-4">
                                            <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <div class="font-semibold text-gray-900">{{ $reservation->chambre->nom ?? 'Chambre' }}</div>
                                            <div class="text-sm text-gray-500">{{ $reservation->chambre->localisation ?? '' }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-6 whitespace-nowrap text-sm font-medium">
                                    <div>{{ \Carbon\Carbon::parse($reservation->date_arrivee)->format('d/m/Y') }}</div>
                                    <div class="text-gray-500">→ {{ \Carbon\Carbon::parse($reservation->date_depart)->format('d/m/Y') }}</div>
                                </td>
                                <td class="px-6 py-6 whitespace-nowrap">
                                    <span class="inline-flex px-3 py-1 rounded-full text-xs font-semibold
                                        @if($reservation->statut === 'confirmée') bg-emerald-100 text-emerald-800
                                        @elseif($reservation->statut === 'en_attente') bg-amber-100 text-amber-800
                                        @elseif($reservation->statut === 'annulée') bg-red-100 text-red-800
                                        @else bg-gray-100 text-gray-800 @endif">
                                        {{ ucfirst($reservation->statut) }}
                                    </span>
                                </td>
                                <td class="px-6 py-6 whitespace-nowrap text-sm font-bold text-gray-900">
                                    {{ number_format($reservation->total ?? 0, 0, ',', ' ') }} FCFA
                                </td>
                                <td class="px-6 py-6 whitespace-nowrap text-sm font-medium">
                                    <div class="flex space-x-2">
                                        <a href="#" class="text-orange-600 hover:text-orange-900 p-2 -m-2 rounded-lg hover:bg-orange-50 transition-colors">Détails</a>
                                        @if($reservation->statut !== 'annulée')
                                            <a href="#" class="text-emerald-600 hover:text-emerald-900 p-2 -m-2 rounded-lg hover:bg-emerald-50 transition-colors">Facture</a>
                                        @endif
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            
            <div class="px-6 py-4 bg-gray-50 border-t">
                {{ $reservations->appends(request()->query())->links() }}
            </div>
        </div>
    @else
        <div class="text-center py-20">
            <svg class="mx-auto h-24 w-24 text-gray-400 mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Aucune réservation</h3>
            <p class="text-gray-500 mb-8 max-w-md mx-auto">Commencez par réserver votre première chambre pour voir vos séjours ici.</p>
            <a href="{{ route('dashboard.chambres') }}" class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Découvrir les chambres
            </a>
        </div>
    @endif
</div>
@endsection
