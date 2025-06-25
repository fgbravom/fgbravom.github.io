// ===== DATOS DE PROYECTOS =====
const PROJECTS_DATA = [
  {
    id: 'bookmark-converter',
    title: 'Bookmark Converter',
    description: 'Conversor de HTML a CSV para marcadores',
    icon: '🔗',
    url: 'https://github.com/fgbravom/bookmark-converter',
    technologies: ['JavaScript', 'HTML', 'CSS']
  },
  {
    id: 'daia-docs',
    title: 'Documentación Daia Systems',
    description: 'Portal de documentación corporativa',
    icon: '📚',
    url: 'https://help.daia.cl',
    technologies: ['GitBook', 'Markdown', 'Documentación']
  },
  {
    id: 'daia-website',
    title: 'Sitio Corporativo de Daia',
    description: 'Página web oficial de la empresa',
    icon: '🌐',
    url: 'https://daia.cl',
    technologies: ['React', 'CSS', 'JavaScript']
  }
];

// ===== DATOS DE TECNOLOGÍAS =====
const TECHNOLOGIES_DATA = [
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

// ===== DATOS PERSONALES =====
const PERSONAL_DATA = {
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

// ===== CONFIGURACIÓN DEL SITIO =====
const SITE_CONFIG = {
  title: 'Felipe Bravo Miranda - Analista de Sistemas',
  description: 'Portfolio personal de Felipe Bravo Miranda, Analista de Sistemas en Daia Systems',
  contactApi: 'https://notion-contact-api.vercel.app/api/contacto',
  theme: {
    primaryColor: '#000000',
    secondaryColor: '#1a1a1a',
    accentColor: '#d1d5db',
    textColor: '#333333'
  }
};

// ===== FUNCIONES DE UTILIDAD =====
function getProjectsByCategory(category) {
  return PROJECTS_DATA.filter(project => 
    project.technologies.some(tech => 
      TECHNOLOGIES_DATA.find(t => t.name === tech)?.category === category
    )
  );
}

function getTechnologiesByCategory(category) {
  return TECHNOLOGIES_DATA.filter(tech => tech.category === category);
}

function getAllCategories() {
  return [...new Set(TECHNOLOGIES_DATA.map(tech => tech.category))];
}

// ===== EXPORTAR DATOS =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PROJECTS_DATA,
    TECHNOLOGIES_DATA,
    PERSONAL_DATA,
    SITE_CONFIG,
    getProjectsByCategory,
    getTechnologiesByCategory,
    getAllCategories
  };
} 