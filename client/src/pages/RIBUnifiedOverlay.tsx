import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

// Import the actual overlay components
import RIBSingleMatchOverlay from './RIBSingleMatchOverlay';
import RIBPartOneOverlay from './RIBPartOneOverlay';
import RIBPlayerStatsOverlay from './RIBPlayerStatsOverlay';
import RIBStreamOverlay from './RIBStreamOverlay';

// --- Interfaces (Copied from child components to ensure types) ---

interface MatchCardData {
    eventTitle: string;
    eventSubtitle: string;
    partNumber: string;
    mainEvent: {
        p1Name: string;
        p1Title: string;
        p1Character: string;
        p1Flag?: string;
        p1Score?: number;
        p2Name: string;
        p2Title: string;
        p2Character: string;
        p2Flag?: string;
        p2Score?: number;
        winner?: string | null;
        completed?: boolean;
    };
    matches: Array<{
        id: number;
        p1Name: string;
        p1Title: string;
        p1Character: string;
        p1Flag?: string;
        p1Score?: number;
        p2Name: string;
        p2Title: string;
        p2Character: string;
        p2Flag?: string;
        p2Score?: number;
        winner?: string | null;
        completed?: boolean;
        isMainEvent?: boolean;
    }>;
    singleMatch: {
        matchTitle: string;
        format: string;
        p1Name: string;
        p1Title: string;
        p1Character: string;
        p2Name: string;
        p2Title: string;
        p2Character: string;
    };
    sponsors: {
        presenter: string;
        association: string;
    };
}

interface PlayerStats {
    name: string;
    character: string;
    division: string;
    iff8Ranking: string;
    iff8Record: string;
    iff8RecordDetails: string;
    iffHistory: string;
    rank: string;
    prowess: number;
    rankedMatches: {
        wins: number;
        loses: number;
        wlRate: string;
    };
    playerMatches: {
        wins: number;
        loses: number;
        wlRate: string;
    };
}

interface PlayerStatsData {
    players: PlayerStats[];
}

interface StreamData {
    matchTitle: string;
    p1Name: string;
    p1Flag: string;
    p1Score: number;
    p2Name: string;
    p2Flag: string;
    p2Score: number;
}

interface OverlayState {
    showMatchCard: boolean;
    showPlayerStats: boolean;
    showPartOne: boolean;
    showStreamOverlay: boolean;
    selectedMatchIndex: number;
    selectedPlayerIndex: number;
    animationTrigger: number;
}

export default function RIBUnifiedOverlay() {
    const [searchParams] = useSearchParams();
    
    // Global State Container
    const [overlayState, setOverlayState] = useState<OverlayState>({
        showMatchCard: false,
        showPlayerStats: false,
        showPartOne: false,
        showStreamOverlay: false,
        selectedMatchIndex: 0,
        selectedPlayerIndex: 0,
        animationTrigger: 0
    });

    const [matchCards, setMatchCards] = useState<MatchCardData | null>(null);
    const [playerStats, setPlayerStats] = useState<PlayerStatsData | null>(null);
    const [streamData, setStreamData] = useState<StreamData | null>(null);

    useEffect(() => {
        // Force transparent background
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        
        // Get connection key from URL params or localStorage
        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');
        console.log('[UnifiedOverlay] Connecting with key:', connectionKey ? 'present' : 'missing');
        
        const newSocket: Socket = io({
            auth: { token: connectionKey || '' }
        });

        newSocket.on('connect', () => {
            console.log('[UnifiedOverlay] Socket connected');
        });

        newSocket.on('connect_error', (err) => {
            console.error('[UnifiedOverlay] Socket connection error:', err.message);
        });

        // Listen for ALL data types to keep state ready
        newSocket.on('rib-overlay-state-update', (data: OverlayState) => {
            console.log('[UnifiedOverlay] Received overlay state:', data);
            setOverlayState(data);
        });

        newSocket.on('rib-match-cards-update', (data: MatchCardData) => {
            setMatchCards(data);
        });

        newSocket.on('rib-player-stats-update', (data: PlayerStatsData) => {
            setPlayerStats(data);
        });

        newSocket.on('rib-stream-data-update', (data: StreamData) => {
            setStreamData(data);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    // Render the selected overlay component with forceShow AND inject the data
    if (overlayState.showMatchCard) {
        return (
            <RIBSingleMatchOverlay 
                forceShow={true} 
                externalData={matchCards}
                externalOverlayState={overlayState}
            />
        );
    }
    
    if (overlayState.showPartOne) {
        return (
            <RIBPartOneOverlay 
                forceShow={true} 
                externalData={matchCards}
                externalOverlayState={overlayState}
            />
        );
    }
    
    if (overlayState.showPlayerStats) {
        return (
            <RIBPlayerStatsOverlay 
                forceShow={true} 
                externalData={playerStats}
                externalOverlayState={overlayState}
            />
        );
    }
    
    if (overlayState.showStreamOverlay) {
        return (
            <RIBStreamOverlay 
                forceShow={true} 
                externalData={streamData}
                externalOverlayState={overlayState}
            />
        );
    }

    // No overlay active - transparent container
    return <div className="w-[1920px] h-[1080px]" />;
}