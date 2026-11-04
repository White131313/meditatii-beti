#!/usr/bin/env node
/**
 * Pre-randare la build (rulează după `vite build` și `vite build --ssr`).
 *
 * Pentru fiecare pagină publică, în română și în maghiară, scrie în dist/ un fișier
 * HTML care conține deja conținutul paginii (nu doar <div id="root"></div>), plus
 * <head>-ul complet: titlu, descriere, canonical, hreflang, Open Graph, JSON-LD.
 * În browser, React preia HTML-ul (hidratare) și aplicația merge ca înainte.
 *
 * Mai scrie:
 *   - dist/spa.html    – pagină goală pentru rutele doar-browser (login, admin, quiz);
 *   - dist/404.html    – pagina 404 (Vercel o servește cu status 404);
 *   - dist/sitemap.xml – toate paginile indexabile, cu alternativele ro/hu.
 *
 * Datele (materialele) se citesc din Supabase la build. Dacă Supabase nu răspunde,
 * build-ul eșuează, ca să nu publicăm pagini goale (Vercel păstrează versiunea veche).
 */

import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(projectRoot, 'dist');
const ssrDir = join(projectRoot, 'dist-ssr');

const ssr = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);
const { render, resolveSeo, renderHeadHtml, publicPages, localizePath, SITE_URL, lessonTopics, fetchPrerenderData } = ssr;

/** '/' → 'index.html', '/hu' → 'hu.html', '/hu/copii/intrusul' → 'hu/copii/intrusul.html'. */
const fileFor = (pathname) => (pathname === '/' ? 'index.html' : `${pathname.slice(1)}.html`);

function fillTemplate(template, { headHtml, appHtml, htmlLang, data }) {
    const replaceOnce = (html, search, replacement, label) => {
        if (!html.includes(search)) {
            throw new Error(`prerender: nu am găsit ${label} în dist/index.html (s-a schimbat index.html?).`);
        }
        return html.replace(search, () => replacement);
    };

    let html = template;
    html = replaceOnce(html, '<html lang="ro">', `<html lang="${htmlLang}">`, '<html lang="ro">');
    html = replaceOnce(html, '<title>Vorbim Românește</title>', headHtml, '<title>Vorbim Românește</title>');

    const dataScript = data
        ? `<script>window.__INITIAL_DATA__=${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
        : '';
    html = replaceOnce(html, '<div id="root"></div>', `<div id="root">${appHtml}</div>${dataScript}`, '<div id="root"></div>');
    return html;
}

async function writePage(relativeFile, html) {
    const target = join(distDir, relativeFile);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html, 'utf8');
}

/** Data ultimei modificări de conținut: cel mai nou material din secțiune / subiect. */
function lastmodFor(page, materials) {
    let related = [];
    if (page.category) related = materials.filter((m) => m.category === page.category);
    if (page.topic) related = materials.filter((m) => page.topic.materialIds.includes(m.id));
    const newest = related.map((m) => m.created_at).filter(Boolean).sort().pop();
    return newest ? newest.slice(0, 10) : null;
}

function buildSitemap(entries) {
    const urls = entries
        .map(({ loc, lastmod, alternates }) => {
            const lines = [`    <loc>${loc}</loc>`];
            if (lastmod) lines.push(`    <lastmod>${lastmod}</lastmod>`);
            for (const alt of alternates) {
                lines.push(`    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`);
            }
            return `  <url>\n${lines.join('\n')}\n  </url>`;
        })
        .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

async function main() {
    const data = await fetchPrerenderData();
    const template = await readFile(join(distDir, 'index.html'), 'utf8');

    // Verificare: fiecare subiect trebuie să aibă materialele lui în Supabase.
    for (const topic of lessonTopics) {
        const missing = topic.materialIds.filter((id) => !data.materials.some((m) => m.id === id));
        if (missing.length) {
            console.warn(`prerender: atenție, subiectul „${topic.slug}” are materiale care nu mai există: ${missing.join(', ')}`);
        }
    }

    const sitemapEntries = [];
    let written = 0;

    for (const page of publicPages) {
        for (const lang of ['RO', 'HU']) {
            const pathname = localizePath(page.path, lang);
            const seo = resolveSeo(pathname, data);
            const html = fillTemplate(template, {
                headHtml: renderHeadHtml(seo),
                appHtml: render(pathname, data),
                htmlLang: seo.htmlLang,
                data,
            });
            await writePage(fileFor(pathname), html);
            written += 1;

            // În sitemap intră doar paginile indexabile al căror canonical sunt chiar ele.
            if (seo.indexable && seo.canonical === `${SITE_URL}${pathname}`) {
                sitemapEntries.push({ loc: seo.canonical, lastmod: lastmodFor(page, data.materials), alternates: seo.alternates });
            }
        }
    }

    // Rute doar-browser: #root gol, noindex; aplicația pornește de la zero.
    const spaSeo = resolveSeo('/login', data);
    await writePage(
        'spa.html',
        fillTemplate(template, { headHtml: renderHeadHtml(spaSeo), appHtml: '', htmlLang: 'ro', data })
    );

    // 404: Vercel o servește pentru orice adresă necunoscută (și /hu/...), deci #root rămâne
    // gol și aplicația randează mesajul în limba din URL (fără nepotriviri la hidratare).
    const notFoundSeo = resolveSeo('/pagina-inexistenta', data);
    await writePage(
        '404.html',
        fillTemplate(template, { headHtml: renderHeadHtml(notFoundSeo), appHtml: '', htmlLang: 'ro', data })
    );

    await writeFile(join(distDir, 'sitemap.xml'), buildSitemap(sitemapEntries), 'utf8');
    await rm(ssrDir, { recursive: true, force: true });

    console.log(
        `prerender: ${written} pagini (RO + HU), ${sitemapEntries.length} URL-uri în sitemap.xml, ` +
            `${data.materials.length} materiale din Supabase.`
    );
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
