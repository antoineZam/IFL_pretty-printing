import { useState, useEffect, ReactNode } from 'react';
import { Lock, KeyRound } from 'lucide-react';

interface IFLAccessGuardProps {
    children: ReactNode;
}

export default function IFLAccessGuard({ children }: IFLAccessGuardProps) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [keyRequired, setKeyRequired] = useState(true);
    const [accessKey, setAccessKey] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        checkAccess();
    }, []);

    const checkAccess = async () => {
        try {
            // First check if RIB key is required
            const requiredRes = await fetch('/api/rib-auth/required');
            const requiredData = await requiredRes.json();
            
            if (!requiredData.required) {
                // No key required, grant access
                setKeyRequired(false);
                setIsAuthorized(true);
                setIsLoading(false);
                return;
            }

            // Check if we have a stored RIB key
            const storedKey = localStorage.getItem('ribAccessKey');
            if (storedKey) {
                const res = await fetch('/api/rib-auth', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key: storedKey })
                });
                
                if (res.ok) {
                    setIsAuthorized(true);
                } else {
                    localStorage.removeItem('ribAccessKey');
                }
            }
        } catch (err) {
            console.error('Error checking RIB access:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/rib-auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: accessKey })
            });

            if (res.ok) {
                localStorage.setItem('ribAccessKey', accessKey);
                setIsAuthorized(true);
            } else {
                setError('Invalid access key');
            }
        } catch (err) {
            setError('Connection error. Please try again.');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (!keyRequired || isAuthorized) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-transparent relative flex items-center justify-center">
            {/* Blurred background preview */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="w-full h-full filter blur-lg opacity-30 pointer-events-none">
                    {children}
                </div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
            
            <div className="relative z-10 bg-[#020617]/90 border border-[#10b981]/40 rounded-sm p-8 max-w-md w-full mx-4 shadow-[0_0_30px_rgba(16,185,129,0.15)] font-mono">
                {/* Glitch lines decorative effect */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#10b981]/50 opacity-50" />
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#10b981]/50 opacity-50" />
                
                <div className="flex flex-col items-center mb-6">
                    <div className="w-16 h-16 bg-[#10b981]/10 border border-[#10b981]/30 rounded-none flex items-center justify-center mb-4 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#10b981]/20 animate-[cyber-pulse_2s_infinite]" />
                        <Lock size={32} className="text-[#10b981] relative z-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-widest uppercase">IFF Security</h2>
                    <p className="text-[#a7f3d0]/60 text-center mt-2 text-xs uppercase tracking-wider">
                        Clearance required for protocol access
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs text-[#a7f3d0]/80 mb-2 uppercase tracking-widest">Access Key</label>
                        <div className="relative">
                            <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#10b981]/60" />
                            <input
                                type="password"
                                value={accessKey}
                                onChange={(e) => setAccessKey(e.target.value)}
                                placeholder="ENTER DECRYPTION KEY"
                                className="w-full bg-[#020617] border border-[#10b981]/30 rounded-none pl-10 pr-4 py-3 text-[#10b981] placeholder-[#10b981]/30 focus:outline-none focus:border-[#10b981] focus:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all font-mono text-sm tracking-widest"
                                autoFocus
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-[#ef4444] text-xs text-center uppercase tracking-widest animate-pulse">
                            [ERROR] {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#10b981]/10 hover:bg-[#10b981]/20 border border-[#10b981]/50 text-[#10b981] font-bold py-3 rounded-none transition-all uppercase tracking-widest hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                        Initialize Uplink
                    </button>
                </form>

                <p className="text-[#a7f3d0]/40 text-[10px] text-center mt-6 uppercase tracking-widest">
                    Unauthorized access will be logged
                </p>
            </div>
        </div>
    );
}

