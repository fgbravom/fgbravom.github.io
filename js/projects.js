// ===== RENDERIZACIÓN DE PROYECTOS =====

// Función simple para renderizar proyectos
function renderProjects() {
  console.log('Renderizando proyectos...');
  
  // Verificar que los datos estén disponibles
  if (typeof PROJECTS_DATA === 'undefined') {
    console.log('PROJECTS_DATA no disponible');
    return;
  }
  
  console.log('PROJECTS_DATA encontrado:', PROJECTS_DATA.length, 'proyectos');
  
  // Renderizar proyectos destacados
  const containerPrincipal = document.getElementById('proyectos-galeria-principal');
  if (containerPrincipal) {
    console.log('Renderizando proyectos destacados...');
    containerPrincipal.innerHTML = '';
    
    PROJECTS_DATA.slice(0, 3).forEach(proyecto => {
      containerPrincipal.innerHTML += `
        <div class="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 hover:shadow-2xl transition-all flex flex-col overflow-hidden">
          <img src="${proyecto.imagen}" alt="${proyecto.titulo}" class="w-full h-40 object-cover">
          <div class="p-4 flex-1 flex flex-col">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">${proyecto.anio}</span>
              <span class="text-xs px-2 py-1 rounded ${proyecto.estado === 'Trabajo actual' ? 'bg-green-700 text-green-200' : proyecto.estado === 'En desarrollo' ? 'bg-yellow-700 text-yellow-200' : 'bg-purple-700 text-purple-200'}">${proyecto.estado}</span>
            </div>
            <h3 class="text-base font-bold text-white mb-1">${proyecto.titulo}</h3>
            <div class="flex flex-wrap gap-2 mb-2">
              ${proyecto.etiquetas.map(et => `<span class="text-xs bg-gray-600 text-gray-200 px-2 py-1 rounded">${et}</span>`).join(' ')}
            </div>
            <p class="text-gray-400 text-xs mb-2 flex-1">${proyecto.descripcion}</p>
            <div class="flex items-end justify-between mt-auto">
              <span class="text-xs text-gray-500">${proyecto.fecha}</span>
              ${proyecto.enlace ? `<a href="${proyecto.enlace}" target="_blank" class="text-blue-400 hover:underline text-xs font-medium">Ver más</a>` : ''}
            </div>
          </div>
        </div>
      `;
    });
    
    console.log('Proyectos destacados renderizados');
  }
  
  // Renderizar todos los proyectos
  const containerTodos = document.getElementById('proyectos-galeria');
  if (containerTodos) {
    console.log('Renderizando todos los proyectos...');
    containerTodos.innerHTML = '';
    
    PROJECTS_DATA.forEach(proyecto => {
      containerTodos.innerHTML += `
        <div class="bg-gray-800 rounded-2xl shadow-lg border border-gray-700 hover:shadow-2xl transition-all flex flex-col overflow-hidden">
          <img src="${proyecto.imagen}" alt="${proyecto.titulo}" class="w-full h-48 object-cover">
          <div class="p-5 flex-1 flex flex-col">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">${proyecto.anio}</span>
              <span class="text-xs px-2 py-1 rounded ${proyecto.estado === 'Trabajo actual' ? 'bg-green-700 text-green-200' : proyecto.estado === 'En desarrollo' ? 'bg-yellow-700 text-yellow-200' : 'bg-purple-700 text-purple-200'}">${proyecto.estado}</span>
            </div>
            <h2 class="text-lg font-bold text-white mb-1">${proyecto.titulo}</h2>
            <div class="flex flex-wrap gap-2 mb-2">
              ${proyecto.etiquetas.map(et => `<span class="text-xs bg-gray-600 text-gray-200 px-2 py-1 rounded">${et}</span>`).join(' ')}
            </div>
            <p class="text-gray-400 text-sm mb-3 flex-1">${proyecto.descripcion}</p>
            <div class="flex items-end justify-between mt-auto">
              <span class="text-xs text-gray-500">${proyecto.fecha}</span>
              ${proyecto.enlace ? `<a href="${proyecto.enlace}" target="_blank" class="text-blue-400 hover:underline text-xs font-medium">Ver más</a>` : ''}
            </div>
          </div>
        </div>
      `;
    });
    
    console.log('Todos los proyectos renderizados');
  }
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderProjects);
} else {
  renderProjects();
} 