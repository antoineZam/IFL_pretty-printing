import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, KeyRound, ExternalLink } from 'lucide-react';

const AuthPage = () => {
    const [key, setKey] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key }),
            });
            if (response.ok) {
                localStorage.setItem('connectionKey', key);
                navigate(`/?key=${key}`);
            } else {
                setError('Invalid connection key. Please try again.');
            }
        } catch (err) {
            setError('An error occurred during authentication.');
        }
    };

    return (
        <div className="bg-[#0a0e27] min-h-screen flex items-center justify-center p-4 text-white font-archivo">
            <div className="bg-[#1a1f3a] p-10 rounded-xl shadow-2xl w-full max-w-md text-center border-2 border-[#3a4167]">
                <div className="flex justify-center items-center mb-4">
                    <Shield className="text-[#DAA520] h-10 w-10 mr-3" />
                    <h1 className="text-3xl font-bold text-[#DAA520] uppercase tracking-wider">
                        Tournament Overlay
                    </h1>
                </div>
                <p className="text-gray-300 mb-8 text-lg">Tekken 8 IFL Championship</p>
                
                {error && (
                    <div className="bg-red-900/50 text-red-300 p-3 rounded-lg mb-6 border border-red-700">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-6 text-left">
                        <label htmlFor="key" className="block mb-2 font-semibold text-gray-100">
                            Connection Key
                        </label>
                        <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                id="key"
                                name="key"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-[#0a0e27] border-2 border-[#3a4167] rounded-lg focus:outline-none focus:border-[#DAA520] transition-colors"
                                placeholder="Enter your connection key"
                                required
                            />
                        </div>
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full py-3 bg-[#DAA520] text-[#0a0e27] font-bold rounded-lg uppercase tracking-widest hover:bg-[#F0C350] hover:scale-105 transition-all duration-300"
                    >
                        Access System
                    </button>
                </form>

                <div className="mt-8 p-6 bg-[#252b47]/70 rounded-lg border-2 border-[#3a4167]">
                    <h3 className="font-semibold text-gray-200 mb-4">Quick Access Links</h3>
                    <div className="space-y-3">
                        <a href={`/ifl/match-control?key=${key}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-[#DAA520] hover:text-[#F0C350] transition-colors">
                            IFL Match Control <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                         <a href={`/ifl/match-overlay?key=${key}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-[#DAA520] hover:text-[#F0C350] transition-colors">
                            IFL Match Overlay <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                        <a href={`/tag/match-control?key=${key}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-[#DAA520] hover:text-[#F0C350] transition-colors">
                            Tag Team Control <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                        <a href={`/tag/match-overlay?key=${key}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-[#DAA50] hover:text-[#F0C350] transition-colors">
                            Tag Team Overlay <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
