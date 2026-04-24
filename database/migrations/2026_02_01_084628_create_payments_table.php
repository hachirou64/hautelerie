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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('reservation_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Payment details
            $table->decimal('montant', 10, 2);
            $table->string('methode');               // mobile_money, carte_bancaire
            $table->string('operateur')->nullable(); // mtn, moov (for mobile money)
            $table->string('numero_telephone')->nullable();
            $table->string('numero_carte')->nullable(); // Last 4 digits only
            
            // Payment status
            $table->enum('statut', ['en_attente', 'valide', 'echoue', 'rembourse'])
                  ->default('en_attente');
            $table->string('reference_paiement')->nullable();
            $table->text('transaction_id')->nullable();
            $table->text('motif_echec')->nullable();
            
            // Timestamps
            $table->timestamp('date_paiement')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};

