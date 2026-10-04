import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '../public');

// 1. Standard SVG Icon (512x512)
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f766e" />
      <stop offset="50%" stop-color="#0d9488" />
      <stop offset="100%" stop-color="#042f2e" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#021a18" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Background rounded rectangle for standard icon -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />

  <!-- Subtle geometric background pattern (Azerbaijani heritage rosette motif) -->
  <g opacity="0.08" stroke="#ffffff" stroke-width="2" fill="none">
    <circle cx="256" cy="256" r="180" />
    <circle cx="256" cy="256" r="130" />
    <rect x="176" y="176" width="160" height="160" rx="20" transform="rotate(45 256 256)" />
  </g>

  <!-- Open Book & Linguistic Symbolism -->
  <g filter="url(#shadow)" transform="translate(0, 10)">
    <!-- Book Spine / Left Page Shadow -->
    <path d="M256 360 C210 325 150 325 100 338 L100 178 C150 165 210 165 256 200 Z" fill="#f1f5f9" />
    <!-- Left Page Subtle Lines -->
    <path d="M125 215 C160 205 200 205 235 228" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" fill="none" />
    <path d="M125 245 C160 235 200 235 235 258" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" fill="none" />
    <path d="M125 275 C160 265 200 265 235 288" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" fill="none" />

    <!-- Right Page (Persian/Azerbaijani text side) -->
    <path d="M256 360 C302 325 362 325 412 338 L412 178 C362 165 302 165 256 200 Z" fill="#ffffff" />
    <!-- Right Page Subtle Lines -->
    <path d="M387 215 C352 205 312 205 277 228" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" fill="none" />
    <path d="M387 245 C352 235 312 235 277 258" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" fill="none" />
    <path d="M387 275 C352 265 312 265 277 288" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" fill="none" />

    <!-- Central Spine Ridge -->
    <path d="M256 200 L256 368" stroke="#0d9488" stroke-width="6" stroke-linecap="round" />

    <!-- Golden Bookmark Ribbon -->
    <path d="M250 170 L250 250 L256 242 L262 250 L262 170 Z" fill="url(#goldGrad)" />

    <!-- 8-pointed star of Azerbaijan (Səkkizguşəli ulduz) at the apex -->
    <g transform="translate(256, 128) scale(0.65)">
      <polygon points="0,-32 8,-8 32,0 8,8 0,32 -8,8 -32,0 -8,-8" fill="url(#goldGrad)" />
      <polygon points="0,-32 8,-8 32,0 8,8 0,32 -8,8 -32,0 -8,-8" fill="url(#goldGrad)" transform="rotate(45)" />
      <circle cx="0" cy="0" r="5" fill="#ffffff" />
    </g>
  </g>

  <!-- Title Badge / Sözlük -->
  <text x="256" y="420" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="4">SÖZLÜK</text>
  <text x="256" y="450" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="#a7f3d0" text-anchor="middle" letter-spacing="1">سؤزلوک • لغت‌نامه ترکی</text>
</svg>`;

// 2. Maskable SVG Icon (512x512) with full-bleed background and 15% safe margin
const svgMaskableIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGradMask" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f766e" />
      <stop offset="50%" stop-color="#0d9488" />
      <stop offset="100%" stop-color="#042f2e" />
    </linearGradient>
    <linearGradient id="goldGradMask" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <filter id="shadowMask" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#021a18" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Full-bleed background with NO rounded corners for maskable -->
  <rect width="512" height="512" fill="url(#bgGradMask)" />

  <!-- Scaled inside 80% safe zone (0.8 scale centered at 256, 256) -->
  <g transform="translate(51.2, 51.2) scale(0.8)">
    <!-- Subtle geometric background pattern -->
    <g opacity="0.08" stroke="#ffffff" stroke-width="2" fill="none">
      <circle cx="256" cy="256" r="180" />
      <circle cx="256" cy="256" r="130" />
      <rect x="176" y="176" width="160" height="160" rx="20" transform="rotate(45 256 256)" />
    </g>

    <!-- Open Book & Linguistic Symbolism -->
    <g filter="url(#shadowMask)" transform="translate(0, 10)">
      <path d="M256 360 C210 325 150 325 100 338 L100 178 C150 165 210 165 256 200 Z" fill="#f1f5f9" />
      <path d="M125 215 C160 205 200 205 235 228" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" fill="none" />
      <path d="M125 245 C160 235 200 235 235 258" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" fill="none" />
      <path d="M125 275 C160 265 200 265 235 288" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" fill="none" />

      <path d="M256 360 C302 325 362 325 412 338 L412 178 C362 165 302 165 256 200 Z" fill="#ffffff" />
      <path d="M387 215 C352 205 312 205 277 228" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" fill="none" />
      <path d="M387 245 C352 235 312 235 277 258" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" fill="none" />
      <path d="M387 275 C352 265 312 265 277 288" stroke="#cbd5e1" stroke-width="5" stroke-linecap="round" fill="none" />

      <path d="M256 200 L256 368" stroke="#0d9488" stroke-width="6" stroke-linecap="round" />

      <path d="M250 170 L250 250 L256 242 L262 250 L262 170 Z" fill="url(#goldGradMask)" />

      <g transform="translate(256, 128) scale(0.65)">
        <polygon points="0,-32 8,-8 32,0 8,8 0,32 -8,8 -32,0 -8,-8" fill="url(#goldGradMask)" />
        <polygon points="0,-32 8,-8 32,0 8,8 0,32 -8,8 -32,0 -8,-8" fill="url(#goldGradMask)" transform="rotate(45)" />
        <circle cx="0" cy="0" r="5" fill="#ffffff" />
      </g>
    </g>

    <text x="256" y="420" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="4">SÖZLÜK</text>
    <text x="256" y="450" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="#a7f3d0" text-anchor="middle" letter-spacing="1">سؤزلوک • لغت‌نامه ترکی</text>
  </g>
</svg>`;

async function main() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  // Write SVG files
  fs.writeFileSync(path.join(PUBLIC_DIR, 'icon.svg'), svgIcon, 'utf8');
  console.log('Created public/icon.svg');

  const svgBuffer = Buffer.from(svgIcon);
  const maskableSvgBuffer = Buffer.from(svgMaskableIcon);

  // Generate pwa-512x512.png
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'pwa-512x512.png'));
  console.log('Created public/pwa-512x512.png');

  // Generate pwa-192x192.png
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'pwa-192x192.png'));
  console.log('Created public/pwa-192x192.png');

  // Generate pwa-maskable-512x512.png
  await sharp(maskableSvgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'pwa-maskable-512x512.png'));
  console.log('Created public/pwa-maskable-512x512.png');

  // Generate apple-touch-icon.png (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
  console.log('Created public/apple-touch-icon.png');

  // Generate favicon-32x32.png and favicon.ico
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'favicon.ico'));
  console.log('Created public/favicon.ico');

  console.log('All PWA icons generated successfully!');
}

main().catch(console.error);
