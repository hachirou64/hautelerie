<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Chambre extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'nom',
        'type',
        'description',
        'prix',
        'capacite',
        'lit',
        'taille',
        'image',
        'images',
        'equipements',
        'localisation',
        'ville',
        'note',
        'avis_count',
        'disponible',
        'en_vedette',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'prix' => 'decimal:2',
            'note' => 'decimal:1',
            'images' => 'array',
            'equipements' => 'array',
            'disponible' => 'boolean',
            'en_vedette' => 'boolean',
        ];
    }

    /**
     * Get the reservations for the room.
     */
    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    /**
     * Scope a query to only include available rooms.
     */
    public function scopeDisponible($query)
    {
        return $query->where('disponible', true);
    }

    /**
     * Scope a query to only include featured rooms.
     */
    public function scopeEnVedette($query)
    {
        return $query->where('en_vedette', true);
    }

    /**
     * Scope a query to filter by city.
     */
    public function scopeVille($query, string $ville)
    {
        return $query->where('ville', 'like', '%' . $ville . '%');
    }

    /**
     * Scope a query to filter by price range.
     */
    public function scopePrixRange($query, float $min, float $max)
    {
        return $query->whereBetween('prix', [$min, $max]);
    }

    /**
     * Scope a query to filter by room type.
     */
    public function scopeType($query, string $type)
    {
        return $query->where('type', $type);
    }
}

