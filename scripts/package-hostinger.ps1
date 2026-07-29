# Packages website/ into deploy/hostinger-public_html/ for Hostinger File Manager.
# Upload the CONTENTS of that folder into public_html (so index.html is at the root).

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
if (-not (Test-Path (Join-Path $root "website\index.html"))) {
  # script lives in repo root /scripts
  $root = Resolve-Path (Join-Path $PSScriptRoot "..")
}

$website = Join-Path $root "website"
$out = Join-Path $root "deploy\hostinger-public_html"

if (-not (Test-Path (Join-Path $website "index.html"))) {
  Write-Error "Missing website/index.html at $website"
}

if (Test-Path $out) {
  Remove-Item -Recurse -Force $out
}
New-Item -ItemType Directory -Path $out | Out-Null

# Copy marketing assets (exclude README / node junk)
$exclude = @("README.md", ".git", "node_modules")
Get-ChildItem -Path $website -Force | Where-Object {
  $exclude -notcontains $_.Name
} | ForEach-Object {
  Copy-Item -Path $_.FullName -Destination (Join-Path $out $_.Name) -Recurse -Force
}

# Hostinger Apache helpers (shop redirects + SPA-safe defaults)
Copy-Item -Path (Join-Path $PSScriptRoot "hostinger\.htaccess") -Destination (Join-Path $out ".htaccess") -Force
Copy-Item -Path (Join-Path $PSScriptRoot "hostinger\shop-config.js") -Destination (Join-Path $out "shop-config.js") -Force

Write-Host ""
Write-Host "Ready: $out"
Write-Host "Upload EVERYTHING inside that folder into Hostinger public_html/"
Write-Host "Confirm public_html/index.html exists after upload."
Write-Host ""
