import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import QuizPage from './pages/QuizPage';
import Admin from './pages/Admin';
import KidsHub from './pages/KidsHub';
import SentenceBuilder from './pages/SentenceBuilder';
import WordDetective from './pages/WordDetective';
import TrueFalseGame from './pages/TrueFalseGame';
import ArticleMatchGame from './pages/ArticleMatchGame';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Login from './pages/Login';
import Register from './pages/Register';
import ScrollToTop from './components/ScrollToTop';
import { mockMaterials } from './data/mockMaterials';
import { supabase } from './lib/supabaseClient';

const ADMIN_EMAILS = ['bernad.beatrice23@gmail.com', 'bernad.beatrice23@gamil.com', 'cristian.balasa@gmail.com', 'balancionchrys13@gmail.com']; // Add your email here too

function App() {
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [activeCategory, setActiveCategory] = useState('adults_communication');
  const [lang, setLang] = useState('RO');
  const [user, setUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const isAdmin = user && ADMIN_EMAILS.includes(user.email);
  const hasAccess = isSubscribed || isAdmin;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        fetchProfile(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        fetchProfile(session.user);
      } else {
        setUser(null);
        setIsSubscribed(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (currentUser) => {
    if (!currentUser) return;

    // Admin email check (instant access)
    if (ADMIN_EMAILS.includes(currentUser.email)) {
      setIsSubscribed(true);
      return;
    }

    const { data } = await supabase
      .from('profiles')
      .select('subscription_status')
      .eq('id', currentUser.id)
      .single();

    if (data) {
      setIsSubscribed(data.subscription_status === 'active');
    }
  };

  const t = {
    RO: {
      digitalShop: "Magazin Digital",
      titleMain: "Materiale create cu pasiune de",
      titleSpan: "Beatrice.",
      subtitle: "Nu sunt o agenție, sunt mentorul tău. Toate fișele sunt create personal de mine pentru a transforma regulile complicate de gramatică în pași simpli și logici.",
      success: "Reușită",
      workingOn: "Momentan lucrez la acestea...",
      comingSoon: "Urmează să adaug materiale noi foarte curând!",
      seeAvailable: "Vezi ce avem disponibil",
      footerDesc: "Educația modernă prin logică și pasiune. Suntem alături de tine în fiecare pas spre succesul tău academic.",
      quickLinks: "Link-uri Rapide",
      nav_adults: "Comunicare Adulți",
      nav_gym: "Materie V-VIII",
      nav_exam: "Evaluare Națională",
      support: "Suport",
      faq: "Întrebări Frecvente",
      contact: "Contact Facilitat",
      rights: "Toate drepturile rezervate.",
      motto: "REZULTATE PRIN LOGICĂ.",
      viewAll: "Vezi Toate Materialele",
      latestMaterials: "Cele mai noi lecții",
      teacherLabel: "Mentor Dedicat",
      searchPlaceholder: "Caută o lecție (ex: verbul, pronumele...)",
      noResultsSearch: "Nu am găsit nicio lecție cu acest nume.",
      allCategories: "Toate Categoriile"
    },
    HU: {
      digitalShop: "Digitális Bolt",
      titleMain: "Szenvedéllyel készítette",
      titleSpan: "Beatrice.",
      subtitle: "Nem ügynökség vagyok, hanem a mentorod. Minden anyagot személyesen készítek, hogy a bonyolult nyelvtant egyszerű, logikus lépésekre bontsam.",
      success: "Siker",
      workingOn: "Jelenleg ezen dolgozom...",
      comingSoon: "Hamarosan új anyagokkal jelentkezem!",
      seeAvailable: "Elérhető anyagok",
      footerDesc: "Modern oktatás logikával és szenvedéllyel. Minden lépésnél támogatunk a tanulmányi sikereid felé.",
      quickLinks: "Gyors Linkek",
      nav_adults: "Felnőtt Kommunikáció",
      nav_gym: "Tananyag V-VIII",
      nav_exam: "Nemzeti Értékelő",
      support: "Támogátas",
      faq: "Gyakori Kérdések",
      contact: "Kapcsolat",
      rights: "Minden jog fenntartva.",
      motto: "EREDMÉNYEK LOGIKÁVAL.",
      viewAll: "Összes anyag megtekintése",
      latestMaterials: "Legújabb leckék",
      teacherLabel: "Elkötelezett Mentor",
      searchPlaceholder: "Keress egy leckét (pl: ige, névmás...)",
      noResultsSearch: "Nem találtunk ilyen nevű leckét.",
      allCategories: "Minden Kategória"
    }
  };

  const currentT = t[lang];

  const fetchMaterials = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setMaterials(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMaterials();

    // Listener for materials changes
    const materialsChannel = supabase
      .channel('materials_changes')
      .on('postgres_changes',
        { event: '*', table: 'materials', schema: 'public' },
        () => {
          fetchMaterials();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(materialsChannel);
    };
  }, []);

  // Listen for real-time profile updates (e.g. subscription activation)
  useEffect(() => {
    if (!user) return;

    const profileChannel = supabase
      .channel(`profile_changes_${user.id}`)
      .on('postgres_changes',
        {
          event: 'UPDATE',
          table: 'profiles',
          schema: 'public',
          filter: `id=eq.${user.id}`
        },
        (payload) => {
          if (payload.new) {
            setIsSubscribed(payload.new.subscription_status === 'active' || isAdmin);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(profileChannel);
    };
  }, [user, isAdmin]);

  useEffect(() => {
    const result = materials.filter(item => {
      const matchesCategory = item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredMaterials(result);
  }, [materials, activeCategory, searchQuery]);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#fafbfc] font-sans text-gray-900 selection:bg-brand-100 selection:text-brand-900 scroll-smooth flex flex-col">
        <Header lang={lang} setLang={setLang} user={user} />

        <Routes>
          <Route path="/" element={
            <Home
              lang={lang}
              user={user}
              currentT={currentT}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              filteredMaterials={filteredMaterials}
              isSubscribed={hasAccess}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          } />

          <Route path="/course/:categoryId" element={
            <CourseDetail lang={lang} isSubscribed={hasAccess} user={user} />
          } />

          <Route path="/quiz/:lessonId" element={
            <QuizPage lang={lang} />
          } />

          <Route path="/admin" element={
            <Admin user={user} />
          } />

          <Route path="/copii" element={
            <KidsHub lang={lang} isSubscribed={hasAccess} />
          } />

          <Route path="/copii/propozitii" element={
            <SentenceBuilder lang={lang} />
          } />

          <Route path="/copii/intrusul" element={
            <WordDetective lang={lang} />
          } />

          <Route path="/copii/adevarat-fals" element={
            <TrueFalseGame lang={lang} />
          } />

          <Route path="/copii/articole" element={
            <ArticleMatchGame lang={lang} />
          } />

          <Route path="/intrebari-frecvente" element={
            <FAQ lang={lang} />
          } />

          <Route path="/contact" element={
            <Contact lang={lang} />
          } />

          <Route path="/termeni" element={
            <Terms lang={lang} />
          } />

          <Route path="/confidentialitate" element={
            <Privacy lang={lang} />
          } />

          <Route path="/login" element={
            <Login lang={lang} />
          } />

          <Route path="/register" element={
            <Register lang={lang} />
          } />
        </Routes>

        <footer id="contact" className="bg-gray-900 text-white pt-24 pb-12 mt-auto rounded-t-[4rem]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 lg:gap-x-12 mb-20">
              <div className="sm:col-span-2 lg:col-span-2">
                <Link
                  to="/"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="flex items-center gap-3 group cursor-pointer shrink-0 lg:mr-10 mb-8"
                >
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
                    {/* Romania Tricolor Ring */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#002B7F] via-[#FCD116] to-[#CE1126] p-[2px] rotate-6 group-hover:rotate-0 transition-transform duration-500 shadow-lg">
                      <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                        <span className="text-gray-900 font-black text-lg sm:text-xl tracking-tighter">VR</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col whitespace-nowrap">
                    <span className="text-base sm:text-xl font-black text-white tracking-tighter leading-none flex items-center gap-0.5">
                      Vorbim-<span className="inline-flex">
                        <span className="text-[#3b82f6]">Rom</span>
                        <span className="text-[#fbbf24]">ane</span>
                        <span className="text-[#ef4444]">ste</span>
                      </span>
                      <span className="text-brand-500">.ro</span>
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-none mt-1 opacity-80">
                      Meditații & Resurse Logice
                    </span>
                  </div>
                </Link>
                <p className="text-gray-400 text-lg leading-relaxed max-w-sm mb-8 font-medium">
                  {currentT.footerDesc}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-brand-500 mb-8 border-l-2 border-brand-600 pl-4">{currentT.quickLinks}</h4>
                <ul className="space-y-4">
                  <li><Link to="/course/adults_communication" className="text-gray-300 hover:text-white transition-colors font-bold flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-brand-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"></div>{currentT.nav_adults}</Link></li>
                  <li><Link to="/course/gymnasium_curriculum" className="text-gray-300 hover:text-white transition-colors font-bold flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-brand-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"></div>{currentT.nav_gym}</Link></li>
                  <li><Link to="/course/national_exam_prep" className="text-gray-300 hover:text-white transition-colors font-bold flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-brand-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"></div>{currentT.nav_exam}</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-brand-500 mb-8 border-l-2 border-brand-600 pl-4">{currentT.support}</h4>
                <ul className="space-y-4">
                  <li><Link to="/intrebari-frecvente" className="text-gray-300 hover:text-white transition-colors font-bold flex items-center gap-2 group"><div className="w-1.5 h-1.5 bg-brand-600 rounded-full opacity-0 group-hover:opacity-100 transition-all"></div>{currentT.faq}</Link></li>
                  <li className="pt-2">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{currentT.contact}</p>
                    <div className="flex flex-col gap-3">
                      <a href="tel:+40757947933" className="text-gray-300 hover:text-brand-400 transition-colors font-bold flex items-center gap-2">
                        <span className="p-1.5 bg-gray-800 rounded-lg">📞</span> +40 757 947 933
                      </a>
                      <a href="mailto:bernad.beatrice23@gmail.com" className="text-gray-300 hover:text-brand-400 transition-colors font-bold flex items-center gap-2">
                        <span className="p-1.5 bg-gray-800 rounded-lg">✉️</span> bernad.beatrice23@gmail.com
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-12 border-t border-white/10 text-center text-gray-500 text-[11px] font-bold tracking-widest leading-loose uppercase">
              <div>© 2026 Vorbim-Romaneste.ro. {currentT.rights}</div>
              <div className="text-gray-700 mt-2">{currentT.motto}</div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
