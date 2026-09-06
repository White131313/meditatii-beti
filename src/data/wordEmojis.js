// Mapping emoji-uri pentru fiecare cuvânt din puzzle-uri
export const WORD_EMOJIS = {
    // Animale
    'pisică': '🐱',
    'pisica': '🐱',
    'câinele': '🐕',
    'iepurele': '🐰',
    'păsarea': '🐦',
    'calul': '🐴',
    'cal': '🐴',
    'vaca': '🐄',
    'porcul': '🐷',
    'găina': '🐔',

    // Fructe
    'mărul': '🍎',
    'para': '🍐',
    'banana': '🍌',
    'portocala': '🍊',
    'căpșuna': '🍓',
    'cireșele': '🍒',
    'ciresele': '🍒',
    'strugurele': '🍇',

    // Legume
    'morcovul': '🥕',
    'roșia': '🍅',
    'roșie': '🍅',
    'castravete': '🥒',
    'varza': '🥬',
    'cartof': '🥔',

    // Culori
    'roșu': '🔴',
    'verde': '🟢',
    'galben': '🟡',
    'albastru': '🔵',
    'portocaliu': '🟠',
    'negru': '⚫',
    'alb': '⚪',

    // Familie
    'mama': '👩',
    'tata': '👨',
    'sora': '👧',
    'fratele': '👦',
    'bunica': '👵',
    'bunicul': '👴',
    'copilul': '👶',
    'copiii': '👶',

    // Încălțăminte
    'pantof': '👞',
    'sandale': '👡',
    'cizme': '🥾',
    'papuc': '🩴',

    // Obiecte școlare
    'caiet': '📓',
    'creion': '✏️',
    'carte': '📖',
    'ghiozdan': '🎒',
    'gumă': '🧽',

    // Alimente
    'pâine': '🍞',
    'lapte': '🥛',
    'brânză': '🧀',
    'ou': '🥚',
    'pui': '🍗',

    // Vehicule
    'mașina': '🚗',
    'bicicleta': '🚲',
    'autobuz': '🚌',
    'tren': '🚂',

    // Obiecte/Mobilier
    'masă': '🍽️',
    'masa': '🍽️',
    'scaun': '🪑',
    'soare': '☀️',

    // Default fallback
    'default': '✨'
};

export const getEmojiForWord = (word) => {
    if (!word) return WORD_EMOJIS['default'];

    // Normalize word: lowercase
    const normalized = word.toLowerCase().trim();

    // 1. Try exact match
    if (WORD_EMOJIS[normalized]) return WORD_EMOJIS[normalized];

    // 2. Try removing diacritics for a more robust match
    const noDiacritics = normalized
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ț/g, "t")
        .replace(/ș/g, "s");

    if (WORD_EMOJIS[noDiacritics]) return WORD_EMOJIS[noDiacritics];

    // 3. Fallback
    return WORD_EMOJIS['default'];
};
