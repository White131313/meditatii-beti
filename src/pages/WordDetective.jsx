import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, RefreshCw, Lightbulb, CheckCircle2 } from 'lucide-react';
import { getRandomPuzzle } from '../data/wordDetectivePuzzles';
import { getEmojiForWord } from '../data/wordEmojis';

const WordDetective = ({ lang = 'RO' }) => {
    const navigate = useNavigate();
    const [puzzle, setPuzzle] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedWord, setSelectedWord] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [recentResults, setRecentResults] = useState([]);

    const t = {
        RO: {
            title: "Găsește Intrusul",
            subtitle: "Care cuvânt nu se potrivește?",
            instruction: "Apasă pe intrus pentru a-l descoperi!",
            newCase: "Următorul Caz",
            back: "Înapoi",
            loading: "Se pregătește cazul...",
            tryAgain: "Mai încearcă!",
            success: "Bravo, Detectiv! 🕵️‍♂️",
            correct: "Corect!",
            wrong: "Greșit!"
        },
        HU: {
            title: "Keresd a Betolakodót",
            subtitle: "Melyik szó nem illik ide?",
            instruction: "Kattints a betolakodóra!",
            newCase: "Következő Eset",
            back: "Vissza",
            loading: "Készül az eset...",
            tryAgain: "Próbáld újra!",
            success: "Brávó, Detektív! 🕵️‍♂️",
            correct: "Helyes!",
            wrong: "Rossz!"
        }
    };

    const currentT = t[lang] || t['RO'];

    const adjustDifficulty = (wasCorrect) => {
        const newResults = [...recentResults, wasCorrect].slice(-3);
        setRecentResults(newResults);

        if (newResults.length === 3) {
            const correctCount = newResults.filter(r => r).length;

            if (correctCount >= 2 && difficulty !== 'hard') {
                setDifficulty(difficulty === 'easy' ? 'medium' : 'hard');
            } else if (correctCount <= 1 && difficulty !== 'easy') {
                setDifficulty(difficulty === 'hard' ? 'medium' : 'easy');
            }

            setRecentResults([]);
        }
    };

    const fetchNewPuzzle = () => {
        setIsLoading(true);
        setSelectedWord(null);
        setShowSuccess(false);
        setShowExplanation(false);

        setTimeout(() => {
            const puzzle = getRandomPuzzle(difficulty);
            setPuzzle(puzzle);
            setIsLoading(false);
        }, 300);
    };

    useEffect(() => {
        fetchNewPuzzle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleWordClick = (word, index) => {
        if (selectedWord !== null || showSuccess) return;

        setSelectedWord(index);
        const isCorrect = word === puzzle.correctAnswer;

        if (isCorrect) {
            adjustDifficulty(true);
            setExplanation(lang === 'HU' && puzzle.explanation_hu ? puzzle.explanation_hu : puzzle.explanation);
            setTimeout(() => {
                setShowSuccess(true);
                setShowExplanation(true);
            }, 600);
        } else {
            adjustDifficulty(false);
            const cardEl = document.getElementById(`word-${index}`);
            cardEl?.classList.add('shake');
            setTimeout(() => {
                cardEl?.classList.remove('shake');
                setSelectedWord(null);
            }, 500);
        }
    };

    const handleNextCase = () => {
        setShowSuccess(false);
        setShowExplanation(false);
        fetchNewPuzzle();
    };

    const getCardClasses = (word, index) => {
        const baseClasses = "relative aspect-square rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] p-4 sm:p-6 lg:p-8 shadow-xl sm:shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center border-b-4 sm:border-b-6 active:border-b-0 active:translate-y-1";

        if (selectedWord === index) {
            const isCorrect = word === puzzle.correctAnswer;
            if (isCorrect) {
                return `${baseClasses} bg-gradient-to-br from-green-400 to-green-500 border-green-600 scale-105`;
            } else {
                return `${baseClasses} bg-gradient-to-br from-red-400 to-red-500 border-red-600`;
            }
        }

        return `${baseClasses} bg-gradient-to-br from-purple-100 to-indigo-100 border-purple-200 hover:scale-105 active:scale-95`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 font-kids overflow-hidden">
            {/* Background decorations - subtle */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[5%] left-[5%] w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-purple-300 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[5%] w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-indigo-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Success Overlay */}
            {showSuccess && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/10 backdrop-blur-sm p-4">
                    <div className="text-center max-w-md w-full">
                        <div className="text-6xl sm:text-7xl lg:text-9xl mb-4 animate-bounce">🎉</div>
                        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-green-600 drop-shadow-lg mb-4 sm:mb-6">
                            {currentT.success}
                        </h2>

                        {showExplanation && (
                            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-2xl mx-auto mb-4 sm:mb-6 animate-fade-in">
                                <div className="flex items-start gap-3 mb-4">
                                    <Lightbulb className="text-yellow-500 flex-shrink-0 mt-1 w-5 h-5 sm:w-6 sm:h-6" />
                                    <p className="text-base sm:text-lg lg:text-2xl text-gray-700 font-bold text-left">
                                        {explanation}
                                    </p>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleNextCase}
                            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl shadow-xl hover:shadow-2xl transition-all active:scale-95"
                        >
                            <RefreshCw size={20} className="sm:w-6 sm:h-6" />
                            {currentT.newCase}
                        </button>
                    </div>
                </div>
            )}

            {/* Main container - optimized for all screen sizes */}
            <div className="min-h-screen flex flex-col pt-24 sm:pt-28 lg:pt-32 pb-6 sm:pb-8 lg:pb-10 px-4 sm:px-6 lg:px-8">
                <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full relative z-10">
                    {/* Header - compact and responsive */}
                    <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
                        <button
                            onClick={() => navigate('/copii')}
                            className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 bg-white rounded-xl sm:rounded-2xl shadow-lg transition-all active:scale-95 border-b-3 border-gray-100"
                        >
                            <ArrowLeft size={16} className="text-purple-500 sm:w-5 sm:h-5" />
                            <span className="font-black text-gray-700 text-sm sm:text-base">{currentT.back}</span>
                        </button>

                        <button
                            onClick={() => fetchNewPuzzle()}
                            disabled={isLoading}
                            className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-purple-400 to-indigo-500 text-white rounded-xl sm:rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
                        >
                            <RefreshCw size={16} className={`${isLoading ? 'animate-spin' : ''} sm:w-5 sm:h-5`} />
                            <span className="font-black text-sm sm:text-base">{currentT.newCase}</span>
                        </button>
                    </div>

                    {/* Title - centered and responsive */}
                    <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                            <Search className="text-purple-500 w-6 h-6 sm:w-8 sm:h-8" />
                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-800 leading-tight">
                                {currentT.title}
                            </h1>
                            <Search className="text-indigo-500 w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <p className="text-sm sm:text-lg lg:text-xl text-gray-500 font-bold">
                            {currentT.instruction}
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center py-12 sm:py-16 bg-white/50 rounded-2xl sm:rounded-3xl border-4 border-dashed border-purple-200 px-8 sm:px-12">
                                <Search className="inline-block w-12 h-12 sm:w-16 sm:h-16 text-purple-400 animate-pulse mb-3 sm:mb-4" />
                                <p className="text-lg sm:text-xl font-black text-gray-600">{currentT.loading}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center mt-6 sm:mt-12">
                            {/* 2x2 Grid - optimized sizing */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:gap-6 w-full max-w-md sm:max-w-lg lg:max-w-xl">
                                {puzzle?.options?.map((word, index) => (
                                    <div
                                        key={index}
                                        id={`word-${index}`}
                                        onClick={() => handleWordClick(word, index)}
                                        className={getCardClasses(word, index)}
                                    >
                                        {selectedWord === index && word === puzzle.correctAnswer && (
                                            <CheckCircle2 className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white w-6 h-6 sm:w-8 sm:h-8" />
                                        )}

                                        <div className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 lg:gap-3">
                                            <div className="text-3xl sm:text-5xl lg:text-6xl">
                                                {getEmojiForWord(word)}
                                            </div>
                                            <h2 className={`text-base sm:text-xl lg:text-2xl font-black text-center leading-tight ${selectedWord === index ? 'text-white' : 'text-gray-800'}`}>
                                                {word}
                                            </h2>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
                    20%, 40%, 60%, 80% { transform: translateX(8px); }
                }
                .shake { animation: shake 0.5s; }
                
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.6s ease-out; }
            `}</style>
        </div>
    );
};

export default WordDetective;
