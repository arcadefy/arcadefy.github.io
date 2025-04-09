import { getGames } from "@/lib/games";
import config from "../../../config";

export const dynamic = 'force-static'; // or 'auto' for ISR
// export const revalidate = 86400;

export async function GET() {
  const currentDate = new Date().toISOString();

  const staticPaths = [
    '/',
  ];

  const footerPaths = config.FooterMenu.map(item => item.url);

  // Get all games
  const games = getGames(); // optionally pass category or limit
  const gamePaths = games.map(game => `/play/${game.slug}`); // adjust if using `game.id`

  const allPaths = [...staticPaths, ...footerPaths, ...gamePaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPaths
    .map(
      (path) => `
  <url>
    <loc>${config.siteURL}${path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${path === '/' ? 'yearly' : 'weekly'}</changefreq>
    <priority>${path === '/' ? '1.0' : '0.5'}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
