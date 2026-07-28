# Perfumas website (marketing)

**Main project** for [perfumas.com.co](https://perfumas.com.co) — brand story, collection, benefits, FAQ, WhatsApp.

The **shop** is a separate Next.js app in [`../PERFUMAS-E-COMMERCE`](../PERFUMAS-E-COMMERCE). On the same domain:

| Path | App |
|------|-----|
| `/` , `/HTML/*`, `/Images/*` | This marketing site |
| `/tienda`, `/crear`, `/carrito`, … | E-commerce |

## Local preview

Open `index.html` in a browser, or serve statically:

```bash
npx serve .
```

Shop links (`/tienda`, `/crear`) need the Next app running (or production rewrites).

## Key CTAs → shop

- **Tienda / Comprar** → `/tienda`
- **Crear mi fragancia** → `/crear`
- **Carrito (bag)** → `/carrito`
- **Escríbenos** → WhatsApp (unchanged)
