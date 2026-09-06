// Consent-gated Google Analytics.
// Nothing from Google is loaded until the visitor explicitly accepts analytics
// cookies, as required by GDPR / Directiva ePrivacy (art. 4 alin. 5 Legea 506/2004).

export const GA_MEASUREMENT_ID = 'G-C2HS2R9WQM';

export const CONSENT_KEY = 'vr_cookie_consent';
export const CONSENT_VERSION = 1;
export const CONSENT_EVENT = 'vr:cookie-consent-change';
export const OPEN_COOKIE_SETTINGS = 'vr:open-cookie-settings';

/** Re-opens the consent banner (used by the footer's "Setări cookies" link). */
export function openCookieSettings() {
    window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS));
}

/** @returns {'accepted'|'rejected'|null} */
export function getConsent() {
    try {
        const raw = localStorage.getItem(CONSENT_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed?.version !== CONSENT_VERSION) return null;
        return parsed.status === 'accepted' || parsed.status === 'rejected' ? parsed.status : null;
    } catch {
        return null;
    }
}

export function setConsent(status) {
    try {
        localStorage.setItem(
            CONSENT_KEY,
            JSON.stringify({ status, version: CONSENT_VERSION, date: new Date().toISOString() })
        );
    } catch {
        // Private mode / storage disabled: consent simply is not remembered.
    }

    if (status === 'accepted') {
        loadAnalytics();
    } else {
        clearAnalyticsCookies();
    }

    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: status }));
}

let loaded = false;

export function loadAnalytics() {
    if (loaded || typeof document === 'undefined') return;
    if (document.querySelector(`script[data-vr-analytics]`)) {
        loaded = true;
        return;
    }
    loaded = true;

    window.dataLayer = window.dataLayer || [];
    function gtag() {
        window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    // Consent Mode v2 — granted only because the visitor just accepted.
    gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'granted',
    });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.setAttribute('data-vr-analytics', 'true');
    document.head.appendChild(script);

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
}

/** Best-effort removal of _ga* cookies when consent is withdrawn. */
export function clearAnalyticsCookies() {
    if (typeof document === 'undefined') return;
    const host = window.location.hostname;
    const domains = [host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];

    document.cookie.split(';').forEach((cookie) => {
        const name = cookie.split('=')[0]?.trim();
        if (!name || !name.startsWith('_ga')) return;
        domains.forEach((domain) => {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
        });
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
}

/** Called once on app start: re-enable analytics for returning visitors who accepted. */
export function initAnalytics() {
    if (getConsent() === 'accepted') loadAnalytics();
}

/** Track an SPA page view (no-op until consent is granted). */
export function trackPageView(path) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'page_view', {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title,
    });
}
