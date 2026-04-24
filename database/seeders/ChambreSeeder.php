<?php

namespace Database\Seeders;

use App\Models\Chambre;
use Illuminate\Database\Seeder;

class ChambreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $chambres = [
            [
                'nom' => 'Hôtel Royal Palm',
                'type' => 'deluxe',
                'description' => 'Profitez d\'un séjour luxueux dans notre Chambre Deluxe spacieuse et élégamment décorée. Cette chambre offre une vue imprenable sur la ville de Cotonou et dispose de tout le confort moderne pour rendre votre séjour inoubliable. Idéale pour les voyageurs d\'affaires et les touristes recherchant l\'excellence.',
                'prix' => 35000,
                'capacite' => 2,
                'lit' => '1 lit King Size (180 cm x 200 cm)',
                'taille' => '32 m²',
                'image' => 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
                    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80',
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
                ]),
                'equipements' => json_encode([
                    'wifi' => 'Wi-Fi gratuit haute vitesse',
                    'ac' => 'Climatisation',
                    'tv' => 'TV écran plat 55 pouces',
                    'breakfast' => 'Petit-déjeuner buffet inclus',
                    'minibar' => 'Minibar',
                    'safe' => 'Coffre-fort',
                ]),
                'localisation' => 'Quartier des Affaires, Cotonou',
                'ville' => 'Cotonou',
                'note' => 4.8,
                'avis_count' => 156,
                'disponible' => true,
                'en_vedette' => true,
            ],
            [
                'nom' => 'Grand Hôtel du Bénin',
                'type' => 'suite',
                'description' => 'Notre Suite Exécutive offre un espace de vie premium avec salon privé, chambre spacieuse et salle de bain luxueuse. Parfait pour les séjours longs ou les voyages d\'affaires nécessitant un espace de travail confortable.',
                'prix' => 28000,
                'capacite' => 3,
                'lit' => '1 lit Queen Size + 1 canapé-lit',
                'taille' => '45 m²',
                'image' => 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
                    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',
                ]),
                'equipements' => json_encode([
                    'wifi' => 'Wi-Fi gratuit',
                    'ac' => 'Climatisation',
                    'tv' => 'TV écran plat',
                    'breakfast' => 'Petit-déjeuner inclus',
                    'pool' => 'Piscine',
                ]),
                'localisation' => 'Centre-ville, Porto-Novo',
                'ville' => 'Porto-Novo',
                'note' => 4.6,
                'avis_count' => 89,
                'disponible' => true,
                'en_vedette' => false,
            ],
            [
                'nom' => 'Azalai Hôtel',
                'type' => 'standard',
                'description' => 'Chambre Standard confortable avec toutes les commodités essentielles. Idéal pour les voyageurs recherchant un hébergement de qualité à un prix abordable.',
                'prix' => 22000,
                'capacite' => 2,
                'lit' => '2 lits simples',
                'taille' => '24 m²',
                'image' => 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80',
                ]),
                'equipements' => json_encode([
                    'wifi' => 'Wi-Fi gratuit',
                    'ac' => 'Climatisation',
                    'tv' => 'TV écran plat',
                ]),
                'localisation' => 'Bord de mer, Cotonou',
                'ville' => 'Cotonou',
                'note' => 4.9,
                'avis_count' => 234,
                'disponible' => true,
                'en_vedette' => false,
            ],
            [
                'nom' => 'Hôtel du Port',
                'type' => 'double',
                'description' => 'Chambre Double avec vue sur le port de Cotonou. Profitez d\'un cadre paisible avec accès facile aux attractions locales.',
                'prix' => 18500,
                'capacite' => 2,
                'lit' => '1 lit Double',
                'taille' => '28 m²',
                'image' => 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80',
                ]),
                'equipements' => json_encode([
                    'wifi' => 'Wi-Fi gratuit',
                    'tv' => 'TV',
                    'breakfast' => 'Petit-déjeuner inclus',
                ]),
                'localisation' => 'Zone portuaire, Cotonou',
                'ville' => 'Cotonou',
                'note' => 4.5,
                'avis_count' => 67,
                'disponible' => true,
                'en_vedette' => false,
            ],
            [
                'nom' => 'Résidence Bénin Marina',
                'type' => 'suite',
                'description' => 'Studio Premium avec vue sur la marina. Cuisine équipée, salon spacieux et terrasse privée. L\'endroit idéal pour les séjours longs.',
                'prix' => 42000,
                'capacite' => 2,
                'lit' => '1 lit King Size',
                'taille' => '55 m²',
                'image' => 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
                    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',
                ]),
                'equipements' => json_encode([
                    'wifi' => 'Wi-Fi gratuit',
                    'ac' => 'Climatisation',
                    'tv' => 'TV écran plat',
                    'breakfast' => 'Petit-déjeuner inclus',
                    'pool' => 'Piscine',
                    'gym' => 'Salle de sport',
                ]),
                'localisation' => 'Marina, Cotonou',
                'ville' => 'Cotonou',
                'note' => 4.7,
                'avis_count' => 112,
                'disponible' => true,
                'en_vedette' => true,
            ],
            [
                'nom' => 'Hôtel Le Méridien',
                'type' => 'familiale',
                'description' => 'Chambre Familiale spacieuse pouvant accueillir jusqu\'à 4 personnes. Lit Queen + 2 lits simples, idéale pour les familles.',
                'prix' => 32000,
                'capacite' => 4,
                'lit' => '1 lit Queen + 2 lits simples',
                'taille' => '40 m²',
                'image' => 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80',
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=1200&q=80',
                ]),
                'equipements' => json_encode([
                    'wifi' => 'Wi-Fi gratuit',
                    'ac' => 'Climatisation',
                    'tv' => 'TV écran plat',
                    'breakfast' => 'Petit-déjeuner inclus',
                ]),
                'localisation' => 'Akpakpa, Cotonou',
                'ville' => 'Cotonou',
                'note' => 4.4,
                'avis_count' => 95,
                'disponible' => true,
                'en_vedette' => false,
            ],
            [
                'nom' => 'Hôtel La Pearl',
                'type' => 'deluxe',
                'description' => 'Chambre Deluxe avec vue sur la lagune. Décoration moderne, balcony privé et accès au spa de l\'hôtel.',
                'prix' => 38000,
                'capacite' => 2,
                'lit' => '1 lit King Size',
                'taille' => '35 m²',
                'image' => 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
                ]),
                'equipements' => json_encode([
                    'wifi' => 'Wi-Fi gratuit',
                    'ac' => 'Climatisation',
                    'tv' => 'TV écran plat',
                    'breakfast' => 'Petit-déjeuner inclus',
                    'spa' => 'Spa',
                ]),
                'localisation' => 'Cotonou, Face à la Marina',
                'ville' => 'Cotonou',
                'note' => 4.9,
                'avis_count' => 178,
                'disponible' => true,
                'en_vedette' => true,
            ],
            [
                'nom' => 'Hôtel Bohicon',
                'type' => 'standard',
                'description' => 'Chambre Standard économique mais confortable. Parfait pour les budgets serrés sans compromis sur la propreté.',
                'prix' => 15000,
                'capacite' => 2,
                'lit' => '1 lit Double',
                'taille' => '20 m²',
                'image' => 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
                'images' => json_encode([
                    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80',
                ]),
                'equipements' => json_encode([
                    'wifi' => 'Wi-Fi',
                    'tv' => 'TV',
                ]),
                'localisation' => 'Centre-ville, Bohicon',
                'ville' => 'Bohicon',
                'note' => 4.2,
                'avis_count' => 45,
                'disponible' => true,
                'en_vedette' => false,
            ],
        ];

        foreach ($chambres as $chambre) {
            Chambre::create($chambre);
        }
    }
}

