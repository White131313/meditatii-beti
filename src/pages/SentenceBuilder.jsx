import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Check, RefreshCw, ArrowLeft } from 'lucide-react';
import { getRandomSentence } from '../data/sentenceBuilderPuzzles';

const SentenceBuilder = ({ lang = 'RO' }) => {
    const navigate = useNavigate();
    const [scrambledWords, setScrambledWords] = useState([]);
    const [dropZone, setDropZone] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState([]);
    const [hint, setHint] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(-1);
    const [difficulty, setDifficulty] = useState('easy');
    const [recentResults, setRecentResults] = useState([]); // Track last 3 attempts
    const [score, setScore] = useState(() => {
        const saved = localStorage.getItem('sentenceBuilderScore');
        return saved ? parseInt(saved, 10) : 0;
    });
    const [totalPlayed, setTotalPlayed] = useState(() => {
        const saved = localStorage.getItem('sentenceBuilderTotal');
        return saved ? parseInt(saved, 10) : 0;
    });

    useEffect(() => {
        localStorage.setItem('sentenceBuilderScore', score);
    }, [score]);

    useEffect(() => {
        localStorage.setItem('sentenceBuilderTotal', totalPlayed);
    }, [totalPlayed]);

    const t = {
        RO: {
            title: "Constructorul de Propoziții",
            instruction: "Apasă pe cuvinte pentru a construi propoziția corectă!",
            hint: "TRADUCERE",
            check: "Verifică",
            tryAgain: "Resetează",
            newSentence: "Alta",
            success: "Bravo! Ai reușit! 🎉",
            loading: "Se încarcă...",
            back: "Înapoi",
            empty: "Trage sau apasă pe cuvinte aici...",
            score: "Scor",
            progress: "Progres",
            correctPositionsHint: "Ai așezat corect {count} din {total} cuvinte. Mai încearcă!"
        },
        HU: {
            title: "Mondatépítő",
            instruction: "Kattints a szavakra a helyes mondat felépítéséhez!",
            hint: "FORDÍTÁS",
            check: "Ellenőrzés",
            tryAgain: "Újra",
            newSentence: "Új",
            success: "Szuper! Sikerült! 🎉",
            loading: "Betöltés...",
            back: "Vissza",
            empty: "Húzd vagy kattints ide...",
            score: "Pontszám",
            progress: "Haladás",
            correctPositionsHint: "{count} / {total} szó a megfelelő helyen van. Próbáld újra!"
        }
    };

    const currentT = t[lang] || t['RO'];

    const adjustDifficulty = (wasCorrect) => {
        const newResults = [...recentResults, wasCorrect].slice(-3);
        setRecentResults(newResults);

        if (wasCorrect) {
            setScore(prev => prev + (difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30));
        } else {
            setScore(0);
        }
        setTotalPlayed(prev => prev + 1);

        if (newResults.length === 3) {
            const correctCount = newResults.filter(r => r).length;
            let nextDiff = difficulty;

            if (correctCount >= 2 && difficulty !== 'hard') {
                nextDiff = difficulty === 'easy' ? 'medium' : 'hard';
                console.log('📈 Sentence difficulty increased!');
            } else if (correctCount <= 1 && difficulty !== 'easy') {
                nextDiff = difficulty === 'hard' ? 'medium' : 'easy';
                console.log('📉 Sentence difficulty decreased!');
            }

            setRecentResults([]);
            if (nextDiff !== difficulty) {
                setDifficulty(nextDiff);
                return nextDiff; // Return new difficulty
            }
        }
        return difficulty; // No change
    };

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        // Ensure it's not the same as original
        if (JSON.stringify(shuffled) === JSON.stringify(array) && array.length > 1) {
            return shuffleArray(array);
        }
        return shuffled;
    };

    const fetchNewSentence = (forcedDifficulty = null) => {
        // IMPORTANT: If called from onClick directly, forcedDifficulty might be an event object.
        // We only use it if it's a valid string.
        const targetDifficulty = (typeof forcedDifficulty === 'string') ? forcedDifficulty : difficulty;

        setDropZone([]);
        setShowSuccess(false);
        setIsLoading(true);
        // Clear previous state immediately to avoid flicker
        setCorrectAnswer([]);
        setScrambledWords([]);
        setHint('');
        setErrorMsg('');

        // Use static sentences - all verified and correct!
        setTimeout(() => {
            let sentence = getRandomSentence(targetDifficulty);

            // Try up to 5 times to get a DIFFERENT sentence than current
            let attempts = 0;
            const currentAnswerStr = JSON.stringify(correctAnswer);
            while (JSON.stringify(sentence.original) === currentAnswerStr && attempts < 5) {
                sentence = getRandomSentence(targetDifficulty);
                attempts++;
            }

            setCorrectAnswer(sentence.original);
            setScrambledWords(shuffleArray(sentence.original));
            setHint(sentence.translation_hu);
            setCurrentSentenceIndex(0); // Track that we loaded
            setIsLoading(false);
        }, 300);
    };

    useEffect(() => {
        fetchNewSentence();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only fetch once on mount, we manually fetch on difficulty change to avoid interrupting a current puzzle

    const handleWordClick = (word, index) => {
        if (showSuccess || isLoading) return;
        setDropZone([...dropZone, word]);
        setScrambledWords(scrambledWords.filter((_, i) => i !== index));
    };

    const handleRemoveFromDropZone = (word, index) => {
        if (showSuccess || isLoading) return;
        setScrambledWords([...scrambledWords, word]);
        setDropZone(dropZone.filter((_, i) => i !== index));
    };

    const checkAnswer = () => {
        const isCorrect = JSON.stringify(dropZone) === JSON.stringify(correctAnswer);

        if (isCorrect) {
            setErrorMsg('');
            const nextDiff = adjustDifficulty(true);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                // We must always trigger it manually now
                fetchNewSentence(nextDiff);
            }, 2500);
        } else {
            adjustDifficulty(false);
            const dropZoneEl = document.getElementById('drop-zone');
            dropZoneEl?.classList.add('shake');
            
            let correctPositions = 0;
            dropZone.forEach((word, index) => {
                if (word === correctAnswer[index]) correctPositions++;
            });
            const hintText = currentT.correctPositionsHint
                .replace('{count}', correctPositions)
                .replace('{total}', correctAnswer.length);
            
            setErrorMsg(hintText);
            
            setTimeout(() => {
                dropZoneEl?.classList.remove('shake');
            }, 500);
        }
    };

    const resetPuzzle = () => {
        setDropZone([]);
        // Use our new shuffle function
        setScrambledWords(shuffleArray(correctAnswer));
        setShowSuccess(false);
        setErrorMsg('');
    };

    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-yellow-50 via-orange-50 to-blue-50 font-kids">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                <div className="absolute top-10 left-10 w-32 h-32 md:w-64 md:h-64 bg-orange-300 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-40 h-40 md:w-72 md:h-72 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Success Overlay */}
            {showSuccess && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/10 backdrop-blur-sm">
                    <div className="text-center animate-bounce px-4">
                        <div className="text-7xl md:text-9xl mb-4">🎉</div>
                        <h2 className="text-4xl md:text-6xl font-black text-green-600 drop-shadow-lg">
                            {currentT.success}
                        </h2>
                    </div>
                </div>
            )}

            {/* Main container with proportional spacing - OPTIMIZED */}
            <div className="min-h-[100dvh] flex flex-col pt-20 sm:pt-28 lg:pt-32 pb-6 sm:pb-8">
                <div className="flex-1 flex flex-col max-w-3xl mx-auto px-4 w-full relative z-10">
                    {/* Stats Header */}
                    <div className="flex justify-between items-center mb-6 px-2">
                        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm border border-orange-100 flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                <span className="text-lg">⭐</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-orange-400 uppercase tracking-tighter leading-none">{currentT.score}</p>
                                <p className="text-lg font-black text-gray-800 leading-none">{score}</p>
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm border border-blue-100 flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-lg">📚</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-tighter leading-none">{currentT.progress}</p>
                                <p className="text-lg font-black text-gray-800 leading-none">{totalPlayed}</p>
                            </div>
                        </div>
                    </div>

                    {/* Header - Compact and professional */}
                    <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-12">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => navigate('/copii')}
                                className="flex items-center gap-1.5 px-3 py-2 bg-white text-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 border border-gray-100"
                            >
                                <ArrowLeft size={16} className="text-orange-500" />
                                <span className="font-bold text-xs uppercase tracking-wider">{currentT.back}</span>
                            </button>

                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                    difficulty === 'easy' ? 'bg-green-100 text-green-600' :
                                    difficulty === 'medium' ? 'bg-orange-100 text-orange-600' :
                                    'bg-red-100 text-red-600'
                                }`}>
                                    {difficulty}
                                </span>
                                <button
                                    onClick={() => fetchNewSentence()}
                                    disabled={isLoading}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                                    <span className="font-bold text-xs uppercase tracking-widest">{currentT.newSentence}</span>
                                </button>
                            </div>
                        </div>

                        {/* Title & Instruction - More integrated */}
                        <div className="text-center">
                            <h1 className="text-2xl sm:text-4xl font-black text-gray-800 mb-2 tracking-tight">
                                {currentT.title}
                            </h1>
                            <p className="text-sm sm:text-base text-gray-500 font-bold max-w-sm mx-auto">
                                {currentT.instruction}
                            </p>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center py-12 sm:py-16 bg-white/50 rounded-2xl sm:rounded-3xl border-4 border-dashed border-orange-200 px-8">
                                <div className="inline-block w-12 h-12 sm:w-14 sm:h-14 border-6 border-orange-400 border-t-transparent rounded-full animate-spin mb-3"></div>
                                <p className="text-lg sm:text-xl font-black text-gray-600">{currentT.loading}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 sm:gap-8 mt-2 sm:mt-8">
                            {/* Translation Hint */}
                            {hint && (
                                <div className="text-center mb-2 sm:mb-4">
                                    <div className="inline-flex flex-col items-center px-4 sm:px-6 py-2 sm:py-4 bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-[2rem] shadow-xl border border-blue-100 border-b-2 sm:border-b-4 border-b-blue-200">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                                            <p className="text-[10px] font-black text-blue-400 tracking-[0.2em]">{currentT.hint}</p>
                                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                                        </div>
                                        <p className="text-lg sm:text-2xl font-black text-gray-800 italic">
                                            "{hint}"
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Drop Zone */}
                            <div
                                id="drop-zone"
                                className="bg-white rounded-xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-3 sm:p-6 lg:p-8 border-2 sm:border-4 border-dashed border-orange-300 flex flex-wrap gap-2 justify-center items-center min-h-[80px] sm:min-h-[120px] lg:min-h-[140px]"
                            >
                                {dropZone.length === 0 ? (
                                    <p className="text-sm sm:text-lg lg:text-xl font-bold text-orange-200 uppercase tracking-wide text-center">
                                        {currentT.empty}
                                    </p>
                                ) : (
                                    dropZone.map((word, index) => (
                                        <button
                                            key={`drop-${index}`}
                                            onClick={() => handleRemoveFromDropZone(word, index)}
                                            className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-gradient-to-br from-orange-400 to-red-500 text-white rounded-xl sm:rounded-2xl font-black text-sm sm:text-lg lg:text-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                                        >
                                            {word}
                                        </button>
                                    ))
                                )}
                            </div>

                            {/* Error Message Hint */}
                            {errorMsg && (
                                <div className="text-center mt-2 animate-bounce">
                                    <p className="inline-block px-4 py-2 bg-red-100 text-red-600 font-bold rounded-xl border border-red-200">
                                        {errorMsg}
                                    </p>
                                </div>
                            )}

                            {/* Word Pool */}
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-3xl p-3 sm:p-6 shadow-inner border border-white">
                                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center">
                                    {scrambledWords.map((word, index) => (
                                        <button
                                            key={`scramble-${index}`}
                                            onClick={() => handleWordClick(word, index)}
                                            className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-gradient-to-br from-blue-400 to-indigo-500 text-white rounded-xl sm:rounded-2xl font-black text-sm sm:text-lg lg:text-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
                                        >
                                            {word}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-lg mx-auto w-full mt-2">
                                <button
                                    onClick={checkAnswer}
                                    disabled={dropZone.length === 0}
                                    className="flex items-center justify-center gap-1.5 sm:gap-2 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-xl sm:rounded-2xl font-black text-base sm:text-xl lg:text-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95 disabled:opacity-50"
                                >
                                    <Check size={18} strokeWidth={3} className="sm:w-6 sm:h-6" />
                                    {currentT.check}
                                </button>

                                <button
                                    onClick={resetPuzzle}
                                    className="flex items-center justify-center gap-1.5 sm:gap-2 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl sm:rounded-2xl font-black text-base sm:text-xl lg:text-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95"
                                >
                                    <X size={18} strokeWidth={3} className="sm:w-6 sm:h-6" />
                                    {currentT.tryAgain}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                    20%, 40%, 60%, 80% { transform: translateX(10px); }
                }
                .shake { animation: shake 0.5s; }
            `}</style>
        </div>
    );
};

export default SentenceBuilder;
