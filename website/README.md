# Perfumas website (marketing)

**Main project** for [perfumas.com.co](https://perfumas.com.co) — brand story, collection, benefits, FAQ, WhatsApp.

The **shop** is a separate Next.js app in [`../PERFUMAS-E-COMMERCE`](../PERFUMAS-E-COMMERCE).

## Hostinger deploy

Do **not** upload the whole git repo. Hostinger needs `index.html` in `public_html/`.

```powershell
# from repo root
powershell -File scripts/package-hostinger.ps1
```

Upload the contents of `deploy/hostinger-public_html/` into Hostinger `public_html/`.  
Full guide: [`../HOSTING.md`](../HOSTING.md).

## Local preview

```bash
npx serve .
```

## Key CTAs → shop

On production (Hostinger), `.htaccess` redirects these to `https://tienda.perfumas.com.co/...`:

- **Tienda / Comprar** → `/tienda`
- **Crear mi fragancia** → `/crear`
- **Carrito (bag)** → `/carrito`
- **Escríbenos** → WhatsApp (unchanged)
