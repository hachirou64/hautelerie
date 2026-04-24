@extends('layouts.dashboard')

@section('title', 'Admin Dashboard')

@section('content')
<div class="p-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-blue-100 text-sm opacity-90">Utilisateurs</p>
                    <p class="text-3xl font-bold">{{ $stats['total_users'] }}</p>
                </div>
                <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>

        <div class="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-emerald-100 text-sm opacity-90">Réservations</p>
                    <p class="text-3xl font-bold">{{ $stats['total_reservations'] }}</p>
                </div>
                <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>

        <div class="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-orange-100 text-sm opacity-90">Chambres</p>
                    <p class="text-3xl font-bold">{{ $stats['total_chambres'] }}</p>
                </div>
                <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V9h5.771l.137.21a2.5 2.5 0 11-.448.553l.004-.004zM15 12a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>

        <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-purple-100 text-sm opacity-90">En attente</p>
                    <p class="text-3xl font-bold">{{ $stats['pending_reservations'] }}</p>
                </div>
                <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Recent reservations -->
        <div class="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <h3 class="text-xl font-bold mb-6">Réservations récentes</h3>
class="space-y-4">
                @forelse($recentReservations ?? [] as $reservation)
                    <div class="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all">
                        <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                            {{ substr($reservation->nom_client, 0, 1) }}
                        </div>
                        <div class="ml-4 flex-1 min-w-0">
                            <p class="font-semibold text-gray-900 truncate">{{ $reservation->nom_client }} {{ $reservation->prenom_client }}</p>
                            <p class="text-sm text-gray-600 truncate">{{ $reservation->chambre->nom }}</p>
                        </div>
                        <div class="text-right">
                            <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold
                                {{ $reservation->statut === 'en_attente' ? 'bg-yellow-100 text-yellow-800' : ($reservation->statut === 'confirmee' ? 'bg-green-100 text-green-800' : ($reservation->statut === 'annulee' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800')) }}
                                {{ ucfirst(str_replace('_', ' ', $reservation->statut)) }}
                            </span>
                        </div>
                    </div>
                @empty
                    <div class="text-center py-8 text-gray-500">
                        Aucune réservation récente
                    </div>
                @endforelse
            </div>
        </div>

        <!-- Revenue chart placeholder -->
        <div class="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <h3 class="text-xl font-bold mb-6">Revenus ce mois</h3>
            <div class="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center text-gray-500">
                Graphique revenus (à implémenter)
            </div>
            <div class="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div class="text-center p-3 bg-emerald-50 rounded-xl">
                    <div class="text-2xl font-bold text-emerald-600">{{ number_format($stats['total_paiements'], 0, ',', ' ') }} FCFA</div>
                    <div>Total paiements</div>
                </div>
                <div class="text-center p-3 bg-blue-50 rounded-xl">
                    <div class="text-2xl font-bold text-blue-600">{{ $stats['total_paiements'] / 30 }}</div>
                    <div>Moyenne/jour</div>
                </div>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
        <div class="bg-white rounded-3xl shadow-lg p-8 xl:col-span-2">
            <h3 class="text-xl font-bold mb-6">Activité récente</h3>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Client</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Chambre</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Dates</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Montant</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Statut</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        @forelse($recentActivity ?? [] as $activity)
                            <tr class="hover:bg-gray-50 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                            {{ substr($activity->nom_client, 0, 1) }}
                                        </div>
                                        <div class="ml-3">
                                            <div class="text-sm font-semibold text-gray-900">{{ $activity->nom_client }} {{ $activity->prenom_client }}</div>
                                            <div class="text-xs text-gray-500">{{ $activity->email_client }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {{ $activity->chambre->nom }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {{ \Carbon\Carbon::parse($activity->date_arrivee)->format('d/m') }} - {{ \Carbon\Carbon::parse($activity->date_depart)->format('d/m') }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                    {{ number_format($activity->montant_total, 0, ',', ' ') }} FCFA
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="inline-flex px-3 py-1 rounded-full text-xs font-semibold
                                        {{ $activity->statut === 'en_attente' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' : ($activity->statut === 'confirmee' ? 'bg-green-100 text-green-800 border border-green-200' : ($activity->statut === 'annulee' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-blue-100 text-blue-800 border border-blue-200')) }}
                                        {{ ucfirst(str_replace('_', ' ', $activity->statut)) }}
                                    </span>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                                    Aucune activité récente
                                </td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

        <div class="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-3xl p-8 shadow-2xl">
            <h4 class="text-2xl font-bold mb-6">Actions rapides</h4>
            <div class="space-y-4">
                <a href="{{ route('admin.reservations') }}" class="block p-4 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-all">
                    <div class="flex items-center justify-between">
                        <span class="font-semibold">Gérer réservations</span>
                        <ChevronRight className="w-5 h-5" />
                    </div>
                </a>
                <a href="{{ route('admin.chambres') }}" class="block p-4 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-all">
                    <div class="flex items-center justify-between">
                        <span class="font-semibold">Gérer chambres</span>
                        <ChevronRight className="w-5 h-5" />
                    </div>
                </a>
                <a href="{{ route('admin.paiements') }}" class="block p-4 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-all">
                    <div class="flex items-center justify-between">
                        <span class="font-semibold">Paiements</span>
                        <ChevronRight className="w-5 h-5" />
                    </div>
                </a>
                <a href="{{ route('admin.users') }}" class="block p-4 bg-white/20 backdrop-blur-sm rounded-2xl hover:bg-white/30 transition-all">
                    <div class="flex items-center justify-between">
                        <span class="font-semibold">Utilisateurs</span>
                        <ChevronRight className="w-5 h-5" />
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>
@endsection

