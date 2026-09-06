#!/usr/bin/env node
/**
 * Post-build SEO generator.
 *
 * The app is a client-rendered SPA, so every URL used to be served the same
 * index.html with the home page's <title>. Crawlers that do not execute
 * JavaScript (and every social-network link preview) therefore saw identical
 * metadata for all pages. This script fixes that at build time:
 *
 *   1. writes dist/<route>.html for every indexable route, with its own
 *      title / description / canonical / Open Graph / Twitter tags and
 *      Organization + WebSite + BreadcrumbList structured data;
 *   2. writes sitemap.xml (dist/ and public/, so the repo stays in sync).
 *
 * vercel.json maps each route to its generated file; everything else falls
 * back to index.html and is rendered client-side as before.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { SITE_URL, SITE_NAME, OG_IMAGE, indexableRoutes } from '../src/lib/seoRoutes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const distDir = join(projectRoot, 'dist');
const publicDir = join(projectRoot, 'public');

const escapeHtml = (value) =>
    String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const segmentLabels = {
    copii: 'Copii',
    propozitii: 'Construiește propoziția',
    intrusul: 'Găsește intrusul',
    'adevarat-fals': 'Adevărat sau Fals',
    articole: 'Articole',
    vorbeste: 'Joc de pronunție',
    'intrebari-frecvente': 'Întrebări frecvente',
    contact: 'Contact',
    termeni: 'Termeni și condiții',
    confidentialitate: 'Politica de confidențialitate',
    cookies: 'Politica de cookies',
    course: 'Cursuri',
    adults_communication: 'Comunicare pentru adulți',
    gymnasium_curriculum: 'Materie clasele V-VIII',
    national_exam_prep: 'Evaluare Națională',
};

function structuredData(path) {
    const graph = [
        {
            '@type': 'EducationalOrganization',
            '@id': `${SITE_URL}/#organization`,
            name: SITE_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/logo_vr.png`,
            image: OG_IMAGE,
            email: 'bernad.beatrice23@gmail.com',
            telephone: '+40757947933',
            founder: { '@type': 'Person', name: 'Beatrice Bernad' },
            sameAs: ['https://www.facebook.com/vorbimromaneste'],
        },
        {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: SITE_NAME,
            inLanguage: 'ro-RO',
            publisher: { '@id': `${SITE_URL}/#organization` },
        },
    ];

    const segments = path.split('/').filter(Boolean);
    if (segments.length > 0) {
        const items = [{ '@type': 'ListItem', position: 1, name: 'Acasă', item: `${SITE_URL}/` }];
        let acc = '';
        segments.forEach((segment, i) => {
            acc += `/${segment}`;
            items.push({
                '@type': 'ListItem',
                position: i + 2,
                name: segmentLabels[segment] || segment,
                item: `${SITE_URL}${acc}`,
            });
        });
        graph.push({ '@type': 'BreadcrumbList', itemListElement: items });
    }

    return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

/** Replace a tag matched by `pattern`, failing loudly if the template changed. */
function replaceOrThrow(html, pattern, replacement, label) {
    if (!pattern.test(html)) {
        throw new Error(`generate-seo: nu am găsit ${label} în dist/index.html — template-ul s-a schimbat.`);
    }
    return html.replace(pattern, replacement);
}

function buildPage(template, route) {
    const canonical = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
    const title = escapeHtml(route.title);
    const description = escapeHtml(route.description);

    let html = template;

    html = replaceOrThrow(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, '<title>');
    html = replaceOrThrow(
        html,
        /<meta name="description"[\s\S]*?\/>/,
        `<meta name="description" content="${description}" />`,
        'meta description'
    );
    html = replaceOrThrow(
        html,
        /<link rel="canonical"[^>]*>/,
        `<link rel="canonical" href="${canonical}" />`,
        'canonical'
    );

    html = html
        .replace(/<meta property="og:title"[\s\S]*?\/>/, `<meta property="og:title" content="${title}" />`)
        .replace(
            /<meta property="og:description"[\s\S]*?\/>/,
            `<meta property="og:description" content="${description}" />`
        )
        .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`)
        .replace(
            /<meta property="og:type"[^>]*>/,
            `<meta property="og:type" content="${route.path === '/' ? 'website' : 'article'}" />`
        )
        .replace(/<meta name="twitter:title"[\s\S]*?\/>/, `<meta name="twitter:title" content="${title}" />`)
        .replace(
            /<meta name="twitter:description"[\s\S]*?\/>/,
            `<meta name="twitter:description" content="${description}" />`
        );

    // Structured data, injected just before </head>.
    html = html.replace(
        '</head>',
        `  <script type="application/ld+json">${structuredData(route.path)}</script>\n</head>`
    );

    // Give non-JS crawlers the page's own heading instead of the generic one.
    html = html.replace(
        /<h1>[\s\S]*?<\/h1>/,
        `<h1>${title}</h1>`
    );

    return html;
}

function buildSitemap(routes, lastmod) {
    const urls = routes
        .map(
            (route) => `  <url>
    <loc>${SITE_URL}${route.path === '/' ? '/' : route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
        )
        .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function main() {
    const lastmod = new Date().toISOString().slice(0, 10);

    // The sitemap is written even without a build, so `npm run seo` alone refreshes it.
    const sitemap = buildSitemap(indexableRoutes, lastmod);
    await writeFile(join(publicDir, 'sitemap.xml'), sitemap, 'utf8');

    if (!existsSync(distDir)) {
        console.log('generate-seo: dist/ lipsește — am actualizat doar public/sitemap.xml.');
        return;
    }

    await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8');

    const template = await readFile(join(distDir, 'index.html'), 'utf8');
    let written = 0;

    for (const route of indexableRoutes) {
        if (route.path === '/') {
            await writeFile(join(distDir, 'index.html'), buildPage(template, route), 'utf8');
        } else {
            const target = join(distDir, `${route.path.slice(1)}.html`);
            await mkdir(dirname(target), { recursive: true });
            await writeFile(target, buildPage(template, route), 'utf8');
        }
        written += 1;
    }

    console.log(
        `generate-seo: ${written} pagini pre-randate + sitemap.xml cu ${indexableRoutes.length} URL-uri (lastmod ${lastmod}).`
    );
}

main().catch((error) => {
    console.error(error.message);
    process.exit(1);
});
