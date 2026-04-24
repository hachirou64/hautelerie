<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chambres', function (Blueprint $table) {
            $table->id();
            $table->string('nom');                    // Room name / hotel name
            $table->string('type');                   // standard, deluxe, suite, familiale
            $table->text('description');             // Room description
            $table->decimal('prix', 10, 2);          // Price per night in CFA
            $table->integer('capacite');             // Max guests
            $table->string('lit');                   // Bed configuration
            $table->string('taille')->nullable();    // Room size (e.g., "32 m²")
            $table->string('image');                  // Main image URL
            $table->json('images')->nullable();      // Additional images
            $table->json('equipements')->nullable(); // Amenities list
            $table->string('localisation');          // Location/address
            $table->string('ville');                 // City
            $table->decimal('note', 2, 1)->default(0); // Rating
            $table->integer('avis_count')->default(0); // Number of reviews
            $table->boolean('disponible')->default(true);
            $table->boolean('en_vedette')->default(false); // Featured
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chambres');
    }
};

