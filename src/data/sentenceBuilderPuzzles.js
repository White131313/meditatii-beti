// 100 de propoziții statice pentru "Constructorul de Propoziții"
// Organizate pe niveluri: easy (3 cuvinte), medium (4 cuvinte), hard (5 cuvinte)

import { getRandomConjugatedSentence } from './sentenceBuilderConjugated';

export const SENTENCE_BUILDER_PUZZLES = [
    // ========== EASY (1-33) - 3 cuvinte simple ==========
    {
        difficulty: 'easy',
        original: ["Pisica", "bea", "lapte"],
        scrambled: ["lapte", "Pisica", "bea"],
        translation_hu: "A macska tejet iszik"
    },
    {
        difficulty: 'easy',
        original: ["Mama", "citește", "cartea"],
        scrambled: ["cartea", "citește", "Mama"],
        translation_hu: "Anya olvassa a könyvet"
    },
    {
        difficulty: 'easy',
        original: ["Tata", "conduce", "mașina"],
        scrambled: ["mașina", "Tata", "conduce"],
        translation_hu: "Apa vezeti az autót"
    },
    {
        difficulty: 'easy',
        original: ["Câinele", "doarme", "liniștit"],
        scrambled: ["liniștit", "doarme", "Câinele"],
        translation_hu: "A kutya nyugodtan alszik"
    },
    {
        difficulty: 'easy',
        original: ["Copilul", "mănâncă", "pâine"],
        scrambled: ["pâine", "Copilul", "mănâncă"],
        translation_hu: "A gyerek kenyeret eszik"
    },
    {
        difficulty: 'easy',
        original: ["Sora", "cântă", "frumos"],
        scrambled: ["frumos", "cântă", "Sora"],
        translation_hu: "A nővér szépen énekel"
    },
    {
        difficulty: 'easy',
        original: ["Bunica", "gătește", "supă"],
        scrambled: ["supă", "Bunica", "gătește"],
        translation_hu: "A nagyi levest főz"
    },
    {
        difficulty: 'easy',
        original: ["Fratele", "aleargă", "repede"],
        scrambled: ["repede", "aleargă", "Fratele"],
        translation_hu: "A fiútestvér gyorsan fut"
    },
    {
        difficulty: 'easy',
        original: ["Iepurele", "sare", "sus"],
        scrambled: ["sus", "Iepurele", "sare"],
        translation_hu: "A nyúl felugrál"
    },
    {
        difficulty: 'easy',
        original: ["Păsările", "zboară", "sus"],
        scrambled: ["sus", "zboară", "Păsările"],
        translation_hu: "A madarak felrepülnek"
    },
    {
        difficulty: 'easy',
        original: ["Copiii", "se", "joacă"],
        scrambled: ["joacă", "Copiii", "se"],
        translation_hu: "A gyerekek játszanak"
    },
    {
        difficulty: 'easy',
        original: ["Profesoara", "predă", "lecția"],
        scrambled: ["lecția", "predă", "Profesoara"],
        translation_hu: "A tanárnő tanítja a leckét"
    },
    {
        difficulty: 'easy',
        original: ["Calul", "mănâncă", "fân"],
        scrambled: ["fân", "Calul", "mănâncă"],
        translation_hu: "A ló szénát eszik"
    },
    {
        difficulty: 'easy',
        original: ["Pisica", "doarme", "afară"],
        scrambled: ["afară", "doarme", "Pisica"],
        translation_hu: "A macska kint alszik"
    },
    {
        difficulty: 'easy',
        original: ["Mama", "spală", "vasele"],
        scrambled: ["vasele", "Mama", "spală"],
        translation_hu: "Anya mossa az edényeket"
    },
    {
        difficulty: 'easy',
        original: ["Tata", "repară", "casa"],
        scrambled: ["casa", "repară", "Tata"],
        translation_hu: "Apa javítja a házat"
    },
    {
        difficulty: 'easy',
        original: ["Copilul", "desenează", "frumos"],
        scrambled: ["frumos", "Copilul", "desenează"],
        translation_hu: "A gyerek szépen rajzol"
    },
    {
        difficulty: 'easy',
        original: ["Soarele", "strălucește", "puternic"],
        scrambled: ["puternic", "strălucește", "Soarele"],
        translation_hu: "A nap erősen süt"
    },
    {
        difficulty: 'easy',
        original: ["Bunicul", "citește", "ziarul"],
        scrambled: ["ziarul", "citește", "Bunicul"],
        translation_hu: "A nagyapa újságot olvas"
    },
    {
        difficulty: 'easy',
        original: ["Câinele", "latră", "tare"],
        scrambled: ["tare", "latră", "Câinele"],
        translation_hu: "A kutya hangosan ugat"
    },
    {
        difficulty: 'easy',
        original: ["Copiii", "învață", "lecția"],
        scrambled: ["lecția", "învață", "Copiii"],
        translation_hu: "A gyerekek tanulják a leckét"
    },
    {
        difficulty: 'easy',
        original: ["Mama", "pregătește", "masa"],
        scrambled: ["masa", "pregătește", "Mama"],
        translation_hu: "Anya készíti az ételt"
    },
    {
        difficulty: 'easy',
        original: ["Pisica", "se", "joacă"],
        scrambled: ["joacă", "se", "Pisica"],
        translation_hu: "A macska játszik"
    },
    {
        difficulty: 'easy',
        original: ["Tata", "lucrează", "mult"],
        scrambled: ["mult", "Tata", "lucrează"],
        translation_hu: "Apa sokat dolgozik"
    },
    {
        difficulty: 'easy',
        original: ["Sora", "dansează", "frumos"],
        scrambled: ["frumos", "dansează", "Sora"],
        translation_hu: "A nővér szépen táncol"
    },
    {
        difficulty: 'easy',
        original: ["Fratele", "scrie", "scrisoarea"],
        scrambled: ["scrisoarea", "scrie", "Fratele"],
        translation_hu: "A fiútestvér írja a levelet"
    },
    {
        difficulty: 'easy',
        original: ["Bunica", "coase", "hainele"],
        scrambled: ["hainele", "coase", "Bunica"],
        translation_hu: "A nagyi varrja a ruhákat"
    },
    {
        difficulty: 'easy',
        original: ["Câinele", "mănâncă", "carnea"],
        scrambled: ["carnea", "mănâncă", "Câinele"],
        translation_hu: "A kutya húst eszik"
    },
    {
        difficulty: 'easy',
        original: ["Copilul", "bea", "apă"],
        scrambled: ["apă", "bea", "Copilul"],
        translation_hu: "A gyerek vizet iszik"
    },
    {
        difficulty: 'easy',
        original: ["Mama", "cumpără", "mere"],
        scrambled: ["mere", "cumpără", "Mama"],
        translation_hu: "Anya almát vásárol"
    },
    {
        difficulty: 'easy',
        original: ["Tata", "construiește", "casa"],
        scrambled: ["casa", "construiește", "Tata"],
        translation_hu: "Apa építi a házat"
    },
    {
        difficulty: 'easy',
        original: ["Pisica", "urmărește", "șoarecele"],
        scrambled: ["șoarecele", "urmărește", "Pisica"],
        translation_hu: "A macska üldözi az egeret"
    },
    {
        difficulty: 'easy',
        original: ["Copiii", "cântă", "împreună"],
        scrambled: ["împreună", "cântă", "Copiii"],
        translation_hu: "A gyerekek együtt énekelnek"
    },

    // ========== MEDIUM (34-67) - 4 cuvinte ==========
    {
        difficulty: 'medium',
        original: ["Mama", "pregătește", "o", "prăjitură"],
        scrambled: ["prăjitură", "o", "Mama", "pregătește"],
        translation_hu: "Anya készít egy süteményt"
    },
    {
        difficulty: 'medium',
        original: ["Copilul", "citește", "o", "carte"],
        scrambled: ["carte", "Copilul", "o", "citește"],
        translation_hu: "A gyerek olvas egy könyvet"
    },
    {
        difficulty: 'medium',
        original: ["Tata", "repară", "bicicleta", "mea"],
        scrambled: ["mea", "repară", "Tata", "bicicleta"],
        translation_hu: "Apa javítja a kerékpáromat"
    },
    {
        difficulty: 'medium',
        original: ["Pisica", "doarme", "pe", "canapea"],
        scrambled: ["canapea", "pe", "doarme", "Pisica"],
        translation_hu: "A macska a kanapén alszik"
    },
    {
        difficulty: 'medium',
        original: ["Câinele", "aleargă", "prin", "parc"],
        scrambled: ["parc", "Câinele", "prin", "aleargă"],
        translation_hu: "A kutya fut át a parkban"
    },
    {
        difficulty: 'medium',
        original: ["Bunica", "spune", "o", "poveste"],
        scrambled: ["poveste", "o", "spune", "Bunica"],
        translation_hu: "A nagyi elmond egy mesét"
    },
    {
        difficulty: 'medium',
        original: ["Fratele", "desenează", "un", "copac"],
        scrambled: ["copac", "un", "Fratele", "desenează"],
        translation_hu: "A fiútestvér rajzol egy fát"
    },
    {
        difficulty: 'medium',
        original: ["Sora", "cântă", "o", "melodie"],
        scrambled: ["melodie", "o", "cântă", "Sora"],
        translation_hu: "A nővér énekel egy dallamot"
    },
    {
        difficulty: 'medium',
        original: ["Profesoara", "explică", "lecția", "nouă"],
        scrambled: ["nouă", "lecția", "Profesoara", "explică"],
        translation_hu: "A tanárnő elmagyarázza az új leckét"
    },
    {
        difficulty: 'medium',
        original: ["Copiii", "se", "joacă", "afară"],
        scrambled: ["afară", "joacă", "Copiii", "se"],
        translation_hu: "A gyerekek kint játszanak"
    },
    {
        difficulty: 'medium',
        original: ["Mama", "spală", "rufele", "murdare"],
        scrambled: ["murdare", "spală", "rufele", "Mama"],
        translation_hu: "Anya mossa a piszkos ruhákat"
    },
    {
        difficulty: 'medium',
        original: ["Tata", "conduce", "mașina", "încet"],
        scrambled: ["încet", "mașina", "conduce", "Tata"],
        translation_hu: "Apa lassan vezeti az autót"
    },
    {
        difficulty: 'medium',
        original: ["Bunicul", "lucrează", "în", "grădină"],
        scrambled: ["grădină", "în", "Bunicul", "lucrează"],
        translation_hu: "A nagypapa dolgozik a kertben"
    },
    {
        difficulty: 'medium',
        original: ["Pisica", "bea", "laptele", "cald"],
        scrambled: ["cald", "laptele", "Pisica", "bea"],
        translation_hu: "A macska issza a meleg tejet"
    },
    {
        difficulty: 'medium',
        original: ["Copilul", "învață", "limba", "română"],
        scrambled: ["română", "Copilul", "limba", "învață"],
        translation_hu: "A gyerek tanul románul"
    },
    {
        difficulty: 'medium',
        original: ["Câinele", "păzește", "casa", "noastră"],
        scrambled: ["noastră", "Câinele", "casa", "păzește"],
        translation_hu: "A kutya őrzi a házunkat"
    },
    {
        difficulty: 'medium',
        original: ["Sora", "pregătește", "tema", "zilnică"],
        scrambled: ["zilnică", "tema", "Sora", "pregătește"],
        translation_hu: "A nővér készíti a napi leckét"
    },
    {
        difficulty: 'medium',
        original: ["Fratele", "repară", "jucăria", "stricată"],
        scrambled: ["stricată", "jucăria", "Fratele", "repară"],
        translation_hu: "A fiútestvér javítja a törött játékot"
    },
    {
        difficulty: 'medium',
        original: ["Mama", "cumpără", "pâine", "proaspătă"],
        scrambled: ["proaspătă", "Mama", "pâine", "cumpără"],
        translation_hu: "Anya vásárol friss kenyeret"
    },
    {
        difficulty: 'medium',
        original: ["Tata", "citește", "ziarul", "dimineața"],
        scrambled: ["dimineața", "ziarul", "Tata", "citește"],
        translation_hu: "Apa reggel olvassa az újságot"
    },
    {
        difficulty: 'medium',
        original: ["Copiii", "merg", "la", "școală"],
        scrambled: ["școală", "la", "Copiii", "merg"],
        translation_hu: "A gyerekek mennek az iskolába"
    },
    {
        difficulty: 'medium',
        original: ["Bunica", "pregătește", "dulceața", "gustoasă"],
        scrambled: ["gustoasă", "dulceața", "Bunica", "pregătește"],
        translation_hu: "A nagyi készíti a finom lekvárt"
    },
    {
        difficulty: 'medium',
        original: ["Pisica", "se", "joacă", "singură"],
        scrambled: ["singură", "joacă", "se", "Pisica"],
        translation_hu: "A macska egyedül játszik"
    },
    {
        difficulty: 'medium',
        original: ["Câinele", "latră", "la", "poștaș"],
        scrambled: ["poștaș", "Câinele", "la", "latră"],
        translation_hu: "A kutya ugat a postásra"
    },
    {
        difficulty: 'medium',
        original: ["Sora", "desenează", "florile", "frumoase"],
        scrambled: ["frumoase", "florile", "Sora", "desenează"],
        translation_hu: "A nővér rajzolja a szép virágokat"
    },
    {
        difficulty: 'medium',
        original: ["Fratele", "joacă", "fotbal", "bine"],
        scrambled: ["bine", "Fratele", "fotbal", "joacă"],
        translation_hu: "A fiútestvér jól focizik"
    },
    {
        difficulty: 'medium',
        original: ["Mama", "îngrijește", "grădina", "verde"],
        scrambled: ["verde", "îngrijește", "Mama", "grădina"],
        translation_hu: "Anya gondozza a zöld kertet"
    },
    {
        difficulty: 'medium',
        original: ["Tata", "construiește", "o", "casă"],
        scrambled: ["casă", "o", "construiește", "Tata"],
        translation_hu: "Apa épít egy házat"
    },
    {
        difficulty: 'medium',
        original: ["Copilul", "bea", "sucul", "rece"],
        scrambled: ["rece", "sucul", "Copilul", "bea"],
        translation_hu: "A gyerek issza a hideg gyümölcslevet"
    },
    {
        difficulty: 'medium',
        original: ["Bunicul", "povestește", "despre", "război"],
        scrambled: ["război", "despre", "Bunicul", "povestește"],
        translation_hu: "A nagyapa mesél a háborúról"
    },
    {
        difficulty: 'medium',
        original: ["Pisica", "mănâncă", "peștele", "proaspăt"],
        scrambled: ["proaspăt", "Pisica", "peștele", "mănâncă"],
        translation_hu: "A macska eszi a friss halat"
    },
    {
        difficulty: 'medium',
        original: ["Câinele", "doarme", "sub", "masă"],
        scrambled: ["masă", "sub", "doarme", "Câinele"],
        translation_hu: "A kutya alszik az asztal alatt"
    },
    {
        difficulty: 'medium',
        original: ["Sora", "scrie", "o", "poezie"],
        scrambled: ["poezie", "o", "Sora", "scrie"],
        translation_hu: "A nővér ír egy verset"
    },
    {
        difficulty: 'medium',
        original: ["Fratele", "se", "joacă", "cu", "mingea"],
        scrambled: ["mingea", "cu", "se", "joacă", "Fratele"],
        translation_hu: "A fiútestvér a labdával játszik"
    },

    // ========== HARD (68-100) - 5 cuvinte ==========
    {
        difficulty: 'hard',
        original: ["Mama", "pregătește", "o", "supă", "delicioasă"],
        scrambled: ["delicioasă", "Mama", "supă", "o", "pregătește"],
        translation_hu: "Anya készít egy finom levest"
    },
    {
        difficulty: 'hard',
        original: ["Copilul", "citește", "cartea", "cu", "atenție"],
        scrambled: ["atenție", "cu", "Copilul", "cartea", "citește"],
        translation_hu: "A gyerek figyelmesen olvassa a könyvet"
    },
    {
        difficulty: 'hard',
        original: ["Tata", "repară", "bicicleta", "nouă", "azi"],
        scrambled: ["azi", "bicicleta", "Tata", "nouă", "repară"],
        translation_hu: "Apa ma javítja az új kerékpárt"
    },
    {
        difficulty: 'hard',
        original: ["Pisica", "doarme", "pe", "patul", "moale"],
        scrambled: ["moale", "patul", "pe", "Pisica", "doarme"],
        translation_hu: "A macska alszik a puha ágyon"
    },
    {
        difficulty: 'hard',
        original: ["Câinele", "aleargă", "repede", "prin", "parc"],
        scrambled: ["parc", "prin", "aleargă", "Câinele", "repede"],
        translation_hu: "A kutya gyorsan fut át a parkban"
    },
    {
        difficulty: 'hard',
        original: ["Bunica", "spune", "o", "poveste", "frumoasă"],
        scrambled: ["frumoasă", "poveste", "o", "Bunica", "spune"],
        translation_hu: "A nagyi elmond egy szép mesét"
    },
    {
        difficulty: 'hard',
        original: ["Fratele", "desenează", "un", "copac", "verde"],
        scrambled: ["verde", "copac", "un", "Fratele", "desenează"],
        translation_hu: "A fiútestvér rajzol egy zöld fát"
    },
    {
        difficulty: 'hard',
        original: ["Sora", "cântă", "o", "melodie", "veselă"],
        scrambled: ["veselă", "melodie", "o", "cântă", "Sora"],
        translation_hu: "A nővér énekel egy víg dallamot"
    },
    {
        difficulty: 'hard',
        original: ["Profesoara", "explică", "lecția", "de", "matematică"],
        scrambled: ["matematică", "de", "Profesoara", "lecția", "explică"],
        translation_hu: "A tanárnő elmagyarázza a matematika leckét"
    },
    {
        difficulty: 'hard',
        original: ["Copiii", "se", "joacă", "frumos", "împreună"],
        scrambled: ["împreună", "frumos", "se", "joacă", "Copiii"],
        translation_hu: "A gyerekek szépen játszanak együtt"
    },
    {
        difficulty: 'hard',
        original: ["Mama", "spală", "rufele", "murdare", "dimineața"],
        scrambled: ["dimineața", "murdare", "Mama", "rufele", "spală"],
        translation_hu: "Anya reggel mossa a piszkos ruhákat"
    },
    {
        difficulty: 'hard',
        original: ["Tata", "conduce", "mașina", "foarte", "încet"],
        scrambled: ["încet", "foarte", "conduce", "Tata", "mașina"],
        translation_hu: "Apa nagyon lassan vezeti az autót"
    },
    {
        difficulty: 'hard',
        original: ["Bunicul", "lucrează", "în", "grădina", "mare"],
        scrambled: ["mare", "grădina", "în", "lucrează", "Bunicul"],
        translation_hu: "A nagypapa dolgozik a nagy kertben"
    },
    {
        difficulty: 'hard',
        original: ["Pisica", "bea", "laptele", "cald", "dimineața"],
        scrambled: ["dimineața", "cald", "Pisica", "laptele", "bea"],
        translation_hu: "A macska reggel issza a meleg tejet"
    },
    {
        difficulty: 'hard',
        original: ["Copilul", "învață", "limba", "română", "zilnic"],
        scrambled: ["zilnic", "română", "limba", "Copilul", "învață"],
        translation_hu: "A gyerek naponta tanulja a román nyelvet"
    },
    {
        difficulty: 'hard',
        original: ["Câinele", "păzește", "casa", "noastră", "noaptea"],
        scrambled: ["noaptea", "noastră", "Câinele", "casa", "păzește"],
        translation_hu: "A kutya éjjel őrzi a házunkat"
    },
    {
        difficulty: 'hard',
        original: ["Sora", "pregătește", "tema", "pentru", "mâine"],
        scrambled: ["mâine", "pentru", "Sora", "tema", "pregătește"],
        translation_hu: "A nővér készíti a holnapi leckét"
    },
    {
        difficulty: 'hard',
        original: ["Fratele", "repară", "jucăria", "mea", "stricată"],
        scrambled: ["stricată", "mea", "jucăria", "Fratele", "repară"],
        translation_hu: "A fiútestvér javítja a törött játékomat"
    },
    {
        difficulty: 'hard',
        original: ["Mama", "cumpără", "pâine", "proaspătă", "zilnic"],
        scrambled: ["zilnic", "proaspătă", "Mama", "pâine", "cumpără"],
        translation_hu: "Anya naponta vásárol friss kenyeret"
    },
    {
        difficulty: 'hard',
        original: ["Tata", "citește", "ziarul", "în", "fiecare", "zi"],
        scrambled: ["zi", "fiecare", "în", "Tata", "ziarul", "citește"],
        translation_hu: "Apa minden nap olvassa az újságot"
    },
    {
        difficulty: 'hard',
        original: ["Copiii", "merg", "la", "școală", "dimineața"],
        scrambled: ["dimineața", "școală", "la", "Copiii", "merg"],
        translation_hu: "A gyerekek reggel mennek az iskolába"
    },
    {
        difficulty: 'hard',
        original: ["Bunica", "pregătește", "dulceața", "de", "căpșuni"],
        scrambled: ["căpșuni", "de", "pregătește", "Bunica", "dulceața"],
        translation_hu: "A nagyi készíti az eperlekvárt"
    },
    {
        difficulty: 'hard',
        original: ["Pisica", "se", "joacă", "cu", "mingea"],
        scrambled: ["mingea", "cu", "se", "joacă", "Pisica"],
        translation_hu: "A macska játszik a labdával"
    },
    {
        difficulty: 'hard',
        original: ["Câinele", "latră", "la", "toți", "străinii"],
        scrambled: ["străinii", "toți", "la", "Câinele", "latră"],
        translation_hu: "A kutya ugat minden idegenre"
    },
    {
        difficulty: 'hard',
        original: ["Sora", "desenează", "florile", "din", "grădină"],
        scrambled: ["grădină", "din", "florile", "Sora", "desenează"],
        translation_hu: "A nővér rajzolja a kerti virágokat"
    },
    {
        difficulty: 'hard',
        original: ["Fratele", "joacă", "fotbal", "în", "fiecare", "zi"],
        scrambled: ["zi", "fiecare", "în", "Fratele", "fotbal", "joacă"],
        translation_hu: "A fiútestvér minden nap focizik"
    },
    {
        difficulty: 'hard',
        original: ["Mama", "îngrijește", "grădina", "cu", "dragoste"],
        scrambled: ["dragoste", "cu", "îngrijește", "Mama", "grădina"],
        translation_hu: "Anya szeretettel gondozza a kertet"
    },
    {
        difficulty: 'hard',
        original: ["Tata", "construiește", "o", "casă", "nouă"],
        scrambled: ["nouă", "casă", "o", "construiește", "Tata"],
        translation_hu: "Apa épít egy új házat"
    },
    {
        difficulty: 'hard',
        original: ["Copilul", "bea", "sucul", "de", "mere"],
        scrambled: ["mere", "de", "Copilul", "sucul", "bea"],
        translation_hu: "A gyerek issza az almalevet"
    },
    {
        difficulty: 'hard',
        original: ["Bunicul", "povestește", "despre", "vremurile", "vechi"],
        scrambled: ["vechi", "vremurile", "despre", "Bunicul", "povestește"],
        translation_hu: "A nagyapa mesél a régi időkről"
    },
    {
        difficulty: 'hard',
        original: ["Pisica", "mănâncă", "peștele", "proaspăt", "zilnic"],
        scrambled: ["zilnic", "proaspăt", "Pisica", "peștele", "mănâncă"],
        translation_hu: "A macska naponta eszik friss halat"
    },
    {
        difficulty: 'hard',
        original: ["Câinele", "doarme", "sub", "copacul", "mare"],
        scrambled: ["mare", "copacul", "sub", "doarme", "Câinele"],
        translation_hu: "A kutya alszik a nagy fa alatt"
    },
    {
        difficulty: 'hard',
        original: ["Sora", "scrie", "o", "poezie", "frumoasă"],
        scrambled: ["frumoasă", "poezie", "o", "Sora", "scrie"],
        translation_hu: "A nővér ír egy szép verset"
    }
];

// Helper functions
export const getPuzzlesByDifficulty = (difficulty) => {
    return SENTENCE_BUILDER_PUZZLES.filter(p => p.difficulty === difficulty);
};

// person/tense === 'amestecat' (sau lipsa) => setul clasic, cu subiecte variate (Mama, Pisica, etc.)
// person/tense specifice => setul de 900 de propozitii conjugate pe persoana + timp ales
export const getRandomSentence = (difficulty, person = 'amestecat', tense = 'amestecat') => {
    if (person === 'amestecat' && tense === 'amestecat') {
        const puzzles = getPuzzlesByDifficulty(difficulty);
        return puzzles[Math.floor(Math.random() * puzzles.length)];
    }
    return getRandomConjugatedSentence(
        difficulty,
        person === 'amestecat' ? null : person,
        tense === 'amestecat' ? null : tense
    );
};
