import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL('https://xyvon.com')).toString().replace(/\/$/, '');
  const today = new Date().toISOString().slice(0, 10);

  const routes: Array<{ loc: string; changefreq?: string; priority?: number }> = [
    { loc: '/', changefreq: 'weekly', priority: 1.0 },
    { loc: '/#products', changefreq: 'weekly', priority: 0.9 },
    { loc: '/#science', changefreq: 'weekly', priority: 0.8 },
    { loc: '/#story', changefreq: 'monthly', priority: 0.7 },
    { loc: '/#substack', changefreq: 'weekly', priority: 0.7 },
    { loc: '/which-xyvon', changefreq: 'monthly', priority: 0.6 },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .map(
    (r) => `  <url>
    <loc>${base}${r.loc}</loc>
    <lastmod>${today}</lastmod>
    ${r.changefreq ? `<changefreq>${r.changefreq}</changefreq>` : ''}
    ${r.priority != null ? `<priority>${r.priority.toFixed(1)}</priority>` : ''}
    <xhtml:link rel="alternate" hreflang="en" href="${base}${r.loc}" />
    <xhtml:link rel="alternate" hreflang="ro" href="${base}/ro${r.loc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${base}${r.loc}" />
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
