import React, { useState, useEffect } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import { 
  Search, Calendar, Users, MapPin, Star, Clock, Shield, Award, ChevronRight, 
  Wifi, Utensils, Car, Waves, Heart, Quote, X, Menu, CheckCircle, AlertCircle, 
  Loader2, ArrowRight, Phone, Mail 
} from 'lucide-react';
import type { SharedData, Chambre, Service, ContactForm } from '@/types';

const iconMap = {
  'Waves': Waves,
  'Wifi': Wifi,
  'Car': Car,
  'Phone': Phone,
  'Mail': Mail,
  // Add more as needed
};

interface ReservationForm {
  nom_client: string;
  prenom_client: string;
  email_client: string;
  telephone_client: string;
  adresse: string;
  ville: string;
  demandes_speciales: string;
  date_arrivee: string;
  date_depart: string;
  nombre_personnes: number;
}

export default function HomePage() {
  const { auth } = usePage<SharedData>().props;
  const isAuthenticated = !!auth?.user;
  
  // States
  const [featuredChambres, setFeaturedChambres] = useState<Chambre[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [selectedChambre, setSelectedChambre] = useState<Chambre | null>(null);
  const [reservationLoading, setReservationLoading] = useState(false);
  
  // Contact modal states
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState<ContactForm>({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [reservationError, setReservationError] = useState<string | null>(null);
  
  const [reservationForm, setReservationForm] = useState<ReservationForm>({
    nom_client: '',
    prenom_client: '',
    email_client: '',
    telephone_client: '',
    adresse: '',
    ville: '',
    demandes_speciales: '',
    date_arrivee: '',
    date_depart: '',
    nombre_personnes: 2,
  });

  const [searchData, setSearchData] = useState({
    ville: '',
    date_arrivee: '',
    date_depart: '',
    nombre_personnes: '2'
  });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [chambresRes, servicesRes] = await Promise.all([
          fetch('/api/chambres/vedette/list'),
          fetch('/api/services')
        ]);
        
        const chambresData = await chambresRes.json();
        const servicesData = await servicesRes.json();

        if (chambresData.success) {
          setFeaturedChambres(chambresData.data || []);
        }
        if (servicesData.success) {
          setServices(servicesData.data || []);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Prefill forms with user data
  useEffect(() => {
    if (isAuthenticated && auth?.user) {
      const nameParts = auth.user.name.split(' ');
      setReservationForm(prev => ({
        ...prev,
        nom_client: nameParts.slice(1).join(' ') || '',
        prenom_client: nameParts[0] || '',
        email_client: auth.user.email || '',
      }));
      setContactForm(prev => ({
        ...prev,
        nom: auth.user.name || '',
        email: auth.user.email || '',
      }));
    } else {
      // Reset forms when user logs out
      setReservationForm({
        nom_client: '',
        prenom_client: '',
        email_client: '',
        telephone_client: '',
        adresse: '',
        ville: '',
        demandes_speciales: '',
        date_arrivee: '',
        date_depart: '',
        ville: '',
        demandes_speciales: '',
        date_arrivee: '',
        date_depart: '',
        nombre_personnes: 2,
      });
      setContactForm({
        nom: '',
        email: '',
        telephone: '',
        sujet: '',
        message: '',
      });
    }
  }, [isAuthenticated, auth]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (searchData.ville) {
      params.set('ville', searchData.ville);
    }
    if (searchData.date_arrivee) {
      params.set('date_arrivee', searchData.date_arrivee);
    }
    if (searchData.date_depart) {
      params.set('date_depart', searchData.date_depart);
    }
    if (searchData.nombre_personnes) {
      params.set('guests', searchData.nombre_personnes);
    }

    router.visit(`/chambres?${params.toString()}`);
  };

  const handleContactClick = () => {
    setShowContactModal(true);
    setContactSuccess(false);
    setContactError(null);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-XSRF-TOKEN': document.querySelector('meta[name=\"csrf-token\"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify(contactForm),
      });

      const data = await response.json();

      if (data.success) {
        setContactSuccess(true);
        setContactForm({
          nom: '',
          email: '',
          telephone: '',
          sujet: '',
          message: '',
        });
      } else {
        setContactError(data.message || 'Erreur lors de l\'envoi du message');
      }
    } catch (err) {
      console.error('Contact error:', err);
      setContactError('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setContactLoading(false);
    }
  };

  const closeContactModal = () => {
    setShowContactModal(false);
    setContactSuccess(false);
    setContactError(null);
  };

  const handleReserveClick = (chambre: Chambre) => {
    setSelectedChambre(chambre);
    setShowReservationModal(true);
    setReservationSuccess(false);
    setReservationError(null);
  };

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChambre) return;

    setReservationLoading(true);
    setReservationError(null);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-XSRF-TOKEN': document.querySelector('meta[name=\"csrf-token\"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({
          ...reservationForm,
          chambre_id: selectedChambre.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setReservationSuccess(true);
        // Reset form
        setReservationForm({
          nom_client: '',
          prenom_client: '',
          email_client: '',
          telephone_client: '',
          adresse: '',
          ville: '',
          demandes_speciales: '',
          date_arrivee: '',
          date_depart: '',
          nombre_personnes: 2,
        });
      } else {
        setReservationError(data.message || 'Erreur lors de la réservation');
      }
    } catch (err) {
      console.error('Reservation error:', err);
      setReservationError('Erreur lors de la réservation. Veuillez réessayer.');
    } finally {
      setReservationLoading(false);
    }
  };

  const closeModal = () => {
    setShowReservationModal(false);
    setSelectedChambre(null);
    setReservationSuccess(false);
    setReservationError(null);
  };

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR').format(price);

  const getServiceIcon = (iconName: string) => {
    const IconComp = iconMap[iconName as keyof typeof iconMap];
    return IconComp ? <IconComp className="text-white" size={32} /> : <Utensils className="text-white" size={32} />;
  };

  const displayedChambres = featuredChambres.slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-orange-50 to-white text-slate-900">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">H</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                HotelBénin
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#accueil" className="text-slate-700 hover:text-orange-600 font-medium transition-colors">Accueil</a>
              <a href="#chambres" className="text-slate-700 hover:text-orange-600 font-medium transition-colors">Chambres</a>
              <a href="#services" className="text-slate-700 hover:text-orange-600 font-medium transition-colors">Services</a>
              <a href="#temoignages" className="text-slate-700 hover:text-orange-600 font-medium transition-colors">Avis</a>
              <a href="#contact" className="text-slate-700 hover:text-orange-600 font-medium transition-colors">Contact</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="text-slate-700 hover:text-orange-600 font-medium">
                    Dashboard
                  </Link>
                  <Link href="/logout" method="post" as="button" className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2.5 rounded-lg hover:shadow-xl transition-all">
                    Déconnexion
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-slate-700 hover:text-orange-600 font-medium">
                    Connexion
                  </Link>
                  <Link href="/register" className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2.5 rounded-lg hover:shadow-xl transition-all">
                    S'inscrire
                  </Link>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="md:hidden inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm hover:bg-slate-50 transition"
              aria-label="Menu mobile"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-xl">
            <div className="px-4 py-5 space-y-3">
              <a href="#accueil" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-orange-600 font-medium transition">Accueil</a>
              <a href="#chambres" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-orange-600 font-medium transition">Chambres</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-orange-600 font-medium transition">Services</a>
              <a href="#temoignages" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-orange-600 font-medium transition">Avis</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-slate-700 hover:text-orange-600 font-medium transition">Contact</a>
              <div className="pt-4 border-t border-slate-200">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard" className="block text-slate-700 hover:text-orange-600 font-medium transition">Dashboard</Link>
                    <Link href="/logout" method="post" as="button" className="mt-4 w-full inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 font-semibold transition hover:shadow-xl">
                      Déconnexion
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block text-slate-700 hover:text-orange-600 font-medium transition">Connexion</Link>
                    <Link href="/register" className="mt-4 w-full inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 font-semibold transition hover:shadow-xl">
                      S'inscrire
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="accueil" className="relative pt-28 pb-28 overflow-hidden bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-slate-950/55"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,174,66,0.25),_transparent_45%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left text-white">
              <span className="inline-flex items-center rounded-full bg-white/10 px-5 py-2 text-sm font-semibold tracking-wide text-orange-100 mb-6">
                Séjournez avec style au Bénin</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
                Vivez un séjour <span className="text-orange-300">inoubliable</span> dans un hôtel d'exception.
              </h1>
              <p className="text-lg sm:text-xl text-orange-100/90 max-w-xl mx-auto lg:mx-0 mb-8">
                Chambres élégantes, services premium, et une ambiance chaleureuse pour un voyage serein au cœur du Bénin.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <a href="#chambres" className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 text-white font-semibold shadow-2xl hover:shadow-orange-400/20 transition">
                  Voir nos chambres
                </a>
                <a href="#services" className="inline-flex items-center justify-center rounded-3xl border border-white/20 bg-white/10 px-8 py-4 text-white font-semibold hover:bg-white/20 transition">
                  Découvrir les services
                </a>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-white mb-4">Planifiez votre séjour</h2>
              <p className="text-sm text-orange-100/90 mb-8">Recherchez une chambre, sélectionnez vos dates et préparez votre escapade en quelques clics.</p>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative rounded-3xl bg-white/90 p-4">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={20} />
                    <input
                      type="text"
                      placeholder="Ville ou quartier"
                      className="w-full pl-12 pr-4 py-4 bg-transparent outline-none"
                      value={searchData.ville}
                      onChange={(e) => setSearchData(prev => ({...prev, ville: e.target.value}))}
                    />
                  </div>
                  <div className="relative rounded-3xl bg-white/90 p-4">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={20} />
                    <input
                      type="date"
                      className="w-full pl-12 pr-4 py-4 bg-transparent outline-none"
                      value={searchData.date_arrivee}
                      onChange={(e) => setSearchData(prev => ({...prev, date_arrivee: e.target.value}))}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative rounded-3xl bg-white/90 p-4">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={20} />
                    <input
                      type="date"
                      className="w-full pl-12 pr-4 py-4 bg-transparent outline-none"
                      value={searchData.date_depart}
                      onChange={(e) => setSearchData(prev => ({...prev, date_depart: e.target.value}))}
                    />
                  </div>
                  <div className="relative rounded-3xl bg-white/90 p-4">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={20} />
                    <select
                      className="w-full pl-12 pr-4 py-4 bg-transparent outline-none"
                      value={searchData.nombre_personnes}
                      onChange={(e) => setSearchData(prev => ({...prev, nombre_personnes: e.target.value}))}
                    >
                      {['1','2','3','4','5+'].map((value) => (
                        <option key={value} value={value}>{value} personne{value !== '1' ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-3xl bg-gradient-to-r from-orange-500 to-red-600 px-6 py-4 text-white font-semibold shadow-2xl hover:shadow-orange-400/30 transition"
                >
                  {loading ? <Loader2 className="animate-spin mr-2 inline-block" size={20} /> : <Search size={20} className="mr-2 inline-block" />}
                  Rechercher
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block px-6 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-6">
              Pourquoi choisir HotelBénin ?
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Votre confort, <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">notre priorité</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            <div className="text-center group p-10 rounded-3xl hover:bg-gradient-to-br from-orange-50 to-red-50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-4">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-500">
                <Clock className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-orange-600">Réservation Instantanée</h3>
              <p className="text-gray-600 text-lg">En 3 minutes chrono, confirmez votre séjour parfait</p>
            </div>
            <div className="text-center group p-10 rounded-3xl hover:bg-gradient-to-br from-orange-50 to-red-50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-500">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-orange-600">Paiements Sécurisés</h3>
              <p className="text-gray-600 text-lg">Mobile Money, cartes bancaires - 100% sécurisé</p>
            </div>
            <div className="text-center group p-10 rounded-3xl hover:bg-gradient-to-br from-orange-50 to-red-50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-4">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-500">
                <Award className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-orange-600">Meilleurs Tarifs</h3>
              <p className="text-gray-600 text-lg">Prix compétitifs garantis sur tout le Bénin</p>
            </div>
            <div className="text-center group p-10 rounded-3xl hover:bg-gradient-to-br from-orange-50 to-red-50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-4">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-500">
                <Star className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-orange-600">Hôtels Vérifiés</h3>
              <p className="text-gray-600 text-lg">Qualité certifiée sur chaque réservation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center justify-center rounded-full bg-orange-50 px-5 py-2 text-sm font-semibold text-orange-700 mb-4">
              Nos services les plus demandés
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Des services pensés pour <span className="text-orange-600">votre confort</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Découvrez nos prestations clés, conçues pour rendre votre séjour plus agréable, plus détendu et plus efficace.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {services.length > 0 ? services.slice(0, 8).map((service) => (
              <article key={service.id} className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl transition duration-500 group-hover:scale-105">
                  {getServiceIcon(service.icon)}
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">{service.nom}</h3>
                <p className="text-slate-700 leading-relaxed min-h-[5rem]">{service.description}</p>
                <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-500">
                  <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">Service premium</span>
                  <span className="rounded-full bg-white px-3 py-1.5 shadow-sm">Disponible 24/7</span>
                </div>
              </article>
            )) : (
              Array(4).fill(0).map((_, idx) => (
                <div key={idx} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-lg animate-pulse" />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Chambres */}
      <section id="chambres" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <span className="inline-flex items-center justify-center rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-700 mb-4">
              Quelques chambres en vedette
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
              Sélection <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">haut de gamme</span>
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-600">
              Des chambres préparées pour vous offrir calme, confort et une expérience mémorable au Bénin.
            </p>
          </div>

          {displayedChambres.length > 0 ? (
            <div className="grid gap-8 xl:grid-cols-3 lg:grid-cols-2">
              {displayedChambres.map((chambre) => (
                <article key={chambre.id} className="group flex flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl">
                  <div className="relative overflow-hidden bg-slate-200">
                    <img
                      src={chambre.image || '/placeholder-hotel.jpg'}
                      alt={chambre.nom}
                      className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'; }}
                    />
                    <div className="absolute inset-x-6 top-6 flex flex-wrap gap-3">
                      <span className="rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm">{chambre.type}</span>
                      {chambre.disponible && <span className="rounded-full bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm">Disponible</span>}
                    </div>
                    <div className="absolute bottom-6 left-6 bg-white/90 px-4 py-2 rounded-3xl text-sm font-semibold text-slate-900 shadow-xl flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      {chambre.note.toFixed(1)} ({chambre.avis_count})
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <div className="mb-4">
                      <h3 className="text-2xl font-semibold text-slate-900 mb-2 line-clamp-2">{chambre.nom}</h3>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MapPin size={16} />
                        <span>{chambre.localisation}, {chambre.ville}</span>
                      </div>
                    </div>
                    <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2 mb-8">
                      <span className="rounded-3xl bg-white/90 px-4 py-3 shadow-sm">Capacité : {chambre.capacite} pers.</span>
                      <span className="rounded-3xl bg-white/90 px-4 py-3 shadow-sm">Équipements : {chambre.equipements.slice(0, 3).join(', ')}{chambre.equipements.length > 3 ? '...' : ''}</span>
                    </div>
                    <div className="mt-auto flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-3xl font-semibold text-orange-600">{formatPrice(chambre.prix)}</p>
                        <p className="text-sm text-slate-500">/ nuit</p>
                      </div>
                      <button
                        onClick={() => handleReserveClick(chambre)}
                        disabled={!chambre.disponible}
                        className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-orange-500 to-red-600 px-6 py-3 text-white font-semibold shadow-xl transition hover:shadow-2xl disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
                      >
                        {chambre.disponible ? 'Réserver' : 'Indisponible'}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-100 rounded-3xl mb-8">
                <Search className="w-12 h-12 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Aucune chambre disponible pour le moment</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">Revenez bientôt ou contactez-nous pour plus d'options.</p>
              <Link href="/chambres" className="inline-flex items-center space-x-2 rounded-3xl bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 text-white font-bold hover:shadow-xl transition-all">
                <span>Voir toutes les chambres</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section id="temoignages" className="py-24 bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/30 via-transparent to-transparent"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold mb-6">
              Avis de nos clients
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl">
              Une expérience <span className="text-orange-200">exceptionnelle</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Marie D.',
                ville: 'Cotonou',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
                rating: 5,
                text: 'Séjour absolument parfait ! Personnel accueillant, chambres impeccables, emplacement idéal. Je recommande les yeux fermés !'
              },
              {
                name: 'Jean K.',
                ville: 'Porto-Novo',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
                rating: 5,
                text: 'Réservation fluide, check-in rapide, tout était parfait. Les équipements sont modernes et le service au top !'
              },
              {
                name: 'Sophie M.',
                ville: 'Paris',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
                rating: 4.9,
                text: 'Excellent rapport qualité-prix. Le WiFi ultra-rapide et le petit-déjeuner délicieux ont fait toute la différence.'
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-2 shadow-2xl">
                <Quote className="w-16 h-16 text-orange-300 mb-6 opacity-75" />
                <p className="text-xl text-white/95 leading-relaxed mb-8 drop-shadow-lg">{testimonial.text}</p>
                <div className="flex items-center space-x-4 mb-6">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/50" />
                  <div>
                    <div className="font-bold text-xl text-white">{testimonial.name}</div>
                    <div className="text-orange-100">{testimonial.ville}</div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-6 h-6 ${i < Math.floor(testimonial.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-300'}`} />
                  ))}
                  <span className="ml-2 text-orange-100 font-semibold">{testimonial.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center justify-center rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-700 mb-4">
              Contactez notre équipe
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Prêt à réserver ou besoin d'aide ?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
              Envoyez-nous votre demande et notre équipe vous répondra rapidement pour organiser votre séjour dans les meilleures conditions.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-500 text-white mb-6">
                    <Phone size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Appelez-nous</h3>
                  <p className="text-slate-600 mb-4">Disponible 24h/24 et 7j/7</p>
                  <p className="text-lg font-semibold text-orange-600">+229 97 12 34 56</p>
                </div>
                <div className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500 text-white mb-6">
                    <Mail size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Email</h3>
                  <p className="text-slate-600 mb-4">Réponse sous 24h</p>
                  <p className="text-lg font-semibold text-orange-600">contact@hotelbenin.com</p>
                </div>
              </div>
              <div className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-500 text-white mb-6">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Adresse</h3>
                <p className="text-slate-600 mb-4">Venez nous rencontrer</p>
                <p className="text-lg font-semibold text-orange-600">Cotonou, Littoral, Bénin</p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-10 shadow-2xl border border-slate-200">
              <h3 className="text-3xl font-semibold text-slate-900 mb-6">Envoyez un message</h3>
              <form className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nom</label>
                    <input type="text" placeholder="Votre nom" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input type="email" placeholder="Votre email" className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea placeholder="Votre demande" rows={6} className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition" />
                </div>
                <button type="button" onClick={handleContactClick} className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 text-white font-semibold shadow-xl transition hover:shadow-orange-400/30">
                  Envoyer ma demande
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Nous contacter</h3>
                <button onClick={closeContactModal} className="p-2 hover:bg-gray-100 rounded-2xl transition-colors">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-8 space-y-8">
              {contactSuccess ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-24 h-24 text-emerald-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Message envoyé !</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                  </p>
                  <button 
                    onClick={closeContactModal}
                    className="bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                  >
                    Fermer
                  </button>
                </div>
              ) : (
                <>
                  {contactError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                      <div className="flex items-center space-x-3 text-red-800">
                        <AlertCircle size={20} />
                        <span>{contactError}</span>
                      </div>
                    </div>
                  )}
                  
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          value={contactForm.nom}
                          onChange={(e) => setContactForm(prev => ({...prev, nom: e.target.value}))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({...prev, email: e.target.value}))}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        value={contactForm.telephone}
                        onChange={(e) => setContactForm(prev => ({...prev, telephone: e.target.value}))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        value={contactForm.sujet}
                        onChange={(e) => setContactForm(prev => ({...prev, sujet: e.target.value}))}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                      <textarea
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-vertical"
                        placeholder="Dites-nous en plus sur votre demande..."
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({...prev, message: e.target.value}))}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={closeContactModal}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 px-8 rounded-xl transition-all"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        disabled={contactLoading}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                      >
                        {contactLoading ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span>Envoi...</span>
                          </>
                        ) : (
                          'Envoyer'
                        )}

      <footer className="bg-gray-950 text-white py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <Link href="/" className="flex items-center space-x-3 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-2xl">H</span>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  HotelBénin
                </span>
              </Link>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Votre partenaire confiance pour des séjours inoubliables au Bénin et dans toute la sous-région.
              </p>
              <div className="flex space-x-6">
                {['facebook', 'instagram', 'twitter', 'linkedin'].map((platform) => (
                  <a key={platform} href="#" className="w-14 h-14 bg-white/10 hover:bg-orange-500 rounded-2xl flex items-center justify-center transition-all duration-300 group">
                    <span className="sr-only">{platform}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-8">Navigation</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#accueil" className="hover:text-orange-400 transition-colors block py-1">Accueil</a></li>
                <li><a href="#chambres" className="hover:text-orange-400 transition-colors block py-1">Nos Chambres</a></li>
                <li><a href="#services" className="hover:text-orange-400 transition-colors block py-1">Services</a></li>
                <li><a href="/dashboard" className="hover:text-orange-400 transition-colors block py-1">Dashboard</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-8">Support</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition-colors block py-1">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors block py-1">FAQ</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors block py-1">Nous contacter</a></li>
                <li><Link href="/politique-confidentialite" className="hover:text-orange-400 transition-colors block py-1">Confidentialité</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-8">Contact</h4>
              <div className="space-y-6 text-gray-400">
                <div className="flex items-center space-x-4 hover:text-orange-400 transition-colors">
                  <MapPin className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  <span>Cotonou, Littoral, Bénin</span>
                </div>
                <div className="flex items-center space-x-4 hover:text-orange-400 transition-colors">
                  <Phone className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  <span>+229 97 12 34 56</span>
                </div>
                <div className="flex items-center space-x-4 hover:text-orange-400 transition-colors">
                  <Mail className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  <span>contact@hotelbenin.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
            <span>© 2024 HotelBénin. Tous droits réservés.</span>
            <div className="flex items-center space-x-4">
              <Heart className="w-5 h-5 text-red-500" />
              <span>Fait avec ❤️ au Bénin</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Reservation Modal */}
      {showReservationModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl z-10">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">
                  Réserver {selectedChambre?.nom}
                </h3>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-2xl transition-colors">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-8 space-y-8">
              {selectedChambre && (
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={selectedChambre.image} 
                      alt={selectedChambre.nom}
                      className="w-24 h-24 rounded-2xl object-cover flex-shrink-0 shadow-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xl font-bold text-gray-900 mb-1 truncate">{selectedChambre.nom}</h4>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                        <span>{selectedChambre.note.toFixed(1)} ({selectedChambre.avis_count} avis)</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{selectedChambre.capacite} personne(s) max</span>
                        <span>•</span>
                        <span className="font-bold text-orange-600">{formatPrice(selectedChambre.prix)}/nuit</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {reservationSuccess ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-24 h-24 text-emerald-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Réservation confirmée !</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Vous recevrez un email de confirmation avec tous les détails de votre réservation.
                  </p>
                  <button 
                    onClick={closeModal}
                    className="bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                  >
                    Fermer
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} className="space-y-6">
                  {reservationError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                      <div className="flex items-center space-x-3 text-red-800">
                        <AlertCircle size={20} />
                        <span>{reservationError}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        value={reservationForm.nom_client}
                        onChange={(e) => setReservationForm(prev => ({...prev, nom_client: e.target.value}))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        value={reservationForm.prenom_client}
                        onChange={(e) => setReservationForm(prev => ({...prev, prenom_client: e.target.value}))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        value={reservationForm.email_client}
                        onChange={(e) => setReservationForm(prev => ({...prev, email_client: e.target.value}))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        value={reservationForm.telephone_client}
                        onChange={(e) => setReservationForm(prev => ({...prev, telephone_client: e.target.value}))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        value={reservationForm.ville}
                        onChange={(e) => setReservationForm(prev => ({...prev, ville: e.target.value}))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        value={reservationForm.adresse}
                        onChange={(e) => setReservationForm(prev => ({...prev, adresse: e.target.value}))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date d'arrivée *</label>
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        value={reservationForm.date_arrivee}
                        onChange={(e) => setReservationForm(prev => ({...prev, date_arrivee: e.target.value}))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date de départ *</label>
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        value={reservationForm.date_depart}
                        onChange={(e) => setReservationForm(prev => ({...prev, date_depart: e.target.value}))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de personnes</label>
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      value={reservationForm.nombre_personnes}
                      onChange={(e) => setReservationForm(prev => ({...prev, nombre_personnes: parseInt(e.target.value)}))}
                    >
                      {[1,2,3,4,5,6].map(n => (
                        <option key={n} value={n}>{n} personne{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Demandes spéciales</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-vertical"
                      placeholder="Allergies, lit bébé, chambre calme..."
                      value={reservationForm.demandes_speciales}
                      onChange={(e) => setReservationForm(prev => ({...prev, demandes_speciales: e.target.value}))}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 px-8 rounded-xl transition-all"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={reservationLoading}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                    >
                      {reservationLoading ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          <span>Confirmation...</span>
                        </>
                      ) : (
                        <>
                          <span>Réserver</span>
                          <ChevronRight size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed top-24 right-4 bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 max-w-sm animate-pulse">
          <div className="flex items-center space-x-3">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        </div>
      )}
      
    </div>
  );
}
