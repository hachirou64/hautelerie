<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Dashboard\ClientDashboardController;
use App\Http\Controllers\Dashboard\AdminDashboardController;

Route::get('/', function () {
    return Inertia::render('welcome_old');
})->name('home');

Route::get('/chambres', function () {
    return Inertia::render('chambres');
})->name('chambres');

Route::get('/chambres/{id}', function ($id) {
    return Inertia::render('chambre-detail', ['id' => $id]);
})->name('chambres.show');

Route::middleware(['auth'])->group(function () {
    // Client Dashboard routes
    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/', [ClientDashboardController::class, 'index'])->name('index');
        Route::get('reservations', [ClientDashboardController::class, 'reservations'])->name('reservations');
        Route::get('chambres', [ClientDashboardController::class, 'chambres'])->name('chambres');
        Route::get('paiements', [ClientDashboardController::class, 'paiements'])->name('paiements');
        Route::get('profil', [ClientDashboardController::class, 'profil'])->name('profil');
        Route::get('support', [ClientDashboardController::class, 'support'])->name('support');
    });

    // Dashboard principal - redirection selon rôle (doit être après le groupe préfixe)
    Route::get('dashboard', function () {
        $user = auth()->user();
        if ($user && $user->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('dashboard.index');
    })->name('dashboard');

    // Admin Dashboard routes
    Route::prefix('admin')->name('admin.')->middleware('role:admin')->group(function () {
        Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::get('reservations', [AdminDashboardController::class, 'reservations'])->name('reservations');
        Route::get('chambres', [AdminDashboardController::class, 'chambres'])->name('chambres');
        Route::get('paiements', [AdminDashboardController::class, 'paiements'])->name('paiements');
        Route::get('utilisateurs', [AdminDashboardController::class, 'users'])->name('users');
        Route::get('services', [AdminDashboardController::class, 'services'])->name('services');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

