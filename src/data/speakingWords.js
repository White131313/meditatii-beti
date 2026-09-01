// Cuvinte pentru jocul "Spune în Română!" (exercițiu de pronunție cu microfon).
// Copilul vede cuvântul in maghiara + un emoji, si trebuie sa spuna cu voce tare
// traducerea corecta in romana. "answer" e raspunsul canonic; "accepted" contine
// variante suplimentare acceptate (fara diacritice, forme alternative etc).

export const SPEAKING_WORDS = [
    // ===== ANIMALE =====
    { id: 'caine', hu: 'kutya', answer: 'câine', emoji: '🐶', category: 'animale' },
    { id: 'pisica', hu: 'macska', answer: 'pisică', emoji: '🐱', category: 'animale' },
    { id: 'cal', hu: 'ló', answer: 'cal', emoji: '🐴', category: 'animale' },
    { id: 'vaca', hu: 'tehén', answer: 'vacă', emoji: '🐄', category: 'animale' },
    { id: 'oaie', hu: 'birka', answer: 'oaie', emoji: '🐑', category: 'animale' },
    { id: 'porc', hu: 'disznó', answer: 'porc', emoji: '🐷', category: 'animale' },
    { id: 'iepure', hu: 'nyúl', answer: 'iepure', emoji: '🐰', category: 'animale' },
    { id: 'urs', hu: 'medve', answer: 'urs', emoji: '🐻', category: 'animale' },
    { id: 'lup', hu: 'farkas', answer: 'lup', emoji: '🐺', category: 'animale' },
    { id: 'vulpe', hu: 'róka', answer: 'vulpe', emoji: '🦊', category: 'animale' },
    { id: 'pasare', hu: 'madár', answer: 'pasăre', emoji: '🐦', category: 'animale' },
    { id: 'peste', hu: 'hal', answer: 'pește', emoji: '🐟', category: 'animale' },
    { id: 'sarpe', hu: 'kígyó', answer: 'șarpe', emoji: '🐍', category: 'animale' },
    { id: 'broasca', hu: 'béka', answer: 'broască', emoji: '🐸', category: 'animale' },
    { id: 'albina', hu: 'méh', answer: 'albină', emoji: '🐝', category: 'animale' },
    { id: 'fluture', hu: 'pillangó', answer: 'fluture', emoji: '🦋', category: 'animale' },
    { id: 'elefant', hu: 'elefánt', answer: 'elefant', emoji: '🐘', category: 'animale' },
    { id: 'leu', hu: 'oroszlán', answer: 'leu', emoji: '🦁', category: 'animale' },
    { id: 'tigru', hu: 'tigris', answer: 'tigru', emoji: '🐯', category: 'animale' },
    { id: 'maimuta', hu: 'majom', answer: 'maimuță', emoji: '🐒', category: 'animale' },
    { id: 'gaina', hu: 'tyúk', answer: 'găină', emoji: '🐔', category: 'animale' },
    { id: 'rata', hu: 'kacsa', answer: 'rață', emoji: '🦆', category: 'animale' },
    { id: 'capra', hu: 'kecske', answer: 'capră', emoji: '🐐', category: 'animale' },

    // ===== FAMILIE =====
    { id: 'mama', hu: 'anya', answer: 'mamă', emoji: '👩', category: 'familie' },
    { id: 'tata', hu: 'apa', answer: 'tată', emoji: '👨', category: 'familie' },
    { id: 'frate', hu: 'fiútestvér', answer: 'frate', emoji: '👦', category: 'familie' },
    { id: 'sora', hu: 'lánytestvér', answer: 'soră', emoji: '👧', category: 'familie' },
    { id: 'bunic', hu: 'nagypapa', answer: 'bunic', emoji: '👴', category: 'familie' },
    { id: 'bunica', hu: 'nagymama', answer: 'bunică', emoji: '👵', category: 'familie' },
    { id: 'copil', hu: 'gyerek', answer: 'copil', emoji: '🧒', category: 'familie' },
    { id: 'bebelus', hu: 'baba', answer: 'bebeluș', emoji: '👶', category: 'familie' },

    // ===== MANCARE SI BAUTURA =====
    { id: 'paine', hu: 'kenyér', answer: 'pâine', emoji: '🍞', category: 'mancare' },
    { id: 'lapte', hu: 'tej', answer: 'lapte', emoji: '🥛', category: 'mancare' },
    { id: 'apa', hu: 'víz', answer: 'apă', emoji: '💧', category: 'mancare' },
    { id: 'mar', hu: 'alma', answer: 'măr', emoji: '🍎', category: 'mancare' },
    { id: 'para', hu: 'körte', answer: 'pară', emoji: '🍐', category: 'mancare' },
    { id: 'banana', hu: 'banán', answer: 'banană', emoji: '🍌', category: 'mancare' },
    { id: 'portocala', hu: 'narancs', answer: 'portocală', emoji: '🍊', category: 'mancare' },
    { id: 'capsuna', hu: 'eper', answer: 'căpșună', emoji: '🍓', category: 'mancare' },
    { id: 'struguri', hu: 'szőlő', answer: 'struguri', emoji: '🍇', category: 'mancare' },
    { id: 'ou', hu: 'tojás', answer: 'ou', emoji: '🥚', category: 'mancare' },
    { id: 'branza', hu: 'sajt', answer: 'brânză', emoji: '🧀', category: 'mancare' },
    { id: 'supa', hu: 'leves', answer: 'supă', emoji: '🍲', category: 'mancare' },
    { id: 'prajitura', hu: 'sütemény', answer: 'prăjitură', emoji: '🍰', category: 'mancare' },
    { id: 'ciocolata', hu: 'csokoládé', answer: 'ciocolată', emoji: '🍫', category: 'mancare' },
    { id: 'miere', hu: 'méz', answer: 'miere', emoji: '🍯', category: 'mancare' },

    // ===== CULORI =====
    { id: 'rosu', hu: 'piros', answer: 'roșu', emoji: '🔴', category: 'culori' },
    { id: 'albastru', hu: 'kék', answer: 'albastru', emoji: '🔵', category: 'culori' },
    { id: 'verde', hu: 'zöld', answer: 'verde', emoji: '🟢', category: 'culori' },
    { id: 'galben', hu: 'sárga', answer: 'galben', emoji: '🟡', category: 'culori' },
    { id: 'negru', hu: 'fekete', answer: 'negru', emoji: '⚫', category: 'culori' },
    { id: 'alb', hu: 'fehér', answer: 'alb', emoji: '⚪', category: 'culori' },
    { id: 'portocaliu', hu: 'narancssárga', answer: 'portocaliu', emoji: '🟠', category: 'culori' },
    { id: 'mov', hu: 'lila', answer: 'mov', emoji: '🟣', category: 'culori' },
    { id: 'roz', hu: 'rózsaszín', answer: 'roz', emoji: '💗', category: 'culori' },
    { id: 'gri', hu: 'szürke', answer: 'gri', emoji: '🩶', category: 'culori' },

    // ===== NUMERE =====
    { id: 'unu', hu: 'egy', answer: 'unu', emoji: '1️⃣', category: 'numere' },
    { id: 'doi', hu: 'kettő', answer: 'doi', emoji: '2️⃣', category: 'numere' },
    { id: 'trei', hu: 'három', answer: 'trei', emoji: '3️⃣', category: 'numere' },
    { id: 'patru', hu: 'négy', answer: 'patru', emoji: '4️⃣', category: 'numere' },
    { id: 'cinci', hu: 'öt', answer: 'cinci', emoji: '5️⃣', category: 'numere' },
    { id: 'sase', hu: 'hat', answer: 'șase', emoji: '6️⃣', category: 'numere' },
    { id: 'sapte', hu: 'hét', answer: 'șapte', emoji: '7️⃣', category: 'numere' },
    { id: 'opt', hu: 'nyolc', answer: 'opt', emoji: '8️⃣', category: 'numere' },
    { id: 'noua', hu: 'kilenc', answer: 'nouă', emoji: '9️⃣', category: 'numere' },
    { id: 'zece', hu: 'tíz', answer: 'zece', emoji: '🔟', category: 'numere' },

    // ===== CORP =====
    { id: 'ochi', hu: 'szem', answer: 'ochi', emoji: '👀', category: 'corp' },
    { id: 'mana', hu: 'kéz', answer: 'mână', emoji: '✋', category: 'corp' },
    { id: 'picior', hu: 'láb', answer: 'picior', emoji: '🦵', category: 'corp' },
    { id: 'gura', hu: 'száj', answer: 'gură', emoji: '👄', category: 'corp' },
    { id: 'nas', hu: 'orr', answer: 'nas', emoji: '👃', category: 'corp' },
    { id: 'ureche', hu: 'fül', answer: 'ureche', emoji: '👂', category: 'corp' },

    // ===== NATURA SI VREME =====
    { id: 'soare', hu: 'nap', answer: 'soare', emoji: '☀️', category: 'natura' },
    { id: 'luna', hu: 'hold', answer: 'lună', emoji: '🌙', category: 'natura' },
    { id: 'stea', hu: 'csillag', answer: 'stea', emoji: '⭐', category: 'natura' },
    { id: 'ploaie', hu: 'eső', answer: 'ploaie', emoji: '🌧️', category: 'natura' },
    { id: 'zapada', hu: 'hó', answer: 'zăpadă', emoji: '❄️', category: 'natura' },
    { id: 'copac', hu: 'fa', answer: 'copac', emoji: '🌳', category: 'natura' },
    { id: 'floare', hu: 'virág', answer: 'floare', emoji: '🌸', category: 'natura' },
    { id: 'munte', hu: 'hegy', answer: 'munte', emoji: '⛰️', category: 'natura' },
    { id: 'nor', hu: 'felhő', answer: 'nor', emoji: '☁️', category: 'natura' },
    { id: 'vant', hu: 'szél', answer: 'vânt', emoji: '🌬️', category: 'natura' },
    { id: 'foc', hu: 'tűz', answer: 'foc', emoji: '🔥', category: 'natura' },

    // ===== OBIECTE =====
    { id: 'carte', hu: 'könyv', answer: 'carte', emoji: '📖', category: 'obiecte' },
    { id: 'creion', hu: 'ceruza', answer: 'creion', emoji: '✏️', category: 'obiecte' },
    { id: 'minge', hu: 'labda', answer: 'minge', emoji: '⚽', category: 'obiecte' },
    { id: 'casa', hu: 'ház', answer: 'casă', emoji: '🏠', category: 'obiecte' },
    { id: 'masina', hu: 'autó', answer: 'mașină', emoji: '🚗', category: 'obiecte' },
    { id: 'scaun', hu: 'szék', answer: 'scaun', emoji: '🪑', category: 'obiecte' },
    { id: 'usa', hu: 'ajtó', answer: 'ușă', emoji: '🚪', category: 'obiecte' },
    { id: 'pat', hu: 'ágy', answer: 'pat', emoji: '🛏️', category: 'obiecte' },
    { id: 'ceas', hu: 'óra', answer: 'ceas', emoji: '⏰', category: 'obiecte' },
    { id: 'telefon', hu: 'telefon', answer: 'telefon', emoji: '📱', category: 'obiecte' },
];

// Amestecare Fisher-Yates
const shuffle = (array) => {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

// Alege `count` cuvinte pentru o runda noua, evitand pe cat posibil
// ultimele cuvinte jucate (excludeIds), pentru mai multa varietate.
export const getRandomRound = (count = 5, excludeIds = []) => {
    const fresh = SPEAKING_WORDS.filter(w => !excludeIds.includes(w.id));
    const pool = fresh.length >= count ? fresh : SPEAKING_WORDS;
    return shuffle(pool).slice(0, count);
};
