<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use App\Models\Payment;
use App\Models\User;
use App\Models\Chambre;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return view('dashboard.admin.dashboard', [
            'stats' => [
                'total_users' => User::count(),
                'total_reservations' => Reservation::count(),
                'total_paiements' => Payment::sum('montant'),
                'total_chambres' => Chambre::count(),
                'pending_reservations' => Reservation::where('statut', 'en_attente')->count(),
            ]
        ]);
    }

    public function reservations()
    {
        $reservations = Reservation::with(['user', 'chambre'])->latest()->paginate(15);

        return view('dashboard.admin.reservations-management', [
            'reservations' => $reservations
        ]);
    }

    public function chambres()
    {
        $chambres = Chambre::paginate(15);

        return view('dashboard.admin.chambres-management', [
            'chambres' => $chambres
        ]);
    }

    public function users()
    {
        $users = User::withCount('reservations')->paginate(15);

        return view('dashboard.admin.users-management', [
            'users' => $users
        ]);
    }

    public function paiements()
    {
        $paiements = Payment::with(['reservation.user', 'reservation.chambre'])->latest()->paginate(15);

        return view('dashboard.admin.payments-management', [
            'paiements' => $paiements
        ]);
    }

    public function services()
    {
        $services = Service::paginate(15);

        return view('dashboard.admin.services-management', [
            'services' => $services
        ]);
    }
}

