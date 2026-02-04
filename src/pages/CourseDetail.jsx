import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { BookOpen, Download, Lock, CheckCircle, ChevronLeft } from 'lucide-react';

// Sub-component for a single lesson row
const LessonCard = ({ lesson, idx, categoryId, isSubscribed, user, currentT }) => {
    const isAdmin = user && ['bernad.beatrice23@gmail.com', 'bernad.beatrice23@gamil.com', 'cristian.balasa@gmail.com'].includes(user?.email);
    const hasAccess = isSubscribed || isAdmin || lesson.demo_file_url;

    return (
        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-lg shadow-gray-100 border border-transparent hover:border-brand-200 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
            <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 font-black text-lg transition-colors ${lesson.demo_file_url ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-400 group-hover:bg-brand-50 group-hover:text-brand-600'}`}>
                    {idx + 1}
                </div>
                <div>
                    <h3 className="text-xl font-black text-gray-900 mb-1 leading-tight">{lesson.title}</h3>
                    <div className="flex items-center gap-2 text-gray-400 text-[11px] font-black uppercase tracking-widest">
                        <BookOpen size={14} />
                        <span>PDF DE STUDIU</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                {categoryId === 'practice_exercises' && (
                    hasAccess ? (
                        <Link
                            to={`/quiz/${lesson.id}`}
                            className="px-6 py-3 bg-white text-brand-600 border-2 border-brand-100 rounded-xl font-bold text-sm hover:bg-brand-50 transition-all flex items-center gap-2"
                        >
                            <CheckCircle size={18} />
                            {currentT.startQuiz}
                        </Link>
                    ) : (
                        <a
                            href="/#pricing-plan"
                            className="px-6 py-3 bg-white text-gray-400 border-2 border-gray-100 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all flex items-center gap-2"
                        >
                            <Lock size={16} />
                            {currentT.startQuiz} (Pro)
                        </a>
                    )
                )}

                {hasAccess ? (
                    <a
                        href={lesson.full_file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-6 py-3 text-white rounded-xl font-bold text-sm transition-all shadow-lg flex items-center gap-2 ${lesson.demo_file_url ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100' : 'bg-brand-600 hover:bg-brand-700 shadow-brand-100'}`}
                    >
                        <Download size={18} />
                        {currentT.download}
                    </a>
                ) : (
                    <a
                        href="/#pricing-plan"
                        className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-brand-600 transition-all shadow-lg shadow-gray-200 flex items-center gap-2"
                    >
                        <Lock size={16} />
                        {currentT.locked}
                    </a>
                )}
            </div>
        </div>
    );
};

const CourseDetail = ({ lang, isSubscribed, user }) => {
    const { categoryId } = useParams();
    const [lessons, setLessons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const t = {
        RO: {
            back: "Înapoi la toate materialele",
            title_adults: "Comunicare Adulți",
            title_gym: "Materie V-VIII",
            title_exam: "Evaluare Națională",
            lessonsCount: "lecții disponibile",
            download: "Descarcă PDF",
            locked: "Deblochează cu Abonament",
            quiz: "Fă Testul (Quiz)",
            startQuiz: "Începe Quiz",
            noLessons: "Încă nu sunt lecții adăugate în această secțiune.",
            previewMode: "Mod Previzualizare (Pro)",
            title_practice: "Exersează"
        },
        HU: {
            back: "Vissza az összes anyaghoz",
            title_adults: "Felnőtt Kommunikáció",
            title_gym: "Tananyag V-VIII",
            title_exam: "Nemzeti Értékelő",
            lessonsCount: "elérhető lecke",
            download: "PDF Letöltése",
            locked: "Feloldás Előfizetéssel",
            quiz: "Teszt kitöltése (Quiz)",
            startQuiz: "Quiz Indítása",
            noLessons: "Ebben a szekcióban még nincsenek feltöltött leckék.",
            previewMode: "Előnézet Mód (Pro)",
            title_practice: "Gyakorlat"
        }
    };

    const currentT = t[lang] || t['RO'];

    useEffect(() => {
        const fetchLessons = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('materials')
                .select('*')
                .eq('category', categoryId);

            if (data) setLessons(data);
            setIsLoading(false);
        };
        fetchLessons();
    }, [categoryId]);

    const getTitle = () => {
        if (categoryId === 'adults_communication') return currentT.title_adults;
        if (categoryId === 'gymnasium_curriculum') return currentT.title_gym;
        if (categoryId === 'national_exam_prep') return currentT.title_exam;
        if (categoryId === 'practice_exercises') return currentT.title_practice;
        return categoryId;
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Info */}
                <Link to="/#materials-grid" className="inline-flex items-center gap-2 text-gray-500 hover:text-brand-600 font-bold mb-8 transition-colors group">
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    {currentT.back}
                </Link>

                <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-gray-200/50 mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2"></div>


                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{getTitle()}</h1>
                            <p className="text-lg text-gray-500 font-medium">
                                {lessons.length} {currentT.lessonsCount}
                            </p>
                        </div>
                        {!(isSubscribed || (user && ['bernad.beatrice23@gmail.com', 'bernad.beatrice23@gamil.com', 'cristian.balasa@gmail.com'].includes(user?.email))) && (
                            <div className="bg-brand-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-xl shadow-brand-100 flex items-center gap-2 animate-pulse">
                                <Lock size={18} />
                                {currentT.previewMode}
                            </div>
                        )}
                    </div>
                </div>

                {/* Lessons List organized by type */}
                <div className="space-y-16">
                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
                        </div>
                    ) : lessons.length > 0 ? (
                        <>
                            {/* DEMO SECTION */}
                            {lessons.some(l => l.demo_file_url) && (
                                <div>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-2 h-8 bg-emerald-500 rounded-full"></div>
                                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Materiale Demo (Gratis)</h2>
                                    </div>
                                    <div className="space-y-4">
                                        {lessons.filter(l => l.demo_file_url).map((lesson, idx) => (
                                            <LessonCard
                                                key={lesson.id}
                                                lesson={lesson}
                                                idx={idx}
                                                categoryId={categoryId}
                                                isSubscribed={isSubscribed}
                                                user={user}
                                                currentT={currentT}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* PREMIUM SECTION */}
                            {lessons.some(l => !l.demo_file_url) && (
                                <div>
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-2 h-8 bg-brand-600 rounded-full"></div>
                                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Materiale Premium (Pro)</h2>
                                    </div>
                                    <div className="space-y-4">
                                        {lessons.filter(l => !l.demo_file_url).map((lesson, idx) => (
                                            <LessonCard
                                                key={lesson.id}
                                                lesson={lesson}
                                                idx={idx}
                                                categoryId={categoryId}
                                                isSubscribed={isSubscribed}
                                                user={user}
                                                currentT={currentT}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-24 bg-gray-100/50 rounded-[3.5rem] border-2 border-dashed border-gray-200">
                            <div className="inline-flex p-6 bg-white rounded-3xl shadow-sm mb-6">
                                <BookOpen size={32} className="text-gray-300" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-2">Încă nu sunt materiale</h3>
                            <p className="text-gray-500 font-medium max-w-xs mx-auto">{currentT.noLessons}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default CourseDetail;
