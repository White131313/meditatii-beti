import React from 'react';
import { LegalLayout, Section, Bullets, Callout, DataTable, Ext, Internal } from '../components/LegalLayout';
import { legalEntity, paymentProcessor, dpaAuthority } from '../lib/legalEntity';

const Privacy = () => (
    <LegalLayout
        title="Politica de Confidențialitate"
        intro="Această politică explică ce date personale prelucrăm atunci când folosești Vorbim-Romaneste.ro, în ce scop, pe ce temei legal, cui le divulgăm, cât timp le păstrăm și ce drepturi ai. Documentul respectă Regulamentul (UE) 2016/679 (GDPR)."
        lastUpdated={legalEntity.lastUpdated}
    >
        <Section number="1" title="Operatorul datelor" id="operator">
            <p>Operatorul care decide scopurile și mijloacele prelucrării datelor tale este:</p>
            <Bullets
                items={[
                    <><strong>{legalEntity.name}</strong>, persoană fizică, administrator al site-ului {legalEntity.domain}</>,
                    <>Adresă de corespondență: {legalEntity.address}</>,
                    <>E-mail: <Ext href={`mailto:${legalEntity.email}`}>{legalEntity.email}</Ext></>,
                    <>Telefon: <Ext href={`tel:${legalEntity.phoneHref}`}>{legalEntity.phone}</Ext></>,
                ]}
            />
            <p>
                Nu am desemnat un responsabil cu protecția datelor (DPO), întrucât nu este obligatoriu în raport cu
                volumul și natura prelucrărilor. Orice solicitare privind datele tale se trimite la adresa de e-mail de
                mai sus.
            </p>
        </Section>

        <Section number="2" title="Ce date colectăm" id="date-colectate">
            <p>Colectăm doar datele necesare pentru funcționarea serviciilor:</p>
            <Bullets
                items={[
                    <><strong>Date de cont</strong> — nume, adresă de e-mail și, dacă există, poza de profil, primite de la Google atunci când te autentifici cu contul Google;</>,
                    <><strong>Date privind abonamentul</strong> — starea abonamentului (activ/inactiv), identificatorul comenzii și data plății. <strong>Nu primim și nu stocăm datele cardului bancar;</strong></>,
                    <><strong>Date de utilizare</strong> — progresul la exerciții și jocuri, materialele accesate;</>,
                    <><strong>Date tehnice</strong> — adresă IP, tip de dispozitiv și browser, paginile vizitate, prelucrate în scop de securitate și, cu acordul tău, de analiză statistică;</>,
                    <><strong>Corespondență</strong> — conținutul mesajelor pe care ni le trimiți prin e-mail, telefon, WhatsApp sau formularul de contact.</>,
                ]}
            />
            <Callout tone="brand">
                <strong>Jocul de pronunție (microfonul).</strong> Jocul „Vorbește” din secțiunea Copii folosește funcția
                de recunoaștere vocală integrată în browser (Web Speech API). Microfonul pornește doar după ce apeși
                butonul de înregistrare și îți dai permisiunea din browser. În funcție de browserul folosit (de exemplu
                Chrome sau Edge), fragmentul audio este trimis spre procesare către serverele furnizorului browserului —
                Google, respectiv Microsoft. Noi <strong>nu primim, nu ascultăm și nu stocăm</strong> înregistrarea
                audio; primim doar textul recunoscut, folosit pe loc pentru a verifica răspunsul, și nu îl salvăm.
                Permisiunea pentru microfon poate fi revocată oricând din setările browserului.
            </Callout>
        </Section>

        <Section number="3" title="Scopurile și temeiurile legale" id="scopuri">
            <DataTable
                headers={['Scopul prelucrării', 'Date folosite', 'Temeiul legal (GDPR)']}
                rows={[
                    [
                        'Crearea și administrarea contului, autentificarea',
                        'Nume, e-mail, identificator de cont',
                        'Executarea contractului – art. 6 alin. (1) lit. b)',
                    ],
                    [
                        'Furnizarea accesului la materialele Premium și la meditații',
                        'Date de cont, starea abonamentului',
                        'Executarea contractului – art. 6 alin. (1) lit. b)',
                    ],
                    [
                        'Salvarea progresului la exerciții și jocuri',
                        'Date de utilizare, identificator de cont',
                        'Executarea contractului – art. 6 alin. (1) lit. b)',
                    ],
                    [
                        'Răspuns la întrebările și solicitările tale',
                        'Nume, e-mail, telefon, conținutul mesajului',
                        'Interes legitim – art. 6 alin. (1) lit. f)',
                    ],
                    [
                        'Securitatea platformei, prevenirea abuzurilor',
                        'Date tehnice, adresă IP, jurnale de acces',
                        'Interes legitim – art. 6 alin. (1) lit. f)',
                    ],
                    [
                        'Statistici de audiență (Google Analytics)',
                        'Date tehnice pseudonimizate, pagini vizitate',
                        'Consimțământ – art. 6 alin. (1) lit. a)',
                    ],
                    [
                        'Respectarea obligațiilor legale (fiscale, de arhivare)',
                        'Date privind tranzacțiile',
                        'Obligație legală – art. 6 alin. (1) lit. c)',
                    ],
                ]}
            />
            <p>
                Nu folosim datele tale pentru luarea de decizii automate cu efecte juridice și nu realizăm profilare în
                scopuri publicitare. Nu îți vindem datele către terți.
            </p>
        </Section>

        <Section number="4" title="Cui divulgăm datele" id="destinatari">
            <p>
                Colaborăm cu furnizori de servicii care prelucrează date în numele nostru („persoane împuternicite”), pe
                bază de contract și cu garanții de confidențialitate:
            </p>
            <DataTable
                headers={['Furnizor', 'Rolul său', 'Localizare']}
                rows={[
                    ['Supabase Inc.', 'Bază de date, autentificare, stocarea materialelor', 'UE / SUA'],
                    ['Vercel Inc.', 'Găzduirea site-ului, livrare prin CDN, jurnale tehnice', 'UE / SUA'],
                    [
                        paymentProcessor.name,
                        'Procesarea plăților în calitate de vânzător înregistrat, facturare',
                        'SUA',
                    ],
                    ['Google Ireland Ltd. / Google LLC', 'Autentificare Google, Google Analytics (doar cu consimțământ)', 'UE / SUA'],
                ]}
            />
            <p>
                Datele mai pot fi divulgate autorităților publice, la cererea legală expresă a acestora, sau
                consultanților noștri (contabil, avocat), strict în limita necesară.
            </p>
        </Section>

        <Section number="5" title="Transferuri în afara Spațiului Economic European" id="transferuri">
            <p>
                Unii dintre furnizorii de mai sus au sediul sau infrastructură în Statele Unite. Aceste transferuri se
                realizează pe baza garanțiilor prevăzute de capitolul V din GDPR — Clauzele Contractuale Standard
                aprobate de Comisia Europeană și/sau, după caz, certificarea în cadrul{' '}
                <em>EU–U.S. Data Privacy Framework</em>. Poți solicita o copie a garanțiilor aplicabile scriindu-ne la
                adresa de contact.
            </p>
        </Section>

        <Section number="6" title="Cât timp păstrăm datele" id="retentie">
            <DataTable
                headers={['Categoria de date', 'Durata păstrării']}
                rows={[
                    ['Datele contului și progresul', 'Pe durata existenței contului + 30 de zile de la ștergere'],
                    ['Datele privind tranzacțiile', '10 ani, conform obligațiilor legale de arhivare'],
                    ['Corespondența cu noi', 'Maximum 3 ani de la ultimul schimb de mesaje'],
                    ['Jurnale tehnice de securitate', 'Maximum 12 luni'],
                    ['Cookie-uri de analiză', 'Maximum 14 luni (vezi Politica de Cookies)'],
                ]}
            />
        </Section>

        <Section number="7" title="Drepturile tale" id="drepturi">
            <p>În calitate de persoană vizată, ai următoarele drepturi:</p>
            <Bullets
                items={[
                    <><strong>Dreptul de acces</strong> — să afli ce date deținem despre tine și să primești o copie;</>,
                    <><strong>Dreptul la rectificare</strong> — să corectăm datele inexacte sau incomplete;</>,
                    <><strong>Dreptul la ștergere</strong> („dreptul de a fi uitat”) — să îți ștergem contul și datele asociate, cu excepția celor pe care legea ne obligă să le păstrăm;</>,
                    <><strong>Dreptul la restricționarea prelucrării</strong> — în situațiile prevăzute de art. 18 GDPR;</>,
                    <><strong>Dreptul la portabilitate</strong> — să primești datele într-un format structurat, folosit în mod curent și care poate fi citit automat;</>,
                    <><strong>Dreptul la opoziție</strong> — să te opui prelucrărilor bazate pe interesul nostru legitim;</>,
                    <><strong>Dreptul de a-ți retrage consimțământul</strong> oricând, pentru prelucrările bazate pe acesta (de exemplu cookie-urile de analiză), fără a afecta legalitatea prelucrării anterioare.</>,
                ]}
            />
            <p>
                Îți poți exercita aceste drepturi trimițând o cerere la{' '}
                <Ext href={`mailto:${legalEntity.email}`}>{legalEntity.email}</Ext>. Răspundem în cel mult{' '}
                <strong>30 de zile</strong> de la primirea cererii, gratuit. Pentru siguranța ta, putem solicita
                informații suplimentare care să confirme identitatea solicitantului.
            </p>
            <Callout tone="gray">
                <strong>Dreptul de a depune plângere.</strong> Dacă apreciezi că ți-am încălcat drepturile, te poți
                adresa {dpaAuthority.name}: {dpaAuthority.address}, e-mail{' '}
                <Ext href={`mailto:${dpaAuthority.email}`}>{dpaAuthority.email}</Ext>,{' '}
                <Ext href={dpaAuthority.url}>dataprotection.ro</Ext>. Ai, de asemenea, dreptul de a te adresa
                instanțelor de judecată.
            </Callout>
        </Section>

        <Section number="8" title="Datele copiilor" id="copii">
            <p>
                Platforma se adresează atât adulților, cât și elevilor. Jocurile din secțiunea Copii pot fi folosite
                fără cont și fără introducerea vreunei date personale.
            </p>
            <p>
                Conturile și abonamentele sunt destinate persoanelor de peste 16 ani. Pentru copiii sub această vârstă,
                contul trebuie creat și administrat de un părinte sau de reprezentantul legal, care își exprimă acordul
                pentru prelucrarea datelor copilului. Dacă afli că un copil sub 16 ani ne-a furnizat date fără acest
                acord, scrie-ne și le ștergem fără întârziere.
            </p>
        </Section>

        <Section number="9" title="Securitatea datelor" id="securitate">
            <p>
                Folosim conexiuni criptate (HTTPS), autentificare gestionată de Supabase, control al accesului pe bază
                de roluri și furnizori care respectă standarde de securitate recunoscute. Cu toate acestea, niciun
                sistem informatic nu poate fi garantat ca fiind absolut sigur. În cazul unei încălcări a securității
                datelor care riscă să îți afecteze drepturile, te vom informa și vom notifica autoritatea competentă în
                termenele prevăzute de GDPR.
            </p>
        </Section>

        <Section number="10" title="Cookie-uri" id="cookies">
            <p>
                Site-ul folosește cookie-uri strict necesare și, doar cu acordul tău, cookie-uri de analiză. Lista
                completă, durata și modul de retragere a consimțământului se găsesc în{' '}
                <Internal to="/cookies">Politica de Cookies</Internal>.
            </p>
        </Section>

        <Section number="11" title="Modificări ale politicii" id="modificari">
            <p>
                Putem actualiza această politică atunci când se schimbă serviciile sau cadrul legal. Versiunea în
                vigoare este cea publicată aici, cu data ultimei actualizări menționată la începutul paginii.
                Modificările importante îți vor fi comunicate prin e-mail sau printr-un anunț vizibil pe Site.
            </p>
        </Section>
    </LegalLayout>
);

export default Privacy;
