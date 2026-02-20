import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

// Import the actual overlay components (using embedded mode)
import LoveAndWarTeamStatsOverlay from './LoveAndWarTeamStatsOverlay';
import LoveAndWarMatchOverlay from './LoveAndWarMatchOverlay';

// Display mode types
type DisplayMode = 'match' | 'team-stats' | 'match-card' | 'idle';

interface DisplayState {
    mode: DisplayMode;
    teamId?: number | null;
    visible: boolean;
}

type MatchMode = 'team' | '1v1';

interface LnWMatchData {
    team1: { name: string; players: any[]; score: number };
    team2: { name: string; players: any[]; score: number };
    round: string;
    match_number?: number;
    win_score?: number;
    match_mode?: MatchMode;
}

const LoveAndWarUnifiedOverlay = () => {
    const [searchParams] = useSearchParams();
    const [displayMode, setDisplayMode] = useState<DisplayMode>('idle');
    const [teamIdForStats, setTeamIdForStats] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [matchData, setMatchData] = useState<LnWMatchData | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    // Set transparent background
    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        return () => {
            document.body.style.backgroundColor = '';
            document.documentElement.style.backgroundColor = '';
        };
    }, []);

    // Socket connection for display mode control
    useEffect(() => {
        const key = searchParams.get('key');
        if (!key) return;

        const newSocket: Socket = io({ auth: { token: key } });
        setSocket(newSocket);
        
        newSocket.on('connect', () => {
            console.log('[LnW Unified] Socket connected');
        });

        // Listen for display mode changes from control page
        newSocket.on('lnw-display-mode', (state: DisplayState) => {
            console.log('[LnW Unified] Display mode change:', state);
            setDisplayMode(state.mode);
            setIsVisible(state.visible);
            if (state.teamId) {
                setTeamIdForStats(state.teamId);
            }
        });

        // Listen for explicit refresh requests — bump key to force full remount
        newSocket.on('lnw-refresh-overlay', () => {
            console.log('[LnW Unified] Refresh overlay requested');
            setRefreshKey(prev => prev + 1);
        });

        // Also listen for legacy team display updates
        newSocket.on('love-and-war-display-update', (state: { teamId: number | null; visible: boolean }) => {
            console.log('[LnW Unified] Team display update:', state);
            if (state.teamId && state.visible) {
                setDisplayMode('team-stats');
                setTeamIdForStats(state.teamId);
                setIsVisible(true);
            } else if (!state.visible) {
                setIsVisible(false);
            }
        });

        // Listen for match data updates to check for auto-switch
        newSocket.on('lnw-match-data', (data: LnWMatchData) => {
            console.log('[LnW Unified] Match data update:', data);
            setMatchData(data);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [searchParams]);

    // Auto-switch to matchup card when a team reaches winning score
    useEffect(() => {
        if (!matchData || displayMode !== 'match') return;
        
        // Default win score: 3 for 1v1, 4 for team matches
        const defaultWinScore = matchData.match_mode === '1v1' ? 3 : 4;
        const winScore = matchData.win_score || defaultWinScore;
        const team1Won = matchData.team1.score >= winScore;
        const team2Won = matchData.team2.score >= winScore;
        
        if (team1Won || team2Won) {
            console.log('[LnW Unified] Auto-switching to matchup card - match complete');
            setDisplayMode('match-card');
        }
    }, [matchData, displayMode]);

    // Render based on display mode
    const renderContent = () => {
        // Idle mode - just show the base overlay image
        if (displayMode === 'idle' || !isVisible) {
            return (
                <div className="w-full h-full relative">
                    <img 
                        src="/source/overlay/love_and_war/default.png"
                        alt="Love and War Overlay"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                        }}
                    />
                </div>
            );
        }

        // Match mode - render the match overlay (embedded mode)
        if (displayMode === 'match') {
            return <LoveAndWarMatchOverlay socket={socket} embedded initialData={matchData} />;
        }

        // Match card mode - render match card (embedded mode)
        if (displayMode === 'match-card') {
            return <LoveAndWarMatchOverlay socket={socket} embedded showAsMatchCard initialData={matchData} />;
        }

        // Team stats mode - render the team stats overlay (embedded mode)
        if (displayMode === 'team-stats' && teamIdForStats) {
            return <LoveAndWarTeamStatsOverlay teamId={teamIdForStats} embedded />;
        }

        // Fallback to idle
        return (
            <div className="w-full h-full relative" style={{ backgroundColor: '#911A2C' }}>
                <img 
                    src="/source/overlay/love_and_war/default.png"
                    alt="Love and War Overlay"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                    }}
                />
            </div>
        );
    };

    // Use transparent background for match mode, red for other modes
    const containerBgColor = (displayMode === 'match' || displayMode === 'match-card') 
        ? 'transparent' 
        : '#911A2C';

    return (
        <div 
            className="w-[1920px] h-[1080px] text-white overflow-hidden"
            style={{ fontFamily: "'ED Manteca', sans-serif", backgroundColor: containerBgColor }}
        >
            <div key={refreshKey} className="w-full h-full">
                {renderContent()}
            </div>
        </div>
    );
};

export default LoveAndWarUnifiedOverlay;
