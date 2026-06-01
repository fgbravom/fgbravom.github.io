/**
 * Structured Data (JSON-LD) para SEO
 * @module seo/structured-data
 */

import { PERSONAL_DATA } from '../config.js';

/**
 * Genera schema de Person (perfil personal)
 * @returns {Object} Schema JSON-LD
 */
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": PERSONAL_DATA.name,
    "alternateName": PERSONAL_DATA.username,
    "jobTitle": PERSONAL_DATA.title,
    "worksFor": {
      "@type": "Organization",
      "name": PERSONAL_DATA.company,
      "url": "https://daia.cl"
    },
    "url": "https://pipecco.github.io",
    "image": `https://pipecco.github.io/${PERSONAL_DATA.avatar}`,
    "sameAs": [
      PERSONAL_DATA.social.github
    ],
    "knowsAbout": [
      "Documentación técnica",
      "Automatización de procesos",
      "Desarrollo web",
      "Bases de conocimiento",
      "Sistemas de información",
      "Análisis de sistemas"
    ],
    "description": PERSONAL_DATA.description
  };
}

/**
 * Genera schema de WebSite
 * @returns {Object} Schema JSON-LD
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Felipe Bravo Miranda - Portfolio",
    "url": "https://pipecco.github.io",
    "description": "Portfolio personal de Felipe Bravo Miranda, Analista de Sistemas especializado en documentación, automatización y desarrollo de herramientas internas.",
    "author": {
      "@type": "Person",
      "name": PERSONAL_DATA.name
    },
    "inLanguage": "es-CL",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };
}

/**
 * Genera schema de CreativeWork para un proyecto
 * @param {Object} project - Datos del proyecto
 * @returns {Object} Schema JSON-LD
 */
export function generateCreativeWorkSchema(project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.titulo,
    "description": project.descripcion,
    "url": project.enlace || "https://pipecco.github.io",
    "dateCreated": project.fecha,
    "creator": {
      "@type": "Person",
      "name": PERSONAL_DATA.name
    },
    "keywords": project.etiquetas.join(', '),
    "inLanguage": "es-CL"
  };
}

/**
 * Genera schema de ProfilePage para página "sobre mí"
 * @returns {Object} Schema JSON-LD
 */
export function generateProfilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": generatePersonSchema(),
    "name": `Sobre ${PERSONAL_DATA.name}`,
    "description": PERSONAL_DATA.bio[0],
    "url": "https://pipecco.github.io/sobremi.html",
    "inLanguage": "es-CL"
  };
}

/**
 * Genera schema de ItemList para página de proyectos
 * @param {Array} projects - Lista de proyectos
 * @returns {Object} Schema JSON-LD
 */
export function generateProjectsListSchema(projects) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Proyectos de Felipe Bravo Miranda",
    "description": "Galería de proyectos y trabajos realizados",
    "url": "https://pipecco.github.io/proyectos.html",
    "numberOfItems": projects.length,
    "itemListElement": projects.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": project.titulo,
        "description": project.descripcion,
        "url": project.enlace || "https://pipecco.github.io"
      }
    }))
  };
}

/**
 * Inyecta schema en el <head>
 * @param {Object} schema - Schema JSON-LD
 */
export function injectStructuredData(schema) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}

/**
 * Inicializa structured data según la página actual
 */
export function initStructuredData() {
  const path = window.location.pathname;

  // Schema común para todas las páginas
  injectStructuredData(generatePersonSchema());
  injectStructuredData(generateWebSiteSchema());

  // Schemas específicos por página
  if (path.includes('sobremi.html')) {
    injectStructuredData(generateProfilePageSchema());
  } else if (path.includes('proyectos.html')) {
    // Se inicializará cuando los proyectos estén cargados
    // Ver: projects.js
  }
}
