<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Inscription - HotelBénin</title>

    @vite(['resources/css/app.css', 'resources/js/app.tsx'])

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            margin: 0;
        }

        .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .input-icon {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: #9CA3AF;
            transition: color 0.2s ease;
        }

        .input-group:focus-within .input-icon {
            color: #F97316;
        }

        .password-toggle {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            color: #9CA3AF;
            transition: color 0.2s ease;
        }

        .password-toggle:hover {
            color: #F97316;
        }

        .logo {
            height: 3rem;
            width: auto;
            filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
        }

        .floating-shapes {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
        }

        .shape {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            animation: float 6s ease-in-out infinite;
        }

        .shape:nth-child(1) {
            width: 80px;
            height: 80px;
            top: 10%;
            left: 10%;
            animation-delay: 0s;
        }

        .shape:nth-child(2) {
            width: 60px;
            height: 60px;
            top: 20%;
            right: 10%;
            animation-delay: 2s;
        }

        .shape:nth-child(3) {
            width: 100px;
            height: 100px;
            bottom: 20%;
            left: 20%;
            animation-delay: 4s;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }

        .slide-in {
            animation: slideIn 0.6s ease-out;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .pulse-glow {
            animation: pulseGlow 2s ease-in-out infinite;
        }

        @keyframes pulseGlow {
            0%, 100% {
                box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
            }
            50% {
                box-shadow: 0 0 40px rgba(249, 115, 22, 0.6);
            }
        }

        .account-type-card {
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .account-type-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .account-type-card.selected {
            border-color: #F97316;
            background: rgba(249, 115, 22, 0.05);
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(249, 115, 22, 0.2);
        }

        .account-type-card.selected .icon {
            color: #F97316;
        }
    </style>
</head>

<body class="gradient-bg">
    <div class="floating-shapes">
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
    </div>

    <div class="min-h-screen flex items-center justify-center px-4 py-12 relative z-10">
        <div class="max-w-6xl w-full slide-in">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <!-- Section gauche - Informations -->
                <div class="hidden lg:block text-white">
                    <div class="mb-8">
                        <div class="flex items-center space-x-3 mb-8">
                            <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                <span class="text-2xl">🏨</span>
                            </div>
                            <span class="text-4xl font-bold tracking-tight">HotelBénin</span>
                        </div>
                        <h1 class="text-5xl font-bold mb-6 leading-tight">Rejoignez-nous<br><span class="text-orange-300">aujourd'hui !</span></h1>
                        <p class="text-xl text-white/90 mb-10 leading-relaxed">
                            Créez votre compte et accédez aux meilleurs hôtels du Bénin en quelques clics.
                        </p>
                    </div>

                    <div class="space-y-6">
                        <div class="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <div class="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg class="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-bold mb-2">Réservation en 3 étapes</h3>
                                <p class="text-white/80 leading-relaxed">Processus simple et rapide pour réserver votre chambre</p>
                            </div>
                        </div>

                        <div class="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg class="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-bold mb-2">Paiement sécurisé</h3>
                                <p class="text-white/80 leading-relaxed">Mobile Money et carte bancaire 100% sécurisés</p>
                            </div>
                        </div>

                        <div class="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <div class="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg class="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-bold mb-2">Hôtels vérifiés</h3>
                                <p class="text-white/80 leading-relaxed">Tous nos établissements sont certifiés et contrôlés</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section droite - Formulaire d'inscription -->
                <div class="glass-card rounded-3xl p-8 lg:p-10">
                    <div class="mb-8 text-center lg:text-left">
                        <h2 class="text-4xl font-bold text-gray-800 mb-3">Créer un compte</h2>
                        <p class="text-gray-600 text-lg">Remplissez vos informations pour commencer</p>
                    </div>

                    @if ($errors->any())
                        <div class="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-xl">
                            <div class="flex items-start">
                                <svg class="w-6 h-6 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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

                    <form id="register-form" method="POST" action="{{ route('register') }}" class="space-y-6">
                        @csrf

                        <!-- Type de compte -->
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-4">
                                Type de compte <span class="text-red-500">*</span>
                            </label>
                            <div class="grid grid-cols-2 gap-4">
                                <label class="account-type-card border-2 border-gray-200 rounded-xl p-4 text-center transition-all cursor-pointer selected" for="client">
                                    <input type="radio" name="account_type" value="client" id="client" class="peer sr-only" checked>
                                    <div class="icon w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-xl flex items-center justify-center transition-colors">
                                        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                    </div>
                                    <div class="font-bold text-gray-800 mb-1">Client</div>
                                    <div class="text-xs text-gray-500">Réserver des chambres</div>
                                </label>

                                <label class="account-type-card border-2 border-gray-200 rounded-xl p-4 text-center transition-all cursor-pointer" for="hotel">
                                    <input type="radio" name="account_type" value="hotel" id="hotel" class="peer sr-only">
                                    <div class="icon w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-xl flex items-center justify-center transition-colors">
                                        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                        </svg>
                                    </div>
                                    <div class="font-bold text-gray-800 mb-1">Gestionnaire</div>
                                    <div class="text-xs text-gray-500">Gérer un hôtel</div>
                                </label>
                            </div>
                        </div>

                        <!-- Nom et Prénom -->
                        <div class="grid grid-cols-2 gap-4">
                            <div class="input-group">
                                <label for="first_name" class="block text-sm font-semibold text-gray-700 mb-3">
                                    Prénom <span class="text-red-500">*</span>
                                </label>
                                <div class="relative">
                                    <svg class="input-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        value="{{ old('first_name') }}"
                                        required
                                        class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-200 text-gray-900 placeholder-gray-400 @error('first_name') border-red-300 focus:border-red-500 focus:ring-red-100 @enderror"
                                        placeholder="Jean"
                                    >
                                </div>
                                @error('first_name')
                                    <p class="mt-2 text-sm text-red-600 font-medium">{{ $message }}</p>
                                @enderror
                            </div>

                            <div class="input-group">
                                <label for="last_name" class="block text-sm font-semibold text-gray-700 mb-3">
                                    Nom <span class="text-red-500">*</span>
                                </label>
                                <div class="relative">
                                    <svg class="input-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value="{{ old('last_name') }}"
                                        required
                                        class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-200 text-gray-900 placeholder-gray-400 @error('last_name') border-red-300 focus:border-red-500 focus:ring-red-100 @enderror"
                                        placeholder="Dupont"
                                    >
                                </div>
                                @error('last_name')
                                    <p class="mt-2 text-sm text-red-600 font-medium">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>

                        <!-- Email -->
                        <div class="input-group">
                            <label for="email" class="block text-sm font-semibold text-gray-700 mb-3">
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
                                    class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-200 text-gray-900 placeholder-gray-400 @error('email') border-red-300 focus:border-red-500 focus:ring-red-100 @enderror"
                                    placeholder="jean.dupont@email.com"
                                >
                            </div>
                            @error('email')
                                <p class="mt-2 text-sm text-red-600 font-medium">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Mot de passe -->
                        <div class="input-group">
                            <label for="password" class="block text-sm font-semibold text-gray-700 mb-3">
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
                                    class="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-200 text-gray-900 placeholder-gray-400 @error('password') border-red-300 focus:border-red-500 focus:ring-red-100 @enderror"
                                    placeholder="Minimum 8 caractères"
                                >
                                <svg class="password-toggle w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" onclick="togglePassword('password')">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                            </div>
                            @error('password')
                                <p class="mt-2 text-sm text-red-600 font-medium">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Confirmation mot de passe -->
                        <div class="input-group">
                            <label for="password_confirmation" class="block text-sm font-semibold text-gray-700 mb-3">
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
                                    class="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-200 text-gray-900 placeholder-gray-400 @error('password_confirmation') border-red-300 focus:border-red-500 focus:ring-red-100 @enderror"
                                    placeholder="Confirmer votre mot de passe"
                                >
                                <svg class="password-toggle w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" onclick="togglePassword('password_confirmation')">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                </svg>
                            </div>
                            @error('password_confirmation')
                                <p class="mt-2 text-sm text-red-600 font-medium">{{ $message }}</p>
                            @enderror
                        </div>

                        <!-- Conditions d'utilisation -->
                        <div class="flex items-start space-x-3">
                            <input
                                type="checkbox"
                                id="terms"
                                name="terms"
                                required
                                class="w-5 h-5 mt-0.5 text-orange-500 focus:ring-orange-500 rounded-lg border-2 border-gray-300 focus:border-orange-500 transition-colors"
                            >
                            <label for="terms" class="text-sm text-gray-700 leading-relaxed cursor-pointer">
                                J'accepte les <a href="#" class="text-orange-600 hover:text-orange-700 font-medium">conditions d'utilisation</a>
                                et la <a href="#" class="text-orange-600 hover:text-orange-700 font-medium">politique de confidentialité</a>
                                <span class="text-red-500">*</span>
                            </label>
                        </div>

                        <!-- Bouton d'inscription -->
                        <button
                            type="submit"
                            class="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 pulse-glow"
                        >
                            Créer mon compte
                        </button>
                    </form>

                    <!-- Lien vers connexion -->
                    <div class="mt-8 text-center">
                        <p class="text-gray-600">
                            Déjà un compte ?
                            <a href="{{ route('login') }}" class="text-orange-600 hover:text-orange-700 font-semibold ml-2 transition-colors">
                                Se connecter
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        function togglePassword(inputId) {
            const input = document.getElementById(inputId);
            const icon = event.currentTarget;

            if (input.type === 'password') {
                input.type = 'text';
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>';
            } else {
                input.type = 'password';
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>';
            }
        }

        // Gestion des types de compte
        document.querySelectorAll('input[name="account_type"]').forEach(radio => {
            radio.addEventListener('change', function() {
                document.querySelectorAll('.account-type-card').forEach(card => {
                    card.classList.remove('selected');
                });
                this.closest('.account-type-card').classList.add('selected');
            });
        });

        // Animation d'entrée
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.querySelector('.glass-card');
            form.style.opacity = '0';
            form.style.transform = 'translateY(20px)';

            setTimeout(() => {
                form.style.transition = 'all 0.6s ease-out';
                form.style.opacity = '1';
                form.style.transform = 'translateY(0)';
            }, 100);
        });
    </script>
</body>
</html>
        <div class="max-w-6xl w-full">
            <div class="grid md:grid-cols-2 gap-8 items-center">
                <!-- Section gauche - Informations -->
                <div class="hidden md:block text-white">
                    <div class="mb-8">
<div class="flex items-center space-x-2 mb-6">
                            <img src="{{ asset('logo.svg') }}" alt="HotelBénin" class="logo">
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

<form id="register-form" method="POST" action="{{ route('register') }}" class="space-y-5">
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
                            id="register-submit"
                            class="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-all transform hover:scale-[1.02] relative"
                        >
                            <span class="submit-text">Créer mon compte</span>
                            <div class="loading absolute inset-0 flex items-center justify-center opacity-0">
                                <svg class="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" pathLength="1" stroke-dasharray="31.4" stroke-dashoffset="0"></circle>
                                </svg>
                            </div>
                        </button>
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

        document.getElementById('register-form').addEventListener('submit', function() {
            const button = document.getElementById('register-submit');
            const submitText = button.querySelector('.submit-text');
            const loading = button.querySelector('.loading');
            
            submitText.style.opacity = '0';
            loading.style.opacity = '1';
            button.disabled = true;
        });
    </script>
</body>
</html>