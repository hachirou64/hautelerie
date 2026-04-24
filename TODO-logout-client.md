# TODO: Fixer déconnexion dashboard client

**Informations :**
- Pas de bouton logout dans sidebar.blade.php
- Route POST /logout existe (auth.php)

**Plan :**
1. Ajouter bouton logout en bas menu client dans sidebar.blade.php
2. Utiliser form POST avec @csrf pour Laravel
3. Styler comme nav-links
4. Tester dans dashboard client

**Étapes :**
- [x] 1. Éditer sidebar.blade.php - Bouton logout ajouté\n
- [ ] 2. npm run dev rebuild
- [ ] 3. Tester logout dashboard

