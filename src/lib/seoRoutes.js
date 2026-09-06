// Single source of truth for SEO metadata.
// Consumed at runtime by SEOWrapper and at build time by scripts/generate-seo.mjs
// (sitemap.xml + prerendered static HTML per route). Keep it dependency-free ESM
// so plain Node can import it during the build.

export const SITE_URL = 'https://vorbim-romaneste.ro';
export const SITE_NAME = 'Vorbim Românește';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
export const AUTHOR = 'Beatrice Bernad';
export const CONTACT_EMAIL = 'bernad.beatrice23@gmail.com';
export const CONTACT_PHONE = '+40757947933';

// Public, indexable routes. `priority` / `changefreq` feed the sitemap.
export const staticRoutes = [
  {
    path: '/',
    title: 'Meditații Limba Română pentru Maghiari | Vorbim Românește',
    description:
      'Meditații online de limba română pentru vorbitorii de maghiară din Harghita, Covasna și Mureș. Pregătire Evaluare Națională, fișe PDF, exerciții și jocuri interactive explicate logic.',
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/copii',
    title: 'Jocuri Educative în Limba Română pentru Copii | Vorbim Românește',
    description:
      'Jocuri interactive gratuite pentru învățarea limbii române: construiește propoziții, găsește intrusul, adevărat sau fals, articole și pronunție cu microfon. Create pentru copiii vorbitori de maghiară.',
    priority: '0.9',
    changefreq: 'monthly',
  },
  {
    path: '/copii/propozitii',
    title: 'Joc: Construiește Propoziția în Limba Română | Vorbim Românește',
    description:
      'Joc educativ în care copiii așază cuvintele în ordinea corectă și învață topica propoziției românești, pas cu pas, fără reguli complicate.',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/copii/intrusul',
    title: 'Joc: Găsește Intrusul – Vocabular Român | Vorbim Românește',
    description:
      'Joc de vocabular în limba română: copilul descoperă cuvântul care nu se potrivește în grup și își fixează sensul cuvintelor noi.',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/copii/adevarat-fals',
    title: 'Joc: Adevărat sau Fals în Limba Română | Vorbim Românește',
    description:
      'Întrebări scurte de tip adevărat sau fals pentru exersarea înțelegerii limbii române și a culturii generale, potrivite pentru clasele primare și gimnaziu.',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/copii/articole',
    title: 'Joc: Articolul Hotărât și Nehotărât | Vorbim Românește',
    description:
      'Exercițiu interactiv pentru articolul hotărât și nehotărât din limba română – cea mai frecventă dificultate a vorbitorilor de limba maghiară.',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/copii/vorbeste',
    title: 'Joc de Pronunție cu Microfon în Limba Română | Vorbim Românește',
    description:
      'Joc gratuit de pronunție: copilul rostește cuvântul în limba română, iar aplicația îi confirmă instant dacă a pronunțat corect. Funcționează direct în browser.',
    priority: '0.7',
    changefreq: 'monthly',
  },
  {
    path: '/intrebari-frecvente',
    title: 'Întrebări Frecvente despre Meditațiile Online | Vorbim Românește',
    description:
      'Cum se desfășoară ședințele online, ce niveluri acoperim, ce include abonamentul Premium și cum se face plata. Răspunsuri clare la cele mai frecvente întrebări.',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/contact',
    title: 'Contact – Programează o Ședință | Vorbim Românește',
    description:
      'Ia legătura cu Beatrice pentru meditații de limba română online: telefon, email sau formular de contact. Răspundem în cel mai scurt timp.',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/termeni',
    title: 'Termeni și Condiții | Vorbim Românește',
    description:
      'Condițiile de utilizare a platformei Vorbim Românește: servicii oferite, plăți, dreptul de retragere, proprietate intelectuală și soluționarea litigiilor (ANPC, SAL, SOL).',
    priority: '0.3',
    changefreq: 'yearly',
  },
  {
    path: '/confidentialitate',
    title: 'Politica de Confidențialitate (GDPR) | Vorbim Românește',
    description:
      'Ce date personale prelucrăm, în ce scop și pe ce temei legal, cui le divulgăm, cât le păstrăm și cum îți exerciți drepturile conform Regulamentului (UE) 2016/679.',
    priority: '0.3',
    changefreq: 'yearly',
  },
  {
    path: '/cookies',
    title: 'Politica de Cookies | Vorbim Românește',
    description:
      'Ce cookie-uri folosim pe Vorbim Românește, la ce servesc, cât durează și cum îți poți retrage oricând consimțământul pentru cookie-urile de analiză.',
    priority: '0.3',
    changefreq: 'yearly',
  },
];

// Course category pages (rendered by /course/:categoryId).
export const courseRoutes = [
  {
    path: '/course/adults_communication',
    title: 'Curs de Comunicare în Limba Română pentru Adulți | Vorbim Românește',
    description:
      'Materiale și lecții de comunicare în limba română pentru adulți vorbitori de maghiară: dialoguri uzuale, vocabular practic și gramatică explicată logic.',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/course/gymnasium_curriculum',
    title: 'Limba Română Clasele V-VIII – Materie și Fișe de Lucru | Vorbim Românește',
    description:
      'Fișe de lucru, scheme recapitulative și exerciții pentru materia de limba română din gimnaziu, clasele V-VIII, structurate pe capitole.',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/course/national_exam_prep',
    title: 'Pregătire Evaluare Națională Limba Română | Vorbim Românește',
    description:
      'Pregătire completă pentru Evaluarea Națională la limba română: subiecte rezolvate, modele de eseu, teste grilă și strategii de rezolvare pentru clasa a VIII-a.',
    priority: '0.9',
    changefreq: 'weekly',
  },
];

// Routes that must never enter the index (private, transactional or duplicate).
export const noindexRoutes = {
  '/login': {
    title: 'Autentificare cont | Vorbim Românește',
    description: 'Intră în contul tău Vorbim Românește pentru acces la bibliotecă, jocuri și resurse PDF.',
  },
  '/register': {
    title: 'Creează un cont nou | Vorbim Românește',
    description: 'Creează-ți contul gratuit și începe să înveți limba română logic.',
  },
  '/admin': {
    title: 'Administrare | Vorbim Românește',
    description: 'Panou de administrare.',
  },
};

export const notFoundSeo = {
  title: 'Pagina nu a fost găsită (404) | Vorbim Românește',
  description: 'Pagina căutată nu există sau a fost mutată. Întoarce-te la pagina principală pentru lecții, jocuri și materiale de limba română.',
};

// Prefix fallbacks for dynamic routes without a dedicated entry above.
const prefixFallbacks = [
  {
    prefix: '/course/',
    title: 'Cursuri și Materiale de Limba Română | Vorbim Românește',
    description:
      'Bibliotecă de lecții și PDF-uri de limba română pentru preșcolari, elevi de gimnaziu, candidați la Evaluarea Națională și adulți.',
  },
  {
    prefix: '/quiz/',
    title: 'Teste și Exerciții Grilă de Limba Română | Vorbim Românește',
    description:
      'Verifică-ți cunoștințele de limba română cu teste grilă cu corectare instantanee și explicații pentru fiecare răspuns.',
  },
  {
    prefix: '/copii/',
    title: 'Jocuri Interactive de Limba Română | Vorbim Românește',
    description:
      'Jocuri captivante pentru învățarea limbii române, concepute pentru preșcolari și elevii din clasele primare.',
  },
];

/** All routes that get a prerendered HTML file and a sitemap entry. */
export const indexableRoutes = [...staticRoutes, ...courseRoutes];

/**
 * Resolve SEO metadata for any pathname.
 * @returns {{title:string, description:string, index:boolean}}
 */
export function resolveSeo(pathname) {
  const path = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  const exact = indexableRoutes.find((r) => r.path === path);
  if (exact) return { title: exact.title, description: exact.description, index: true };

  const priv = noindexRoutes[path];
  if (priv) return { title: priv.title, description: priv.description, index: false };

  const prefixed = prefixFallbacks.find((r) => path.startsWith(r.prefix));
  if (prefixed) return { title: prefixed.title, description: prefixed.description, index: true };

  return { ...notFoundSeo, index: false };
}

export function canonicalFor(pathname) {
  const path = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return `${SITE_URL}${path === '/' ? '/' : path}`;
}
