import React, { useState, useEffect } from 'react';
import { BedDouble, MapPin, Star, Users, CalendarDays, Loader2, CheckCircle, AlertCircle, X, ChevronRight, Search } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem, Chambre } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Chambres',
        href: '/dashboard/chambres',
    },
];

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

function formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
}

export default function ChambresPage() {
    const [chambres, setChambres] = useState<Chambre[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterVille, setFilterVille] = useState('all');
    const [filterPrice, setFilterPrice] = useState('all');

    // Modal
    const [showModal, setShowModal] = useState(false);
    const [selectedChambre, setSelectedChambre] = useState<Chambre | null>(null);
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
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        fetchChambres();
    }, []);

    const fetchChambres = async () => {
        try {
            setLoading(true);
            setError(null);
            const params = new URLSearchParams();
            if (filterType !== 'all') params.append('type', filterType);
            if (filterVille !== 'all') params.append('ville', filterVille);
            if (filterPrice !== 'all') {
                const [min, max] = filterPrice.split('-').map(Number);
                if (!isNaN(min)) params.append('min_prix', min.toString());
                if (!isNaN(max)) params.append('max_prix', max.toString());
            }
            
            const response = await fetch(`/api/chambres?disponible=true&${params}`);
            const data = await response.json();
            setChambres(data.data || data || []);
        } catch (err) {
            setError('Erreur chargement chambres');
        } finally {
            setLoading(false);
        }
    };

    const filteredChambres = chambres.filter(chambre => 
        chambre.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chambre.ville.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleReserve = (chambre: Chambre) => {
        setSelectedChambre(chambre);
        setReservationForm({ 
            ...reservationForm, 
            ville: chambre.ville,
            nombre_personnes: 2 
        });
        setShowModal(true);
        setSubmitSuccess(false);
        setSubmitError(null);
    };

    const handleSubmitReservation = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedChambre) return;

        setSubmitting(true);
        try {
            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                },
                body: JSON.stringify({
                    ...reservationForm,
                    chambre_id: selectedChambre.id,
                }),
            });
            
            const data = await response.json();
            if (data.success) {
                setSubmitSuccess(true);
                fetchChambres(); // Refresh list
            } else {
                setSubmitError(data.message || 'Erreur');
            }
        } catch {
            setSubmitError('Erreur connexion');
        } finally {
            setSubmitting(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedChambre(null);
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
    };

    if (loading) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-12 h-12 animate-spin text-orange-600 mr-4" />
                    <span>Chargement...</span>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Chambres" />
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <h1 className="text-2xl font-bold">Nos Chambres ({chambres.length})</h1>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                placeholder="Rechercher..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border focus:border-orange-500 focus:outline-none"
                            />
                        </div>
                        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="p-3 rounded-xl border focus:border-orange-500">
                            <option value="all">Type</option>
                            <option value="standard">Standard</option>
                            <option value="deluxe">Deluxe</option>
                            <option value="suite">Suite</option>
                            <option value="familiale">Familiale</option>
                        </select>
                        <select value={filterVille} onChange={(e) => setFilterVille(e.target.value)} className="p-3 rounded-xl border focus:border-orange-500">
                            <option value="all">Ville</option>
                            <option value="Cotonou">Cotonou</option>
                            <option value="Porto-Novo">Porto-Novo</option>
                        </select>
                        <select value={filterPrice} onChange={(e) => setFilterPrice(e.target.value)} className="p-3 rounded-xl border focus:border-orange-500">
                            <option value="all">Prix</option>
                            <option value="0-20000">Budget</option>
                            <option value="20000-40000">Moyen</option>
                            <option value="40000+">Premium</option>
                        </select>
                    </div>
                    <button onClick={fetchChambres} className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all">Filtrer</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredChambres.map((chambre) => (
                        <div key={chambre.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all p-6">
                            <img src={chambre.image} alt={chambre.nom} className="w-full h-48 object-cover rounded-xl mb-4" />
                            <h3 className="font-bold text-lg mb-2">{chambre.nom}</h3>
                            <p className="text-gray-600 mb-4">{chambre.type} • {chambre.capacite} pers. • {chambre.taille} m²</p>
                            <div className="flex items-center gap-2 mb-4">
                                <Star className="text-yellow-400 fill-yellow-400" size={16} />
                                <span>{chambre.note} ({chambre.avis_count})</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-orange-600">{formatPrice(chambre.prix)}/nuit</span>
                                <button 
                                    onClick={() => handleReserve(chambre)}
                                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all font-semibold"
                                >
                                    Réserver
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredChambres.length === 0 && (
                    <div className="text-center py-12">
                        <BedDouble className="mx-auto text-gray-300 mb-4" size={48} />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucune chambre trouvée</h3>
                        <p className="text-gray-500">Ajustez vos filtres</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && selectedChambre && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-bold">Réserver {selectedChambre.nom}</h2>
                            <button onClick={closeModal} className="absolute top-6 right-6 text-gray-500 hover:text-gray-700">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmitReservation} className="p-6 space-y-4">
                            <input required type="text" placeholder="Nom" value={reservationForm.nom_client} onChange={(e) => setReservationForm({...reservationForm, nom_client: e.target.value})} className="w-full p-3 border rounded-lg" />
                            <input required type="text" placeholder="Prénom" value={reservationForm.prenom_client} onChange={(e) => setReservationForm({...reservationForm, prenom_client: e.target.value})} className="w-full p-3 border rounded-lg" />
                            <input required type="email" placeholder="Email" value={reservationForm.email_client} onChange={(e) => setReservationForm({...reservationForm, email_client: e.target.value})} className="w-full p-3 border rounded-lg" />
                            <input required type="tel" placeholder="Téléphone" value={reservationForm.telephone_client} onChange={(e) => setReservationForm({...reservationForm, telephone_client: e.target.value})} className="w-full p-3 border rounded-lg" />
                            <input type="date" required value={reservationForm.date_arrivee} onChange={(e) => setReservationForm({...reservationForm, date_arrivee: e.target.value})} className="w-full p-3 border rounded-lg" />
                            <input type="date" required value={reservationForm.date_depart} onChange={(e) => setReservationForm({...reservationForm, date_depart: e.target.value})} className="w-full p-3 border rounded-lg" />
                            <select value={reservationForm.nombre_personnes} onChange={(e) => setReservationForm({...reservationForm, nombre_personnes: parseInt(e.target.value)})} className="w-full p-3 border rounded-lg">
                                <option value="1">1 personne</option>
                                <option value="2">2 personnes</option>
                                <option value="3">3 personnes</option>
                                <option value="4">4 personnes</option>
                            </select>
                            <textarea placeholder="Demandes spéciales" value={reservationForm.demandes_speciales} onChange={(e) => setReservationForm({...reservationForm, demandes_speciales: e.target.value})} className="w-full p-3 border rounded-lg h-24" />
                            <button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50">
                                {submitting ? 'Envoi...' : 'Confirmer réservation'}
                            </button>
                            {submitError && <div className="p-3 bg-red-100 text-red-700 rounded-lg">{submitError}</div>}
                            {submitSuccess && <div className="p-3 bg-green-100 text-green-700 rounded-lg">Réservation créée !</div>}
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

