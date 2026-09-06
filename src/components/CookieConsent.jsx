import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';
import { getConsent, setConsent, initAnalytics, OPEN_COOKIE_SETTINGS } from '../lib/analytics';

const copy = {
    RO: {
        title: 'Folosim cookie-uri',
        body: 'Cookie-urile strict necesare fac site-ul să funcționeze (autentificare, preferințe). În plus, am dori să folosim cookie-uri de analiză (Google Analytics) pentru a înțelege cum este folosit site-ul. Acestea se activează doar cu acordul tău.',
        accept: 'Accept toate',
        reject: 'Doar necesare',
        more: 'Detalii în Politica de Cookies',
        close: 'Închide',
    },
    HU: {
        title: 'Sütiket használunk',
        body: 'A feltétlenül szükséges sütik a webhely működéséhez kellenek (bejelentkezés, beállítások). Ezen felül analitikai sütiket (Google Analytics) használnánk, hogy megértsük a webhely használatát. Ezek csak a hozzájárulásoddal aktiválódnak.',
        accept: 'Mindet elfogadom',
        reject: 'Csak a szükségesek',
        more: 'Részletek a Süti Szabályzatban',
        close: 'Bezárás',
    },
};

const CookieConsent = ({ lang = 'RO' }) => {
    // Shown on first visit only; a returning visitor's choice is already stored.
    const [visible, setVisible] = useState(() => getConsent() === null);
    const t = copy[lang] || copy.RO;

    useEffect(() => {
        initAnalytics();

        const reopen = () => setVisible(true);
        window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
        return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
    }, []);

    const decide = (status) => {
        setConsent(status);
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            role="dialog"
            aria-modal="false"
            aria-label={t.title}
            className="fixed bottom-0 inset-x-0 z-[100] p-3 sm:p-5 pointer-events-none"
        >
            <div className="pointer-events-auto max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl shadow-gray-900/20 border border-gray-100 p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                    <div className="w-12 h-12 shrink-0 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center">
                        <Cookie size={24} />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-black text-gray-900 mb-2">{t.title}</h2>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            {t.body}{' '}
                            <Link to="/cookies" className="text-brand-600 font-bold underline underline-offset-2">
                                {t.more}
                            </Link>
                            .
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => decide('accepted')}
                                className="px-6 py-3 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-brand-600 transition-colors"
                            >
                                {t.accept}
                            </button>
                            <button
                                onClick={() => decide('rejected')}
                                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-black text-sm hover:bg-gray-200 transition-colors"
                            >
                                {t.reject}
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => decide('rejected')}
                        aria-label={t.close}
                        className="hidden sm:flex w-9 h-9 shrink-0 items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
