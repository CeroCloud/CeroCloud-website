# 🚀 CeroCloud Website Roadmap & Strategy

Este documento define la estrategia de evolución técnica y de producto para el sitio web de CeroCloud. El objetivo es consolidar una presencia web de clase mundial, optimizada para SEO, rendimiento y conversión de usuarios.

---

## 🟢 Corto Plazo (Q1 2026 - Inmediato)

**Foco: Estabilidad, SEO Técnico y Experiencia de Usuario (UX)**

### 1. Optimización SEO & Performance (Core Web Vitals)

- [x] **Reducción de CLS (Cumulative Layout Shift):** Implementar atributos de `width/height` en todas las imágenes restantes (Docs, Features).
- [x] **Lazy Loading Avanzado:** Implementar `IntersectionObserver` para diferir la carga de componentes pesados como el `Map` o videos hasta que el usuario haga scroll.
- [x] **Metaetiquetas Dinámicas:** Refinar descripciones, títulos y Open Graph (OG) en todas las sub-páginas para asegurar SEO y "Social Shareability" óptimos.
- [x] **Auditoría de Accesibilidad (A11y):** Asegurar tabbing correcto en el Navbar móvil y contrastes revisados.

### 2. Contenido y Documentación

- [x] **Buscador en Documentación:** Integrar una barra de búsqueda rápida (tipo Algolia o Fuse.js) en la sección `/docs`.
- [x] **Feedback en Docs:** Agregar sección "¿Te fue útil este artículo?" con 👍/👎 al final de cada página de documentación.
- [x] **Expansión Audit MCP:** Mejorar la herramienta MCP `audit_translations` para que no solo detecte claves faltantes, sino que incluya el texto fuente para facilitar la traducción.

---

## 🟡 Mediano Plazo (Q2 - Q3 2026)

**Foco: Adquisición de Usuarios y Automatización**

### 1. Marketing e Integraciones

- [ ] **Blog Técnico/Corporativo:** Crear una sección `/blog` usando MDX para publicar artículos sobre actualizaciones, tutoriales de inventario y casos de éxito.
- [ ] **Integración con Newsletter:** Añadir formulario de suscripción (ej. Mailchimp o Resend) en el Footer o modal de salida.
- [ ] **Analytics Privado:** Reemplazar o complementar Google Analytics con una solución privacy-first como Plausible o PostHog (self-hosted).

### 2. Automatización de Releases

- [ ] **Workflow de Despliegue Automático:** Configurar GitHub Actions para que al detectar un nuevo Tag en el repo `CeroCloud-Desktop`, se dispare un rebuild del website automáticamente para mostrar la nueva versión al instante.
- [ ] **Generación de Changelog:** Automatizar la creación de notas de la versión en formato amigable para el usuario final.

### 3. Interactividad Web

- [ ] **Live Demo (Simulador):** Crear una mini-interfaz web (usando componentes reales del Desktop pero con datos mock) que permita al usuario "probar" el POS directamente en el navegador sin instalar nada (WebAssembly o Mock UI).

---

## 🔴 Largo Plazo (2027+)

**Foco: Ecosistema y Comunidad**

### 1. Plataforma de Comunidad

- [ ] **Foro de Soporte / Q&A:** Implementar un foro integrado (o usar GitHub Discussions embebido) para que los usuarios se ayuden entre sí.
- [ ] **Showcase de Plugins:** Si CeroCloud soporta plugins, crear un "Marketplace" web donde la comunidad pueda subir y explorar extensiones.

### 2. Internacionalización Total

- [ ] **Soporte RTL:** Adaptar la interfaz para idiomas de derecha a izquierda (Árabe, Hebreo) si la expansión lo requiere.
- [ ] **Detección Geo-IP:** Redirigir automáticamente al usuario a su moneda y lenguaje local basado en su IP.

### 3. Arquitectura

- [ ] **Migración a Astro (Evaluación):** Evaluar si migrar de SPA (Vite) a Astro o Next.js (SSG/SSR) traería beneficios significativos en SEO para el Blog y Docs a medida que crecen a cientos de páginas.

---

## 📊 Métricas de Éxito (KPIs)

- **Performance:** Score Lighthouse > 95 en todas las categorías (Mobile/Desktop).

- **SEO:** Primeros resultados en Google para "POS Software Open Source [País]".
- **Conversión:** Aumentar el % de clicks en "Descargar" vs. Visitas totales.
