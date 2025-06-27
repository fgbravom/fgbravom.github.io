// ===== DATOS DE PROYECTOS =====
const PROJECTS_DATA = [
  {
    id: 1,
    titulo: 'Espacio de trabajo Daia Systems',
    anio: 2024,
    enlace: 'https://daia.cl',
    etiquetas: ['Trabajo actual', 'Base de conocimientos'],
    estado: 'Trabajo actual',
    fecha: '11 de febrero de 2023 17:21',
    descripcion: 'Gestión y documentación interna de Daia Systems.',
    imagen: 'https://drive.google.com/file/d/1p3m8vIO7SOtXLuN73EUrIjhxHB6Uv2ec/view?usp=drive_link'
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
    imagen: 'https://drive.google.com/file/d/1de9dxddxS3ypkriB6Yq_B_TT7PC1vjTD/view?usp=drive_link'
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
    imagen: 'https://drive.google.com/file/d/1dO-hy3fKXeX7WoCcdy71GAV25TIfgtQm/view?usp=drive_link'
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
    titulo: 'help.daia.cl v2',
    anio: 2024,
    enlace: '',
    etiquetas: ['En desarrollo', 'NoCode'],
    estado: 'En desarrollo',
    fecha: '1 de junio de 2024 12:00',
    descripcion: 'Nueva versión de la plataforma de documentación.',
    imagen: 'https://placehold.co/600x400?text=help.daia.cl+v2'
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