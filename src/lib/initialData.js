// Datele încărcate la build (materialele din Supabase) ajung în HTML-ul static ca
// window.__INITIAL_DATA__, ca prima randare din browser să fie identică cu cea de
// pe server (hidratare fără diferențe). După hidratare aplicația le reîncarcă live.

import { createContext, useContext } from 'react';

export const InitialDataContext = createContext({});

export const useInitialData = () => useContext(InitialDataContext);

export function readInitialData() {
    if (typeof window === 'undefined') return {};
    return window.__INITIAL_DATA__ || {};
}
