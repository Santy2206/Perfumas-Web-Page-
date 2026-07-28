# Same-domain hosting — perfumas.com.co

Marketing (`website/`) is the primary site at `/`.  
E-commerce (`PERFUMAS-E-COMMERCE/`) is reached via path rewrites on the **same domain**.

## URL map

| Path | App |
|------|-----|
| `/`, `/HTML/*`, `/Images/*` | Static marketing (`website/`) |
| `/tienda`, `/crear`, `/carrito`, `/checkout`, `/producto/*`, `/mayoristas`, `/cuenta`, `/api/*`, `/_next/*` | Next.js shop |

## Vercel (recommended)

### Option A — two projects + domain rewrites

1. Deploy **marketing** as a static project with root directory `website/`, domain `perfumas.com.co`.
2. Deploy **shop** as a Next.js project with root directory `PERFUMAS-E-COMMERCE` (e.g. `shop.perfumas.com.co` or a `*.vercel.app` URL).
3. On the marketing project, edit [`vercel.json`](./vercel.json): replace every `SHOP_DEPLOYMENT_URL` with your shop deployment host (no trailing slash), e.g. `perfumas-shop.vercel.app`.
4. Attach `perfumas.com.co` to the marketing project so visitors always land on the brand homepage.

### Option B — Cloudflare / Nginx reverse proxy

Proxy commerce paths to the Next origin; everything else to static marketing:

```
/tienda /crear /carrito /checkout /producto /mayoristas /cuenta /api /_next  →  Next.js
/*                                                                         →  website/
```

## Medusa (API)

Host Medusa separately (Railway/Render/Fly), e.g. `api.perfumas.com.co`.

- `DATABASE_URL` → Supabase Postgres URI in `PERFUMAS-E-COMMERCE/backend/apps/backend/.env`
- `STORE_CORS` must include `https://perfumas.com.co`
- Storefront `.env`: `NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.perfumas.com.co`

## Local simulation

```bash
# Terminal 1 — marketing
cd website && npx serve -p 5000

# Terminal 2 — shop
cd PERFUMAS-E-COMMERCE && npm run dev
```

Open marketing at `http://localhost:5000`. Shop links (`/tienda`) only work on production rewrites, or temporarily use absolute `http://localhost:3000/tienda` while developing.
