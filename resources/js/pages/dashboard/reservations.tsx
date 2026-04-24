import React, { useState, useEffect } from 'react';
import { CalendarDays, BedDouble, MapPin, Filter, Search, Eye, Loader2, Check } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import type { BreadcrumbItem, Reservation } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Mes Réservations',
        href: '/dashboard/reservations',
    },
];

const STATUT_MAP = {
    'en_attente': { label: 'En attente', class: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    'confirmee': { label: 'Confirmée', class: 'bg-green-100 text-green-700 border-green-200' },
    'annulee': { label: 'Annulée', class: 'bg-red-100 text-red-700 border-red-200' },
    'terminee': { label: 'Terminée', class: 'bg-blue-100 text-blue-700 border-blue-200' },
};

const PAYMENT_MAP = {
    paid: { label: 'Payé', class: 'text-green-600' },
    pending: { label: 'En attente', class: 'text-yellow-600' },
    refunded: { label: 'Remboursé', class: 'text-gray-600' },
};

function formatPrice(amount: number): string {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
}

function formatDate(dateString: string): string {
    return new Intl.DateTimeFormat('fr-FR', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
    }).format(new Date(dateString));
}

export default function ReservationsPage() {
    const [filter, setFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { auth } = usePage().props as any;

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch('/api/reservations', {
                    headers: {
                        'Accept': 'application/json',
                        'X-XSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Erreur chargement réservations');
                }

                const data = await response.json();
                if (data.success) {
                    setReservations(data.data || []);
                } else {
                    setError(data.message || 'Aucune donnée');
                }
            } catch (err) {
                setError('Erreur réseau. Vérifiez connexion.');
                console.error('Reservations fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    const filteredReservations = reservations.filter(res => {
        const matchesFilter = filter === 'all' || res.statut === filter;
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = res.nom_client.toLowerCase().includes(searchLower) ||
                            res.chambre.nom.toLowerCase().includes(searchLower) ||
                            res.id.toString().includes(searchTerm);
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="flex items-center justify-center py-24">
                    <Loader2 className="w-12 h-12 animate-spin text-orange-600 mr-4" />
                    <span className="text-xl text-gray-600">Chargement des réservations...</span>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mes Réservations" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Mes Réservations ({reservations.length})
                        </h1>
                        <p className="text-gray-500">Gérez vos réservations en ligne</p>
                    </div>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800">
                        <div className="flex items-center space-x-3">
                            <Loader2 size={20} className="animate-spin" />
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Rechercher (nom, hôtel, ID...)"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Filter className="text-gray-400" size={20} />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="px-4 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="en_attente">En attente</option>
                                <option value="confirmee">Confirmée</option>
                                <option value="terminee">Terminée</option>
                                <option value="annulee">Annulée</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Reservations List */}
                <div className="space-y-4">
                    {filteredReservations.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                            <CalendarDays className="mx-auto text-gray-300 mb-6" size={64} />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucune réservation trouvée</h3>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                {reservations.length === 0 
                                    ? "Commencez par réserver une chambre depuis l'accueil."
                                    : "Essayez de modifier vos filtres de recherche."
                                }
                            </p>
                            <a href="/" className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all">
                                <CalendarDays size={20} />
                                <span>Faire une réservation</span>
                            </a>
                        </div>
                    ) : (
                        filteredReservations.map((reservation) => (
                            <div key={reservation.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
                                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                    {/* Chambre Image */}
                                    <div className="w-full lg:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                                        <img 
                                            src={reservation.chambre.image} 
                                            alt={reservation.chambre.nom}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 group-hover:scale-105"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400';
                                            }}
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 truncate" title={reservation.chambre.nom}>
                                                    {reservation.chambre.nom}
                                                </h3>
                                                <p className="text-gray-600 truncate max-w-md" title={`${reservation.chambre.type} • ${reservation.nom_client} ${reservation.prenom_client}`}>
                                                    {reservation.chambre.type} • {reservation.nom_client} {reservation.prenom_client}
                                                </p>
                                            </div>
                                            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border whitespace-nowrap ${STATUT_MAP[reservation.statut].class}`}>
                                                {STATUT_MAP[reservation.statut].label}
                                            </span>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 text-sm">
                                            <div className="flex items-center space-x-2 text-gray-700 bg-gray-50 px-4 py-3 rounded-xl">
                                                <CalendarDays size={16} className="text-orange-500 flex-shrink-0" />
                                                <span>Arrivée: {formatDate(reservation.date_arrivee)}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-gray-700 bg-gray-50 px-4 py-3 rounded-xl">
                                                <CalendarDays size={16} className="text-red-500 flex-shrink-0" />
                                                <span>Départ: {formatDate(reservation.date_depart)}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-gray-700 bg-gray-50 px-4 py-3 rounded-xl">
                                                <BedDouble size={16} className="text-blue-500 flex-shrink-0" />
                                                <span>{reservation.nombre_personnes} pers. • {reservation.nombre_nuits} nuit(s)</span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-gray-700 bg-gray-50 px-4 py-3 rounded-xl">
                                                <MapPin size={16} className="text-green-500 flex-shrink-0" />
                                                <span className="truncate" title={reservation.chambre.ville}>{reservation.chambre.ville}</span>
                                            </div>
                                        </div>

                                        {reservation.demandes_speciales && (
                                            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                                                <p className="text-sm text-orange-800 italic">
                                                    <strong>Notes:</strong> {reservation.demandes_speciales}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Price & Actions */}
                                    <div className="flex flex-col items-end gap-4 lg:w-48 shrink-0 mt-auto">
                                        <div className="text-right bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100">
                                            <p className="text-2xl font-bold text-orange-600">
                                                {formatPrice(reservation.montant_total)}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {reservation.nombre_nuits} × {formatPrice(reservation.prix_par_nuit)}/nuit
                                            </p>
                                        </div>
                                        <div className="flex gap-2 w-full">
                                            <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2">
                                                <Eye size={18} />
                                                <span>Détails</span>
                                            </button>
                                            {reservation.statut === 'en_attente' && (
                                                <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2">
                                                    <Check size={18} />
                                                    <span>Payer</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

