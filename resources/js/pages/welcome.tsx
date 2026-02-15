import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin, Star, Clock, Shield, Award, ChevronRight } from 'lucide-react';

export default function HomePage() {
  const [searchData, setSearchData] = useState({
    city: '',
    checkIn: '',
    checkOut: '',
    guests: '2'
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Recherche:', searchData);
    // Logique de recherche à implémenter
  };

  const featuredHotels = [
    {
      id: 1,
      name: "Hôtel Royal Palm",
      location: "Cotonou",
      rating: 4.8,
      price: "25,000",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
    },
    {
      id: 2,
      name: "Grand Hôtel du Bénin",
      location: "Porto-Novo",
      rating: 4.6,
      price: "18,500",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80"
    },
    {
      id: 3,
      name: "Azalai Hôtel",
      location: "Cotonou",
      rating: 4.9,
      price: "32,000",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
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
                À Propos
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Contact
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-orange-600 font-medium transition-colors">
                Connexion
              </button>
              <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all transform hover:scale-105">
                Inscription
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section avec Recherche */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-red-600/10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent">
                Réservez votre séjour
              </span>
              <br />
              <span className="text-gray-800">
                au Bénin en toute simplicité
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les meilleurs hôtels du Bénin et réservez en ligne de manière sécurisée
            </p>
          </div>

          {/* Formulaire de Recherche */}
          <div className="max-w-5xl mx-auto">
            <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {/* Ville */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ville
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" size={20} />
                    <select
                      value={searchData.city}
                      onChange={(e) => setSearchData({...searchData, city: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    >
                      <option value="">Choisir une ville</option>
                      <option value="cotonou">Cotonou</option>
                      <option value="porto-novo">Porto-Novo</option>
                      <option value="parakou">Parakou</option>
                      <option value="abomey-calavi">Abomey-Calavi</option>
                      <option value="ouidah">Ouidah</option>
                    </select>
                  </div>
                </div>

                {/* Date d'arrivée */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Arrivée
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" size={20} />
                    <input
                      type="date"
                      value={searchData.checkIn}
                      onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Date de départ */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Départ
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" size={20} />
                    <input
                      type="date"
                      value={searchData.checkOut}
                      onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Nombre de personnes */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Voyageurs
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" size={20} />
                    <select
                      value={searchData.guests}
                      onChange={(e) => setSearchData({...searchData, guests: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    >
                      <option value="1">1 personne</option>
                      <option value="2">2 personnes</option>
                      <option value="3">3 personnes</option>
                      <option value="4">4 personnes</option>
                      <option value="5+">5+ personnes</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                <Search size={24} />
                <span>Rechercher des chambres</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Pourquoi choisir <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">HotelBénin</span> ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-100 to-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Clock className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Réservation Rapide</h3>
              <p className="text-gray-600">
                Réservez votre chambre en moins de 3 minutes
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-100 to-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Paiement Sécurisé</h3>
              <p className="text-gray-600">
                Mobile Money et carte bancaire 100% sécurisés
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-100 to-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Award className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Meilleurs Prix</h3>
              <p className="text-gray-600">
                Tarifs compétitifs garantis sur tous nos hôtels
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-100 to-red-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Star className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Qualité Vérifiée</h3>
              <p className="text-gray-600">
                Tous nos hôtels sont certifiés et vérifiés
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Hôtels en Vedette */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-gray-800">
              Hôtels en <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Vedette</span>
            </h2>
            <button className="flex items-center space-x-2 text-orange-600 font-semibold hover:text-red-600 transition-colors">
              <span>Voir tout</span>
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredHotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] cursor-pointer">
                <div className="relative h-56">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-yellow-400" size={16} />
                    <span className="font-bold text-gray-800">{hotel.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{hotel.name}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-1" />
                    <span>{hotel.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-orange-600">{hotel.price} FCFA</span>
                      <span className="text-gray-500 text-sm"> / nuit</span>
                    </div>
                    <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                      Réserver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à réserver votre prochain séjour ?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Rejoignez des milliers de voyageurs satisfaits et découvrez le meilleur du Bénin
          </p>
          <button className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105">
            Commencer maintenant
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <span className="text-2xl font-bold">HotelBénin</span>
              </div>
              <p className="text-gray-400">
                Votre partenaire de confiance pour des séjours inoubliables au Bénin.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Navigation</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Accueil</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Nos Hôtels</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">À Propos</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Conditions</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Confidentialité</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: contact@hotelbenin.com</li>
                <li>Tél: +229 XX XX XX XX</li>
                <li>Cotonou, Bénin</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 HotelBénin. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}