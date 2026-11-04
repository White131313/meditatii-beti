# vorbim-romaneste.ro

Site-ul Beatricei Bernad (profesoară de română): meditații și platformă de limba română
pentru vorbitori de maghiară din Harghita, Covasna și Mureș.

- Are: interfață RO/HU, secțiunile Materie V-VIII, Evaluare Națională, Comunicare Adulți,
  Exersează (quiz-uri), jocuri pentru copii (`/copii/*`), FAQ, contact, pagini legale
  (termeni, confidențialitate, cookies), abonament Premium 49,99 lei/lună (Lemon Squeezy).
- Problema: trafic aproape zero de un an. Conținutul apare doar cu JavaScript: fără JS
  se văd doar titlul și meta-descrierea, deci Google și ceilalți crawleri indexează foarte puțin.
- Comunicarea cu proprietarul (Cristian) e în română.

## Ordinea de lucru (SEO)

1. Citește codul, spune ce stack e și propune cum facem conținutul vizibil fără JS
   (prerender/SSR/pagini statice), pentru fiecare secțiune, în RO și HU.
2. Repară etichetele brute raportate în pagină („meta-author”, „meta-og:title”).
3. `sitemap.xml` cu toate paginile RO și HU + hreflang corect.
4. Apoi: câte o pagină indexabilă pentru fiecare fișă/test.

Regulă: nu modifica nimic până nu e prezentat și aprobat planul pentru pasul respectiv.

Stare (2026-11-04): planul a fost aprobat (variantele recomandate) și pașii 1–4 sunt implementați pe
branch-ul `seo-prerender` (fără push). Rămân: verificarea pe Vercel după deploy, Deploy Hook pentru rebuild
automat la fișă nouă, trimiterea sitemap-ului în Search Console și revizuirea textelor noi de către Beatrice.

Decizii luate:
- Pagini statice generate la build (SSG), nu Next.js/Astro și nici SSR la cerere.
- Maghiara sub `/hu/...`, cu aceleași slug-uri ca româna. Paginile legale există doar în română
  (versiunea `/hu` are canonical spre cea românească și nu intră în sitemap).
- Secțiunile au URL-uri românești; vechile `/course/<categorie>` fac redirect 301 (`vercel.json`).
- O pagină pe SUBIECT de lecție (`src/data/lessonTopics.js`), nu pe rând din `materials`.
- O secțiune fără materiale primește `noindex` și iese din sitemap până are conținut.

## Stack și unde stau lucrurile

- Vite 7 + React 19, SPA (`BrowserRouter`, react-router-dom 7), Tailwind 4. Fără TypeScript.
- Hosting: Vercel (`vercel.json`: `cleanUrls` servește `dist/<cale>.html`; redirect-uri 301 pentru URL-urile vechi;
  rewrite spre `/spa` (fișierul `spa.html`; cu `cleanUrls` destinația trebuie scrisă fără `.html`) doar pentru login/register/admin/quiz; orice altă adresă → `404.html` cu status 404).
  Repo GitHub `White131313/meditatii-beti`. `dist/` e în `.gitignore`, Vercel construiește din repo.
- Backend: Supabase (proiect `npngltgflarmtbhjafpp`), cheia anon e în `src/lib/supabaseClient.js`.
  Tabele: `materials` (fișe PDF; `category` ∈ adults_communication, gymnasium_curriculum,
  national_exam_prep, practice_exercises), `quizzes` (`material_id`, `questions` JSONB, `source_text`),
  `profiles` (`subscription_status`). Fișele și quiz-urile se încarcă din Admin (`/admin`).
- Plăți: Lemon Squeezy (`src/lib/payments.js`, `api/lemon-webhook.js`).
- Limba: textele sunt dicționare `t = { RO: {...}, HU: {...} }` în fiecare pagină; paginile legale există doar în RO.
- SEO și randare (după branch-ul `seo-prerender`):
  - `src/lib/seoRoutes.js`: registrul unic de pagini (căi, titluri/descrieri RO+HU, etichete breadcrumb),
    plus `splitLang`/`localizePath`/`switchLangPath` și `resolveSeo` (canonical, hreflang, robots).
  - Limba vine din URL (`useLang()` în `src/lib/i18n.js`). Link-urile interne se scriu în română și trec prin
    `src/components/LocalizedLink.jsx` / `useLocalizedNavigate`, care adaugă `/hu` când e cazul.
  - `src/lib/head.js` + `src/lib/structuredData.js`: generează `<head>` (meta, OG, hreflang, JSON-LD).
    La build devine text; în browser `SEOHead` înlocuiește etichetele `[data-seo]` (fără dubluri).
  - Build: `vite build` → `vite build --ssr src/entry-server.jsx` → `scripts/prerender.mjs`, care citește
    materialele din Supabase, randează fiecare pagină × limbă în `dist/<cale>.html`, plus `spa.html`
    (login/admin/quiz, doar în browser), `404.html` și `sitemap.xml` cu `xhtml:link` hreflang.
  - În browser, `src/main.jsx` hidratează HTML-ul existent; datele de la build vin prin `window.__INITIAL_DATA__`.
    Orice citire din `localStorage`/API de browser la prima randare strică hidratarea: folosește
    `useHydrated()` (`src/lib/useHydrated.js`) sau `<ClientOnly>`.
  - Jocurile rulează doar în browser (`GamePage` + `ClientOnly`); sub ele stă textul static din `src/data/gameGuides.js`.
  - Pagină nouă: adaug-o în `PAGES` din `seoRoutes.js` și ca rută în `App.jsx` (sub `/` și `/hu`).
- Jocurile pentru copii au conținut static în `src/data/*.js` (câte ~100 de itemi, cu traduceri HU).

## Comenzi

- `npm run dev`: server local Vite.
- `npm run build`: build client + build SSR + pre-randare (are nevoie de acces la Supabase).
- `npm run lint`: ESLint.
- Verificare „ce vede un crawler fără JS”: `curl -s https://vorbim-romaneste.ro/<rută>` sau fișierele din `dist/`.
- Textele noi (subiecte de lecție, intro-uri de secțiune, ghiduri de joc, titluri HU) sunt scrise de Claude
  și trebuie revizuite de Beatrice.
