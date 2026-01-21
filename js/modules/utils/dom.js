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
  // Card con diseño Brutal Minimalista - bordes gruesos, hover físico
  const card = createElement('div', {
    className: 'group bg-black rounded-2xl border-2 border-white/20 hover:border-white transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] flex flex-col overflow-hidden project-card-brutal'
  });

  // Imagen responsiva con efecto grayscale → color
  const picture = createResponsiveImage(project.imagen, project.titulo, {
    className: 'w-full h-48 object-cover border-b-2 border-white/20 grayscale group-hover:grayscale-0 transition-all duration-300'
  });

  // Contenido con padding balanceado
  const content = createElement('div', { className: 'p-6 flex-1 flex flex-col space-y-4' });

  // Header con título y año badge invertido
  const header = createElement('div', { className: 'flex items-start justify-between gap-3' });

  // Título grande y bold - tipografía dominante
  const title = createElement('h3', {
    className: 'text-2xl font-black text-white leading-tight tracking-tight',
    textContent: project.titulo
  });

  // Year badge invertido (blanco sobre negro)
  const yearBadge = createElement('span', {
    className: 'text-sm font-mono bg-white text-black px-3 py-1 rounded-md font-bold shrink-0',
    textContent: project.anio.toString()
  });

  header.appendChild(title);
  header.appendChild(yearBadge);

  // Status badge con color
  const statusColor = getStatusColor(project.estado);
  const statusBadge = createElement('span', {
    className: `text-xs font-mono px-2 py-1 rounded ${statusColor}`,
    textContent: project.estado
  });

  // Descripción más legible
  const description = createElement('p', {
    className: 'text-gray-300 text-sm leading-relaxed flex-1 font-light line-clamp-3',
    textContent: project.descripcion
  });

  // Tags con hover invertido
  const tagsContainer = createElement('div', { className: 'flex flex-wrap gap-2' });
  project.etiquetas.forEach(tag => {
    const tagElement = createElement('span', {
      className: 'text-xs font-mono border border-white/30 text-white px-3 py-1.5 rounded-lg hover:bg-white hover:text-black transition-colors cursor-default',
      textContent: tag
    });
    tagsContainer.appendChild(tagElement);
  });

  // Footer con fecha y enlace
  const footer = createElement('div', { className: 'flex items-center justify-between pt-4 border-t border-white/10' });

  const date = createElement('span', {
    className: 'text-xs text-gray-500 font-mono',
    textContent: project.fecha
  });

  footer.appendChild(date);

  if (project.enlace) {
    const link = createElement('a', {
      href: project.enlace,
      target: '_blank',
      rel: 'noopener noreferrer',
      className: 'inline-flex items-center gap-2 text-white font-bold text-sm hover:gap-3 transition-all uppercase tracking-wider',
      textContent: 'Ver Proyecto →'
    });
    footer.appendChild(link);
  }

  // Ensamblar
  content.appendChild(header);
  content.appendChild(statusBadge);
  content.appendChild(description);
  content.appendChild(tagsContainer);
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
