<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    /**
     * Display a listing of the user's payments.
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        
        $payments = Payment::with('reservation.chambre')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $payments,
        ]);
    }

    /**
     * Store a newly created payment.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'reservation_id' => 'required|exists:reservations,id',
            'montant' => 'required|numeric|min:0',
            'methode' => 'required|in:mobile_money,carte_bancaire',
            'operateur' => 'nullable|in:mtn,moov',
            'numero_telephone' => 'nullable|string|max:20',
            'numero_carte' => 'nullable|string|max:4',
        ]);

        // Get the reservation
        $reservation = Reservation::findOrFail($validated['reservation_id']);

        // Check ownership
        if ($reservation->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé',
            ], 403);
        }

        // Verify amount matches
        if (floatval($validated['montant']) !== floatval($reservation->montant_total)) {
            return response()->json([
                'success' => false,
                'message' => 'Le montant ne correspond pas au montant de la réservation',
            ], 400);
        }

        // Create payment (in a real app, this would integrate with payment gateway)
        $payment = Payment::create([
            'reservation_id' => $validated['reservation_id'],
            'user_id' => Auth::id(),
            'montant' => $validated['montant'],
            'methode' => $validated['methode'],
            'operateur' => $validated['operateur'] ?? null,
            'numero_telephone' => $validated['numero_telephone'] ?? null,
            'numero_carte' => $validated['numero_carte'] ?? null,
            'statut' => 'en_attente',
            'reference_payment' => 'PAY-' . strtoupper(uniqid()),
        ]);

        // Simulate payment processing (in production, integrate with payment gateway)
        // For demo purposes, we'll mark as validated
        $payment->update([
            'statut' => 'valide',
            'date_paiement' => now(),
            'transaction_id' => 'TXN-' . strtoupper(uniqid()),
        ]);

        // Update reservation status
        $reservation->update([
            'statut' => 'confirmee',
            'acompte' => $validated['montant'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Paiement effectué avec succès',
            'data' => $payment->load('reservation'),
        ], 201);
    }

    /**
     * Display the specified payment.
     */
    public function show(int $id): JsonResponse
    {
        $payment = Payment::with('reservation.chambre')->findOrFail($id);

        // Check ownership
        if ($payment->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé',
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $payment,
        ]);
    }

    /**
     * Process mobile money payment (initiate).
     */
    public function initiateMobileMoney(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'reservation_id' => 'required|exists:reservations,id',
            'operateur' => 'required|in:mtn,moov',
            'numero_telephone' => 'required|string|max:20',
        ]);

        $reservation = Reservation::findOrFail($validated['reservation_id']);

        // Check ownership
        if ($reservation->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé',
            ], 403);
        }

        // In production, integrate with MTN/Moov API here
        // For demo, create pending payment
        $payment = Payment::create([
            'reservation_id' => $validated['reservation_id'],
            'user_id' => Auth::id(),
            'montant' => $reservation->montant_total,
            'methode' => 'mobile_money',
            'operateur' => $validated['operateur'],
            'numero_telephone' => $validated['numero_telephone'],
            'statut' => 'en_attente',
            'reference_payment' => 'PAY-MM-' . strtoupper(uniqid()),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Demande de paiement envoyée. Veuillez confirmer sur votre téléphone.',
            'data' => [
                'payment_id' => $payment->id,
                'reference' => $payment->reference_payment,
                'montant' => $payment->montant,
                'operateur' => $payment->operateur,
            ],
        ]);
    }

    /**
     * Process card payment (initiate).
     */
    public function initiateCardPayment(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'reservation_id' => 'required|exists:reservations,id',
            'numero_carte' => 'required|string|max:4',
        ]);

        $reservation = Reservation::findOrFail($validated['reservation_id']);

        // Check ownership
        if ($reservation->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé',
            ], 403);
        }

        // In production, integrate with payment gateway here
        // For demo, create pending payment
        $payment = Payment::create([
            'reservation_id' => $validated['reservation_id'],
            'user_id' => Auth::id(),
            'montant' => $reservation->montant_total,
            'methode' => 'carte_bancaire',
            'numero_carte' => $validated['numero_carte'],
            'statut' => 'en_attente',
            'reference_payment' => 'PAY-CARD-' . strtoupper(uniqid()),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Paiement par carte initié',
            'data' => [
                'payment_id' => $payment->id,
                'reference' => $payment->reference_payment,
                'montant' => $payment->montant,
            ],
        ]);
    }
}

