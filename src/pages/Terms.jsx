import React from 'react';

const Terms = ({ lang = 'RO' }) => {
    return (
        <div className="min-h-screen bg-white pt-32 pb-20 px-6 sm:px-12">
            <div className="max-w-3xl mx-auto prose prose-brand">
                <h1 className="text-4xl font-black text-gray-900 mb-8">Termeni și Condiții</h1>
                <p className="text-gray-500 font-medium">Ultima actualizare: 04 Februarie 2026</p>

                <section className="mt-12 space-y-6">
                    <h2 className="text-2xl font-black text-gray-800">1. Acceptarea Termenilor</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Prin accesarea și utilizarea site-ului Vorbim-Romaneste.ro, sunteți de acord să respectați acești termeni și condiții. Dacă nu sunteți de acord cu orice parte a acestor termeni, vă rugăm să nu utilizați serviciile noastre.
                    </p>

                    <h2 className="text-2xl font-black text-gray-800">2. Descrierea Serviciilor</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Vorbim-Romaneste.ro oferă materiale educaționale digitale sub formă de fișiere PDF, exerciții interactive și jocuri educaționale pentru învățarea limbii române.
                    </p>

                    <h2 className="text-2xl font-black text-gray-800">3. Proprietate Intelectuală</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Toate materialele descărcate sau vizualizate pe acest site sunt proprietatea intelectuală a Vorbim-Romaneste.ro. Utilizarea acestora este permisă doar în scop personal și educațional. Redistribuirea, revânzarea sau utilizarea comercială este strict interzisă fără acordul scris al autorului.
                    </p>

                    <h2 className="text-2xl font-black text-gray-800">4. Plăți și Abonamente</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Accesul la conținutul Premium se face pe bază de abonament plătit prin procesatorul Stripe. După confirmarea plății, accesul la materiale devine instantaneu.
                    </p>

                    <h2 className="text-2xl font-black text-gray-800">5. Politica de Rambursare</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Deoarece oferim produse digitale cu acces instantaneu, nu putem oferi rambursări după ce conținutul a fost accesat sau descărcat. Vă rugăm să utilizați materialele gratuite (Demo) înainte de a achiziționa un abonament.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Terms;
