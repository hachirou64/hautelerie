<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Chambre;
use App\Models\Reservation;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ClientDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        return view('dashboard.client.dashboard', [
            'user' => $user,
            'stats' => [
                'reservations_count' => $user->reservations()->count(),
                'paiements_count' => $user->payments()->count(),
                'favorite_chambres' => Chambre::where('en_vedette', true)->limit(3)->get(),
            ]
        ]);
    }

    public function reservations()
    {
        $reservations = Auth::user()->reservations()->with(['chambre', 'payment'])->latest()->paginate(10);

        return view('dashboard.client.reservations', [
            'reservations' => $reservations
        ]);
    }

    public function chambres()
    {
        return Inertia::render('Dashboard/Chambres');
    }

    public function paiements()
    {
        $paiements = Auth::user()->payments()->with('reservation.chambre')->latest()->paginate(10);

        return view('dashboard.client.paiements', [
            'paiements' => $paiements
        ]);
    }

    public function profil()
    {
        return view('dashboard.client.profil', [
            'user' => Auth::user()
        ]);
    }

    public function support()
    {
        return view('dashboard.client.support');
    }
}

