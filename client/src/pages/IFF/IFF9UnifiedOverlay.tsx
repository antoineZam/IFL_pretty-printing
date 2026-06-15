import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import IFF9MatchOverlay from './IFF9MatchOverlay';
import IFF9MatchCardsPage from './IFF9MatchCardsPage';
import type { IFF9DisplayMode, IFF9DisplayState, IFF9MatchData, IFF9Lineup } from '../../types/iff9';

// OBS browser-source target for IFF9. Switches between idle / match overlay /
// match-cards on the iff9-display-mode socket event, playing a glitch-out /
// glitch-in burst (reusing the keyframes in styles/glitch.css) on every change.

const GLITCH_MS = 500;

const GlitchBurst = () => (
    <div
        className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
        style={{ ['--glitch-c1' as string]: '#10b981', ['--glitch-c2' as string]: '#ef4444', ['--glitch-c3' as string]: '#34d399' }}
    >
        <div className="absolute inset-0" style={{ animation: 'transition-flash 0.4s ease-in-out forwards' }} />
        <div className="absolute inset-0 bg-black" style={{ animation: 'transition-slice 0.4s steps(10, end) forwards' }}>
            <div className="absolute inset-0 opacity-50" style={{ background: '#10b981', transform: 'translateX(-10px)', mixBlendMode: 'screen' }} />
            <div className="absolute inset-0 opacity-50" style={{ background: '#ef4444', transform: 'translateX(10px)', mixBlendMode: 'screen' }} />
        </div>
        <div
            className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-white to-transparent opacity-30 mix-blend-overlay"
            style={{ animation: 'transition-scanline 0.3s linear forwards' }}
        />
    </div>
);

const IFF9UnifiedOverlay = () => {
    const [searchParams] = useSearchParams();
    const [displayMode, setDisplayMode] = useState<IFF9DisplayMode>('idle');
    const [isVisible, setIsVisible] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [matchData, setMatchData] = useState<IFF9MatchData | null>(null);
    const [lineup, setLineup] = useState<IFF9Lineup | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [glitching, setGlitching] = useState(false);
    const [cardsKey, setCardsKey] = useState(0);
    const prevModeRef = useRef<IFF9DisplayMode>('idle');

    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        return () => {
            document.body.style.backgroundColor = '';
            document.documentElement.style.backgroundColor = '';
        };
    }, []);

    useEffect(() => {
        const key = searchParams.get('key');
        if (!key) return;

        const newSocket: Socket = io({ auth: { token: key } });
        setSocket(newSocket);

        newSocket.on('iff9-display-mode', (state: IFF9DisplayState) => {
            setDisplayMode(state.mode);
            setIsVisible(state.visible);
        });
        newSocket.on('iff9-match-data', (data: IFF9MatchData) => setMatchData(data));
        newSocket.on('iff9-lineup', (data: IFF9Lineup) => setLineup(data));
        newSocket.on('iff9-refresh-overlay', () => setRefreshKey(prev => prev + 1));

        return () => { newSocket.disconnect(); };
    }, [searchParams]);

    // Play a glitch burst whenever the display mode changes.
    useEffect(() => {
        if (prevModeRef.current === displayMode) return;
        prevModeRef.current = displayMode;

        setGlitching(true);
        // Remount the cards page on each entry so the staggered reveal replays.
        if (displayMode === 'match-cards') setCardsKey(k => k + 1);
        const t = setTimeout(() => setGlitching(false), GLITCH_MS);
        return () => clearTimeout(t);
    }, [displayMode]);

    const renderContent = () => {
        if (displayMode === 'idle' || !isVisible) {
            return (
                <div className="w-full h-full relative">
                    <img
                        src="/source/overlay/iff_9/default.png"
                        alt="IFF9 Overlay"
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                </div>
            );
        }

        if (displayMode === 'match') {
            return <IFF9MatchOverlay socket={socket} embedded initialData={matchData} />;
        }

        if (displayMode === 'match-cards') {
            return <IFF9MatchCardsPage key={cardsKey} socket={socket} embedded initialLineup={lineup} active />;
        }

        return null;
    };

    const containerBg = displayMode === 'match' ? 'transparent' : '#0a0f0d';

    return (
        <div className="w-[1920px] h-[1080px] text-white overflow-hidden" style={{ backgroundColor: containerBg }}>
            <div key={refreshKey} className="w-full h-full">
                {renderContent()}
            </div>
            {glitching && <GlitchBurst />}
        </div>
    );
};

export default IFF9UnifiedOverlay;
