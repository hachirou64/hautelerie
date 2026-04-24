<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Display a listing of the services.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Service::query()->actif();

        // Filter by category
        if ($request->has('categorie')) {
            $query->categorie($request->categorie);
        }

        $services = $query->orderBy('nom', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $services,
        ]);
    }

    /**
     * Display the specified service.
     */
    public function show(int $id): JsonResponse
    {
        $service = Service::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $service,
        ]);
    }

    /**
     * Get services by category.
     */
    public function parCategorie(string $categorie): JsonResponse
    {
        $services = Service::actif()->categorie($categorie)->get();

        return response()->json([
            'success' => true,
            'data' => $services,
        ]);
    }

    /**
     * Get all unique categories.
     */
    public function categories(): JsonResponse
    {
        $categories = Service::distinct()->pluck('categorie')->filter()->values();

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }
}

