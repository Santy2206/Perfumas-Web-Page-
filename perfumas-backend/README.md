# Perfumas Backend (Medusa v2)

Commerce engine for [PERFUMAS-E-COMMERCE](../PERFUMAS-E-COMMERCE) (Next.js storefront).

## Stack

- Medusa 2.18 (apps/backend)
- Postgres via **Supabase** (`DATABASE_URL`) or local Docker Compose
- Custom routes:
  - `POST /store/builds/add-to-cart` — custom perfume builds
  - `POST /store/perfumas/b2b/register` — wholesale applications
  - `POST /store/perfumas/orders` — checkout sync / fulfillment metadata
  - `GET /admin/perfumas/fulfillment` — pick-list documentation

## Quick start

```bash
# Optional local DB (requires Docker Desktop)
docker compose up -d

# Configure env
cp apps/backend/.env.template apps/backend/.env
# Set DATABASE_URL=postgresql://medusa:medusa@localhost:5432/perfumas_medusa
# Or paste your Supabase connection string

npm install
npm run backend:dev
```

See [ADMIN.md](./ADMIN.md) for catalog, B2B, and fulfillment ops.
