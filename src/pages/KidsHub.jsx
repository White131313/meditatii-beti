import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Puzzle, Sparkles, ArrowRight, Search, Lock, Mic } from 'lucide-react';

const KidsHub = ({ lang = 'RO', isSubscribed = false }) => {
    const navigate = useNavigate();

    const t = {
        RO: {
            hero: "Salut! Hai să ne jucăm!",
            subtitle: "Alege un joc și începe aventura!",
            game1Title: "Propoziții",
            game1Desc: "Pune cuvintele în ordinea corectă!",
            game2Title: "Găsește Intrusul",
            game2Desc: "Care cuvânt nu se potrivește? Fii detectiv!",
            game3Title: "Adevărat sau Fals? ⏱️",
            game3Desc: "Ai 10 secunde! Este corect sau nu?",
            game4Title: "Un sau O? 🔴🔵",
            game4Desc: "Potrivește cuvântul cu articolul corect!",
            game5Title: "Spune în Română! 🎤",
            game5Desc: "Vezi cuvântul, spune-l cu voce tare!",
            play: "Joacă Acum",
            locked: "Joc Premium (Pro)",
            comingSoon: "În curând mai multe jocuri..."
        },
        HU: {
            hero: "Szia! Játsszunk együtt!",
            subtitle: "Válassz egy játékot és vágj bele!",
            game1Title: "Mondatok",
            game1Desc: "Rakd a szavakat helyes sorrendbe!",
            game2Title: "Keresd a Betolakodót",
            game2Desc: "Melyik szó nem illik ide? Légy detektív!",
            game3Title: "Igaz vagy Hamis? ⏱️",
            game3Desc: "10 másodperced van! Igaz vagy sem?",
            game4Title: "Un vagy O? 🔴🔵",
            game4Desc: "Válaszd ki a helyes névelőt a szóhoz!",
            game5Title: "Mondd Románul! 🎤",
            game5Desc: "Nézd meg a szót, mondd ki hangosan!",
            play: "Játssz most",
            locked: "Prémium Játék (Pro)",
            comingSoon: "Hamarosan még több játék..."
        }
    };

    const currentT = t[lang] || t['RO'];

    const games = [
        {
            id: 'article-match',
            title: currentT.game4Title,
            description: currentT.game4Desc,
            icon: Puzzle,
            color: 'from-blue-500 to-red-500',
            path: '/copii/articole',
            available: true,
            isFree: true
        },
        {
            id: 'sentence-builder',
            title: currentT.game1Title,
            description: currentT.game1Desc,
            icon: Puzzle,
            color: 'from-orange-400 to-orange-500',
            path: '/copii/propozitii',
            available: true,
            isFree: true
        },
        {
            id: 'voice-speak',
            title: currentT.game5Title,
            description: currentT.game5Desc,
            icon: Mic,
            color: 'from-purple-500 to-pink-500',
            path: '/copii/vorbeste',
            available: true,
            isFree: true
        },
        {
            id: 'word-detective',
            title: currentT.game2Title,
            description: currentT.game2Desc,
            icon: Search,
            color: 'from-purple-400 to-indigo-500',
            path: '/copii/intrusul',
            available: true,
            isFree: false
        },
        {
            id: 'true-false',
            title: currentT.game3Title,
            description: currentT.game3Desc,
            icon: Sparkles,
            color: 'from-green-400 to-emerald-500',
            path: '/copii/adevarat-fals',
            available: true,
            isFree: false
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-blue-50 pt-24 pb-12 font-kids overflow-x-hidden">
            {/* Optimized Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                <div className="absolute top-[10%] left-[-10%] w-64 h-64 bg-yellow-200 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-[40%] right-[-10%] w-72 h-72 bg-blue-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Hero Section - Scaled for screens */}
                <div className="text-center mb-10 sm:mb-20">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Sparkles className="text-orange-400 animate-pulse" size={24} />
                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">Zona Copii</span>
                        <Sparkles className="text-blue-400 animate-pulse" size={24} />
                    </div>

                    <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black text-gray-800 mb-6 leading-[1.1] tracking-tight">
                        {currentT.hero}
                    </h1>

                    <p className="text-lg sm:text-3xl text-gray-400 font-bold max-w-2xl mx-auto px-4">
                        {currentT.subtitle}
                    </p>
                </div>

                {/* Games Grid - Responsive: 1 col mobile, 2 col tablet, 4 col desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 mb-10 sm:mb-12">
                    {games.map((game) => {
                        const Icon = game.icon;
                        const hasAccess = game.isFree || isSubscribed;
                        return (
                            <div
                                key={game.id}
                                onClick={() => {
                                    if (hasAccess) {
                                        navigate(game.path);
                                    } else {
                                        window.location.href = '/#pricing-plan';
                                    }
                                }}
                                className={`h-full flex flex-col group relative bg-white rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-b-6 border-gray-100 active:border-b-0 active:translate-y-1 ${!hasAccess && 'opacity-95'}`}
                            >
                                {/* Lock Badge */}
                                {!hasAccess && (
                                    <div className="absolute top-6 right-6 z-20 w-10 h-10 bg-gray-900/90 backdrop-blur-md rounded-xl flex items-center justify-center text-white shadow-xl transform rotate-6 border border-white/20">
                                        <Lock size={20} strokeWidth={2.5} />
                                    </div>
                                )}

                                {/* Icon Container */}
                                <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-4 sm:mb-5 lg:mb-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${hasAccess ? game.color : 'from-gray-400 to-gray-500'} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                                    <Icon size={32} className="text-white sm:w-10 sm:h-10 lg:w-12 lg:h-12" strokeWidth={2.5} />
                                </div>

                                {/* Content */}
                                <div className="text-center flex-1 flex flex-col items-center">
                                    <h3 className="text-xl sm:text-2xl lg:text-2xl font-black text-gray-800 mb-2 sm:mb-3 leading-tight">
                                        {game.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm lg:text-base text-gray-500 font-bold mb-4 sm:mb-5 leading-relaxed flex-1">
                                        {game.description}
                                    </p>

                                    {/* Action Button */}
                                    <div className="w-full flex justify-center">
                                        <div className={`inline-flex items-center gap-1.5 px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r ${hasAccess ? game.color : 'from-gray-800 to-black'} text-white rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm lg:text-base shadow-lg transform group-hover:scale-105 transition-all`}>
                                            {hasAccess ? (
                                                <>
                                                    <span>{currentT.play}</span>
                                                    <ArrowRight size={14} className="group-hover:translate-x-1 sm:w-4 sm:h-4 lg:w-5 lg:h-5 transition-transform" />
                                                </>
                                            ) : (
                                                <>
                                                    <Lock size={14} className="sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                                                    <span>{currentT.locked}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Coming Soon - Compact */}
                <div className="text-center pb-4 sm:pb-6">
                    <p className="text-[10px] sm:text-xs font-black text-gray-300 uppercase tracking-widest bg-white/50 inline-block px-4 py-2 rounded-full">
                        🚀 {currentT.comingSoon}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default KidsHub;
