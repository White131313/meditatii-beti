import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, Gamepad2, Mail } from 'lucide-react';

const copy = {
    RO: {
        code: 'Eroare 404',
        title: 'Pagina nu a fost găsită',
        text: 'Link-ul pe care l-ai accesat nu mai există sau a fost mutat. Nicio grijă — de aici poți ajunge oriunde pe site.',
        home: 'Pagina principală',
        courses: 'Materiale și cursuri',
        games: 'Jocuri pentru copii',
        contact: 'Contact',
    },
    HU: {
        code: '404-es hiba',
        title: 'Az oldal nem található',
        text: 'A megnyitott hivatkozás már nem létezik, vagy áthelyeztük. Semmi gond — innen bárhová eljutsz az oldalon.',
        home: 'Főoldal',
        courses: 'Anyagok és tanfolyamok',
        games: 'Játékok gyerekeknek',
        contact: 'Kapcsolat',
    },
};

const NotFound = ({ lang = 'RO' }) => {
    const t = copy[lang] || copy.RO;

    const links = [
        { to: '/', icon: Home, label: t.home },
        { to: '/course/gymnasium_curriculum', icon: BookOpen, label: t.courses },
        { to: '/copii', icon: Gamepad2, label: t.games },
        { to: '/contact', icon: Mail, label: t.contact },
    ];

    return (
        <main className="min-h-[70vh] flex items-center justify-center px-4 pt-32 pb-20">
            <div className="max-w-2xl w-full text-center">
                <p className="text-sm font-black uppercase tracking-[0.3em] text-brand-600 mb-4">{t.code}</p>
                <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight mb-6">{t.title}</h1>
                <p className="text-lg text-gray-500 font-medium max-w-lg mx-auto mb-12">{t.text}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {links.map((link) => {
                        const Icon = link.icon;
                        return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-200 transition-all text-left group"
                        >
                            <span className="w-11 h-11 shrink-0 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                                <Icon size={20} />
                            </span>
                            <span className="font-black text-gray-900">{link.label}</span>
                        </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
};

export default NotFound;
