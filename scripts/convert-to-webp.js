/**
 * Script para convertir imágenes PNG a WebP
 * 
 * Requisitos:
 * npm install sharp
 * 
 * Uso:
 * node scripts/convert-to-webp.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToConvert = [
    'src/assets/dashboard-light.png',
    'src/assets/dashboard-dark.png',
    'src/assets/docs/pos-light.png',
    'src/assets/docs/pos-dark.png',
    'src/assets/docs/inventory-light.png',
    'src/assets/docs/inventory-dark.png',
    'src/assets/docs/settings-light.png',
    'src/assets/docs/settings-dark.png',
    'src/assets/docs/welcome-light.png',
    'src/assets/docs/welcome-dark.png',
];

async function convertToWebP() {
    console.log('🖼️  Convirtiendo imágenes a WebP con calidad 90%...\n');
    
    for (const imagePath of imagesToConvert) {
        const fullPath = path.join(__dirname, '..', imagePath);
        
        if (!fs.existsSync(fullPath)) {
            console.log(`⚠️  No encontrado: ${imagePath}`);
            continue;
        }
        
        const outputPath = fullPath.replace('.png', '.webp');
        
        try {
            await sharp(fullPath)
                .webp({ quality: 90 })
                .toFile(outputPath);
            
            const originalSize = fs.statSync(fullPath).size;
            const webpSize = fs.statSync(outputPath).size;
            const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);
            
            console.log(`✅ ${path.basename(imagePath)}`);
            console.log(`   Original: ${(originalSize / 1024).toFixed(1)} KB`);
            console.log(`   WebP: ${(webpSize / 1024).toFixed(1)} KB`);
            console.log(`   Ahorro: ${savings}%\n`);
        } catch (error) {
            console.error(`❌ Error convirtiendo ${imagePath}:`, error.message);
        }
    }
    
    console.log('✨ Conversión completada!');
    console.log('\n📝 Próximos pasos:');
    console.log('1. Actualiza los imports para usar .webp');
    console.log('2. O usa <picture> con fallback a PNG');
}

convertToWebP().catch(console.error);
