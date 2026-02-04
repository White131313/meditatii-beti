import React, { useState } from 'react';
import { Mail, Send, CheckCircle, MessageSquare } from 'lucide-react';

const Contact = ({ lang = 'RO' }) => {
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const t = {
        RO: {
            hero: "Contactează-ne",
            subtitle: "Suntem aici să te ajutăm. Trimite-ne un mesaj și îți vom răspunde cât mai curând posibil.",
            name: "Nume Complet",
            email: "Adresa de Email",
            message: "Mesajul Tău",
            send: "Trimite Mesaj",
            sending: "Se trimite...",
            success: "Mesaj trimis cu succes! Te vom contacta în curând.",
            supportEmail: "Suport Email:",
            emailAddress: "bernad.beatrice23@gmail.com"
        },
        HU: {
            hero: "Kapcsolat",
            subtitle: "Itt vagyunk, hogy segítsünk. Küldj nekünk üzenetet, és a lehető leghamarabb válaszolunk.",
            name: "Teljes Név",
            email: "Email Cím",
            message: "Üzeneted",
            send: "Üzenet Küldése",
            sending: "Küldés...",
            success: "Üzenet sikeresen elküldve! Hamarosan felvesszük veled a kapcsolatot.",
            supportEmail: "Email Támogatás:",
            emailAddress: "bernad.beatrice23@gmail.com"
        }
    };

    const currentT = t[lang] || t['RO'];

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate sending
        setTimeout(() => {
            setLoading(false);
            setSent(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">{currentT.hero}</h1>
                    <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
                        {currentT.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-gray-200/50">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-gray-900">{currentT.supportEmail}</h3>
                                <p className="text-brand-600 font-bold">{currentT.emailAddress}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-gray-900">Social Media</h3>
                                <p className="text-gray-500 font-bold">Facebook & Instagram</p>
                            </div>
                        </div>

                        <div className="mt-12 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-4">Motto</p>
                            <p className="text-gray-600 font-black italic text-xl">
                                "Limba română nu este o barieră, ci un pod. Hai să-l construim împreună."
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-[3rem] p-10 shadow-xl shadow-gray-200/50 border border-brand-50">
                        {sent ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-10">
                                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                    <CheckCircle size={40} />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-4">{currentT.success}</h3>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2 px-2">
                                        {currentT.name}
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Popescu Andrei"
                                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2 px-2">
                                        {currentT.email}
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="andrei@email.com"
                                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-black text-gray-700 uppercase tracking-widest mb-2 px-2">
                                        {currentT.message}
                                    </label>
                                    <textarea
                                        required
                                        rows="4"
                                        placeholder="..."
                                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-brand-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-900 resize-none"
                                    />
                                </div>

                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-lg hover:bg-brand-600 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {loading ? currentT.sending : currentT.send}
                                    <Send size={20} />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
