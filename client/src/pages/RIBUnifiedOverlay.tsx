import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

// Import the actual overlay components
import RIBSingleMatchOverlay from './RIBSingleMatchOverlay';
import RIBPartOneOverlay from './RIBPartOneOverlay';
import RIBPlayerStatsOverlay from './RIBPlayerStatsOverlay';
import RIBStreamOverlay from './RIBStreamOverlay';

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
    const [overlayState, setOverlayState] = useState<OverlayState>({
        showMatchCard: false,
        showPlayerStats: false,
        showPartOne: false,
        showStreamOverlay: false,
        selectedMatchIndex: 0,
        selectedPlayerIndex: 0,
        animationTrigger: 0
    });

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

        newSocket.on('rib-overlay-state-update', (data: OverlayState) => {
            console.log('[UnifiedOverlay] Received overlay state:', data);
            setOverlayState(data);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    // Render the selected overlay component with forceShow to bypass internal visibility checks
    if (overlayState.showMatchCard) {
        return <RIBSingleMatchOverlay forceShow={true} />;
    }
    
    if (overlayState.showPartOne) {
        return <RIBPartOneOverlay forceShow={true} />;
    }
    
    if (overlayState.showPlayerStats) {
        return <RIBPlayerStatsOverlay forceShow={true} />;
    }
    
    if (overlayState.showStreamOverlay) {
        return <RIBStreamOverlay forceShow={true} />;
    }

    // No overlay active - transparent container
    return <div className="w-[1920px] h-[1080px]" />;
}
