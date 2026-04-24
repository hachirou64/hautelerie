@extends('layouts.dashboard')
@section('title', 'Chambres')
@section('header', 'Chambres Disponibles')

@section('content')
<div class="max-w-7xl mx-auto">
    <!-- Header with search -->
    <div class="mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
                <h2 class="text-3xl font-bold text-gray-900">Chambres disponibles</h2>
                <p class="text-gray-600 mt-1">Trouvez la chambre parfaite pour votre prochain séjour</p>
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
                <div class="relative">
                    <select class="w-full sm:w-48 border border-gray-300 rounded-xl px-4 py-2 pr-10 focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white">
                        <option>Toutes les chambres</option>
                        <option>Standard</option>
                        <option>Deluxe</option>
                        <option>Suite</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                    </div>
                </div>
                <button class="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all whitespace-nowrap">
                    Filtres avancés
                </button>
            </div>
        </div>
    </div>

    <!-- Chambres Grid -->
    @if($chambres->count() > 0)
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            @foreach($chambres as $chambre)
                <div class="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer">
                    <!-- Image -->
                    <div class="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-orange-50 group-hover:to-red-50 transition-all">
                        <img src="{{ $chambre->image ?? 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500' }}" 
                             alt="{{ $chambre->nom }}" 
                             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        
                        <!-- Badges -->
                        @if($chambre->disponible)
                            <div class="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                Disponible
                            </div>
                        @endif
                        
                        @if($chambre->en_vedette)
                            <div class="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                ★ En vedette
                            </div>
                        @endif
                    </div>

                    <!-- Content -->
                    <div class="p-6">
                        <div class="flex items-center mb-3">
                            @php $stars = floor($chambre->note ?? 4.5); @endphp
                            @for($i = 1; $i <= 5; $i++)
                                <svg class="w-5 h-5 {{ $i <= $stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300' }}" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                                </svg>
                            @endfor
                            <span class="ml-2 text-sm text-gray-500 font-medium">({{ $chambre->avis_count ?? 23 }})</span>
                        </div>

                        <h3 class="font-bold text-xl text-gray-900 mb-3 line-clamp-1 group-hover:text-orange-600 transition-colors">{{ $chambre->nom }}</h3>
                        
                        <div class="flex items-center text-sm text-gray-600 mb-4">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            {{ $chambre->localisation }}, {{ $chambre->ville }}
                        </div>

                        <div class="mb-4">
                            @foreach(array_slice(explode(',', $chambre->equipements ?? ''), 0, 3) as $equip)
                                <span class="inline-block bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full mr-1 mb-1">
                                    {{ trim($equip) }}
                                </span>
                            @endforeach
                            @if(count(explode(',', $chambre->equipements ?? '')) > 3)
                                <span class="inline-block bg-gray-100 text-gray-500 text-xs px-2.5 py-1 rounded-full">+{{ count(explode(',', $chambre->equipements ?? '')) - 3 }}</span>
                            @endif
                        </div>

                        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div>
                                <span class="text-2xl font-bold text-orange-600 block">{{ number_format($chambre->prix, 0, ',', ' ') }} FCFA</span>
                                <span class="text-sm text-gray-500">/ nuit</span>
                            </div>
                            <a href="#" class="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 9m1.5-9l-1.5 9a2 2 0 002 2h9.5a2 2 0 002-2l-1.5-9"></path>
                                </svg>
                                <span>Réserver</span>
                            </a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        <div class="mt-12">
            {{ $chambres->appends(request()->query())->links() }}
        </div>
    @else
        <div class="text-center py-24">
            <svg class="mx-auto h-24 w-24 text-gray-400 mb-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
            </svg>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Aucune chambre disponible</h3>
            <p class="text-gray-500 mb-8 max-w-md mx-auto">Revenez bientôt pour découvrir nos nouvelles offres de chambres.</p>
        </div>
    @endif
</div>
@endsection
