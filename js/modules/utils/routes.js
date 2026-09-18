/**
 * Detección de la página actual a partir de la URL
 * @module utils/routes
 */

/**
 * Páginas del sitio, identificadas por su slug
 */
const PAGES = ['sobremi', 'proyectos', 'tecnologias', 'contacto'];

/**
 * Detecta la página actual sin depender de la extensión .html
 *
 * GitHub Pages sirve el mismo documento en /sobremi y /sobremi.html, así que
 * la detección trabaja sobre el último segmento de la ruta, ya sin extensión.
 *
 * @param {string} [pathname=window.location.pathname] - Ruta a evaluar
 * @returns {string} Nombre de la página ('index', 'sobremi', 'proyectos', ...)
 */
export function getCurrentPage(pathname = window.location.pathname) {
  const slug = pathname
    .replace(/\/+$/, '')
    .split('/')
    .pop()
    .replace(/\.html$/, '');

  return PAGES.includes(slug) ? slug : 'index';
}
