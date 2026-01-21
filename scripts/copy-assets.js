/**
 * Script para copiar assets/ a public/ antes del build
 * Vite copiará automáticamente el contenido de public/ al dist/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const sourceDir = path.join(projectRoot, 'assets');
const targetDir = path.join(projectRoot, 'public', 'assets');

/**
 * Copia recursivamente un directorio
 * @param {string} src - Ruta origen
 * @param {string} dest - Ruta destino
 */
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`⚠️  Source directory not found: ${src}`);
    return;
  }

  // Crear directorio destino si no existe
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('📦 Copying assets to public directory...\n');

try {
  // Eliminar public/assets si existe (para limpieza)
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
  }

  // Copiar assets a public
  copyRecursive(sourceDir, targetDir);

  console.log(`✅ Assets copied successfully!`);
  console.log(`   From: ${sourceDir}`);
  console.log(`   To: ${targetDir}\n`);
} catch (error) {
  console.error('❌ Error copying assets:', error);
  process.exit(1);
}
