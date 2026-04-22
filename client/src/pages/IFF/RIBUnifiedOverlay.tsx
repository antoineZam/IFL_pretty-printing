import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';

import RIBSingleMatchOverlay from './RIBSingleMatchOverlay';
import RIBPartOneOverlay from './RIBPartOneOverlay';
import RIBPlayerStatsOverlay from './RIBPlayerStatsOverlay';
import RIBStreamOverlay from './RIBStreamOverlay';
import IntroVideoPlayer from '../../components/IntroVideoPlayer';
import SnowEffect from '../../components/SnowEffect';

// ---------------------------------------------------------------------------
// Shared types — must match the interfaces declared in each child overlay.
// ---------------------------------------------------------------------------

interface MatchCardData {
    eventTitle: string;
    eventSubtitle: string;
    partNumber: string;
    winScore: number;
    matches: Array<{
        id: number;
        matchTitle: string;
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
    rankedMatches: { wins: number; loses: number; wlRate: string };
    playerMatches: { wins: number; loses: number; wlRate: string };
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

// Parent OverlayState is a superset of what each child expects.
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

const DEFAULT_OVERLAY_STATE: OverlayState = {
    showMatchCard: false,
    showPlayerStats: false,
    showPartOne: false,
    showStreamOverlay: false,
    showIntroVideo: false,
    introVideoUrl: '',
    selectedMatchIndex: 0,
    selectedPlayerIndex: 0,
    animationTrigger: 0,
};

export default function RIBUnifiedOverlay() {
    const [searchParams] = useSearchParams();

    const [overlayState, setOverlayState] = useState<OverlayState>(DEFAULT_OVERLAY_STATE);
    const [matchCards, setMatchCards] = useState<MatchCardData | null>(null);
    const [playerStats, setPlayerStats] = useState<PlayerStatsData | null>(null);
    const [streamData, setStreamData] = useState<StreamData | null>(null);

    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';

        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');

        const socket = io({ auth: { token: connectionKey || '' } });

        socket.on('rib-overlay-state-update', (data: OverlayState) => setOverlayState(data));
        socket.on('rib-match-cards-update', (data: MatchCardData) => setMatchCards(data));
        socket.on('rib-player-stats-update', (data: PlayerStatsData) => setPlayerStats(data));
        socket.on('rib-stream-data-update', (data: StreamData) => setStreamData(data));

        return () => {
            socket.disconnect();
        };
    }, [searchParams]);

    const anyOverlayActive =
        overlayState.showMatchCard ||
        overlayState.showPlayerStats ||
        overlayState.showPartOne ||
        overlayState.showStreamOverlay ||
        overlayState.showIntroVideo;

    return (
        <div className="w-[1920px] h-[1080px] relative overflow-hidden">
            {/* Default Main Page - shows when no overlay is active */}
            <div
                className="absolute inset-0 transition-all duration-500 ease-in-out"
                style={{
                    opacity: anyOverlayActive ? 0 : 1,
                    transform: anyOverlayActive ? 'scale(1.05)' : 'scale(1)',
                    pointerEvents: anyOverlayActive ? 'none' : 'auto',
                }}
            >
                <img
                    src={`/source/overlay/main_page/Runitback_main_page_part-${matchCards?.partNumber}.png`}
                    alt="Run It Back Main Page"
                    className="w-full h-full object-cover"
                />
                <SnowEffect />
            </div>

            {/* Match Card Overlay */}
            <div
                className="absolute inset-0 transition-all duration-500 ease-in-out"
                style={{
                    opacity: overlayState.showMatchCard ? 1 : 0,
                    transform: overlayState.showMatchCard ? 'scale(1)' : 'scale(0.98)',
                    pointerEvents: overlayState.showMatchCard ? 'auto' : 'none',
                }}
            >
                <RIBSingleMatchOverlay
                    forceShow={true}
                    externalData={matchCards}
                    externalOverlayState={overlayState}
                />
            </div>

            {/* Part One Overlay */}
            <div
                className="absolute inset-0 transition-all duration-500 ease-in-out"
                style={{
                    opacity: overlayState.showPartOne ? 1 : 0,
                    transform: overlayState.showPartOne ? 'scale(1)' : 'scale(0.98)',
                    pointerEvents: overlayState.showPartOne ? 'auto' : 'none',
                }}
            >
                <RIBPartOneOverlay
                    forceShow={true}
                    externalData={matchCards}
                    externalOverlayState={overlayState}
                />
            </div>

            {/* Player Stats Overlay */}
            <div
                className="absolute inset-0 transition-all duration-500 ease-in-out"
                style={{
                    opacity: overlayState.showPlayerStats ? 1 : 0,
                    transform: overlayState.showPlayerStats ? 'scale(1)' : 'scale(0.98)',
                    pointerEvents: overlayState.showPlayerStats ? 'auto' : 'none',
                }}
            >
                <RIBPlayerStatsOverlay
                    forceShow={true}
                    externalData={playerStats}
                    externalOverlayState={overlayState}
                />
            </div>

            {/* Stream Overlay (In-Game) */}
            <div
                className="absolute inset-0 transition-all duration-500 ease-in-out"
                style={{
                    opacity: overlayState.showStreamOverlay ? 1 : 0,
                    transform: overlayState.showStreamOverlay ? 'scale(1)' : 'scale(0.98)',
                    pointerEvents: overlayState.showStreamOverlay ? 'auto' : 'none',
                }}
            >
                <RIBStreamOverlay
                    forceShow={true}
                    externalData={streamData}
                    externalOverlayState={overlayState}
                />
            </div>

            {/* Intro Video Overlay */}
            <div
                className="absolute inset-0 transition-all duration-500 ease-in-out bg-black"
                style={{
                    opacity: overlayState.showIntroVideo ? 1 : 0,
                    transform: overlayState.showIntroVideo ? 'scale(1)' : 'scale(1.02)',
                    pointerEvents: overlayState.showIntroVideo ? 'auto' : 'none',
                }}
            >
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
