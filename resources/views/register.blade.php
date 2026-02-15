<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Inscription - HotelBénin</title>
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
        }
        
        .gradient-bg {
            background: linear-gradient(135deg, #FEF3C7 0%, #FED7AA 50%, #FCA5A5 100%);
        }
        
        .input-icon {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #9CA3AF;
        }
        
        .password-toggle {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: #9CA3AF;
        }
        
        .password-toggle:hover {
            color: #EA580C;
        }
    </style>
</head>
<body class="gradient-bg min-h-screen">
    <div class="min-h-screen flex items-center justify-center px-4 py-12">
        <div class="max-w-6xl w-full">
            <div class="grid md:grid-cols-2 gap-8 items-center">
                <!-- Section gauche - Informations -->
                <div class="hidden md:block text-white">
                    <div class="mb-8">
                        <div class="flex items-center space-x-2 mb-6">
                            <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                <span class="text-orange-600 font-bold text-2xl">H</span>
                            </div>
                            <span class="text-3xl font-bold">HotelBénin</span>
                        </div>
                        <h1 class="text-4xl font-bold mb-4">Rejoignez-nous aujourd'hui</h1>
                        <p class="text-xl text-white/90 mb-8">
                            Créez votre compte et accédez aux meilleurs hôtels du Bénin en quelques clics.
                        </p>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <svg class="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <div>
                                <h3 class="font-semibold mb-1">Réservation en 3 étapes</h3>
                                <p class="text-white/80 text-sm">Processus simple et rapide pour réserver votre chambre</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <svg class="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                            <div>
                                <h3 class="font-semibold mb-1">Paiement sécurisé</h3>
                                <p class="text-white/80 text-sm">Mobile Money et carte bancaire 100% sécurisés</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <svg class="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                            </svg>
                            <div>
                                <h3 class="font-semibold mb-1">Hôtels vérifiés</h3>
                                <p class="text-white/80 text-sm">Tous nos établissements sont certifiés</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section droite - Formulaire d'inscription -->
                <div class="bg-white rounded-2xl shadow-2xl p-8">
                    <div class="mb-8">
                        <h2 class="text-3xl font-bold text-gray-800 mb-2">Créer un compte</h2>
                        <p class="text-gray-600">Remplissez vos informations pour commencer</p>
                    </div>

                    @if ($errors->any())
                        <div class="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                            <div class="flex items-start">
                                <svg class="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                                </svg>
                                <div>
                                    <h4 class="text-red-800 font-semibold text-sm mb-1">Erreurs dans le formulaire</h4>
                                    <ul class="list-disc list-inside text-red-700 text-sm space-y-1">
                                        @foreach ($errors->all() as $error)
                                            <li>{{ $error }}</li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                        </div>
                    @endif

                    <form method="POST" action="{{ route('register') }}" class="space-y-5">
                        @csrf

                        <!-- Type de compte -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-3">
                                Type de compte <span class="text-red-500">*</span>
                            </label>
                            <div class="grid grid-cols-2 gap-4">
                                <label class="cursor-pointer">
                                    <input type="radio" name="account_type" value="client" class="peer sr-only" checked>
                                    <div class="border-2 border-gray-200 rounded-lg p-4 text-center transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:border-gray-300">
                                        <svg class="w-8 h-8 mx-auto mb-2 text-gray-400 peer-checked:text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                        <div class="font-semibold text-gray-700">Client</div>
                                        <div class="text-xs text-gray-500 mt-1">Réserver des chambres</div>
                                    </div>
                                </label>
                                
                                <label class="cursor-pointer">
                                    <input type="radio" name="account_type" value="hotel" class="peer sr-only">
                                    <div class="border-2 border-gray-200 rounded-lg p-4 text-center transition-all peer-checked:border-orange-500 peer-checked:bg-orange-50 hover:border-gray-300">
                                        <svg class="w-8 h-8 mx-auto mb-2 text-gray-400 peer-checked:text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                        </svg>
                                        <div class="font-semibold text-gray-700">Gestionnaire</div>
                                        <div class="text-xs text-gray-500 mt-1">Gérer un hôtel</div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <!-- Nom et Prénom -->
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label for="first_name" class="block text-sm font-semibold text-gray-700 mb-2">
                                    Prénom <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="first_name" 
                                    name="first_name" 
                                    value="{{ old('first_name') }}"
                                    required
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors @error('first_name') border-red-500 @enderror"
                                    placeholder="Jean"
                                >
                                @error('first_name')
                                    <p class="mt-1 text-sm text-red-500">{{ $message }}</p>
                                @enderror
                            </div>

                            <div>
                                <label for="last_name" class="block text-sm font-semibold text-gray-700 mb-2">
                                    Nom <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="last_name" 
                                    name="last_name" 
                                    value="{{ old('last_name') }}"
                                    required
                                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors @error('last_name') border-red-500 @enderror"
                                    placeholder="Dupont"
                                >
                                @error('last_name')
                                    <p class="mt-1 text-sm text-red-500">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>

                        <!-- Email -->
                        <div>
                            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                                Adresse e-mail <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <svg class="input-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value="{{ old('email') }}"
                                    required
                                    class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors @error('email') border-red-500 @enderror"
                                    placeholder="jean.dupont@email.com"
                                >
                            </div>
                            @error('email')
                                <p class="mt-1 text-sm text-red-500">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Téléphone -->
                        <div>
                            <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
                                Numéro de téléphone <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <svg class="input-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                </svg>
                                <input 
                                    type="tel" 
                                    id="phone" 
                                    name="phone" 
                                    value="{{ old('phone') }}"
                                    required
                                    class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors @error('phone') border-red-500 @enderror"
                                    placeholder="+229 XX XX XX XX"
                                >
                            </div>
                            @error('phone')
                                <p class="mt-1 text-sm text-red-500">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Mot de passe -->
                        <div>
                            <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
                                Mot de passe <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <svg class="input-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    required
                                    class="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors @error('password') border-red-500 @enderror"
                                    placeholder="Minimum 8 caractères"
                                >
                                <svg class="password-toggle w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" onclick="togglePassword('password')">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                            </div>
                            @error('password')
                                <p class="mt-1 text-sm text-red-500">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Confirmation du mot de passe -->
                        <div>
                            <label for="password_confirmation" class="block text-sm font-semibold text-gray-700 mb-2">
                                Confirmer le mot de passe <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <svg class="input-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                                <input 
                                    type="password" 
                                    id="password_confirmation" 
                                    name="password_confirmation" 
                                    required
                                    class="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                                    placeholder="Retapez votre mot de passe"
                                >
                                <svg class="password-toggle w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" onclick="togglePassword('password_confirmation')">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                            </div>
                        </div>

                        <!-- Conditions générales -->
                        <div>
                            <label class="flex items-start space-x-3 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    name="terms" 
                                    required
                                    class="w-5 h-5 text-orange-500 focus:ring-orange-500 rounded mt-0.5 @error('terms') border-red-500 @enderror"
                                >
                                <span class="text-sm text-gray-700">
                                    J'accepte les 
                                    <a href="#" class="text-orange-600 hover:underline font-semibold">conditions générales d'utilisation</a> 
                                    et la 
                                    <a href="#" class="text-orange-600 hover:underline font-semibold">politique de confidentialité</a>
                                </span>
                            </label>
                            @error('terms')
                                <p class="mt-1 text-sm text-red-500">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Bouton de soumission -->
                        <button 
                            type="submit" 
                            class="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-all transform hover:scale-[1.02]"
                        >
                            Créer mon compte
                        </button>

                        <!-- Lien vers connexion -->
                        <div class="text-center pt-4 border-t">
                            <p class="text-gray-600">
                                Vous avez déjà un compte ? 
                                <a href="{{ route('login') }}" class="text-orange-600 hover:text-red-600 font-semibold">
                                    Se connecter
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        function togglePassword(inputId) {
            const input = document.getElementById(inputId);
            if (input.type === 'password') {
                input.type = 'text';
            } else {
                input.type = 'password';
            }
        }
    </script>
</body>
</html>