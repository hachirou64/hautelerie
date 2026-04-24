import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Shield, Bell, CreditCard, Camera, Save, Eye, EyeOff } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Mon Profil',
        href: '/dashboard/profil',
    },
];

export default function ProfilPage() {
    const [activeTab, setActiveTab] = useState('informations');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: 'Jean',
        lastName: 'Kouassi',
        email: 'jean.kouassi@email.com',
        phone: '+229 97 12 34 56',
        address: 'Cotonou, Benin',
        dateOfBirth: '1990-05-15',
        nationality: 'Béninoise',
        city: 'Cotonou'
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const tabs = [
        { id: 'informations', label: 'Informations', icon: User },
        { id: 'securite', label: 'Sécurité', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'paiements', label: 'Moyens de paiement', icon: CreditCard }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mon Profil" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Mon Profil</h1>
                        <p className="text-gray-500">Gérez vos informations personnelles</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                            <div className="relative inline-block mb-4">
                                <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center mx-auto">
                                    <span className="text-4xl font-bold text-orange-600">JK</span>
                                </div>
                                <button className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                                    <Camera size={18} />
                                </button>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800">{formData.firstName} {formData.lastName}</h2>
                            <p className="text-gray-500 mb-4">{formData.email}</p>
                            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <span>Compte vérifié</span>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6">
                            <h3 className="font-semibold text-gray-800 mb-4">Statistiques</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Réservations</span>
                                    <span className="font-bold text-gray-800">12</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Nuits</span>
                                    <span className="font-bold text-gray-800">28</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Dépensé</span>
                                    <span className="font-bold text-orange-600">450,000 FCfa</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Tabs */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="flex overflow-x-auto border-b border-gray-100">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                                            activeTab === tab.id
                                            ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50/50'
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        <tab.icon size={18} />
                                        <span>{tab.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="p-6">
                                {/* Informations Tab */}
                                {activeTab === 'informations' && (
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-gray-800">Informations Personnelles</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        type="text"
                                                        value={formData.firstName}
                                                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        type="text"
                                                        value={formData.lastName}
                                                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance</label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        type="date"
                                                        value={formData.dateOfBirth}
                                                        onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Nationalité</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        type="text"
                                                        value={formData.nationality}
                                                        onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                                                    />
                                                </div>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        type="text"
                                                        value={formData.address}
                                                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end pt-4">
                                            <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center space-x-2">
                                                <Save size={18} />
                                                <span>Enregistrer</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Sécurité Tab */}
                                {activeTab === 'securite' && (
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-gray-800">Modifier le mot de passe</h3>
                                        <div className="max-w-md space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
                                                <div className="relative">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        value={passwordData.currentPassword}
                                                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                                        className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={passwordData.newPassword}
                                                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                                    className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={passwordData.confirmPassword}
                                                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                                    className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end pt-4">
                                            <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center space-x-2">
                                                <Save size={18} />
                                                <span>Mettre à jour</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Notifications Tab */}
                                {activeTab === 'notifications' && (
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-gray-800">Préférences de notifications</h3>
                                        <div className="space-y-4">
                                            {[
                                                { id: 'email_reservation', label: 'Notifications de réservation', description: 'Recevoir un email lors d\'une nouvelle réservation' },
                                                { id: 'email_payment', label: 'Notifications de paiement', description: 'Recevoir un email lors d\'un paiement' },
                                                { id: 'email_promo', label: 'Offres promotionnelles', description: 'Recevoir des offres spéciales et promotions' },
                                                { id: 'sms_reservation', label: 'SMS de rappel', description: 'Recevoir un SMS la veille de votre arrivée' }
                                            ].map((item) => (
                                                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                                    <div>
                                                        <p className="font-medium text-gray-800">{item.label}</p>
                                                        <p className="text-sm text-gray-500">{item.description}</p>
                                                    </div>
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" defaultChecked={item.id !== 'email_promo'} />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Moyens de paiement Tab */}
                                {activeTab === 'paiements' && (
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-gray-800">Moyens de paiement enregistrés</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                                                        VISA
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-800">•••• •••• •••• 4242</p>
                                                        <p className="text-sm text-gray-500">Expire 12/25</p>
                                                    </div>
                                                </div>
                                                <span className="text-green-600 text-sm font-medium">Par défaut</span>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">
                                                        MOMO
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-800">+229 97 12 34 56</p>
                                                        <p className="text-sm text-gray-500">Mobile Money</p>
                                                    </div>
                                                </div>
                                                <button className="text-orange-600 text-sm font-medium hover:underline">Définir par défaut</button>
                                            </div>
                                        </div>
                                        <button className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-gray-500 hover:border-orange-500 hover:text-orange-600 transition-colors">
                                            + Ajouter un moyen de paiement
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

