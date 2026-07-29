# Hostinger upload package (generated)

Do **not** commit large generated trees if you prefer — regenerate with:

```powershell
powershell -File scripts/package-hostinger.ps1
```

Then in Hostinger File Manager → `public_html`:

1. Delete the default Hostinger page / wrong repo upload.
2. Upload **all files and folders inside** `deploy/hostinger-public_html/` (not the folder itself).
3. Confirm `public_html/index.html` exists.
4. Edit `.htaccess` and set the shop host if it is not `https://tienda.perfumas.com.co` yet.
