<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chambre;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ChambreController extends Controller
{
    /**
     * Display a listing of the rooms.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Chambre::query()->disponible();

        // Filter by city
        if ($request->has('ville') && $request->ville) {
            $query->ville($request->ville);
        }

        // Filter by price range
        if ($request->has('prix_min')) {
            $query->where('prix', '>=', $request->prix_min);
        }
        if ($request->has('prix_max')) {
            $query->where('prix', '<=', $request->prix_max);
        }

        // Filter by room type
        if ($request->has('type') && $request->type !== 'all') {
            $query->type($request->type);
        }

        // Filter by minimum rating
        if ($request->has('note')) {
            $query->where('note', '>=', $request->note);
        }

        // Get featured rooms only
        if ($request->has('vedette') && $request->vedette === 'true') {
            $query->enVedette();
        }

        // Pagination
        $perPage = $request->input('per_page', 15);
        $chambres = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $chambres,
        ]);
    }

    /**
     * Display the specified room.
     */
    public function show(int $id): JsonResponse
    {
        $chambre = Chambre::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $chambre,
        ]);
    }

    /**
     * Get available cities.
     */
    public function villes(): JsonResponse
    {
        $villes = Chambre::distinct()->pluck('ville')->filter()->values();

        return response()->json([
            'success' => true,
            'data' => $villes,
        ]);
    }
}

