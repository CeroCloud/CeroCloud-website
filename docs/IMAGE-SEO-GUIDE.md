# 📸 Guía de Optimización de Imágenes para SEO

## ✅ Optimizaciones Implementadas

### 1. **Lazy Loading**
Todas las imágenes tienen `loading="lazy"` para cargar solo cuando son visibles.

### 2. **Alt Text Descriptivos**
Cada imagen tiene un alt detallado con:
- Descripción del contenido
- Contexto (modo claro/oscuro)
- Palabras clave relevantes

### 3. **Sitemap de Imágenes**
`public/sitemap.xml` incluye:
- Namespace de Google Images
- 6 imágenes principales indexadas
- Títulos y captions descriptivos

### 4. **Robots.txt Optimizado**
Permite explícitamente a Googlebot-Image rastrear `/assets/`

### 5. **Structured Data (JSON-LD)**
Schema.org SoftwareApplication con arrays de imágenes y screenshots.

### 6. **Meta Tags Open Graph**
Todas las páginas principales tienen:
- `og:image` con URLs completas
- `og:image:alt` descriptivos
- Dimensiones de imagen

---

## 🚀 Optimización Futura: Conversión a WebP

### Opción A: Conversión Manual (Recomendado)

1. **Instala Sharp:**
   ```bash
   npm install sharp --save-dev
   ```

2. **Ejecuta el script de conversión:**
   ```bash
   node scripts/convert-to-webp.js
   ```

3. **Resultado:** Imágenes WebP con 90% de calidad (25-35% más ligeras)

### Opción B: Online (Sin instalaciones)

1. Ve a [Squoosh.app](https://squoosh.app/)
2. Arrastra las imágenes PNG
3. Selecciona WebP con calidad 85-90%
4. Descarga y reemplaza

---

## 📋 Checklist de SEO para Nuevas Imágenes

Cuando agregues una imagen nueva:

- [ ] Nombre descriptivo: `producto-zapatos-nike-rojos.png`
- [ ] Alt text completo: `"Zapatos deportivos rojos Nike para correr - CeroCloud"`
- [ ] `loading="lazy"` en el tag
- [ ] `title` attribute opcional
- [ ] Agregar al sitemap si es importante
- [ ] Texto descriptivo cercano
- [ ] Formato WebP si es posible

---

## 🎯 Impacto Esperado

Con estas optimizaciones:
- ✅ Google indexará tus imágenes en 2-7 días
- ✅ Aparecerán en Google Imágenes con contexto
- ✅ Mejor ranking por alt descriptivos
- ✅ Carga 30% más rápida (con WebP)
- ✅ Mejor experiencia móvil

---

## 🔍 Verificación

Después del deploy:
1. Google Search Console → Cobertura → Ver imágenes indexadas
2. Buscar: `site:cerocloud.github.io` en Google Imágenes
3. Lighthouse: Revisar score de Performance
