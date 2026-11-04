import { useHydrated } from '../lib/useHydrated';

/**
 * Randează `children` doar în browser, după hidratare. Pe server (și la prima
 * randare din browser) arată `fallback`. Folosit pentru jocuri, care au stare
 * aleatorie și API-uri de browser (microfon, audio).
 */
export default function ClientOnly({ children, fallback = null }) {
    return useHydrated() ? children : fallback;
}
