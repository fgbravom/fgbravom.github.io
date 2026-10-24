/**
 * Datos de proyectos del portfolio
 * @module data/projects
 */

/**
 * @typedef {Object} Project
 * @property {number} id - ID único del proyecto
 * @property {string} titulo - Título del proyecto
 * @property {number} anio - Año del proyecto
 * @property {string} enlace - URL del proyecto
 * @property {string[]} etiquetas - Tags/etiquetas
 * @property {string} estado - Estado actual del proyecto
 * @property {string} fecha - Fecha de actualización
 * @property {string} descripcion - Descripción del proyecto
 * @property {string} imagen - Ruta de la imagen
 */

/** @type {Project[]} */
export const PROJECTS_DATA = [
  {
    id: 1,
    titulo: 'Espacio de trabajo Daia Systems',
    anio: 2024,
    enlace: 'https://daia.cl',
    etiquetas: ['Trabajo actual', 'Base de conocimientos'],
    estado: 'Trabajo actual',
    fecha: '11 de febrero de 2023 17:21',
    descripcion: 'Gestión y documentación interna de Daia Systems.',
    imagen: '/assets/images/espaciodetrabajo.webp'
  },
  {
    id: 2,
    titulo: 'help.daia.cl',
    anio: 2023,
    enlace: 'https://help.daia.cl',
    etiquetas: ['Base de conocimientos', 'NoCode'],
    estado: 'Trabajo actual',
    fecha: '10 de enero de 2023 1:09',
    descripcion: 'Portal de documentación corporativa.',
    imagen: '/assets/images/helpdaia.webp'
  },
  {
    id: 3,
    titulo: 'daia.cl',
    anio: 2022,
    enlace: 'https://daia.cl',
    etiquetas: ['Landing page', 'HTML', 'Parallax'],
    estado: 'Trabajo actual',
    fecha: '28 de septiembre de 2022 0:47',
    descripcion: 'Landing page para la empresa Daia.',
    imagen: '/assets/images/daia.cl.webp'
  },
  {
    id: 4,
    titulo: 'help.tuu.cl',
    anio: 2021,
    enlace: 'https://help.tuu.cl',
    etiquetas: ['Base de conocimientos', 'Trabajos anteriores'],
    estado: 'Trabajos anteriores',
    fecha: '8 de mayo de 2022 4:18',
    descripcion: 'Sistema web para documentación abierta al público.',
    imagen: 'https://placehold.co/600x400?text=help.tuu.cl'
  },
  {
    id: 5,
    titulo: 'Centro de ayuda Haulmer',
    anio: 2020,
    enlace: 'https://haulmer.notion.site',
    etiquetas: ['Base de conocimientos', 'NoCode'],
    estado: 'Trabajo actual',
    fecha: '5 de agosto de 2022 14:29',
    descripcion: 'Centro de ayuda y certificación digital.',
    imagen: 'https://placehold.co/600x400?text=Haulmer+Ayuda'
  },
  {
    id: 6,
    titulo: 'Documentación Haulmer',
    anio: 2020,
    enlace: '',
    etiquetas: ['Base de conocimientos', 'NoCode', 'Trabajos anteriores'],
    estado: 'Trabajos anteriores',
    fecha: '8 de mayo de 2022 4:18',
    descripcion: 'Documentación técnica y de procesos para Haulmer.',
    imagen: 'https://placehold.co/600x400?text=Haulmer+Docs'
  },
  {
    id: 7,
    titulo: 'Bookmark Converter',
    anio: 2023,
    enlace: 'https://github.com/fgbravom/bookmark-converter',
    etiquetas: ['Open Source', 'Herramienta'],
    estado: 'Trabajo actual',
    fecha: '15 de marzo de 2023 10:00',
    descripcion: 'Conversor de HTML a CSV para marcadores.',
    imagen: 'https://placehold.co/600x400?text=Bookmark+Converter'
  },
  {
    id: 8,
    titulo: 'ayuda.daia.cl',
    anio: 2025,
    enlace: 'https://ayuda.daia.cl',
    etiquetas: ['Base de conocimientos', 'Documentación'],
    estado: 'Trabajo actual',
    fecha: '23 de octubre de 2026 17:46',
    descripcion: 'Centro de ayuda de Daia Systems con la documentación de los módulos de DaiaERP.',
    imagen: '/assets/images/ayudadaia.webp'
  },
  {
    id: 9,
    titulo: 'API de automatización',
    anio: 2023,
    enlace: '',
    etiquetas: ['API', 'Automatización'],
    estado: 'Trabajo actual',
    fecha: '20 de diciembre de 2023 9:30',
    descripcion: 'API para automatización de procesos internos.',
    imagen: 'https://placehold.co/600x400?text=API+Automatizacion'
  },
  {
    id: 10,
    titulo: 'Gestor de tareas',
    anio: 2022,
    enlace: '',
    etiquetas: ['Herramienta', 'Productividad'],
    estado: 'Trabajo actual',
    fecha: '10 de noviembre de 2022 16:00',
    descripcion: 'Aplicación para gestión de tareas y proyectos.',
    imagen: 'https://placehold.co/600x400?text=Gestor+Tareas'
  },
  {
    id: 11,
    titulo: 'Sitio personal',
    anio: 2024,
    enlace: 'https://fgbravom.github.io',
    etiquetas: ['Portfolio', 'Personal'],
    estado: 'Trabajo actual',
    fecha: '1 de junio de 2024 12:00',
    descripcion: 'Sitio web personal y portafolio.',
    imagen: 'https://placehold.co/600x400?text=Sitio+Personal'
  },
  {
    id: 12,
    titulo: 'Documentador automático',
    anio: 2023,
    enlace: '',
    etiquetas: ['Automatización', 'Documentación'],
    estado: 'En desarrollo',
    fecha: '15 de abril de 2023 11:00',
    descripcion: 'Herramienta para generar documentación automáticamente.',
    imagen: 'https://placehold.co/600x400?text=Documentador+Automatico'
  },
  {
    id: 13,
    titulo: 'Azul y Blanco',
    anio: 2026,
    enlace: 'https://www.azulyblanco.cl',
    etiquetas: ['Sitio web', 'Next.js', 'Supabase'],
    estado: 'Trabajo actual',
    fecha: '22 de octubre de 2026 22:39',
    descripcion: 'Sitio del Club de Fútbol Amateur Azul y Blanco: programación, resultados, noticias, galerías y panel de administración.',
    imagen: '/assets/images/azulyblanco.webp'
  },
  {
    id: 14,
    titulo: 'Limpiamarcadores',
    anio: 2026,
    enlace: 'https://limpiamarcadores.vercel.app',
    etiquetas: ['Open Source', 'Herramienta', 'JavaScript'],
    estado: 'Trabajo actual',
    fecha: '26 de septiembre de 2026 13:08',
    descripcion: 'Combina, limpia y ordena marcadores de varios navegadores: duplicados, links rotos y agrupación por dominio. Todo corre en el navegador.',
    imagen: '/assets/images/limpiamarcadores.webp'
  },
  {
    id: 15,
    titulo: 'Lupapp',
    anio: 2026,
    enlace: 'https://lupapp.vercel.app',
    etiquetas: ['Open Source', 'Next.js', 'IA'],
    estado: 'En desarrollo',
    fecha: '23 de mayo de 2026 23:48',
    descripcion: 'Analiza etiquetas nutricionales de alimentos chilenos y les asigna una nota del 1.0 al 7.0 según la Ley 20.606 de sellos.',
    imagen: '/assets/images/lupapp.webp'
  },
  {
    id: 16,
    titulo: 'Imágenes con Historia',
    anio: 2026,
    enlace: 'https://imagenehistoria.vercel.app',
    etiquetas: ['React', 'InsForge', 'Galería'],
    estado: 'Trabajo actual',
    fecha: '20 de julio de 2026 21:44',
    descripcion: 'Galería de fotografías históricas del deporte chileno, con publicación semanal automatizada.',
    imagen: '/assets/images/imagenesconhistoria.webp'
  }
];

/**
 * Obtiene proyectos por estado
 * @param {string} estado - Estado del proyecto
 * @returns {Project[]}
 */
export function getProjectsByStatus(estado) {
  return PROJECTS_DATA.filter(p => p.estado === estado);
}

/**
 * Obtiene proyectos destacados (primeros N)
 * @param {number} limit - Número de proyectos a obtener
 * @returns {Project[]}
 */
export function getFeaturedProjects(limit = 3) {
  return PROJECTS_DATA.slice(0, limit);
}

/**
 * Obtiene proyecto por ID
 * @param {number} id - ID del proyecto
 * @returns {Project|undefined}
 */
export function getProjectById(id) {
  return PROJECTS_DATA.find(p => p.id === id);
}

/**
 * Obtiene todos los estados únicos
 * @returns {string[]}
 */
export function getAllStatuses() {
  return [...new Set(PROJECTS_DATA.map(p => p.estado))];
}

/**
 * Obtiene todas las etiquetas únicas
 * @returns {string[]}
 */
export function getAllTags() {
  return [...new Set(PROJECTS_DATA.flatMap(p => p.etiquetas))];
}
