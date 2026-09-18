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

/**
 * Devuelve la url canónica de una página: sin extensión, query ni hash
 *
 * Cada documento responde en dos urls (/sobremi y /sobremi.html). La canónica
 * es siempre la que no lleva extensión, para no reportar contenido duplicado.
 *
 * @param {string} [url=window.location.href] - Url a normalizar
 * @returns {string} Url canónica absoluta
 */
export function getCanonicalURL(url = window.location.href) {
  const parsed = new URL(url);

  parsed.search = '';
  parsed.hash = '';
  parsed.pathname = parsed.pathname
    .replace(/\/index\.html$/, '/')
    .replace(/\.html$/, '');

  return parsed.toString();
}
