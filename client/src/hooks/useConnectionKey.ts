import { useSearchParams } from 'react-router-dom';

/**
 * The single source of truth for resolving the connection key.
 *
 * This resolution was duplicated 29 times across the client in two divergent
 * shapes: most sites read the query string and fell back to localStorage, but
 * six overlay routes dropped the fallback -- so opening one without ?key= gave
 * a permanently blank OBS source with nothing on screen to explain why.
 *
 * Query string wins so an OBS source can be pinned to a specific key without
 * depending on the browser-source's localStorage, which OBS does not share
 * between sources.
 */
export function useConnectionKey(): string | null {
    const [searchParams] = useSearchParams();
    return searchParams.get('key') || readStoredKey();
}

/** Non-hook variant, for use outside a component (event handlers, module init). */
export function readStoredKey(): string | null {
    try {
        return localStorage.getItem('connectionKey');
    } catch {
        // localStorage throws in some embedded/browser-source contexts.
        return null;
    }
}

/** The IFF section uses its own separate access key. */
export function readIffKey(): string | null {
    try {
        return localStorage.getItem('ribAccessKey');
    } catch {
        return null;
    }
}
