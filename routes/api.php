<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChambreController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ContactController;

// Public API — pas besoin d'authentification
Route::get('/chambres', [ChambreController::class, 'index']);
Route::get('/services', [ServiceController::class, 'index']);
Route::post('/reservations', [ReservationController::class, 'store']);
Route::post('/contact', [ContactController::class, 'store']);