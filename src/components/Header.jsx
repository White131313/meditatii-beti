import React, { useState, useEffect } from 'react';
import { User, Menu, X, ChevronRight, Globe, LogOut, Settings } from 'lucide-react';
import { signInWithGoogle, signOut } from '../lib/auth';
import { Link } from 'react-router-dom';
import { BILLING_URL } from '../lib/payments';

const ADMIN_EMAILS = ['bernad.beatrice23@gmail.com', 'bernad.beatrice23@gamil.com', 'cristian.balasa@gmail.com', 'balancionchrys13@gmail.com'];

const Header = ({ lang, setLang, user }) => {
    const isAdmin = user && ADMIN_EMAILS.includes(user.email);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const t = {
        RO: {
            nav1: 'Comunicare Adulți',
            nav2: 'Materie V-VIII',
            nav3: 'Evaluare Națională',
            nav5: 'Exersează',
            nav4: 'Contact',
            login: 'Inregistrare / Logare',
            logout: 'Deconectare',
            auth: 'Autentificare',
            menuTitle: 'Meniu',
            kidsGames: 'Jocuri Copii 🎲',
            manageSub: 'Administrare Abonament'
        },
        HU: {
            nav1: 'Felnőtt Kommunikáció',
            nav2: 'Tananyag V-VIII',
            nav3: 'Nemzeti Értékelő',
            nav5: 'Gyakorlat',
            nav4: 'Kapcsolat',
            login: 'Regisztráció / Bejelentkezés',
            logout: 'Kijelentkezés',
            auth: 'Bejelentkezés',
            menuTitle: 'Menü',
            kidsGames: 'Gyerek Játékok 🎲',
            manageSub: 'Előfizetés Kezelése'
        }
    };

    const currentT = t[lang] || t['RO'];

    const navLinks = [
        { label: currentT.nav1, href: '/course/adults_communication' },
        { label: currentT.nav2, href: '/course/gymnasium_curriculum' },
        { label: currentT.nav3, href: '/course/national_exam_prep' },
        { label: currentT.nav5, href: '/course/practice_exercises' },
        { label: currentT.nav4, href: '/contact' }
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'py-2 sm:py-4' : 'py-4 sm:py-6'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`relative flex items-center justify-between gap-1 px-1.5 sm:px-4 rounded-[1.2rem] sm:rounded-[2rem] transition-all duration-500 ${isScrolled || isMenuOpen
                    ? 'bg-white/95 md:bg-white/90 md:backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/50'
                    : 'bg-transparent'
                    }`}>

                    {/* Modern Logo Section */}
                    <Link
                        to="/"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-1 sm:gap-3 group cursor-pointer shrink-0 mr-1 sm:mr-4 lg:mr-12"
                    >
                        <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
                            {/* Romania Tricolor Ring */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#002B7F] via-[#FCD116] to-[#CE1126] p-[2px] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg">
                                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                                    <span className="text-gray-900 font-black text-lg sm:text-xl tracking-tighter">VR</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col whitespace-nowrap overflow-hidden">
                            <span className="text-[10px] sm:text-lg min-[400px]:text-base xl:text-xl font-black text-gray-900 tracking-tighter leading-none flex items-center gap-0.5">
                                <span className="hidden min-[420px]:inline">Vorbim-</span>
                                <span className="inline-flex">
                                    <span className="text-[#002B7F]">Rom</span>
                                    <span className="text-[#FCD116]">ane</span>
                                    <span className="text-[#CE1126]">ste</span>
                                </span>
                                <span className="text-brand-600">.ro</span>
                            </span>
                            <span className="hidden sm:flex text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] leading-none mt-1.5 px-0.5 opacity-80">
                                Meditații & Resurse Logice
                            </span>
                        </div>
                    </Link>

                    {/* Premium Language Switcher - Moved Next to Logo */}
                    <div className="flex items-center p-0.5 sm:p-1 bg-gray-100 md:bg-gray-100/80 md:backdrop-blur-md rounded-lg border border-gray-200 shadow-inner mr-1 sm:mr-4 shrink-0">
                        <button
                            onClick={() => setLang('RO')}
                            className={`flex items-center justify-center px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-md text-[10px] sm:text-[11px] font-black transition-all duration-300 ${lang === 'RO'
                                ? 'bg-white text-brand-600 shadow-sm'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            RO
                        </button>
                        <button
                            onClick={() => setLang('HU')}
                            className={`flex items-center justify-center px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-md text-[10px] sm:text-[11px] font-black transition-all duration-300 ${lang === 'HU'
                                ? 'bg-white text-brand-600 shadow-sm'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            HU
                        </button>
                    </div>

                    {/* Desktop Nav - Extra Compact for Laptops */}
                    <nav className="hidden xl:flex items-center gap-1 min-[1300px]:gap-4 mr-auto shrink-1">
                        {navLinks.map((item) => (
                            <Link
                                key={item.label}
                                to={item.href}
                                className="text-[9px] min-[1300px]:text-[11px] font-black text-gray-500 hover:text-brand-600 transition-all relative group py-2 uppercase tracking-tight min-[1400px]:tracking-[0.1em] whitespace-nowrap px-1"
                            >
                                {item.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                        {/* Kids Zone - Restored to Nav */}
                        <Link
                            to="/copii"
                            className="hidden min-[1150px]:flex px-2 py-1.5 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-lg font-black text-[9px] xl:text-[10px] uppercase tracking-wide hover:shadow-lg transition-all border-2 border-orange-300 whitespace-nowrap ml-1"
                        >
                            <span className="xl:hidden">JOCURI</span>
                            <span className="hidden xl:inline">{currentT.kidsGames}</span>
                        </Link>
                    </nav>

                    {/* Actions Section - Optimized Spacing */}
                    <div className="flex items-center gap-1 xl:gap-2 ml-auto shrink-0">
                        {/* Premium Language Switcher */}


                        {/* Kids Zone - Dynamic sizing */}


                        {/* Login Button / User Profile - ALWAYS VISIBLE */}
                        {user ? (
                            <div className="flex items-center shrink-0">
                                {/* Dashboard Cluster - Compact on mobile */}
                                <div className="flex items-center gap-0.5 sm:gap-1.5 bg-white p-0.5 sm:p-1 rounded-full border border-gray-100 shadow-sm">
                                    {isAdmin && (
                                        <Link
                                            to="/admin"
                                            className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-all"
                                            title="Admin"
                                        >
                                            <Settings size={18} className="sm:w-5 sm:h-5" />
                                        </Link>
                                    )}

                                    <div className="relative">
                                        <button
                                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                            className="flex items-center gap-1 sm:gap-2 pl-0.5 sm:pl-1 pr-1 sm:pr-2 py-0.5 sm:py-1 bg-gray-50/50 rounded-full group cursor-pointer border border-transparent hover:border-brand-100 transition-all"
                                        >
                                            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 flex items-center justify-center bg-brand-50">
                                                {user.user_metadata?.avatar_url ? (
                                                    <img
                                                        src={user.user_metadata.avatar_url}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                                    />
                                                ) : null}
                                                <div className={`${user.user_metadata?.avatar_url ? 'hidden' : 'flex'} items-center justify-center text-brand-600`}>
                                                    <User size={14} className="sm:w-[18px] sm:h-[18px]" strokeWidth={3} />
                                                </div>
                                            </div>
                                            <ChevronRight size={14} className={`text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-90' : ''}`} />
                                        </button>

                                        {/* User Dropdown Menu */}
                                        {isUserMenuOpen && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-10"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                ></div>
                                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                                                    <div className="px-4 py-3 border-b border-gray-50">
                                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{user.user_metadata?.full_name || 'User'}</p>
                                                        <p className="text-[11px] font-bold text-gray-500 truncate">{user.email}</p>
                                                    </div>

                                                    {isAdmin && (
                                                        <Link
                                                            to="/admin"
                                                            onClick={() => setIsUserMenuOpen(false)}
                                                            className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <Settings size={16} className="text-gray-400" />
                                                            Panou Admin
                                                        </Link>
                                                    )}

                                                    <a
                                                        href={BILLING_URL}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                                                    >
                                                        <Globe size={16} className="text-brand-500" />
                                                        {currentT.manageSub}
                                                    </a>

                                                    <button
                                                        onClick={() => {
                                                            setIsUserMenuOpen(false);
                                                            signOut();
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors border-t border-gray-50 mt-1"
                                                    >
                                                        <LogOut size={16} />
                                                        {currentT.logout}
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => signInWithGoogle()}
                                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2 bg-gray-900 text-white rounded-lg font-black text-[10px] hover:bg-brand-600 transition-all shadow-lg shrink-0 whitespace-nowrap"
                            >
                                <User size={14} />
                                <span className="hidden min-[400px]:inline">{lang === 'RO' ? 'LOGARE' : 'BELÉPÉS'}</span>
                            </button>
                        )}

                        {/* Burger Toggle - Threshold lowered */}
                        <button
                            className="xl:hidden p-2 text-gray-900 hover:bg-gray-100 rounded-xl transition-colors shrink-0"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Premium Mobile Menu Overlay */}
            <div className={`xl:hidden fixed inset-0 z-[-1] bg-white transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none translate-y-[-10px]'}`}>
                <div className="flex flex-col h-full pt-28 pb-10 px-6 sm:px-10 overflow-y-auto">
                    <div className="flex-grow space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 px-4">
                            {currentT.menuTitle}
                        </p>
                        {navLinks.map((item, idx) => (
                            <Link
                                key={item.label}
                                to={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 group"
                                style={{ transitionDelay: `${idx * 50}ms` }}
                            >
                                <span className="text-2xl sm:text-3xl font-black text-gray-900 group-hover:text-brand-600 transition-colors">
                                    {item.label}
                                </span>
                                <ChevronRight className="text-gray-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" size={24} />
                            </Link>
                        ))}

                        {/* Kids Zone in Mobile Menu */}
                        <Link
                            to="/copii"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-between p-4 rounded-2xl hover:bg-orange-50 transition-all duration-300 group bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200"
                        >
                            <span className="text-2xl sm:text-3xl font-black text-orange-600 transition-colors">
                                {currentT.kidsGames}
                            </span>
                            <ChevronRight className="text-orange-400 group-hover:translate-x-1 transition-all" size={24} />
                        </Link>
                    </div>

                    {/* Mobile Menu Footer Action */}
                    <div className="mt-10 pt-10 border-t border-gray-100">
                        {user ? (
                            <div className="space-y-4 text-center">
                                <div className="flex flex-col items-center gap-3 mb-6">
                                    {user.user_metadata?.avatar_url && (
                                        <img src={user.user_metadata.avatar_url} alt="" className="w-16 h-16 rounded-full border-4 border-brand-50" />
                                    )}
                                    <div className="text-center">
                                        <p className="font-black text-2xl text-gray-900 leading-none mb-2">{user.user_metadata?.full_name || 'User'}</p>
                                        <p className="text-sm text-gray-500 font-medium mb-4">{user.email}</p>
                                        {isAdmin && (
                                            <Link
                                                to="/admin"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="text-brand-600 font-bold text-sm bg-brand-50 px-4 py-2 rounded-xl"
                                            >
                                                Panou Administrator
                                            </Link>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => signOut()}
                                    className="w-full py-5 text-red-500 font-black text-lg border-2 border-red-50 rounded-[1.5rem] hover:bg-red-50 transition-colors"
                                >
                                    {currentT.logout}
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => signInWithGoogle()}
                                className="w-full py-5 bg-gray-900 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-gray-200 flex items-center justify-center gap-3 active:scale-95 transition-transform"
                            >
                                <User size={22} />
                                {currentT.login}
                            </button>
                        )}

                        {/* Modern Mobile Language Selector */}
                        <div className="mt-8 flex items-center justify-center p-1 bg-gray-50 rounded-2xl border border-gray-100">
                            <button
                                onClick={() => setLang('RO')}
                                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-black transition-all ${lang === 'RO'
                                    ? 'bg-white text-brand-600 shadow-lg shadow-gray-200/50'
                                    : 'text-gray-400'
                                    }`}
                            >
                                <Globe size={16} />
                                <span>Română</span>
                            </button>
                            <button
                                onClick={() => setLang('HU')}
                                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-black transition-all ${lang === 'HU'
                                    ? 'bg-white text-brand-600 shadow-lg shadow-gray-200/50'
                                    : 'text-gray-400'
                                    }`}
                            >
                                <Globe size={16} />
                                <span>Magyar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
