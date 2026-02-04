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
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (!keyRequired || isAuthorized) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-black relative">
            {/* Blurred background preview */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="w-full h-full filter blur-lg opacity-30 pointer-events-none">
                    {children}
                </div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                    <div className="flex flex-col items-center mb-6">
                        <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                            <Lock size={32} className="text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Run It Back</h2>
                        <p className="text-gray-400 text-center mt-2">
                            This section requires additional authorization
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Access Key</label>
                            <div className="relative">
                                <KeyRound size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="password"
                                    value={accessKey}
                                    onChange={(e) => setAccessKey(e.target.value)}
                                    placeholder="Enter RIB access key"
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm text-center">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
                        >
                            Unlock Section
                        </button>
                    </form>

                    <p className="text-gray-500 text-xs text-center mt-6">
                        Contact the administrator if you need access
                    </p>
                </div>
            </div>
        </div>
    );
}

