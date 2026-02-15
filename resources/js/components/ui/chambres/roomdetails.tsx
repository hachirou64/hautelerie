import React, { useState } from 'react';
import { MapPin, Star, Users, Bed, Maximize, Wifi, Coffee, Tv, Wind, Shield, Calendar, ChevronLeft, ChevronRight, Check, X, Heart, Share2, Phone, Mail } from 'lucide-react';

export default function RoomDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  // Données de la chambre
  const room = {
    id: 1,
    hotelName: "Hôtel Royal Palm",
    location: "Quartier des Affaires, Cotonou",
    fullAddress: "Avenue Jean-Paul II, Cotonou, Bénin",
    rating: 4.8,
    reviews: 156,
    roomType: "Chambre Deluxe",
    description: "Profitez d'un séjour luxueux dans notre Chambre Deluxe spacieuse et élégamment décorée. Cette chambre offre une vue imprenable sur la ville de Cotonou et dispose de tout le confort moderne pour rendre votre séjour inoubliable. Idéale pour les voyageurs d'affaires et les touristes recherchant l'excellence.",
    price: 35000,
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&q=80"
    ],
    beds: "1 lit King Size (180 cm x 200 cm)",
    capacity: 2,
    size: "32 m²",
    amenities: {
      included: [
        { icon: Wifi, name: "Wi-Fi gratuit haute vitesse" },
        { icon: Wind, name: "Climatisation" },
        { icon: Tv, name: "TV écran plat 55 pouces" },
        { icon: Coffee, name: "Petit-déjeuner buffet inclus" },
        { name: "Minibar" },
        { name: "Coffre-fort" },
        { name: "Bureau de travail" },
        { name: "Salle de bain privée avec douche" },
        { name: "Sèche-cheveux" },
        { name: "Peignoirs et chaussons" },
        { name: "Articles de toilette gratuits" },
        { name: "Service en chambre 24h/24" }
      ],
      hotelServices: [
        "Piscine extérieure",
        "Restaurant gastronomique",
        "Salle de sport",
        "Centre d'affaires",
        "Service de blanchisserie",
        "Parking gratuit",
        "Navette aéroport (payant)",
        "Conciergerie"
      ]
    },
    policies: {
      checkIn: "À partir de 14h00",
      checkOut: "Jusqu'à 12h00",
      cancellation: "Annulation gratuite jusqu'à 48h avant l'arrivée",
      deposit: "Acompte de 30% requis à la réservation"
    }
  };

  const reviews = [
    {
      id: 1,
      author: "Kofi Mensah",
      date: "Il y a 2 semaines",
      rating: 5,
      comment: "Excellent séjour ! La chambre était spacieuse et très propre. Le personnel est extrêmement professionnel et accueillant. Le petit-déjeuner était délicieux avec beaucoup de choix. Je recommande vivement cet hôtel.",
      verified: true
    },
    {
      id: 2,
      author: "Marie Dupont",
      date: "Il y a 1 mois",
      rating: 4,
      comment: "Très bon hôtel bien situé au centre de Cotonou. La chambre était confortable et bien équipée. Seul petit bémol : le wifi était un peu lent certains jours. Sinon, excellent rapport qualité-prix.",
      verified: true
    },
    {
      id: 3,
      author: "Abdoulaye Traoré",
      date: "Il y a 2 mois",
      rating: 5,
      comment: "Parfait pour un voyage d'affaires. La chambre dispose d'un excellent espace de travail, la connexion internet est stable. Le service en chambre est rapide et efficace. Je reviendrai certainement.",
      verified: true
    }
  ];

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * room.price;
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + room.images.length) % room.images.length);
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Fil d'Ariane */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <a href="#" className="hover:text-orange-600">Accueil</a>
          <span>/</span>
          <a href="#" className="hover:text-orange-600">Cotonou</a>
          <span>/</span>
          <span className="text-gray-800 font-semibold">{room.hotelName}</span>
        </div>

        {/* En-tête de la chambre */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{room.hotelName}</h1>
              <h2 className="text-2xl text-gray-600 mb-3">{room.roomType}</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-orange-50 px-3 py-1 rounded-lg">
                  <Star className="text-orange-500 fill-orange-500 mr-1" size={18} />
                  <span className="font-bold text-orange-600">{room.rating}</span>
                  <span className="text-gray-600 text-sm ml-1">({room.reviews} avis)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-1 text-orange-500" />
                  <span>{room.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-orange-500 transition-colors">
                <Share2 size={20} className="text-gray-600" />
                <span className="font-semibold text-gray-700">Partager</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-orange-500 transition-colors">
                <Heart size={20} className="text-gray-600" />
                <span className="font-semibold text-gray-700">Favoris</span>
              </button>
            </div>
          </div>
        </div>

        {/* Galerie photos */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="col-span-4 md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer">
            <img
              src={room.images[selectedImage]}
              alt="Chambre principale"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 p-2 rounded-full hover:bg-white transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {room.images.slice(1, 5).map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(index + 1)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                selectedImage === index + 1 ? 'ring-4 ring-orange-500' : ''
              }`}
            >
              <img
                src={img}
                alt={`Photo ${index + 2}`}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Informations principales */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Informations sur la chambre</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <Users className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Capacité</div>
                    <div className="font-semibold text-gray-800">{room.capacity} personnes</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <Bed className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Literie</div>
                    <div className="font-semibold text-gray-800">1 King Size</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <Maximize className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Surface</div>
                    <div className="font-semibold text-gray-800">{room.size}</div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">{room.description}</p>
            </div>

            {/* Équipements */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Équipements de la chambre</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {room.amenities.included.slice(0, showAllAmenities ? undefined : 8).map((amenity, index) => {
                  const Icon = amenity.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="text-green-500 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{amenity.name}</span>
                    </div>
                  );
                })}
              </div>

              {room.amenities.included.length > 8 && (
                <button
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                  className="text-orange-600 font-semibold hover:text-red-600 transition-colors"
                >
                  {showAllAmenities ? 'Voir moins' : `Voir tous les équipements (${room.amenities.included.length})`}
                </button>
              )}

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-gray-800 mb-4">Services de l'hôtel</h4>
                <div className="grid grid-cols-2 gap-4">
                  {room.amenities.hotelServices.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="text-green-500 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Politiques */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Politiques de l'hôtel</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <div className="font-semibold text-gray-800">Arrivée</div>
                    <div className="text-gray-600">{room.policies.checkIn}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <div className="font-semibold text-gray-800">Départ</div>
                    <div className="text-gray-600">{room.policies.checkOut}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Shield className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <div className="font-semibold text-gray-800">Annulation</div>
                    <div className="text-gray-600">{room.policies.cancellation}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Shield className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <div className="font-semibold text-gray-800">Paiement</div>
                    <div className="text-gray-600">{room.policies.deposit}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Avis clients */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Avis des clients</h3>
                <div className="flex items-center bg-orange-50 px-4 py-2 rounded-lg">
                  <Star className="text-orange-500 fill-orange-500 mr-2" size={24} />
                  <span className="text-2xl font-bold text-orange-600">{room.rating}</span>
                  <span className="text-gray-600 ml-2">/ 5</span>
                </div>
              </div>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-gray-800">{review.author}</span>
                          {review.verified && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                              Vérifié
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>

              <button className="mt-6 text-orange-600 font-semibold hover:text-red-600 transition-colors">
                Voir tous les avis ({room.reviews})
              </button>
            </div>
          </div>

          {/* Carte de réservation (sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-orange-600">
                    {room.price.toLocaleString()}
                  </span>
                  <span className="text-gray-600 ml-2">FCFA / nuit</span>
                </div>
                <div className="flex items-center text-green-600 text-sm">
                  <Check size={16} className="mr-1" />
                  <span>Annulation gratuite</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date d'arrivée
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date de départ
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre de personnes
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" size={20} />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none appearance-none"
                    >
                      <option value="1">1 personne</option>
                      <option value="2">2 personnes</option>
                    </select>
                  </div>
                </div>
              </div>

              {calculateNights() > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>{room.price.toLocaleString()} FCFA × {calculateNights()} {calculateNights() > 1 ? 'nuits' : 'nuit'}</span>
                    <span className="font-semibold">{calculateTotal().toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Frais de service</span>
                    <span className="font-semibold">0 FCFA</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-orange-600">{calculateTotal().toLocaleString()} FCFA</span>
                  </div>
                </div>
              )}

              <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all transform hover:scale-[1.02] mb-4">
                Réserver maintenant
              </button>

              <p className="text-center text-sm text-gray-600 mb-4">
                Vous ne serez pas débité maintenant
              </p>

              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Phone size={18} className="text-orange-500" />
                  <span className="text-sm">+229 XX XX XX XX</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail size={18} className="text-orange-500" />
                  <span className="text-sm">contact@royalpalm.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}