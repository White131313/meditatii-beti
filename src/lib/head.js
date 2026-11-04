// Etichetele <head> ale unei pagini, generate o singură dată din resolveSeo():
//   - la build, ca text HTML (renderHeadHtml) în fișierul static al paginii;
//   - în browser, la navigare (applyHead), înlocuind etichetele existente.
//
// Fiecare etichetă poartă atributul data-seo, ca la navigare să fie înlocuită,
// nu dublată (problema veche: react-helmet-async adăuga un al doilea set).

import { SITE_NAME, OG_IMAGE } from './seoRoutes.js';
import { buildStructuredData } from './structuredData.js';

/** @returns {Array<{tag:string, attrs:Record<string,string>, text?:string}>} */
export function headTags(seo) {
    const tags = [
        { tag: 'meta', attrs: { name: 'description', content: seo.description } },
        { tag: 'meta', attrs: { name: 'robots', content: seo.robots } },
    ];

    if (seo.canonical) tags.push({ tag: 'link', attrs: { rel: 'canonical', href: seo.canonical } });
    for (const alt of seo.alternates) {
        tags.push({ tag: 'link', attrs: { rel: 'alternate', hreflang: alt.hreflang, href: alt.href } });
    }

    tags.push(
        { tag: 'meta', attrs: { property: 'og:type', content: seo.ogType } },
        { tag: 'meta', attrs: { property: 'og:site_name', content: SITE_NAME } },
        { tag: 'meta', attrs: { property: 'og:title', content: seo.title } },
        { tag: 'meta', attrs: { property: 'og:description', content: seo.description } },
        { tag: 'meta', attrs: { property: 'og:image', content: OG_IMAGE } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { property: 'og:locale', content: seo.ogLocale } }
    );
    if (seo.canonical) tags.push({ tag: 'meta', attrs: { property: 'og:url', content: seo.canonical } });
    if (seo.ogLocaleAlternate) {
        tags.push({ tag: 'meta', attrs: { property: 'og:locale:alternate', content: seo.ogLocaleAlternate } });
    }

    tags.push(
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:title', content: seo.title } },
        { tag: 'meta', attrs: { name: 'twitter:description', content: seo.description } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: OG_IMAGE } }
    );

    const ld = buildStructuredData(seo);
    if (ld) {
        // '<' escapat, ca un text din date să nu poată închide tag-ul <script>.
        tags.push({
            tag: 'script',
            attrs: { type: 'application/ld+json' },
            text: JSON.stringify(ld).replace(/</g, '\\u003c'),
        });
    }

    return tags;
}

const escapeAttr = (value) =>
    String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const escapeText = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** HTML-ul pentru <head> (titlu + etichete), folosit la pre-randare. */
export function renderHeadHtml(seo) {
    const lines = [`<title>${escapeText(seo.title)}</title>`];
    for (const { tag, attrs, text } of headTags(seo)) {
        const attrString = Object.entries(attrs)
            .map(([key, value]) => `${key}="${escapeAttr(value)}"`)
            .join(' ');
        lines.push(
            tag === 'meta' || tag === 'link'
                ? `<${tag} data-seo ${attrString} />`
                : `<${tag} data-seo ${attrString}>${text ?? ''}</${tag}>`
        );
    }
    return lines.join('\n    ');
}

/** Actualizează <head> în browser după o navigare: înlocuiește etichetele, nu le dublează. */
export function applyHead(seo) {
    if (typeof document === 'undefined') return;

    document.documentElement.lang = seo.htmlLang;
    document.title = seo.title;

    document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());

    const fragment = document.createDocumentFragment();
    for (const { tag, attrs, text } of headTags(seo)) {
        const el = document.createElement(tag);
        el.setAttribute('data-seo', '');
        for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
        if (text) el.textContent = text;
        fragment.appendChild(el);
    }
    document.head.appendChild(fragment);
}
