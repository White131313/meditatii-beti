import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { resolveSeo } from '../lib/seoRoutes';
import { applyHead } from '../lib/head';

/**
 * Ține <head> sincronizat la navigarea din aplicație. La încărcarea directă,
 * etichetele vin deja corecte din HTML-ul pre-randat; aici doar le înlocuim.
 */
export default function SEOHead({ materials }) {
    const { pathname } = useLocation();

    useEffect(() => {
        applyHead(resolveSeo(pathname, { materials }));
    }, [pathname, materials]);

    return null;
}
