import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ChevronRight } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import { CyberInput } from '../components/ui/CyberInput';
import { NeonButton } from '../components/ui/NeonButton';

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
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10" />
            
            <GlassCard className="w-full max-w-md p-10 border-t-4 border-t-primary animate-slide-up">
                <div className="flex flex-col items-center mb-10">
                    <div className="p-4 bg-primary/10 rounded-full mb-4 ring-1 ring-primary/30">
                        <Shield className="text-primary h-10 w-10" />
                    </div>
                    <h1 className="text-3xl font-archivo-expanded-bold text-white tracking-tighter">
                        IFL <span className="text-primary">COMMAND</span>
                    </h1>
                    <p className="text-gray-500 text-sm uppercase tracking-[0.2em] mt-2">Secure Broadcast System</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <CyberInput 
                        label="Access Key" 
                        type="password" 
                        value={key} 
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="••••••••••••"
                        autoFocus
                    />
                    
                    <NeonButton type="submit" className="w-full">
                        Initialize <ChevronRight size={18} />
                    </NeonButton>
                </form>
            </GlassCard>
        </div>
    );
};

export default AuthPage;
