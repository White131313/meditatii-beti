import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MessageCircle, Clock, MapPin, ArrowRight } from 'lucide-react';
import { legalEntity } from '../lib/legalEntity';

const Contact = ({ lang = 'RO' }) => {
    const t = {
        RO: {
            hero: 'Contact',
            subtitle:
                'Scrie-mi sau sună-mă direct — îți răspund personal, de obicei în aceeași zi. Discutăm despre nivelul tău, obiective și cum putem lucra împreună.',
            emailTitle: 'Email',
            emailNote: 'Cel mai bun canal pentru întrebări detaliate.',
            phoneTitle: 'Telefon',
            phoneNote: 'Luni – Vineri, între 09:00 și 19:00.',
            whatsappTitle: 'WhatsApp',
            whatsappNote: 'Cel mai rapid răspuns, pentru întrebări scurte.',
            whatsappCta: 'Scrie-mi pe WhatsApp',
            scheduleTitle: 'Program de răspuns',
            scheduleText:
                'Răspund la mesaje de luni până vineri, între 09:00 și 19:00. Mesajele primite în weekend primesc răspuns luni.',
            areaTitle: 'Unde predau',
            areaText:
                'Ședințele se desfășoară exclusiv online, prin Google Meet sau Zoom, așa că putem lucra din orice localitate. Majoritatea elevilor mei sunt din Harghita, Covasna și Mureș.',
            faqTitle: 'Poate ai deja răspunsul',
            faqText:
                'Cum se desfășoară ședințele, ce niveluri acopăr, ce include abonamentul și cum se face plata — sunt explicate pe larg în pagina de întrebări frecvente.',
            faqCta: 'Vezi întrebările frecvente',
            motto: '„Limba română nu este o barieră, ci un pod. Hai să-l construim împreună."',
        },
        HU: {
            hero: 'Kapcsolat',
            subtitle:
                'Írj vagy hívj közvetlenül — személyesen válaszolok, általában még aznap. Megbeszéljük a szintedet, a céljaidat és azt, hogyan dolgozhatunk együtt.',
            emailTitle: 'E-mail',
            emailNote: 'Részletes kérdésekhez ez a legjobb csatorna.',
            phoneTitle: 'Telefon',
            phoneNote: 'Hétfőtől péntekig, 09:00 és 19:00 között.',
            whatsappTitle: 'WhatsApp',
            whatsappNote: 'A leggyorsabb válasz, rövid kérdésekhez.',
            whatsappCta: 'Írj WhatsApp-on',
            scheduleTitle: 'Válaszadási idő',
            scheduleText:
                'Hétfőtől péntekig válaszolok, 09:00 és 19:00 között. A hétvégén érkező üzenetekre hétfőn válaszolok.',
            areaTitle: 'Hol tanítok',
            areaText:
                'Az órák kizárólag online zajlanak, Google Meet vagy Zoom platformon, így bárhonnan dolgozhatunk. A diákjaim többsége Hargita, Kovászna és Maros megyéből való.',
            faqTitle: 'Talán már megvan a válasz',
            faqText:
                'Hogyan zajlanak az órák, milyen szinteket vállalok, mit tartalmaz az előfizetés és hogyan lehet fizetni — mindezt részletesen elmagyarázom a gyakori kérdéseknél.',
            faqCta: 'Gyakori kérdések',
            motto: '„A román nyelv nem akadály, hanem híd. Építsük fel együtt!"',
        },
    };

    const currentT = t[lang] || t.RO;

    const channels = [
        {
            icon: Mail,
            title: currentT.emailTitle,
            value: legalEntity.email,
            note: currentT.emailNote,
            href: `mailto:${legalEntity.email}`,
            accent: 'bg-brand-50 text-brand-600',
        },
        {
            icon: Phone,
            title: currentT.phoneTitle,
            value: legalEntity.phone,
            note: currentT.phoneNote,
            href: `tel:${legalEntity.phoneHref}`,
            accent: 'bg-blue-50 text-blue-600',
        },
        {
            icon: MessageCircle,
            title: currentT.whatsappTitle,
            value: currentT.whatsappCta,
            note: currentT.whatsappNote,
            href: `https://wa.me/${legalEntity.phoneHref.replace('+', '')}`,
            external: true,
            accent: 'bg-emerald-50 text-emerald-600',
        },
    ];

    return (
        <main className="min-h-screen bg-[#fafbfc] pt-28 sm:pt-36 pb-24 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-14">
                    <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight mb-6">
                        {currentT.hero}
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        {currentT.subtitle}
                    </p>
                </div>

                {/* Canale de contact reale — fiecare este un link funcțional */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
                    {channels.map((channel) => {
                        const Icon = channel.icon;
                        return (
                            <a
                                key={channel.title}
                                href={channel.href}
                                {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className="group bg-white rounded-[2rem] p-7 shadow-lg shadow-gray-100/70 border border-gray-100 hover:shadow-xl hover:border-brand-200 hover:-translate-y-1 transition-all flex flex-col"
                            >
                                <span
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${channel.accent}`}
                                >
                                    <Icon size={22} />
                                </span>
                                <span className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                                    {channel.title}
                                </span>
                                <span className="font-black text-gray-900 break-words mb-2 group-hover:text-brand-600 transition-colors">
                                    {channel.value}
                                </span>
                                <span className="text-sm text-gray-500 leading-relaxed mt-auto">{channel.note}</span>
                            </a>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
                    <div className="bg-white rounded-[2rem] p-8 shadow-lg shadow-gray-100/70 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-10 h-10 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center">
                                <Clock size={19} />
                            </span>
                            <h2 className="text-lg font-black text-gray-900">{currentT.scheduleTitle}</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{currentT.scheduleText}</p>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 shadow-lg shadow-gray-100/70 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-10 h-10 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center">
                                <MapPin size={19} />
                            </span>
                            <h2 className="text-lg font-black text-gray-900">{currentT.areaTitle}</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{currentT.areaText}</p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-brand-600 to-blue-600 rounded-[2.5rem] p-8 sm:p-12 text-white mb-12">
                    <h2 className="text-2xl sm:text-3xl font-black mb-4">{currentT.faqTitle}</h2>
                    <p className="text-brand-50 font-medium text-lg mb-8 max-w-xl leading-relaxed">
                        {currentT.faqText}
                    </p>
                    <Link
                        to="/intrebari-frecvente"
                        className="inline-flex items-center gap-2 px-7 py-4 bg-white text-brand-700 rounded-2xl font-black hover:bg-brand-50 transition-all shadow-lg"
                    >
                        {currentT.faqCta}
                        <ArrowRight size={20} />
                    </Link>
                </div>

                <p className="text-center text-gray-500 font-black italic text-lg sm:text-xl max-w-2xl mx-auto">
                    {currentT.motto}
                </p>
            </div>
        </main>
    );
};

export default Contact;
