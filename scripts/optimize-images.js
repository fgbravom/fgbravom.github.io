import sharp from 'sharp';
import { glob } from 'glob';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración
const CONFIG = {
  inputDir: path.resolve(__dirname, '../assets/images'),
  outputDir: path.resolve(__dirname, '../assets/images'),
  originalsDir: path.resolve(__dirname, '../assets/images/originals'),
  formats: ['webp', 'avif'],
  widths: [400, 800, 1200, 1600],
  quality: 80,
  preserveOriginals: true,
};

/**
 * Crea directorio si no existe
 */
async function ensureDir(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
}

/**
 * Mueve originales a carpeta de respaldo
 */
async function backupOriginal(filePath) {
  if (!CONFIG.preserveOriginals) return;

  await ensureDir(CONFIG.originalsDir);

  const filename = path.basename(filePath);
  const backupPath = path.join(CONFIG.originalsDir, filename);

  try {
    // Verificar si ya existe el backup
    await fs.access(backupPath);
    console.log(`   ⏭️  Backup already exists: ${filename}`);
  } catch {
    // Copiar original a carpeta de respaldo
    await fs.copyFile(filePath, backupPath);
    console.log(`   💾 Backed up: ${filename}`);
  }
}

/**
 * Optimiza una imagen y genera múltiples formatos y tamaños
 */
async function optimizeImage(imagePath) {
  const ext = path.extname(imagePath);
  const basename = path.basename(imagePath, ext);
  const dirPath = path.dirname(imagePath);

  // Solo procesar PNG y JPG
  if (!['.png', '.jpg', '.jpeg'].includes(ext.toLowerCase())) {
    console.log(`⏭️  Skipping non-optimizable: ${basename}${ext}`);
    return;
  }

  // Skip si ya es un archivo generado
  if (basename.includes('-400w') || basename.includes('-800w') ||
      basename.includes('-1200w') || basename.includes('-1600w')) {
    return;
  }

  console.log(`\n🖼️  Processing: ${basename}${ext}`);

  try {
    // Backup del original
    await backupOriginal(imagePath);

    // Obtener metadata de la imagen
    const metadata = await sharp(imagePath).metadata();
    console.log(`   Original: ${metadata.width}x${metadata.height} (${metadata.format})`);

    // Generar versiones optimizadas
    for (const format of CONFIG.formats) {
      for (const width of CONFIG.widths) {
        // Skip si el ancho solicitado es mayor que el original
        if (width > metadata.width) continue;

        const outputPath = path.join(
          dirPath,
          `${basename}-${width}w.${format}`
        );

        await sharp(imagePath)
          .resize(width, null, {
            fit: 'inside',
            withoutEnlargement: true,
          })
          [format]({ quality: CONFIG.quality })
          .toFile(outputPath);

        const stats = await fs.stat(outputPath);
        const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
        console.log(`   ✅ Generated: ${path.basename(outputPath)} (${sizeMB} MB)`);
      }
    }

    // Generar versión full-size en WebP
    const fullSizeWebP = path.join(dirPath, `${basename}.webp`);
    await sharp(imagePath)
      .webp({ quality: CONFIG.quality })
      .toFile(fullSizeWebP);

    const webpStats = await fs.stat(fullSizeWebP);
    const webpSizeMB = (webpStats.size / 1024 / 1024).toFixed(2);
    console.log(`   ✅ Generated: ${path.basename(fullSizeWebP)} (${webpSizeMB} MB)`);

    // Generar versión full-size en AVIF
    const fullSizeAvif = path.join(dirPath, `${basename}.avif`);
    await sharp(imagePath)
      .avif({ quality: CONFIG.quality })
      .toFile(fullSizeAvif);

    const avifStats = await fs.stat(fullSizeAvif);
    const avifSizeMB = (avifStats.size / 1024 / 1024).toFixed(2);
    console.log(`   ✅ Generated: ${path.basename(fullSizeAvif)} (${avifSizeMB} MB)`);

    // Generar versión fallback JPG comprimido
    if (ext.toLowerCase() === '.png') {
      const fallbackJpg = path.join(dirPath, `${basename}.jpg`);
      await sharp(imagePath)
        .jpeg({ quality: CONFIG.quality, progressive: true })
        .toFile(fallbackJpg);

      const jpgStats = await fs.stat(fallbackJpg);
      const jpgSizeMB = (jpgStats.size / 1024 / 1024).toFixed(2);
      console.log(`   ✅ Generated fallback: ${path.basename(fallbackJpg)} (${jpgSizeMB} MB)`);
    }

  } catch (error) {
    console.error(`   ❌ Error processing ${basename}${ext}:`, error.message);
  }
}

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log(`📂 Input directory: ${CONFIG.inputDir}`);
  console.log(`📂 Output directory: ${CONFIG.outputDir}`);
  console.log(`🎨 Formats: ${CONFIG.formats.join(', ')}`);
  console.log(`📏 Widths: ${CONFIG.widths.join(', ')}`);
  console.log(`💎 Quality: ${CONFIG.quality}\n`);

  try {
    // Buscar todas las imágenes
    const images = await glob('**/*.{png,jpg,jpeg}', {
      cwd: CONFIG.inputDir,
      absolute: true,
      ignore: ['**/originals/**', '**/*-{400,800,1200,1600}w.*'],
    });

    if (images.length === 0) {
      console.log('⚠️  No images found to optimize');
      return;
    }

    console.log(`Found ${images.length} images to optimize\n`);

    // Procesar cada imagen
    for (const imagePath of images) {
      await optimizeImage(imagePath);
    }

    console.log('\n✨ Image optimization complete!\n');

    // Estadísticas finales
    const originalFiles = await glob('**/originals/*.{png,jpg,jpeg}', {
      cwd: CONFIG.inputDir,
      absolute: true,
    });

    let originalSize = 0;
    for (const file of originalFiles) {
      const stats = await fs.stat(file);
      originalSize += stats.size;
    }

    const optimizedFiles = await glob('**/*.{webp,avif}', {
      cwd: CONFIG.inputDir,
      absolute: true,
      ignore: ['**/originals/**'],
    });

    let optimizedSize = 0;
    for (const file of optimizedFiles) {
      const stats = await fs.stat(file);
      optimizedSize += stats.size;
    }

    const originalSizeMB = (originalSize / 1024 / 1024).toFixed(2);
    const optimizedSizeMB = (optimizedSize / 1024 / 1024).toFixed(2);
    const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

    console.log('📊 Statistics:');
    console.log(`   Original size: ${originalSizeMB} MB`);
    console.log(`   Optimized size: ${optimizedSizeMB} MB`);
    console.log(`   Savings: ${savings}% 🎉\n`);

  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

// Ejecutar
main();
