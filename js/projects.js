/**
 * Renderizado de proyectos - Refactorizado
 * @module projects
 */

import { PROJECTS_DATA } from './modules/data/projects.js';
import { createProjectCard, clearContainer, appendElements } from './modules/utils/dom.js';
import { getCurrentPage } from './modules/utils/routes.js';

/**
 * Proyectos ordenados del más nuevo al más antiguo (año, luego id)
 * @returns {Object[]}
 */
function getSortedProjects() {
  return [...PROJECTS_DATA].sort((a, b) => b.anio - a.anio || b.id - a.id);
}

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
  const featuredProjects = getSortedProjects().slice(0, limit);
  const projectCards = featuredProjects.map((project, index) => createProjectCard(project, index));

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
  const projectCards = getSortedProjects().map((project, index) => createProjectCard(project, index));

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

  const filteredProjects = getSortedProjects().filter(p => p.estado === estado);
  const projectCards = filteredProjects.map((project, index) => createProjectCard(project, index));

  appendElements(container, projectCards);
}

/**
 * Inicializa renderizado de proyectos según página
 */
function initProjects() {
  const page = getCurrentPage();

  if (page === 'proyectos') {
    renderAllProjects();
  } else if (page === 'index') {
    renderFeaturedProjects();
  }
}

// Ejecutar cuando DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProjects);
} else {
  initProjects();
}
