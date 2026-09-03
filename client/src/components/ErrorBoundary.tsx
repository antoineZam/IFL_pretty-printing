import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    /** Overlay routes render into OBS: a visible error card there would go on air. */
    silent?: boolean;
}

interface State {
    error: Error | null;
}

/**
 * Last line of defence against a blank screen.
 *
 * A throw during render cannot be caught by the try/catch around the fetch that
 * caused it, and React unmounts the whole tree when nothing catches it -- which
 * is how a stale connection key used to turn a control page into a white screen
 * with no explanation. This turns that into a readable message.
 *
 * On overlay routes pass `silent` so a failure renders nothing (transparent)
 * rather than putting an error card into the broadcast.
 */
export default class ErrorBoundary extends Component<Props, State> {
    state: State = { error: null };

    static getDerivedStateFromError(error: Error): State {
        return { error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('Unhandled render error:', error, info.componentStack);
    }

    private reset = () => {
        this.setState({ error: null });
    };

    private reAuth = () => {
        localStorage.removeItem('connectionKey');
        window.location.href = '/auth';
    };

    render() {
        const { error } = this.state;
        if (!error) return this.props.children;

        if (this.props.silent) {
            return null;
        }

        const looksLikeAuth = /unauthorized|401|403/i.test(error.message);

        return (
            <div className="min-h-screen flex items-center justify-center p-6 font-mono">
                <div className="max-w-lg w-full bg-[#020617]/90 border border-[#ef4444]/40 rounded-sm p-8">
                    <h2 className="text-xl font-bold text-[#ef4444] uppercase tracking-widest mb-3">
                        [ERROR] Page failed to render
                    </h2>
                    <p className="text-white/80 text-sm mb-4 break-words">{error.message}</p>
                    {looksLikeAuth && (
                        <p className="text-[#a7f3d0]/70 text-xs mb-4 uppercase tracking-wider">
                            This usually means the connection key is missing or expired.
                        </p>
                    )}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={this.reset}
                            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/20 text-white text-xs uppercase tracking-widest py-3 rounded-none transition-all"
                        >
                            Retry
                        </button>
                        <button
                            type="button"
                            onClick={this.reAuth}
                            className="flex-1 bg-[#10b981]/10 hover:bg-[#10b981]/20 border border-[#10b981]/50 text-[#10b981] text-xs uppercase tracking-widest py-3 rounded-none transition-all"
                        >
                            Re-enter key
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
