# Packages marketing site root into deploy/hostinger-public_html/ for Hostinger File Manager.
# Upload the CONTENTS of that folder into public_html (so index.html is at the root).

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")

$out = Join-Path $root "deploy\hostinger-public_html"
$index = Join-Path $root "index.html"

if (-not (Test-Path $index)) {
  Write-Error "Missing index.html at $root - marketing site must live at repo root."
}

if (Test-Path $out) {
  Remove-Item -Recurse -Force $out
}
New-Item -ItemType Directory -Path $out | Out-Null

$copyNames = @("index.html", "HTML", "Images", ".htaccess", "shop-config.js")
foreach ($name in $copyNames) {
  $src = Join-Path $root $name
  if (-not (Test-Path $src)) {
    Write-Error "Missing required path: $src"
  }
  Copy-Item -Path $src -Destination (Join-Path $out $name) -Recurse -Force
}

Write-Host ""
Write-Host "Ready: $out"
Write-Host "Upload EVERYTHING inside that folder into Hostinger public_html/"
Write-Host "Confirm public_html/index.html exists after upload."
Write-Host ""
