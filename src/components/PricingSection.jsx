import React from 'react';
import { Check, Zap } from 'lucide-react';

const PricingSection = ({ lang = 'RO', user }) => {
    const t = {
        RO: {
            title: "Acces Nelimitat la Educație",
            price: "49 RON",
            period: "/ lună",
            cta: "Activează Abonamentul",
            benefits: [
                "1 Ședință de 2h/lună inclusă",
                "Acces la toate cursurile și materialele",
                "Fișe de lucru nelimitate",
                "Exerciții noi săptămânal",
                "Acces prioritar la materiale de examen",
                "Suport direct cu Beatrice"
            ],
            guarantee: "Poți anula oricând."
        },
        HU: {
            title: "Korlátlan Hozzáférés a Tanuláshoz",
            price: "49 RON",
            period: "/ hónap",
            cta: "Előfizetés Aktiválása",
            benefits: [
                "Havi 1 alkalommal 2 órás konzultáció",
                "Hozzáférés az összes tanfolyamhoz și anyaghoz",
                "Korlátlan munkalap letöltés",
                "Új feladatok hetente",
                "Elsőbbségi hozzáférés vizsgaanyagokhoz",
                "Közvetlen segítség Beatricétől"
            ],
            guarantee: "Bármikor lemondható."
        }
    };

    const currentT = t[lang] || t['RO'];

    const handleSubscribe = () => {
        if (!user) {
            alert(lang === 'RO' ? "Te rugăm să te loghezi înainte de a activa abonamentul." : "Kérjük, jelentkezzen be az előfizetés aktiválása előtt.");
            return;
        }

        // Dynamic Stripe link with client_reference_id (Your user's ID)
        const stripeBaseLink = "https://buy.stripe.com/fZu9AM0bF2P0cGy7pqffy00";
        const stripeLink = `${stripeBaseLink}?client_reference_id=${user.id}`;

        window.open(stripeLink, '_blank');
    };

    return (
        <section id="pricing-plan" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gray-900 skew-y-3 transform origin-bottom-left -z-10 translate-y-24"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-brand-600 to-emerald-600 rounded-[3rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold mb-6 border border-white/10">
                                <Zap size={16} className="text-yellow-300 fill-current" />
                                <span>Premium</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                                {currentT.title}
                            </h2>

                            <div className="flex items-baseline gap-2 mb-8">
                                <span className="text-6xl font-black tracking-tighter">{currentT.price}</span>
                                <span className="text-xl text-brand-100 font-medium">{currentT.period}</span>
                            </div>

                            <button
                                onClick={handleSubscribe}
                                className="w-full sm:w-auto px-10 py-5 bg-white text-brand-700 rounded-2xl font-black text-lg hover:bg-brand-50 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
                            >
                                <span>{currentT.cta}</span>
                                <Zap size={18} className="text-yellow-400 fill-current group-hover:scale-110 transition-transform" />
                            </button>
                            <p className="mt-6 text-sm text-brand-100 font-medium opacity-80 text-center sm:text-left underline decoration-brand-400 decoration-2 underline-offset-4">
                                {currentT.guarantee}
                            </p>
                        </div>

                        <div className="bg-black/20 backdrop-blur-sm rounded-[2rem] p-8 border border-white/10">
                            <ul className="space-y-4">
                                {currentT.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-4">
                                        <div className="p-1 bg-emerald-400 rounded-full mt-1 shrink-0">
                                            <Check size={12} className="text-emerald-900 stroke-[3]" />
                                        </div>
                                        <span className="font-bold text-lg leading-tight">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
