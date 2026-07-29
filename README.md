# Perfumas Web Page (marketing)

Static marketing site for [perfumas.com.co](https://perfumas.com.co) — hero, colección, beneficios, FAQ, WhatsApp.

The **shop** lives in a separate repo: [Perfumas-E-Commerce](https://github.com/Santy2206/Perfumas-E-Commerce) (Next.js + Medusa).

## Layout

Marketing files sit at the **repo root** so Hostinger (and Git deploy) can serve `index.html` directly:

| Path | Role |
|------|------|
| `index.html` | Homepage |
| `HTML/` | About, blog, contact, catalogue pages |
| `Images/` | Brand and page assets |
| `.htaccess` | Redirects `/tienda`, `/crear`, … → shop host |
| `shop-config.js` | Optional shop origin for pages |
| `scripts/package-hostinger.ps1` | Build upload package |
| `deploy/hostinger-public_html/` | Generated Hostinger package |
| [`HOSTING.md`](./HOSTING.md) | Hostinger + shop subdomain guide |

## URL map

| URL | Serves |
|-----|--------|
| `/` , `/HTML/*`, `/Images/*` | This marketing site |
| `/tienda`, `/crear`, `/carrito`, … | `.htaccess` → [shop on Vercel](https://github.com/Santy2206/Perfumas-E-Commerce) |

## Develop

```bash
npm run dev
```

Open `http://localhost:5000`.

## Test

```bash
npm test              # file + content smoke checks
npm run test:serve    # same + local HTTP checks
```

## Hostinger

```powershell
npm run package
# or: powershell -File scripts/package-hostinger.ps1
```

Upload contents of `deploy/hostinger-public_html/` into `public_html/`.  
Because the site already lives at the repo root, connecting Hostinger → this GitHub repo also works if the document root is the clone root.

See [`HOSTING.md`](./HOSTING.md).
