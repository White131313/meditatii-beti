import React from 'react';
import { BookOpen, CheckCircle, ChevronRight, Download, Lock, Lightbulb } from 'lucide-react';
import { Link } from '../components/LocalizedLink';
import { lessonTopics } from '../data/lessonTopics';
import { breadcrumbTrail, pageLabel, categoryPath, topicPath, localizePath } from '../lib/seoRoutes';

const copy = {
    RO: {
        materialsTitle: 'Materialele lecției',
        demo: 'Descarcă fișa demo (PDF gratuit)',
        quiz: 'Fă testul cu explicații',
        quizLocked: 'Testul complet (Premium)',
        full: 'Fișa completă (Premium)',
        freeFull: 'Descarcă modelul (PDF gratuit)',
        answer: 'Răspuns',
        otherTopics: 'Alte lecții explicate',
        ctaTitle: 'Vrei să înțelegi tot, nu doar să memorezi?',
        ctaText:
            'Cu abonamentul Premium (49,99 lei/lună) ai acces la toate fișele și testele, plus o ședință lunară de 2 ore cu Beatrice.',
        ctaButton: 'Vezi abonamentul',
        contact: 'Scrie-ne',
        breadcrumb: 'Navigare',
    },
    HU: {
        materialsTitle: 'A lecke anyagai',
        demo: 'Demó feladatlap letöltése (ingyenes PDF)',
        quiz: 'Teszt kitöltése magyarázattal',
        quizLocked: 'Teljes teszt (Prémium)',
        full: 'Teljes feladatlap (Prémium)',
        freeFull: 'Minta letöltése (ingyenes PDF)',
        answer: 'Válasz',
        otherTopics: 'További elmagyarázott leckék',
        ctaTitle: 'Szeretnéd valóban megérteni, nem csak bemagolni?',
        ctaText:
            'A Prémium előfizetéssel (49,99 lej/hó) minden feladatlaphoz és teszthez hozzáférsz, és havonta egy 2 órás órát is kapsz Beatrice-szel.',
        ctaButton: 'Előfizetés megtekintése',
        contact: 'Írj nekünk',
        breadcrumb: 'Navigáció',
    },
};

// Aceeași regulă ca în CourseDetail: modelul 1 de Evaluare Națională e gratuit.
const isFreeFull = (material) => material.title?.toLowerCase().includes('model evaluare naționala 1');

/** Acțiunile disponibile pentru materialele din Supabase legate de subiect. */
function materialActions(topic, materials, isSubscribed, t) {
    const related = materials.filter((m) => topic.materialIds.includes(m.id));
    const actions = [];

    for (const material of related) {
        if (material.category === 'practice_exercises') {
            const open = Boolean(material.demo_file_url) || isSubscribed;
            actions.push({
                key: material.id,
                label: open ? t.quiz : t.quizLocked,
                to: open ? `/quiz/${material.id}` : '/#pricing-plan',
                icon: open ? CheckCircle : Lock,
                tone: open ? 'brand' : 'dark',
            });
        } else if (material.demo_file_url) {
            actions.push({ key: material.id, label: t.demo, href: material.demo_file_url, icon: Download, tone: 'free' });
        } else {
            // Descărcarea fișei complete rămâne în pagina secțiunii, unde se verifică accesul.
            const free = isFreeFull(material);
            actions.push({
                key: material.id,
                label: free ? t.freeFull : t.full,
                to: categoryPath(material.category),
                icon: free ? Download : Lock,
                tone: free ? 'free' : 'dark',
            });
        }
    }
    return actions;
}

const toneClasses = {
    free: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100',
    brand: 'bg-white text-brand-600 border-2 border-brand-100 hover:bg-brand-50',
    dark: 'bg-gray-900 text-white hover:bg-brand-600 shadow-gray-200',
};

const LessonTopic = ({ topic, lang = 'RO', isSubscribed = false, materials = [] }) => {
    const t = copy[lang] || copy.RO;
    const text = topic[lang] || topic.RO;
    const trail = breadcrumbTrail(topicPath(topic));
    const actions = materialActions(topic, materials, isSubscribed, t);
    const otherTopics = lessonTopics.filter((other) => other.slug !== topic.slug);

    return (
        <main className="min-h-screen bg-gray-50 pt-32 pb-20">
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav aria-label={t.breadcrumb} className="mb-8">
                    <ol className="flex flex-wrap items-center gap-1 text-sm font-bold text-gray-400">
                        {trail.map((crumb, i) => (
                            <li key={crumb.path} className="flex items-center gap-1">
                                {i > 0 ? <ChevronRight size={14} /> : null}
                                {i < trail.length - 1 ? (
                                    <Link to={crumb.path} className="hover:text-brand-600 transition-colors">
                                        {pageLabel(crumb, lang)}
                                    </Link>
                                ) : (
                                    <span className="text-gray-600" aria-current="page">
                                        {pageLabel(crumb, lang)}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>

                <header className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-gray-200/50 mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 rounded-full text-[11px] font-black tracking-widest text-brand-600 uppercase mb-5">
                        <BookOpen size={14} />
                        {topic.level[lang] || topic.level.RO}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">{text.h1}</h1>
                    <p className="text-lg md:text-xl text-gray-500 font-medium mb-6">{text.lead}</p>
                    <div className="space-y-4 text-gray-600 leading-relaxed">
                        {text.intro.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>

                    {actions.length > 0 ? (
                        <div className="mt-8">
                            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">{t.materialsTitle}</h2>
                            <div className="flex flex-wrap gap-3">
                                {actions.map((action) => {
                                    const { key, label, to, href, icon: Icon, tone } = action;
                                    const className = `inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-lg ${toneClasses[tone]}`;
                                    return href ? (
                                        <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={className}>
                                            <Icon size={18} />
                                            {label}
                                        </a>
                                    ) : (
                                        <Link key={key} to={to} className={className}>
                                            <Icon size={18} />
                                            {label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ) : null}
                </header>

                <section className="bg-white rounded-[2rem] p-8 md:p-10 shadow-lg shadow-gray-100 mb-10">
                    <h2 className="text-2xl font-black text-gray-900 mb-5">{text.contentsTitle}</h2>
                    <ul className="space-y-3">
                        {text.contents.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-gray-600 leading-relaxed">
                                <CheckCircle size={20} className="text-brand-600 shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-black text-gray-900 mb-5 px-2">{text.rulesTitle}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {text.rules.map((rule) => (
                            <div key={rule.name} className="bg-white rounded-[2rem] p-6 md:p-8 shadow-lg shadow-gray-100 border border-gray-100">
                                <h3 className="text-xl font-black text-gray-900 mb-1">{rule.name}</h3>
                                {rule.question ? (
                                    <p className="text-sm font-black text-brand-600 mb-3">{rule.question}</p>
                                ) : null}
                                <p className="text-gray-600 leading-relaxed">{rule.text}</p>
                                {rule.example ? (
                                    <p className="mt-3 text-sm text-gray-500 bg-gray-50 rounded-xl px-4 py-3 italic">{rule.example}</p>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </section>

                {text.questions.length > 0 ? (
                    <section className="bg-white rounded-[2rem] p-8 md:p-10 shadow-lg shadow-gray-100 mb-10">
                        <h2 className="text-2xl font-black text-gray-900 mb-6">{text.questionsTitle}</h2>
                        <ol className="space-y-6">
                            {text.questions.map((item, i) => (
                                <li key={item.q} className="border-l-4 border-brand-200 pl-5">
                                    <p className="font-black text-gray-900 mb-2">
                                        {i + 1}. {item.q}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-bold text-brand-600">{t.answer}:</span> {item.a}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1 flex items-start gap-2">
                                        <Lightbulb size={16} className="shrink-0 mt-0.5 text-amber-500" />
                                        <span>{item.why}</span>
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </section>
                ) : null}

                {otherTopics.length > 0 ? (
                    <section className="mb-10">
                        <h2 className="text-xl font-black text-gray-900 mb-4 px-2">{t.otherTopics}</h2>
                        <div className="flex flex-wrap gap-3">
                            {otherTopics.map((other) => (
                                <Link
                                    key={other.slug}
                                    to={topicPath(other)}
                                    className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-gray-100 rounded-xl font-bold text-sm text-gray-700 hover:text-brand-600 hover:border-brand-200 transition-all shadow-sm"
                                >
                                    {(other[lang] || other.RO).label}
                                    <ChevronRight size={16} />
                                </Link>
                            ))}
                        </div>
                    </section>
                ) : null}

                {!isSubscribed ? (
                    <aside className="bg-gray-900 text-white rounded-[2.5rem] p-8 md:p-12 text-center">
                        <h2 className="text-2xl md:text-3xl font-black mb-3">{t.ctaTitle}</h2>
                        <p className="text-gray-300 max-w-xl mx-auto mb-8">{t.ctaText}</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <a
                                href={localizePath('/#pricing-plan', lang)}
                                className="px-8 py-4 bg-brand-600 hover:bg-brand-700 rounded-2xl font-black text-sm transition-colors"
                            >
                                {t.ctaButton}
                            </a>
                            <Link
                                to="/contact"
                                className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-2xl font-black text-sm transition-colors"
                            >
                                {t.contact}
                            </Link>
                        </div>
                    </aside>
                ) : null}
            </article>
        </main>
    );
};

export default LessonTopic;
