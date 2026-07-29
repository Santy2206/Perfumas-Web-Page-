# Same-domain hosting — perfumas.com.co

Marketing is this repo (static HTML at the root).  
E-commerce is a **separate GitHub repo**: [Perfumas-E-Commerce](https://github.com/Santy2206/Perfumas-E-Commerce) (Next.js shop + Medusa).

## URL map (Hostinger + shop subdomain)

| Path / host | App |
|-------------|-----|
| `https://perfumas.com.co/` , `/HTML/*`, `/Images/*` | Static marketing on **Hostinger** `public_html` |
| `https://perfumas.com.co/tienda` (etc.) | **302 redirect** via `.htaccess` → shop subdomain |
| `https://tienda.perfumas.com.co/*` | Next.js shop on **Vercel** |
| `https://api.perfumas.com.co` | Medusa on **Railway / Render / Fly** |

---

## Hostinger (shared / Web hosting)

Hostinger serves **`public_html/`** and needs **`public_html/index.html`**.

This repo already has `index.html` at the root (plus `HTML/`, `Images/`, `.htaccess`).

### Option A — File Manager package

```powershell
npm run package
```

Builds `deploy/hostinger-public_html/` with:

```
index.html
HTML/
Images/
.htaccess
shop-config.js
```

1. Hostinger → **Files** → **File Manager** → `public_html`.
2. Remove the default Hostinger page / wrong upload.
3. Upload **everything inside** `deploy/hostinger-public_html/`.
4. Confirm **`public_html/index.html`** exists.
5. Open `https://perfumas.com.co/`.
6. If the shop URL is not ready, edit `public_html/.htaccess` and point redirects at your temporary `*.vercel.app` host.

### Option B — Hostinger ↔ GitHub

Connect this marketing repo and set the deploy root to the **repository root** (not a nested `website/` folder). Do not deploy the shop repo into `public_html`.

**Do not** put Next.js or Medusa inside `public_html` — shared hosting cannot run them.

See also [`deploy/README.md`](./deploy/README.md).

---

## Shop on Vercel + Medusa

Full checklist: [Perfumas-E-Commerce `DEPLOY.md`](https://github.com/Santy2206/Perfumas-E-Commerce/blob/main/DEPLOY.md).

Summary:

1. Vercel project from **Perfumas-E-Commerce** (repo root = Next app), env from `.env.example` + Medusa `.seed-output.json`.
2. Domain `tienda.perfumas.com.co` → Vercel; Hostinger DNS CNAME `tienda` → Vercel.
3. Medusa host `api.perfumas.com.co` with Supabase `DATABASE_URL`, migrate + seed.
4. Medusa `STORE_CORS` / `AUTH_CORS` must include:
   - `https://perfumas.com.co`
   - `https://tienda.perfumas.com.co`
5. Wompi webhook (production): `https://tienda.perfumas.com.co/api/payments/wompi/webhook` (shop host, not Hostinger)

---

## Vercel-only alternative (no Hostinger)

### Option A — two Vercel projects + domain rewrites

1. Deploy **marketing** as a static project from this repo root, domain `perfumas.com.co`.
2. Deploy **shop** from [Perfumas-E-Commerce](https://github.com/Santy2206/Perfumas-E-Commerce).
3. On the marketing project, edit [`vercel.json`](./vercel.json): replace every `SHOP_DEPLOYMENT_URL` with your shop host (no trailing slash).
4. Attach `perfumas.com.co` to the marketing project.

### Option B — Cloudflare / Nginx reverse proxy

Keep `/tienda` on the same hostname without a redirect:

```
/tienda /crear /carrito /checkout /producto /mayoristas /cuenta /api /_next  →  Next.js
/*                                                                         →  marketing static
```

---

## Local simulation

```bash
# Terminal 1 — marketing (this repo)
npm run dev

# Terminal 2 — shop (clone Perfumas-E-Commerce separately)
cd ../Perfumas-E-Commerce && npm run dev
```

Open marketing at `http://localhost:5000`. Shop paths need the Next app (or production `.htaccess` redirects).

```bash
npm test
npm run test:serve
```
