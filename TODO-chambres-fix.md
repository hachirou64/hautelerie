# Fix Chambres Display on /dashboard/chambres

Status: ✅ In Progress [1/5]

## Steps from Approved Plan:

### 1. [x] Create this TODO (done)
### 2. [✅] Populate DB: `php artisan migrate:fresh --seed`
   - Creates 8 chambres (all disponible=true)
   - ✅ DONE

### 3. [ ] Fix controller: Edit ClientDashboardController@chambres()
   - `use Inertia\\Inertia;` ✅ already present
   - Change to `Inertia::render('Dashboard/Chambres')`

### 4. [ ] Verify API & page
   - `curl http://localhost:8000/api/chambres` (if server running)
   - Login client → /dashboard/chambres → see grid + filters

### 5. [ ] Cleanup: Update this TODO to ✅ Completed, delete unused Blade?

**Next command ready: migrate:fresh --seed**

