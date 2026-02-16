import React, { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, Star, Users, Bed, Wifi, Coffee, Tv, Wind, X, ChevronDown, Heart } from 'lucide-react';

export default function SearchResultsPage() {
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    rating: 0,
    amenities: [],
    roomType: 'all'
  });

  const [searchParams, setSearchParams] = useState({
    city: 'Cotonou',
    checkIn: '2024-03-15',
    checkOut: '2024-03-18',
    guests: 2
  });

  // Données de démonstration
  const rooms = [
    {
      id: 1,
      hotelName: "Hôtel Royal Palm",
      location: "Quartier des Affaires, Cotonou",
      rating: 4.8,
      reviews: 156,
      roomType: "Chambre Deluxe",
      price: 35000,
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      amenities: ["wifi", "ac", "tv", "breakfast"],
      beds: "1 lit King Size",
      capacity: 2,
      featured: true
    },
    {
      id: 2,
      hotelName: "Grand Hôtel du Bénin",
      location: "Centre-ville, Porto-Novo",
      rating: 4.6,
      reviews: 89,
      roomType: "Suite Exécutive",
      price: 28000,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      amenities: ["wifi", "ac", "tv", "breakfast", "pool"],
      beds: "1 lit Queen Size + 1 canapé-lit",
      capacity: 3,
      featured: false
    },
    {
      id: 3,
      hotelName: "Azalai Hôtel",
      location: "Bord de mer, Cotonou",
      rating: 4.9,
      reviews: 234,
      roomType: "Chambre Standard",
      price: 22000,
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
      amenities: ["wifi", "ac", "tv"],
      beds: "2 lits simples",
      capacity: 2,
      featured: false
    },
    {
      id: 4,
      hotelName: "Hôtel du Port",
      location: "Zone portuaire, Cotonou",
      rating: 4.5,
      reviews: 67,
      roomType: "Chambre Double",
      price: 18500,
      image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
      amenities: ["wifi", "tv", "breakfast"],
      beds: "1 lit Double",
      capacity: 2,
      featured: false
    },
    {
      id: 5,
      hotelName: "Résidence Bénin Marina",
      location: "Marina, Cotonou",
      rating: 4.7,
      reviews: 112,
      roomType: "Studio Premium",
      price: 42000,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
      amenities: ["wifi", "ac", "tv", "breakfast", "pool", "gym"],
      beds: "1 lit King Size",
      capacity: 2,
      featured: true
    },
    {
      id: 6,
      hotelName: "Hôtel Le Méridien",
      location: "Akpakpa, Cotonou",
      rating: 4.4,
      reviews: 95,
      roomType: "Chambre Familiale",
      price: 32000,
      image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80",
      amenities: ["wifi", "ac", "tv", "breakfast"],
      beds: "1 lit Queen + 2 lits simples",
      capacity: 4,
      featured: false
    }
  ];

  const amenityIcons = {
    wifi: { icon: Wifi, label: "Wi-Fi gratuit" },
    ac: { icon: Wind, label: "Climatisation" },
    tv: { icon: Tv, label: "TV écran plat" },
    breakfast: { icon: Coffee, label: "Petit-déjeuner inclus" },
    pool: { icon: null, label: "Piscine" },
    gym: { icon: null, label: "Salle de sport" }
  };

  const toggleAmenity = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                HotelBénin
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Accueil
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Nos Hôtels
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Contact
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Connexion
              </button>
              <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                Inscription
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Barre de recherche modifiable */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Ville</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" size={18} />
                <input
                  type="text"
                  value={searchParams.city}
                  onChange={(e) => setSearchParams({...searchParams, city: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Arrivée</label>
              <input
                type="date"
                value={searchParams.checkIn}
                onChange={(e) => setSearchParams({...searchParams, checkIn: e.target.value})}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Départ</label>
              <input
                type="date"
                value={searchParams.checkOut}
                onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Voyageurs</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" size={18} />
                <input
                  type="number"
                  min="1"
                  value={searchParams.guests}
                  onChange={(e) => setSearchParams({...searchParams, guests: e.target.value})}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2 mt-5">
              <Search size={20} />
              <span>Rechercher</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Chambres disponibles à <span className="text-orange-600">{searchParams.city}</span>
            </h1>
            <p className="text-gray-600">
              {rooms.length} chambres trouvées pour {searchParams.guests} {searchParams.guests > 1 ? 'personnes' : 'personne'}
            </p>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-orange-500 transition-colors"
          >
            <SlidersHorizontal size={20} />
            <span className="font-semibold">Filtres</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Panneau de filtres */}
          {showFilters && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Filtres</h2>
                  <button className="text-orange-600 text-sm font-semibold hover:text-red-600">
                    Réinitialiser
                  </button>
                </div>

                {/* Prix */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="font-semibold text-gray-800 mb-3">Prix par nuit</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Min: 0 FCFA</span>
                      <span className="text-gray-600">Max: 100,000 FCFA</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="5000"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                  </div>
                </div>

                {/* Note */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="font-semibold text-gray-800 mb-3">Note minimum</h3>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          checked={filters.rating === rating}
                          onChange={() => setFilters({...filters, rating})}
                          className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                        />
                        <div className="flex items-center">
                          <Star className="text-yellow-400 fill-yellow-400" size={16} />
                          <span className="ml-1 text-gray-700">{rating}+</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Type de chambre */}
                <div className="mb-6 pb-6 border-b">
                  <h3 className="font-semibold text-gray-800 mb-3">Type de chambre</h3>
                  <div className="space-y-2">
                    {['all', 'standard', 'deluxe', 'suite', 'familiale'].map((type) => (
                      <label key={type} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="roomType"
                          checked={filters.roomType === type}
                          onChange={() => setFilters({...filters, roomType: type})}
                          className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-gray-700 capitalize">{type === 'all' ? 'Tous' : type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Équipements */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Équipements</h3>
                  <div className="space-y-2">
                    {Object.entries(amenityIcons).map(([key, { label }]) => (
                      <label key={key} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(key)}
                          onChange={() => toggleAmenity(key)}
                          className="w-4 h-4 text-orange-500 focus:ring-orange-500 rounded"
                        />
                        <span className="text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Liste des résultats */}
          <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            <div className="space-y-6">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-1/3 relative">
                      <img
                        src={room.image}
                        alt={room.roomType}
                        className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {room.featured && (
                        <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          En vedette
                        </div>
                      )}
                      <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-orange-50 transition-colors">
                        <Heart size={20} className="text-orange-600" />
                      </button>
                    </div>

                    {/* Détails */}
                    <div className="md:w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors">
                              {room.hotelName}
                            </h3>
                            <div className="flex items-center text-gray-600 mb-2">
                              <MapPin size={16} className="mr-1" />
                              <span className="text-sm">{room.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center bg-orange-50 px-3 py-1 rounded-lg">
                            <Star className="text-orange-500 fill-orange-500 mr-1" size={18} />
                            <span className="font-bold text-orange-600">{room.rating}</span>
                            <span className="text-gray-600 text-sm ml-1">({room.reviews})</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                            {room.roomType}
                          </span>
                        </div>

                        <div className="flex items-center space-x-4 mb-4 text-gray-600">
                          <div className="flex items-center">
                            <Bed size={18} className="mr-2 text-orange-500" />
                            <span className="text-sm">{room.beds}</span>
                          </div>
                          <div className="flex items-center">
                            <Users size={18} className="mr-2 text-orange-500" />
                            <span className="text-sm">{room.capacity} {room.capacity > 1 ? 'personnes' : 'personne'}</span>
                          </div>
                        </div>

                        {/* Équipements */}
                        <div className="flex flex-wrap gap-3 mb-4">
                          {room.amenities.map((amenity) => {
                            const AmenityIcon = amenityIcons[amenity]?.icon;
                            return (
                              <div
                                key={amenity}
                                className="flex items-center bg-gray-50 px-3 py-1 rounded-lg text-sm text-gray-700"
                              >
                                {AmenityIcon && <AmenityIcon size={16} className="mr-1 text-orange-500" />}
                                <span>{amenityIcons[amenity]?.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">À partir de</div>
                          <div className="flex items-baseline">
                            <span className="text-3xl font-bold text-orange-600">
                              {room.price.toLocaleString()}
                            </span>
                            <span className="text-gray-600 ml-2">FCFA / nuit</span>
                          </div>
                        </div>
                        <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                          Réserver maintenant
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center space-x-2">
              <button className="px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-orange-500 transition-colors">
                Précédent
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold">
                1
              </button>
              <button className="px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-orange-500 transition-colors">
                2
              </button>
              <button className="px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-orange-500 transition-colors">
                3
              </button>
              <button className="px-4 py-2 rounded-lg border-2 border-gray-200 hover:border-orange-500 transition-colors">
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}