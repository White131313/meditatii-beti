import React from 'react';
import { Calendar, Clock, Video, Lock } from 'lucide-react';

const BookingSection = ({ lang = 'RO', isSubscribed = false }) => {
    const t = {
        RO: {
            title: "Rezervă Ședința Ta Privată",
            subtitle: "Ești abonat PREMIUM? Profită de ședința ta lunară de 2 ore direct cu Beatrice.",
            cta: "Programează Ședința",
            lockCta: "Deblochează cu Abonament",
            feature1: "2 Ore Intensive",
            feature2: "Feedback Personalizat",
            feature3: "Sesiune Online (Google Meet/Zoom)"
        },
        HU: {
            title: "Foglald le a Privát Konzultációdat",
            subtitle: "PREMIUM előfizető vagy? Használd ki a havi 2 órás személyes konzultációdat Beatricével.",
            cta: "Időpont Foglalása",
            lockCta: "Feloldás Előfizetéssel",
            feature1: "2 Intenzív Óra",
            feature2: "Személyre Szabott Visszajelzés",
            feature3: "Online Alkalom (Google Meet/Zoom)"
        }
    };

    const currentT = t[lang] || t['RO'];

    const handleBooking = () => {
        if (!isSubscribed) {
            document.getElementById('pricing-plan')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            const phone = "40757947933";
            const message = lang === 'RO'
                ? "Bună Beatrice! Sunt abonat PREMIUM pe site și aș dori să programăm ședința mea de 2 ore inclusă în abonament."
                : "Szia Beatrice! PREMIUM előfizető vagyok az oldalon, és szeretném lefoglalni a bérletben foglalt 2 órás konzultációmat.";

            const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }
    };

    return (
        <section className="py-12 lg:py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative p-1 bg-gradient-to-r from-brand-200 via-emerald-200 to-blue-200 rounded-[2rem] lg:rounded-[3rem]">
                    <div className="bg-white rounded-[1.9rem] lg:rounded-[2.9rem] p-6 sm:p-8 md:p-16 relative overflow-hidden">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

                        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                            <div>
                                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 mb-4 lg:mb-6 leading-tight">
                                    {currentT.title}
                                </h2>
                                <p className="text-base sm:text-lg lg:text-xl text-gray-500 font-medium mb-6 lg:mb-10 leading-relaxed">
                                    {currentT.subtitle}
                                </p>

                                <div className="space-y-4 lg:space-y-6 mb-6 lg:mb-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600">
                                            <Clock size={24} />
                                        </div>
                                        <span className="text-lg font-bold text-gray-700">{currentT.feature1}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                                            <Calendar size={24} />
                                        </div>
                                        <span className="text-lg font-bold text-gray-700">{currentT.feature2}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                            <Video size={24} />
                                        </div>
                                        <span className="text-lg font-bold text-gray-700">{currentT.feature3}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleBooking}
                                    className={`w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 ${isSubscribed
                                        ? 'bg-gray-900 text-white hover:bg-brand-600 shadow-gray-200 hover:shadow-brand-500/40'
                                        : 'bg-white text-gray-400 border-2 border-gray-100 hover:border-brand-200 hover:text-brand-600'
                                        }`}
                                >
                                    {isSubscribed ? <Calendar size={20} /> : <Lock size={18} />}
                                    {isSubscribed ? currentT.cta : currentT.lockCta}
                                </button>
                            </div>

                            <div className="relative group hidden lg:block">
                                <div className="absolute -inset-4 bg-gradient-to-tr from-brand-100 to-emerald-50 rounded-[2.5rem] blur-2xl opacity-50"></div>
                                <div className="relative aspect-square rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl">
                                    <img
                                        src="/profile.jpg"
                                        alt="Ședință online de meditații la limba română cu Beatrice"
                                        className="w-full h-full object-cover"
                                    />
                                    {!isSubscribed && (
                                        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px] flex items-center justify-center">
                                            <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl text-center scale-90 sm:scale-100">
                                                <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 mx-auto mb-4">
                                                    <Lock size={32} />
                                                </div>
                                                <p className="font-black text-gray-900 text-lg uppercase tracking-wider">Premium Only</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookingSection;
