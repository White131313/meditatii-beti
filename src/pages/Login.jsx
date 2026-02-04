import React from 'react';
import { signInWithGoogle } from '../lib/auth';
import { Chrome, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const Login = ({ lang = 'RO' }) => {
    const t = {
        RO: {
            title: "Bine ai revenit!",
            subtitle: "Loghează-te pentru a accesa materialele tale și jocurile premium.",
            button: "Continuă cu Google",
            noAccount: "Nu ai cont? Se creează automat la prima logare."
        },
        HU: {
            title: "Üdvözöllek újra!",
            subtitle: "Jelentkezz be a tananyagok és a prémium játékok eléréséhez.",
            button: "Folytatás Google-lal",
            noAccount: "Nincs fiókod? Az első bejelentkezéskor automatikusan létrejön."
        }
    };

    const currentT = t[lang] || t['RO'];

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-gray-200 border border-gray-100 relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2"></div>

                <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-8 shadow-lg shadow-brand-100">
                    <ShieldCheck size={32} />
                </div>

                <h1 className="text-3xl font-black text-gray-900 mb-4">{currentT.title}</h1>
                <p className="text-gray-500 font-bold mb-10 leading-relaxed">
                    {currentT.subtitle}
                </p>

                <button
                    onClick={() => signInWithGoogle()}
                    className="w-full flex items-center justify-center gap-4 py-5 px-6 bg-white border-2 border-gray-100 rounded-2xl font-black text-gray-800 hover:bg-gray-50 hover:border-gray-200 transition-all shadow-sm active:scale-95 group"
                >
                    <div className="bg-white p-1 rounded-md shadow-sm border border-gray-50">
                        <Chrome size={20} className="text-red-500" />
                    </div>
                    <span>{currentT.button}</span>
                    <ArrowRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="mt-10 pt-8 border-t border-gray-50">
                    <div className="flex items-center justify-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest">
                        <Sparkles size={14} className="text-brand-500" />
                        <span>{currentT.noAccount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
