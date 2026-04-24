# TODO: Fix redirection dashboard selon rôle user

**Problème :** Client connecté va dashboard admin au lieu client.

**Infos :**
- Route /dashboard → Inertia::render('dashboard/client-dashboard') fixe (web.php)
- sidebar.blade.php switch sur role pour menu
- Controllers Client/AdminDashboardController.php prêts
- User model a role field

**Plan :**
1. Modifier route /dashboard : Check Auth::user()->role et render client-dashboard ou admin.dashboard
2. Mettre à jour routes sub-dashboard vers controllers
3. Ajouter middleware rôle si besoin

**Étapes :**
- [ ] 1. Éditer routes/web.php pour logique rôle
- [ ] 2. Exécuter php artisan route:clear
- [ ] 3. npm run dev rebuild
- [ ] 4. Tester login client → /dashboard client, admin → admin

