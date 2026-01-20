/**
 * Maneja navegación y menú móvil con ARIA
 * @module components/navigation
 */

/**
 * Configura navegación principal
 */
export function setupNavigation() {
  setupMobileMenu();
  highlightActivePage();
}

/**
 * Configura menú móvil con ARIA
 */
function setupMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileMenuButton || !mobileMenu) return;

  // Toggle menú móvil
  mobileMenuButton.addEventListener('click', () => {
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';

    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');

    // Focus management
    if (!isExpanded) {
      const firstLink = mobileMenu.querySelector('a');
      if (firstLink) {
        firstLink.focus();
      }
    }
  });

  // Cerrar menú con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.add('hidden');
      mobileMenuButton.focus();
    }
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.add('hidden');
      }
    }
  });

  // Cerrar menú al navegar
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.add('hidden');
    });
  });
}

/**
 * Resalta página activa en navegación
 */
function highlightActivePage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a[href]');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');

    // Comparar rutas
    const isActive =
      (currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('/')) &&
      (linkPath === 'index.html' || linkPath === '/' || linkPath === './index.html')
      ||
      currentPath.includes(linkPath) && linkPath !== '/' && linkPath !== 'index.html';

    if (isActive) {
      link.classList.add('text-white', 'font-bold');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('text-white', 'font-bold');
      link.removeAttribute('aria-current');
    }
  });
}
