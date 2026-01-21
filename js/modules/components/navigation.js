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
  handleHashNavigation();
}

/**
 * Maneja navegación a anchors (#contacto, #proyectos)
 * Funciona incluso cuando se accede desde /index.html#anchor
 */
function handleHashNavigation() {
  // Si hay un hash en la URL, hacer scroll al elemento
  if (window.location.hash) {
    // Esperar a que el DOM esté completamente cargado
    setTimeout(() => {
      const hash = window.location.hash;
      const element = document.querySelector(hash);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  }

  // Interceptar clicks en links con hash para scroll suave
  document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Si el link es a la misma página (/#contacto desde /)
      if (href.startsWith('#') || href.startsWith('/#')) {
        e.preventDefault();
        const hash = href.replace('/', '');
        const element = document.querySelector(hash);

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Actualizar URL sin recargar
          history.pushState(null, '', href);
        }
      }
      // Si el link es a otra página con hash (/index.html#contacto desde /sobremi.html)
      // Dejar que navegue normalmente, handleHashNavigation se encargará del scroll
    });
  });
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
