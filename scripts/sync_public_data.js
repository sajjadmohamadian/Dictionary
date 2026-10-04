import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_FILE = path.join(ROOT_DIR, '.data', 'dictionary.json');
const PUBLIC_DATA_DIR = path.join(ROOT_DIR, 'public', 'data');
const PUBLIC_DICT_FILE = path.join(PUBLIC_DATA_DIR, 'dictionary.json');

console.log('--- Syncing Dictionary Data to Public Directory for Static / Cloudflare Deployment ---');

if (!fs.existsSync(DATA_FILE)) {
  console.error(`Source dictionary file not found at ${DATA_FILE}`);
  process.exit(1);
}

if (!fs.existsSync(PUBLIC_DATA_DIR)) {
  fs.mkdirSync(PUBLIC_DATA_DIR, { recursive: true });
}

// Read and validate source dictionary
const raw = fs.readFileSync(DATA_FILE, 'utf-8');
const entries = JSON.parse(raw);
console.log(`Loaded ${entries.length} dictionary entries from .data/dictionary.json`);

// Write minified or formatted to public/data/dictionary.json
fs.writeFileSync(PUBLIC_DICT_FILE, JSON.stringify(entries), 'utf-8');
const stats = fs.statSync(PUBLIC_DICT_FILE);
console.log(`Successfully wrote ${PUBLIC_DICT_FILE} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
console.log('Static data sync complete!');
