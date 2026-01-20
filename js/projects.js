/**
 * Renderizado de proyectos - Refactorizado
 * @module projects
 */

import { PROJECTS_DATA } from './modules/data/projects.js';
import { createProjectCard, clearContainer, appendElements } from './modules/utils/dom.js';

/**
 * Renderiza proyectos destacados (homepage)
 * @param {string} containerId - ID del contenedor
 * @param {number} limit - Número de proyectos a mostrar
 */
export function renderFeaturedProjects(containerId = 'proyectos-galeria-principal', limit = 3) {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  // Limpiar de forma segura
  clearContainer(container);

  // Renderizar proyectos destacados
  const featuredProjects = PROJECTS_DATA.slice(0, limit);
  const projectCards = featuredProjects.map(project => createProjectCard(project));

  appendElements(container, projectCards);
}

/**
 * Renderiza todos los proyectos (página proyectos.html)
 * @param {string} containerId - ID del contenedor
 */
export function renderAllProjects(containerId = 'proyectos-galeria') {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  // Limpiar de forma segura
  clearContainer(container);

  // Renderizar todos los proyectos
  const projectCards = PROJECTS_DATA.map(project => createProjectCard(project));

  appendElements(container, projectCards);
}

/**
 * Filtra y renderiza proyectos por estado
 * @param {string} estado - Estado del proyecto
 * @param {string} containerId - ID del contenedor
 */
export function renderProjectsByStatus(estado, containerId = 'proyectos-galeria') {
  const container = document.getElementById(containerId);

  if (!container) {
    return;
  }

  clearContainer(container);

  const filteredProjects = PROJECTS_DATA.filter(p => p.estado === estado);
  const projectCards = filteredProjects.map(project => createProjectCard(project));

  appendElements(container, projectCards);
}

/**
 * Inicializa renderizado de proyectos según página
 */
function initProjects() {
  const path = window.location.pathname;

  if (path.includes('proyectos.html')) {
    renderAllProjects();
  } else if (path.includes('index.html') || path === '/' || path === '' || path.endsWith('/')) {
    renderFeaturedProjects();
  }
}

// Ejecutar cuando DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjects);
} else {
  initProjects();
}
