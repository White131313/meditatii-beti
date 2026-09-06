import React, { useEffect, useState } from 'react';
import { LegalLayout, Section, Bullets, Callout, DataTable, Ext, Internal } from '../components/LegalLayout';
import { legalEntity } from '../lib/legalEntity';
import { getConsent, setConsent, CONSENT_EVENT } from '../lib/analytics';

const statusLabels = {
    accepted: 'Ai acceptat cookie-urile de analiză.',
    rejected: 'Ai refuzat cookie-urile de analiză. Folosim doar cookie-uri strict necesare.',
    null: 'Nu ai făcut încă o alegere. Până atunci, cookie-urile de analiză sunt dezactivate.',
};

/** Lets the visitor change their mind without hunting for the banner. */
const ConsentControls = () => {
    const [status, setStatus] = useState(() => getConsent());

    useEffect(() => {
        const sync = (e) => setStatus(e.detail ?? getConsent());
        window.addEventListener(CONSENT_EVENT, sync);
        return () => window.removeEventListener(CONSENT_EVENT, sync);
    }, []);

    return (
        <Callout tone="brand">
            <p className="mb-4">
                <strong>Preferințele tale actuale:</strong> {statusLabels[status ?? 'null']}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={() => setConsent('accepted')}
                    className="px-5 py-3 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-brand-600 transition-colors"
                >
                    Accept cookie-urile de analiză
                </button>
                <button
                    onClick={() => setConsent('rejected')}
                    className="px-5 py-3 bg-white border border-gray-200 text-gray-700 rounded-2xl font-black text-sm hover:bg-gray-50 transition-colors"
                >
                    Refuz / retrag consimțământul
                </button>
            </div>
        </Callout>
    );
};

const Cookies = () => (
    <LegalLayout
        title="Politica de Cookies"
        intro="Această pagină explică ce sunt cookie-urile, pe care dintre ele le folosim pe Vorbim-Romaneste.ro, la ce servesc, cât durează și cum îți poți schimba oricând opțiunea."
        lastUpdated={legalEntity.lastUpdated}
    >
        <Section number="1" title="Ce sunt cookie-urile" id="ce-sunt">
            <p>
                Cookie-urile sunt fișiere text de mici dimensiuni pe care un site le salvează în browserul tău. Ele
                permit, de exemplu, să rămâi autentificat de la o pagină la alta sau ne ajută să înțelegem cum este
                folosit site-ul. Alături de ele folosim și tehnologii similare de stocare locală
                (<em>localStorage</em>), tratate în această politică la fel ca cookie-urile.
            </p>
        </Section>

        <Section number="2" title="Cookie-uri strict necesare" id="necesare">
            <p>
                Fac site-ul să funcționeze și nu pot fi dezactivate. Pentru acestea nu este necesar consimțământul tău,
                conform art. 4 alin. (5) din Legea nr. 506/2004.
            </p>
            <DataTable
                headers={['Nume', 'Furnizor', 'Scop', 'Durata']}
                rows={[
                    ['sb-*-auth-token', 'Supabase', 'Menține sesiunea de autentificare după logarea cu Google', 'Până la delogare / 1 an'],
                    ['vr_cookie_consent', 'Vorbim Românește', 'Reține opțiunea ta privind cookie-urile, ca să nu te întrebăm din nou', '6 luni'],
                ]}
            />
        </Section>

        <Section number="3" title="Cookie-uri de analiză (opționale)" id="analiza">
            <p>
                Ne arată, în formă agregată, câți vizitatori avem și ce pagini sunt cele mai utile, ca să îmbunătățim
                materialele. <strong>Se activează doar dacă apeși „Accept”</strong> în bannerul de cookie-uri; până
                atunci scriptul Google Analytics nici măcar nu este încărcat în pagină.
            </p>
            <DataTable
                headers={['Nume', 'Furnizor', 'Scop', 'Durata']}
                rows={[
                    ['_ga', 'Google Analytics 4', 'Distinge vizitatorii unici printr-un identificator aleatoriu', '2 ani'],
                    ['_ga_C2HS2R9WQM', 'Google Analytics 4', 'Menține starea sesiunii de măsurare', '2 ani'],
                ]}
            />
            <p>
                Adresa IP este anonimizată, iar funcțiile de publicitate și de personalizare sunt dezactivate. Detalii
                despre modul în care Google prelucrează aceste date:{' '}
                <Ext href="https://policies.google.com/technologies/partner-sites">
                    policies.google.com/technologies/partner-sites
                </Ext>
                .
            </p>
        </Section>

        <Section number="4" title="Ce nu folosim" id="nu-folosim">
            <Bullets
                items={[
                    'Nu folosim cookie-uri de publicitate sau de retargetare.',
                    'Nu vindem și nu partajăm datele de navigare către rețele publicitare.',
                    'Nu urmărim vizitatorii pe alte site-uri.',
                ]}
            />
            <p>
                Anumite pagini pot încărca resurse de la terți (fonturi Google, biblioteca PDF.js de la Cloudflare,
                ferestrele de plată Lemon Squeezy). Acești furnizori pot primi adresa ta IP, ca element tehnic necesar
                livrării resursei.
            </p>
        </Section>

        <Section number="5" title="Schimbă-ți opțiunea oricând" id="control">
            <ConsentControls />
            <p>
                Îți poți gestiona cookie-urile și direct din browser (ștergere, blocare, navigare privată). Instrucțiuni
                oficiale:{' '}
                <Ext href="https://support.google.com/chrome/answer/95647">Chrome</Ext>,{' '}
                <Ext href="https://support.mozilla.org/kb/cookies-informatii-pe-care-site-urile-le-stocheaza-pe-calculatorul-dumneavoastra">
                    Firefox
                </Ext>
                , <Ext href="https://support.apple.com/ro-ro/guide/safari/sfri11471/mac">Safari</Ext>,{' '}
                <Ext href="https://support.microsoft.com/microsoft-edge">Edge</Ext>. Blocarea cookie-urilor strict
                necesare poate face imposibilă autentificarea în cont.
            </p>
        </Section>

        <Section number="6" title="Mai multe informații" id="info">
            <p>
                Modul în care prelucrăm datele personale este descris în{' '}
                <Internal to="/confidentialitate">Politica de Confidențialitate</Internal>, iar condițiile de utilizare
                a platformei în <Internal to="/termeni">Termeni și Condiții</Internal>. Pentru întrebări, scrie-ne la{' '}
                <Ext href={`mailto:${legalEntity.email}`}>{legalEntity.email}</Ext>.
            </p>
        </Section>
    </LegalLayout>
);

export default Cookies;
