#!/usr/bin/env node
/**
 * Smoke tests for the Perfumas marketing site (static HTML at repo root).
 * Usage:
 *   node scripts/smoke-marketing.mjs
 *   node scripts/smoke-marketing.mjs --serve
 */
import http from "node:http";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const withServe = process.argv.includes("--serve");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
};

const requiredFiles = [
  "index.html",
  ".htaccess",
  "shop-config.js",
  "Images/Perfumas-logo.png",
  "HTML/about-us.html",
  "HTML/blog.html",
  "HTML/contact-us.html",
  "HTML/catalogo.html",
  "HTML/fragance-catalogue.html",
  "HTML/blogs/our-benefits.html",
  "HTML/blogs/fragrance-science.html",
  "HTML/blogs/gift-guide.html",
  "HTML/blogs/occasion-guides.html",
  "HTML/blogs/personal-style.html",
];

const requiredIndexSnippets = [
  "Perfumas",
  'href="/tienda"',
  'href="/crear"',
  'href="/carrito"',
  "Images/Perfumas-logo.png",
  "HTML/about-us.html",
];

const requiredHtaccessSnippets = [
  "RewriteEngine On",
  "tienda.perfumas.com.co",
  "tienda",
  "crear",
  "carrito",
];

let failed = 0;

function ok(msg) {
  console.log(`  OK  ${msg}`);
}

function fail(msg) {
  failed += 1;
  console.error(`  FAIL  ${msg}`);
}

function section(title) {
  console.log(`\n${title}`);
}

function assertExists(rel) {
  const full = join(root, rel);
  if (existsSync(full)) ok(`exists ${rel}`);
  else fail(`missing ${rel}`);
}

function assertFileContains(rel, snippets) {
  const full = join(root, rel);
  if (!existsSync(full)) {
    fail(`cannot read ${rel}`);
    return;
  }
  const text = readFileSync(full, "utf8");
  for (const s of snippets) {
    if (text.includes(s)) ok(`${rel} contains "${s}"`);
    else fail(`${rel} missing "${s}"`);
  }
}

function countHtmlPages(dir) {
  let n = 0;
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git" || name === "deploy" || name === "PERFUMAS-E-COMMERCE") continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) n += countHtmlPages(full);
    else if (name.endsWith(".html")) n += 1;
  }
  return n;
}

function startStaticServer(port) {
  const server = http.createServer((req, res) => {
    try {
      const url = new URL(req.url || "/", `http://127.0.0.1:${port}`);
      let pathname = decodeURIComponent(url.pathname);
      if (pathname.endsWith("/")) pathname += "index.html";
      const filePath = join(root, pathname.replace(/^\//, ""));
      if (!filePath.startsWith(root) || !existsSync(filePath) || statSync(filePath).isDirectory()) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not found");
        return;
      }
      const body = readFileSync(filePath);
      res.writeHead(200, {
        "Content-Type": MIME[extname(filePath).toLowerCase()] || "application/octet-stream",
      });
      res.end(body);
    } catch {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error");
    }
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve(server));
  });
}

async function runServeChecks() {
  section("HTTP smoke (built-in static server on :5055)");
  const port = 5055;
  const server = await startStaticServer(port);
  try {
    const home = await fetch(`http://127.0.0.1:${port}/`);
    const html = await home.text();
    if (home.ok && html.includes("Perfumas") && html.includes("<!DOCTYPE html")) {
      ok("GET / returns marketing homepage");
    } else {
      fail("GET / did not look like marketing homepage");
    }

    const about = await fetch(`http://127.0.0.1:${port}/HTML/about-us.html`);
    if (about.ok) ok("GET /HTML/about-us.html -> 200");
    else fail(`GET /HTML/about-us.html -> ${about.status}`);

    const logo = await fetch(`http://127.0.0.1:${port}/Images/Perfumas-logo.png`);
    if (logo.ok) ok("GET /Images/Perfumas-logo.png -> 200");
    else fail(`GET /Images/Perfumas-logo.png -> ${logo.status}`);

    const missing = await fetch(`http://127.0.0.1:${port}/this-page-should-404.html`);
    if (missing.status === 404) ok("unknown path -> 404");
    else fail(`unknown path -> ${missing.status}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

section("Required files");
for (const f of requiredFiles) assertExists(f);

section("Homepage content");
assertFileContains("index.html", requiredIndexSnippets);

section("Hostinger redirects");
assertFileContains(".htaccess", requiredHtaccessSnippets);
assertFileContains("shop-config.js", ["PERFUMAS_SHOP_ORIGIN", "tienda.perfumas.com.co"]);

section("Page inventory");
const htmlCount = countHtmlPages(root);
if (htmlCount >= 10) ok(`${htmlCount} HTML pages found`);
else fail(`expected >=10 HTML pages, found ${htmlCount}`);

section("Package script dry-run checks");
assertExists("scripts/package-hostinger.ps1");
assertExists("scripts/hostinger/.htaccess");

if (withServe) {
  await runServeChecks();
} else {
  section("HTTP smoke");
  console.log("  (skipped - run npm run test:serve to include local server checks)");
}

console.log("");
if (failed > 0) {
  console.error(`FAILED: ${failed} check(s)`);
  process.exit(1);
}
console.log("All marketing smoke checks passed.");
