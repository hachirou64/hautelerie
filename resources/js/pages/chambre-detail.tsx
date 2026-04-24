import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Users, MapPin, Star, ArrowLeft, CheckCircle, AlertCircle, Loader2, Bed, Wifi, Car, Coffee, Utensils } from 'lucide-react';
import type { Chambre } from '@/types';

interface Props {
  id: number;
}

export default function ChambreDetailPage({ id }: Props) {
  const [chambre, setChambre] = useState<Chambre | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');

  // Booking form state
  const [formData, setFormData] = useState({
    nom_client: '',
    prenom_client: '',
    email_client: '',
    telephone_client: '',
    adresse: '',
    ville: '',
    demandes_speciales: '',
    date_arrivee: '',
    date_depart: '',
    nombre_personnes: 1,
  });

  useEffect(() => {
    const fetchChambre = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/chambres/${id}`);
        const data = await response.json();

        if (data.success) {
          setChambre(data.data);
        }
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChambre();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    if (!chambre || !formData.date_arrivee || !formData.date_depart) return 0;

    const start = new Date(formData.date_arrivee);
    const end = new Date(formData.date_depart);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    return nights > 0 ? nights * chambre.prix : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!chambre) return;

    setBookingLoading(true);
    setBookingError('');

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          chambre_id: chambre.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setBookingSuccess(true);
        // Reset form
        setFormData({
          nom_client: '',
          prenom_client: '',
          email_client: '',
          telephone_client: '',
          adresse: '',
          ville: '',
          demandes_speciales: '',
          date_arrivee: '',
          date_depart: '',
          nombre_personnes: 1,
        });
      } else {
        setBookingError(data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      setBookingError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setBookingLoading(false);
    }
  };

  const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR').format(price);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-24 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-orange-600" />
      </div>
    );
  }

  if (!chambre) {
    return (
      <div className="min-h-screen bg-gray-50 py-24 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-24 w-24 text-gray-400 mb-8" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Chambre non trouvée</h1>
          <Link
            href="/chambres"
            className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour aux chambres</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head title={`${chambre.nom} - HotelBénin`} />

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/chambres"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour aux chambres</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{chambre.nom}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center space-x-1">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">{chambre.localisation}, {chambre.ville}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">{chambre.note.toFixed(1)}</span>
              <span className="text-gray-600">({chambre.avis_count} avis)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-video">
                <img
                  src={chambre.image}
                  alt={chambre.nom}
                  className="w-full h-full object-cover"
                />
              </div>
              {chambre.images && chambre.images.length > 1 && (
                <div className="p-4 grid grid-cols-4 gap-2">
                  {chambre.images.slice(1, 5).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${chambre.nom} ${idx + 2}`}
                      className="aspect-square object-cover rounded-lg cursor-pointer hover:opacity-80"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{chambre.description}</p>
            </div>

            {/* Equipements */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Équipements</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {chambre.equipements.map((equip, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      {equip.toLowerCase().includes('wifi') && <Wifi className="w-4 h-4 text-orange-600" />}
                      {equip.toLowerCase().includes('lit') && <Bed className="w-4 h-4 text-orange-600" />}
                      {equip.toLowerCase().includes('parking') && <Car className="w-4 h-4 text-orange-600" />}
                      {equip.toLowerCase().includes('restaurant') && <Utensils className="w-4 h-4 text-orange-600" />}
                      {equip.toLowerCase().includes('café') && <Coffee className="w-4 h-4 text-orange-600" />}
                      {!equip.toLowerCase().match(/(wifi|lit|parking|restaurant|café)/) && <CheckCircle className="w-4 h-4 text-orange-600" />}
                    </div>
                    <span className="text-gray-700">{equip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Caractéristiques */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Caractéristiques</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{chambre.capacite}</div>
                  <div className="text-sm text-gray-600">Personnes</div>
                </div>
                <div className="text-center">
                  <Bed className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{chambre.lit}</div>
                  <div className="text-sm text-gray-600">Lits</div>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-orange-600 font-bold">m²</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{chambre.taille}</div>
                  <div className="text-sm text-gray-600">Surface</div>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-orange-600 font-bold text-lg">★</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{chambre.type}</div>
                  <div className="text-sm text-gray-600">Type</div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {formatPrice(chambre.prix)}
                  </div>
                  <div className="text-gray-600">par nuit</div>
                </div>

                {bookingSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Réservation réussie !</h3>
                    <p className="text-gray-600 mb-4">
                      Votre réservation a été enregistrée. Vous recevrez un email de confirmation.
                    </p>
                    <Link
                      href="/chambres"
                      className="inline-flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors"
                    >
                      <span>Réserver une autre chambre</span>
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom *
                        </label>
                        <input
                          type="text"
                          name="nom_client"
                          value={formData.nom_client}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prénom *
                        </label>
                        <input
                          type="text"
                          name="prenom_client"
                          value={formData.prenom_client}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                          placeholder="Votre prénom"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email_client"
                        value={formData.email_client}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="votre.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="telephone_client"
                        value={formData.telephone_client}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="+229 XX XX XX XX"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date d'arrivée *
                        </label>
                        <input
                          type="date"
                          name="date_arrivee"
                          value={formData.date_arrivee}
                          onChange={handleInputChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date de départ *
                        </label>
                        <input
                          type="date"
                          name="date_depart"
                          value={formData.date_depart}
                          onChange={handleInputChange}
                          required
                          min={formData.date_arrivee || new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de personnes *
                      </label>
                      <select
                        name="nombre_personnes"
                        value={formData.nombre_personnes}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                      >
                        {Array.from({ length: chambre.capacite }, (_, i) => i + 1).map(num => (
                          <option key={num} value={num}>{num} personne{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Adresse
                        </label>
                        <input
                          type="text"
                          name="adresse"
                          value={formData.adresse}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                          placeholder="Votre adresse"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ville
                        </label>
                        <input
                          type="text"
                          name="ville"
                          value={formData.ville}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                          placeholder="Votre ville"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Demandes spéciales
                      </label>
                      <textarea
                        name="demandes_speciales"
                        value={formData.demandes_speciales}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="Préférences alimentaires, demandes spéciales..."
                      />
                    </div>

                    {calculateTotal() > 0 && (
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="flex justify-between items-center text-lg font-semibold">
                          <span>Total:</span>
                          <span className="text-orange-600">{formatPrice(calculateTotal())} FCFA</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {Math.ceil((new Date(formData.date_depart).getTime() - new Date(formData.date_arrivee).getTime()) / (1000 * 60 * 60 * 24))} nuit{Math.ceil((new Date(formData.date_depart).getTime() - new Date(formData.date_arrivee).getTime()) / (1000 * 60 * 60 * 24)) > 1 ? 's' : ''} × {formatPrice(chambre.prix)} FCFA
                        </div>
                      </div>
                    )}

                    {bookingError && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          <span className="text-red-700">{bookingError}</span>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={bookingLoading || !chambre.disponible}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
                    >
                      {bookingLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Calendar className="w-5 h-5" />
                      )}
                      <span>
                        {bookingLoading ? 'Réservation en cours...' : chambre.disponible ? 'Réserver maintenant' : 'Non disponible'}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}