// Datele de identificare afișate în paginile legale (Termeni, Confidențialitate, Cookies).
// Se completează într-un singur loc și se propagă în toate paginile.
//
// ⚠️ DE COMPLETAT: câmpurile marcate cu TODO sunt obligatorii pentru conformitate
// (art. 5 Legea 365/2002 privind comerțul electronic + OUG 34/2014 privind
// informarea consumatorului). Înlocuiește textul dintre paranteze drepte.

export const legalEntity = {
    // Persoană fizică — nu există încă societate înregistrată (PFA / II / SRL).
    type: 'persoana_fizica',
    name: 'Beatrice Bernad',
    siteName: 'Vorbim Românește',
    domain: 'vorbim-romaneste.ro',
    email: 'bernad.beatrice23@gmail.com',
    phone: '+40 757 947 933',
    phoneHref: '+40757947933',

    // Localitatea și județul de corespondență (nu e obligatorie adresa completă
    // de domiciliu, dar consumatorul trebuie să știe unde poate trimite reclamații).
    address: 'Miercurea Ciuc, județul Harghita',

    // TODO: completează dacă/când te înregistrezi (PFA/II/SRL). Lăsate goale,
    // secțiunile corespunzătoare nu se afișează.
    registrationNumber: '',
    fiscalCode: '',

    lastUpdated: '6 septembrie 2026',
};

// Procesatorul de plăți este „merchant of record”: el este vânzătorul juridic
// către client, emite factura și gestionează TVA-ul.
export const paymentProcessor = {
    name: 'Lemon Squeezy LLC',
    role: 'merchant of record (vânzător înregistrat)',
    url: 'https://www.lemonsqueezy.com',
    terms: 'https://www.lemonsqueezy.com/terms',
    privacy: 'https://www.lemonsqueezy.com/privacy',
};

export const anpc = {
    site: 'https://anpc.ro',
    sal: 'https://anpc.ro/ce-este-sal/',
    sol: 'https://ec.europa.eu/consumers/odr',
};

export const dpaAuthority = {
    name: 'Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)',
    address: 'B-dul G-ral. Gheorghe Magheru nr. 28-30, Sector 1, cod poștal 010336, București',
    email: 'anspdcp@dataprotection.ro',
    url: 'https://www.dataprotection.ro',
};

export default legalEntity;
