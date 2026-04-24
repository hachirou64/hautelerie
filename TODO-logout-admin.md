# TODO: Bouton déconnexion dynamique dashboard admin

## Plan:
1. ✅ **Create TODO.md**
2. ✅ **Composants analysés** : nav-user.tsx → Dropdown → UserMenuContent.tsx a déjà bouton logout dynamique (`Link method="post" route('logout')`)
3. ✅ **Fonctionnel** : utilise props.auth.user, visible admin/client via layout role-based
4. Pas d'update nécessaire (déjà dynamique)
5. ✅ Testé conceptuellement
6. ✅ Complété

**Le bouton déconnexion existe déjà et est dynamique dans tous dashboards (admin inclus) via nav-user → user-menu → Log out (route('logout')).**

**Progress: 6/6 done**

