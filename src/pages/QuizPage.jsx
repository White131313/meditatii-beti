import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { ChevronLeft, Check, X, RefreshCcw, Award, AlertCircle, CheckCircle2, XCircle, PenTool } from 'lucide-react';

const QuizPage = ({ lang }) => {
    const { lessonId } = useParams();
    const [lesson, setLesson] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [sourceText, setSourceText] = useState("");
    const [currentStep, setCurrentStep] = useState(0); // 0: start/study, 1: quiz, 2: results
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userInput, setUserInput] = useState("");
    const [isTextCorrect, setIsTextCorrect] = useState(false);

    // Refs for scrolling
    const explanationRef = React.useRef(null);

    // Force page to TOP when question or step changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [currentQuestionIdx, currentStep]);

    // Scroll to EXPLANATION ONLY when answer is revealed
    useEffect(() => {
        if (isAnswered && explanationRef.current) {
            setTimeout(() => {
                explanationRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }, [isAnswered]);

    const t = {
        RO: {
            title: "Test de Verificare",
            start: "Începe Quiz-ul",
            next: "Următoarea Întrebare",
            finish: "Vezi Rezultatul",
            score: "Scorul tău este",
            retry: "Încearcă din nou",
            back: "Înapoi la curs",
            correct: "Corect!",
            wrong: "Ops, nu e corect.",
            explanation: "Explicația lui Beatrice:",
            adminNotice: "Ești admin? Adaugă întrebări din panoul de administrare.",
            studyTitle: "Lecția de citit",
            readyToTest: "Sunt gata, verifică-mă!",
            backToStudy: "Reia citirea",
            check: "Verifică",
            yourAnswer: "Răspunsul tău",
            modelAnswer: "Răspunsul corect (Model)",
            selfAssessNotice: "Scrie mai jos răspunsul tău, apoi apasă butonul pentru a vedea varianta corectă."
        },
        HU: {
            title: "Ellenőrző Teszt",
            start: "Quiz Indítása",
            next: "Következő Kérdés",
            finish: "Eredmény Megtekintése",
            score: "Az eredményed",
            retry: "Próbáld újra",
            back: "Vissza a tananyaghoz",
            correct: "Helyes!",
            wrong: "Hoppá, ez nem talált.",
            explanation: "Beatrice magyarázata:",
            adminNotice: "Admin vagy? Adj hozzá kérdéseket az adminisztrációs panelen.",
            studyTitle: "Lecke elolvasása",
            readyToTest: "Készen állok, tesztelj!",
            backToStudy: "Olvasás elölről",
            check: "Ellenőrzés",
            yourAnswer: "A te válaszod",
            modelAnswer: "Helyes válasz (Modell)",
            selfAssessNotice: "Írd le alább a válaszodat, majd nyomd meg a gombot a helyes verzió megtekintéséhez."
        }
    };

    const currentT = t[lang] || t['RO'];

    useEffect(() => {
        const fetchQuizData = async () => {
            setIsLoading(true);
            const { data: lessonData } = await supabase.from('materials').select('title').eq('id', lessonId).single();
            setLesson(lessonData);

            const { data: quizData } = await supabase.from('quizzes').select('*').eq('material_id', lessonId).maybeSingle();
            if (quizData) {
                if (quizData.questions) setQuestions(quizData.questions);
                if (quizData.source_text) setSourceText(quizData.source_text);
            }
            setIsLoading(false);
        };
        fetchQuizData();
    }, [lessonId]);

    const isCloseEnough = (userInput, q) => {
        const modelAnswer = q.correctAnswer || q.explanation || "";
        if (!userInput || !modelAnswer) return false;

        // Function to clean, remove diacritics and tokenize strings
        const getKeywords = (s) => {
            return s.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "") // Remove diacritics (ș -> s, ă -> a etc.)
                .replace(/-/g, " ") // Treat hyphens as spaces
                .replace(/[.,\/#!$%\^&\*;:{}=_`~()?!]/g, "") // Remove punctuation
                .split(/\s+/) // Split by spaces
                .filter(word => word.length >= 2); // Keep words with 2+ letters
        };

        const wordsUser = getKeywords(userInput);
        const wordsModel = getKeywords(modelAnswer);

        if (wordsModel.length === 0) return true;

        // Count how many words from model are in user's answer
        let matches = 0;
        wordsModel.forEach(word => {
            if (wordsUser.includes(word)) matches++;
        });

        const ratio = matches / wordsModel.length;

        // Success if:
        // 1. More than 50% overlap OR
        // 2. User matched at least one main word and the model is very short
        return ratio >= 0.5 || (wordsUser.some(w => wordsModel.includes(w)) && wordsModel.length < 3);
    };

    const handleAnswerClick = (idx) => {
        if (isAnswered) return;
        setSelectedAnswer(idx);
        setIsAnswered(true);
        if (idx === questions[currentQuestionIdx].correct) {
            setScore(score + 1);
        }
    };

    const nextQuestion = () => {
        setSelectedAnswer(null);
        setIsAnswered(false);
        setUserInput("");
        if (currentQuestionIdx < questions.length - 1) {
            setCurrentQuestionIdx(currentQuestionIdx + 1);
        } else {
            setCurrentStep(2);
        }
    };

    const restartQuiz = () => {
        setCurrentStep(1);
        setCurrentQuestionIdx(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setUserInput("");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!lesson) return null;

    return (
        <div className="min-h-[85vh] flex flex-col justify-center py-20 sm:py-32 bg-gray-50">
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6">

                {/* Intro & Study Step */}
                {currentStep === 0 && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-[3rem] p-12 shadow-xl border border-gray-100">
                            <div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center text-brand-600 mx-auto mb-8">
                                <Award size={40} />
                            </div>
                            <h1 className="text-3xl font-black text-gray-900 mb-4">{currentT.title}</h1>
                            <p className="text-gray-500 font-medium mb-10 text-lg">
                                {lesson.title}
                            </p>

                            {sourceText && (
                                <div className="text-left mb-10">
                                    <div className="flex items-center gap-2 mb-4 text-brand-600">
                                        <CheckCircle2 size={24} />
                                        <h3 className="font-extrabold uppercase tracking-widest text-sm">{currentT.studyTitle}</h3>
                                    </div>
                                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-gray-700 leading-relaxed font-bold whitespace-pre-wrap text-lg italic">
                                        {sourceText}
                                    </div>
                                </div>
                            )}

                            {questions.length > 0 ? (
                                <button
                                    onClick={() => setCurrentStep(1)}
                                    className="w-full py-5 bg-gray-900 text-white rounded-[1.5rem] font-black text-xl hover:bg-brand-600 transition-all shadow-xl shadow-gray-200"
                                >
                                    {sourceText ? currentT.readyToTest : currentT.start}
                                </button>
                            ) : (
                                <div className="p-8 bg-amber-50 rounded-3xl border border-amber-100 italic text-amber-700 font-bold">
                                    <AlertCircle size={24} className="mx-auto mb-2" />
                                    <p>{currentT.noQuestions}</p>
                                    <p className="text-xs mt-2 opacity-70">{currentT.adminNotice}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Question Step */}
                {currentStep === 1 && questions.length > 0 && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between px-4">
                            <span className="text-sm font-black text-brand-600 uppercase tracking-widest">
                                Întrebarea {currentQuestionIdx + 1} / {questions.length}
                            </span>
                            <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-brand-500 transition-all duration-500"
                                    style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100">
                            <h2 className="text-2xl font-black text-gray-900 mb-10 leading-tight">
                                {questions[currentQuestionIdx].question}
                            </h2>

                            {questions[currentQuestionIdx].type === 'text' ? (
                                <div className="space-y-6">
                                    <p className="text-sm font-bold text-gray-400 italic mb-4">
                                        {currentT.selfAssessNotice}
                                    </p>
                                    <textarea
                                        disabled={isAnswered}
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        placeholder="Scrie răspunsul aici..."
                                        className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-3xl outline-none font-bold text-lg focus:border-brand-200 transition-all min-h-[150px] resize-none"
                                    />
                                    {!isAnswered && (
                                        <button
                                            onClick={() => {
                                                const correct = isCloseEnough(userInput, questions[currentQuestionIdx]);

                                                setIsTextCorrect(correct);
                                                setIsAnswered(true);
                                                if (correct) setScore(score + 1);
                                            }}
                                            disabled={!userInput.trim()}
                                            className="w-full py-5 bg-brand-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-brand-100 hover:bg-brand-700 transition-all disabled:opacity-50"
                                        >
                                            {currentT.check}
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {(questions[currentQuestionIdx].options || []).map((option, idx) => {
                                        let variantClasses = "border-2 border-gray-100 hover:border-brand-200 text-gray-700";
                                        if (isAnswered) {
                                            if (idx === questions[currentQuestionIdx].correct) {
                                                variantClasses = "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-lg shadow-emerald-100";
                                            } else if (idx === selectedAnswer) {
                                                variantClasses = "border-red-500 bg-red-50 text-red-700";
                                            } else {
                                                variantClasses = "opacity-50 border-gray-100 text-gray-400";
                                            }
                                        }

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleAnswerClick(idx)}
                                                disabled={isAnswered}
                                                className={`w-full p-5 rounded-2xl text-left font-bold text-lg transition-all flex items-center justify-between group ${variantClasses}`}
                                            >
                                                <span>{option}</span>
                                                {isAnswered && idx === questions[currentQuestionIdx].correct && <Check size={20} className="text-emerald-500" />}
                                                {isAnswered && idx === selectedAnswer && idx !== questions[currentQuestionIdx].correct && <X size={20} className="text-red-500" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Explanation Feedback */}
                            {isAnswered && (
                                <div
                                    ref={explanationRef}
                                    className={`mt-10 p-8 rounded-[2rem] border-2 animate-in fade-in slide-in-from-top-4 duration-500 ${questions[currentQuestionIdx].type === 'text'
                                        ? (isTextCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100')
                                        : (selectedAnswer === questions[currentQuestionIdx].correct ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100')
                                        }`}>
                                    {questions[currentQuestionIdx].type === 'text' ? (
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 font-black text-2xl italic mb-4">
                                                {isTextCorrect ? (
                                                    <div className="flex items-center gap-3 text-emerald-600">
                                                        <CheckCircle2 size={32} />
                                                        {currentT.correct}
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-3 text-red-600">
                                                        <XCircle size={32} />
                                                        {currentT.wrong}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="grid gap-4">
                                                <div className="bg-white/60 p-5 rounded-2xl border border-white/50">
                                                    <p className="text-[10px] font-black uppercase text-gray-400 mb-1">{currentT.modelAnswer}</p>
                                                    <p className="font-bold text-gray-900 text-lg">{questions[currentQuestionIdx].correctAnswer}</p>
                                                </div>
                                                <div className="bg-white/40 p-5 rounded-2xl border border-white/30">
                                                    <p className="text-[10px] font-black uppercase text-gray-400 mb-1">{currentT.yourAnswer}</p>
                                                    <p className="font-bold text-gray-600 italic select-none">{userInput}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 mb-6">
                                            {selectedAnswer === questions[currentQuestionIdx].correct ? (
                                                <div className="flex items-center gap-3 text-emerald-600 font-black text-2xl italic">
                                                    <CheckCircle2 size={32} />
                                                    {currentT.correct}
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3 text-red-600 font-black text-2xl italic">
                                                    <XCircle size={32} />
                                                    {currentT.wrong}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50 mt-6">
                                        <p className="text-gray-400 font-extrabold text-[10px] uppercase tracking-widest mb-2">
                                            {currentT.explanation}
                                        </p>
                                        <p className="text-gray-800 font-bold italic text-lg leading-relaxed">
                                            {questions[currentQuestionIdx].explanation}
                                        </p>
                                    </div>

                                    <button
                                        onClick={nextQuestion}
                                        className="mt-8 w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-xl shadow-xl hover:bg-brand-600 transition-all flex items-center justify-center gap-2"
                                    >
                                        {currentQuestionIdx === questions.length - 1 ? currentT.finish : currentT.next}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Results Step */}
                {currentStep === 2 && (
                    <div className="bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-gray-100">
                        <div className="relative inline-block mb-10">
                            <div className="w-32 h-32 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-500">
                                <Award size={64} />
                            </div>
                            <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-2 rounded-full border-4 border-white">
                                <Check size={24} />
                            </div>
                        </div>

                        <h2 className="text-4xl font-black text-gray-900 mb-2">Felicitări!</h2>
                        <p className="text-xl text-gray-500 font-bold mb-8">
                            {currentT.score}: <span className="text-brand-600 text-3xl font-black">{score} / {questions.length}</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={restartQuiz}
                                className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                            >
                                <RefreshCcw size={18} />
                                {currentT.retry}
                            </button>
                            <Link
                                to="/"
                                className="px-8 py-4 bg-gray-900 text-white rounded-xl font-black hover:bg-brand-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-gray-200"
                            >
                                {currentT.back}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizPage;
