/**
 * Entry point principal - Refactorizado
 * @module main
 */

import { setupContactForm } from './modules/api/contact.js';
import { setupScrollIndicator, setupParallaxEffect, setupScrollAnimations } from './modules/components/scroll.js';
import { setupNavigation } from './modules/components/navigation.js';
import { initStructuredData } from './modules/seo/structured-data.js';
import { initMetaTags } from './modules/seo/meta-tags.js';

/**
 * Inicializa la aplicación
 */
function initializeApp() {
  // Configurar SEO
  initMetaTags();
  initStructuredData();

  // Configurar navegación
  setupNavigation();

  // Configurar formulario de contacto
  setupContactForm();

  // Configurar efectos de scroll
  setupScrollIndicator();
  setupParallaxEffect();

  // Configurar animaciones al scroll
  setupScrollAnimations();
}

// Inicializar cuando DOM esté listo
document.addEventListener('DOMContentLoaded', initializeApp);
