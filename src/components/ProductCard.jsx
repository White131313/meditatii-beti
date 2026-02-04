import React from 'react';
import { Download, Lock, Star, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ material, lang = 'RO', isSubscribed = false, user }) => {
    const navigate = useNavigate();

    const t = {
        RO: {
            demo: "Vezi Demo (Gratis)",
            unlock: "Material complet (Pro)",
            openCourse: "Intră în Curs",
            studentReady: "Gata de studiu",
            freeBadge: "Demo Gratuit"
        },
        HU: {
            demo: "Demo Megtekintése",
            unlock: "Teljes anyag (Pro)",
            openCourse: "Belépés a Kurzusba",
            studentReady: "Tanulásra kész",
            freeBadge: "Ingyenes Demo"
        }
    };

    const currentT = t[lang] || t['RO'];
    const ADMIN_EMAILS = ['bernad.beatrice23@gmail.com', 'bernad.beatrice23@gamil.com', 'cristian.balasa@gmail.com', 'balancionchrys13@gmail.com'];
    const canAccess = isSubscribed || (user && ADMIN_EMAILS.includes(user.email));

    const handleUnlockClick = () => {
        // If it's a Pro material and user can't access, scroll to pricing
        if (!material.demo_file_url && !canAccess) {
            const pricingSection = document.getElementById('pricing-plan');
            if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.location.href = '/#pricing-plan';
            }
            return;
        }

        // Otherwise, navigate to the dedicated course page
        navigate(`/course/${material.category}`);
    };

    return (
        <div
            onClick={handleUnlockClick}
            className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg shadow-gray-100 border border-gray-100 hover:shadow-2xl hover:shadow-brand-100/50 hover:-translate-y-2 transition-all duration-500 ease-in-out flex flex-col h-full cursor-pointer"
        >
            {/* Image Section */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={material.thumbnail_url || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800'}
                    alt={material.title}
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="w-fit px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-gray-900 uppercase tracking-widest shadow-sm">
                        {currentT.studentReady}
                    </span>
                    {material.demo_file_url && (
                        <span className="w-fit px-3 py-1.5 bg-emerald-500/90 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                            {currentT.freeBadge}
                        </span>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                    <span className="text-[10px] font-black text-gray-400 ml-1 uppercase tracking-tighter">Premium Content</span>
                </div>

                <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight group-hover:text-brand-600 transition-colors">
                    {lang === 'HU' && material.title_hu ? material.title_hu : material.title}
                </h3>

                <p className="text-gray-500 text-sm font-medium mb-6 line-clamp-2">
                    {(lang === 'HU' && material.description_hu ? material.description_hu : material.description) || "Material special conceput pentru a învăța limba română prin logică și structură simplă."}
                </p>

                {/* Actions */}
                <div className="mt-auto">
                    {material.demo_file_url ? (
                        <a
                            href={material.demo_file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs sm:text-[13px] hover:bg-emerald-700 transition-all duration-300 shadow-xl shadow-emerald-100 flex items-center justify-center gap-2 group/btn px-8"
                        >
                            <Download size={18} className="shrink-0" />
                            <span>{currentT.demo}</span>
                        </a>
                    ) : (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleUnlockClick();
                            }}
                            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-xs sm:text-[13px] hover:bg-brand-600 transition-all duration-300 shadow-xl shadow-gray-200 flex items-center justify-center gap-2 group/btn px-8"
                        >
                            {canAccess ? (
                                <>
                                    <span>{currentT.openCourse}</span>
                                    <ChevronRight size={18} className="shrink-0 group-hover/btn:translate-x-1 transition-transform" />
                                </>
                            ) : (
                                <>
                                    <Lock size={16} className="shrink-0" />
                                    <span>{currentT.unlock}</span>
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
