import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, ArrowLeft, CheckCircle2, XCircle, Star, Sparkles } from 'lucide-react';
import { getRandomTrivia } from '../data/trueFalseTrivia';

const TrueFalseGame = ({ lang = 'RO' }) => {
    const navigate = useNavigate();
    const [difficulty, setDifficulty] = useState('easy');
    const [currentTrivia, setCurrentTrivia] = useState(null);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [isGameOver, setIsGameOver] = useState(false);
    const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'
    const [isLoading, setIsLoading] = useState(true);
    const [showExplanation, setShowExplanation] = useState(false);

    // We only need redundant refs if we are doing complex async operations, but for useEffect timer, direct state is better.
    // Keeping feedbackTimeoutRef for cleanup.
    const feedbackTimeoutRef = useRef(null);

    const t = {
        RO: {
            score: "Scor",
            streak: "Serie",
            time: "Timp",
            true: "ADEVĂRAT (IGEN)",
            false: "FALS (NEM)",
            gameOver: "Jocul s-a terminat!",
            finalScore: "Scor final",
            bestStreak: "Cea mai bună serie",
            playAgain: "Mai joacă o dată",
            back: "Înapoi",
            correct: "Corect! 🌟",
            wrong: "Ops! ❌",
            timesUp: "Timpul a expirat! ⏰",
            loading: "Pregătim întrebarea...",
            next: "Următoarea"
        },
        HU: {
            score: "Pontszám",
            streak: "Sorozat",
            time: "Idő",
            true: "IGAZ (ADEVĂRAT)",
            false: "HAMIS (FALS)",
            gameOver: "Vége a játéknak!",
            finalScore: "Végső pontszám",
            bestStreak: "Legjobb sorozat",
            playAgain: "Játssz újra",
            back: "Vissza",
            correct: "Helyes! 🌟",
            wrong: "Hoppá! ❌",
            timesUp: "Lejárt az idő! ⏰",
            loading: "Kérdés előkészítése...",
            next: "Következő"
        }
    };

    const currentT = t[lang] || t['RO'];

    const fetchNewTrivia = () => {
        setIsLoading(true);
        setShowExplanation(false);
        setFeedback(null);
        // Important: timer resets here, but the effect will handle the countdown
        setTimeLeft(10);

        setTimeout(() => {
            const trivia = getRandomTrivia(difficulty);
            if (trivia) {
                setCurrentTrivia(trivia);
                setIsLoading(false);
                // Timer will automatically start because isLoading becomes false
            } else {
                console.error("Failed to load trivia");
                setIsLoading(false);
            }
        }, 600);
    };

    // Consolidated Timer Logic
    useEffect(() => {
        // Stop timer if: loading new question, showing feedback (animating), or showing explanation (wrong/timeout)
        if (isLoading || feedback || showExplanation || !currentTrivia) return;

        // If time is up, trigger timeout immediately
        if (timeLeft === 0) {
            handleTimeout();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, isLoading, feedback, showExplanation, currentTrivia]);

    const handleTimeout = () => {
        setFeedback('wrong');
        setShowExplanation(true);
        setStreak(0);
        setDifficulty('easy');
    };

    const handleAnswer = (userAnswer) => {
        // Prevent interaction if something is already happening
        if (feedback !== null || isGameOver || !currentTrivia || showExplanation) return;

        const isCorrect = userAnswer === currentTrivia.isTrue;

        if (isCorrect) {
            setFeedback('correct');
            setScore(s => s + 10);
            setStreak(s => s + 1);
            if (streak + 1 > maxStreak) setMaxStreak(streak + 1);

            if (streak + 1 >= 10) setDifficulty('hard');
            else if (streak + 1 >= 5) setDifficulty('medium');

            feedbackTimeoutRef.current = setTimeout(() => {
                fetchNewTrivia();
            }, 1500);
        } else {
            setFeedback('wrong');
            setShowExplanation(true);
            setStreak(0);
            setDifficulty('easy');
        }
    };

    useEffect(() => {
        fetchNewTrivia();
        return () => {
            if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
        };
    }, []);

    if (!currentTrivia && isLoading) {
        return (
            <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-4">
                <Sparkles className="text-blue-400 animate-spin mb-4" size={48} />
                <p className="text-2xl font-black text-blue-800">{currentT.loading}</p>
            </div>
        );
    }

    // Safety check if retrieval failed completely
    if (!currentTrivia && !isLoading) {
        return (
            <div className="min-h-screen bg-red-50 flex flex-col items-center justify-center p-4">
                <p className="text-2xl font-black text-red-800 mb-4">Eroare la încărcare</p>
                <button onClick={() => fetchNewTrivia()} className="px-6 py-2 bg-red-500 text-white rounded-xl">Încearcă din nou</button>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 font-kids pt-24 sm:pt-28 lg:pt-32 pb-6 ${feedback === 'correct' ? 'bg-green-50' :
            feedback === 'wrong' ? 'bg-red-50' :
                'bg-indigo-50'
            }`}>
            {/* Header / Top Info */}
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

            {/* Timer Bar */}
            <div className="max-w-md sm:max-w-lg lg:max-w-xl mx-auto px-4 sm:px-6 mb-5 sm:mb-8">
                <div className="h-3 sm:h-4 lg:h-5 bg-white/50 rounded-full overflow-hidden p-0.5 sm:p-1 shadow-inner border-2 border-white">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ease-linear ${timeLeft > 5 ? 'bg-gradient-to-r from-blue-400 to-indigo-500' :
                            timeLeft > 2 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                                'bg-gradient-to-r from-red-400 to-red-600'
                            }`}
                        style={{ width: `${(timeLeft / 10) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Main Question Card */}
            <main className="max-w-3xl mx-auto px-4 flex flex-col items-center">
                <div className={`w-full bg-white rounded-2xl sm:rounded-[2.5rem] lg:rounded-[3rem] p-6 sm:p-10 lg:p-16 shadow-xl sm:shadow-2xl relative transition-all duration-500 border-b-6 sm:border-b-8 border-gray-100 ${feedback === 'wrong' ? 'animate-shake' : ''
                    }`}>
                    {/* Feedback Overlay */}
                    {feedback === 'correct' && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-green-500/10 rounded-2xl sm:rounded-[2.5rem] lg:rounded-[3rem] animate-bounce-short">
                            <div className="bg-white p-5 sm:p-8 lg:p-10 rounded-full shadow-2xl scale-100 sm:scale-110 lg:scale-125 border-4 border-green-50">
                                <CheckCircle2 size={60} className="text-green-500 sm:w-20 sm:h-20" strokeWidth={3} />
                            </div>
                        </div>
                    )}

                    <div className="text-center relative">
                        <span className="inline-block px-3 sm:px-4 py-1 bg-indigo-100 text-indigo-600 rounded-full text-[9px] sm:text-[10px] lg:text-xs font-black uppercase tracking-widest mb-3 sm:mb-5">
                            Nivel: {difficulty.toUpperCase()}
                        </span>

                        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-800 leading-[1.2] mb-3 sm:mb-6 px-1">
                            {currentTrivia?.statement}
                        </h2>

                        {lang === 'HU' && currentTrivia && (
                            <p className="text-base sm:text-xl lg:text-2xl text-gray-400 font-bold italic mb-3">
                                "{currentTrivia.translation_hu}"
                            </p>
                        )}

                        {showExplanation && currentTrivia && (
                            <div className="mt-5 sm:mt-8 p-5 sm:p-8 bg-red-50 border-3 sm:border-4 border-red-100 rounded-2xl sm:rounded-3xl animate-in fade-in slide-in-from-bottom-4 shadow-xl text-center">
                                <p className="text-lg sm:text-2xl font-black text-red-600 mb-2 sm:mb-3 text-center">
                                    {timeLeft === 0 ? currentT.timesUp : currentT.wrong}
                                </p>
                                <p className="text-base sm:text-xl text-red-800 font-bold leading-relaxed mb-4 sm:mb-6 text-center">
                                    {currentTrivia.explanation}
                                </p>
                                <button
                                    onClick={fetchNewTrivia}
                                    className="px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-red-500 text-white rounded-xl sm:rounded-2xl font-black text-base sm:text-lg lg:text-xl hover:bg-red-600 active:translate-y-1 active:border-b-0 border-b-4 border-red-700 transition-all shadow-lg flex items-center gap-2 sm:gap-3 mx-auto"
                                >
                                    <span>{currentT.next}</span>
                                    <Sparkles size={20} className="animate-pulse sm:w-6 sm:h-6" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Buttons - OPTIMIZED RESPONSIVE */}
                {!showExplanation && !feedback && (
                    <div className="w-full max-w-md sm:max-w-lg grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8 lg:mt-10 px-2">
                        <button
                            onClick={() => handleAnswer(true)}
                            className="group relative bg-green-500 hover:bg-green-600 text-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-8 lg:p-10 shadow-[0_6px_0_0_#15803d] sm:shadow-[0_8px_0_0_#15803d] active:shadow-none active:translate-y-1.5 transition-all flex flex-col items-center gap-2 sm:gap-4"
                        >
                            <CheckCircle2 size={32} className="sm:w-12 sm:h-12 lg:w-14 lg:h-14 group-hover:scale-110 transition-transform" />
                            <span className="text-sm sm:text-xl lg:text-2xl font-black tracking-tight text-center leading-tight">{currentT.true}</span>
                        </button>

                        <button
                            onClick={() => handleAnswer(false)}
                            className="group relative bg-red-500 hover:bg-red-600 text-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-8 lg:p-10 shadow-[0_6px_0_0_#b91c1c] sm:shadow-[0_8px_0_0_#b91c1c] active:shadow-none active:translate-y-1.5 transition-all flex flex-col items-center gap-2 sm:gap-4"
                        >
                            <XCircle size={32} className="sm:w-12 sm:h-12 lg:w-14 lg:h-14 group-hover:scale-110 transition-transform" />
                            <span className="text-sm sm:text-xl lg:text-2xl font-black tracking-tight text-center leading-tight">{currentT.false}</span>
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default TrueFalseGame;
