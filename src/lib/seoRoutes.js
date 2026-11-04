// Sursa unică pentru URL-uri, limbi și metadate SEO.
//
// Folosită la runtime (SEOHead, link-uri, comutatorul RO/HU) și la build
// (scripts/prerender.mjs: HTML static pentru fiecare pagină × limbă + sitemap.xml).
//
// Limba face parte din URL: româna la rădăcină (/copii), maghiara sub /hu (/hu/copii).

import { lessonTopics } from '../data/lessonTopics.js';

export const SITE_URL = 'https://vorbim-romaneste.ro';
export const SITE_NAME = 'Vorbim Românește';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const AUTHOR = 'Beatrice Bernad';
export const CONTACT_EMAIL = 'bernad.beatrice23@gmail.com';
export const CONTACT_PHONE = '+40757947933';

export const HU_PREFIX = '/hu';

/** Categoria din Supabase (`materials.category`) → URL-ul secțiunii (fără prefix de limbă). */
export const CATEGORY_PATHS = {
    gymnasium_curriculum: '/materie-gimnaziu',
    national_exam_prep: '/evaluare-nationala',
    adults_communication: '/comunicare-adulti',
    practice_exercises: '/exercitii',
};

export const categoryPath = (categoryId) => CATEGORY_PATHS[categoryId] || '/';

export const topicPath = (topic) => `${CATEGORY_PATHS[topic.category]}/${topic.slug}`;

const INDEX_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1';
const NOINDEX_ROBOTS = 'noindex, follow';

// `hu`: 'full'   → există versiune maghiară completă (hreflang ro/hu reciproc);
//       'chrome' → interfața e în maghiară, dar textul paginii rămâne în română,
//                  deci versiunea /hu are canonical spre cea românească și nu intră în sitemap.
const PAGES = [
    {
        path: '/',
        hu: 'full',
        label: { RO: 'Acasă', HU: 'Főoldal' },
        RO: {
            title: 'Meditații Limba Română pentru Maghiari | Vorbim Românește',
            description:
                'Meditații online de limba română pentru vorbitorii de maghiară din Harghita, Covasna și Mureș. Pregătire Evaluare Națională, fișe PDF, exerciții și jocuri interactive explicate logic.',
        },
        HU: {
            title: 'Román nyelv meditáció magyar anyanyelvűeknek | Vorbim Românește',
            description:
                'Online román nyelvi meditáció magyar anyanyelvű diákoknak és felnőtteknek Hargita, Kovászna és Maros megyéből. Felkészítés a képességvizsgára, PDF feladatlapok, gyakorlatok és interaktív játékok.',
        },
    },
    {
        path: '/materie-gimnaziu',
        category: 'gymnasium_curriculum',
        hu: 'full',
        label: { RO: 'Materie V-VIII', HU: 'Tananyag V–VIII' },
        RO: {
            title: 'Limba Română Clasele V-VIII – Materie și Fișe de Lucru | Vorbim Românește',
            description:
                'Fișe de lucru, scheme recapitulative și exerciții pentru materia de limba română din gimnaziu, clasele V-VIII, explicate pentru elevii vorbitori de maghiară.',
        },
        HU: {
            title: 'Román nyelv V–VIII. osztály – tananyag és feladatlapok | Vorbim Românește',
            description:
                'Feladatlapok, összefoglaló vázlatok és gyakorlatok az V–VIII. osztályos román tananyaghoz, magyar anyanyelvű diákoknak elmagyarázva.',
        },
    },
    {
        path: '/evaluare-nationala',
        category: 'national_exam_prep',
        hu: 'full',
        label: { RO: 'Evaluare Națională', HU: 'Képességvizsga' },
        RO: {
            title: 'Pregătire Evaluare Națională Limba Română | Vorbim Românește',
            description:
                'Pregătire pentru Evaluarea Națională la limba română: modele de subiecte, strategii de rezolvare și materiale pentru clasa a VIII-a, explicate pentru elevii vorbitori de maghiară.',
        },
        HU: {
            title: 'Felkészítés a román képességvizsgára (Evaluare Națională) | Vorbim Românește',
            description:
                'Felkészítés a nyolcadikos román nyelv és irodalom képességvizsgára: mintafeladatsorok, megoldási stratégiák és anyagok magyar anyanyelvű diákoknak.',
        },
    },
    {
        path: '/comunicare-adulti',
        category: 'adults_communication',
        hu: 'full',
        label: { RO: 'Comunicare adulți', HU: 'Felnőtt kommunikáció' },
        RO: {
            title: 'Curs de Comunicare în Limba Română pentru Adulți | Vorbim Românește',
            description:
                'Materiale și lecții de comunicare în limba română pentru adulți vorbitori de maghiară: dialoguri uzuale, vocabular practic și gramatică explicată logic.',
        },
        HU: {
            title: 'Román nyelvű kommunikáció felnőtteknek | Vorbim Românește',
            description:
                'Román nyelvi leckék magyar anyanyelvű felnőtteknek: hétköznapi párbeszédek, gyakorlati szókincs és logikusan elmagyarázott nyelvtan.',
        },
    },
    {
        path: '/exercitii',
        category: 'practice_exercises',
        hu: 'full',
        label: { RO: 'Exersează', HU: 'Gyakorlat' },
        RO: {
            title: 'Exerciții și Teste de Limba Română cu Explicații | Vorbim Românește',
            description:
                'Teste grilă de limba română pe lecțiile din gimnaziu (cazurile substantivului, subiectul și atributul) cu corectare instantanee și explicație la fiecare răspuns.',
        },
        HU: {
            title: 'Román nyelvtani gyakorlatok és tesztek magyarázattal | Vorbim Românește',
            description:
                'Feleletválasztós tesztek a gimnáziumi román nyelvtanhoz (a főnév esetei, az alany és a jelző), azonnali javítással és magyarázattal minden válaszhoz.',
        },
    },
    {
        path: '/copii',
        hu: 'full',
        label: { RO: 'Jocuri pentru copii', HU: 'Játékok gyerekeknek' },
        RO: {
            title: 'Jocuri Educative în Limba Română pentru Copii | Vorbim Românește',
            description:
                'Jocuri interactive pentru învățarea limbii române: construiește propoziții, găsește intrusul, adevărat sau fals, articole și pronunție cu microfon. Create pentru copiii vorbitori de maghiară.',
        },
        HU: {
            title: 'Román nyelvű oktatójátékok gyerekeknek | Vorbim Românește',
            description:
                'Interaktív játékok a román nyelv tanulásához: mondatépítés, keresd a kakukktojást, igaz vagy hamis, névelők és kiejtés mikrofonnal. Magyar anyanyelvű gyerekeknek készült.',
        },
    },
    {
        path: '/copii/propozitii',
        game: 'propozitii',
        hu: 'full',
        label: { RO: 'Construiește propoziția', HU: 'Mondatépítés' },
        RO: {
            title: 'Joc: Construiește Propoziția în Limba Română | Vorbim Românește',
            description:
                'Joc educativ în care copiii așază cuvintele în ordinea corectă și învață topica propoziției românești, pas cu pas, fără reguli complicate.',
        },
        HU: {
            title: 'Játék: Építsd fel a román mondatot | Vorbim Românește',
            description:
                'Oktatójáték, amelyben a gyerek helyes sorrendbe rakja a szavakat, és lépésről lépésre megtanulja a román mondat szórendjét, bonyolult szabályok nélkül.',
        },
    },
    {
        path: '/copii/intrusul',
        game: 'intrusul',
        hu: 'full',
        label: { RO: 'Găsește intrusul', HU: 'Keresd a kakukktojást' },
        RO: {
            title: 'Joc: Găsește Intrusul – Vocabular Român | Vorbim Românește',
            description:
                'Joc de vocabular în limba română: copilul descoperă cuvântul care nu se potrivește în grup și își fixează sensul cuvintelor noi.',
        },
        HU: {
            title: 'Játék: Keresd a kakukktojást – román szókincs | Vorbim Românește',
            description:
                'Román szókincsjáték: a gyerek megkeresi azt a szót, amelyik nem illik a csoportba, és így rögzíti az új szavak jelentését.',
        },
    },
    {
        path: '/copii/adevarat-fals',
        game: 'adevarat-fals',
        hu: 'full',
        label: { RO: 'Adevărat sau Fals', HU: 'Igaz vagy hamis' },
        RO: {
            title: 'Joc: Adevărat sau Fals în Limba Română | Vorbim Românește',
            description:
                'Întrebări scurte de tip adevărat sau fals pentru exersarea înțelegerii limbii române și a culturii generale, potrivite pentru clasele primare și gimnaziu.',
        },
        HU: {
            title: 'Játék: Igaz vagy hamis – román nyelven | Vorbim Românește',
            description:
                'Rövid igaz–hamis állítások román nyelven a szövegértés és az általános műveltség gyakorlására, elemi és gimnáziumi osztályoknak.',
        },
    },
    {
        path: '/copii/articole',
        game: 'articole',
        hu: 'full',
        label: { RO: 'Un sau O', HU: 'Un vagy O' },
        RO: {
            title: 'Joc: Un sau O? – Articolul Nehotărât în Limba Română | Vorbim Românește',
            description:
                'Exercițiu interactiv pentru articolul nehotărât (un / o) și genul substantivelor, cea mai frecventă dificultate a vorbitorilor de limba maghiară, care nu are genuri gramaticale.',
        },
        HU: {
            title: 'Játék: Un vagy O? – a román határozatlan névelő | Vorbim Românește',
            description:
                'Interaktív gyakorlat a román határozatlan névelőhöz (un / o) és a főnevek neméhez, ami a magyar anyanyelvűek egyik leggyakoribb nehézsége, hiszen a magyarban nincs nyelvtani nem.',
        },
    },
    {
        path: '/copii/vorbeste',
        game: 'vorbeste',
        hu: 'full',
        label: { RO: 'Spune în română', HU: 'Mondd románul' },
        RO: {
            title: 'Joc de Pronunție cu Microfon în Limba Română | Vorbim Românește',
            description:
                'Joc gratuit de pronunție: copilul rostește cuvântul în limba română, iar aplicația îi confirmă instant dacă a pronunțat corect. Funcționează direct în browser.',
        },
        HU: {
            title: 'Kiejtési játék mikrofonnal – mondd románul! | Vorbim Românește',
            description:
                'Ingyenes kiejtési játék: a gyerek románul kimondja a szót, az alkalmazás pedig azonnal jelzi, hogy helyesen mondta-e. Közvetlenül a böngészőben működik.',
        },
    },
    {
        path: '/intrebari-frecvente',
        hu: 'full',
        label: { RO: 'Întrebări frecvente', HU: 'Gyakori kérdések' },
        RO: {
            title: 'Întrebări Frecvente despre Meditațiile Online | Vorbim Românește',
            description:
                'Cum se desfășoară ședințele online, ce niveluri acoperim, ce include abonamentul Premium și cum se face plata. Răspunsuri clare la cele mai frecvente întrebări.',
        },
        HU: {
            title: 'Gyakori kérdések az online meditációról | Vorbim Românește',
            description:
                'Hogyan zajlanak az online órák, milyen szinteken tanítunk, mit tartalmaz a Prémium előfizetés és hogyan lehet fizetni. Világos válaszok a leggyakoribb kérdésekre.',
        },
    },
    {
        path: '/contact',
        hu: 'full',
        label: { RO: 'Contact', HU: 'Kapcsolat' },
        RO: {
            title: 'Contact – Programează o Ședință | Vorbim Românește',
            description:
                'Ia legătura cu Beatrice pentru meditații de limba română online: telefon, e-mail sau WhatsApp. Răspundem în cel mai scurt timp.',
        },
        HU: {
            title: 'Kapcsolat – foglalj időpontot | Vorbim Românește',
            description:
                'Vedd fel a kapcsolatot Beatrice-szel online román nyelvi meditáció ügyében: telefonon, e-mailben vagy WhatsAppon. A lehető leghamarabb válaszolunk.',
        },
    },
    {
        path: '/termeni',
        hu: 'chrome',
        label: { RO: 'Termeni și condiții' },
        RO: {
            title: 'Termeni și Condiții | Vorbim Românește',
            description:
                'Condițiile de utilizare a platformei Vorbim Românește: servicii oferite, plăți, dreptul de retragere, proprietate intelectuală și soluționarea litigiilor (ANPC, SAL, SOL).',
        },
    },
    {
        path: '/confidentialitate',
        hu: 'chrome',
        label: { RO: 'Politica de confidențialitate' },
        RO: {
            title: 'Politica de Confidențialitate (GDPR) | Vorbim Românește',
            description:
                'Ce date personale prelucrăm, în ce scop și pe ce temei legal, cui le divulgăm, cât le păstrăm și cum îți exerciți drepturile conform Regulamentului (UE) 2016/679.',
        },
    },
    {
        path: '/cookies',
        hu: 'chrome',
        label: { RO: 'Politica de cookies' },
        RO: {
            title: 'Politica de Cookies | Vorbim Românește',
            description:
                'Ce cookie-uri folosim pe Vorbim Românește, la ce servesc, cât durează și cum îți poți retrage oricând consimțământul pentru cookie-urile de analiză.',
        },
    },
    ...lessonTopics.map((topic) => ({
        path: topicPath(topic),
        topic,
        hu: 'full',
        label: { RO: topic.RO.label, HU: topic.HU.label },
        RO: { title: topic.RO.title, description: topic.RO.description },
        HU: { title: topic.HU.title, description: topic.HU.description },
    })),
];

// Pagini funcționale, randate doar în browser și niciodată indexate.
const PRIVATE_PAGES = {
    '/login': {
        RO: { title: 'Autentificare cont | Vorbim Românește', description: 'Intră în contul tău Vorbim Românește.' },
        HU: { title: 'Bejelentkezés | Vorbim Românește', description: 'Lépj be a Vorbim Românește fiókodba.' },
    },
    '/register': {
        RO: { title: 'Creează un cont nou | Vorbim Românește', description: 'Creează-ți contul și începe să înveți limba română logic.' },
        HU: { title: 'Új fiók létrehozása | Vorbim Românește', description: 'Hozd létre a fiókodat, és kezdd el logikusan tanulni a románt.' },
    },
    '/admin': {
        RO: { title: 'Administrare | Vorbim Românește', description: 'Panou de administrare.' },
    },
};

const QUIZ_SEO = {
    RO: { title: 'Test de limba română | Vorbim Românește', description: 'Test grilă de limba română cu corectare instantanee și explicații.' },
    HU: { title: 'Román nyelvi teszt | Vorbim Românește', description: 'Feleletválasztós román nyelvi teszt azonnali javítással és magyarázattal.' },
};

export const NOT_FOUND_SEO = {
    RO: {
        title: 'Pagina nu a fost găsită (404) | Vorbim Românește',
        description: 'Pagina căutată nu există sau a fost mutată. Întoarce-te la pagina principală pentru lecții, jocuri și materiale de limba română.',
    },
    HU: {
        title: 'Az oldal nem található (404) | Vorbim Românește',
        description: 'A keresett oldal nem létezik, vagy áthelyeztük. Térj vissza a főoldalra a leckékért, játékokért és román nyelvi anyagokért.',
    },
};

// Căi care nu au versiune /hu (rămân identice indiferent de limbă).
const UNLOCALIZED = ['/admin'];

/** Elimină slash-ul final (în afară de rădăcină). */
export function normalizePath(pathname) {
    if (!pathname) return '/';
    return pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

/** '/hu/copii' → { lang: 'HU', basePath: '/copii' }; '/copii' → { lang: 'RO', basePath: '/copii' }. */
export function splitLang(pathname) {
    const path = normalizePath(pathname);
    if (path === HU_PREFIX) return { lang: 'HU', basePath: '/' };
    if (path.startsWith(`${HU_PREFIX}/`)) return { lang: 'HU', basePath: path.slice(HU_PREFIX.length) };
    return { lang: 'RO', basePath: path };
}

export const langFromPath = (pathname) => splitLang(pathname).lang;

/**
 * Adaugă prefixul limbii la o cale internă scrisă în română ('/copii', '/#pricing-plan',
 * '/?category=x'). Căile externe, cele fără versiune HU și cele deja prefixate rămân neschimbate.
 */
export function localizePath(to, lang) {
    if (lang !== 'HU' || typeof to !== 'string' || !to.startsWith('/')) return to;
    const cut = to.search(/[?#]/);
    const path = cut === -1 ? to : to.slice(0, cut);
    const rest = cut === -1 ? '' : to.slice(cut);
    if (path === HU_PREFIX || path.startsWith(`${HU_PREFIX}/`)) return to;
    if (UNLOCALIZED.some((p) => path === p || path.startsWith(`${p}/`))) return to;
    return path === '/' ? `${HU_PREFIX}${rest}` : `${HU_PREFIX}${path}${rest}`;
}

/** URL-ul aceleiași pagini în cealaltă limbă (pentru comutatorul RO/HU). */
export function switchLangPath(pathname, lang, search = '', hash = '') {
    const { basePath } = splitLang(pathname);
    return localizePath(`${basePath}${search}${hash}`, lang);
}

export const absoluteUrl = (basePath, lang) => `${SITE_URL}${localizePath(basePath, lang)}`;

export const findPage = (basePath) => PAGES.find((page) => page.path === normalizePath(basePath)) || null;

/** Toate paginile publice, cu limbile în care se pre-randează. */
export const publicPages = PAGES;

/**
 * O secțiune fără niciun material e o pagină goală: nu o trimitem la indexare
 * până nu are conținut. Fără listă de materiale (necunoscută), presupunem că are.
 */
function hasContent(page, materials) {
    if (!page.category || !Array.isArray(materials)) return true;
    return materials.some((m) => m.category === page.category);
}

/**
 * Metadatele complete pentru orice cale (cu sau fără prefix /hu).
 * @param {string} pathname
 * @param {{ materials?: Array<{category:string}> }} [ctx]
 */
export function resolveSeo(pathname, ctx = {}) {
    const { lang, basePath } = splitLang(pathname);
    const page = findPage(basePath);

    if (!page) {
        const priv = PRIVATE_PAGES[basePath];
        const isQuiz = basePath.startsWith('/quiz/');
        const source = priv || (isQuiz ? QUIZ_SEO : NOT_FOUND_SEO);
        const text = source[lang] || source.RO;
        return {
            lang,
            htmlLang: lang === 'HU' ? 'hu' : 'ro',
            basePath,
            page: null,
            kind: priv ? 'private' : isQuiz ? 'quiz' : 'notFound',
            title: text.title,
            description: text.description,
            robots: NOINDEX_ROBOTS,
            canonical: null,
            alternates: [],
            ogType: 'website',
            ogLocale: lang === 'HU' ? 'hu_HU' : 'ro_RO',
            ogLocaleAlternate: null,
            indexable: false,
        };
    }

    const huFull = page.hu === 'full';
    const contentLang = lang === 'HU' && huFull ? 'HU' : 'RO';
    const { title, description } = page[contentLang];
    const roUrl = absoluteUrl(page.path, 'RO');
    const huUrl = absoluteUrl(page.path, 'HU');

    // Versiunea /hu a unei pagini fără traducere e un duplicat al celei românești.
    const isDuplicate = lang === 'HU' && !huFull;
    const indexable = !isDuplicate && hasContent(page, ctx.materials);

    return {
        lang,
        htmlLang: contentLang === 'HU' ? 'hu' : 'ro',
        basePath: page.path,
        page,
        kind: 'page',
        title,
        description,
        robots: isDuplicate || indexable ? INDEX_ROBOTS : NOINDEX_ROBOTS,
        canonical: contentLang === 'HU' ? huUrl : roUrl,
        alternates:
            huFull && hasContent(page, ctx.materials)
                ? [
                      { hreflang: 'ro', href: roUrl },
                      { hreflang: 'hu', href: huUrl },
                      { hreflang: 'x-default', href: roUrl },
                  ]
                : [],
        ogType: page.path === '/' ? 'website' : 'article',
        ogLocale: contentLang === 'HU' ? 'hu_HU' : 'ro_RO',
        ogLocaleAlternate: huFull ? (contentLang === 'HU' ? 'ro_RO' : 'hu_HU') : null,
        indexable,
    };
}

/** Lanțul de pagini părinte pentru breadcrumb: '/copii/intrusul' → ['/', '/copii', '/copii/intrusul']. */
export function breadcrumbTrail(basePath) {
    const segments = normalizePath(basePath).split('/').filter(Boolean);
    const trail = [findPage('/')];
    let acc = '';
    for (const segment of segments) {
        acc += `/${segment}`;
        const page = findPage(acc);
        if (page) trail.push(page);
    }
    return trail.filter(Boolean);
}

export const pageLabel = (page, lang) => (page.hu === 'full' && page.label[lang]) || page.label.RO;
