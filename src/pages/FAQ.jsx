import React from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, MessageCircle, BookOpen, Clock, Calendar, Laptop } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQItem = ({ question, answer, isOpen, toggle }) => {
    return (
        <div className="border-b border-gray-100 last:border-0">
            <button
                onClick={toggle}
                className="w-full py-6 flex items-center justify-between gap-4 text-left group"
            >
                <h3 className={`text-lg sm:text-xl font-bold transition-colors ${isOpen ? 'text-brand-600' : 'text-gray-800 group-hover:text-brand-600'}`}>
                    {question}
                </h3>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-brand-100 text-brand-600 rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-brand-50'}`}>
                    <ChevronDown size={20} />
                </div>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
            >
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const FAQ = ({ lang = 'RO' }) => {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = React.useState(0);

    const t = {
        RO: {
            title: "Întrebări Frecvente",
            subtitle: "Tot ce trebuie să știi despre meditațiile și materialele Vorbim-Romaneste.ro",
            back: "Înapoi la acasă",
            contactTitle: "Mai ai nelămuriri?",
            contactDesc: "Dacă nu ai găsit răspunsul căutat, scrie-ne direct pe WhatsApp.",
            contactBtn: "Scrie-ne pe WhatsApp",
            faqs: [
                {
                    q: "Cum se desfășoară ședințele de meditații?",
                    a: "Ședințele se desfășoară exclusiv ONLINE, prin Google Meet sau Zoom. Acest lucru ne permite să folosim materiale digitale interactive, să partajăm ecranul pentru explicații clare și să salvăm notițele pentru tine. Programul este flexibil, stabilit de comun acord."
                },
                {
                    q: "Pentru ce niveluri oferiți pregătire?",
                    a: "Ofer pregătire pentru elevi de gimnaziu (clasele V-VIII), cu focus special pe Evaluarea Națională, dar și cursuri de comunicare pentru adulți vorbitori de limba maghiară care doresc să învețe sau să își perfecționeze limba română."
                },
                {
                    q: "Materialele sunt incluse în preț?",
                    a: "Da, absolut! Toate materialele didactice, fișele de lucru, schemele recapitulative și testele sunt create de mine și sunt incluse. Nu trebuie să cumperi manuale suplimentare."
                },
                {
                    q: "Cum pot plăti?",
                    a: "Plata se face lunar sau per pachet de ședințe, prin transfer bancar. Oferim și abonamente PREMIUM care includ acces la toate materialele digitale de pe site + ședințe lunare de mentorat."
                },
                {
                    q: "Ce se întâmplă dacă nu pot ajunge la o ședință?",
                    a: "Înțelegem că pot apărea neprevăzute. Te rugăm să ne anunți cu cel puțin 24 de ore înainte pentru a reprograma ședința gratuit. Anulările făcute în aceeași zi se consideră ședințe efectuate."
                },
                {
                    q: "Abonamentul Premium oferă acces la meditații?",
                    a: "Abonamentul Premium îți oferă acces nelimitat la biblioteca digitală de materiale și include o ședință lunară de 2 ore de consultanță/mentorat. Pentru meditații săptămânale constante, discutăm separat un program personalizat."
                }
            ]
        },
        HU: {
            title: "Gyakori Kérdések",
            subtitle: "Minden, amit tudnod kell a Vorbim-Romaneste.ro óráiról és anyagairól",
            back: "Vissza a főoldalra",
            contactTitle: "Még vannak kérdéseid?",
            contactDesc: "Ha nem találtad meg a választ, írj nekünk WhatsApp-on.",
            contactBtn: "Írj WhatsApp-on",
            faqs: [
                {
                    q: "Hogyan zajlanak az órák?",
                    a: "Az órák kizárólag ONLINE zajlanak, Google Meet vagy Zoom platformon. Ez lehetővé teszi interaktív digitális anyagok használatát és a képernyőmegosztást a tiszta magyarázatok érdekében."
                },
                {
                    q: "Milyen szinteken vállalsz oktatást?",
                    a: "Vállalok felkészítést általános iskolásoknak (V-VIII. osztály), különös tekintettel a Nemzeti Értékelőre, valamint kommunikációs órákat felnőtt magyar ajkúaknak, akik románul szeretnének tanulni."
                },
                {
                    q: "Az ár tartalmazza a tananyagokat?",
                    a: "Igen, természetesen! Minden tananyagot, munkalapot és tesztet én készítek, és ezek benne vannak az árban. Nem kell külön tankönyveket vásárolnod."
                },
                {
                    q: "Hogyan tudok fizetni?",
                    a: "A fizetés havonta vagy csomagonként történik, banki átutalással. PREMIUM előfizetést is kínálunk, amely hozzáférést biztosít az összes digitális anyaghoz + havi mentoráláshoz."
                },
                {
                    q: "Mi történik, ha nem tudok részt venni egy órán?",
                    a: "Megértjük, ha közbejön valami. Kérjük, legalább 24 órával előre jelezd, hogy ingyenesen átütemezhessük. Az aznapi lemondások megtartott órának minősülnek."
                },
                {
                    q: "A Premium előfizetés tartalmazza az órákat?",
                    a: "A Premium előfizetés korlátlan hozzáférést biztosít a digitális könyvtárhoz, és tartalmaz egy havi 2 órás konzultációt. A rendszeres heti órákhoz külön egyeztetünk időpontot."
                }
            ]
        }
    };

    const currentT = t[lang] || t['RO'];

    return (
        <div className="min-h-screen bg-[#fafbfc] font-sans pb-20">
            {/* Header / Hero */}
            <div className="bg-white pb-16 pt-32 sm:pt-40 rounded-b-[3rem] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full text-gray-500 font-bold text-sm mb-8 hover:bg-gray-50 hover:text-brand-600 transition-all shadow-sm"
                    >
                        <ArrowLeft size={16} />
                        {currentT.back}
                    </button>

                    <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                        {currentT.title}
                    </h1>
                    <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
                        {currentT.subtitle}
                    </p>
                </div>
            </div>

            {/* Questions List */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
                <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-xl shadow-gray-100/50 border border-gray-100">
                    {currentT.faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.q}
                            answer={faq.a}
                            isOpen={openIndex === index}
                            toggle={() => setOpenIndex(index === openIndex ? -1 : index)}
                        />
                    ))}
                </div>
            </div>

            {/* Contact CTA */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-12 mb-12">
                <div className="bg-gradient-to-r from-brand-600 to-blue-600 rounded-[2.5rem] p-8 sm:p-12 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-2xl sm:text-3xl font-black mb-4">{currentT.contactTitle}</h3>
                        <p className="text-brand-100 font-medium text-lg mb-8 max-w-lg mx-auto">{currentT.contactDesc}</p>
                        <a
                            href="https://wa.me/40757947933"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-600 rounded-2xl font-black text-lg hover:bg-brand-50 transition-all shadow-lg hover:scale-105 active:scale-95"
                        >
                            <MessageCircle size={24} />
                            {currentT.contactBtn}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
