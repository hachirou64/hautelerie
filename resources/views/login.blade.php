<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Connexion - HotelBénin</title>
    
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
                        <h1 class="text-4xl font-bold mb-4">Bon retour parmi nous !</h1>
                        <p class="text-xl text-white/90 mb-8">
                            Connectez-vous pour accéder à vos réservations et découvrir nos offres exclusives.
                        </p>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <svg class="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                            </svg>
                            <div>
                                <h3 class="font-semibold mb-1">Gérez vos réservations</h3>
                                <p class="text-white/80 text-sm">Consultez et modifiez vos réservations en cours</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <svg class="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                            <div>
                                <h3 class="font-semibold mb-1">Vos hôtels favoris</h3>
                                <p class="text-white/80 text-sm">Retrouvez rapidement vos établissements préférés</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <svg class="w-6 h-6 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                            </svg>
                            <div>
                                <h3 class="font-semibold mb-1">Offres exclusives</h3>
                                <p class="text-white/80 text-sm">Profitez de réductions réservées aux membres</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Section droite - Formulaire de connexion -->
                <div class="bg-white rounded-2xl shadow-2xl p-8">
                    <div class="mb-8">
                        <h2 class="text-3xl font-bold text-gray-800 mb-2">Connexion</h2>
                        <p class="text-gray-600">Accédez à votre compte HotelBénin</p>
                    </div>

                    @if (session('status'))
                        <div class="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
                            <div class="flex items-start">
                                <svg class="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                                <p class="text-sm text-green-800">{{ session('status') }}</p>
                            </div>
                        </div>
                    @endif

                    @if ($errors->any())
                        <div class="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                            <div class="flex items-start">
                                <svg class="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                                </svg>
                                <div>
                                    <h4 class="text-red-800 font-semibold text-sm mb-1">Erreur de connexion</h4>
                                    <p class="text-red-700 text-sm">Les identifiants fournis sont incorrects.</p>
                                </div>
                            </div>
                        </div>
                    @endif

                    <form method="POST" action="{{ route('login') }}" class="space-y-6">
                        @csrf

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
                                    autofocus
                                    class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors @error('email') border-red-500 @enderror"
                                    placeholder="jean.dupont@email.com"
                                >
                            </div>
                            @error('email')
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
                                    placeholder="Entrez votre mot de passe"
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

                        <!-- Se souvenir de moi et Mot de passe oublié -->
                        <div class="flex items-center justify-between">
                            <label class="flex items-center space-x-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    name="remember" 
                                    class="w-4 h-4 text-orange-500 focus:ring-orange-500 rounded"
                                >
                                <span class="text-sm text-gray-700">Se souvenir de moi</span>
                            </label>

                            <a href="{{ route('password.request') }}" class="text-sm text-orange-600 hover:text-red-600 font-semibold">
                                Mot de passe oublié ?
                            </a>
                        </div>

                        <!-- Bouton de soumission -->
                        <button 
                            type="submit" 
                            class="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-all transform hover:scale-[1.02]"
                        >
                            Se connecter
                        </button>

                        <!-- Séparateur -->
                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-200"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-4 bg-white text-gray-500">Ou continuer avec</span>
                            </div>
                        </div>

                        <!-- Connexion sociale -->
                        <div class="grid grid-cols-2 gap-4">
                            <button 
                                type="button"
                                class="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-all hover:shadow-md"
                            >
                                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                <span class="text-sm font-semibold text-gray-700">Google</span>
                            </button>

                            <button 
                                type="button"
                                class="flex items-center justify-center space-x-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-all hover:shadow-md"
                            >
                                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                <span class="text-sm font-semibold text-gray-700">Facebook</span>
                            </button>
                        </div>

                        <!-- Lien vers inscription -->
                        <div class="text-center pt-4 border-t">
                            <p class="text-gray-600">
                                Vous n'avez pas encore de compte ? 
                                <a href="{{ route('register') }}" class="text-orange-600 hover:text-red-600 font-semibold">
                                    Créer un compte
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