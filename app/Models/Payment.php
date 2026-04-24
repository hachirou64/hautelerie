<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'reservation_id',
        'user_id',
        'montant',
        'methode',
        'operateur',
        'numero_telephone',
        'numero_carte',
        'statut',
        'reference_paiement',
        'transaction_id',
        'motif_echec',
        'date_paiement',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'montant' => 'decimal:2',
            'date_paiement' => 'datetime',
        ];
    }

    /**
     * Get the reservation that owns the payment.
     */
    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }

    /**
     * Get the user that owns the payment.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to filter by status.
     */
    public function scopeStatut($query, string $statut)
    {
        return $query->where('statut', $statut);
    }

    /**
     * Check if the payment is successful.
     */
    public function isSuccessful(): bool
    {
        return $this->statut === 'valide';
    }
}

