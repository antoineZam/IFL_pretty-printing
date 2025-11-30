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

        newSocket.on('rib-overlay-state-update', (data: OverlayState) => {
            console.log('[UnifiedOverlay] Received overlay state:', data);
            setOverlayState(data);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [searchParams]);

    // We keep ALL components mounted so they maintain their own socket connections and data state.
    // We simply toggle their visibility using CSS. 
    // forceShow={true} is passed to ensure they render their content internally, 
    // while this parent component controls whether that content is actually visible on screen.

    // Debug: Check if any overlay is active
    const anyOverlayActive = overlayState.showMatchCard || overlayState.showPlayerStats || 
                             overlayState.showPartOne || overlayState.showStreamOverlay;

    return (
        <div className="w-[1920px] h-[1080px] relative">
            {/* Debug indicator - remove in production */}
            {!anyOverlayActive && (
                <div className="absolute top-4 left-4 text-white bg-black/50 px-4 py-2 rounded z-50 text-sm">
                    Waiting for overlay selection... (No overlay active)
                </div>
            )}

            {/* Match Card Overlay */}
            <div 
                className="absolute inset-0"
                style={{ display: overlayState.showMatchCard ? 'block' : 'none' }}
            >
                <RIBSingleMatchOverlay forceShow={true} />
            </div>

            {/* Part One Overlay */}
            <div 
                className="absolute inset-0"
                style={{ display: overlayState.showPartOne ? 'block' : 'none' }}
            >
                <RIBPartOneOverlay forceShow={true} />
            </div>

            {/* Player Stats Overlay */}
            <div 
                className="absolute inset-0"
                style={{ display: overlayState.showPlayerStats ? 'block' : 'none' }}
            >
                <RIBPlayerStatsOverlay forceShow={true} />
            </div>

            {/* Stream Overlay (In-Game) */}
            <div 
                className="absolute inset-0"
                style={{ display: overlayState.showStreamOverlay ? 'block' : 'none' }}
            >
                <RIBStreamOverlay forceShow={true} />
            </div>
        </div>
    );
}