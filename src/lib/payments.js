// Configurarea plăților Lemon Squeezy.
//
// ATENȚIE: subdomeniul de mai jos este numele magazinului din Lemon Squeezy.
// Dacă redenumești magazinul în panoul LS, subdomeniul se schimbă și TOATE
// link-urile de plată dau 404 — exact ce s-a întâmplat când magazinul a fost
// redenumit din „vorbim-romaneste” în „digitalsolutions”.
// Când redenumești magazinul, schimbă doar constanta STORE_SLUG de aici.

export const STORE_SLUG = 'digitalsolutions';

export const STORE_URL = `https://${STORE_SLUG}.lemonsqueezy.com`;

/** Identificatorul variantei de produs (nu se schimbă la redenumirea magazinului). */
export const PREMIUM_VARIANT_ID = '0853eb0b-e706-47fc-8aa6-830a1adbf90f';

/** Pagina unde clientul își gestionează sau anulează abonamentul. */
export const BILLING_URL = `${STORE_URL}/billing`;

/**
 * Link de checkout pentru abonamentul Premium.
 * user_id ajunge înapoi în webhook prin checkout[custom][user_id],
 * ca abonamentul să fie legat de contul corect.
 */
export function buildCheckoutUrl(userId) {
    const base = `${STORE_URL}/checkout/buy/${PREMIUM_VARIANT_ID}`;
    return userId ? `${base}?checkout[custom][user_id]=${encodeURIComponent(userId)}` : base;
}
