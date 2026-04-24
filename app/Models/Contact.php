<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'nom',
        'email',
        'telephone',
        'sujet',
        'message',
        'statut',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'statut' => 'string',
        ];
    }

    /**
     * Scope a query to filter by status.
     */
    public function scopeStatut($query, string $statut)
    {
        return $query->where('statut', $statut);
    }

    /**
     * Mark the contact as read.
     */
    public function markAsRead(): void
    {
        $this->update(['statut' => 'lu']);
    }

    /**
     * Mark the contact as responded.
     */
    public function markAsResponded(): void
    {
        $this->update(['statut' => 'repondu']);
    }
}

