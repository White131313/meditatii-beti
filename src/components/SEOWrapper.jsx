import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const routeSeoMap = {
  '/': {
    title: 'Vorbim Românește - Meditații și Resurse Logice pt. Maghiari',
    description: 'Învață limba română logic. Pregătire Evaluare Națională, materiale PDF, fișe de lucru și jocuri interactive special create pentru vorbitorii de limba maghiară din Harghita, Covasna, Mureș.',
  },
  '/copii': {
    title: 'Hub Copii - Resurse și Jocuri | Vorbim Românește',
    description: 'Descoperă jocuri educative și interactive în limba română, create special pentru copiii vorbitori de limba maghiară. Învățare distractivă și eficientă.',
  },
  '/intrebari-frecvente': {
    title: 'Întrebări Frecvente (FAQ) | Vorbim Românește',
    description: 'Găsește răspunsuri la cele mai frecvente întrebări despre cursurile noastre, platformă și modul de învățare.',
  },
  '/contact': {
    title: 'Contact - Ia legătura cu noi | Vorbim Românește',
    description: 'Contactează mentorul tău de limba română, Beatrice. Pentru detalii despre meditații, cursuri sau orice alte informații.',
  },
  '/termeni': {
    title: 'Termeni și Condiții | Vorbim Românește',
    description: 'Termenii și condițiile de utilizare a platformei Vorbim Românește. Citește despre regulile de utilizare și politica noastră.',
  },
  '/confidentialitate': {
    title: 'Politica de Confidențialitate | Vorbim Românește',
    description: 'Cum prelucrăm și protejăm datele tale personale la Vorbim Românește. Politica completă de confidențialitate.',
  },
  '/login': {
    title: 'Autentificare cont | Vorbim Românește',
    description: 'Intră în contul tău Vorbim Românește pentru a avea acces la bibliotecă, jocuri, exerciții și resurse PDF explicite.',
  },
  '/register': {
    title: 'Creează un cont nou | Vorbim Românește',
    description: 'Alătură-te comunității noastre și începe să înveți limba română logic. Cont nou pentru acces la resurse.',
  }
};

const SEOWrapper = () => {
  const location = useLocation();
  const path = location.pathname;

  // Find exact exact matches, or fallback to sensible defaults for dynamic routes
  let seoData = routeSeoMap[path];

  if (!seoData) {
    if (path.startsWith('/course/')) {
      seoData = {
        title: 'Cursuri și Materiale | Vorbim Românește',
        description: 'Explorează biblioteca noastră de lecții video și PDF-uri pentru diverse grupe de vârstă: preșcolari, școlari, Evaluare Națională și adulți.',
      };
    } else if (path.startsWith('/quiz/')) {
      seoData = {
        title: 'Teste și Exerciții | Vorbim Românește',
        description: 'Verifică-ți cunoștințele prin testele și exercițiile noastre grilă create logic.'
      };
    } else if (path.startsWith('/copii/')) {
      seoData = {
        title: 'Jocuri Interactive | Vorbim Românește',
        description: 'Jocuri captivante pentru învățarea limbii române, concepute special pentru utilizatorii mai mici preșcolari și clasele primare.'
      };
    } else {
      // Default fallback
      seoData = routeSeoMap['/'];
    }
  }

  // Generate correct canonical
  const canonicalUrl = `https://vorbim-romaneste.ro${path === '/' ? '' : path}`;

  return (
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:url" content={canonicalUrl} />
    </Helmet>
  );
};

export default SEOWrapper;
