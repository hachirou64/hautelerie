# Fix Chambres Display in Dashboard & Add Reservation Functionality

**Status:** Step 1/6 - Ready for execution

## Breakdown of Approved Plan:

**Information Recap:**
- Dashboard chambres.tsx uses static mock data
- Real API ready with seeded data (8 rooms)
- Types/Chambre interface exists
- Reservation API exists (POST /api/reservations)

**1. [ ] Populate DB with real chambres**
   `cd /home/hachirou/mes-projets/hautelerie && php artisan db:seed --class=DatabaseSeeder`
   Verify: 8 chambres created.

**2. [ ] Refactor dashboard chambres.tsx to fetch API data**
   Replace static array with useEffect fetch('/api/chambres'), loading state, filters.

**3. [ ] Update UI to match public page style & real fields**
   Use nom, image, prix, type, localisation, ville, note, equipements.

**4. [ ] Add reservation modal on room cards**
   Form: dates, guests, total calc, POST /api/reservations.

**5. [ ] Test filters, search, reservation flow.**

**6. [ ] Update this TODO & mark complete.**

Run step 1 next.

