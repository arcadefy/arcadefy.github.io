const fs = require('fs');
const path = require('path');

const games = require('../src/data/games.json'); // Adjust the path if necessary
const site = require('../config.json'); // Adjust the path if necessary
const { default: slugify } = require('slugify');

const slugifyText = (text) => // Accept text as a parameter
    slugify(text, {
        lower: true,
        strict: true,
    });

const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
const uniqueCategories = new Set(games.map(item => item.category));

// Generate sitemap entries for each unique category
const sitemapEntries = Array.from(uniqueCategories).map(category => `
    <url>
        <loc>${`${site.SITE_URL}/browse/${slugifyText(category)}`}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
    </url>
`).join('');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
          <url>
    <loc>${site.SITE_URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>

${sitemapEntries}

    ${games.map(item => `
    <url>
      <loc>${`${site.SITE_URL}/play/${slugifyText(item.title)}`}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `).join('')}
  </urlset>`;

  site.LastModified = new Date().toISOString();

try {
  fs.writeFileSync(path.resolve(__dirname, '../config.json'), JSON.stringify(site, null, 2), 'utf8');
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log('Sitemap has been generated at', sitemapPath);
} catch (error) {
  console.error('Error writing sitemap file:', error);
  process.exit(1); // Exit with an error code
}