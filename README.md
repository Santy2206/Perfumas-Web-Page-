# Perfumas Web

| Path | Role |
|------|------|
| [`PERFUMAS-E-COMMERCE/`](./PERFUMAS-E-COMMERCE/) | **Next.js storefront** |
| [`PERFUMAS-E-COMMERCE/backend/`](./PERFUMAS-E-COMMERCE/backend/) | **Medusa v2** (full install + Perfumas custom routes) |
| [`perfumas-backend/`](./perfumas-backend/) | Earlier scaffold copy (prefer `PERFUMAS-E-COMMERCE/backend`) |
| `index.html`, `HTML/`, `Images/` | Legacy static site |

## Storefront

```bash
cd PERFUMAS-E-COMMERCE
npm install
npm run dev
```

## Medusa backend

```bash
cd PERFUMAS-E-COMMERCE/backend
docker compose up -d   # requires Docker Desktop
# set DATABASE_URL in apps/backend/.env (local or Supabase)
npm run backend:dev
```

See `PERFUMAS-E-COMMERCE/CUTOVER.md` and `PERFUMAS-E-COMMERCE/backend/ADMIN.md`.
