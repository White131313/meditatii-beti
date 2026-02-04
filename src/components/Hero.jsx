import React from 'react';
import { ArrowRight, Star, Shield, Users } from 'lucide-react';

const Hero = ({ lang = 'RO' }) => {
    const t = {
        RO: {
            titleLine1: "Învață româna",
            titleLine2: "logic, pe limba ta.",
            subtitle: "Meditații și materiale explicate cu răbdare, special concepute pentru vorbitorii de limba maghiară. Eliminăm împreună barierele lingvistice.",
            startNow: "Începe Acum",
            seeMaterials: "Vezi Materialele",
            badgeLeft: "Explicații în Maghiară & Română",
            badgeRight: "Pregătire Intensivă Evaluare",
            teacherLabel: "Mentor Dedicat"
        },
        HU: {
            titleLine1: "Tanulj románul",
            titleLine2: "logikusan, az anyanyelveden.",
            subtitle: "Türelemmel magyarázott anyagok és korrepetálás, kifejezetten magyar anyanyelvűek számára. Együtt lebontjuk a nyelvi akadályokat.",
            startNow: "Kezdés Most",
            seeMaterials: "Anyagok Megtekintése",
            badgeLeft: "Magyarázatok Magyarul & Románul",
            badgeRight: "Intenzív Felkészülés a Vizsgára",
            teacherLabel: "Elkötelezett Mentor"
        }
    };

    const currentT = t[lang] || t['RO'];

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#fafbfc]">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-100/40 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div className="relative z-10">
                        {/* Space saved by removing badge */}

                        <h1 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] mb-8">
                            {currentT.titleLine1} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-500">
                                {currentT.titleLine2}
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                            {currentT.subtitle}
                        </p>

                        <div className="flex flex-wrap gap-4 mb-12">
                            <button
                                onClick={() => document.getElementById('pricing-plan')?.scrollIntoView({ behavior: 'smooth' })}
                                className="group relative px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-brand-600 transition-all duration-300 shadow-2xl shadow-gray-200 hover:shadow-brand-500/40 flex items-center gap-2 overflow-hidden"
                            >
                                <span className="relative z-10">{currentT.startNow}</span>
                                <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            <button
                                onClick={() => document.getElementById('selection-area')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-100 rounded-2xl font-bold text-lg hover:border-brand-200 hover:bg-brand-50/30 transition-all duration-300 shadow-sm"
                            >
                                {currentT.seeMaterials}
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 py-6 border-t border-gray-100">
                            <div className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
                                <Shield size={18} className="text-brand-500" />
                                <span>{currentT.badgeLeft}</span>
                            </div>
                            <div className="hidden sm:block w-px h-6 bg-gray-200"></div>
                            <div className="flex items-center gap-2 text-sm font-bold text-gray-500 uppercase tracking-wider">
                                <Users size={18} className="text-brand-500" />
                                <span>{currentT.badgeRight}</span>
                            </div>
                        </div>
                    </div>

                    {/* Premium Image Container */}
                    <div className="relative group lg:ml-auto">
                        <div className="relative">
                            {/* Animated Frames */}
                            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-100 to-blue-50 rounded-[2.5rem] -z-10 blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <div className="relative rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border-8 border-white group-hover:scale-[1.02] transition-transform duration-700 ease-out max-w-[500px]">
                                <img
                                    src="/profile.jpg"
                                    alt="Profesoara B. Beatrice"
                                    className="w-full aspect-[4/5] object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                                />

                                {/* Floating Info Card */}
                                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-bold text-brand-600 mb-0.5">{currentT.teacherLabel}</p>
                                            <h3 className="text-xl font-black text-gray-900">B. Beatrice</h3>
                                        </div>
                                        <div className="flex gap-1 text-brand-500">
                                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-current" />)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Geometric Accents */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-500/10 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
