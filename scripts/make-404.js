import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexFile = path.join(distDir, 'index.html');
const notFoundFile = path.join(distDir, '404.html');

console.log(' Generando 404.html para GitHub Pages...');

try {
    if (fs.existsSync(indexFile)) {
        fs.copyFileSync(indexFile, notFoundFile);
        console.log(' Éxito: index.html copiado a 404.html');
    } else {
        console.error(' Error: No se encontró dist/index.html. Asegúrate de ejecutar el build primero.');
        process.exit(1);
    }
} catch (error) {
    console.error('Error copiando el archivo:', error);
    process.exit(1);
}
