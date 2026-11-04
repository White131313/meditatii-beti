import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { localizePath } from '../lib/seoRoutes';
import { useLang } from '../lib/i18n';

/**
 * Înlocuitor pentru Link din react-router: căile interne scrise în română
 * primesc automat prefixul /hu când pagina curentă e în maghiară.
 */
export function Link({ to, ...rest }) {
    const lang = useLang();
    return <RouterLink to={localizePath(to, lang)} {...rest} />;
}

export default Link;
