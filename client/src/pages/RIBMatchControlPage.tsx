import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { 
    Play, 
    RotateCcw, 
    Eye, 
    EyeOff, 
    Users, 
    BarChart3, 
    Tv, 
    ListVideo,
    ChevronLeft,
    ChevronRight,
    Plus,
    Minus,
    Settings,
    Download,
    Save,
    Trophy
} from 'lucide-react';
import { countries } from '../utils/countries';

interface MatchCardData {
    eventTitle: string;
    eventSubtitle: string;
    partNumber: string;
    winScore: number;
    mainEvent: {
        p1Name: string;
        p1Title: string;
        p1Character: string;
        p1Flag?: string;
        p1Score: number;
        p2Name: string;
        p2Title: string;
        p2Character: string;
        p2Flag?: string;
        p2Score: number;
        winner: 'p1' | 'p2' | null;
        completed: boolean;
    };
    matches: Array<{
        id: number;
        matchTitle: string;
        p1Name: string;
        p1Title: string;
        p1Character: string;
        p1Flag?: string;
        p1Score: number;
        p2Name: string;
        p2Title: string;
        p2Character: string;
        p2Flag?: string;
        p2Score: number;
        winner: 'p1' | 'p2' | null;
        completed: boolean;
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

export default function RIBMatchControlPage() {
    const navigate = useNavigate();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    
    const [matchCards, setMatchCards] = useState<MatchCardData | null>(null);
    const [playerStats, setPlayerStats] = useState<PlayerStatsData | null>(null);
    const [streamData, setStreamData] = useState<StreamData>({
        matchTitle: '',
        p1Name: '', p1Flag: '', p1Score: 0,
        p2Name: '', p2Flag: '', p2Score: 0
    });
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
        const connectionKey = localStorage.getItem('connectionKey');
        if (!connectionKey) {
            navigate('/auth');
            return;
        }

        const newSocket = io({
            auth: { token: connectionKey }
        });

        newSocket.on('connect', () => setConnected(true));
        newSocket.on('disconnect', () => setConnected(false));
        newSocket.on('connect_error', () => {
            localStorage.removeItem('connectionKey');
            navigate('/auth');
        });

        newSocket.on('rib-match-cards-update', (data: MatchCardData) => setMatchCards(data));
        newSocket.on('rib-player-stats-update', (data: PlayerStatsData) => setPlayerStats(data));
        newSocket.on('rib-stream-data-update', (data: StreamData) => setStreamData(data));
        newSocket.on('rib-overlay-state-update', (data: OverlayState) => setOverlayState(data));

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [navigate]);

    const updateOverlayState = (updates: Partial<OverlayState>) => {
        const newState = { ...overlayState, ...updates };
        setOverlayState(newState);
        socket?.emit('rib-overlay-state-update', newState);
    };

    const updateStreamData = (updates: Partial<StreamData>) => {
        const newData = { ...streamData, ...updates };
        setStreamData(newData);
        socket?.emit('rib-stream-data-update', newData);
    };

    const toggleOverlay = (overlay: keyof Pick<OverlayState, 'showMatchCard' | 'showPlayerStats' | 'showPartOne' | 'showStreamOverlay'>) => {
        // Turn off all overlays first, then toggle the selected one
        const newState: OverlayState = {
            ...overlayState,
            showMatchCard: false,
            showPlayerStats: false,
            showPartOne: false,
            showStreamOverlay: false,
            [overlay]: !overlayState[overlay]
        };
        setOverlayState(newState);
        socket?.emit('rib-overlay-state-update', newState);
    };

    const triggerAnimation = () => {
        updateOverlayState({ animationTrigger: overlayState.animationTrigger + 1 });
    };

    const selectMatch = (direction: 'prev' | 'next') => {
        if (!matchCards) return;
        const maxIndex = matchCards.matches.length;
        let newIndex = overlayState.selectedMatchIndex;
        
        if (direction === 'prev') {
            newIndex = newIndex > 0 ? newIndex - 1 : maxIndex;
        } else {
            newIndex = newIndex < maxIndex ? newIndex + 1 : 0;
        }
        
        updateOverlayState({ selectedMatchIndex: newIndex });
    };

    const selectPlayer = (direction: 'prev' | 'next') => {
        if (!playerStats) return;
        const maxIndex = playerStats.players.length - 1;
        let newIndex = overlayState.selectedPlayerIndex;
        
        if (direction === 'prev') {
            newIndex = newIndex > 0 ? newIndex - 1 : maxIndex;
        } else {
            newIndex = newIndex < maxIndex ? newIndex + 1 : 0;
        }
        
        updateOverlayState({ selectedPlayerIndex: newIndex });
    };

    const getSelectedMatchName = () => {
        if (!matchCards) return 'No matches loaded';
        if (overlayState.selectedMatchIndex === 0) {
            return `Main Event: ${matchCards.mainEvent.p1Name} vs ${matchCards.mainEvent.p2Name}`;
        }
        const match = matchCards.matches[overlayState.selectedMatchIndex - 1];
        return match ? `Match ${overlayState.selectedMatchIndex}: ${match.p1Name} vs ${match.p2Name}` : 'No match selected';
    };

    const getSelectedPlayerName = () => {
        if (!playerStats || playerStats.players.length === 0) return 'No players loaded';
        const player = playerStats.players[overlayState.selectedPlayerIndex];
        return player ? player.name : 'No player selected';
    };

    // Load stream data from selected match card
    const loadFromMatchCard = () => {
        if (!matchCards || !socket) return;
        
        let p1Name = '';
        let p2Name = '';
        let p1Flag = '';
        let p2Flag = '';
        let p1Score = 0;
        let p2Score = 0;
        let matchTitle = '';
        let p1Title = '';
        let p2Title = '';
        let p1Character = '';
        let p2Character = '';
        
        if (overlayState.selectedMatchIndex === 0) {
            // Main Event
            p1Name = matchCards.mainEvent.p1Name;
            p2Name = matchCards.mainEvent.p2Name;
            p1Flag = matchCards.mainEvent.p1Flag || '';
            p2Flag = matchCards.mainEvent.p2Flag || '';
            p1Score = matchCards.mainEvent.p1Score || 0;
            p2Score = matchCards.mainEvent.p2Score || 0;
            p1Title = matchCards.mainEvent.p1Title || '';
            p2Title = matchCards.mainEvent.p2Title || '';
            p1Character = matchCards.mainEvent.p1Character || '';
            p2Character = matchCards.mainEvent.p2Character || '';
            matchTitle = 'Main Event';
        } else {
            // Regular match
            const match = matchCards.matches[overlayState.selectedMatchIndex - 1];
            if (match) {
                p1Name = match.p1Name;
                p2Name = match.p2Name;
                p1Flag = match.p1Flag || '';
                p2Flag = match.p2Flag || '';
                p1Score = match.p1Score || 0;
                p2Score = match.p2Score || 0;
                p1Title = match.p1Title || '';
                p2Title = match.p2Title || '';
                p1Character = match.p1Character || '';
                p2Character = match.p2Character || '';
                matchTitle = `Match ${overlayState.selectedMatchIndex}`;
            }
        }
        
        // Update stream data for StreamOverlay
        updateStreamData({
            matchTitle,
            p1Name,
            p2Name,
            p1Flag,
            p2Flag,
            p1Score,
            p2Score
        });
    };

    // Save scores and flags to match card and determine winner
    const saveScoresToMatchCard = () => {
        if (!matchCards || !socket) return;
        
        const winScore = matchCards.winScore || 3;
        const p1Score = streamData.p1Score;
        const p2Score = streamData.p2Score;
        const p1Flag = streamData.p1Flag;
        const p2Flag = streamData.p2Flag;
        
        // Determine winner (first to reach winScore)
        let winner: 'p1' | 'p2' | null = null;
        let completed = false;
        
        if (p1Score >= winScore) {
            winner = 'p1';
            completed = true;
        } else if (p2Score >= winScore) {
            winner = 'p2';
            completed = true;
        }
        
        const updatedMatchCards = { ...matchCards };
        
        if (overlayState.selectedMatchIndex === 0) {
            // Update Main Event
            updatedMatchCards.mainEvent = {
                ...updatedMatchCards.mainEvent,
                p1Score,
                p2Score,
                p1Flag,
                p2Flag,
                winner,
                completed
            };
        } else {
            // Update regular match
            const matchIndex = overlayState.selectedMatchIndex - 1;
            if (updatedMatchCards.matches[matchIndex]) {
                updatedMatchCards.matches[matchIndex] = {
                    ...updatedMatchCards.matches[matchIndex],
                    p1Score,
                    p2Score,
                    p1Flag,
                    p2Flag,
                    winner,
                    completed
                };
            }
        }
        
        setMatchCards(updatedMatchCards);
        socket.emit('rib-match-cards-update', updatedMatchCards);
    };

    // Get current match status
    const getCurrentMatchStatus = () => {
        if (!matchCards) return { completed: false, winner: null };
        
        if (overlayState.selectedMatchIndex === 0) {
            return {
                completed: matchCards.mainEvent.completed,
                winner: matchCards.mainEvent.winner,
                p1Score: matchCards.mainEvent.p1Score,
                p2Score: matchCards.mainEvent.p2Score
            };
        } else {
            const match = matchCards.matches[overlayState.selectedMatchIndex - 1];
            if (match) {
                return {
                    completed: match.completed,
                    winner: match.winner,
                    p1Score: match.p1Score,
                    p2Score: match.p2Score
                };
            }
        }
        return { completed: false, winner: null, p1Score: 0, p2Score: 0 };
    };

    const matchStatus = getCurrentMatchStatus();

    return (
        <div className="min-h-screen bg-black text-white p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-red-500">RUN IT BACK</h1>
                    <p className="text-gray-400">Match Controller</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${connected ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                        <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'}`} />
                        {connected ? 'Connected' : 'Disconnected'}
                    </div>
                    <button
                        onClick={() => navigate('/rib/match-cards-editor')}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <Settings size={18} />
                        Edit Match Cards
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Overlay Controls */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Tv size={20} />
                        Overlay Controls
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {/* Match Card Toggle */}
                        <button
                            onClick={() => toggleOverlay('showMatchCard')}
                            className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-all ${
                                overlayState.showMatchCard 
                                    ? 'bg-red-600 hover:bg-red-700' 
                                    : 'bg-gray-800 hover:bg-gray-700'
                            }`}
                        >
                            {overlayState.showMatchCard ? <Eye size={20} /> : <EyeOff size={20} />}
                            <span>Match Cards</span>
                        </button>

                        {/* Player Stats Toggle */}
                        <button
                            onClick={() => toggleOverlay('showPlayerStats')}
                            className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-all ${
                                overlayState.showPlayerStats 
                                    ? 'bg-red-600 hover:bg-red-700' 
                                    : 'bg-gray-800 hover:bg-gray-700'
                            }`}
                        >
                            {overlayState.showPlayerStats ? <Eye size={20} /> : <EyeOff size={20} />}
                            <span>Player Stats</span>
                        </button>

                        {/* Part One Toggle */}
                        <button
                            onClick={() => toggleOverlay('showPartOne')}
                            className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-all ${
                                overlayState.showPartOne 
                                    ? 'bg-red-600 hover:bg-red-700' 
                                    : 'bg-gray-800 hover:bg-gray-700'
                            }`}
                        >
                            {overlayState.showPartOne ? <Eye size={20} /> : <EyeOff size={20} />}
                            <span>Part One</span>
                        </button>

                        {/* Stream Overlay Toggle */}
                        <button
                            onClick={() => toggleOverlay('showStreamOverlay')}
                            className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-all ${
                                overlayState.showStreamOverlay 
                                    ? 'bg-red-600 hover:bg-red-700' 
                                    : 'bg-gray-800 hover:bg-gray-700'
                            }`}
                        >
                            {overlayState.showStreamOverlay ? <Eye size={20} /> : <EyeOff size={20} />}
                            <span>Stream Overlay</span>
                        </button>
                    </div>

                    {/* Animation Trigger */}
                    <div className="mt-6">
                        <button
                            onClick={triggerAnimation}
                            className="w-full flex items-center justify-center gap-2 p-4 bg-red-600 hover:bg-red-700 rounded-lg transition-all"
                        >
                            <Play size={20} />
                            <span>Play / Replay Animations</span>
                        </button>
                    </div>
                </div>

                {/* Match Selection */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <ListVideo size={20} />
                        Match Selection
                    </h2>
                    
                    <div className="bg-gray-800 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-400 mb-1">Currently Selected</p>
                        <p className="text-lg font-medium">{getSelectedMatchName()}</p>
                    </div>
                    
                    <div className="flex gap-4 mb-4">
                        <button
                            onClick={() => selectMatch('prev')}
                            className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <ChevronLeft size={20} />
                            Previous
                        </button>
                        <button
                            onClick={() => selectMatch('next')}
                            className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            Next
                            <ChevronRight size={20} />
                        </button>
                    </div>
                    
                    {/* Load from Match Card Button */}
                    <button
                        onClick={loadFromMatchCard}
                        className="w-full flex items-center justify-center gap-2 p-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                        <Download size={18} />
                        Load to Stream Overlay
                    </button>

                    {/* Player Selection for Stats */}
                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <BarChart3 size={18} />
                            Player Stats Selection
                        </h3>
                        
                        <div className="bg-gray-800 rounded-lg p-4 mb-4">
                            <p className="text-sm text-gray-400 mb-1">Currently Selected</p>
                            <p className="text-lg font-medium">{getSelectedPlayerName()}</p>
                        </div>
                        
                        <div className="flex gap-4">
                            <button
                                onClick={() => selectPlayer('prev')}
                                className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <ChevronLeft size={20} />
                                Previous
                            </button>
                            <button
                                onClick={() => selectPlayer('next')}
                                className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                Next
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stream Overlay Controls */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 lg:col-span-2">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Users size={20} />
                        Live Match Controls
                    </h2>

                    {/* Match Title */}
                    <div className="mb-6">
                        <label className="block text-sm text-gray-400 mb-1">Match Title</label>
                        <input
                            type="text"
                            value={streamData.matchTitle}
                            onChange={(e) => updateStreamData({ matchTitle: e.target.value })}
                            placeholder="e.g., Winners Finals, Grand Finals, etc."
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Player 1 */}
                        <div className="bg-gray-800 rounded-lg p-4">
                            <h3 className="text-lg font-medium mb-4 text-red-400">Player 1</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={streamData.p1Name}
                                        onChange={(e) => updateStreamData({ p1Name: e.target.value })}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Flag</label>
                                    <select
                                        value={streamData.p1Flag}
                                        onChange={(e) => updateStreamData({ p1Flag: e.target.value })}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                                    >
                                        {Object.entries(countries).map(([code, name]) => (
                                            <option key={code} value={code}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Score</label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateStreamData({ p1Score: Math.max(0, streamData.p1Score - 1) })}
                                            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                                        >
                                            <Minus size={20} />
                                        </button>
                                        <span className="text-3xl font-bold w-16 text-center">{streamData.p1Score}</span>
                                        <button
                                            onClick={() => updateStreamData({ p1Score: streamData.p1Score + 1 })}
                                            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Player 2 */}
                        <div className="bg-gray-800 rounded-lg p-4">
                            <h3 className="text-lg font-medium mb-4 text-blue-400">Player 2</h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={streamData.p2Name}
                                        onChange={(e) => updateStreamData({ p2Name: e.target.value })}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Flag</label>
                                    <select
                                        value={streamData.p2Flag}
                                        onChange={(e) => updateStreamData({ p2Flag: e.target.value })}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                                    >
                                        {Object.entries(countries).map(([code, name]) => (
                                            <option key={code} value={code}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Score</label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateStreamData({ p2Score: Math.max(0, streamData.p2Score - 1) })}
                                            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                                        >
                                            <Minus size={20} />
                                        </button>
                                        <span className="text-3xl font-bold w-16 text-center">{streamData.p2Score}</span>
                                        <button
                                            onClick={() => updateStreamData({ p2Score: streamData.p2Score + 1 })}
                                            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Match Status */}
                    {matchStatus.completed && (
                        <div className="mt-6 p-4 bg-green-900/30 border border-green-500/50 rounded-lg">
                            <div className="flex items-center justify-center gap-2 text-green-400">
                                <Trophy size={20} />
                                <span className="font-bold">
                                    Match Complete - Winner: {matchStatus.winner === 'p1' ? streamData.p1Name : streamData.p2Name}
                                </span>
                            </div>
                            <p className="text-center text-green-400/70 text-sm mt-1">
                                Final Score: {matchStatus.p1Score} - {matchStatus.p2Score}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-6 flex justify-center gap-4">
                        <button
                            onClick={() => updateStreamData({ p1Score: 0, p2Score: 0 })}
                            className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <RotateCcw size={18} />
                            Reset Scores
                        </button>
                        <button
                            onClick={saveScoresToMatchCard}
                            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                        >
                            <Save size={18} />
                            Save Scores to Match Card
                        </button>
                    </div>

                    {/* Saved Scores Info */}
                    {matchCards && (
                        <div className="mt-4 text-center text-sm text-gray-500">
                            <p>Win condition: First to {matchCards.winScore || 3}</p>
                            {matchStatus.p1Score !== undefined && matchStatus.p2Score !== undefined && (
                                <p className="mt-1">
                                    Saved scores: {matchStatus.p1Score} - {matchStatus.p2Score}
                                    {matchStatus.completed && ` (${matchStatus.winner === 'p1' ? 'P1' : 'P2'} wins)`}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

