<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chambre;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    /**
     * Display a listing of the user's reservations.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        $reservations = Reservation::with('chambre')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $reservations,
        ]);
    }

    /**
     * Store a newly created reservation.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'chambre_id' => 'required|exists:chambres,id',
            'nom_client' => 'required|string|max:255',
            'prenom_client' => 'required|string|max:255',
            'email_client' => 'required|email|max:255',
            'telephone_client' => 'required|string|max:20',
            'adresse' => 'nullable|string|max:255',
            'ville' => 'nullable|string|max:255',
            'demandes_speciales' => 'nullable|string',
            'date_arrivee' => 'required|date|after_or_equal:today',
            'date_depart' => 'required|date|after:date_arrivee',
            'nombre_personnes' => 'required|integer|min:1',
        ]);

        // Get the room
        $chambre = Chambre::findOrFail($validated['chambre_id']);

        // Check availability
        if (!$chambre->disponible) {
            return response()->json([
                'success' => false,
                'message' => 'Cette chambre n\'est pas disponible',
            ], 400);
        }

        // Check for conflicting dates
        $conflictingReservation = Reservation::where('chambre_id', $chambre->id)
            ->where('statut', '!=', 'annulee')
            ->where(function ($query) use ($validated) {
                $query->whereBetween('date_arrivee', [$validated['date_arrivee'], $validated['date_depart']])
                    ->orWhereBetween('date_depart', [$validated['date_arrivee'], $validated['date_depart']])
                    ->orWhere(function ($query) use ($validated) {
                        $query->where('date_arrivee', '<=', $validated['date_arrivee'])
                            ->where('date_depart', '>=', $validated['date_depart']);
                    });
            })
            ->exists();

        if ($conflictingReservation) {
            return response()->json([
                'success' => false,
                'message' => 'Ces dates ne sont pas disponibles pour cette chambre',
            ], 400);
        }

        // Calculate nights and total price
        $dateArrivee = new \DateTime($validated['date_arrivee']);
        $dateDepart = new \DateTime($validated['date_depart']);
        $nombreNuits = $dateDepart->diff($dateArrivee)->days;
        $montantTotal = $chambre->prix * $nombreNuits;

        // Create reservation
        $reservation = Reservation::create([
            'user_id' => Auth::id() ?? 1, // Use authenticated user or default
            'chambre_id' => $validated['chambre_id'],
            'nom_client' => $validated['nom_client'],
            'prenom_client' => $validated['prenom_client'],
            'email_client' => $validated['email_client'],
            'telephone_client' => $validated['telephone_client'],
            'adresse' => $validated['adresse'] ?? null,
            'ville' => $validated['ville'] ?? null,
            'demandes_speciales' => $validated['demandes_speciales'] ?? null,
            'date_arrivee' => $validated['date_arrivee'],
            'date_depart' => $validated['date_depart'],
            'nombre_personnes' => $validated['nombre_personnes'],
            'nombre_nuits' => $nombreNuits,
            'prix_par_nuit' => $chambre->prix,
            'montant_total' => $montantTotal,
            'statut' => 'en_attente',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Réservation créée avec succès',
            'data' => $reservation->load('chambre'),
        ], 201);
    }

    /**
     * Display the specified reservation.
     */
    public function show(int $id): JsonResponse
    {
        $reservation = Reservation::with('chambre', 'payments')->findOrFail($id);

        // Check ownership
        if ($reservation->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé',
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $reservation,
        ]);
    }

    /**
     * Cancel the specified reservation.
     */
    public function cancel(Request $request, int $id): JsonResponse
    {
        $reservation = Reservation::findOrFail($id);

        // Check ownership
        if ($reservation->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé',
            ], 403);
        }

        if (!$reservation->canBeCancelled()) {
            return response()->json([
                'success' => false,
                'message' => 'Cette réservation ne peut pas être annulée',
            ], 400);
        }

        $validated = $request->validate([
            'motif_annulation' => 'required|string',
        ]);

        $reservation->update([
            'statut' => 'annulee',
            'motif_annulation' => $validated['motif_annulation'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Réservation annulée avec succès',
            'data' => $reservation,
        ]);
    }
}

