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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('chambre_id')->constrained()->onDelete('cascade');
            
            // Guest information
            $table->string('nom_client');
            $table->string('prenom_client');
            $table->string('email_client');
            $table->string('telephone_client');
            $table->text('adresse')->nullable();
            $table->string('ville')->nullable();
            $table->text('demandes_speciales')->nullable();
            
            // Reservation dates
            $table->date('date_arrivee');
            $table->date('date_depart');
            $table->integer('nombre_personnes');
            $table->integer('nombre_nuits');
            
            // Pricing
            $table->decimal('prix_par_nuit', 10, 2);
            $table->decimal('montant_total', 10, 2);
            $table->decimal('acompte', 10, 2)->default(0);
            
            // Status
            $table->enum('statut', ['en_attente', 'confirmee', 'annulee', 'terminee'])
                  ->default('en_attente');
            $table->text('motif_annulation')->nullable();
            
            // Timestamps
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};

