/**
 * Módulo de API de contacto
 * @module api/contact
 */

import { SITE_CONFIG, API_CONFIG, VALIDATION } from '../config.js';

/**
 * Configura formulario de contacto
 */
export function setupContactForm() {
  const form = document.getElementById('contactForm');
  const popup = document.getElementById('popup');
  const closePopup = document.getElementById('closePopup');

  if (!form) return;

  form.addEventListener('submit', handleFormSubmit);

  if (closePopup && popup) {
    closePopup.addEventListener('click', () => hidePopup(popup));
  }
}

/**
 * Maneja envío del formulario
 * @param {Event} e - Evento de submit
 */
async function handleFormSubmit(e) {
  e.preventDefault();

  const formData = {
    nombre: e.target.nombre.value.trim(),
    correo: e.target.correo.value.trim(),
    telefono: e.target.telefono?.value.trim() || '',
    mensaje: e.target.mensaje.value.trim()
  };

  // Validación
  if (!validateFormData(formData)) {
    return;
  }

  // Deshabilitar botón durante envío
  const submitButton = e.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = 'Enviando...';

  try {
    const response = await fetchWithTimeout(
      SITE_CONFIG.contactApi,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      },
      API_CONFIG.timeout
    );

    const data = await response.json();

    if (response.ok) {
      e.target.reset();
      showPopup();
    } else {
      showError(`Error: ${data.error?.message || 'No se pudo enviar el mensaje'}`);
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      showError('Tiempo de espera agotado. Por favor, intenta nuevamente.');
    } else {
      showError(`Error de red: ${error.message}`);
    }
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
}

/**
 * Valida datos del formulario
 * @param {Object} data - Datos del formulario
 * @returns {boolean}
 */
function validateFormData(data) {
  if (!data.nombre || data.nombre.length < 2) {
    showError('Por favor, ingresa tu nombre (mínimo 2 caracteres)');
    return false;
  }

  if (!VALIDATION.email.test(data.correo)) {
    showError('Por favor, ingresa un correo válido');
    return false;
  }

  if (data.telefono && !VALIDATION.phone.test(data.telefono)) {
    showError('Por favor, ingresa un teléfono válido');
    return false;
  }

  if (!data.mensaje || data.mensaje.length < 10) {
    showError('Por favor, ingresa un mensaje (mínimo 10 caracteres)');
    return false;
  }

  return true;
}

/**
 * Fetch con timeout
 * @param {string} url - URL
 * @param {Object} options - Opciones de fetch
 * @param {number} timeout - Timeout en ms
 * @returns {Promise}
 */
function fetchWithTimeout(url, options, timeout) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  return fetch(url, {
    ...options,
    signal: controller.signal
  }).finally(() => clearTimeout(id));
}

/**
 * Muestra popup de éxito
 */
function showPopup() {
  const popup = document.getElementById('popup');
  if (popup) {
    popup.classList.remove('hidden');
    popup.classList.add('flex');
  }
}

/**
 * Oculta popup
 * @param {HTMLElement} popup - Elemento popup
 */
function hidePopup(popup) {
  if (popup) {
    popup.classList.add('hidden');
    popup.classList.remove('flex');
  }
}

/**
 * Muestra error con UI mejorada
 * @param {string} message - Mensaje de error
 */
function showError(message) {
  // Crear toast de error en lugar de alert
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up';
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity');
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}
