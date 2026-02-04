import re

translations = {
    "Pisica": "A macska",
    "pisică": "macska",
    "Câinele": "A kutya",
    "Iepurele": "A nyúl",
    "Mărul": "Az alma",
    "mărul": "az alma",
    "Masa": "Az asztal",
    "masa": "az asztal",
    "Para": "A körte",
    "para": "a körte",
    "Scaunul": "A szék",
    "scaun": "a szék",
    "Cartea": "A könyv",
    "carte": "a könyv",
    "Calul": "A ló",
    "cal": "a ló",
    "Laptele": "A tej",
    "Mașina": "Az autó",
    "mașina": "az autó",
    "Roșia": "A paradicsom",
    "roșie": "a paradicsom",
    "Bunica": "A nagyi",
    "bunica": "a nagyi",
    "Ghiozdanul": "A hátizsák",
    "ghiozdan": "a hátizsák",
    "Cartoful": "A burgonya",
    "cartof": "a burgonya",
    "Puiul": "A csirke",
    "pui": "a csirke",
    "Papucul": "A papucs",
    "papuc": "a papucs",
    "Bicicleta": "A kerékpár",
    "bicicleta": "a kerékpár",
    "Vaca": "A tehén",
    "vaca": "a tehén",
    "Pantoful": "A cipő",
    "pantof": "a cipő",
    "Roșu": "A piros",
    "roșu": "a piros",
    "Caietul": "A füzet",
    "caiet": "a füzet",
    "Banana": "A banán",
    "banana": "a banán",
    "Creionul": "A ceruza",
    "creion": "a ceruza",
    "Morcovul": "A sárgarépa",
    "morcovul": "a sárgarépa",
    "Autobuzul": "A busz",
    "autobuz": "a busz",
    "Pâinea": "A kenyér",
    "pâine": "a kenyér",
    "Trenul": "A vonat",
    "tren": "a vonat",
    "Varza": "A káposzta",
    "varza": "a káposzta",
    "Scaunul": "A szék",
    "Portocala": "A narancs",
    "portocala": "a narancs",
    "Cireșele": "A cseresznye",
    "ciresele": "a cseresznye",
    "Albastru": "A kék",
    "albastru": "a kék",
    "Pasărea": "A madár",
    "păsarea": "a madár",
    "Verde": "A zöld",
    "verde": "a zöld",
    "Strugurii": "A szőlő",
    "strugurele": "a szőlő",
    "Oul": "Az tojás",
    "ou": "az tojás",
    "Găina": "A tyúk",
    "găina": "a tyúk",
    "Bunicul": "A nagyapa",
    "Castraveți": "A uborka",
    "castravete": "a uborka",
}

categories = {
    "fruct": "gyümölcs",
    "animale": "állatok",
    "animal": "állat",
    "obiect": "tárgy",
    "culori": "színek",
    "încălțăminte": "lábbeli",
    "obiecte": "tárgyak",
    "membri ai familiei": "családtagok",
    "persoană": "személy",
    "legumă": "zöldség",
    "legume": "zöldségek",
    "băutură": "ital",
    "animale de fermă": "háztáji állatok",
    "vehicul": "jármű",
    "vehicule": "járművek",
    "alimente": "élelmiszerek",
    "aliment": "élelmiszer",
    "carne/aliment": "hús/élelmiszer",
    "obiect școlar": "iskolai eszköz",
    "obiecte școlare": "iskolai eszközök",
    "mijloace de transport": "szállítóeszközök",
    "culori calde": "meleg színek",
    "culori reci sau neutre": "hideg vagy semleges színek",
    "fructe mici": "apró gyümölcsök",
    "animale terestre": "szárazföldi állatok",
    "mobilier": "bútor",
    "persoană din familie": "családtag",
    "femeie": "nő",
    "bărbați": "férfiak",
    "fructe": "gyümölcsök",
    "animal de casă": "háziállat",
    "produse de origine animală/cereale": "állati eredetű termékek / gabonafélék",
    "culori reci": "hideg színek",
    "părinți sau bunici": "szülők vagy nagyszülők",
    "făcută din cereale": "gabonából készült",
    "de origine animală": "állati eredetű",
    "crește sub pământ": "a föld alatt nő",
    "se poartă în casă": "házban viselik",
    "nu are motor": "nincs motorja",
    "se citește": "olvassák",
    "fruct exotic": "egzotikus gyümölcs",
    "din curcubeu": "a szivárványból",
    "generația bătrână": "idősebb generáció",
    "tineri/copii": "fiatalok / gyerekek",
    "are foi": "levelei vannak",
    "zboară și are pene": "repül és tollai vannak",
    "are blană": "bundája van",
    "fruct mare": "nagy gyümölcs",
    "fructe mai mari": "nagyobb gyümölcsök",
    "lichide sau moi": "folyékony vagy puha",
    "nu este culoare caldă pură": "nem tiszta meleg szín",
    "merge pe șine": "síneken megy",
    "merge pe șosea": "közúton megy",
    "băiat": "fiú",
    "fete/femei": "lányok/nők",
    "pentru transport": "szállításhoz",
    "pentru învățat": "tanuláshoz",
    "folosit pentru călărit": "lovagláshoz használt",
    "pentru hrană": "ételnek",
    "nu acoperă întreg piciorul": "nem fedi az egész lábat",
    "are nuanțe calde": "meleg árnyalatai vannak",
    "portocaliu": "narancssárga",
    "verzi sau roșii": "zöldek vagy pirosak",
    "are coajă": "héja/héja van",
    "transportă mulți oameni": "sok embert szállít",
    "transportă puțini": "keveset szállít",
    "sare": "ugrál",
    "merg sau aleargă": "mennek vagy futnak",
    "cresc în ciorchini": "fürtökben nőnek",
    "conține povestiri": "történeteket tartalmaz",
    "are pene": "tollai vannak",
    "păr/blană": "szőr/bunda",
    "animale de fermă mare": "nagy háztáji állatok",
    "animale mici de casă": "kis háziállatok",
}

def translate_explanation(exp):
    # Try basic pattern first
    match = re.search(r"(.*) este (un |o |)(.*)\. Celelalte sunt (.*)\.", exp)
    if match:
        subject, _, cat1, cat2 = match.groups()
        subject_hu = translations.get(subject.strip(), subject.strip())
        cat1_hu = categories.get(cat1.strip(), cat1.strip())
        cat2_hu = categories.get(cat2.strip(), cat2.strip())
        return f"{subject_hu} {cat1_hu}. A többi {cat2_hu}."
    
    # Try negative pattern
    match = re.search(r"(.*) nu este (un |o |)(.*)\. Celelalte sunt (.*)\.", exp)
    if match:
        subject, _, cat1, cat2 = match.groups()
        subject_hu = translations.get(subject.strip(), subject.strip())
        cat1_hu = categories.get(cat1.strip(), cat1.strip())
        cat2_hu = categories.get(cat2.strip(), cat2.strip())
        return f"{subject_hu} nem {cat1_hu}. A többi {cat2_hu}."

    # General replacements for custom cases
    res = exp
    for ro, hu in categories.items():
        res = res.replace(" " + ro, " " + hu)
    for ro, hu in translations.items():
        res = res.replace(ro, hu)
    
    res = res.replace("este", "egy")
    res = res.replace("sunt", "vannak")
    res = res.replace("Celelalte", "A többi")
    
    return res

with open('/Users/cristian-adrianbalasa/Desktop/meditatii-beti/src/data/wordDetectivePuzzles.js', 'r') as f:
    content = f.read()

def add_hu_explanation(match):
    full_entry = match.group(0)
    explanation = match.group(1)
    hu_explanation = translate_explanation(explanation)
    return f'explanation: "{explanation}",\n        explanation_hu: "{hu_explanation}"'

new_content = re.sub(r'explanation: "(.*?)"', add_hu_explanation, content)

with open('/Users/cristian-adrianbalasa/Desktop/meditatii-beti/src/data/wordDetectivePuzzles.js', 'w') as f:
    f.write(new_content)
