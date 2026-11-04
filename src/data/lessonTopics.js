// O pagină indexabilă pentru fiecare SUBIECT de lecție (nu pentru fiecare rând din
// tabelul `materials`): fișa demo, fișa completă și testul aceleiași lecții sunt
// rânduri separate în Supabase și ar produce pagini aproape identice.
//
// `materialIds` leagă subiectul de rândurile din `materials` (demo, complet, quiz).
// Textele (RO + HU) sunt scrise pentru pagină; trebuie revizuite de Beatrice.
//
// Pentru un subiect nou: adaugă un obiect aici cu slug, categoria principală și
// ID-urile materialelor din Admin. URL-ul devine <categorie>/<slug> (RO) și
// /hu/<categorie>/<slug> (HU).

export const lessonTopics = [
    {
        slug: 'cazurile-substantivului',
        category: 'gymnasium_curriculum',
        alsoIn: ['practice_exercises'],
        materialIds: [
            '3e2ce4e0-c295-4120-b103-400dc9afbc05', // Demo-Cazurile substantivului (gratuit)
            'e256e906-e0e9-43b9-be0e-08a555a0845d', // Cazurile substantivului (Premium)
            '14100108-35e0-4a6f-bbe6-07b6b3d64205', // cazurile substantivului – test
        ],
        level: { RO: 'Clasele V-VIII', HU: 'V–VIII. osztály' },
        RO: {
            title: 'Cazurile Substantivului – Întrebări, Explicații și Test | Vorbim Românește',
            description:
                'Nominativ, acuzativ, genitiv, dativ și vocativ: întrebările fiecărui caz, cum le deosebești și exemple rezolvate. Fișă PDF demo gratuită și test grilă cu explicații.',
            label: 'Cazurile substantivului',
            h1: 'Cazurile substantivului',
            lead: 'Cele cinci cazuri ale substantivului în limba română, explicate logic pentru elevii vorbitori de maghiară.',
            intro: [
                'Limba maghiară exprimă relațiile dintre cuvinte prin sufixe, iar limba română are cinci cazuri, care se recunosc după întrebări, prepoziții și articole, nu după terminații. De aceea, pentru elevii vorbitori de maghiară, cazurile sunt una dintre cele mai grele lecții de gramatică din gimnaziu.',
                'Fișa adună într-un singur loc întrebările fiecărui caz și regulile simple după care le deosebești, cu exemple analizate complet: felul substantivului, genul, numărul, cazul și articularea.',
            ],
            contentsTitle: 'Ce găsești în fișă',
            contents: [
                'Tabelul cu întrebările fiecărui caz (cine? ce? pe cine? al cui? cui? …)',
                'Regula de bază: când un substantiv la întrebarea „ce?” este nominativ și când este acuzativ',
                'Prepozițiile care cer acuzativul și articolele genitivale al, a, ai, ale',
                'Exemple analizate complet, gata de copiat în caiet',
            ],
            rulesTitle: 'Regulile pe scurt',
            rules: [
                {
                    name: 'Nominativ',
                    question: 'cine? ce?',
                    text: 'Substantivul face acțiunea (este subiect).',
                    example: '„Câinele a mâncat un os.” → Cine a mâncat? câinele – nominativ.',
                },
                {
                    name: 'Acuzativ',
                    question: 'pe cine? ce? și întrebări cu prepoziție (cu cine? la ce? despre cine? unde?)',
                    text: 'Substantivul răspunde la „ce?” dar nu face acțiunea, sau are în față o prepoziție (cu, la, în, pe, sub, despre).',
                    example: '„Andrei pune ciocolata pe dulap.” → Unde pune? pe dulap – acuzativ.',
                },
                {
                    name: 'Genitiv',
                    question: 'al cui? a cui? ai cui? ale cui?',
                    text: 'Arată posesia, adică cui îi aparține ceva.',
                    example: '„Casa mamei este curată.” → A cui casă? a mamei – genitiv.',
                },
                {
                    name: 'Dativ',
                    question: 'cui?',
                    text: 'Arată cui i se dă sau cui i se adresează ceva (destinatarul).',
                    example: '„Dau o carte prietenului.” → Cui dau? prietenului – dativ.',
                },
                {
                    name: 'Vocativ',
                    question: 'nu are întrebare',
                    text: 'Îl folosim când ne adresăm direct cuiva; se desparte prin virgulă și este adesea urmat de semnul exclamării.',
                    example: '„Ana, vino aici!” → Ana – vocativ.',
                },
            ],
            questionsTitle: 'Verifică-te: exemple de întrebări din test',
            questions: [
                {
                    q: 'Ce caz arată posesia?',
                    a: 'Genitivul.',
                    why: 'Genitivul răspunde la întrebările al cui? a cui? ai cui? ale cui? și arată cui îi aparține ceva.',
                },
                {
                    q: 'Întrebarea „cui?” este specifică cărui caz?',
                    a: 'Dativului.',
                    why: 'Dativul arată destinatarul: cui i se dă sau cui i se spune ceva.',
                },
                {
                    q: 'În propoziția „Andrei pune ciocolata pe dulap”, în ce caz este substantivul „dulap”?',
                    a: 'Acuzativ.',
                    why: 'Are în față prepoziția „pe”, iar substantivele precedate de prepoziții ca pe, cu, la, în sunt în acuzativ.',
                },
            ],
        },
        HU: {
            title: 'A román főnév esetei – kérdések, magyarázat és teszt | Vorbim Românește',
            description:
                'Nominativ, acuzativ, genitiv, dativ és vocativ: az egyes esetek kérdései, hogyan különböztesd meg őket, megoldott példák. Ingyenes PDF demó és teszt magyarázattal.',
            label: 'A főnév esetei',
            h1: 'A román főnév esetei (cazurile substantivului)',
            lead: 'A román főnév öt esete logikusan elmagyarázva, magyar anyanyelvű diákoknak.',
            intro: [
                'A magyar nyelv toldalékokkal fejezi ki a szavak közötti viszonyokat, a románnak viszont öt esete van, és ezeket nem a végződésükről, hanem a kérdésekről, az elöljárókról és a névelőkről lehet felismerni. Ezért a magyar anyanyelvű diákoknak az esetek az egyik legnehezebb gimnáziumi nyelvtani lecke.',
                'A feladatlap egy helyen gyűjti össze az egyes esetek kérdéseit és azokat az egyszerű szabályokat, amelyekkel megkülönböztetheted őket, teljesen elemzett példákkal: a főnév fajtája, neme, száma, esete és névelője.',
            ],
            contentsTitle: 'Mit tartalmaz a feladatlap',
            contents: [
                'Táblázat az egyes esetek kérdéseivel (cine? ce? pe cine? al cui? cui? …)',
                'Az alapszabály: mikor nominativ és mikor acuzativ a „ce?” kérdésre felelő főnév',
                'Az acuzativot vonzó elöljárók és az al, a, ai, ale birtokos névelők',
                'Teljesen elemzett példák, amelyeket átmásolhatsz a füzetedbe',
            ],
            rulesTitle: 'A szabályok röviden',
            rules: [
                {
                    name: 'Nominativ (alanyeset)',
                    question: 'cine? ce? (ki? mi?)',
                    text: 'A főnév végzi a cselekvést (alany).',
                    example: '„Câinele a mâncat un os.” → Cine a mâncat? (Ki evett?) câinele – nominativ.',
                },
                {
                    name: 'Acuzativ (tárgyeset)',
                    question: 'pe cine? ce? és elöljárós kérdések (cu cine? la ce? despre cine? unde?)',
                    text: 'A főnév a „ce?” kérdésre felel, de nem ő végzi a cselekvést, vagy elöljáró áll előtte (cu, la, în, pe, sub, despre).',
                    example: '„Andrei pune ciocolata pe dulap.” → Unde pune? (Hová teszi?) pe dulap – acuzativ.',
                },
                {
                    name: 'Genitiv (birtokos eset)',
                    question: 'al cui? a cui? ai cui? ale cui? (kié?)',
                    text: 'Birtoklást fejez ki, vagyis azt, hogy valami kié.',
                    example: '„Casa mamei este curată.” → A cui casă? (Kinek a háza?) a mamei – genitiv.',
                },
                {
                    name: 'Dativ (részes eset)',
                    question: 'cui? (kinek?)',
                    text: 'Azt mutatja, kinek adunk vagy kinek szánunk valamit (a címzett).',
                    example: '„Dau o carte prietenului.” → Cui dau? (Kinek adok?) prietenului – dativ.',
                },
                {
                    name: 'Vocativ (megszólító eset)',
                    question: 'nincs kérdése',
                    text: 'Akkor használjuk, amikor közvetlenül megszólítunk valakit; vesszővel választjuk el, és gyakran felkiáltójel követi.',
                    example: '„Ana, vino aici!” (Ana, gyere ide!) → Ana – vocativ.',
                },
            ],
            questionsTitle: 'Ellenőrizd magad: példák a tesztből',
            questions: [
                {
                    q: 'Melyik eset fejez ki birtoklást?',
                    a: 'A genitiv (birtokos eset).',
                    why: 'A genitiv az al cui? a cui? ai cui? ale cui? (kié?) kérdésekre felel, és azt mutatja, hogy valami kié.',
                },
                {
                    q: 'Melyik esetre jellemző a „cui?” (kinek?) kérdés?',
                    a: 'A dativra (részes eset).',
                    why: 'A dativ a címzettet jelöli: kinek adunk vagy kinek mondunk valamit.',
                },
                {
                    q: 'Az „Andrei pune ciocolata pe dulap” mondatban milyen esetben áll a „dulap” főnév?',
                    a: 'Acuzativban.',
                    why: 'A „pe” elöljáró áll előtte, és a pe, cu, la, în elöljárók után álló főnevek acuzativban vannak.',
                },
            ],
        },
    },
    {
        slug: 'subiectul-si-atributul-substantival',
        category: 'gymnasium_curriculum',
        alsoIn: ['practice_exercises'],
        materialIds: [
            '3c24de22-a96e-419d-a556-e956b580b627', // subiectul și atributul substantival (demo)
            '5264989b-9aa1-40b7-864e-05c70d39e9e0', // subiectul și atributul substantival (Premium)
            '3770880d-181f-474d-8a1f-e8255b7d4fac', // subiect și atributul substantival – test
        ],
        level: { RO: 'Clasele V-VIII', HU: 'V–VIII. osztály' },
        RO: {
            title: 'Subiectul și Atributul Substantival – Fișă și Test | Vorbim Românește',
            description:
                'Cum recunoști subiectul (cine? ce?) și atributul substantival (care? ce fel de? al cui?): reguli explicate logic, exemple, fișă PDF demo gratuită și test grilă cu explicații.',
            label: 'Subiectul și atributul substantival',
            h1: 'Subiectul și atributul substantival',
            lead: 'Două funcții sintactice care depind de cazul substantivului, explicate pas cu pas.',
            intro: [
                'Subiectul și atributul substantival sunt două dintre funcțiile sintactice cu care elevii vorbitori de maghiară se încurcă cel mai des, pentru că în limba română ele depind de cazul în care stă substantivul.',
                'Fișa le explică pas cu pas: ce întrebare pui pentru fiecare, în ce caz poate sta și cum le deosebești în propoziție, cu exemple din viața de zi cu zi.',
            ],
            contentsTitle: 'Ce găsești în fișă',
            contents: [
                'Întrebările subiectului și regula cazului nominativ',
                'Întrebările atributului substantival și cazurile în care poate sta',
                'Diferența dintre atributul substantival prepozițional și cel genitival',
                'Exemple ilustrate și exerciții de recunoaștere',
            ],
            rulesTitle: 'Regulile pe scurt',
            rules: [
                {
                    name: 'Subiectul',
                    question: 'cine? ce? (puse verbului)',
                    text: 'Subiectul exprimat prin substantiv stă întotdeauna în cazul nominativ.',
                    example: '„Andrei este deștept.” → Cine este deștept? Andrei – subiect, nominativ.',
                },
                {
                    name: 'Atributul substantival prepozițional',
                    question: 'care? ce fel de?',
                    text: 'Determină un alt substantiv și are în față o prepoziție, deci stă în acuzativ.',
                    example: '„Mașina de la bunicul este veche.” → Care mașină? de la bunicul – atribut substantival, acuzativ.',
                },
                {
                    name: 'Atributul substantival genitival',
                    question: 'al cui? a cui? ai cui? ale cui?',
                    text: 'Determină un alt substantiv și arată cui îi aparține acesta; stă în genitiv.',
                    example: '„Desenele colegei sunt frumoase.” → Ale cui desene? colegei – atribut substantival genitival, genitiv.',
                },
            ],
            questionsTitle: 'Verifică-te: exemple de întrebări din test',
            questions: [
                {
                    q: 'În ce caz stă subiectul exprimat prin substantiv?',
                    a: 'În nominativ.',
                    why: 'Funcția de subiect apare numai în cazul nominativ.',
                },
                {
                    q: 'La ce întrebări răspunde atributul substantival?',
                    a: 'Care? Ce fel de? Al/a/ai/ale cui?',
                    why: 'Atributul determină un alt substantiv, de aceea întrebarea se pune substantivului determinat, nu verbului.',
                },
                {
                    q: 'În propoziția „Mașina de la bunicul este veche”, ce funcție sintactică are „de la bunicul”?',
                    a: 'Atribut substantival prepozițional, în acuzativ.',
                    why: 'Întrebarea „care mașină?” arată că determină un substantiv, iar prepoziția „de la” cere cazul acuzativ.',
                },
            ],
        },
        HU: {
            title: 'Alany és főnévi jelző a román nyelvben – feladatlap és teszt | Vorbim Românește',
            description:
                'Hogyan ismerd fel a román mondatban az alanyt (subiectul) és a főnévi jelzőt (atributul substantival): logikus szabályok, példák, ingyenes PDF demó és teszt magyarázattal.',
            label: 'Alany és főnévi jelző',
            h1: 'Az alany és a főnévi jelző (subiectul și atributul substantival)',
            lead: 'Két mondatrész, amely a főnév esetétől függ, lépésről lépésre elmagyarázva.',
            intro: [
                'Az alany (subiectul) és a főnévi jelző (atributul substantival) az a két mondatrész, amelyet a magyar anyanyelvű diákok a leggyakrabban összekevernek, mert a román nyelvben mindkettő attól függ, milyen esetben áll a főnév.',
                'A feladatlap lépésről lépésre magyarázza el őket: milyen kérdéssel ismered fel mindegyiket, milyen esetben állhatnak, és hogyan különbözteted meg őket a mondatban, hétköznapi példákkal.',
            ],
            contentsTitle: 'Mit tartalmaz a feladatlap',
            contents: [
                'Az alany kérdései és a nominativ esetre vonatkozó szabály',
                'A főnévi jelző kérdései és az esetek, amelyekben állhat',
                'Az elöljárós és a birtokos főnévi jelző közötti különbség',
                'Illusztrált példák és felismerési gyakorlatok',
            ],
            rulesTitle: 'A szabályok röviden',
            rules: [
                {
                    name: 'Az alany (subiectul)',
                    question: 'cine? ce? (ki? mi?) – az igének feltéve',
                    text: 'A főnévvel kifejezett alany mindig nominativ (alanyeset) esetben áll.',
                    example: '„Andrei este deștept.” → Cine este deștept? (Ki okos?) Andrei – alany, nominativ.',
                },
                {
                    name: 'Elöljárós főnévi jelző',
                    question: 'care? ce fel de? (melyik? milyen?)',
                    text: 'Egy másik főnevet határoz meg, és elöljáró áll előtte, ezért acuzativban van.',
                    example: '„Mașina de la bunicul este veche.” → Care mașină? (Melyik autó?) de la bunicul – főnévi jelző, acuzativ.',
                },
                {
                    name: 'Birtokos főnévi jelző',
                    question: 'al cui? a cui? ai cui? ale cui? (kié?)',
                    text: 'Egy másik főnevet határoz meg, és azt mutatja, kié; genitivben áll.',
                    example: '„Desenele colegei sunt frumoase.” → Ale cui desene? (Kinek a rajzai?) colegei – birtokos főnévi jelző, genitiv.',
                },
            ],
            questionsTitle: 'Ellenőrizd magad: példák a tesztből',
            questions: [
                {
                    q: 'Milyen esetben áll a főnévvel kifejezett alany?',
                    a: 'Nominativban (alanyeset).',
                    why: 'Az alany szerepe csak nominativ esetben fordul elő.',
                },
                {
                    q: 'Milyen kérdésekre felel a főnévi jelző?',
                    a: 'Care? Ce fel de? Al/a/ai/ale cui? (Melyik? Milyen? Kié?)',
                    why: 'A jelző egy másik főnevet határoz meg, ezért a kérdést a meghatározott főnévnek tesszük fel, nem az igének.',
                },
                {
                    q: 'A „Mașina de la bunicul este veche” mondatban milyen mondatrész a „de la bunicul”?',
                    a: 'Elöljárós főnévi jelző, acuzativ esetben.',
                    why: 'A „care mașină?” (melyik autó?) kérdés mutatja, hogy főnevet határoz meg, a „de la” elöljáró pedig acuzativot követel.',
                },
            ],
        },
    },
    {
        slug: 'model-evaluare-nationala-1',
        category: 'national_exam_prep',
        alsoIn: [],
        materialIds: [
            '1f010591-3322-4320-b705-f52ce0f7e920', // model evaluare naționala 1 (gratuit)
        ],
        level: { RO: 'Clasa a VIII-a', HU: 'VIII. osztály' },
        RO: {
            title: 'Model Evaluare Națională Limba Română (1) – PDF Gratuit | Vorbim Românește',
            description:
                'Un model complet de subiect pentru Evaluarea Națională la Limba și literatura română, clasa a VIII-a, de descărcat gratuit în format PDF, pentru exersare în condiții de examen.',
            label: 'Model Evaluare Națională 1',
            h1: 'Model de subiect pentru Evaluarea Națională la limba română (1)',
            lead: 'Exersează pe un subiect complet, cronometrat, exact ca în ziua examenului.',
            intro: [
                'Cel mai bun mod de a te pregăti pentru Evaluarea Națională este să lucrezi subiecte complete, cu ceasul pe masă. Așa afli cât timp îți ia fiecare cerință și unde pierzi cele mai multe puncte.',
                'Acest model urmează structura probei de Limba și literatura română pentru clasa a VIII-a și poate fi descărcat gratuit, ca să vezi cum lucrăm înainte de a te abona.',
            ],
            contentsTitle: 'Ce găsești în model',
            contents: [
                'Cerințe de înțelegere a textului, pe text literar și nonliterar',
                'Cerințe de vocabular și de gramatică',
                'Cerințe de redactare (compuneri)',
                'Timp de lucru recomandat: 2 ore, ca la examen',
            ],
            rulesTitle: 'Sfaturi pentru ziua examenului',
            rules: [
                {
                    name: 'Citește de două ori',
                    text: 'Prima lectură pentru a înțelege textul, a doua cu cerințele în minte, subliniind ce îți trebuie.',
                },
                {
                    name: 'Respectă cerința',
                    text: 'La compuneri, verifică numărul de cuvinte și toate elementele cerute: fiecare are punctajul lui.',
                },
                {
                    name: 'Păstrează 10 minute la final',
                    text: 'Recitește tot pentru ortografie, punctuație și acordul dintre subiect și predicat.',
                },
            ],
            questionsTitle: null,
            questions: [],
        },
        HU: {
            title: 'Román képességvizsga mintafeladat (1) – ingyenes PDF | Vorbim Românește',
            description:
                'Teljes mintafeladatsor a nyolcadikos román nyelv és irodalom képességvizsgához (Evaluare Națională), ingyenesen letölthető PDF-ben, vizsgakörülmények közötti gyakorláshoz.',
            label: 'Képességvizsga minta 1',
            h1: 'Mintafeladatsor a román képességvizsgához (Evaluare Națională, 1)',
            lead: 'Gyakorolj egy teljes, időre megoldott feladatsoron, pontosan úgy, mint a vizsga napján.',
            intro: [
                'A képességvizsgára (Evaluare Națională) úgy lehet a legjobban felkészülni, ha teljes feladatsorokat oldasz meg, órával az asztalon. Így kiderül, mennyi időt vesz igénybe egy-egy feladat, és hol veszíted a legtöbb pontot.',
                'Ez a minta a nyolcadikos román nyelv és irodalom vizsga szerkezetét követi, és ingyenesen letölthető, hogy előfizetés előtt lásd, hogyan dolgozunk.',
            ],
            contentsTitle: 'Mit tartalmaz a minta',
            contents: [
                'Szövegértési feladatok irodalmi és nem irodalmi szövegre',
                'Szókincs- és nyelvtani feladatok',
                'Szövegalkotási feladatok (fogalmazás)',
                'Javasolt munkaidő: 2 óra, mint a vizsgán',
            ],
            rulesTitle: 'Tanácsok a vizsga napjára',
            rules: [
                {
                    name: 'Olvasd el kétszer',
                    text: 'Először azért, hogy megértsd a szöveget, másodszor a feladatokkal a fejedben, aláhúzva, amire szükséged lesz.',
                },
                {
                    name: 'Tartsd be a követelményeket',
                    text: 'A fogalmazásnál ellenőrizd a szavak számát és minden kért elemet: mindegyikre külön pont jár.',
                },
                {
                    name: 'Hagyj 10 percet a végére',
                    text: 'Olvass át mindent helyesírás, központozás és az alany–állítmány egyeztetése szempontjából.',
                },
            ],
            questionsTitle: null,
            questions: [],
        },
    },
];

/** Subiectul căruia îi aparține un rând din `materials`, dacă există. */
export function topicForMaterial(materialId) {
    return lessonTopics.find((topic) => topic.materialIds.includes(materialId)) || null;
}
