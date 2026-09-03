/**
 * Shown on an overlay route that could not resolve a connection key.
 *
 * Six overlay routes used to read the key from the query string only, with no
 * localStorage fallback, and three of those bailed with a bare `return` that set
 * no state at all. Opening one without ?key= gave a permanently blank OBS source
 * with nothing on screen to say why, which is indistinguishable from "the
 * operator has not pushed anything yet".
 *
 * Deliberately small and cornered rather than a full-screen banner: if this
 * source is already live, it should be legible to the operator without
 * dominating the composition.
 */
export default function OverlayKeyMissing({ source }: { source: string }) {
    return (
        <div className="fixed bottom-4 left-4 z-[9999] font-mono text-xs bg-black/80 border border-red-500/60 text-red-300 px-3 py-2 rounded-sm max-w-md">
            <div className="font-bold uppercase tracking-widest mb-1">No connection key</div>
            <div className="text-red-200/80">
                {source} cannot connect. Open this URL with <code>?key=YOUR_KEY</code>,
                or sign in once at <code>/auth</code> in this browser.
            </div>
        </div>
    );
}
