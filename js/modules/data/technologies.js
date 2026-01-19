/**
 * Datos de tecnologías y herramientas
 * @module data/technologies
 */

/**
 * @typedef {Object} Technology
 * @property {string} name - Nombre de la tecnología
 * @property {string} icon - URL del icono
 * @property {string} category - Categoría
 */

/** @type {Technology[]} */
export const TECHNOLOGIES_DATA = [
  {
    name: 'HTML5',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    category: 'Frontend'
  },
  {
    name: 'CSS3',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    category: 'Frontend'
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    category: 'Frontend'
  },
  {
    name: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    category: 'Backend'
  },
  {
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    category: 'Herramientas'
  },
  {
    name: 'GitHub',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    category: 'Herramientas'
  },
  {
    name: 'VS Code',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    category: 'Herramientas'
  },
  {
    name: 'MySQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    category: 'Base de Datos'
  },
  {
    name: 'Markdown',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg',
    category: 'Documentación'
  },
  {
    name: 'AWS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    category: 'Cloud'
  },
  {
    name: 'Notion',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg',
    category: 'Productividad'
  },
  {
    name: 'Jira',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg',
    category: 'Gestión'
  },
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    category: 'Frontend'
  },
  {
    name: 'Cloudflare',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg',
    category: 'Cloud'
  },
  {
    name: 'Confluence',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/confluence/confluence-original.svg',
    category: 'Documentación'
  },
  {
    name: 'GitHub Actions',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg',
    category: 'DevOps'
  },
  {
    name: 'GitBook',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitbook/gitbook-original.svg',
    category: 'Documentación'
  },
  {
    name: 'GIMP',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gimp/gimp-original.svg',
    category: 'Diseño'
  },
  {
    name: 'Nginx',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg',
    category: 'Servidor'
  },
  {
    name: 'Windows 11',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg',
    category: 'Sistema Operativo'
  }
];

/**
 * Obtiene tecnologías por categoría
 * @param {string} category - Categoría a filtrar
 * @returns {Technology[]}
 */
export function getTechnologiesByCategory(category) {
  return TECHNOLOGIES_DATA.filter(tech => tech.category === category);
}

/**
 * Obtiene todas las categorías únicas
 * @returns {string[]}
 */
export function getAllCategories() {
  return [...new Set(TECHNOLOGIES_DATA.map(tech => tech.category))];
}

/**
 * Obtiene tecnología por nombre
 * @param {string} name - Nombre de la tecnología
 * @returns {Technology|undefined}
 */
export function getTechnologyByName(name) {
  return TECHNOLOGIES_DATA.find(tech => tech.name.toLowerCase() === name.toLowerCase());
}
