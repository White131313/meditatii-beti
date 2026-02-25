import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Search, X } from 'lucide-react';
import Hero from '../components/Hero';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';
import BookingSection from '../components/BookingSection';
import PricingSection from '../components/PricingSection';

const Home = ({
    lang,
    user,
    currentT,
    activeCategory,
    setActiveCategory,
    filteredMaterials,
    isSubscribed,
    searchQuery,
    setSearchQuery
}) => {
    const location = useLocation();

    // Handle URL search params for category selection
    React.useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const categoryParam = searchParams.get('category');

        if (categoryParam) {
            setActiveCategory(categoryParam);
            // Wait for state update and render then scroll
            setTimeout(() => {
                const grid = document.getElementById('selection-area');
                if (grid) {
                    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 500);
        } else if (location.hash) {
            // Handle hash scrolling only if it's a direct navigation/refresh to a section
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 500);
            }
        }
    }, [location.search, location.hash]);

    return (
        <main>
            <Hero lang={lang} />

            <section className="py-10 lg:py-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-brand-50/50 rounded-full blur-[50px] md:blur-[100px] -z-10 translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 mb-8 lg:mb-16">
                        <div className="max-w-2xl">
                            <div className="inline-block px-4 py-1.5 bg-brand-50 rounded-full text-[10px] font-black tracking-widest text-brand-600 uppercase mb-4">
                                {currentT.digitalShop}
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-6xl font-black tracking-tighter text-gray-900 mb-4 lg:mb-6 leading-tight">
                                {currentT.titleMain} <span className="text-brand-600 underline decoration-brand-200 decoration-8 underline-offset-8">{currentT.titleSpan}</span>
                            </h2>
                            <p className="text-lg text-gray-500 max-w-xl font-medium">
                                {currentT.subtitle}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400">
                                        V{i}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-sm font-black text-gray-900 leading-none">100%</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{currentT.success}</span>
                            </div>
                        </div>
                    </div>

                    <FilterBar
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        lang={lang}
                    />

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-6 bg-brand-600 rounded-full"></div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">{currentT.latestMaterials}</h3>
                        </div>

                        {/* Premium Search Bar */}
                        <div className="relative w-full md:w-96 group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                <Search size={18} className="text-gray-400 group-focus-within:text-brand-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder={currentT.searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 bg-white border-2 border-gray-100 rounded-2xl text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/5 transition-all outline-none shadow-sm group-hover:shadow-md"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-brand-500 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                    </div>

                    <div id="materials-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 scroll-mt-32">
                        {filteredMaterials.slice(0, 4).map((material) => (
                            <ProductCard
                                key={material.id}
                                material={material}
                                lang={lang}
                                user={user}
                                isSubscribed={isSubscribed}
                            />
                        ))}
                    </div>

                    {filteredMaterials.length > 4 && (
                        <div className="mt-16 text-center">
                            <Link
                                to={`/course/${activeCategory}`}
                                className="inline-flex items-center gap-3 px-10 py-5 bg-white border-2 border-gray-100 text-gray-900 rounded-[2rem] font-black text-sm hover:bg-gray-50 hover:border-brand-200 transition-all shadow-xl shadow-gray-100 group"
                            >
                                <span>{currentT.viewAll}</span>
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    )}

                    {filteredMaterials.length === 0 && (
                        <div className="text-center py-32 rounded-[3.5rem] bg-gray-50/50 border-2 border-dashed border-gray-100">
                            <div className="inline-flex p-5 bg-white rounded-[2rem] shadow-sm mb-6">
                                <span className="text-4xl">{searchQuery ? '🔍' : '📚'}</span>
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 mb-2">
                                {searchQuery ? currentT.noResultsSearch : currentT.workingOn}
                            </h3>
                            <p className="text-gray-500 font-medium mb-8 max-w-xs mx-auto">
                                {searchQuery ? "" : currentT.comingSoon}
                            </p>
                            {searchQuery ? (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="px-8 py-3 bg-brand-600 text-white rounded-2xl font-black text-sm hover:bg-brand-700 transition-all shadow-xl shadow-brand-200"
                                >
                                    {currentT.allCategories}
                                </button>
                            ) : (
                                <button
                                    onClick={() => setActiveCategory('adults_communication')}
                                    className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-brand-600 transition-all shadow-xl shadow-gray-200"
                                >
                                    {currentT.seeAvailable}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <BookingSection lang={lang} isSubscribed={isSubscribed} />
            {!isSubscribed && <PricingSection lang={lang} user={user} />}
        </main>
    );
};

export default Home;
