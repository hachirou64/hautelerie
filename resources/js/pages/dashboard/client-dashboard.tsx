import React from 'react';
import { BedDouble, CalendarDays, CreditCard, TrendingUp, Users, Star, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative';
    icon: React.ReactNode;
    color: string;
}

function StatCard({ title, value, change, changeType, icon, color }: StatCardProps) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
                    <div className={`flex items-center mt-2 text-sm ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                        {changeType === 'positive' ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                        <span>{change}</span>
                    </div>
                </div>
                <div className={`p-4 rounded-2xl ${color}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

interface RecentReservationProps {
    id: string;
    hotel: string;
    room: string;
    date: string;
    status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
    amount: string;
}

function RecentReservation({ reservation }: { reservation: RecentReservationProps }) {
    const statusStyles = {
        confirmed: 'bg-green-100 text-green-700',
        pending: 'bg-yellow-100 text-yellow-700',
        cancelled: 'bg-red-100 text-red-700',
        completed: 'bg-blue-100 text-blue-700'
    };

    const statusLabels = {
        confirmed: 'Confirmée',
        pending: 'En attente',
        cancelled: 'Annulée',
        completed: 'Terminée'
    };

    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center">
                    <BedDouble className="text-orange-600" size={24} />
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800">{reservation.hotel}</h4>
                    <p className="text-sm text-gray-500">{reservation.room}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-sm text-gray-500">{reservation.date}</p>
                <p className="font-semibold text-gray-800">{reservation.amount}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[reservation.status]}`}>
                {statusLabels[reservation.status]}
            </span>
        </div>
    );
}

export default function ClientDashboard() {
    const stats: StatCardProps[] = [
        {
            title: 'Réservations Totales',
            value: '12',
            change: '+2 ce mois',
            changeType: 'positive',
            icon: <CalendarDays className="text-orange-600" size={24} />,
            color: 'bg-orange-100'
        },
        {
            title: 'Nuits Passées',
            value: '28',
            change: '+5 ce mois',
            changeType: 'positive',
            icon: <BedDouble className="text-red-600" size={24} />,
            color: 'bg-red-100'
        },
        {
            title: 'Montant Dépensé',
            value: '450,000',
            change: '+15% ce mois',
            changeType: 'positive',
            icon: <CreditCard className="text-green-600" size={24} />,
            color: 'bg-green-100'
        },
        {
            title: 'Note Moyenne',
            value: '4.8',
            change: '+0.2 ce mois',
            changeType: 'positive',
            icon: <Star className="text-yellow-600" size={24} />,
            color: 'bg-yellow-100'
        }
    ];

    const recentReservations: RecentReservationProps[] = [
        {
            id: '1',
            hotel: 'Hôtel Royal Palm',
            room: 'Suite Deluxe',
            date: '15 - 18 Mars 2024',
            status: 'confirmed',
            amount: '75,000 FCfa'
        },
        {
            id: '2',
            hotel: 'Grand Hôtel du Bénin',
            room: 'Chambre Standard',
            date: '01 - 03 Mars 2024',
            status: 'completed',
            amount: '37,000 FCfa'
        },
        {
            id: '3',
            hotel: 'Azalai Hôtel',
            room: 'Chambre VIP',
            date: '20 - 22 Février 2024',
            status: 'completed',
            amount: '64,000 FCfa'
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Client" />
            
            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white">
                    <h1 className="text-3xl font-bold mb-2">Bienvenue, Jean!</h1>
                    <p className="text-orange-100">Voici un aperçu de votre activité chez HotelBénin</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 text-left group">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <CalendarDays className="text-orange-600" size={24} />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">Nouvelle Réservation</h3>
                        <p className="text-sm text-gray-500">Réserver une chambre</p>
                    </button>
                    
                    <button className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 text-left group">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <CreditCard className="text-green-600" size={24} />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">Historique</h3>
                        <p className="text-sm text-gray-500">Voir mes paiements</p>
                    </button>
                    
                    <button className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 text-left group">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Star className="text-blue-600" size={24} />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-1">Avis</h3>
                        <p className="text-sm text-gray-500">Laisser un avis</p>
                    </button>
                </div>

                {/* Recent Reservations */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Réservations Récentes</h2>
                        <button className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
                            Voir tout
                        </button>
                    </div>
                    <div className="space-y-4">
                        {recentReservations.map((reservation) => (
                            <RecentReservation key={reservation.id} reservation={reservation} />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

