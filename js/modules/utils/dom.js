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
    } else if (value !== null && value !== undefined) {
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
  const baseName = src.replace(/\.(png|jpg|jpeg|webp|avif)$/i, '');

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
  const ext = src.match(/\.(png|jpg|jpeg)$/i)?.[0] || '.jpg';
  const fallbackSrc = baseName + (ext.toLowerCase() === '.png' ? '.jpg' : ext);

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
    textContent: project.anio.toString()
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
      textContent: 'Ver más →'
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
 * Crea tarjeta de tecnología segura
 * @param {Object} tech - Datos de la tecnología
 * @returns {HTMLElement}
 */
export function createTechnologyCard(tech) {
  const card = createElement('div', {
    className: 'bg-gray-800 rounded-xl p-4 flex flex-col items-center text-center hover:shadow-xl transition-all border border-gray-700 hover:border-gray-600'
  });

  // Icono
  const iconContainer = createElement('div', { className: 'mb-3' });
  const icon = createElement('img', {
    src: tech.icon,
    alt: tech.name,
    className: 'w-12 h-12',
    loading: 'lazy',
    decoding: 'async'
  });
  iconContainer.appendChild(icon);

  // Nombre
  const name = createElement('h3', {
    className: 'text-sm font-semibold text-white mb-1',
    textContent: tech.name
  });

  // Categoría
  const category = createElement('span', {
    className: 'text-xs text-gray-400',
    textContent: tech.category
  });

  card.appendChild(iconContainer);
  card.appendChild(name);
  card.appendChild(category);

  return card;
}

/**
 * Sanitiza texto para prevenir XSS
 * @param {string} text - Texto a sanitizar
 * @returns {string}
 */
export function sanitizeText(text) {
  if (!text) return '';
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

/**
 * Agrega múltiples elementos a un contenedor usando DocumentFragment
 * @param {HTMLElement} container - Contenedor
 * @param {HTMLElement[]} elements - Elementos a agregar
 */
export function appendElements(container, elements) {
  if (!container || !Array.isArray(elements)) return;

  const fragment = document.createDocumentFragment();
  elements.forEach(el => {
    if (el instanceof Node) {
      fragment.appendChild(el);
    }
  });
  container.appendChild(fragment);
}
