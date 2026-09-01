import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, MicOff, Star, CheckCircle2, XCircle, RefreshCw, Trophy, Eye, Keyboard } from 'lucide-react';
import { getRandomRound } from '../data/speakingWords';

const SpeechRecognitionAPI = typeof window !== 'undefined'
    ? (window.SpeechRecognition || window.webkitSpeechRecognition)
    : null;

const normalize = (str) => (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // scoate diacriticele (ă, â, î, ș, ț -> a, a, i, s, t)
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, ' ');

const isCorrectAnswer = (heard, expected) => {
    const normExpected = normalize(expected);
    const normHeard = normalize(heard);
    if (!normHeard) return false;
    if (normHeard === normExpected) return true;
    const tokens = normHeard.split(' ').filter(Boolean);
    return tokens.includes(normExpected);
};

const ROUND_SIZE = 5;

const VoiceSpeakGame = ({ lang = 'RO' }) => {
    const navigate = useNavigate();
    const isSupported = !!SpeechRecognitionAPI;

    const [roundWords, setRoundWords] = useState(() => getRandomRound(ROUND_SIZE));
    const [cardIndex, setCardIndex] = useState(0);
    const [status, setStatus] = useState('idle'); // idle | listening | correct | wrong | error | revealed
    const [lastHeard, setLastHeard] = useState('');
    const [errorType, setErrorType] = useState(null);
    const [score, setScore] = useState(0);
    const [roundsWon, setRoundsWon] = useState(0);
    const [roundComplete, setRoundComplete] = useState(false);
    const [typedAnswer, setTypedAnswer] = useState('');

    const recognitionRef = useRef(null);

    const t = {
        RO: {
            title: "Spune în Română!",
            instruction: "Apasă pe microfon și spune cu voce tare cuvântul în română!",
            back: "Înapoi",
            score: "Scor",
            rounds: "Runde",
            listen: "Ascult...",
            tapToSpeak: "Apasă și vorbește",
            heard: "Am auzit",
            correct: "Corect! 🎉",
            wrong: "Mai încearcă!",
            tryAgain: "Încearcă din nou",
            reveal: "Nu știu, arată-mi",
            revealedAnswer: "Răspunsul era",
            next: "Următorul",
            roundCompleteTitle: "Rundă completă! 🌟",
            roundCompleteDesc: "Ai terminat toate cele 5 cuvinte!",
            playAgain: "Joacă altă rundă",
            noSpeech: "Nu am auzit nimic. Mai încearcă!",
            notAllowed: "Trebuie să permiți accesul la microfon ca să joci.",
            networkError: "Recunoașterea vocală are nevoie de internet. Verifică conexiunea.",
            genericError: "Ceva nu a mers bine. Mai încearcă!",
            unsupportedTitle: "Microfonul nu e disponibil aici",
            unsupportedDesc: "Browserul acesta nu suportă recunoașterea vocală (funcționează cel mai bine în Chrome). Poți totuși scrie răspunsul:",
            typePlaceholder: "Scrie răspunsul în română...",
            check: "Verifică"
        },
        HU: {
            title: "Mondd Románul!",
            instruction: "Nyomd meg a mikrofont és mondd ki hangosan a szót románul!",
            back: "Vissza",
            score: "Pontszám",
            rounds: "Kör",
            listen: "Hallgatom...",
            tapToSpeak: "Nyomd meg és beszélj",
            heard: "Ezt hallottam",
            correct: "Helyes! 🎉",
            wrong: "Próbáld újra!",
            tryAgain: "Próbáld újra",
            reveal: "Nem tudom, mutasd meg",
            revealedAnswer: "A válasz ez volt",
            next: "Következő",
            roundCompleteTitle: "Kör kész! 🌟",
            roundCompleteDesc: "Mind az 5 szót megcsináltad!",
            playAgain: "Új kör",
            noSpeech: "Nem hallottam semmit. Próbáld újra!",
            notAllowed: "Engedélyezned kell a mikrofont a játékhoz.",
            networkError: "A hangfelismeréshez internet kell. Ellenőrizd a kapcsolatot.",
            genericError: "Valami nem sikerült. Próbáld újra!",
            unsupportedTitle: "A mikrofon itt nem elérhető",
            unsupportedDesc: "Ez a böngésző nem támogatja a hangfelismerést (Chrome-ban működik legjobban). Beírhatod a választ:",
            typePlaceholder: "Írd be a választ románul...",
            check: "Ellenőrzés"
        }
    };
    const currentT = t[lang] || t.RO;
    const currentWord = roundWords[cardIndex];

    // Configurare SpeechRecognition o singura data
    useEffect(() => {
        if (!isSupported) return undefined;
        const recognition = new SpeechRecognitionAPI();
        recognition.lang = 'ro-RO';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 5;
        recognitionRef.current = recognition;
        return () => {
            recognition.onresult = null;
            recognition.onerror = null;
            recognition.onend = null;
            try { recognition.abort(); } catch { /* noop */ }
        };
    }, [isSupported]);

    const evaluate = useCallback((heardText, expected) => {
        setLastHeard(heardText);
        if (isCorrectAnswer(heardText, expected)) {
            setStatus('correct');
            setScore(s => s + 10);
            setTimeout(() => goToNext(), 1600);
        } else {
            setStatus('wrong');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardIndex, roundWords]);

    const startListening = () => {
        if (!isSupported || !recognitionRef.current || status === 'listening') return;
        const recognition = recognitionRef.current;
        setErrorType(null);
        setLastHeard('');
        setStatus('listening');

        recognition.onresult = (event) => {
            const alternatives = Array.from(event.results[0] || []).map(r => r.transcript);
            const best = alternatives[0] || '';
            const anyMatch = alternatives.some(alt => isCorrectAnswer(alt, currentWord.answer));
            evaluate(anyMatch ? currentWord.answer : best, currentWord.answer);
        };
        recognition.onerror = (event) => {
            setErrorType(event.error);
            setStatus('error');
        };
        recognition.onend = () => {
            setStatus(prev => (prev === 'listening' ? 'idle' : prev));
        };

        try {
            recognition.start();
        } catch {
            setStatus('idle');
        }
    };

    const goToNext = () => {
        setStatus('idle');
        setLastHeard('');
        setErrorType(null);
        setTypedAnswer('');
        if (cardIndex + 1 >= roundWords.length) {
            setRoundComplete(true);
            setRoundsWon(r => r + 1);
        } else {
            setCardIndex(i => i + 1);
        }
    };

    const handleReveal = () => {
        setStatus('revealed');
    };

    const handleRetry = () => {
        setStatus('idle');
        setLastHeard('');
        setErrorType(null);
    };

    const handleTypedCheck = () => {
        evaluate(typedAnswer, currentWord.answer);
    };

    const startNewRound = () => {
        const usedIds = roundWords.map(w => w.id);
        setRoundWords(getRandomRound(ROUND_SIZE, usedIds));
        setCardIndex(0);
        setStatus('idle');
        setLastHeard('');
        setErrorType(null);
        setTypedAnswer('');
        setRoundComplete(false);
    };

    const errorMessage = () => {
        if (errorType === 'not-allowed' || errorType === 'permission-denied') return currentT.notAllowed;
        if (errorType === 'no-speech') return currentT.noSpeech;
        if (errorType === 'network') return currentT.networkError;
        return currentT.genericError;
    };

    if (roundComplete) {
        return (
            <div className="min-h-[100dvh] bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 font-kids flex items-center justify-center px-4">
                <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl text-center max-w-md w-full border-b-8 border-purple-100">
                    <div className="text-7xl sm:text-8xl mb-4 animate-bounce">🏆</div>
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-800 mb-2">{currentT.roundCompleteTitle}</h2>
                    <p className="text-gray-500 font-bold mb-6">{currentT.roundCompleteDesc}</p>
                    <div className="flex justify-center gap-4 mb-8">
                        <div className="bg-purple-50 px-5 py-3 rounded-2xl">
                            <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest">{currentT.score}</p>
                            <p className="text-2xl font-black text-gray-800">{score}</p>
                        </div>
                        <div className="bg-orange-50 px-5 py-3 rounded-2xl">
                            <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest">{currentT.rounds}</p>
                            <p className="text-2xl font-black text-gray-800">{roundsWon}</p>
                        </div>
                    </div>
                    <button
                        onClick={startNewRound}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl active:scale-95 transition-all mb-3"
                    >
                        <RefreshCw size={20} />
                        {currentT.playAgain}
                    </button>
                    <button
                        onClick={() => navigate('/copii')}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-600 rounded-2xl font-black text-sm hover:bg-gray-200 transition-all"
                    >
                        <ArrowLeft size={16} />
                        {currentT.back}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 font-kids">
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                <div className="absolute top-10 left-10 w-32 h-32 md:w-64 md:h-64 bg-purple-300 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-40 h-40 md:w-72 md:h-72 bg-pink-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="min-h-[100dvh] flex flex-col pt-20 sm:pt-28 lg:pt-32 pb-6 sm:pb-8 relative z-10">
                <div className="flex-1 flex flex-col max-w-2xl mx-auto px-4 w-full">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 px-1">
                        <button
                            onClick={() => navigate('/copii')}
                            className="flex items-center gap-1.5 px-3 py-2 bg-white text-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 border border-gray-100"
                        >
                            <ArrowLeft size={16} className="text-purple-500" />
                            <span className="font-bold text-xs uppercase tracking-wider">{currentT.back}</span>
                        </button>
                        <div className="flex gap-2">
                            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-sm border border-purple-100 flex items-center gap-2">
                                <Star size={16} className="text-purple-400" />
                                <span className="font-black text-gray-800">{score}</span>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-4 sm:mb-6">
                        <h1 className="text-2xl sm:text-4xl font-black text-gray-800 mb-2 tracking-tight">{currentT.title}</h1>
                        <p className="text-sm sm:text-base text-gray-500 font-bold max-w-sm mx-auto">{currentT.instruction}</p>
                    </div>

                    {/* Progress dots */}
                    <div className="flex justify-center gap-2 mb-6">
                        {roundWords.map((w, i) => (
                            <div
                                key={w.id}
                                className={`h-2.5 rounded-full transition-all ${i < cardIndex ? 'w-6 bg-green-400' :
                                    i === cardIndex ? 'w-8 bg-purple-500' :
                                        'w-2.5 bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Main card */}
                    <div className={`flex-1 bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-xl p-6 sm:p-10 flex flex-col items-center justify-center text-center border-b-8 transition-all ${status === 'correct' ? 'border-green-300' :
                        status === 'wrong' ? 'border-red-300 animate-shake' :
                            'border-purple-100'
                        }`}>
                        {currentWord && (
                            <>
                                <div className="text-7xl sm:text-8xl mb-4">{currentWord.emoji}</div>
                                <p className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] mb-2">HU</p>
                                <h2 className="text-3xl sm:text-5xl font-black text-gray-800 mb-6">{currentWord.hu}</h2>

                                {/* Feedback area */}
                                {status === 'correct' && (
                                    <div className="flex items-center gap-2 text-green-600 font-black text-lg sm:text-xl mb-2">
                                        <CheckCircle2 size={24} />
                                        {currentT.correct}
                                    </div>
                                )}
                                {status === 'wrong' && (
                                    <div className="mb-4">
                                        <div className="flex items-center justify-center gap-2 text-red-500 font-black text-lg mb-1">
                                            <XCircle size={22} />
                                            {currentT.wrong}
                                        </div>
                                        {lastHeard && (
                                            <p className="text-sm text-gray-400 font-bold italic">{currentT.heard}: "{lastHeard}"</p>
                                        )}
                                    </div>
                                )}
                                {status === 'error' && (
                                    <p className="text-red-500 font-bold text-sm mb-4 max-w-xs">{errorMessage()}</p>
                                )}
                                {status === 'revealed' && (
                                    <p className="text-purple-600 font-black text-lg mb-4">
                                        {currentT.revealedAnswer}: <span className="underline">{currentWord.answer}</span>
                                    </p>
                                )}

                                {/* Mic / typed input controls */}
                                {isSupported ? (
                                    <div className="flex flex-col items-center gap-3">
                                        {(status === 'idle' || status === 'listening' || status === 'error') && (
                                            <button
                                                onClick={startListening}
                                                disabled={status === 'listening'}
                                                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-xl transition-all active:scale-95 ${status === 'listening'
                                                    ? 'bg-red-500 animate-pulse scale-110'
                                                    : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-105'
                                                    }`}
                                            >
                                                {status === 'listening'
                                                    ? <MicOff size={32} className="text-white" />
                                                    : <Mic size={32} className="text-white" />}
                                            </button>
                                        )}
                                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                                            {status === 'listening' ? currentT.listen : currentT.tapToSpeak}
                                        </p>

                                        {(status === 'wrong' || status === 'error') && (
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    onClick={handleRetry}
                                                    className="flex items-center gap-1.5 px-4 py-2 bg-purple-500 text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all"
                                                >
                                                    <RefreshCw size={14} />
                                                    {currentT.tryAgain}
                                                </button>
                                                <button
                                                    onClick={handleReveal}
                                                    className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-500 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-gray-200 transition-all"
                                                >
                                                    <Eye size={14} />
                                                    {currentT.reveal}
                                                </button>
                                            </div>
                                        )}
                                        {status === 'revealed' && (
                                            <button
                                                onClick={goToNext}
                                                className="px-6 py-2.5 bg-purple-500 text-white rounded-xl font-black text-sm shadow-md active:scale-95 transition-all"
                                            >
                                                {currentT.next}
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="w-full max-w-xs flex flex-col items-center gap-3">
                                        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                                            <Keyboard size={14} />
                                            {currentT.unsupportedDesc}
                                        </div>
                                        {(status === 'idle' || status === 'wrong') && (
                                            <>
                                                <input
                                                    type="text"
                                                    value={typedAnswer}
                                                    onChange={(e) => setTypedAnswer(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleTypedCheck()}
                                                    placeholder={currentT.typePlaceholder}
                                                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-100 font-bold text-center focus:outline-none focus:border-purple-300"
                                                />
                                                <button
                                                    onClick={handleTypedCheck}
                                                    disabled={!typedAnswer.trim()}
                                                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-black shadow-md active:scale-95 transition-all disabled:opacity-50"
                                                >
                                                    {currentT.check}
                                                </button>
                                                <button
                                                    onClick={handleReveal}
                                                    className="flex items-center gap-1.5 px-4 py-2 text-gray-400 rounded-xl font-black text-xs uppercase tracking-wider hover:text-gray-600 transition-all"
                                                >
                                                    <Eye size={14} />
                                                    {currentT.reveal}
                                                </button>
                                            </>
                                        )}
                                        {status === 'revealed' && (
                                            <button
                                                onClick={goToNext}
                                                className="px-6 py-2.5 bg-purple-500 text-white rounded-xl font-black text-sm shadow-md active:scale-95 transition-all"
                                            >
                                                {currentT.next}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
                    20%, 40%, 60%, 80% { transform: translateX(8px); }
                }
                .animate-shake { animation: shake 0.4s; }
            `}</style>
        </div>
    );
};

export default VoiceSpeakGame;
