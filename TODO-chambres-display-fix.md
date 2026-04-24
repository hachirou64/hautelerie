# Fix Chambres Display & Add Reservation Functionality

Status: In Progress [step 1/7]

## Approved Plan Steps:

### 1. [ ] Seed Database with real chambres data
   Command: `php artisan db:seed --class=DatabaseSeeder`
   Verify: Check `php artisan tinker` → App\\Models\\Chambre::count()

### 2. [ ] Verify API endpoints work
   Test: curl http://localhost:8000/api/chambres
   Expected: JSON with 8 seeded rooms

### 3. [ ] Update resources/js/pages/dashboard/chambres.tsx
   - Replace hardcoded data with useEffect fetch('/api/chambres')
   - Copy logic from public chambres.tsx (loading, filters, display)
   - Adapt UI for real fields (nom, image, prix, type, localisation, ville, note, equipements)
   - Add responsive grid matching public page style

### 4. [ ] Enhance types/index.ts if needed
   - Chambre interface already exists and matches model

### 5. [ ] Add reservation modal/form
   - On each chambre card, \"Réserver\" → open modal with date picker, guests, notes
   - POST to /api/reservations (auth protected)
   - Handle success/error, redirect to reservations page

### 6. [ ] Test end-to-end
   - Login client → dashboard/chambres → see real data
   - Filter/search → reserve room → see in /dashboard/reservations

### 7. [ ] Cleanup TODO files & complete

**Dependencies:** Server running (`php artisan serve`), Vite dev (`npm run dev`), migrations run.

**Next:** Approve step 1 → run seed command.

