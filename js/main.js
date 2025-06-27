// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

function initializeApp() {
  setupContactForm();
  setupNavigation();
  setupMobileMenu();
  setupScrollIndicator();
  setupParallaxEffect();
  setupLogoLink();
}

// ===== FORMULARIO DE CONTACTO =====
function setupContactForm() {
  const form = document.getElementById("contactForm");
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");

  if (!form) return;

  form.addEventListener("submit", handleFormSubmit);

  if (closePopup) {
    closePopup.addEventListener("click", () => {
      hidePopup(popup);
    });
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const formData = {
    nombre: e.target.nombre.value,
    correo: e.target.correo.value,
    telefono: e.target.telefono.value,
    mensaje: e.target.mensaje.value
  };

  try {
    const response = await fetch("https://notion-contact-api.vercel.app/api/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      e.target.reset();
      showPopup();
    } else {
      showError(`Error: ${data.error?.message || "No se pudo enviar el mensaje"}`);
    }
  } catch (error) {
    showError(`Error de red: ${error.message}`);
  }
}

function showPopup() {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.classList.remove('hidden');
    popup.classList.add('flex');
  }
}

function hidePopup(popup) {
  if (popup) {
    popup.classList.add('hidden');
    popup.classList.remove('flex');
  }
}

function showError(message) {
  alert(`❌ ${message}`);
}

// ===== NAVEGACIÓN SUAVE =====
function setupNavigation() {
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

// ===== INDICADOR DE SCROLL OPTIMIZADO =====
function setupScrollIndicator() {
  const scrollIndicator = document.getElementById('scroll-indicator');
  
  if (!scrollIndicator) return;

  // Usar throttling para mejorar rendimiento
  const throttledScrollHandler = throttle(() => {
    const scrollY = window.scrollY;
    const maxScroll = 200;
    
    if (scrollY > maxScroll) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.transform = 'translateY(-30px)';
    } else if (scrollY > 50) {
      const progress = (scrollY - 50) / (maxScroll - 50);
      scrollIndicator.style.opacity = 1 - progress;
      scrollIndicator.style.transform = `translateY(-${progress * 30}px)`;
    } else {
      scrollIndicator.style.opacity = '1';
      scrollIndicator.style.transform = 'translateY(0)';
    }
  }, 16); // ~60fps

  window.addEventListener('scroll', throttledScrollHandler, { passive: true });
}

// ===== EFECTO PARALLAX OPTIMIZADO =====
function setupParallaxEffect() {
  // Solo aplicar parallax en desktop para mejor rendimiento en móvil
  if (window.innerWidth <= 768) return;

  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  if (parallaxLayers.length === 0) return;

  // Usar throttling y requestAnimationFrame para mejor rendimiento
  let ticking = false;
  
  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    
    parallaxLayers.forEach(layer => {
      const speed = layer.getAttribute('data-speed') || 0.1;
      const yPos = -(scrolled * speed);
      layer.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
  };

  const throttledParallaxHandler = throttle(() => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, 16);

  window.addEventListener('scroll', throttledParallaxHandler, { passive: true });
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

// ===== UTILIDADES OPTIMIZADAS =====
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== ANIMACIONES DE ENTRADA OPTIMIZADAS =====
function animateOnScroll() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar elementos que necesitan animación
  document.querySelectorAll('.content-section, .project-card, .tech-item').forEach(el => {
    observer.observe(el);
  });
}

// ===== CONFIGURACIÓN DE TAILWIND =====
if (typeof tailwind !== 'undefined') {
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          'inter': ['Inter', 'sans-serif'],
        },
        animation: {
          'fade-in': 'fadeIn 0.8s ease-in-out',
          'slide-up': 'slideUp 0.6s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(30px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          }
        }
      }
    }
  };
}

// ===== INICIALIZAR ANIMACIONES =====
document.addEventListener("DOMContentLoaded", function () {
  animateOnScroll();
}); 