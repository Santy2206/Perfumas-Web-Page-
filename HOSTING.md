# Same-domain hosting — perfumas.com.co

Marketing (`website/`) is the primary site at `/`.  
E-commerce (`PERFUMAS-E-COMMERCE/`) is the Next.js shop. Medusa is the commerce API.

## URL map (Hostinger + shop subdomain)

| Path / host | App |
|-------------|-----|
| `https://perfumas.com.co/` , `/HTML/*`, `/Images/*` | Static marketing on **Hostinger** `public_html` |
| `https://perfumas.com.co/tienda` (etc.) | **302 redirect** via `.htaccess` → shop subdomain |
| `https://tienda.perfumas.com.co/*` | Next.js shop on **Vercel** |
| `https://api.perfumas.com.co` | Medusa on **Railway / Render / Fly** |

---

## Hostinger (shared / Web hosting) — fix “needs index.html”

Hostinger serves **`public_html/`**. It requires **`public_html/index.html`**.

Your homepage lives in [`website/index.html`](./website/index.html). If you upload the **whole git repo**, there is no `index.html` at the Hostinger root → blank / missing index error.

### Package for upload

From the repo root (Windows):

```powershell
powershell -File scripts/package-hostinger.ps1
```

This builds [`deploy/hostinger-public_html/`](./deploy/hostinger-public_html/) with:

```
index.html
HTML/
Images/
.htaccess          ← redirects /tienda, /crear, … to the shop host
shop-config.js
```

### Upload steps

1. Hostinger → **Files** → **File Manager** → open **`public_html`**.
2. Remove the default Hostinger page and any wrong full-repo upload.
3. Upload **everything inside** `deploy/hostinger-public_html/` (not the folder wrapper).
4. Confirm **`public_html/index.html`** exists.
5. Open `https://perfumas.com.co/` — marketing homepage should load.
6. Edit `public_html/.htaccess` and set the shop URL if it is not yet `https://tienda.perfumas.com.co` (use your temporary `*.vercel.app` URL until DNS is ready).

**Do not** put Next.js or Medusa inside `public_html` — shared hosting cannot run them.

See also [`deploy/README.md`](./deploy/README.md).

---

## Shop on Vercel + Medusa

Full checklist: [`PERFUMAS-E-COMMERCE/DEPLOY.md`](./PERFUMAS-E-COMMERCE/DEPLOY.md).

Summary:

1. Vercel project, root directory `PERFUMAS-E-COMMERCE`, env from `.env.example` + `.seed-output.json`.
2. Domain `tienda.perfumas.com.co` → Vercel; Hostinger DNS CNAME `tienda` → Vercel.
3. Medusa host `api.perfumas.com.co` with Supabase `DATABASE_URL`, migrate + seed.
4. Medusa `STORE_CORS` / `AUTH_CORS` must include:
   - `https://perfumas.com.co`
   - `https://tienda.perfumas.com.co`
5. Wompi webhook (production): `https://tienda.perfumas.com.co/api/payments/wompi/webhook` (shop host, not Hostinger)

---

## Vercel-only alternative (no Hostinger)

### Option A — two Vercel projects + domain rewrites

1. Deploy **marketing** as a static project with root directory `website/`, domain `perfumas.com.co`.
2. Deploy **shop** as Next.js with root directory `PERFUMAS-E-COMMERCE`.
3. On the marketing project, edit [`vercel.json`](./vercel.json): replace every `SHOP_DEPLOYMENT_URL` with your shop host (no trailing slash).
4. Attach `perfumas.com.co` to the marketing project.

### Option B — Cloudflare / Nginx reverse proxy

Keep `/tienda` on the same hostname without a redirect:

```
/tienda /crear /carrito /checkout /producto /mayoristas /cuenta /api /_next  →  Next.js
/*                                                                         →  website/
```

---

## Local simulation

```bash
# Terminal 1 — marketing
cd website && npx serve -p 5000

# Terminal 2 — shop
cd PERFUMAS-E-COMMERCE && npm run dev
```

Open marketing at `http://localhost:5000`. Shop links (`/tienda`) need the Next app (or Hostinger `.htaccess` redirects in production).
