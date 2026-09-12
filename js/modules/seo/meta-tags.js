/**
 * Meta tags dinámicos para SEO
 * @module seo/meta-tags
 */

/**
 * Configuración de meta tags por página
 */
const META_CONFIGS = {
  'index': {
    title: 'Felipe Bravo Miranda | Analista de Sistemas | Portfolio',
    description: 'Portfolio de Felipe Bravo Miranda, Analista de Sistemas en Daia Systems. Especialista en documentación técnica, automatización de procesos y desarrollo de herramientas internas en Chile.',
    keywords: 'Felipe Bravo, Analista de Sistemas, Documentación Técnica, Automatización, Daia Systems, Desarrollador Chile, Portfolio',
    ogImage: 'https://fgbravom.github.io/assets/images/perfil.jpg',
    ogType: 'website'
  },
  'proyectos': {
    title: 'Proyectos | Felipe Bravo Miranda | Portfolio',
    description: 'Explora mis proyectos: help.daia.cl, daia.cl, sistemas de documentación, herramientas de automatización y más. Trabajo actual y desarrollos anteriores.',
    keywords: 'Proyectos Felipe Bravo, Base de conocimientos, Documentación corporativa, help.daia.cl, Portfolio técnico',
    ogImage: 'https://fgbravom.github.io/assets/images/espaciodetrabajo.jpg',
    ogType: 'website'
  },
  'sobremi': {
    title: 'Sobre Mí | Felipe Bravo Miranda | Analista de Sistemas',
    description: 'Conoce más sobre mi trayectoria como Analista de Sistemas en Daia Systems, mi enfoque en simplificar procesos complejos y mi filosofía de trabajo.',
    keywords: 'Felipe Bravo biografía, Analista Sistemas Chile, Daia Systems, Sobre mí, Trayectoria profesional',
    ogImage: 'https://fgbravom.github.io/assets/images/perfil.jpg',
    ogType: 'profile'
  },
  'tecnologias': {
    title: 'Tecnologías | Felipe Bravo Miranda | Stack Técnico',
    description: 'Stack tecnológico: HTML, CSS, JavaScript, Python, Git, MySQL, AWS, Notion, React, y más. Herramientas y tecnologías que utilizo en mis proyectos.',
    keywords: 'Stack tecnológico, HTML, CSS, JavaScript, Python, Git, AWS, Notion, Tecnologías web',
    ogImage: 'https://fgbravom.github.io/assets/images/perfil.jpg',
    ogType: 'website'
  }
};

/**
 * Actualiza meta tags dinámicamente según la página
 * @param {string} page - Nombre de la página ('index', 'proyectos', etc.)
 */
export function updateMetaTags(page) {
  const config = META_CONFIGS[page];
  if (!config) return;

  // Title
  document.title = config.title;

  // Meta tags básicos
  setMetaTag('description', config.description);
  setMetaTag('keywords', config.keywords);

  // Open Graph
  setMetaProperty('og:title', config.title);
  setMetaProperty('og:description', config.description);
  setMetaProperty('og:image', config.ogImage);
  setMetaProperty('og:type', config.ogType);
  setMetaProperty('og:url', window.location.href);
  setMetaProperty('og:site_name', 'Felipe Bravo Miranda - Portfolio');

  // Twitter Card
  setMetaProperty('twitter:card', 'summary_large_image');
  setMetaProperty('twitter:title', config.title);
  setMetaProperty('twitter:description', config.description);
  setMetaProperty('twitter:image', config.ogImage);

  // Canonical URL
  setCanonicalURL();

  // Viewport (si no existe)
  if (!document.querySelector('meta[name="viewport"]')) {
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0');
  }

  // Charset (si no existe)
  if (!document.querySelector('meta[charset]')) {
    const metaCharset = document.createElement('meta');
    metaCharset.setAttribute('charset', 'UTF-8');
    document.head.insertBefore(metaCharset, document.head.firstChild);
  }
}

/**
 * Establece o actualiza un meta tag
 * @param {string} name - Nombre del meta tag
 * @param {string} content - Contenido
 */
function setMetaTag(name, content) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

/**
 * Establece o actualiza un meta property
 * @param {string} property - Property del meta tag
 * @param {string} content - Contenido
 */
function setMetaProperty(property, content) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

/**
 * Establece canonical URL
 */
function setCanonicalURL() {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  // Remover query params y hash
  link.href = window.location.href.split('?')[0].split('#')[0];
}

/**
 * Detecta la página actual
 * @returns {string} Nombre de la página
 */
export function getCurrentPage() {
  const path = window.location.pathname;
  if (path.includes('proyectos.html')) return 'proyectos';
  if (path.includes('sobremi.html')) return 'sobremi';
  if (path.includes('tecnologias.html')) return 'tecnologias';
  return 'index';
}

/**
 * Inicializa meta tags
 */
export function initMetaTags() {
  updateMetaTags(getCurrentPage());
}
