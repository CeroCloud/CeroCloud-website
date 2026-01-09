/**
 * IndexNow Script - Notifica a Bing/Yahoo sobre actualizaciones instantáneamente
 * 
 * Uso:
 * node scripts/indexnow.js
 */

import https from 'https';

const config = {
    host: 'cerocloud.github.io',
    key: '2ac8d26e5e924173b34bdffa1e642511',
    keyLocation: 'https://cerocloud.github.io/CeroCloud-website/2ac8d26e5e924173b34bdffa1e642511.txt',
    urlList: [
        'https://cerocloud.github.io/CeroCloud-website/',
        'https://cerocloud.github.io/CeroCloud-website/tour',
        'https://cerocloud.github.io/CeroCloud-website/docs',
        'https://cerocloud.github.io/CeroCloud-website/releases',
        'https://cerocloud.github.io/CeroCloud-website/security',
        'https://cerocloud.github.io/CeroCloud-website/roadmap',
    ]
};

function submitToIndexNow() {
    const payload = JSON.stringify({
        host: config.host,
        key: config.key,
        keyLocation: config.keyLocation,
        urlList: config.urlList
    });

    const options = {
        hostname: 'www.bing.com',
        port: 443,
        path: '/indexnow',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': Buffer.byteLength(payload)
        }
    };

    console.log('📡 Enviando URLs a IndexNow (Bing/Yahoo)...\n');
    console.log(`📦 Enviando ${config.urlList.length} URLs`);

    const req = https.request(options, (res) => {
        console.log(`\n✅ Código de respuesta: ${res.statusCode}`);
        
        if (res.statusCode === 200) {
            console.log('✅ URLs enviadas exitosamente a Bing/Yahoo');
            console.log('⏱️  Las páginas deberían indexarse en minutos/horas');
        } else if (res.statusCode === 202) {
            console.log('✅ URLs recibidas y en cola para procesamiento');
        } else {
            console.log('⚠️  Respuesta inesperada');
        }

        res.on('data', (d) => {
            if (d.length > 0) {
                console.log('\n📄 Respuesta:', d.toString());
            }
        });
    });

    req.on('error', (error) => {
        console.error('❌ Error:', error.message);
    });

    req.write(payload);
    req.end();
}

// Ejecutar
submitToIndexNow();
