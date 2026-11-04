/* eslint-disable react-refresh/only-export-components -- intrare de server, nu modul de componente */
// Intrarea pentru pre-randare (build-ul SSR al Vite, folosit de scripts/prerender.mjs).
// Randează aplicația pentru un URL dat și expune registrul de rute și generatorul de <head>.

import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';
import { InitialDataContext } from './lib/initialData';
import { supabase } from './lib/supabaseClient';

export { resolveSeo, publicPages, localizePath, SITE_URL } from './lib/seoRoutes';
export { renderHeadHtml } from './lib/head';
export { lessonTopics } from './data/lessonTopics';

/** HTML-ul din #root pentru `url`, cu datele date (aceleași care ajung în window.__INITIAL_DATA__). */
export function render(url, data) {
    return renderToString(
        <StrictMode>
            <InitialDataContext.Provider value={data}>
                <StaticRouter location={url}>
                    <App />
                </StaticRouter>
            </InitialDataContext.Provider>
        </StrictMode>
    );
}

// Doar coloanele publice: linkul fișei complete nu are ce căuta în HTML-ul static.
const PUBLIC_MATERIAL_COLUMNS = 'id,title,description,category,demo_file_url,thumbnail_url,created_at';

/** Datele de care au nevoie paginile pre-randate. Aruncă eroare dacă Supabase nu răspunde. */
export async function fetchPrerenderData() {
    const { data, error } = await supabase
        .from('materials')
        .select(PUBLIC_MATERIAL_COLUMNS)
        .order('created_at', { ascending: false });

    if (error) throw new Error(`prerender: nu am putut citi materialele din Supabase: ${error.message}`);
    return { materials: data || [] };
}
