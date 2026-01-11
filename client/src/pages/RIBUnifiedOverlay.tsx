import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

// Import the actual overlay components
import RIBSingleMatchOverlay from './RIBSingleMatchOverlay';
import RIBPartOneOverlay from './RIBPartOneOverlay';
import RIBPlayerStatsOverlay from './RIBPlayerStatsOverlay';
import RIBStreamOverlay from './RIBStreamOverlay';
import IntroVideoPlayer from '../components/IntroVideoPlayer';
import SnowEffect from '../components/SnowEffect';

interface OverlayState {
    showMatchCard: boolean;
    showPlayerStats: boolean;
    showPartOne: boolean;
    showStreamOverlay: boolean;
    showIntroVideo: boolean;
    introVideoUrl: string;
    selectedMatchIndex: number;
    selectedPlayerIndex: number;
    animationTrigger: number;
}

interface MatchCardData {
    partNumber: string;
    [key: string]: unknown;
}

export default function RIBUnifiedOverlay() {
    const [searchParams] = useSearchParams();
    const [overlayState, setOverlayState] = useState<OverlayState>({
        showMatchCard: false,
        showPlayerStats: false,
        showPartOne: false,
        showStreamOverlay: false,
        showIntroVideo: false,
        introVideoUrl: '',
        selectedMatchIndex: 0,
        selectedPlayerIndex: 0,
        animationTrigger: 0
    });
    const [matchCards, setMatchCards] = useState<MatchCardData | null>(null);

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

        newSocket.on('rib-match-cards-update', (data: MatchCardData) => {
            setMatchCards(data);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [searchParams]);

    // We keep ALL components mounted so they maintain their own socket connections and data state.
    // We simply toggle their visibility using CSS. 
    // forceShow={true} is passed to ensure they render their content internally, 
    // while this parent component controls whether that content is actually visible on screen.

    // Check if any overlay is active
    const anyOverlayActive = overlayState.showMatchCard || overlayState.showPlayerStats || 
                             overlayState.showPartOne || overlayState.showStreamOverlay ||
                             overlayState.showIntroVideo;

    return (
        <div className="w-[1920px] h-[1080px] relative overflow-hidden">
            {/* Default Main Page - shows when no overlay is active */}
            <div 
                className="absolute inset-0 transition-all duration-500 ease-in-out"
                style={{ 
                    opacity: anyOverlayActive ? 0 : 1,
                    transform: anyOverlayActive ? 'scale(1.05)' : 'scale(1)',
                    pointerEvents: anyOverlayActive ? 'none' : 'auto'
                }}
            >
                <img 
                    src={`/source/overlay/main_page/Runitback_main_page_part-${matchCards?.partNumber}.png`}
                    alt="Run It Back Main Page"
                    className="w-full h-full object-cover"
                />
                {/* Animated snow effect */}
                <SnowEffect />
            </div>

            {/* Match Card Overlay */}
            <div 
                className="absolute inset-0 transition-all duration-500 ease-in-out"
                style={{ 
                    opacity: overlayState.showMatchCard ? 1 : 0,
                    transform: overlayState.showMatchCard ? 'scale(1)' : 'scale(0.98)',
                    pointerEvents: overlayState.showMatchCard ? 'auto' : 'none'
                }}
            >
                <RIBSingleMatchOverlay forceShow={true} />
            </div>

            {/* Part One Overlay */}
            <div 
                className="absolute inset-0 transition-all duration-500 ease-in-out"
                style={{ 
                    opacity: overlayState.showPartOne ? 1 : 0,
                    transform: overlayState.showPartOne ? 'scale(1)' : 'scale(0.98)',
                    pointerEvents: overlayState.showPartOne ? 'auto' : 'none'
                }}
            >
                <RIBPartOneOverlay forceShow={true} />
            </div>

            {/* Player Stats Overlay */}
            <div 
                className="absolute inset-0 transition-all duration-500 ease-in-out"
                style={{ 
                    opacity: overlayState.showPlayerStats ? 1 : 0,
                    transform: overlayState.showPlayerStats ? 'scale(1)' : 'scale(0.98)',
                    pointerEvents: overlayState.showPlayerStats ? 'auto' : 'none'
                }}
            >
                <RIBPlayerStatsOverlay forceShow={true} />
            </div>

            {/* Stream Overlay (In-Game) */}
            <div 
                className="absolute inset-0 transition-all duration-500 ease-in-out"
                style={{ 
                    opacity: overlayState.showStreamOverlay ? 1 : 0,
                    transform: overlayState.showStreamOverlay ? 'scale(1)' : 'scale(0.98)',
                    pointerEvents: overlayState.showStreamOverlay ? 'auto' : 'none'
                }}
            >
                <RIBStreamOverlay forceShow={true} />
            </div>

            {/* Intro Video Overlay */}
            <div 
                className="absolute inset-0 transition-all duration-500 ease-in-out bg-black"
                style={{ 
                    opacity: overlayState.showIntroVideo ? 1 : 0,
                    transform: overlayState.showIntroVideo ? 'scale(1)' : 'scale(1.02)',
                    pointerEvents: overlayState.showIntroVideo ? 'auto' : 'none'
                }}
            >
                {/* React Player - stays mounted, plays when visible */}
                {overlayState.introVideoUrl && (
                    <IntroVideoPlayer 
                        url={overlayState.introVideoUrl} 
                        volume={0.7}
                        isPlaying={overlayState.showIntroVideo}
                    />
                )}
            </div>
        </div>
    );
}