// Date structurate schema.org (JSON-LD) pentru o pagină rezolvată de resolveSeo().

import { faqs } from '../data/faqs.js';
import {
    SITE_URL,
    SITE_NAME,
    OG_IMAGE,
    AUTHOR,
    CONTACT_EMAIL,
    CONTACT_PHONE,
    absoluteUrl,
    breadcrumbTrail,
    pageLabel,
} from './seoRoutes.js';

const organization = {
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: 'Vorbim-Romaneste.ro',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo_vr.png`,
    image: OG_IMAGE,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    description:
        'Platformă educațională și meditații online de limba română, dedicate vorbitorilor de limba maghiară din România.',
    founder: { '@type': 'Person', name: AUTHOR },
    knowsLanguage: ['ro', 'hu'],
    areaServed: [
        { '@type': 'AdministrativeArea', name: 'Harghita' },
        { '@type': 'AdministrativeArea', name: 'Covasna' },
        { '@type': 'AdministrativeArea', name: 'Mureș' },
        { '@type': 'Country', name: 'România' },
    ],
    sameAs: ['https://www.facebook.com/vorbimromaneste'],
};

const website = (inLanguage) => ({
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    inLanguage,
    publisher: { '@id': `${SITE_URL}/#organization` },
});

/** @returns {object|null} un singur obiect JSON-LD cu @graph, sau null pentru paginile neindexabile. */
export function buildStructuredData(seo) {
    if (seo.kind !== 'page') return null;

    const { page, lang, basePath, htmlLang } = seo;
    const contentLang = htmlLang === 'hu' ? 'HU' : 'RO';
    const inLanguage = htmlLang === 'hu' ? 'hu-HU' : 'ro-RO';
    const graph = [organization, website(inLanguage)];

    if (basePath === '/') {
        graph.push({
            '@type': 'Service',
            name:
                contentLang === 'HU'
                    ? 'Online román nyelvi meditáció magyar anyanyelvűeknek'
                    : 'Meditații online de limba română pentru vorbitori de limba maghiară',
            serviceType: contentLang === 'HU' ? 'Román nyelv meditáció' : 'Meditații limba română',
            provider: { '@id': `${SITE_URL}/#organization` },
            areaServed: { '@type': 'Country', name: 'România' },
            offers: {
                '@type': 'Offer',
                price: '49.99',
                priceCurrency: 'RON',
                url: `${seo.canonical}#pricing-plan`,
                availability: 'https://schema.org/InStock',
            },
        });
    } else {
        graph.push({
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbTrail(basePath).map((crumb, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: pageLabel(crumb, lang),
                item: crumb.hu === 'full' ? absoluteUrl(crumb.path, lang) : absoluteUrl(crumb.path, 'RO'),
            })),
        });
    }

    if (basePath === '/intrebari-frecvente') {
        graph.push({
            '@type': 'FAQPage',
            inLanguage,
            mainEntity: (faqs[contentLang] || faqs.RO).map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
        });
    }

    if (page.topic) {
        const text = page.topic[contentLang];
        graph.push({
            '@type': 'LearningResource',
            '@id': `${seo.canonical}#resource`,
            name: text.h1,
            description: text.description,
            url: seo.canonical,
            inLanguage,
            educationalLevel: page.topic.level[contentLang],
            learningResourceType: contentLang === 'HU' ? 'Feladatlap' : 'Fișă de lucru',
            teaches: text.rules.map((rule) => rule.name),
            isAccessibleForFree: true,
            author: { '@type': 'Person', name: AUTHOR },
            provider: { '@id': `${SITE_URL}/#organization` },
        });
    }

    return { '@context': 'https://schema.org', '@graph': graph };
}
