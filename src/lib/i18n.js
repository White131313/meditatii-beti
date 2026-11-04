// Limba curentă vine din URL (/hu/... = maghiară), nu dintr-o stare în memorie,
// ca fiecare versiune lingvistică să aibă propriile adrese indexabile.

import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { langFromPath, localizePath } from './seoRoutes.js';

/** @returns {'RO'|'HU'} */
export function useLang() {
    return langFromPath(useLocation().pathname);
}

/** Ca useNavigate, dar păstrează limba curentă pentru căile interne ('/copii' → '/hu/copii'). */
export function useLocalizedNavigate() {
    const navigate = useNavigate();
    const lang = useLang();
    return useCallback(
        (to, options) => (typeof to === 'number' ? navigate(to) : navigate(localizePath(to, lang), options)),
        [navigate, lang]
    );
}
