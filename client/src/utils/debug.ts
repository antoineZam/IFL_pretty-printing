/**
 * Console logging that is off by default on a broadcast machine.
 *
 * The overlays are OBS browser sources that stay open for a whole event, and
 * several of them logged on every socket payload -- one logged from a render
 * body, once per match slot, while a 20-second poll re-rendered the bracket. The
 * console grew unbounded for the entire event, in the one place nobody is
 * watching it.
 *
 * Enabled in a dev build, or on demand by adding `?debug=1` to the URL (the
 * choice is remembered for the session, so an operator can turn it on for a
 * source that is already live and reload once).
 */
const SESSION_FLAG = 'debugLogging';

function resolveEnabled(): boolean {
    try {
        if (import.meta.env.DEV) return true;
        const params = new URLSearchParams(window.location.search);
        const requested = params.get('debug');
        if (requested !== null) {
            const on = requested !== '0' && requested !== 'false';
            sessionStorage.setItem(SESSION_FLAG, on ? '1' : '0');
            return on;
        }
        return sessionStorage.getItem(SESSION_FLAG) === '1';
    } catch {
        return false;
    }
}

const enabled = resolveEnabled();

export const debugEnabled = enabled;

/** console.log, but only when debug logging is on. */
export function debugLog(...args: unknown[]): void {
    if (enabled) console.log(...args);
}
