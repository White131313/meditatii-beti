import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../lib/analytics";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Only scroll to top if there's no hash in the URL
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }
        // SPA navigation: GA only sees the first load otherwise.
        // No-op until the visitor has accepted analytics cookies.
        trackPageView(pathname);
    }, [pathname]);

    return null;
}
