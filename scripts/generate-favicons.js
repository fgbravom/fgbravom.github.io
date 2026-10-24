/**
 * Genera los iconos del sitio y el logo de la topbar a partir de
 * assets/images/originals/fgbm1.png (fuente 2722x1568 con el monograma).
 *
 * Salidas:
 *   public/favicon.ico          (16, 32 y 48 px, PNG embebido)
 *   public/favicon-32x32.png
 *   public/favicon-16x16.png
 *   public/apple-touch-icon.png (180x180, fondo negro)
 *   public/fgbm1.png            (256x256 transparente, topbar)
 *
 * Uso: npm run generate-favicons
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const SOURCE = path.join(projectRoot, 'assets', 'images', 'originals', 'fgbm1.png');
const PUBLIC_DIR = path.join(projectRoot, 'public');

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
const APPLE_BG = '#000000';

const PNG_FAVICON_SIZES = [16, 32]; // favicon-<N>x<N>.png
const ICO_SIZES = [16, 32, 48]; // dentro de favicon.ico
const APPLE_TOUCH_SIZE = 180;
const LOGO_SIZE = 256;

/**
 * Construye un .ico que embebe imágenes PNG (compatible con todo
 * navegador moderno). entries: [{ size, buffer }]
 */
function buildIco(entries) {
  const headerSize = 6 + entries.length * 16;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);

  let offset = headerSize;
  entries.forEach((entry, i) => {
    const p = 6 + i * 16;
    header.writeUInt8(entry.size >= 256 ? 0 : entry.size, p); // width
    header.writeUInt8(entry.size >= 256 ? 0 : entry.size, p + 1); // height
    header.writeUInt8(0, p + 2); // color palette
    header.writeUInt8(0, p + 3); // reserved
    header.writeUInt16LE(1, p + 4); // color planes
    header.writeUInt16LE(32, p + 6); // bits per pixel
    header.writeUInt32LE(entry.buffer.length, p + 8);
    header.writeUInt32LE(offset, p + 12);
    offset += entry.buffer.length;
  });

  return Buffer.concat([header, ...entries.map((entry) => entry.buffer)]);
}

/**
 * Recorta el monograma y devuelve un PNG cuadrado con el logo centrado
 * sobre fondo transparente.
 */
async function buildSquareLogo() {
  const trimmed = await sharp(SOURCE).trim({ threshold: 10 }).png().toBuffer();
  const meta = await sharp(trimmed).metadata();
  const side = Math.max(meta.width, meta.height);

  return sharp(trimmed)
    .resize(side, side, { fit: 'contain', background: TRANSPARENT })
    .png()
    .toBuffer();
}

async function main() {
  await fs.access(SOURCE).catch(() => {
    console.error(`No se encontró la imagen fuente: ${SOURCE}`);
    process.exit(1);
  });

  await fs.mkdir(PUBLIC_DIR, { recursive: true });

  const square = await buildSquareLogo();

  // favicon-<N>x<N>.png (fondo transparente)
  for (const size of PNG_FAVICON_SIZES) {
    const out = path.join(PUBLIC_DIR, `favicon-${size}x${size}.png`);
    await sharp(square).resize(size, size).png({ compressionLevel: 9 }).toFile(out);
    console.log(`Generado: public/favicon-${size}x${size}.png`);
  }

  // favicon.ico (16 + 32 + 48 px)
  const icoEntries = [];
  for (const size of ICO_SIZES) {
    icoEntries.push({
      size,
      buffer: await sharp(square)
        .resize(size, size)
        .png({ compressionLevel: 9 })
        .toBuffer(),
    });
  }
  await fs.writeFile(path.join(PUBLIC_DIR, 'favicon.ico'), buildIco(icoEntries));
  console.log(`Generado: public/favicon.ico (${ICO_SIZES.join('/')} px)`);

  // apple-touch-icon.png (iOS pide fondo opaco)
  await sharp(square)
    .resize(APPLE_TOUCH_SIZE, APPLE_TOUCH_SIZE)
    .flatten({ background: APPLE_BG })
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
  console.log(`Generado: public/apple-touch-icon.png (${APPLE_TOUCH_SIZE}x${APPLE_TOUCH_SIZE})`);

  // Logo de la topbar (transparente)
  await sharp(square)
    .resize(LOGO_SIZE, LOGO_SIZE)
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC_DIR, 'fgbm1.png'));
  console.log(`Generado: public/fgbm1.png (${LOGO_SIZE}x${LOGO_SIZE})`);
}

main().catch((error) => {
  console.error('Error generando los iconos:', error);
  process.exit(1);
});
