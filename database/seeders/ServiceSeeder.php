<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'nom' => 'Restaurant Gastronomique',
                'description' => 'Découvrez notre restaurant proposant une cuisine locale et internationale préparée par nos chefs reconnus. Service petit-déjeuner, déjeuner et dîner.',
                'prix' => null,
                'categorie' => 'restaurant',
                'image' => 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
                'actif' => true,
            ],
            [
                'nom' => 'Piscine Extérieure',
                'description' => 'Profitez de notre piscine extérieure avec transats et service de plage. Ouverte de 7h à 19h.',
                'prix' => null,
                'categorie' => 'loisir',
                'image' => 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
                'actif' => true,
            ],
            [
                'nom' => 'Centre de Fitness',
                'description' => 'Salle de sport équipée avec coach personnel disponible sur demande. Accès 24h/24 pour les clients.',
                'prix' => null,
                'categorie' => 'fitness',
                'image' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
                'actif' => true,
            ],
            [
                'nom' => 'Spa & Bien-être',
                'description' => 'Offrez-vous un moment de détente avec nos soins traditionnels et modernes. Massages, soins du visage et hydrothérapie.',
                'prix' => 15000,
                'categorie' => 'spa',
                'image' => 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
                'actif' => true,
            ],
            [
                'nom' => 'Navette Aéroport',
                'description' => 'Service de navette privée entre l\'hôtel et l\'aéroport de Cotonou. Réservation obligatoire.',
                'prix' => 10000,
                'categorie' => 'transport',
                'image' => 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
                'actif' => true,
            ],
            [
                'nom' => 'Service de Blanchisserie',
                'description' => 'Service de nettoyage à sec et blanchisserie. Retour en 24h. Service urgent disponible.',
                'prix' => 5000,
                'categorie' => 'service',
                'image' => 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=800&q=80',
                'actif' => true,
            ],
            [
                'nom' => 'Room Service 24h/24',
                'description' => 'Commandez depuis votre chambre à tout moment. Large sélection de plats et boissons.',
                'prix' => null,
                'categorie' => 'service',
                'image' => 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80',
                'actif' => true,
            ],
            [
                'nom' => 'Salle de Conférence',
                'description' => 'Espaces de réunion équipés (projecteur, sonorisation, wifi). Capacité de 10 à 100 personnes.',
                'prix' => 50000,
                'categorie' => 'business',
                'image' => 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
                'actif' => true,
            ],
            [
                'nom' => 'Location de Voiture',
                'description' => 'Service de location de véhicules avec chauffeur ou en libre-service. Réservation en ligne.',
                'prix' => 25000,
                'categorie' => 'transport',
                'image' => 'https://images.unsplash.com/photo-1532408840957-031d8034aeef?w=800&q=80',
                'actif' => true,
            ],
            [
                'nom' => 'Excursions & Tours',
                'description' => 'Découvrez le Bénin avec nos excursions guidées. Palais royaux, temples vaudou, villages traditionnels.',
                'prix' => 20000,
                'categorie' => 'loisir',
                'image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
                'actif' => true,
            ],
            [
                'nom' => 'Garderie & Services Enfants',
                'description' => 'Service de garderie pour les enfants. Jeux et activités adaptés. Sur réservation.',
                'prix' => 8000,
                'categorie' => 'service',
                'image' => 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
                'actif' => true,
            ],
            [
                'nom' => 'Bar & Lounge',
                'description' => 'Bar panoramique avec vue sur la ville. Cocktails signatures et animations musicales.',
                'prix' => null,
                'categorie' => 'restaurant',
                'image' => 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
                'actif' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}

