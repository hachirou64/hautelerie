import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Search, Calendar, Users, MapPin, Star, ChevronRight, Filter, BedDouble, Loader2 } from 'lucide-react';
import type { Chambre } from '@/types';

export default function PublicChambresPage() {
  const [chambres, setChambres] = useState<Chambre[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVille, setFilterVille] = useState('all');
  const [filterType, setFilterType] = useState('all');
  
  const [villes, setVilles] = useState<string[]>([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const initialSearch = searchParams.get('search') || '';
    const initialVille = searchParams.get('ville') || 'all';

    if (initialSearch) {
      setSearchTerm(initialSearch);
    }
    if (initialVille !== 'all') {
      setFilterVille(initialVille);
    }
  }, []);

  useEffect(() => {
    const fetchChambres = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (filterVille !== 'all') params.append('ville', filterVille);
        if (filterType !== 'all') params.append('type', filterType);
        
        const response = await fetch(`/api/chambres?${params}`);
        const data = await response.json();
        
        if (data.success) {
          setChambres(data.data.data || data.data || []);
        }

        // Fetch villes
        const villesRes = await fetch('/api/chambres/villes/list');
        const villesData = await villesRes.json();
        if (villesData.success) {
          setVilles(villesData.data);
        }
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChambres();
  }, [searchTerm, filterVille, filterType]);

  const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR').format(price);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-24 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-orange-600" />
      </div>
    );
  }

  const filteredChambres = chambres.filter(chambre => 
    chambre.disponible &&
    (!searchTerm || chambre.nom.toLowerCase().includes(searchTerm.toLowerCase()) || chambre.localisation.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const featuredChambres = chambres.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Head title="Nos Chambres - HotelBénin" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
            Toutes nos Chambres
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection complète de chambres disponibles. Réservez sans inscription dès maintenant.
          </p>
        </div>

        {featuredChambres.length > 0 && (
          <div className="mb-12 grid gap-6 lg:grid-cols-3">
            {featuredChambres.map((chambre) => (
              <Link 
                key={chambre.id}
                href={`/chambres/${chambre.id}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={chambre.image}
                    alt={chambre.nom}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-6 top-6 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-orange-500/90 px-4 py-2 text-white text-sm font-semibold">
                      {chambre.type}
                    </span>
                    {chambre.disponible && (
                      <span className="rounded-full bg-emerald-500 px-3 py-1.5 text-white text-xs font-bold">
                        Disponible
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{chambre.nom}</h3>
                  <p className="text-sm text-gray-500 mb-4">{chambre.localisation}, {chambre.ville}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {chambre.equipements.slice(0, 2).map((equip, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 rounded-full px-3 py-2 text-gray-700">
                        {equip}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-600">{formatPrice(chambre.prix)} FCFA</span>
                    <ChevronRight className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-12 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="flex flex-col lg:flex-row gap-6 items-end">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par nom, localisation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl text-lg focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white shadow-sm transition-all"
              />
            </div>
            
            <div className="flex gap-4 flex-1 max-w-2xl">
              <select
                value={filterVille}
                onChange={(e) => setFilterVille(e.target.value)}
                className="flex-1 px-4 py-4 border border-gray-200 rounded-2xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white shadow-sm transition-all"
              >
                <option value="all">Toutes les villes</option>
                {villes.map((ville, idx) => (
                  <option key={idx} value={ville}>{ville}</option>
                ))}
              </select>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="flex-1 px-4 py-4 border border-gray-200 rounded-2xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 bg-white shadow-sm transition-all"
              >
                <option value="all">Tous types</option>
                <option value="Standard">Standard</option>
                <option value="Suite">Suite</option>
                <option value="VIP">VIP</option>
                <option value="Familiale">Familiale</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
            <span>{filteredChambres.length} chambre{filteredChambres.length !== 1 ? 's' : ''} disponible{filteredChambres.length !== 1 ? 's' : ''}</span>
            <button className="text-orange-600 hover:text-orange-700 font-medium flex items-center space-x-2">
              <Filter size={16} />
              <span>Plus de filtres</span>
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredChambres.map((chambre) => (
            <Link 
              key={chambre.id} 
              href={`/chambres/${chambre.id}`}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:border-orange-200 border-2 border-transparent"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={chambre.image} 
                  alt={chambre.nom}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur px-4 py-2 rounded-2xl shadow-lg flex items-center space-x-2">
                  <Star className="text-yellow-500 fill-yellow-500 w-4 h-4" />
                  <span className="font-bold text-sm text-gray-900">{chambre.note.toFixed(1)}</span>
                  <span className="text-gray-600 text-xs">({chambre.avis_count})</span>
                </div>
                {chambre.disponible && (
                  <div className="absolute top-6 right-6 bg-emerald-500 text-white px-4 py-2 rounded-2xl font-bold shadow-lg">
                    Disponible maintenant
                  </div>
                )}
              </div>
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                    {chambre.nom}
                  </h3>
                  <div className="ml-4 flex-shrink-0">
                    <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-xl text-sm font-bold">
                      {chambre.type}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="w-5 h-5 mr-2 text-orange-500 flex-shrink-0" />
                  <span className="text-lg">{chambre.localisation}, {chambre.ville}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {chambre.equipements.slice(0, 5).map((equip, idx) => (
                    <span key={idx} className="bg-gray-100 hover:bg-orange-100 text-gray-700 px-3 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors flex items-center space-x-1">
                      <div className="w-3 h-3 bg-current rounded-full" />
                      <span>{equip}</span>
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="space-y-1">
                    <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      {formatPrice(chambre.prix)}
                    </span>
                    <span className="text-gray-500 text-lg">par nuit</span>
                  </div>
                  <Link 
                    href={`/chambres/${chambre.id}`}
                    className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center space-x-3 group-hover:translate-x-2"
                  >
                    <span>Réserver</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredChambres.length === 0 && (
          <div className="col-span-full text-center py-24">
            <BedDouble className="mx-auto h-24 w-24 text-gray-400 mb-8 opacity-50" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Aucune chambre ne correspond</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Essayez d'ajuster vos critères de recherche ou découvrez nos chambres vedette sur la page d'accueil.
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              <span>← Page d'accueil</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
