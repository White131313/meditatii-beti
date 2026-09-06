import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
    SITE_URL,
    SITE_NAME,
    OG_IMAGE,
    AUTHOR,
    CONTACT_EMAIL,
    CONTACT_PHONE,
    resolveSeo,
    canonicalFor,
} from '../lib/seoRoutes';
import { faqs } from '../data/faqs';

const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: 'Vorbim-Romaneste.ro',
    url: SITE_URL,
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

const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: 'ro-RO',
    publisher: { '@id': `${SITE_URL}/#organization` },
};

const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Meditații online de limba română pentru vorbitori de limba maghiară',
    serviceType: 'Meditații limba română',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'România' },
    offers: {
        '@type': 'Offer',
        price: '49',
        priceCurrency: 'RON',
        url: `${SITE_URL}/#pricing-plan`,
        availability: 'https://schema.org/InStock',
    },
};

/** Human-readable labels for breadcrumb segments. */
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
    quiz: 'Teste',
};

function buildBreadcrumbLd(path) {
    const segments = path.split('/').filter(Boolean);
    if (segments.length === 0) return null;

    const items = [{ '@type': 'ListItem', position: 1, name: 'Acasă', item: `${SITE_URL}/` }];
    let acc = '';
    segments.forEach((segment, i) => {
        acc += `/${segment}`;
        items.push({
            '@type': 'ListItem',
            position: i + 2,
            name: segmentLabels[segment] || decodeURIComponent(segment),
            item: `${SITE_URL}${acc}`,
        });
    });

    return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items };
}

const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.RO.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
};

const SEOWrapper = ({ lang = 'RO' }) => {
    const location = useLocation();
    const rawPath = location.pathname;
    const path = rawPath !== '/' && rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath;

    const { title, description, index } = resolveSeo(path);
    const canonicalUrl = canonicalFor(path);
    const htmlLang = lang === 'HU' ? 'hu' : 'ro';

    const breadcrumbLd = buildBreadcrumbLd(path);
    const isHome = path === '/';
    const isFaq = path === '/intrebari-frecvente';

    return (
        <Helmet prioritizeSeoTags>
            <html lang={htmlLang} />
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />
            <meta
                name="robots"
                content={index ? 'index, follow, max-image-preview:large, max-snippet:-1' : 'noindex, follow'}
            />

            {/* Open Graph */}
            <meta property="og:type" content={isHome ? 'website' : 'article'} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={OG_IMAGE} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={`${SITE_NAME} – meditații și resurse de limba română`} />
            <meta property="og:locale" content={htmlLang === 'hu' ? 'hu_HU' : 'ro_RO'} />
            <meta property="og:locale:alternate" content={htmlLang === 'hu' ? 'ro_RO' : 'hu_HU'} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={OG_IMAGE} />

            {/* Structured data */}
            <script type="application/ld+json">{JSON.stringify(organizationLd)}</script>
            <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
            {isHome ? <script type="application/ld+json">{JSON.stringify(serviceLd)}</script> : null}
            {isFaq ? <script type="application/ld+json">{JSON.stringify(faqLd)}</script> : null}
            {breadcrumbLd ? (
                <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
            ) : null}
        </Helmet>
    );
};

export default SEOWrapper;
