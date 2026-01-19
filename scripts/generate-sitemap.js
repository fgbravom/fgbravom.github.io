import { promises as fs } from 'fs';
import { glob } from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://fgbravom.github.io';
const OUTPUT = path.resolve(__dirname, '../public/sitemap.xml');

const priority = {
  'index.html': '1.0',
  'proyectos.html': '0.9',
  'sobremi.html': '0.8',
  'tecnologias.html': '0.7',
};

const changefreq = {
  'index.html': 'weekly',
  'proyectos.html': 'weekly',
  'sobremi.html': 'monthly',
  'tecnologias.html': 'monthly',
};

async function generateSitemap() {
  console.log('🗺️  Generating sitemap...\n');

  try {
    // Crear directorio public si no existe
    const publicDir = path.resolve(__dirname, '../public');
    try {
      await fs.access(publicDir);
    } catch {
      await fs.mkdir(publicDir, { recursive: true });
      console.log(`📁 Created directory: ${publicDir}`);
    }

    // Buscar todas las páginas HTML (excepto en components)
    const pages = await glob('*.html', {
      cwd: path.resolve(__dirname, '..'),
      ignore: ['components/**'],
    });

    if (pages.length === 0) {
      console.log('⚠️  No HTML pages found');
      return;
    }

    console.log(`Found ${pages.length} pages:`);
    pages.forEach(page => console.log(`   - ${page}`));
    console.log('');

    const lastmod = new Date().toISOString().split('T')[0];

    const urls = pages
      .map(page => {
        const pagePath = page === 'index.html' ? '' : page;
        const url = `${BASE_URL}/${pagePath}`;
        const pagePriority = priority[page] || '0.5';
        const pageChangefreq = changefreq[page] || 'monthly';

        return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${pageChangefreq}</changefreq>
    <priority>${pagePriority}</priority>
  </url>`;
      })
      .join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

    await fs.writeFile(OUTPUT, sitemap, 'utf-8');
    console.log(`✅ Sitemap generated: ${OUTPUT}\n`);

    // Mostrar contenido del sitemap
    console.log('📄 Sitemap content preview:');
    console.log('─'.repeat(50));
    console.log(sitemap);
    console.log('─'.repeat(50));
    console.log('');

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
