import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO = 'CeroCloud/CeroCloud-Desktop';
const OUT_FILE = path.resolve(__dirname, '../src/content/releases_static.json');

async function fetchReleases() {
    console.log(`Fetching releases for ${REPO}...`);
    try {
        const response = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=20`);

        if (!response.ok) {
            console.warn(`Warning: Failed to fetch releases (${response.status} ${response.statusText}). Using empty fallback.`);
            saveFile([]);
            return;
        }

        const data = await response.json();
        saveFile(data);
        console.log(`✅ Successfully saved ${data.length} releases to releases_static.json`);
    } catch (error) {
        console.error('❌ Error fetching releases:', error);
        saveFile([]);
    }
}

function saveFile(data) {
    const dir = path.dirname(OUT_FILE);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(OUT_FILE, JSON.stringify(data, null, 2));
}

fetchReleases();
