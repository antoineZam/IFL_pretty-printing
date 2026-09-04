import { Link, useLocation } from 'react-router-dom';

/**
 * Catch-all route.
 *
 * The router had no `path="*"`, so any link to a removed page -- the burger
 * menu still offered one -- rendered a completely blank screen with no
 * indication that anything had gone wrong.
 */
export default function NotFoundPage() {
    const location = useLocation();

    return (
        <div className="min-h-screen flex items-center justify-center p-6 font-mono">
            <div className="max-w-lg w-full bg-[#020617]/90 border border-[#10b981]/40 rounded-sm p-8 text-center">
                <h1 className="text-3xl font-bold text-white uppercase tracking-widest mb-3">404</h1>
                <p className="text-[#a7f3d0]/70 text-sm mb-6">
                    No page at <code className="text-[#10b981] break-all">{location.pathname}</code>.
                </p>
                <Link
                    to="/"
                    className="inline-block bg-[#10b981]/10 hover:bg-[#10b981]/20 border border-[#10b981]/50 text-[#10b981] text-xs uppercase tracking-widest px-6 py-3 transition-all"
                >
                    Back to dashboard
                </Link>
            </div>
        </div>
    );
}
