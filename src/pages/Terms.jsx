import React from 'react';
import { LegalLayout, Section, Bullets, Callout, Ext, Internal } from '../components/LegalLayout';
import { legalEntity, paymentProcessor, anpc } from '../lib/legalEntity';

const Terms = () => (
    <LegalLayout
        title="Termeni și Condiții"
        intro="Acest document stabilește condițiile în care poți folosi platforma Vorbim-Romaneste.ro și serviciile oferite prin intermediul ei. Te rugăm să îl citești înainte de a-ți crea un cont sau de a achiziționa abonamentul Premium."
        lastUpdated={legalEntity.lastUpdated}
    >
        <Section number="1" title="Cine administrează acest site" id="identificare">
            <p>Site-ul {legalEntity.domain} („Site-ul”, „Platforma”) este administrat de:</p>
            <Bullets
                items={[
                    <><strong>{legalEntity.name}</strong>, persoană fizică, în calitate de autor și furnizor al conținutului educațional</>,
                    <>Adresă de corespondență: {legalEntity.address}</>,
                    <>E-mail: <Ext href={`mailto:${legalEntity.email}`}>{legalEntity.email}</Ext></>,
                    <>Telefon: <Ext href={`tel:${legalEntity.phoneHref}`}>{legalEntity.phone}</Ext></>,
                ]}
            />
            <p>
                Comunicarea cu noi se poate face în limba română sau în limba maghiară, la datele de contact de mai
                sus, pe WhatsApp, sau folosind canalele din pagina <Internal to="/contact">Contact</Internal>.
            </p>
        </Section>

        <Section number="2" title="Acceptarea termenilor" id="acceptare">
            <p>
                Prin accesarea Site-ului, crearea unui cont sau achiziționarea abonamentului Premium, confirmi că ai
                citit, ai înțeles și accepți acești Termeni și Condiții, împreună cu{' '}
                <Internal to="/confidentialitate">Politica de Confidențialitate</Internal> și{' '}
                <Internal to="/cookies">Politica de Cookies</Internal>. Dacă nu ești de acord cu oricare dintre
                prevederi, te rugăm să nu utilizezi Site-ul.
            </p>
            <p>
                Dacă ai sub 16 ani, poți folosi Site-ul doar cu acordul și sub supravegherea unui părinte sau a
                reprezentantului legal, iar contul și eventualul abonament trebuie create de acesta.
            </p>
        </Section>

        <Section number="3" title="Serviciile oferite" id="servicii">
            <p>Prin intermediul Platformei sunt puse la dispoziție:</p>
            <Bullets
                items={[
                    <><strong>Conținut gratuit</strong> — jocuri educative interactive (secțiunea Copii), materiale demonstrative și articole informative, accesibile fără plată;</>,
                    <><strong>Conținut Premium</strong> — bibliotecă de materiale digitale (fișe de lucru PDF, lecții, teste grilă, scheme recapitulative), accesibilă pe bază de abonament;</>,
                    <><strong>Meditații online</strong> — ședințe individuale de pregătire la limba română, desfășurate prin Google Meet sau Zoom, programate de comun acord.</>,
                ]}
            />
            <p>
                Conținutul are caracter educațional. Nu garantăm obținerea unui anumit rezultat școlar sau a unei
                anumite note la examen, întrucât rezultatele depind în mod determinant de implicarea și de munca
                individuală a cursantului.
            </p>
        </Section>

        <Section number="4" title="Contul de utilizator" id="cont">
            <p>
                Accesul la anumite secțiuni necesită crearea unui cont, prin autentificare cu Google. Ești responsabil
                pentru păstrarea confidențialității datelor de acces și pentru activitatea desfășurată prin contul tău.
            </p>
            <Bullets
                items={[
                    'Datele furnizate la înregistrare trebuie să fie reale și actuale.',
                    'Un cont este destinat unei singure persoane; partajarea credențialelor nu este permisă.',
                    'Poți solicita oricând ștergerea contului scriind la adresa de e-mail de contact.',
                    'Ne rezervăm dreptul de a suspenda conturile folosite pentru a copia, distribui sau revinde materialele.',
                ]}
            />
        </Section>

        <Section number="5" title="Prețuri, plată și vânzătorul înregistrat" id="plati">
            <p>
                Abonamentul Premium costă <strong>49,99 RON pe lună</strong>. Prețul afișat pe Site este prețul final
                perceput consumatorului. Eventualele taxe aplicabile (TVA) sunt calculate și afișate în pagina de
                finalizare a comenzii, în funcție de țara ta.
            </p>
            <Callout tone="brand">
                <strong>Important — cine este vânzătorul.</strong> Plățile online sunt procesate de{' '}
                <Ext href={paymentProcessor.url}>{paymentProcessor.name}</Ext>, care acționează în calitate de{' '}
                <em>{paymentProcessor.role}</em>. Aceasta înseamnă că, din punct de vedere juridic,{' '}
                {paymentProcessor.name} este vânzătorul către tine: ea încasează plata, emite factura și gestionează
                obligațiile fiscale aferente. {legalEntity.name} este autorul și furnizorul conținutului educațional
                livrat prin Platformă. Pentru aspecte legate de facturare, rambursări sau date de plată se aplică și{' '}
                <Ext href={paymentProcessor.terms}>termenii {paymentProcessor.name}</Ext>.
            </Callout>
            <p>
                Nu colectăm și nu stocăm pe serverele noastre datele cardului tău bancar. Acestea sunt introduse direct
                în pagina securizată a procesatorului de plăți.
            </p>
            <p>
                Abonamentul se reînnoiește automat lunar, până la anularea lui. Îl poți anula oricând din e-mailul de
                confirmare a comenzii (link de gestionare a abonamentului) sau scriindu-ne la{' '}
                <Ext href={`mailto:${legalEntity.email}`}>{legalEntity.email}</Ext>. Anularea produce efecte la finalul
                perioadei deja plătite; până atunci păstrezi accesul la conținut.
            </p>
            <p>
                Meditațiile individuale se achită separat, lunar sau pe pachete de ședințe, conform înțelegerii
                stabilite înainte de începerea colaborării.
            </p>
        </Section>

        <Section number="6" title="Dreptul de retragere (14 zile) și rambursări" id="retragere">
            <p>
                În calitate de consumator ai, ca regulă, dreptul de a te retrage dintr-un contract la distanță în termen
                de <strong>14 zile calendaristice</strong>, fără a fi nevoit să justifici decizia, conform{' '}
                <strong>OUG nr. 34/2014</strong> privind drepturile consumatorilor în cadrul contractelor încheiate cu
                profesioniștii.
            </p>
            <Callout tone="warn">
                <strong>Excepția pentru conținut digital.</strong> Potrivit art. 16 lit. m) din OUG 34/2014, dreptul de
                retragere <strong>se pierde</strong> în cazul furnizării de conținut digital care nu este livrat pe
                suport material, dacă executarea a început cu <strong>acordul tău prealabil expres</strong> și după ce
                ai confirmat că <strong>iei cunoștință de faptul că îți pierzi dreptul de retragere</strong>. La
                activarea abonamentului îți este solicitată această confirmare; dacă o acorzi și accesezi biblioteca
                Premium, nu mai poți solicita rambursarea pentru perioada respectivă.
            </Callout>
            <p>
                Dacă nu ai accesat și nu ai descărcat niciun material Premium, poți solicita rambursarea integrală în
                termen de 14 zile de la plată, scriind la{' '}
                <Ext href={`mailto:${legalEntity.email}`}>{legalEntity.email}</Ext> sau direct către{' '}
                {paymentProcessor.name}. Rambursarea se face pe aceeași metodă de plată, în cel mult 14 zile de la
                confirmarea cererii.
            </p>
            <p>
                <strong>Ședințe de meditații:</strong> reprogramarea este gratuită dacă ne anunți cu cel puțin 24 de ore
                înainte. Ședințele anulate în ziua desfășurării sau la care cursantul nu se prezintă se consideră
                efectuate și nu se restituie.
            </p>
            <p>
                Aceste prevederi nu afectează drepturile legale de care beneficiezi în caz de neconformitate a
                conținutului digital (OUG nr. 141/2021), inclusiv dreptul la aducerea în conformitate, la reducerea
                prețului sau la încetarea contractului.
            </p>
        </Section>

        <Section number="7" title="Proprietate intelectuală" id="proprietate">
            <p>
                Toate materialele publicate pe Site — texte, fișe de lucru, PDF-uri, exerciții, jocuri, grafică, logo și
                structura Platformei — sunt create de {legalEntity.name} și sunt protejate de Legea nr. 8/1996 privind
                dreptul de autor și drepturile conexe.
            </p>
            <p>Abonamentul îți acordă o licență personală, neexclusivă și netransferabilă, care îți permite:</p>
            <Bullets
                items={[
                    'să consulți și să descarci materialele pentru uz strict personal sau pentru elevii pe care îi pregătești în cadrul propriei activități didactice;',
                    'să tipărești fișele de lucru pentru utilizare individuală.',
                ]}
            />
            <p>Este interzisă, fără acordul scris prealabil:</p>
            <Bullets
                items={[
                    'redistribuirea, publicarea sau încărcarea materialelor pe alte site-uri, grupuri sau platforme;',
                    'revânzarea, închirierea sau utilizarea comercială a materialelor;',
                    'partajarea contului sau a fișierelor cu persoane care nu au abonament;',
                    'eliminarea însemnelor de identificare de pe materiale.',
                ]}
            />
        </Section>

        <Section number="8" title="Utilizarea Platformei" id="utilizare">
            <p>Te obligi să nu folosești Site-ul pentru a:</p>
            <Bullets
                items={[
                    'încărca sau transmite conținut ilegal, ofensator ori care încalcă drepturile altor persoane;',
                    'încerca accesarea neautorizată a conturilor, a bazei de date sau a zonelor administrative;',
                    'utiliza roboți, scripturi sau alte mijloace automate pentru extragerea în masă a conținutului;',
                    'perturba funcționarea Platformei sau securitatea acesteia.',
                ]}
            />
        </Section>

        <Section number="9" title="Disponibilitate și răspundere" id="raspundere">
            <p>
                Depunem eforturi rezonabile pentru ca Platforma să fie disponibilă permanent, însă nu putem garanta
                funcționarea neîntreruptă sau lipsită de erori. Accesul poate fi suspendat temporar pentru mentenanță,
                actualizări sau din cauze independente de voința noastră (furnizori de găzduire, rețea, forță majoră).
            </p>
            <p>
                Anumite jocuri folosesc funcții ale browserului (microfon, sinteză vocală) a căror disponibilitate
                depinde de dispozitivul și browserul folosit; absența acestora nu constituie neconformitate a
                serviciului.
            </p>
            <p>
                Răspunderea noastră este limitată, în măsura permisă de lege, la contravaloarea sumelor efectiv achitate
                de tine în ultimele 12 luni. Nu răspundem pentru rezultate școlare, decizii sau pierderi indirecte
                rezultate din utilizarea materialelor.
            </p>
        </Section>

        <Section number="10" title="Protecția datelor cu caracter personal" id="date">
            <p>
                Prelucrarea datelor tale personale este descrisă detaliat în{' '}
                <Internal to="/confidentialitate">Politica de Confidențialitate</Internal>, întocmită conform
                Regulamentului (UE) 2016/679 (GDPR). Cookie-urile folosite sunt explicate în{' '}
                <Internal to="/cookies">Politica de Cookies</Internal>.
            </p>
        </Section>

        <Section number="11" title="Modificarea termenilor" id="modificari">
            <p>
                Putem actualiza acești Termeni pentru a reflecta modificări legislative sau schimbări ale serviciilor.
                Versiunea aplicabilă este cea publicată pe această pagină la momentul utilizării. Modificările
                substanțiale care privesc abonamentul activ îți vor fi comunicate prin e-mail, cu cel puțin 30 de zile
                înainte de a produce efecte; dacă nu ești de acord, poți anula abonamentul fără costuri suplimentare.
            </p>
        </Section>

        <Section number="12" title="Legea aplicabilă și soluționarea litigiilor" id="litigii">
            <p>
                Acești Termeni sunt guvernați de legea română. Orice neînțelegere încercăm să o rezolvăm pe cale
                amiabilă — scrie-ne mai întâi la{' '}
                <Ext href={`mailto:${legalEntity.email}`}>{legalEntity.email}</Ext> și îți răspundem în cel mult 30 de
                zile.
            </p>
            <p>Dacă nu ajungem la o soluție, în calitate de consumator te poți adresa:</p>
            <Bullets
                items={[
                    <>
                        <strong>ANPC</strong> — Autoritatea Națională pentru Protecția Consumatorilor:{' '}
                        <Ext href={anpc.site}>anpc.ro</Ext>
                    </>,
                    <>
                        <strong>SAL</strong> — Soluționarea Alternativă a Litigiilor, procedură gratuită derulată prin
                        ANPC: <Ext href={anpc.sal}>anpc.ro/ce-este-sal</Ext>
                    </>,
                    <>
                        <strong>SOL</strong> — platforma europeană de Soluționare Online a Litigiilor:{' '}
                        <Ext href={anpc.sol}>ec.europa.eu/consumers/odr</Ext>
                    </>,
                    'instanțelor judecătorești competente din România.',
                ]}
            />
            <p>
                Întrucât plata este procesată de {paymentProcessor.name} în calitate de vânzător înregistrat, unele
                reclamații privind tranzacția pot fi adresate direct acestuia, prin canalele indicate în e-mailul de
                confirmare a comenzii.
            </p>
        </Section>

        <Section number="13" title="Contact" id="contact">
            <p>
                Pentru orice întrebare legată de acești Termeni ne poți scrie la{' '}
                <Ext href={`mailto:${legalEntity.email}`}>{legalEntity.email}</Ext> sau ne poți suna la{' '}
                <Ext href={`tel:${legalEntity.phoneHref}`}>{legalEntity.phone}</Ext>.
            </p>
        </Section>
    </LegalLayout>
);

export default Terms;
