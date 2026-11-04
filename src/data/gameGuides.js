// Text despre fiecare joc (RO + HU) + exemple luate din datele jocului.
// Se afișează sub joc și ajunge în HTML-ul pre-randat, așa că pagina jocului are
// conținut indexabil chiar dacă jocul în sine rulează doar în browser.
// Exemplele sunt alese determinist (fără Math.random), ca serverul și browserul
// să randeze același HTML.

import { WORD_DETECTIVE_PUZZLES } from './wordDetectivePuzzles';
import { TRUE_FALSE_TRIVIA } from './trueFalseTrivia';
import { ARTICLE_NOUNS } from './articleNouns';
import { SENTENCE_BUILDER_PUZZLES } from './sentenceBuilderPuzzles';
import { SPEAKING_WORDS } from './speakingWords';

/** Câte `perLevel` elemente din fiecare nivel, în ordinea din fișier. */
function sampleByLevel(items, perLevel) {
    const levels = ['easy', 'medium', 'hard'];
    return levels.flatMap((level) => items.filter((item) => item.difficulty === level).slice(0, perLevel));
}

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

export const gameGuides = {
    articole: {
        RO: {
            title: 'Un sau O? Articolul nehotărât',
            subtitle: 'Potrivește fiecare cuvânt cu articolul corect.',
            aboutTitle: 'Despre joc',
            about: [
                'În limba română fiecare substantiv are un gen: masculin, feminin sau neutru, iar de gen depinde articolul. Pentru copiii vorbitori de maghiară, o limbă fără genuri gramaticale, alegerea dintre „un” și „o” este una dintre primele dificultăți.',
                'Jocul îi ajută să simtă genul cuvintelor prin repetiție: copilul vede cuvântul și traducerea lui în maghiară, alege articolul și primește imediat explicația.',
            ],
            howTitle: 'Cum se joacă',
            how: [
                'Copilul vede un substantiv în română, cu traducerea în maghiară.',
                'Alege articolul potrivit: „un” (masculin sau neutru) ori „o” (feminin).',
                'Primește pe loc răspunsul și explicația genului; nivelul crește treptat.',
            ],
            examplesTitle: 'Exemple din joc',
        },
        HU: {
            title: 'Un vagy O? A határozatlan névelő',
            subtitle: 'Párosítsd minden szót a helyes névelővel.',
            aboutTitle: 'A játékról',
            about: [
                'A román nyelvben minden főnévnek neme van (hímnem, nőnem vagy semlegesnem), és a névelő a nemtől függ. A magyar anyanyelvű gyerekeknek, akiknek az anyanyelvében nincs nyelvtani nem, az „un” és az „o” közötti választás az egyik első nehézség.',
                'A játék ismétléssel segít ráérezni a szavak nemére: a gyerek látja a szót és a magyar fordítását, kiválasztja a névelőt, és azonnal megkapja a magyarázatot.',
            ],
            howTitle: 'Hogyan kell játszani',
            how: [
                'A gyerek egy román főnevet lát a magyar fordításával együtt.',
                'Kiválasztja a megfelelő névelőt: „un” (hímnem vagy semlegesnem) vagy „o” (nőnem).',
                'Azonnal megkapja a választ és a nem magyarázatát; a szint fokozatosan nő.',
            ],
            examplesTitle: 'Példák a játékból',
        },
        examples: (lang) =>
            sampleByLevel(ARTICLE_NOUNS, 4).map((item) => ({
                main: `${item.correct_article.toLowerCase()} ${item.noun.toLowerCase()}`,
                detail: lang === 'HU' ? item.translation_hu.toLowerCase() : item.gender_explanation,
            })),
    },
    propozitii: {
        RO: {
            title: 'Construiește propoziția',
            subtitle: 'Pune cuvintele în ordinea corectă.',
            aboutTitle: 'Despre joc',
            about: [
                'În maghiară ordinea cuvintelor se schimbă după ce vrei să scoți în evidență, iar în română propoziția are de obicei ordinea subiect – predicat – complement. Jocul exersează această topică fără reguli de memorat.',
                'Pe lângă cele 100 de propoziții pe trei niveluri, copilul poate alege persoana și timpul verbului, așa că jocul devine și un exercițiu de conjugare.',
            ],
            howTitle: 'Cum se joacă',
            how: [
                'Copilul primește cuvintele amestecate ale unei propoziții și traducerea ei în maghiară.',
                'Le așază în ordinea corectă, atingând cuvintele unul câte unul.',
                'La greșeală vede unde a încurcat ordinea și poate încerca din nou.',
            ],
            examplesTitle: 'Exemple de propoziții',
        },
        HU: {
            title: 'Építsd fel a mondatot',
            subtitle: 'Rakd a szavakat helyes sorrendbe.',
            aboutTitle: 'A játékról',
            about: [
                'A magyarban a szórend attól függ, mit akarunk kiemelni, a román mondat viszont általában alany – állítmány – bővítmény sorrendet követ. A játék ezt a szórendet gyakoroltatja, megtanulandó szabályok nélkül.',
                'A három szinten elosztott 100 mondat mellett a gyerek kiválaszthatja az ige személyét és idejét is, így a játék igeragozási gyakorlattá is válik.',
            ],
            howTitle: 'Hogyan kell játszani',
            how: [
                'A gyerek megkapja egy mondat összekevert szavait és a mondat magyar fordítását.',
                'A szavakat egyenként megérintve helyes sorrendbe rakja őket.',
                'Ha hibázik, látja, hol keverte össze a sorrendet, és újra próbálkozhat.',
            ],
            examplesTitle: 'Példamondatok',
        },
        examples: () =>
            sampleByLevel(SENTENCE_BUILDER_PUZZLES, 3).map((item) => ({
                main: `${item.original.join(' ')}.`,
                detail: item.translation_hu,
            })),
    },
    intrusul: {
        RO: {
            title: 'Găsește intrusul',
            subtitle: 'Care cuvânt nu se potrivește?',
            aboutTitle: 'Despre joc',
            about: [
                'Patru cuvinte, dintre care unul nu se potrivește. Copilul trebuie să descopere ce au în comun celelalte trei (animale, fructe, culori, obiecte, meserii) și să găsească intrusul.',
                'Exercițiul fixează vocabularul pe categorii și antrenează gândirea logică; după fiecare răspuns apare explicația, în română și în maghiară.',
            ],
            howTitle: 'Cum se joacă',
            how: [
                'Pe ecran apar patru cuvinte, fiecare cu imaginea lui.',
                'Copilul alege cuvântul care nu face parte din grup.',
                'Explicația arată categoria comună; nivelul se adaptează după rezultate.',
            ],
            examplesTitle: 'Exemple din joc',
        },
        HU: {
            title: 'Keresd a kakukktojást',
            subtitle: 'Melyik szó nem illik ide?',
            aboutTitle: 'A játékról',
            about: [
                'Négy szó, amelyek közül az egyik nem illik a többihez. A gyereknek ki kell találnia, mi a közös a másik háromban (állatok, gyümölcsök, színek, tárgyak, foglalkozások), és meg kell találnia a kakukktojást.',
                'A gyakorlat kategóriák szerint rögzíti a szókincset és fejleszti a logikus gondolkodást; minden válasz után megjelenik a magyarázat románul és magyarul.',
            ],
            howTitle: 'Hogyan kell játszani',
            how: [
                'A képernyőn négy szó jelenik meg, mindegyik a saját képével.',
                'A gyerek kiválasztja azt a szót, amelyik nem tartozik a csoportba.',
                'A magyarázat megmutatja a közös kategóriát; a szint az eredményekhez igazodik.',
            ],
            examplesTitle: 'Példák a játékból',
        },
        examples: (lang) =>
            sampleByLevel(WORD_DETECTIVE_PUZZLES, 2).map((item) => ({
                main: item.options.join(', '),
                detail: `${lang === 'HU' ? 'Kakukktojás' : 'Intrusul'}: ${item.correctAnswer}. ${
                    lang === 'HU' ? item.explanation_hu : item.explanation
                }`,
            })),
    },
    'adevarat-fals': {
        RO: {
            title: 'Adevărat sau Fals?',
            subtitle: 'Ai 10 secunde: este corect sau nu?',
            aboutTitle: 'Despre joc',
            about: [
                'Afirmații scurte în limba română despre lucruri cunoscute: animale, culori, mâncare, natură, școală. Copilul are 10 secunde să decidă dacă afirmația este adevărată sau falsă.',
                'Jocul exersează înțelegerea rapidă a propozițiilor în română, iar la fiecare afirmație copilul poate vedea traducerea în maghiară și o explicație scurtă.',
            ],
            howTitle: 'Cum se joacă',
            how: [
                'Citește afirmația afișată pe ecran.',
                'Apasă „Adevărat” sau „Fals” înainte să expire cele 10 secunde.',
                'Răspunsurile corecte la rând cresc seria și scorul.',
            ],
            examplesTitle: 'Exemple de afirmații',
        },
        HU: {
            title: 'Igaz vagy hamis?',
            subtitle: '10 másodperced van: igaz vagy sem?',
            aboutTitle: 'A játékról',
            about: [
                'Rövid román nyelvű állítások ismert dolgokról: állatokról, színekről, ételekről, a természetről, az iskoláról. A gyereknek 10 másodperce van eldönteni, hogy az állítás igaz vagy hamis.',
                'A játék a román mondatok gyors megértését gyakoroltatja, és minden állításnál megnézhető a magyar fordítás és egy rövid magyarázat.',
            ],
            howTitle: 'Hogyan kell játszani',
            how: [
                'Olvasd el a képernyőn megjelenő állítást.',
                'Nyomd meg az „Igaz” vagy a „Hamis” gombot, mielőtt letelik a 10 másodperc.',
                'Az egymás utáni helyes válaszok növelik a sorozatot és a pontszámot.',
            ],
            examplesTitle: 'Példaállítások',
        },
        examples: (lang) =>
            sampleByLevel(TRUE_FALSE_TRIVIA, 2).map((item) => ({
                main: item.statement,
                detail:
                    lang === 'HU'
                        ? `${item.isTrue ? 'Igaz' : 'Hamis'}. (${item.translation_hu})`
                        : `${item.isTrue ? 'Adevărat' : 'Fals'}. ${item.explanation}`,
            })),
    },
    vorbeste: {
        RO: {
            title: 'Spune în română!',
            subtitle: 'Vezi cuvântul și spune-l cu voce tare.',
            aboutTitle: 'Despre joc',
            about: [
                'Copilul vede un cuvânt în maghiară și un desen, apoi spune traducerea cu voce tare, în română. Aplicația folosește recunoașterea vocală a browserului și îi spune pe loc dacă a pronunțat corect.',
                'Jocul este gratuit și funcționează direct în browser, fără instalare. Dacă microfonul nu este disponibil, copilul poate scrie răspunsul.',
            ],
            howTitle: 'Cum se joacă',
            how: [
                'Apasă pe microfon și permite accesul browserului la el.',
                'Spune cuvântul în română; aplicația îl recunoaște și verifică răspunsul.',
                'O rundă are 5 cuvinte; la final vezi scorul și poți începe alta.',
            ],
            examplesTitle: 'Cuvinte din joc',
        },
        HU: {
            title: 'Mondd románul!',
            subtitle: 'Nézd meg a szót, és mondd ki hangosan.',
            aboutTitle: 'A játékról',
            about: [
                'A gyerek egy magyar szót és egy rajzot lát, majd hangosan, románul kimondja a fordítást. Az alkalmazás a böngésző beszédfelismerését használja, és azonnal jelzi, hogy helyes volt-e a kiejtés.',
                'A játék ingyenes, és telepítés nélkül, közvetlenül a böngészőben működik. Ha nincs elérhető mikrofon, a gyerek be is írhatja a választ.',
            ],
            howTitle: 'Hogyan kell játszani',
            how: [
                'Nyomd meg a mikrofont, és engedélyezd a böngészőnek a használatát.',
                'Mondd ki a szót románul; az alkalmazás felismeri és ellenőrzi a választ.',
                'Egy kör 5 szóból áll; a végén látod a pontszámot, és újat kezdhetsz.',
            ],
            examplesTitle: 'Szavak a játékból',
        },
        examples: () =>
            SPEAKING_WORDS.slice(0, 12).map((item) => ({
                main: `${item.emoji} ${capitalize(item.hu)} → ${item.answer}`,
                detail: null,
            })),
    },
};
