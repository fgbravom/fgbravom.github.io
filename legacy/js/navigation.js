/**
 * Navegación - Refactorizado
 * Este archivo ahora solo importa el módulo refactorizado
 * @module navigation
 */

import { setupNavigation } from './modules/components/navigation.js';

// Ejecutar cuando DOM esté listo
document.addEventListener('DOMContentLoaded', setupNavigation);
