# Guía de Continuación - Refactorización Portfolio

Este documento detalla exactamente qué archivos crear y cómo continuar la refactorización desde donde se dejó.

## 📍 Estado Actual

✅ **Completado**:
- Build system (Vite, Tailwind, PostCSS)
- Optimización de imágenes (WebP/AVIF, srcsets)
- Sitemap.xml y robots.txt
- Estructura modular base (config.js, projects.js, technologies.js)

⏳ **Pendiente**:
- Refactorización completa de JavaScript
- Implementación SEO (JSON-LD)
- Actualización HTML con picture elements
- ARIA y accesibilidad
- GitHub Actions
- Testing

---

## 🚀 Paso 1: Crear Utilidades DOM Seguras

### Archivo: `js/modules/utils/dom.js`

```javascript
/**
 * Utilidades DOM seguras - previene XSS
 * @module utils/dom
 */

/**
 * Crea elemento DOM de forma segura (sin innerHTML)
 * @param {string} tag - Tag HTML
 * @param {Object} props - Propiedades del elemento
 * @returns {HTMLElement}
 */
export function createElement(tag, props = {}) {
  const element = document.createElement(tag);

  Object.entries(props).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'textContent') {
      element.textContent = value; // Auto-sanitizado
    } else if (key === 'children' && Array.isArray(value)) {
      value.forEach(child => {
        if (child instanceof Node) {
          element.appendChild(child);
        }
      });
    } else {
      element.setAttribute(key, value);
    }
  });

  return element;
}

/**
 * Crea picture element responsivo con WebP/AVIF
 * @param {string} src - Ruta de imagen base
 * @param {string} alt - Texto alternativo
 * @param {Object} options - Opciones adicionales
 * @returns {HTMLPictureElement}
 */
export function createResponsiveImage(src, alt, options = {}) {
  const {
    loading = 'lazy',
    decoding = 'async',
    className = '',
    sizes = '(max-width: 768px) 100vw, 800px'
  } = options;

  const picture = createElement('picture');

  // Obtener nombre base sin extensión
  const baseName = src.replace(/\.(png|jpg|jpeg|webp|avif)$/, '');

  // Source AVIF (formato más moderno)
  const avifSource = createElement('source', {
    type: 'image/avif',
    srcset: `${baseName}-400w.avif 400w, ${baseName}-800w.avif 800w, ${baseName}-1200w.avif 1200w`,
    sizes: sizes
  });

  // Source WebP (soporte amplio)
  const webpSource = createElement('source', {
    type: 'image/webp',
    srcset: `${baseName}-400w.webp 400w, ${baseName}-800w.webp 800w, ${baseName}-1200w.webp 1200w`,
    sizes: sizes
  });

  // Fallback IMG (navegadores antiguos)
  const ext = src.match(/\.(png|jpg|jpeg)$/)?.[0] || '.jpg';
  const fallbackSrc = baseName + (ext === '.png' ? '.jpg' : ext);

  const img = createElement('img', {
    src: fallbackSrc,
    alt: sanitizeText(alt),
    loading: loading,
    decoding: decoding,
    className: className
  });

  picture.appendChild(avifSource);
  picture.appendChild(webpSource);
  picture.appendChild(img);

  return picture;
}

/**
 * Crea tarjeta de proyecto segura
 * @param {Object} project - Datos del proyecto
 * @returns {HTMLElement}
 */
export function createProjectCard(project) {
  const card = createElement('div', {
    className: 'bg-gray-800 rounded-2xl shadow-lg border border-gray-700 hover:shadow-2xl transition-all flex flex-col overflow-hidden'
  });

  // Imagen responsiva
  const picture = createResponsiveImage(project.imagen, project.titulo, {
    className: 'w-full h-40 object-cover'
  });

  // Contenido
  const content = createElement('div', { className: 'p-4 flex-1 flex flex-col' });

  // Header con año y estado
  const header = createElement('div', { className: 'flex items-center justify-between mb-2' });

  const yearBadge = createElement('span', {
    className: 'text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded',
    textContent: project.anio
  });

  const statusColor = getStatusColor(project.estado);
  const statusBadge = createElement('span', {
    className: `text-xs px-2 py-1 rounded ${statusColor}`,
    textContent: project.estado
  });

  header.appendChild(yearBadge);
  header.appendChild(statusBadge);

  // Título
  const title = createElement('h3', {
    className: 'text-base font-bold text-white mb-1',
    textContent: project.titulo
  });

  // Tags
  const tagsContainer = createElement('div', { className: 'flex flex-wrap gap-2 mb-2' });
  project.etiquetas.forEach(tag => {
    const tagElement = createElement('span', {
      className: 'text-xs bg-gray-600 text-gray-200 px-2 py-1 rounded',
      textContent: tag
    });
    tagsContainer.appendChild(tagElement);
  });

  // Descripción
  const description = createElement('p', {
    className: 'text-gray-400 text-xs mb-2 flex-1',
    textContent: project.descripcion
  });

  // Footer con fecha y enlace
  const footer = createElement('div', { className: 'flex items-end justify-between mt-auto' });

  const date = createElement('span', {
    className: 'text-xs text-gray-500',
    textContent: project.fecha
  });

  footer.appendChild(date);

  if (project.enlace) {
    const link = createElement('a', {
      href: project.enlace,
      target: '_blank',
      rel: 'noopener noreferrer',
      className: 'text-blue-400 hover:underline text-xs font-medium',
      textContent: 'Ver más'
    });
    footer.appendChild(link);
  }

  // Ensamblar
  content.appendChild(header);
  content.appendChild(title);
  content.appendChild(tagsContainer);
  content.appendChild(description);
  content.appendChild(footer);

  card.appendChild(picture);
  card.appendChild(content);

  return card;
}

/**
 * Sanitiza texto para prevenir XSS
 * @param {string} text - Texto a sanitizar
 * @returns {string}
 */
export function sanitizeText(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Obtiene color de badge según estado
 * @param {string} estado - Estado del proyecto
 * @returns {string} - Clases Tailwind
 */
function getStatusColor(estado) {
  const colors = {
    'Trabajo actual': 'bg-green-700 text-green-200',
    'En desarrollo': 'bg-yellow-700 text-yellow-200',
    'Trabajos anteriores': 'bg-purple-700 text-purple-200'
  };
  return colors[estado] || 'bg-gray-700 text-gray-200';
}

/**
 * Limpia contenedor de forma segura
 * @param {HTMLElement} container - Contenedor a limpiar
 */
export function clearContainer(container) {
  if (container) {
    container.replaceChildren();
  }
}
```

---

## 🚀 Paso 2: Refactorizar `js/projects.js`

Reemplazar todo el contenido con:

```javascript
/**
 * Renderizado de proyectos - Refactorizado
 * @module projects
 */

import { PROJECTS_DATA } from './modules/data/projects.js';
import { createProjectCard, clearContainer } from './modules/utils/dom.js';

/**
 * Renderiza proyectos destacados (homepage)
 * @param {string} containerId - ID del contenedor
 * @param {number} limit - Número de proyectos a mostrar
 */
export function renderFeaturedProjects(containerId = 'proyectos-galeria-principal', limit = 3) {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`[Projects] Container #${containerId} not found`);
    return;
  }

  // Limpiar de forma segura
  clearContainer(container);

  // Crear fragmento para mejor performance
  const fragment = document.createDocumentFragment();

  // Renderizar proyectos destacados
  const featuredProjects = PROJECTS_DATA.slice(0, limit);

  featuredProjects.forEach(project => {
    const card = createProjectCard(project);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

/**
 * Renderiza todos los proyectos (página proyectos.html)
 * @param {string} containerId - ID del contenedor
 */
export function renderAllProjects(containerId = 'proyectos-galeria') {
  const container = document.getElementById(containerId);

  if (!container) {
    console.warn(`[Projects] Container #${containerId} not found`);
    return;
  }

  // Limpiar de forma segura
  clearContainer(container);

  // Crear fragmento
  const fragment = document.createDocumentFragment();

  // Renderizar todos los proyectos
  PROJECTS_DATA.forEach(project => {
    const card = createProjectCard(project);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

/**
 * Inicializa renderizado de proyectos según página
 */
function initProjects() {
  const path = window.location.pathname;

  if (path.includes('proyectos.html')) {
    renderAllProjects();
  } else if (path.includes('index.html') || path === '/' || path === '') {
    renderFeaturedProjects();
  }
}

// Ejecutar cuando DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjects);
} else {
  initProjects();
}
```

---

## 🚀 Paso 3: Refactorizar `js/main.js`

Refactorizar para usar módulos:

```javascript
/**
 * Entry point principal - Refactorizado
 * @module main
 */

import { SITE_CONFIG, PERFORMANCE_CONFIG } from './modules/config.js';
import { setupContactForm } from './modules/api/contact.js';
import { setupScrollIndicator, setupParallaxEffect } from './modules/components/scroll.js';

/**
 * Inicializa la aplicación
 */
function initializeApp() {
  // Configurar formulario de contacto
  setupContactForm();

  // Configurar efectos de scroll
  setupScrollIndicator();
  setupParallaxEffect();

  // Animaciones al scroll
  setupScrollAnimations();
}

/**
 * Configura animaciones al scroll con Intersection Observer
 */
function setupScrollAnimations() {
  const observerOptions = {
    threshold: PERFORMANCE_CONFIG.intersectionThreshold,
    rootMargin: PERFORMANCE_CONFIG.lazyLoadMargin
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar elementos con clase .animate-on-scroll
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// Inicializar cuando DOM esté listo
document.addEventListener('DOMContentLoaded', initializeApp);
```

---

## 🚀 Paso 4: Crear Módulo de Contacto

### Archivo: `js/modules/api/contact.js`

```javascript
/**
 * Módulo de API de contacto
 * @module api/contact
 */

import { SITE_CONFIG, API_CONFIG, VALIDATION } from '../config.js';

/**
 * Configura formulario de contacto
 */
export function setupContactForm() {
  const form = document.getElementById('contactForm');
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('closePopup');

  if (!form) return;

  form.addEventListener('submit', handleFormSubmit);

  if (closePopup && popup) {
    closePopup.addEventListener('click', () => hidePopup(popup));
  }
}

/**
 * Maneja envío del formulario
 * @param {Event} e - Evento de submit
 */
async function handleFormSubmit(e) {
  e.preventDefault();

  const formData = {
    nombre: e.target.nombre.value.trim(),
    correo: e.target.correo.value.trim(),
    telefono: e.target.telefono?.value.trim() || '',
    mensaje: e.target.mensaje.value.trim()
  };

  // Validación
  if (!validateFormData(formData)) {
    return;
  }

  // Deshabilitar botón durante envío
  const submitButton = e.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Enviando...';

  try {
    const response = await fetchWithTimeout(
      SITE_CONFIG.contactApi,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      },
      API_CONFIG.timeout
    );

    const data = await response.json();

    if (response.ok) {
      e.target.reset();
      showPopup();
    } else {
      showError(`Error: ${data.error?.message || 'No se pudo enviar el mensaje'}`);
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      showError('Tiempo de espera agotado. Por favor, intenta nuevamente.');
    } else {
      showError(`Error de red: ${error.message}`);
    }
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
}

/**
 * Valida datos del formulario
 * @param {Object} data - Datos del formulario
 * @returns {boolean}
 */
function validateFormData(data) {
  if (!data.nombre || data.nombre.length < 2) {
    showError('Por favor, ingresa tu nombre');
    return false;
  }

  if (!VALIDATION.email.test(data.correo)) {
    showError('Por favor, ingresa un correo válido');
    return false;
  }

  if (data.telefono && !VALIDATION.phone.test(data.telefono)) {
    showError('Por favor, ingresa un teléfono válido');
    return false;
  }

  if (!data.mensaje || data.mensaje.length < 10) {
    showError('Por favor, ingresa un mensaje (mínimo 10 caracteres)');
    return false;
  }

  return true;
}

/**
 * Fetch con timeout
 * @param {string} url - URL
 * @param {Object} options - Opciones de fetch
 * @param {number} timeout - Timeout en ms
 * @returns {Promise}
 */
function fetchWithTimeout(url, options, timeout) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  return fetch(url, {
    ...options,
    signal: controller.signal
  }).finally(() => clearTimeout(id));
}

/**
 * Muestra popup de éxito
 */
function showPopup() {
  const popup = document.getElementById('popup');
  if (popup) {
    popup.classList.remove('hidden');
    popup.classList.add('flex');
  }
}

/**
 * Oculta popup
 * @param {HTMLElement} popup - Elemento popup
 */
function hidePopup(popup) {
  if (popup) {
    popup.classList.add('hidden');
    popup.classList.remove('flex');
  }
}

/**
 * Muestra error con UI mejorada
 * @param {string} message - Mensaje de error
 */
function showError(message) {
  // Crear toast de error en lugar de alert
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up';
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity');
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}
```

---

## 🚀 Paso 5: Crear Módulo de Scroll

### Archivo: `js/modules/components/scroll.js`

```javascript
/**
 * Efectos de scroll (indicador y parallax)
 * @module components/scroll
 */

import { PERFORMANCE_CONFIG } from '../config.js';

/**
 * Throttle utility
 * @param {Function} func - Función a throttle
 * @param {number} limit - Límite en ms
 * @returns {Function}
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Configura indicador de scroll
 */
export function setupScrollIndicator() {
  const scrollIndicator = document.getElementById('scroll-indicator');

  if (!scrollIndicator) return;

  const throttledHandler = throttle(() => {
    const scrollY = window.scrollY;
    const maxScroll = 200;

    if (scrollY > maxScroll) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.transform = 'translateY(-30px)';
    } else if (scrollY > 50) {
      const progress = (scrollY - 50) / (maxScroll - 50);
      scrollIndicator.style.opacity = 1 - progress;
      scrollIndicator.style.transform = `translateY(-${progress * 30}px)`;
    } else {
      scrollIndicator.style.opacity = '1';
      scrollIndicator.style.transform = 'translateY(0)';
    }
  }, PERFORMANCE_CONFIG.throttleDelay);

  window.addEventListener('scroll', throttledHandler, { passive: true });
}

/**
 * Configura efecto parallax
 */
export function setupParallaxEffect() {
  // Solo en desktop
  if (window.innerWidth <= 768) return;

  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  if (parallaxLayers.length === 0) return;

  let ticking = false;

  const updateParallax = () => {
    const scrolled = window.pageYOffset;

    parallaxLayers.forEach(layer => {
      const speed = parseFloat(layer.getAttribute('data-speed')) || 0.1;
      const yPos = -(scrolled * speed);
      layer.style.transform = `translateY(${yPos}px)`;
    });

    ticking = false;
  };

  const throttledHandler = throttle(() => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, PERFORMANCE_CONFIG.throttleDelay);

  window.addEventListener('scroll', throttledHandler, { passive: true });
}
```

---

## 📝 Checklist de Implementación

- [ ] Crear `js/modules/utils/dom.js`
- [ ] Refactorizar `js/projects.js`
- [ ] Refactorizar `js/main.js`
- [ ] Crear `js/modules/api/contact.js`
- [ ] Crear `js/modules/components/scroll.js`
- [ ] Probar con `npm run dev`
- [ ] Verificar que no hay errores en consola
- [ ] Probar formulario de contacto
- [ ] Probar navegación
- [ ] Probar renderizado de proyectos
- [ ] Hacer build: `npm run build`
- [ ] Preview: `npm run preview`
- [ ] Commit cambios

---

## 🧪 Testing

```bash
# 1. Dev server
npm run dev

# 2. Verificar en navegador
# - http://localhost:5173
# - Revisar consola (F12) - no debe haber errores
# - Probar formulario de contacto
# - Probar navegación entre páginas
# - Verificar que proyectos se renderizan

# 3. Build
npm run build

# 4. Preview build
npm run preview

# 5. Lighthouse audit
npx lighthouse http://localhost:4173 --view
```

---

## 📚 Referencia Rápida

### Imports que necesitarás

```javascript
// En archivos que renderizan proyectos
import { PROJECTS_DATA } from './modules/data/projects.js';
import { createProjectCard } from './modules/utils/dom.js';

// En archivo principal
import { SITE_CONFIG } from './modules/config.js';

// En formulario
import { setupContactForm } from './modules/api/contact.js';
```

### Estructura de imports en HTML

```html
<!-- Cambiar de: -->
<script src="js/main.js"></script>

<!-- A: -->
<script type="module" src="js/main.js"></script>
```

---

**Próximo documento**: Ver plan completo en `C:\Users\Pipe\.claude\plans\effervescent-moseying-charm.md` para Fases 4-8.
