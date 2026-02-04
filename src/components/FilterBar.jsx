import React from 'react';
import { MessageCircle, GraduationCap, ClipboardList, Sparkles } from 'lucide-react';

const FilterBar = ({ activeCategory, setActiveCategory, lang }) => {
    const t = {
        RO: {
            adults_communication: {
                title: 'Comunicare Adulți',
                desc: 'Conversație Hungarian -> Română'
            },
            gymnasium_curriculum: {
                title: 'Materie V-VIII',
                desc: 'Gramatică, teorie și exerciții'
            },
            national_exam_prep: {
                title: 'Evaluare Națională',
                desc: 'Simulări și pregătire intensivă'
            },
            practice_exercises: {
                title: 'Exersează',
                desc: 'Quiz-uri AI din materialele tale'
            }
        },
        HU: {
            adults_communication: {
                title: 'Felnőtt Kommunikáció',
                desc: 'Társalgás Magyar -> Román'
            },
            gymnasium_curriculum: {
                title: 'Tananyag V-VIII',
                desc: 'Nyelvtan, elmélet és gyakorlatok'
            },
            national_exam_prep: {
                title: 'Nemzeti Értékelő',
                desc: 'Szimulációk és intenzív felkészülés'
            },
            practice_exercises: {
                title: 'Gyakorlat',
                desc: 'AI kvízek a saját anyagokból'
            }
        }
    };

    const currentT = t[lang] || t['RO'];

    const pillars = [
        {
            id: 'adults_communication',
            icon: MessageCircle,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            border: 'border-emerald-100',
            activeBg: 'bg-emerald-600'
        },
        {
            id: 'gymnasium_curriculum',
            icon: GraduationCap,
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            border: 'border-orange-100',
            activeBg: 'bg-orange-600'
        },
        {
            id: 'national_exam_prep',
            icon: ClipboardList,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-100',
            activeBg: 'bg-blue-600'
        },
        {
            id: 'practice_exercises',
            icon: Sparkles,
            color: 'text-brand-600',
            bg: 'bg-brand-50',
            border: 'border-brand-100',
            activeBg: 'bg-brand-600'
        }
    ];

    return (
        <div id="selection-area" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 scroll-mt-32">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {pillars.map((pillar) => (
                    <button
                        key={pillar.id}
                        onClick={() => {
                            setActiveCategory(pillar.id);
                            setTimeout(() => {
                                document.getElementById('materials-grid')?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }, 100);
                        }}
                        className={`relative group p-8 rounded-[2.5rem] border-2 transition-all duration-500 ease-in-out text-left overflow-hidden ${activeCategory === pillar.id
                            ? `${pillar.border} bg-white shadow-[0_20px_40px_rgba(0,0,0,0.08)] scale-[1.02]`
                            : 'border-transparent bg-gray-50/50 hover:bg-white hover:border-gray-100'
                            }`}
                    >
                        {/* Status Dot */}
                        <div className={`absolute top-6 right-6 w-3 h-3 rounded-full transition-transform duration-500 ease-in-out scale-0 ${pillar.activeBg} ${activeCategory === pillar.id ? 'scale-100' : ''
                            }`}></div>

                        <div className={`w-16 h-16 rounded-2xl ${pillar.bg} flex items-center justify-center mb-6 transition-transform duration-500 ease-in-out group-hover:scale-110`}>
                            <pillar.icon className={`${pillar.color}`} size={32} />
                        </div>

                        <h3 className={`text-2xl font-black mb-2 transition-colors duration-500 ease-in-out ${activeCategory === pillar.id ? 'text-gray-900' : 'text-gray-600'
                            }`}>
                            {currentT[pillar.id].title}
                        </h3>

                        <p className={`font-medium transition-colors duration-500 ease-in-out ${activeCategory === pillar.id ? 'text-gray-500' : 'text-gray-400'
                            }`}>
                            {currentT[pillar.id].desc}
                        </p>

                        {/* Hover Accent */}
                        <div className={`absolute bottom-0 left-0 h-1.5 w-full origin-left transition-transform duration-500 ease-in-out ${pillar.activeBg} ${activeCategory === pillar.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-[0.33]'
                            }`}></div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterBar;
