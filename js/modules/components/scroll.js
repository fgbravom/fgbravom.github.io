/**
 * Efectos de scroll (indicador y parallax)
 * @module components/scroll
 */

import { PERFORMANCE_CONFIG } from '../config.js';

/**
 * Throttle utility
 * @param {Function} func - Función a throttle
 * @param {number} limit - Límite en ms
 * @returns {Function}
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Configura indicador de scroll
 */
export function setupScrollIndicator() {
  const scrollIndicator = document.getElementById('scroll-indicator');

  if (!scrollIndicator) return;

  const throttledHandler = throttle(() => {
    const scrollY = window.scrollY;
    const maxScroll = 200;

    if (scrollY > maxScroll) {
      scrollIndicator.style.opacity = '0';
      scrollIndicator.style.transform = 'translateY(-30px)';
    } else if (scrollY > 50) {
      const progress = (scrollY - 50) / (maxScroll - 50);
      scrollIndicator.style.opacity = (1 - progress).toString();
      scrollIndicator.style.transform = `translateY(-${progress * 30}px)`;
    } else {
      scrollIndicator.style.opacity = '1';
      scrollIndicator.style.transform = 'translateY(0)';
    }
  }, PERFORMANCE_CONFIG.throttleDelay);

  window.addEventListener('scroll', throttledHandler, { passive: true });
}

/**
 * Configura efecto parallax
 */
export function setupParallaxEffect() {
  // Solo en desktop
  if (window.innerWidth <= 768) return;

  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  if (parallaxLayers.length === 0) return;

  let ticking = false;

  const updateParallax = () => {
    const scrolled = window.pageYOffset;

    parallaxLayers.forEach(layer => {
      const speed = parseFloat(layer.getAttribute('data-speed')) || 0.1;
      const yPos = -(scrolled * speed);
      layer.style.transform = `translateY(${yPos}px)`;
    });

    ticking = false;
  };

  const throttledHandler = throttle(() => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, PERFORMANCE_CONFIG.throttleDelay);

  window.addEventListener('scroll', throttledHandler, { passive: true });
}

/**
 * Configura animaciones al scroll con Intersection Observer
 */
export function setupScrollAnimations() {
  const observerOptions = {
    threshold: PERFORMANCE_CONFIG.intersectionThreshold,
    rootMargin: PERFORMANCE_CONFIG.lazyLoadMargin
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar elementos con clase .animate-on-scroll
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}
