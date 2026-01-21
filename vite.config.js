import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import legacy from '@vitejs/plugin-legacy';
import { resolve } from 'path';

export default defineConfig({
  // Multi-page application setup
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sobremi: resolve(__dirname, 'sobremi.html'),
        proyectos: resolve(__dirname, 'proyectos.html'),
        tecnologias: resolve(__dirname, 'tecnologias.html'),
        contacto: resolve(__dirname, 'contacto.html'),
      },
    },
    // Optimizaciones
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.log en producción
        drop_debugger: true,
      },
    },
    // Asset optimization
    assetsInlineLimit: 4096, // Inline assets < 4KB
    cssCodeSplit: true,
    sourcemap: false, // Desactivar source maps en producción
    chunkSizeWarningLimit: 500,
  },

  // Server configuration
  server: {
    port: 5173,
    open: true,
  },

  // Preview configuration
  preview: {
    port: 4173,
  },

  // Plugins
  plugins: [
    // HTML transformations
    createHtmlPlugin({
      minify: true,
    }),

    // Legacy browser support (ES5 fallback)
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: [
        'es.symbol',
        'es.array.filter',
        'es.promise',
        'es.promise.finally',
      ],
    }),
  ],

  // Resolve configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, 'js'),
      '@utils': resolve(__dirname, 'js/utils'),
      '@components': resolve(__dirname, 'js/components'),
      '@modules': resolve(__dirname, 'js/modules'),
    },
  },

  // CSS configuration
  css: {
    postcss: './postcss.config.js',
  },

  // Base path (para GitHub Pages)
  base: '/',

  // Optimizaciones de dependencias
  optimizeDeps: {
    include: [],
  },
});
