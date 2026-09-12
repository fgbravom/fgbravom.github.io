/**
 * Configuración global de la aplicación
 * @module config
 */

/**
 * @typedef {Object} SiteConfig
 * @property {string} title - Título del sitio
 * @property {string} description - Descripción del sitio
 * @property {string} contactApi - URL de la API de contacto
 * @property {Object} theme - Tema visual
 */

/** @type {SiteConfig} */
export const SITE_CONFIG = {
  title: 'Felipe Bravo Miranda - Analista de Sistemas',
  description: 'Portfolio personal de Felipe Bravo Miranda, Analista de Sistemas en Daia Systems',
  contactApi: import.meta.env.VITE_CONTACT_API || 'https://notion-contact-api.vercel.app/api/contacto',
  theme: {
    primaryColor: '#000000',
    secondaryColor: '#1a1a1a',
    accentColor: '#d1d5db',
    textColor: '#ffffff'
  }
};

/**
 * @typedef {Object} PersonalData
 * @property {string} name - Nombre completo
 * @property {string} username - Username/handle
 * @property {string} title - Título profesional
 * @property {string} company - Empresa actual
 * @property {string} description - Descripción breve
 * @property {string[]} bio - Biografía extendida
 * @property {Object} social - Redes sociales
 * @property {string} avatar - URL del avatar
 */

/** @type {PersonalData} */
export const PERSONAL_DATA = {
  name: 'Felipe Bravo Miranda',
  username: '@fgbravom',
  title: 'Analista de Sistemas',
  company: 'Daia Systems',
  description: 'Especialista en documentación, automatización y desarrollo de herramientas internas.',
  bio: [
    'Hola, soy Felipe y trabajo como Analista de Sistemas en Daia Systems. Me dedico principalmente a documentar procesos, automatizar tareas, crear herramientas internas que faciliten el trabajo del equipo y brindar soporte técnico cuando se requiera de una mano.',
    'Una de las cosas que más me gusta es encontrar formas de simplificar lo complejo. Por ejemplo, desarrollé help.daia.cl, la plataforma de documentación de la empresa, y también he construido varias herramientas que ayudan a que los flujos de trabajo sean más rápidos y eficientes.',
    'Soy chileno, curioso por naturaleza, y siempre estoy buscando cómo mejorar las cosas desde lo técnico, pero también desde lo humano.'
  ],
  social: {
    github: 'https://github.com/fgbravom',
    email: 'tu-correo@ejemplo.com'
  },
  avatar: 'assets/images/perfil.jpg'
};

/**
 * Performance configuration
 */
export const PERFORMANCE_CONFIG = {
  throttleDelay: 16, // ~60fps
  debounceDelay: 300,
  intersectionThreshold: 0.1,
  lazyLoadMargin: '50px'
};

/**
 * API configuration
 */
export const API_CONFIG = {
  timeout: 10000,
  retries: 3,
  retryDelay: 1000
};

/**
 * Validation patterns
 */
export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
  url: /^https?:\/\/.+/
};

export default {
  SITE_CONFIG,
  PERSONAL_DATA,
  PERFORMANCE_CONFIG,
  API_CONFIG,
  VALIDATION
};
