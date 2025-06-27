// ===== MANEJO DE NAVEGACIÓN ACTIVA =====
document.addEventListener("DOMContentLoaded", function() {
  setActiveNavigation();
});

function setActiveNavigation() {
  const currentPage = getCurrentPage();
  const navLinks = document.querySelectorAll('.nav-link[data-page]');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('data-page');
    if (linkPage === currentPage) {
      link.classList.add('active', 'font-bold');
    } else {
      link.classList.remove('active', 'font-bold');
    }
  });
}

function getCurrentPage() {
  const path = window.location.pathname;
  
  if (path.includes('sobremi.html')) return 'sobremi';
  if (path.includes('proyectos.html')) return 'proyectos';
  if (path.includes('tecnologias.html')) return 'tecnologias';
  if (path.includes('index.html') || path === '/' || path === '') return 'home';
  
  return 'home';
}

// ===== MENÚ MÓVIL =====
function setupMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileMenuButton || !mobileMenu) return;

  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// ===== NAVEGACIÓN SUAVE =====
function setupSmoothNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', handleSmoothScroll);
  });
}

function handleSmoothScroll(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  const target = document.querySelector(targetId);
  
  if (target) {
    const headerHeight = document.querySelector('nav')?.offsetHeight || 0;
    const targetPosition = target.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// ===== ENLACE DEL LOGO =====
function setupLogoLink() {
  const logoLink = document.getElementById('logo-link');
  
  if (logoLink) {
    // Solo aplicar scroll suave si estamos en la página principal
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      logoLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
    // En otras páginas, el enlace navegará normalmente al sitio principal
  }
}

// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", function() {
  setupMobileMenu();
  setupSmoothNavigation();
  setupLogoLink();
}); 