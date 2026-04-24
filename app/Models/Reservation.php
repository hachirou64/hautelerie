<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Reservation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'user_id',
        'chambre_id',
        'nom_client',
        'prenom_client',
        'email_client',
        'telephone_client',
        'adresse',
        'ville',
        'demandes_speciales',
        'date_arrivee',
        'date_depart',
        'nombre_personnes',
        'nombre_nuits',
        'prix_par_nuit',
        'montant_total',
        'acompte',
        'statut',
        'motif_annulation',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'prix_par_nuit' => 'decimal:2',
            'montant_total' => 'decimal:2',
            'acompte' => 'decimal:2',
            'date_arrivee' => 'date',
            'date_depart' => 'date',
            'nombre_personnes' => 'integer',
            'nombre_nuits' => 'integer',
        ];
    }

    /**
     * Get the user that owns the reservation.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the room for the reservation.
     */
    public function chambre(): BelongsTo
    {
        return $this->belongsTo(Chambre::class);
    }

    /**
     * Get the payments for the reservation.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Scope a query to filter by status.
     */
    public function scopeStatut($query, string $statut)
    {
        return $query->where('statut', $statut);
    }

    /**
     * Scope a query to filter by user.
     */
    public function scopeForUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Check if the reservation can be cancelled.
     */
    public function canBeCancelled(): bool
    {
        return in_array($this->statut, ['en_attente', 'confirmee']) 
            && now()->lessThan($this->date_arrivee);
    }
}

