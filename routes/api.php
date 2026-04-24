<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ChambreController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ContactController;



// Public API routes (no authentication required)
Route::get('/chambres', [ChambreController::class, 'index']);
Route::get('/chambres/{id}', [ChambreController::class, 'show']);
Route::get('/chambres/vedette/list', [ChambreController::class, 'vedette']);
Route::get('/chambres/villes/list', [ChambreController::class, 'villes']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);
Route::get('/services/categories/list', [ServiceController::class, 'categories']);
Route::get('/services/categorie/{categorie}', [ServiceController::class, 'parCategorie']);

Route::post('/reservations', [ReservationController::class, 'store']);
Route::post('/contact', [ContactController::class, 'store']);

// Protected API routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // User reservations
    Route::apiResource('reservations', ReservationController::class);
    Route::post('reservations/{id}/cancel', [ReservationController::class, 'cancel']);
    
    // Payments
    Route::apiResource('payments', PaymentController::class);
    Route::post('payments/mobile-money/initiate', [PaymentController::class, 'initiateMobileMoney']);
    Route::post('payments/card/initiate', [PaymentController::class, 'initiateCardPayment']);
});

// Fix: Ensure villes method exists or use index with filter
Route::get('chambres/villes/list', [ChambreController::class, 'villes']);


