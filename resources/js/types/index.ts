import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Chambre {
    id: number;
    nom: string;
    type: string;
    description: string;
    prix: number;
    capacite: number;
    lit: number;
    taille: number;
    image: string;
    images: string[];
    equipements: string[];
    localisation: string;
    ville: string;
    note: number;
    avis_count: number;
    disponible: boolean;
    en_vedette: boolean;
    created_at: string;
    updated_at: string;
}

export interface Service {
    id: number;
    nom: string;
    description: string;
    categorie: string;
    icon: string;
    actif: boolean;
    created_at: string;
    updated_at: string;
}

export interface ContactForm {
  nom: string;
  email: string;
  telephone: string;
  sujet: string;
  message: string;
}

export interface Reservation {
    id: number;
    user_id: number;
    chambre_id: number;
    chambre: Chambre;
    nom_client: string;
    prenom_client: string;
    email_client: string;
    telephone_client: string;
    adresse?: string;
    ville?: string;
    demandes_speciales?: string;
    date_arrivee: string;
    date_depart: string;
    nombre_personnes: number;
    nombre_nuits: number;
    prix_par_nuit: number;
    montant_total: number;
    acompte: number;
    statut: 'en_attente' | 'confirmee' | 'annulee' | 'terminee';
    motif_annulation?: string;
    created_at: string;
    updated_at: string;
}
