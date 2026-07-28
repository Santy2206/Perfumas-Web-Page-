# Perfumas Web Page

Two projects, one domain ([perfumas.com.co](https://perfumas.com.co)):

| Path | Role |
|------|------|
| [`website/`](./website/) | **MAIN** — marketing site (hero, colección, beneficios, FAQ, WhatsApp) |
| [`PERFUMAS-E-COMMERCE/`](./PERFUMAS-E-COMMERCE/) | **SECOND** — Next.js shop + Medusa (`backend/`) |
| [`perfumas-backend/`](./perfumas-backend/) | Redirect stub only |

## URL map

| URL | Serves |
|-----|--------|
| `/` | Marketing (`website/`) |
| `/HTML/*`, `/Images/*` | Marketing pages/assets |
| `/tienda`, `/crear`, `/carrito`, `/checkout`, `/producto/*`, `/mayoristas`, `/cuenta`, `/api/*` | E-commerce |

See [`vercel.json`](./vercel.json) for same-domain rewrites.

## Develop

```bash
# Marketing
cd website && npx serve .

# Shop
cd PERFUMAS-E-COMMERCE
npm run dev              # :3000
npm run backend:dev      # Medusa :9000
```

## Database

Supabase Postgres URI → `PERFUMAS-E-COMMERCE/backend/apps/backend/.env` as `DATABASE_URL`  
(not in the marketing site; not in storefront `.env.local` as a product DB).

## Funnel smoke test

1. Open marketing `/`
2. Click **Crear mi fragancia** → `/crear`
3. Click **Tienda** → `/tienda`
4. Bag icon → `/carrito`
5. WhatsApp still works for consult
