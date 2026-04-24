@extends('layouts.dashboard')

@section('title', 'Gestion des Paiements')
@section('subtitle', 'Suivez et gérez tous les paiements de l\'hôtel')

@section('content')
<div class="space-y-6">
    <!-- Header with Filters -->
    <div class="flex justify-between items-center">
        <div>
            <h2 class="text-2xl font-bold text-gray-900">Paiements</h2>
            <p class="text-gray-600 mt-1">Historique complet des transactions</p>
        </div>
        <div class="flex space-x-3">
            <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                <option>Tous les statuts</option>
                <option>Payé</option>
                <option>En attente</option>
                <option>Échec</option>
                <option>Annulé</option>
            </select>
            <button class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Exporter
            </button>
        </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div class="flex items-center">
                <div class="p-3 bg-green-100 rounded-lg">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Paiements réussis</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $paiements->where('statut', 'paye')->count() }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div class="flex items-center">
                <div class="p-3 bg-yellow-100 rounded-lg">
                    <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">En attente</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $paiements->where('statut', 'en_attente')->count() }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div class="flex items-center">
                <div class="p-3 bg-red-100 rounded-lg">
                    <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Échecs</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $paiements->where('statut', 'echec')->count() }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div class="flex items-center">
                <div class="p-3 bg-blue-100 rounded-lg">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                    </svg>
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-600">Total</p>
                    <p class="text-2xl font-bold text-gray-900">{{ number_format($paiements->where('statut', 'paye')->sum('montant'), 0, ',', ' ') }} FCFA</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Payments Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Historique des paiements</h3>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Réservation</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Méthode</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @forelse($paiements ?? [] as $paiement)
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{{ $paiement->id }}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ $paiement->reservation->user->name ?? 'N/A' }}</div>
                            <div class="text-sm text-gray-500">{{ $paiement->reservation->user->email ?? 'N/A' }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">{{ $paiement->reservation->chambre->nom ?? 'N/A' }}</div>
                            <div class="text-sm text-gray-500">Réservation #{{ $paiement->reservation->id }}</div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {{ number_format($paiement->montant, 0, ',', ' ') }} FCFA
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                {{ ucfirst($paiement->methode_paiement ?? 'Carte') }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            @switch($paiement->statut)
                                @case('paye')
                                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                        Payé
                                    </span>
                                    @break
                                @case('en_attente')
                                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                        En attente
                                    </span>
                                    @break
                                @case('echec')
                                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                        Échec
                                    </span>
                                    @break
                                @default
                                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                        {{ ucfirst($paiement->statut) }}
                                    </span>
                            @endswitch
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ $paiement->created_at->format('d/m/Y H:i') }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div class="flex space-x-2">
                                <button class="text-blue-600 hover:text-blue-900">Voir</button>
                                @if($paiement->statut === 'en_attente')
                                    <button class="text-green-600 hover:text-green-900">Confirmer</button>
                                @endif
                            </div>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="8" class="px-6 py-12 text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                            </svg>
                            <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun paiement</h3>
                            <p class="mt-1 text-sm text-gray-500">Les paiements apparaîtront ici une fois effectués.</p>
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        @if(isset($paiements) && $paiements->hasPages())
        <div class="px-6 py-4 border-t border-gray-200">
            {{ $paiements->links() }}
        </div>
        @endif
    </div>
</div>
@endsection