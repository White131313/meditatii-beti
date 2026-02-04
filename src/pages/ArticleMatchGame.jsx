import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft, Star, Sparkles, Circle, Square } from 'lucide-react';
import { getRandomNoun } from '../data/articleNouns';

const ArticleMatchGame = ({ lang = 'RO' }) => {
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState('easy');
    const [currentNoun, setCurrentNoun] = useState(null);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'
    const [isLoading, setIsLoading] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const feedbackTimeoutRef = useRef(null);

    const t = {
        RO: {
            title: "Un sau O?",
            subtitle: "Alege articolul corect!",
            score: "Scor",
            streak: "Serie",
            correct: "Corect!",
            wrong: "Nu e corect.",
            loading: "Pregătim cuvântul...",
            next: "Următorul",
            un: "UN",
            o: "O"
        },
        HU: {
            title: "Un vagy O?",
            subtitle: "Válaszd ki a helyes névelőt!",
            score: "Pontszám",
            streak: "Sorozat",
            correct: "Helyes!",
            wrong: "Nem helyes.",
            loading: "Szó előkészítése...",
            next: "Következő",
            un: "UN",
            o: "O"
        }
    };

    const currentT = t[lang] || t['RO'];

    const fetchNewNoun = () => {
        setIsLoading(true);
        setShowExplanation(false);
        setFeedback(null);
        setSelectedArticle(null);

        setTimeout(() => {
            const noun = getRandomNoun(difficulty);
            if (noun) {
                setCurrentNoun(noun);
                setIsLoading(false);
            } else {
                console.error("Failed to load noun");
                setIsLoading(false);
            }
        }, 500);
    };

    const handleAnswer = (article) => {
        if (feedback !== null || !currentNoun) return;

        setSelectedArticle(article);
        const isCorrect = article === currentNoun.correct_article;

        if (isCorrect) {
            setFeedback('correct');
            setScore(s => s + 10);
            setStreak(s => s + 1);
            if (streak + 1 > maxStreak) setMaxStreak(streak + 1);

            if (streak + 1 >= 10) setDifficulty('hard');
            else if (streak + 1 >= 5) setDifficulty('medium');

            feedbackTimeoutRef.current = setTimeout(() => {
                fetchNewNoun();
            }, 1500);
        } else {
            setFeedback('wrong');
            setShowExplanation(true);
            setStreak(0);
            setDifficulty('easy');
        }
    };

    useEffect(() => {
        fetchNewNoun();
        return () => {
            if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
        };
    }, []);

    if (!currentNoun && isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 to-red-100 flex flex-col items-center justify-center p-4">
                <Sparkles className="text-purple-500 animate-spin mb-4" size={48} />
                <p className="text-2xl font-black text-purple-800">{currentT.loading}</p>
            </div>
        );
    }

    if (!currentNoun && !isLoading) {
        return (
            <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-4">
                <p className="text-2xl font-black text-red-800 mb-4">Eroare la încărcare</p>
                <button onClick={fetchNewNoun} className="px-6 py-2 bg-red-500 text-white rounded-xl font-bold">Încearcă din nou</button>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-colors duration-500 font-kids pt-24 sm:pt-28 lg:pt-32 pb-6 ${feedback === 'correct' ? 'bg-gradient-to-br from-green-100 to-emerald-200' :
            feedback === 'wrong' ? 'bg-gradient-to-br from-red-100 to-orange-200' :
                'bg-gradient-to-br from-blue-100 via-purple-50 to-red-100'
            }`}>
            {/* Header */}
            <div className="max-w-3xl mx-auto px-4 flex items-center justify-between gap-3 mb-4 sm:mb-6">
                <button
                    onClick={() => navigate('/copii')}
                    className="p-2.5 sm:p-3 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:scale-110 active:scale-95 transition-all text-gray-600 border-b-3 sm:border-b-4 border-gray-100 active:border-b-0 active:translate-y-1"
                >
                    <ArrowLeft size={20} className="sm:w-6 sm:h-6" strokeWidth={3} />
                </button>

                <div className="flex gap-3 sm:gap-4">
                    <div className="bg-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-lg flex items-center gap-1.5 sm:gap-2 border-b-3 sm:border-b-4 border-gray-100">
                        <Trophy className="text-yellow-400 w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-base sm:text-lg font-black text-gray-800">{score}</span>
                    </div>
                    <div className="bg-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-lg flex items-center gap-1.5 sm:gap-2 border-b-3 sm:border-b-4 border-gray-100">
                        <Star className="text-orange-400 w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-base sm:text-lg font-black text-gray-800">{streak}</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-3xl mx-auto px-4 flex flex-col items-center">
                {/* Noun Card */}
                <div className={`w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white rounded-2xl sm:rounded-[2.5rem] lg:rounded-[3rem] p-6 sm:p-10 lg:p-14 shadow-xl sm:shadow-2xl relative transition-all duration-500 border-b-6 sm:border-b-8 border-gray-100 ${feedback === 'wrong' ? 'animate-shake' : ''
                    } ${feedback === 'correct' ? 'animate-bounce-short' : ''}`}>

                    {/* Success Overlay */}
                    {feedback === 'correct' && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-green-500/10 rounded-2xl sm:rounded-[2.5rem] lg:rounded-[3rem]">
                            <div className="bg-white px-5 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl border-4 border-green-100">
                                <p className="text-2xl sm:text-4xl lg:text-5xl font-black text-green-500">
                                    {currentNoun.correct_article} {currentNoun.noun} ✓
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="text-center relative">
                        <span className="inline-block px-3 sm:px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-[9px] sm:text-[10px] lg:text-xs font-black uppercase tracking-widest mb-3 sm:mb-5">
                            Nivel: {difficulty.toUpperCase()}
                        </span>

                        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-800 leading-tight mb-3 sm:mb-4 tracking-tight">
                            {currentNoun?.noun}
                        </h2>

                        {lang === 'HU' && currentNoun && (
                            <p className="text-base sm:text-xl lg:text-2xl text-gray-400 font-bold italic">
                                "{currentNoun.translation_hu}"
                            </p>
                        )}

                        {/* Always show Hungarian for context */}
                        {lang === 'RO' && currentNoun && (
                            <p className="text-sm sm:text-lg lg:text-xl text-gray-300 font-medium italic mt-1 sm:mt-2">
                                ({currentNoun.translation_hu})
                            </p>
                        )}

                        {/* Wrong Answer Explanation - BILINGUAL */}
                        {showExplanation && currentNoun && (
                            <div className="mt-5 sm:mt-7 p-4 sm:p-6 lg:p-8 bg-red-50 border-3 sm:border-4 border-red-100 rounded-2xl sm:rounded-3xl shadow-xl">
                                {/* Wrong message - bilingual */}
                                <p className="text-lg sm:text-xl lg:text-2xl font-black text-red-600 mb-1">
                                    Nu e corect. / Nem helyes.
                                </p>

                                {/* We don't say - bilingual */}
                                <p className="text-base sm:text-lg lg:text-xl text-red-700 font-bold mb-2 sm:mb-3">
                                    Nu spunem "{selectedArticle} {currentNoun.noun}" / Nem mondjuk: "{selectedArticle} {currentNoun.noun}"
                                </p>

                                {/* Correct answer */}
                                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-green-600 mb-3 sm:mb-4">
                                    ✓ {currentNoun.correct_article} {currentNoun.noun}
                                </p>

                                {/* Gender explanation - bilingual */}
                                <div className="bg-white/60 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4">
                                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 font-bold">
                                        🇷🇴 {currentNoun.gender_explanation}
                                    </p>
                                    <p className="text-sm sm:text-base lg:text-lg text-gray-500 font-medium italic mt-1">
                                        🇭🇺 {currentNoun.gender_explanation_hu || `"${currentNoun.noun}" ${currentNoun.correct_article === 'O' ? 'nőnemű' : 'hímnemű'} főnév.`}
                                    </p>
                                </div>

                                <button
                                    onClick={fetchNewNoun}
                                    className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-red-500 text-white rounded-xl sm:rounded-2xl font-black text-base sm:text-lg lg:text-xl hover:bg-red-600 active:translate-y-1 border-b-4 border-red-700 transition-all shadow-lg flex items-center gap-2 sm:gap-3 mx-auto"
                                >
                                    <span>{currentT.next}</span>
                                    <Sparkles size={20} className="animate-pulse sm:w-6 sm:h-6" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Article Buttons - OPTIMIZED RESPONSIVE */}
                {!showExplanation && !feedback && (
                    <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg grid grid-cols-2 gap-3 sm:gap-5 lg:gap-6 mt-6 sm:mt-8 lg:mt-10 px-2">
                        {/* UN Button - Blue */}
                        <button
                            onClick={() => handleAnswer('Un')}
                            className="group relative bg-blue-500 hover:bg-blue-600 text-white rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 lg:p-10 shadow-[0_6px_0_0_#1d4ed8] sm:shadow-[0_8px_0_0_#1d4ed8] active:shadow-none active:translate-y-1.5 transition-all flex flex-col items-center gap-2 sm:gap-3 lg:gap-4"
                        >
                            <Square size={36} className="sm:w-12 sm:h-12 lg:w-16 lg:h-16 group-hover:scale-110 transition-transform fill-white/20" strokeWidth={3} />
                            <span className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">{currentT.un}</span>
                        </button>

                        {/* O Button - Red */}
                        <button
                            onClick={() => handleAnswer('O')}
                            className="group relative bg-red-500 hover:bg-red-600 text-white rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 lg:p-10 shadow-[0_6px_0_0_#b91c1c] sm:shadow-[0_8px_0_0_#b91c1c] active:shadow-none active:translate-y-1.5 transition-all flex flex-col items-center gap-2 sm:gap-3 lg:gap-4"
                        >
                            <Circle size={36} className="sm:w-12 sm:h-12 lg:w-16 lg:h-16 group-hover:scale-110 transition-transform fill-white/20" strokeWidth={3} />
                            <span className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">{currentT.o}</span>
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ArticleMatchGame;
