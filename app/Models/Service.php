<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'nom',
        'description',
        'prix',
        'categorie',
        'image',
        'actif',
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
            'actif' => 'boolean',
        ];
    }

    /**
     * Scope a query to only include active services.
     */
    public function scopeActif($query)
    {
        return $query->where('actif', true);
    }

    /**
     * Scope a query to filter by category.
     */
    public function scopeCategorie($query, string $categorie)
    {
        return $query->where('categorie', $categorie);
    }
}

