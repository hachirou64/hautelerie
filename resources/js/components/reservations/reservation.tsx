import React, { useState } from 'react';
import { Check, ChevronRight, User, Mail, Phone, CreditCard, Shield, Calendar, MapPin, Users, Bed, Clock, AlertCircle, Download, Home } from 'lucide-react';

export default function BookingProcessPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    // Informations personnelles
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    specialRequests: '',
    // Paiement
    paymentMethod: 'mobile_money',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVV: '',
    mobileProvider: 'mtn',
    mobileNumber: '',
    agreeTerms: false
  });

  const [confirmationData] = useState({
    bookingNumber: 'HB-2024-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    confirmationDate: new Date().toLocaleDateString('fr-FR')
  });

  // Données de la réservation (passées depuis la page précédente)
  const reservationDetails = {
    hotelName: "Hôtel Royal Palm",
    location: "Quartier des Affaires, Cotonou",
    roomType: "Chambre Deluxe",
    checkIn: "15/03/2024",
    checkOut: "18/03/2024",
    guests: 2,
    nights: 3,
    pricePerNight: 35000,
    total: 105000,
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&q=80"
  };

  const steps = [
    { number: 1, title: 'Informations', icon: User },
    { number: 2, title: 'Paiement', icon: CreditCard },
    { number: 3, title: 'Confirmation', icon: Check }
  ];

  const handleInputChange = (field, value) => {
    setBookingData({ ...bookingData, [field]: value });
  };

  const validateStep1 = () => {
    return bookingData.firstName && bookingData.lastName && 
           bookingData.email && bookingData.phone;
  };

  const validateStep2 = () => {
    if (bookingData.paymentMethod === 'mobile_money') {
      return bookingData.mobileNumber && bookingData.agreeTerms;
    } else {
      return bookingData.cardNumber && bookingData.cardName && 
             bookingData.cardExpiry && bookingData.cardCVV && bookingData.agreeTerms;
    }
  };

  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (currentStep === 2 && !validateStep2()) {
      alert('Veuillez remplir tous les champs de paiement et accepter les conditions');
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
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
            
            <div className="flex items-center space-x-2 text-gray-600">
              <Shield size={20} className="text-green-500" />
              <span className="text-sm font-semibold">Réservation sécurisée</span>
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Indicateur d'étapes */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                      isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isActive 
                          ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white' 
                          : 'bg-gray-200 text-gray-500'
                    }`}>
                      {isCompleted ? (
                        <Check size={28} />
                      ) : (
                        <StepIcon size={28} />
                      )}
                    </div>
                    <span className={`text-sm font-semibold ${
                      isActive ? 'text-orange-600' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 rounded ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire principal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* ÉTAPE 1: Informations personnelles */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Vos informations</h2>
                  <p className="text-gray-600 mb-6">Veuillez remplir vos coordonnées pour finaliser la réservation</p>

                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Prénom <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={bookingData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                          placeholder="Jean"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nom <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={bookingData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                          placeholder="Dupont"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Adresse e-mail <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="email"
                          value={bookingData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                          placeholder="jean.dupont@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Numéro de téléphone <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="tel"
                          value={bookingData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                          placeholder="+229 XX XX XX XX"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Adresse
                        </label>
                        <input
                          type="text"
                          value={bookingData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                          placeholder="123 Rue Example"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Ville
                        </label>
                        <input
                          type="text"
                          value={bookingData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                          placeholder="Cotonou"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Demandes spéciales (optionnel)
                      </label>
                      <textarea
                        value={bookingData.specialRequests}
                        onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                        rows="4"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors resize-none"
                        placeholder="Ex: Lit bébé, étage élevé, arrivée tardive..."
                      ></textarea>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                      <div className="flex items-start">
                        <AlertCircle className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                        <div className="ml-3">
                          <p className="text-sm text-blue-800">
                            Votre confirmation de réservation sera envoyée à l'adresse e-mail fournie.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ÉTAPE 2: Paiement */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Informations de paiement</h2>
                  <p className="text-gray-600 mb-6">Choisissez votre mode de paiement sécurisé</p>

                  {/* Sélection du mode de paiement */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Mode de paiement
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleInputChange('paymentMethod', 'mobile_money')}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          bookingData.paymentMethod === 'mobile_money'
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-center mb-2">
                          <Phone className="text-orange-600" size={32} />
                        </div>
                        <div className="text-center font-semibold text-gray-800">Mobile Money</div>
                        <div className="text-xs text-gray-600 text-center mt-1">MTN / Moov</div>
                      </button>

                      <button
                        onClick={() => handleInputChange('paymentMethod', 'card')}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          bookingData.paymentMethod === 'card'
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-center mb-2">
                          <CreditCard className="text-orange-600" size={32} />
                        </div>
                        <div className="text-center font-semibold text-gray-800">Carte bancaire</div>
                        <div className="text-xs text-gray-600 text-center mt-1">Visa / Mastercard</div>
                      </button>
                    </div>
                  </div>

                  {/* Formulaire Mobile Money */}
                  {bookingData.paymentMethod === 'mobile_money' && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Opérateur Mobile Money <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => handleInputChange('mobileProvider', 'mtn')}
                            className={`p-4 border-2 rounded-lg transition-all ${
                              bookingData.mobileProvider === 'mtn'
                                ? 'border-orange-500 bg-orange-50'
                                : 'border-gray-200'
                            }`}
                          >
                            <div className="font-semibold text-gray-800">MTN Mobile Money</div>
                          </button>
                          <button
                            onClick={() => handleInputChange('mobileProvider', 'moov')}
                            className={`p-4 border-2 rounded-lg transition-all ${
                              bookingData.mobileProvider === 'moov'
                                ? 'border-orange-500 bg-orange-50'
                                : 'border-gray-200'
                            }`}
                          >
                            <div className="font-semibold text-gray-800">Moov Money</div>
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Numéro Mobile Money <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="tel"
                            value={bookingData.mobileNumber}
                            onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                            placeholder="+229 XX XX XX XX"
                          />
                        </div>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                        <div className="flex items-start">
                          <AlertCircle className="text-yellow-600 mt-1 flex-shrink-0" size={20} />
                          <div className="ml-3">
                            <p className="text-sm text-yellow-800 font-semibold mb-1">
                              Instructions de paiement Mobile Money
                            </p>
                            <ol className="text-sm text-yellow-800 list-decimal list-inside space-y-1">
                              <li>Vous recevrez une demande de paiement sur votre téléphone</li>
                              <li>Composez votre code PIN pour confirmer</li>
                              <li>Vous recevrez un SMS de confirmation</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Formulaire Carte bancaire */}
                  {bookingData.paymentMethod === 'card' && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Numéro de carte <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="text"
                            value={bookingData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nom sur la carte <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={bookingData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                          placeholder="JEAN DUPONT"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Date d'expiration <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={bookingData.cardExpiry}
                            onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                            placeholder="MM/AA"
                            maxLength="5"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            CVV <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={bookingData.cardCVV}
                            onChange={(e) => handleInputChange('cardCVV', e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                            placeholder="123"
                            maxLength="3"
                          />
                        </div>
                      </div>

                      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                        <div className="flex items-start">
                          <Shield className="text-green-600 mt-1 flex-shrink-0" size={20} />
                          <div className="ml-3">
                            <p className="text-sm text-green-800">
                              Vos informations de paiement sont sécurisées avec un chiffrement SSL 256 bits et conformes aux normes PCI-DSS.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Conditions générales */}
                  <div className="mt-6">
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={bookingData.agreeTerms}
                        onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                        className="w-5 h-5 text-orange-500 focus:ring-orange-500 rounded mt-1"
                      />
                      <span className="text-sm text-gray-700">
                        J'accepte les{' '}
                        <a href="#" className="text-orange-600 hover:underline">
                          conditions générales
                        </a>{' '}
                        et la{' '}
                        <a href="#" className="text-orange-600 hover:underline">
                          politique de confidentialité
                        </a>
                        . J'autorise le prélèvement du montant total de la réservation.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* ÉTAPE 3: Confirmation */}
              {currentStep === 3 && (
                <div>
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
                      <Check className="text-green-600" size={48} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Réservation confirmée !</h2>
                    <p className="text-gray-600">Votre réservation a été effectuée avec succès</p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 mb-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Numéro de réservation</div>
                      <div className="text-3xl font-bold text-orange-600 mb-1">{confirmationData.bookingNumber}</div>
                      <div className="text-sm text-gray-600">Confirmé le {confirmationData.confirmationDate}</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Client</span>
                        <span className="font-semibold text-gray-800">
                          {bookingData.firstName} {bookingData.lastName}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">E-mail</span>
                        <span className="font-semibold text-gray-800">{bookingData.email}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Téléphone</span>
                        <span className="font-semibold text-gray-800">{bookingData.phone}</span>
                      </div>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Mode de paiement</span>
                        <span className="font-semibold text-gray-800">
                          {bookingData.paymentMethod === 'mobile_money' ? 'Mobile Money' : 'Carte bancaire'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Montant payé</span>
                        <span className="font-semibold text-green-600">{reservationDetails.total.toLocaleString()} FCFA</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
                    <div className="flex items-start">
                      <Mail className="text-blue-500 mt-1 flex-shrink-0" size={20} />
                      <div className="ml-3">
                        <p className="text-sm text-blue-800 font-semibold mb-1">E-mail de confirmation envoyé</p>
                        <p className="text-sm text-blue-800">
                          Un e-mail de confirmation avec tous les détails de votre réservation a été envoyé à {bookingData.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center space-x-2 bg-white border-2 border-orange-500 text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all">
                      <Download size={20} />
                      <span>Télécharger le reçu</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                      <Home size={20} />
                      <span>Retour à l'accueil</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Boutons de navigation */}
              {currentStep < 3 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t">
                  {currentStep > 1 && (
                    <button
                      onClick={prevStep}
                      className="px-6 py-3 border-2 border-gray-200 rounded-lg font-semibold text-gray-700 hover:border-gray-300 transition-all"
                    >
                      Retour
                    </button>
                  )}
                  <button
                    onClick={nextStep}
                    className={`flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all ${
                      currentStep === 1 ? 'ml-auto' : ''
                    }`}
                  >
                    <span>{currentStep === 2 ? 'Confirmer et payer' : 'Continuer'}</span>
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Résumé de la réservation (sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Résumé de la réservation</h3>
              
              <div className="mb-4">
                <img
                  src={reservationDetails.image}
                  alt={reservationDetails.hotelName}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h4 className="font-bold text-gray-800 mb-1">{reservationDetails.hotelName}</h4>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin size={14} className="mr-1" />
                  <span>{reservationDetails.location}</span>
                </div>
                <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                  {reservationDetails.roomType}
                </div>
              </div>

              <div className="space-y-3 py-4 border-t border-b mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span>Arrivée</span>
                  </div>
                  <span className="font-semibold text-gray-800">{reservationDetails.checkIn}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span>Départ</span>
                  </div>
                  <span className="font-semibold text-gray-800">{reservationDetails.checkOut}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2" />
                    <span>Durée</span>
                  </div>
                  <span className="font-semibold text-gray-800">{reservationDetails.nights} nuits</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Users size={16} className="mr-2" />
                    <span>Voyageurs</span>
                  </div>
                  <span className="font-semibold text-gray-800">{reservationDetails.guests} personnes</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>{reservationDetails.pricePerNight.toLocaleString()} FCFA × {reservationDetails.nights} nuits</span>
                  <span className="font-semibold">{reservationDetails.total.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Frais de service</span>
                  <span className="font-semibold">0 FCFA</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-orange-600">
                    {reservationDetails.total.toLocaleString()} FCFA
                  </span>
                </div>
              </div>

              {currentStep < 3 && (
                <div className="mt-4 bg-green-50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <Check className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                    <p className="text-xs text-green-800 ml-2">
                      Annulation gratuite jusqu'à 48h avant l'arrivée
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}