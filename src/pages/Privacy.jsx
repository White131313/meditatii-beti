import React from 'react';

const Privacy = ({ lang = 'RO' }) => {
    return (
        <div className="min-h-screen bg-white pt-32 pb-20 px-6 sm:px-12">
            <div className="max-w-3xl mx-auto prose prose-brand">
                <h1 className="text-4xl font-black text-gray-900 mb-8">Politica de Confidențialitate</h1>
                <p className="text-gray-500 font-medium">Ultima actualizare: 04 Februarie 2026</p>

                <section className="mt-12 space-y-6">
                    <h2 className="text-2xl font-black text-gray-800">1. Datele Colectate</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Colectăm adresa de email și numele dumneavoastră atunci când vă autentificați prin Google Login. Aceste date sunt necesare pentru a vă oferi acces la conținutul achiziționat și pentru a vă salva progresul.
                    </p>

                    <h2 className="text-2xl font-black text-gray-800">2. Utilizarea Datelor</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Datele dumneavoastră nu sunt vândute către terți. Le utilizăm exclusiv pentru:
                        <ul className="list-disc pl-6 mt-2">
                            <li>Autentificarea în contul dumneavoastră</li>
                            <li>Gestionarea abonamentelor prin Stripe</li>
                            <li>Comunicări importante privind serviciile noastre</li>
                        </ul>
                    </p>

                    <h2 className="text-2xl font-black text-gray-800">3. Securitatea Datelor</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Folosim servicii securizate (Supabase, Stripe, Vercel) pentru a ne asigura că informațiile dumneavoastră sunt protejate conform standardelor actuale de securitate.
                    </p>

                    <h2 className="text-2xl font-black text-gray-800">4. Drepturile Dumneavoastră</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Aveți dreptul de a solicita ștergerea contului și a datelor asociate în orice moment trimitând un email la adresa de contact.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
