import React from 'react';
import { ArrowRight } from 'lucide-react';
import ClientOnly from './ClientOnly';
import { Link } from './LocalizedLink';
import { gameGuides } from '../data/gameGuides';

const allGames = { RO: 'Toate jocurile pentru copii', HU: 'Az összes gyerekjáték' };

/** Ce vede crawlerul (și vizitatorul, o clipă) până pornește jocul în browser. */
const GameLoading = ({ title, subtitle }) => (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-blue-50 pt-28 sm:pt-32 pb-12 px-4 text-center font-kids">
        <h1 className="text-3xl sm:text-5xl font-black text-gray-800 mb-3 tracking-tight">{title}</h1>
        <p className="text-lg sm:text-xl text-gray-500 font-bold mb-10">{subtitle}</p>
        <div className="w-12 h-12 mx-auto border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
    </div>
);

/**
 * Pagina unui joc: jocul rulează doar în browser, iar dedesubt stă o secțiune
 * statică (despre joc, cum se joacă, exemple) care apare și în HTML-ul pre-randat.
 */
export default function GamePage({ gameId, lang = 'RO', children }) {
    const guide = gameGuides[gameId];
    const t = guide[lang] || guide.RO;
    const examples = guide.examples(lang);

    return (
        <>
            <ClientOnly fallback={<GameLoading title={t.title} subtitle={t.subtitle} />}>{children}</ClientOnly>

            <section className="bg-white border-t border-gray-100 py-14 sm:py-20 px-4 font-kids">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-5">{t.aboutTitle}</h2>
                    <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed mb-10">
                        {t.about.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>

                    <h3 className="text-xl font-black text-gray-900 mb-4">{t.howTitle}</h3>
                    <ol className="list-decimal pl-6 space-y-2 text-gray-600 leading-relaxed mb-10">
                        {t.how.map((step) => (
                            <li key={step}>{step}</li>
                        ))}
                    </ol>

                    <h3 className="text-xl font-black text-gray-900 mb-4">{t.examplesTitle}</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                        {examples.map((example) => (
                            <li key={example.main} className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">
                                <span className="block font-black text-gray-800">{example.main}</span>
                                {example.detail ? (
                                    <span className="block text-sm text-gray-500 mt-1">{example.detail}</span>
                                ) : null}
                            </li>
                        ))}
                    </ul>

                    <Link
                        to="/copii"
                        className="inline-flex items-center gap-2 px-5 py-3 bg-orange-50 text-orange-600 border-2 border-orange-200 rounded-2xl font-black text-sm hover:bg-orange-100 transition-colors"
                    >
                        {allGames[lang] || allGames.RO}
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </>
    );
}
