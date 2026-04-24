<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Store a newly created contact message.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telephone' => 'nullable|string|max:20',
            'sujet' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $contact = Contact::create([
            'nom' => $validated['nom'],
            'email' => $validated['email'],
            'telephone' => $validated['telephone'] ?? null,
            'sujet' => $validated['sujet'] ?? null,
            'message' => $validated['message'],
            'statut' => 'non_lu',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
            'data' => $contact,
        ], 201);
    }

    /**
     * Display a listing of contact messages (admin only).
     */
    public function index(Request $request): JsonResponse
    {
        $query = Contact::query();

        // Filter by status
        if ($request->has('statut') && $request->statut) {
            $query->statut($request->statut);
        }

        $contacts = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $contacts,
        ]);
    }

    /**
     * Display the specified contact message.
     */
    public function show(int $id): JsonResponse
    {
        $contact = Contact::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $contact,
        ]);
    }

    /**
     * Mark the contact as read.
     */
    public function markAsRead(int $id): JsonResponse
    {
        $contact = Contact::findOrFail($id);
        $contact->markAsRead();

        return response()->json([
            'success' => true,
            'message' => 'Message marqué comme lu',
            'data' => $contact,
        ]);
    }

    /**
     * Mark the contact as responded.
     */
    public function markAsResponded(int $id): JsonResponse
    {
        $contact = Contact::findOrFail($id);
        $contact->markAsResponded();

        return response()->json([
            'success' => true,
            'message' => 'Message marqué comme répondu',
            'data' => $contact,
        ]);
    }
}

