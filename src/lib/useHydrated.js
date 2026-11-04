import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * false pe server și în timpul hidratării, true după aceea.
 * Pentru valori care există doar în browser (localStorage, API-uri de browser),
 * ca prima randare din browser să fie identică cu HTML-ul pre-randat.
 */
export function useHydrated() {
    return useSyncExternalStore(subscribe, () => true, () => false);
}
