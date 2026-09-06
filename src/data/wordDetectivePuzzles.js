// 100 de puzzle-uri statice pentru "Găsește Intrusul"
// Organizate pe niveluri: easy (1-33), medium (34-67), hard (68-100)

export const WORD_DETECTIVE_PUZZLES = [
    // ========== EASY (1-33) - Categorii foarte clare ==========
    {
        difficulty: 'easy',
        options: ["pisica", "câinele", "iepurele", "mărul"],
        correctAnswer: "mărul",
        explanation: "Mărul este un fruct. Celelalte sunt animale.",
        explanation_hu: "Az alma gyümölcs. A többi állat."
    },
    {
        difficulty: 'easy',
        options: ["roșu", "verde", "galben", "ghiozdan"],
        correctAnswer: "ghiozdan",
        explanation: "Ghiozdanul este un obiect. Celelalte sunt culori.",
        explanation_hu: "Az iskolatáska tárgy. A többi szín."
    },
    {
        difficulty: 'easy',
        options: ["pantof", "sandale", "cizme", "para"],
        correctAnswer: "para",
        explanation: "Para este un fruct. Celelalte sunt încălțăminte.",
        explanation_hu: "A körte gyümölcs. A többi lábbeli."
    },
    {
        difficulty: 'easy',
        options: ["mărul", "banana", "portocala", "scaun"],
        correctAnswer: "scaun",
        explanation: "Scaunul este un obiect. Celelalte sunt fructe.",
        explanation_hu: "A szék tárgy. A többi gyümölcs."
    },
    {
        difficulty: 'easy',
        options: ["mama", "tata", "sora", "carte"],
        correctAnswer: "carte",
        explanation: "Cartea este un obiect. Celelalte sunt membri ai familiei.",
        explanation_hu: "A könyv tárgy. A többi családtag."
    },
    {
        difficulty: 'easy',
        options: ["caiet", "creion", "carte", "pisică"],
        correctAnswer: "pisică",
        explanation: "Pisica este un animal. Celelalte sunt obiecte școlare.",
        explanation_hu: "A macska állat. A többi iskolai eszköz."
    },
    {
        difficulty: 'easy',
        options: ["albastru", "portocaliu", "negru", "cal"],
        correctAnswer: "cal",
        explanation: "Calul este un animal. Celelalte sunt culori.",
        explanation_hu: "A ló állat. A többi szín."
    },
    {
        difficulty: 'easy',
        options: ["vaca", "porcul", "găina", "lapte"],
        correctAnswer: "lapte",
        explanation: "Laptele este băutură. Celelalte sunt animale de fermă.",
        explanation_hu: "A tej ital. A többi háztáji állat."
    },
    {
        difficulty: 'easy',
        options: ["pâine", "brânză", "ou", "mașina"],
        correctAnswer: "mașina",
        explanation: "Mașina este un vehicul. Celelalte sunt alimente.",
        explanation_hu: "Az autó jármű. A többi élelmiszer."
    },
    {
        difficulty: 'easy',
        options: ["bicicleta", "autobuz", "tren", "roșie"],
        correctAnswer: "roșie",
        explanation: "Roșia este o legumă. Celelalte sunt vehicule.",
        explanation_hu: "A paradicsom zöldség. A többi jármű."
    },
    {
        difficulty: 'easy',
        options: ["castravete", "morcovul", "varza", "bunica"],
        correctAnswer: "bunica",
        explanation: "Bunica este persoană. Celelalte sunt legume.",
        explanation_hu: "A nagyi személy. A többi zöldség."
    },
    {
        difficulty: 'easy',
        options: ["fratele", "bunicul", "sora", "ghiozdan"],
        correctAnswer: "ghiozdan",
        explanation: "Ghiozdanul este obiect. Celelalte sunt membri ai familiei.",
        explanation_hu: "A hátizsák tárgy. A többi családtag."
    },
    {
        difficulty: 'easy',
        options: ["câinele", "pisica", "calul", "cartof"],
        correctAnswer: "cartof",
        explanation: "Cartoful este o legumă. Celelalte sunt animale.",
        explanation_hu: "A burgonya zöldség. A többi állat."
    },
    {
        difficulty: 'easy',
        options: ["roșu", "galben", "verde", "pui"],
        correctAnswer: "pui",
        explanation: "Puiul este carne/aliment. Celelalte sunt culori.",
        explanation_hu: "A csirke hús/élelmiszer. A többi szín."
    },
    {
        difficulty: 'easy',
        options: ["căpșuna", "ciresele", "strugurele", "papuc"],
        correctAnswer: "papuc",
        explanation: "Papucul este încălțăminte. Celelalte sunt fructe.",
        explanation_hu: "A papucs lábbeli. A többi gyümölcs."
    },
    {
        difficulty: 'easy',
        options: ["creion", "scaun", "carte", "iepurele"],
        correctAnswer: "iepurele",
        explanation: "Iepurele este animal. Celelalte sunt obiecte.",
        explanation_hu: "A nyúl állat. A többi tárgy."
    },
    {
        difficulty: 'easy',
        options: ["lapte", "ou", "brânză", "bicicleta"],
        correctAnswer: "bicicleta",
        explanation: "Bicicleta este vehicul. Celelalte sunt alimente.",
        explanation_hu: "A kerékpár jármű. A többi élelmiszer."
    },
    {
        difficulty: 'easy',
        options: ["creion", "caiet", "ghiozdan", "vaca"],
        correctAnswer: "vaca",
        explanation: "Vaca este animal. Celelalte sunt obiecte școlare.",
        explanation_hu: "A tehén állat. A többi iskolai eszköz."
    },
    {
        difficulty: 'easy',
        options: ["albastru", "negru", "portocaliu", "mărul"],
        correctAnswer: "mărul",
        explanation: "Mărul este fruct. Celelalte sunt culori.",
        explanation_hu: "Az alma gyümölcs. A többi szín."
    },
    {
        difficulty: 'easy',
        options: ["mama", "tata", "fratele", "pantof"],
        correctAnswer: "pantof",
        explanation: "Pantoful este încălțăminte. Celelalte sunt membri ai familiei.",
        explanation_hu: "A cipő lábbeli. A többi családtag."
    },
    {
        difficulty: 'easy',
        options: ["pisica", "câinele", "iepurele", "roșu"],
        correctAnswer: "roșu",
        explanation: "Roșu este culoare. Celelalte sunt animale.",
        explanation_hu: "A piros culoare. A többi állat."
    },
    {
        difficulty: 'easy',
        options: ["mărul", "para", "banana", "caiet"],
        correctAnswer: "caiet",
        explanation: "Caietul este obiect. Celelalte sunt fructe.",
        explanation_hu: "A füzet tárgy. A többi gyümölcs."
    },
    {
        difficulty: 'easy',
        options: ["mașina", "autobuz", "tren", "carte"],
        correctAnswer: "carte",
        explanation: "Cartea este obiect. Celelalte sunt vehicule.",
        explanation_hu: "A könyv tárgy. A többi jármű."
    },
    {
        difficulty: 'easy',
        options: ["pâine", "lapte", "brânză", "calul"],
        correctAnswer: "calul",
        explanation: "Calul este animal. Celelalte sunt alimente.",
        explanation_hu: "A ló állat. A többi élelmiszer."
    },
    {
        difficulty: 'easy',
        options: ["roșie", "castravete", "morcovul", "ghiozdan"],
        correctAnswer: "ghiozdan",
        explanation: "Ghiozdanul este obiect. Celelalte sunt legume.",
        explanation_hu: "A hátizsák tárgy. A többi zöldség."
    },
    {
        difficulty: 'easy',
        options: ["bunica", "bunicul", "sora", "scaun"],
        correctAnswer: "scaun",
        explanation: "Scaunul este obiect. Celelalte sunt membri ai familiei.",
        explanation_hu: "A szék tárgy. A többi családtag."
    },
    {
        difficulty: 'easy',
        options: ["verde", "galben", "roșu", "pisica"],
        correctAnswer: "pisica",
        explanation: "Pisica este animal. Celelalte sunt culori.",
        explanation_hu: "A macska állat. A többi szín."
    },
    {
        difficulty: 'easy',
        options: ["portocala", "căpșuna", "ciresele", "caiet"],
        correctAnswer: "caiet",
        explanation: "Caietul este obiect școlar. Celelalte sunt fructe.",
        explanation_hu: "A füzet iskolai eszköz. A többi gyümölcs."
    },
    {
        difficulty: 'easy',
        options: ["cizme", "sandale", "papuc", "banana"],
        correctAnswer: "banana",
        explanation: "Banana este fruct. Celelalte sunt încălțăminte.",
        explanation_hu: "A banán gyümölcs. A többi lábbeli."
    },
    {
        difficulty: 'easy',
        options: ["vaca", "porcul", "găina", "creion"],
        correctAnswer: "creion",
        explanation: "Creionul este obiect școlar. Celelalte sunt animale de fermă.",
        explanation_hu: "A ceruza iskolai eszköz. A többi háztáji állat."
    },
    {
        difficulty: 'easy',
        options: ["mama", "tata", "fratele", "morcovul"],
        correctAnswer: "morcovul",
        explanation: "Morcovul este legumă. Celelalte sunt membri ai familiei.",
        explanation_hu: "A sárgarépa zöldség. A többi családtag."
    },
    {
        difficulty: 'easy',
        options: ["câinele", "calul", "iepurele", "autobuz"],
        correctAnswer: "autobuz",
        explanation: "Autobuzul este vehicul. Celelalte sunt animale.",
        explanation_hu: "A busz jármű. A többi állat."
    },
    {
        difficulty: 'easy',
        options: ["albastru", "portocaliu", "negru", "pâine"],
        correctAnswer: "pâine",
        explanation: "Pâinea este aliment. Celelalte sunt culori.",
        explanation_hu: "A kenyér élelmiszer. A többi szín."
    },

    // ========== MEDIUM (34-67) - Mix între categorii apropiate ==========
    {
        difficulty: 'medium',
        options: ["mărul", "morcovul", "para", "banana"],
        correctAnswer: "morcovul",
        explanation: "Morcovul este legumă. Celelalte sunt fructe.",
        explanation_hu: "A sárgarépa zöldség. A többi gyümölcs."
    },
    {
        difficulty: 'medium',
        options: ["pisica", "iepurele", "păsarea", "vaca"],
        correctAnswer: "vaca",
        explanation: "Vaca este animal de fermă mare. Celelalte sunt animale mici de casă.",
        explanation_hu: "A tehén animal de fermă mare. A többi kis háziállat."
    },
    {
        difficulty: 'medium',
        options: ["roșu", "portocaliu", "galben", "roșie"],
        correctAnswer: "roșie",
        explanation: "Roșia este legumă. Celelalte sunt culori calde.",
        explanation_hu: "A paradicsom zöldség. A többi meleg szín."
    },
    {
        difficulty: 'medium',
        options: ["mama", "sora", "bunica", "tata"],
        correctAnswer: "tata",
        explanation: "Tata este bărbat. Celelalte sunt femei din familie.",
        explanation_hu: "Tata bărbat. A többi femei din familie."
    },
    {
        difficulty: 'medium',
        options: ["creion", "carte", "caiet", "pantof"],
        correctAnswer: "pantof",
        explanation: "Pantoful este încălțăminte. Celelalte sunt obiecte școlare.",
        explanation_hu: "A cipő lábbeli. A többi iskolai eszköz."
    },
    {
        difficulty: 'medium',
        options: ["pâine", "brânză", "lapte", "castravete"],
        correctAnswer: "castravete",
        explanation: "Castraveți este legumă. Celelalte sunt produse lactate/grâu.",
        explanation_hu: "A uborka zöldség. A többi produse lactate/grâu."
    },
    {
        difficulty: 'medium',
        options: ["mașina", "bicicleta", "tren", "ghiozdan"],
        correctAnswer: "ghiozdan",
        explanation: "Ghiozdanul nu este vehicul. Celelalte sunt mijloace de transport.",
        explanation_hu: "Ghiozdanul nu jármű. A többi szállítóeszközök."
    },
    {
        difficulty: 'medium',
        options: ["albastru", "verde", "negru", "alb"],
        correctAnswer: "verde",
        explanation: "Verde este culoare caldă. Celelalte sunt culori reci sau neutre.",
        explanation_hu: "A zöld culoare caldă. A többi hideg vagy semleges szín."
    },
    {
        difficulty: 'medium',
        options: ["căpșuna", "ciresele", "strugurele", "morcovul"],
        correctAnswer: "morcovul",
        explanation: "Morcovul este legumă. Celelalte sunt fructe mici.",
        explanation_hu: "A sárgarépa zöldség. A többi apró gyümölcs."
    },
    {
        difficulty: 'medium',
        options: ["câinele", "pisica", "calul", "păsarea"],
        correctAnswer: "păsarea",
        explanation: "Pasărea zboară. Celelalte sunt animale terestre.",
        explanation_hu: "A madár zboară. A többi vannak állat terestre."
    },
    {
        difficulty: 'medium',
        options: ["pantof", "cizme", "sandale", "scaun"],
        correctAnswer: "scaun",
        explanation: "Scaunul este mobilier. Celelalte sunt încălțăminte.",
        explanation_hu: "A szék bútor. A többi lábbeli."
    },
    {
        difficulty: 'medium',
        options: ["fratele", "bunicul", "tata", "mama"],
        correctAnswer: "mama",
        explanation: "Mama este femeie. Celelalte sunt bărbați din familie.",
        explanation_hu: "Mama nő. A többi bărbați din familie."
    },
    {
        difficulty: 'medium',
        options: ["mărul", "para", "portocala", "varza"],
        correctAnswer: "varza",
        explanation: "Varza este legumă. Celelalte sunt fructe.",
        explanation_hu: "A káposzta zöldség. A többi gyümölcs."
    },
    {
        difficulty: 'medium',
        options: ["caiet", "carte", "creion", "bicicleta"],
        correctAnswer: "bicicleta",
        explanation: "Bicicleta este vehicul. Celelalte sunt obiecte școlare.",
        explanation_hu: "A kerékpár jármű. A többi iskolai eszköz."
    },
    {
        difficulty: 'medium',
        options: ["vaca", "porcul", "găina", "pisica"],
        correctAnswer: "pisica",
        explanation: "Pisica este animal de casă. Celelalte sunt animale de fermă.",
        explanation_hu: "A macska háziállat. A többi háztáji állat."
    },
    {
        difficulty: 'medium',
        options: ["roșu", "galben", "verde", "pui"],
        correctAnswer: "pui",
        explanation: "Puiul este aliment. Celelalte sunt culori.",
        explanation_hu: "A csirke élelmiszer. A többi szín."
    },
    {
        difficulty: 'medium',
        options: ["banana", "mărul", "para", "pâine"],
        correctAnswer: "pâine",
        explanation: "Pâinea nu este fruct. Celelalte sunt fructe.",
        explanation_hu: "Pâinea nu gyümölcs. A többi gyümölcs."
    },
    {
        difficulty: 'medium',
        options: ["mașina", "autobuz", "tren", "scaun"],
        correctAnswer: "scaun",
        explanation: "Scaunul este mobilier. Celelalte sunt vehicule.",
        explanation_hu: "A szék bútor. A többi jármű."
    },
    {
        difficulty: 'medium',
        options: ["albastru", "negru", "portocaliu", "lapte"],
        correctAnswer: "lapte",
        explanation: "Laptele este băutură. Celelalte sunt culori.",
        explanation_hu: "A tej ital. A többi szín."
    },
    {
        difficulty: 'medium',
        options: ["roșie", "morcovul", "castravete", "căpșuna"],
        correctAnswer: "căpșuna",
        explanation: "Căpșuna este fruct. Celelalte sunt legume.",
        explanation_hu: "Căpșuna gyümölcs. A többi zöldség."
    },
    {
        difficulty: 'medium',
        options: ["mama", "bunica", "sora", "fratele"],
        correctAnswer: "fratele",
        explanation: "Fratele este bărbat. Celelalte sunt femei din familie.",
        explanation_hu: "Fratele bărbat. A többi femei din familie."
    },
    {
        difficulty: 'medium',
        options: ["creion", "caiet", "carte", "mărul"],
        correctAnswer: "mărul",
        explanation: "Mărul este fruct. Celelalte sunt obiecte școlare.",
        explanation_hu: "Az alma gyümölcs. A többi iskolai eszköz."
    },
    {
        difficulty: 'medium',
        options: ["pantof", "sandale", "cizme", "brânză"],
        correctAnswer: "brânză",
        explanation: "Brânza este aliment. Celelalte sunt încălțăminte.",
        explanation_hu: "Brânza élelmiszer. A többi lábbeli."
    },
    {
        difficulty: 'medium',
        options: ["câinele", "pisica", "iepurele", "morcovul"],
        correctAnswer: "morcovul",
        explanation: "Morcovul este legumă. Celelalte sunt animale.",
        explanation_hu: "A sárgarépa zöldség. A többi állat."
    },
    {
        difficulty: 'medium',
        options: ["verde", "galben", "roșu", "ghiozdan"],
        correctAnswer: "ghiozdan",
        explanation: "Ghiozdanul este obiect. Celelalte sunt culori.",
        explanation_hu: "A hátizsák tárgy. A többi szín."
    },
    {
        difficulty: 'medium',
        options: ["pâine", "ou", "brânză", "banana"],
        correctAnswer: "banana",
        explanation: "Banana este fruct. Celelalte sunt produse de origine animală/cereale.",
        explanation_hu: "A banán gyümölcs. A többi állati eredetű termékek / gabonafélék."
    },
    {
        difficulty: 'medium',
        options: ["bicicleta", "mașina", "autobuz", "carte"],
        correctAnswer: "carte",
        explanation: "Cartea este obiect. Celelalte sunt vehicule.",
        explanation_hu: "A könyv tárgy. A többi jármű."
    },
    {
        difficulty: 'medium',
        options: ["mărul", "para", "ciresele", "calul"],
        correctAnswer: "calul",
        explanation: "Calul este animal. Celelalte sunt fructe.",
        explanation_hu: "A ló állat. A többi gyümölcs."
    },
    {
        difficulty: 'medium',
        options: ["tata", "fratele", "bunicul", "sora"],
        correctAnswer: "sora",
        explanation: "Sora este femeie. Celelalte sunt bărbați din familie.",
        explanation_hu: "Sora nő. A többi bărbați din familie."
    },
    {
        difficulty: 'medium',
        options: ["roșie", "varza", "castravete", "portocala"],
        correctAnswer: "portocala",
        explanation: "Portocala este fruct. Celelalte sunt legume.",
        explanation_hu: "A narancs gyümölcs. A többi zöldség."
    },
    {
        difficulty: 'medium',
        options: ["vaca", "găina", "porcul", "mărul"],
        correctAnswer: "mărul",
        explanation: "Mărul este fruct. Celelalte sunt animale de fermă.",
        explanation_hu: "Az alma gyümölcs. A többi háztáji állat."
    },
    {
        difficulty: 'medium',
        options: ["albastru", "portocaliu", "negru", "pisica"],
        correctAnswer: "pisica",
        explanation: "Pisica este animal. Celelalte sunt culori.",
        explanation_hu: "A macska állat. A többi szín."
    },
    {
        difficulty: 'medium',
        options: ["caiet", "carte", "creion", "autobuz"],
        correctAnswer: "autobuz",
        explanation: "Autobuzul este vehicul. Celelalte sunt obiecte școlare.",
        explanation_hu: "A busz jármű. A többi iskolai eszköz."
    },
    {
        difficulty: 'medium',
        options: ["mama", "bunica", "sora", "bunicul"],
        correctAnswer: "bunicul",
        explanation: "Bunicul este bărbat. Celelalte sunt femei din familie.",
        explanation_hu: "A nagyapa bărbat. A többi femei din familie."
    },

    // ========== HARD (68-100) - Diferențe mai subtile ==========
    {
        difficulty: 'hard',
        options: ["mărul", "para", "ciresele", "căpșuna"],
        correctAnswer: "ciresele",
        explanation: "Cireșele cresc în pereche. Celelalte fructe cresc individual.",
        explanation_hu: "A cseresznye cresc în pereche. A többi gyümölcse cresc individual."
    },
    {
        difficulty: 'hard',
        options: ["câinele", "pisica", "calul", "iepurele"],
        correctAnswer: "calul",
        explanation: "Calul este animal mare. Celelalte sunt animale mici.",
        explanation_hu: "A ló animal mare. A többi animale mici."
    },
    {
        difficulty: 'hard',
        options: ["roșu", "galben", "verde", "albastru"],
        correctAnswer: "albastru",
        explanation: "Albastru este culoare rece. Celelalte sunt culori calde.",
        explanation_hu: "A kék culoare rece. A többi meleg szín."
    },
    {
        difficulty: 'hard',
        options: ["mama", "tata", "bunica", "bunicul"],
        correctAnswer: "mama",
        explanation: "Mama nu este bunic. Celelalte sunt părinți sau bunici.",
        explanation_hu: "Mama nu bunic. A többi szülők vagy nagyszülők."
    },
    {
        difficulty: 'hard',
        options: ["pâine", "brânză", "lapte", "ou"],
        correctAnswer: "pâine",
        explanation: "Pâinea este făcută din cereale. Celelalte sunt de origine animală.",
        explanation_hu: "A kenyér gabonából készült. A többi állati eredetű."
    },
    {
        difficulty: 'hard',
        options: ["morcovul", "roșie", "castravete", "varza"],
        correctAnswer: "morcovul",
        explanation: "Morcovul crește sub pământ. Celelalte cresc deasupra.",
        explanation_hu: "A sárgarépa a föld alatt nő. A többi cresc deasupra."
    },
    {
        difficulty: 'hard',
        options: ["pantof", "cizme", "sandale", "papuc"],
        correctAnswer: "papuc",
        explanation: "Papucii se poartă în casă. Celelalte se poartă afară.",
        explanation_hu: "Papucii házban viselik. A többi se poartă afară."
    },
    {
        difficulty: 'hard',
        options: ["mașina", "bicicleta", "autobuz", "tren"],
        correctAnswer: "bicicleta",
        explanation: "Bicicleta nu are motor. Celelalte au motor.",
        explanation_hu: "A kerékpár nincs motorja. A többi au motor."
    },
    {
        difficulty: 'hard',
        options: ["creion", "carte", "caiet", "pix"],
        correctAnswer: "carte",
        explanation: "Cartea se citește. Celelalte se folosesc pentru scris/desenat.",
        explanation_hu: "A könyv olvasásra való. A többi írásra és rajzolásra."
    },
    {
        difficulty: 'hard',
        options: ["vaca", "porcul", "găina", "calul"],
        correctAnswer: "găina",
        explanation: "Găina ouă ouă. Celelalte nu produc ouă.",
        explanation_hu: "A tyúk az tojásă az tojásă. A többi nu produc az tojásă."
    },
    {
        difficulty: 'hard',
        options: ["mărul", "para", "banana", "portocala"],
        correctAnswer: "banana",
        explanation: "Banana este fruct exotic. Celelalte cresc în Europa.",
        explanation_hu: "A banán egy gyümölcs exotic. A többi cresc în Europa."
    },
    {
        difficulty: 'hard',
        options: ["albastru", "verde", "galben", "negru"],
        correctAnswer: "negru",
        explanation: "Negru nu este culoare din curcubeu. Celelalte sunt.",
        explanation_hu: "Negru nu egy culoare a szivárványból. A többi vannak."
    },
    {
        difficulty: 'hard',
        options: ["fratele", "sora", "mama", "bunicul"],
        correctAnswer: "bunicul",
        explanation: "Bunicul este din generația bătrână. Celelalte sunt tineri/copii.",
        explanation_hu: "A nagyapa din generația bătrână. A többi fiatalok / gyerekek."
    },
    {
        difficulty: 'hard',
        options: ["roșie", "morcovul", "varza", "castravete"],
        correctAnswer: "varza",
        explanation: "Varza are foi. Celelalte nu au structură de foi.",
        explanation_hu: "A káposzta levelei vannak. A többi nu au structură de foi."
    },
    {
        difficulty: 'hard',
        options: ["pisica", "câinele", "iepurele", "păsarea"],
        correctAnswer: "păsarea",
        explanation: "Pasărea zboară și are pene. Celelalte au blană.",
        explanation_hu: "A madár repül és tollai vannak. A többi au blană."
    },
    {
        difficulty: 'hard',
        options: ["căpșuna", "strugurele", "ciresele", "mărul"],
        correctAnswer: "mărul",
        explanation: "Mărul este fruct mare. Celelalte sunt fructe mici.",
        explanation_hu: "Az alma nagy gyümölcs. A többi apró gyümölcs."
    },
    {
        difficulty: 'hard',
        options: ["pâine", "brânză", "ou", "lapte"],
        correctAnswer: "pâine",
        explanation: "Pâinea este solidă și uscată. Celelalte sunt lichide sau moi.",
        explanation_hu: "A kenyér solidă și uscată. A többi folyékony vagy puha."
    },
    {
        difficulty: 'hard',
        options: ["roșu", "portocaliu", "galben", "verde"],
        correctAnswer: "verde",
        explanation: "Verde nu este culoare caldă pură. Celelalte sunt culori foarte calde.",
        explanation_hu: "Verde nu culoare caldă pură. A többi culori foarte calde."
    },
    {
        difficulty: 'hard',
        options: ["mașina", "autobuz", "tren", "bicicleta"],
        correctAnswer: "tren",
        explanation: "Trenul merge pe șine. Celelalte merg pe șosea.",
        explanation_hu: "A vonat síneken megy. A többi merg pe șosea."
    },
    {
        difficulty: 'hard',
        options: ["mama", "sora", "bunica", "fratele"],
        correctAnswer: "fratele",
        explanation: "Fratele este băiat. Celelalte sunt fete/femei.",
        explanation_hu: "Fratele fiú. A többi lányok/nők."
    },
    {
        difficulty: 'hard',
        options: ["caiet", "carte", "creion", "ghiozdan"],
        correctAnswer: "ghiozdan",
        explanation: "Ghiozdanul este pentru transport. Celelalte sunt pentru învățat.",
        explanation_hu: "A hátizsák szállításhoz. A többi tanuláshoz."
    },
    {
        difficulty: 'hard',
        options: ["vaca", "porcul", "calul", "găina"],
        correctAnswer: "calul",
        explanation: "Calul este folosit pentru călărit. Celelalte pentru hrană.",
        explanation_hu: "A ló egy lovagláshoz használt. A többi ételnek."
    },
    {
        difficulty: 'hard',
        options: ["mărul", "para", "banana", "ciresele"],
        correctAnswer: "ciresele",
        explanation: "Cireșele sunt foarte mici. Celelalte sunt fructe mai mari.",
        explanation_hu: "A cseresznye vannak foarte mici. A többi vannak gyümölcse mai mari."
    },
    {
        difficulty: 'hard',
        options: ["pantof", "sandale", "cizme", "papuc"],
        correctAnswer: "sandale",
        explanation: "Sandalele nu acoperă întreg piciorul. Celelalte îl acoperă.",
        explanation_hu: "Sandalele nem fedi az egész lábat. A többi îl acoperă."
    },
    {
        difficulty: 'hard',
        options: ["albastru", "verde", "portocaliu", "galben"],
        correctAnswer: "albastru",
        explanation: "Albastru este rece. Celelalte au nuanțe calde.",
        explanation_hu: "A kék egy rece. A többi au nuanțe a lóde."
    },
    {
        difficulty: 'hard',
        options: ["tata", "bunicul", "fratele", "mama"],
        correctAnswer: "mama",
        explanation: "Mama este femeie. Celelalte sunt bărbați.",
        explanation_hu: "Mama nő. A többi férfiak."
    },
    {
        difficulty: 'hard',
        options: ["roșie", "castravete", "morcovul", "varza"],
        correctAnswer: "morcovul",
        explanation: "Morcovul este portocaliu. Celelalte sunt verzi sau roșii.",
        explanation_hu: "A sárgarépa narancssárga. A többi zöldek vagy pirosak."
    },
    {
        difficulty: 'hard',
        options: ["pâine", "ou", "brânză", "lapte"],
        correctAnswer: "ou",
        explanation: "Oul are coajă. Celelalte nu au coajă.",
        explanation_hu: "Az tojás héja/héja van. A többi nu au coajă."
    },
    {
        difficulty: 'hard',
        options: ["mașina", "bicicleta", "autobuz", "tren"],
        correctAnswer: "autobuz",
        explanation: "Autobuzul transportă mulți oameni. Celelalte transportă puțini.",
        explanation_hu: "A busz sok embert szállít. A többi keveset szállít."
    },
    {
        difficulty: 'hard',
        options: ["pisica", "câinele", "iepurele", "calul"],
        correctAnswer: "iepurele",
        explanation: "Iepurele sare. Celelalte merg sau aleargă.",
        explanation_hu: "A nyúl ugrál. A többi mennek vagy futnak."
    },
    {
        difficulty: 'hard',
        options: ["mărul", "para", "portocala", "strugurele"],
        correctAnswer: "strugurele",
        explanation: "Strugurii cresc în ciorchini. Celelalte cresc individual.",
        explanation_hu: "A szőlő fürtökben nőnek. A többi cresc individual."
    },
    {
        difficulty: 'hard',
        options: ["creion", "caiet", "carte", "stilou"],
        correctAnswer: "carte",
        explanation: "Cartea conține povestiri. Celelalte sunt pentru scris/desenat.",
        explanation_hu: "A könyv történeteket tartalmaz. A többi írásra és rajzolásra való."
    },
    {
        difficulty: 'hard',
        options: ["vaca", "găina", "porcul", "calul"],
        correctAnswer: "găina",
        explanation: "Găina are pene. Celelalte au păr/blană.",
        explanation_hu: "A tyúk tollai vannak. A többi au szőr/bunda."
    }
];

// Helper pentru a selecta puzzle-uri pe nivel
export const getPuzzlesByDifficulty = (difficulty) => {
    return WORD_DETECTIVE_PUZZLES.filter(p => p.difficulty === difficulty);
};

export const getRandomPuzzle = (difficulty) => {
    const puzzles = getPuzzlesByDifficulty(difficulty);
    return puzzles[Math.floor(Math.random() * puzzles.length)];
};
