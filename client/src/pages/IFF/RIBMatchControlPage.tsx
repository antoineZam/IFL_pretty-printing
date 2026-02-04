import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import IFFBurgerMenu from '../../components/IFFBurgerMenu';
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
    Trophy,
    Trash2,
    UserPlus,
    Edit3,
    X,
    Youtube,
    ArrowLeftRight
} from 'lucide-react';
import { countries } from '../../utils/countries';

// Available Tekken 8 characters
const characters: Record<string, string> = {
    '': '-- Select Character --',
    'alisa': 'Alisa',
    'anna': 'Anna',
    'armor king': 'Armor King',
    'azucena': 'Azucena',
    'bryan': 'Bryan',
    'eddy': 'Eddy',
    'heihachi': 'Heihachi',
    'jin': 'Jin',
    'kazuya': 'Kazuya',
    'law': 'Law',
    'lee': 'Lee',
    'leo': 'Leo',
    'lili': 'Lili',
    'nina': 'Nina',
    'pikah': 'Pikah',
    'reina': 'Reina',
    'steve': 'Steve',
    'zafina': 'Zafina',
    'schizophrenic': 'Schizophrenic'
};

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
    showIntroVideo: boolean;
    introVideoUrl: string;
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
        showIntroVideo: false,
        introVideoUrl: '',
        selectedMatchIndex: 0,
        selectedPlayerIndex: 0,
        animationTrigger: 0
    });
    const [introVideoUrlInput, setIntroVideoUrlInput] = useState('');
    const [editingPlayer, setEditingPlayer] = useState<PlayerStats | null>(null);
    const [isAddingPlayer, setIsAddingPlayer] = useState(false);

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

    const updateStreamData = (updates: Partial<StreamData>, skipWinDetection = false) => {
        const newData = { ...streamData, ...updates };
        setStreamData(newData);
        socket?.emit('rib-stream-data-update', newData);
        
        // Skip win detection if requested (e.g., during player swap)
        if (skipWinDetection) return;

        // Auto-transition to SingleMatchOverlay when a player reaches win score
        const winScore = matchCards?.winScore || 3;
        const newP1Score = updates.p1Score ?? streamData.p1Score;
        const newP2Score = updates.p2Score ?? streamData.p2Score;
        
        if (newP1Score >= winScore || newP2Score >= winScore) {
            // First, save the scores to match cards so SingleMatchOverlay has updated data
            if (matchCards && socket) {
                const winner: 'p1' | 'p2' = newP1Score >= winScore ? 'p1' : 'p2';
                const updatedMatchCards = { ...matchCards };
                const matchIndex = overlayState.selectedMatchIndex;
                
                if (updatedMatchCards.matches[matchIndex]) {
                    updatedMatchCards.matches[matchIndex] = {
                        ...updatedMatchCards.matches[matchIndex],
                        p1Score: newP1Score,
                        p2Score: newP2Score,
                        winner,
                        completed: true
                    };
                }
                
                setMatchCards(updatedMatchCards);
                socket.emit('rib-match-cards-update', updatedMatchCards);
            }

            // Small delay to let the data update be processed, then switch to SingleMatchOverlay
            setTimeout(() => {
                const victoryState: OverlayState = {
                    ...overlayState,
                    showMatchCard: true,
                    showPlayerStats: false,
                    showPartOne: false,
                    showStreamOverlay: false,
                    animationTrigger: overlayState.animationTrigger + 1
                };
                setOverlayState(victoryState);
                socket?.emit('rib-overlay-state-update', victoryState);
            }, 300);
        }
    };

    // Swap player positions (P1 <-> P2) without triggering win detection
    const swapPlayers = () => {
        // Swap stream data
        updateStreamData({
            p1Name: streamData.p2Name,
            p1Flag: streamData.p2Flag,
            p1Score: streamData.p2Score,
            p2Name: streamData.p1Name,
            p2Flag: streamData.p1Flag,
            p2Score: streamData.p1Score
        }, true); // Skip win detection during swap

        // Also swap match card data for the current match (including winner reference)
        if (matchCards && socket) {
            const matchIndex = overlayState.selectedMatchIndex;
            const match = matchCards.matches[matchIndex];

            if (match) {
                const updatedMatchCards = { ...matchCards };
                updatedMatchCards.matches[matchIndex] = {
                    ...match,
                    p1Name: match.p2Name,
                    p1Title: match.p2Title,
                    p1Character: match.p2Character,
                    p1Flag: match.p2Flag,
                    p1Score: match.p2Score,
                    p2Name: match.p1Name,
                    p2Title: match.p1Title,
                    p2Character: match.p1Character,
                    p2Flag: match.p1Flag,
                    p2Score: match.p1Score,
                    // Swap winner reference so the same person stays the winner
                    winner: match.winner === 'p1' ? 'p2' : match.winner === 'p2' ? 'p1' : null
                };

                setMatchCards(updatedMatchCards);
                socket.emit('rib-match-cards-update', updatedMatchCards);
            }
        }
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

    // Get player indices that match a specific match's players
    const getMatchPlayerIndicesForMatch = (matchIndex: number): number[] => {
        if (!playerStats || !matchCards) return [];
        const match = matchCards.matches[matchIndex];
        if (!match) return [];
        
        const matchPlayerNames = [match.p1Name.toLowerCase(), match.p2Name.toLowerCase()];
        return playerStats.players
            .map((player, index) => ({ player, index }))
            .filter(({ player }) => matchPlayerNames.includes(player.name.toLowerCase()))
            .map(({ index }) => index);
    };

    // Get player indices for current match
    const getMatchPlayerIndices = (): number[] => {
        return getMatchPlayerIndicesForMatch(overlayState.selectedMatchIndex);
    };

    const selectMatch = (direction: 'prev' | 'next') => {
        if (!matchCards || matchCards.matches.length === 0) return;
        const maxIndex = matchCards.matches.length - 1;
        let newIndex = overlayState.selectedMatchIndex;
        
        if (direction === 'prev') {
            newIndex = newIndex > 0 ? newIndex - 1 : maxIndex;
        } else {
            newIndex = newIndex < maxIndex ? newIndex + 1 : 0;
        }
        
        // Auto-select the first player from the new match
        const newMatchPlayerIndices = getMatchPlayerIndicesForMatch(newIndex);
        const newPlayerIndex = newMatchPlayerIndices.length > 0 ? newMatchPlayerIndices[0] : overlayState.selectedPlayerIndex;
        
        updateOverlayState({ selectedMatchIndex: newIndex, selectedPlayerIndex: newPlayerIndex });
    };

    const selectPlayer = (direction: 'prev' | 'next') => {
        if (!playerStats) return;
        
        const matchPlayerIndices = getMatchPlayerIndices();
        if (matchPlayerIndices.length === 0) return;
        
        const currentPosInFiltered = matchPlayerIndices.indexOf(overlayState.selectedPlayerIndex);
        let newPosInFiltered: number;
        
        if (currentPosInFiltered === -1) {
            // Current player not in filtered list, select first
            newPosInFiltered = 0;
        } else if (direction === 'prev') {
            newPosInFiltered = currentPosInFiltered > 0 ? currentPosInFiltered - 1 : matchPlayerIndices.length - 1;
        } else {
            newPosInFiltered = currentPosInFiltered < matchPlayerIndices.length - 1 ? currentPosInFiltered + 1 : 0;
        }
        
        updateOverlayState({ selectedPlayerIndex: matchPlayerIndices[newPosInFiltered] });
    };

    const getSelectedMatchName = () => {
        if (!matchCards) return 'No matches loaded';
        const match = matchCards.matches[overlayState.selectedMatchIndex];
        if (!match) return 'No match selected';
        const matchLabel = match.isMainEvent ? 'Main Event' : `Match ${overlayState.selectedMatchIndex + 1}`;
        return `${matchLabel}: ${match.p1Name} vs ${match.p2Name}`;
    };

    const getSelectedPlayerName = () => {
        if (!playerStats || playerStats.players.length === 0) return 'No players loaded';
        const matchPlayerIndices = getMatchPlayerIndices();
        if (matchPlayerIndices.length === 0) return 'No matching players for this match';
        const player = playerStats.players[overlayState.selectedPlayerIndex];
        return player ? player.name : 'No player selected';
    };

    // Load stream data from selected match card
    const loadFromMatchCard = () => {
        if (!matchCards || !socket) return;
        
        const match = matchCards.matches[overlayState.selectedMatchIndex];
        if (!match) return;
        
        const matchTitle = match.matchTitle || (match.isMainEvent ? 'Main Event' : `Match ${overlayState.selectedMatchIndex + 1}`);
        
        // Update stream data for StreamOverlay
        updateStreamData({
            matchTitle,
            p1Name: match.p1Name,
            p2Name: match.p2Name,
            p1Flag: match.p1Flag || '',
            p2Flag: match.p2Flag || '',
            p1Score: match.p1Score || 0,
            p2Score: match.p2Score || 0
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
        const matchIndex = overlayState.selectedMatchIndex;
        
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
        
        setMatchCards(updatedMatchCards);
        socket.emit('rib-match-cards-update', updatedMatchCards);
    };

    // Get current match status
    const getCurrentMatchStatus = () => {
        if (!matchCards) return { completed: false, winner: null, p1Score: 0, p2Score: 0 };
        
        const match = matchCards.matches[overlayState.selectedMatchIndex];
        if (match) {
            return {
                completed: match.completed,
                winner: match.winner,
                p1Score: match.p1Score,
                p2Score: match.p2Score
            };
        }
        return { completed: false, winner: null, p1Score: 0, p2Score: 0 };
    };

    const matchStatus = getCurrentMatchStatus();

    // Player Stats Management Functions
    const createEmptyPlayer = (): PlayerStats => ({
        name: '',
        character: '',
        division: '',
        iff8Ranking: '',
        iff8Record: '',
        iff8RecordDetails: '',
        iffHistory: '',
        rank: '',
        prowess: 0,
        rankedMatches: { wins: 0, loses: 0, wlRate: '0%' },
        playerMatches: { wins: 0, loses: 0, wlRate: '0%' }
    });

    const addPlayer = () => {
        setEditingPlayer(createEmptyPlayer());
        setIsAddingPlayer(true);
    };

    const editCurrentPlayer = () => {
        if (playerStats && playerStats.players[overlayState.selectedPlayerIndex]) {
            setEditingPlayer({ ...playerStats.players[overlayState.selectedPlayerIndex] });
            setIsAddingPlayer(false);
        }
    };

    const savePlayer = () => {
        if (!editingPlayer || !socket) return;
        
        const currentPlayers = playerStats?.players || [];
        let updatedPlayers: PlayerStats[];
        
        if (isAddingPlayer) {
            updatedPlayers = [...currentPlayers, editingPlayer];
        } else {
            updatedPlayers = currentPlayers.map((p, i) => 
                i === overlayState.selectedPlayerIndex ? editingPlayer : p
            );
        }
        
        const updatedData = { players: updatedPlayers };
        setPlayerStats(updatedData);
        socket.emit('rib-player-stats-update', updatedData);
        setEditingPlayer(null);
        
        // If adding, select the new player
        if (isAddingPlayer) {
            updateOverlayState({ selectedPlayerIndex: updatedPlayers.length - 1 });
        }
    };

    const deleteCurrentPlayer = () => {
        if (!playerStats || !socket || playerStats.players.length === 0) return;
        
        const updatedPlayers = playerStats.players.filter((_, i) => i !== overlayState.selectedPlayerIndex);
        const updatedData = { players: updatedPlayers };
        setPlayerStats(updatedData);
        socket.emit('rib-player-stats-update', updatedData);
        
        // Adjust selected index if needed
        if (overlayState.selectedPlayerIndex >= updatedPlayers.length) {
            updateOverlayState({ selectedPlayerIndex: Math.max(0, updatedPlayers.length - 1) });
        }
    };

    const updateEditingPlayer = (field: string, value: string | number) => {
        if (!editingPlayer) return;
        
        const keys = field.split('.');
        if (keys.length === 1) {
            setEditingPlayer({ ...editingPlayer, [field]: value });
        } else {
            // Handle nested fields like rankedMatches.wins
            const [parent, child] = keys;
            setEditingPlayer({
                ...editingPlayer,
                [parent]: {
                    ...(editingPlayer as any)[parent],
                    [child]: value
                }
            });
        }
    };

    const cancelEditing = () => {
        setEditingPlayer(null);
        setIsAddingPlayer(false);
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 pl-20">
            <IFFBurgerMenu />
            
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
                        {/* Versus Scene Toggle */}
                        <button
                            onClick={() => toggleOverlay('showMatchCard')}
                            className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-all ${
                                overlayState.showMatchCard 
                                    ? 'bg-red-600 hover:bg-red-700' 
                                    : 'bg-gray-800 hover:bg-gray-700'
                            }`}
                        >
                            {overlayState.showMatchCard ? <Eye size={20} /> : <EyeOff size={20} />}
                            <span>Versus Scene</span>
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

                        {/* Match Cards Toggle */}
                        <button
                            onClick={() => toggleOverlay('showPartOne')}
                            className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-all ${
                                overlayState.showPartOne 
                                    ? 'bg-red-600 hover:bg-red-700' 
                                    : 'bg-gray-800 hover:bg-gray-700'
                            }`}
                        >
                            {overlayState.showPartOne ? <Eye size={20} /> : <EyeOff size={20} />}
                            <span>Match Cards</span>
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

                    {/* Intro Video Controls */}
                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Youtube size={18} />
                            Intro Video
                        </h3>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">YouTube URL</label>
                                <input
                                    type="text"
                                    value={introVideoUrlInput}
                                    onChange={(e) => setIntroVideoUrlInput(e.target.value)}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                                />
                            </div>
                            
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        // Turn off all other overlays and play intro video
                                        const newState: OverlayState = {
                                            ...overlayState,
                                            showMatchCard: false,
                                            showPlayerStats: false,
                                            showPartOne: false,
                                            showStreamOverlay: false,
                                            showIntroVideo: true,
                                            introVideoUrl: introVideoUrlInput
                                        };
                                        setOverlayState(newState);
                                        socket?.emit('rib-overlay-state-update', newState);
                                    }}
                                    disabled={!introVideoUrlInput}
                                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-all ${
                                        introVideoUrlInput 
                                            ? 'bg-red-600 hover:bg-red-700' 
                                            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    <Play size={18} />
                                    Play Intro
                                </button>
                                
                                <button
                                    onClick={() => {
                                        const newState: OverlayState = {
                                            ...overlayState,
                                            showIntroVideo: false
                                        };
                                        setOverlayState(newState);
                                        socket?.emit('rib-overlay-state-update', newState);
                                    }}
                                    className="flex items-center justify-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all active:scale-90"
                                >
                                    <div className="w-4 h-4 bg-white rounded-sm" />
                                    Stop
                                </button>
                            </div>
                        </div>
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
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <BarChart3 size={18} />
                                Player Stats Selection
                            </h3>
                            <button
                                onClick={addPlayer}
                                className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm"
                            >
                                <UserPlus size={16} />
                                Add Player
                            </button>
                        </div>
                        
                        <div className="bg-gray-800 rounded-lg p-4 mb-4">
                            <p className="text-sm text-gray-400 mb-1">
                                Players in this match ({getMatchPlayerIndices().length} of {playerStats?.players.length || 0})
                            </p>
                            <p className="text-lg font-medium">{getSelectedPlayerName()}</p>
                        </div>
                        
                        <div className="flex gap-4 mb-4">
                            <button
                                onClick={() => selectPlayer('prev')}
                                disabled={getMatchPlayerIndices().length < 2}
                                className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                            >
                                <ChevronLeft size={20} />
                                Previous
                            </button>
                            <button
                                onClick={() => selectPlayer('next')}
                                disabled={getMatchPlayerIndices().length < 2}
                                className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                            >
                                Next
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        {/* Edit/Delete buttons for current player */}
                        {playerStats && playerStats.players.length > 0 && (
                            <div className="flex gap-2">
                                <button
                                    onClick={editCurrentPlayer}
                                    className="flex-1 flex items-center justify-center gap-2 p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
                                >
                                    <Edit3 size={16} />
                                    Edit Player
                                </button>
                                <button
                                    onClick={deleteCurrentPlayer}
                                    className="flex items-center justify-center gap-2 p-2 bg-red-900 hover:bg-red-800 rounded-lg transition-colors text-sm"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Player Stats Editor Modal */}
                {editingPlayer && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold flex items-center gap-2">
                                    <BarChart3 size={20} />
                                    {isAddingPlayer ? 'Add New Player' : 'Edit Player Stats'}
                                </h2>
                                <button
                                    onClick={cancelEditing}
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {/* Basic Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Player Name</label>
                                        <input
                                            type="text"
                                            value={editingPlayer.name}
                                            onChange={(e) => updateEditingPlayer('name', e.target.value)}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Character</label>
                                        <select
                                            value={editingPlayer.character}
                                            onChange={(e) => updateEditingPlayer('character', e.target.value)}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                                        >
                                            {Object.entries(characters).map(([value, label]) => (
                                                <option key={value} value={value}>{label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Division</label>
                                        <input
                                            type="text"
                                            value={editingPlayer.division}
                                            onChange={(e) => updateEditingPlayer('division', e.target.value)}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Rank</label>
                                        <input
                                            type="text"
                                            value={editingPlayer.rank}
                                            onChange={(e) => updateEditingPlayer('rank', e.target.value)}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Prowess</label>
                                    <input
                                        type="number"
                                        value={editingPlayer.prowess}
                                        onChange={(e) => updateEditingPlayer('prowess', parseInt(e.target.value) || 0)}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                                    />
                                </div>

                                {/* IFF8 Stats */}
                                <div className="pt-4 border-t border-gray-700">
                                    <h3 className="text-lg font-medium mb-4 text-red-400">IFF8 Statistics</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">IFF8 Ranking</label>
                                            <input
                                                type="text"
                                                value={editingPlayer.iff8Ranking}
                                                onChange={(e) => updateEditingPlayer('iff8Ranking', e.target.value)}
                                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-1">IFF8 Record</label>
                                            <input
                                                type="text"
                                                value={editingPlayer.iff8Record}
                                                onChange={(e) => updateEditingPlayer('iff8Record', e.target.value)}
                                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-400 mb-1">IFF8 Record Details</label>
                                        <input
                                            type="text"
                                            value={editingPlayer.iff8RecordDetails}
                                            onChange={(e) => updateEditingPlayer('iff8RecordDetails', e.target.value)}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-400 mb-1">IFF History</label>
                                        <input
                                            type="text"
                                            value={editingPlayer.iffHistory}
                                            onChange={(e) => updateEditingPlayer('iffHistory', e.target.value)}
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                                        />
                                    </div>
                                </div>

                                {/* Match Stats */}
                                <div className="pt-4 border-t border-gray-700">
                                    <h3 className="text-lg font-medium mb-4 text-blue-400">Match Statistics</h3>
                                    
                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Ranked Matches */}
                                        <div className="bg-gray-800 rounded-lg p-4">
                                            <h4 className="text-sm font-medium text-gray-300 mb-3">Ranked Matches</h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <label className="text-sm text-gray-400 w-12">Wins</label>
                                                    <input
                                                        type="number"
                                                        value={editingPlayer.rankedMatches.wins}
                                                        onChange={(e) => updateEditingPlayer('rankedMatches.wins', parseInt(e.target.value) || 0)}
                                                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:border-green-500"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <label className="text-sm text-gray-400 w-12">Losses</label>
                                                    <input
                                                        type="number"
                                                        value={editingPlayer.rankedMatches.loses}
                                                        onChange={(e) => updateEditingPlayer('rankedMatches.loses', parseInt(e.target.value) || 0)}
                                                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:border-red-500"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <label className="text-sm text-gray-400 w-12">W/L %</label>
                                                    <input
                                                        type="text"
                                                        value={editingPlayer.rankedMatches.wlRate}
                                                        onChange={(e) => updateEditingPlayer('rankedMatches.wlRate', e.target.value)}
                                                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Player Matches */}
                                        <div className="bg-gray-800 rounded-lg p-4">
                                            <h4 className="text-sm font-medium text-gray-300 mb-3">Player Matches</h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <label className="text-sm text-gray-400 w-12">Wins</label>
                                                    <input
                                                        type="number"
                                                        value={editingPlayer.playerMatches.wins}
                                                        onChange={(e) => updateEditingPlayer('playerMatches.wins', parseInt(e.target.value) || 0)}
                                                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:border-green-500"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <label className="text-sm text-gray-400 w-12">Losses</label>
                                                    <input
                                                        type="number"
                                                        value={editingPlayer.playerMatches.loses}
                                                        onChange={(e) => updateEditingPlayer('playerMatches.loses', parseInt(e.target.value) || 0)}
                                                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:border-red-500"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <label className="text-sm text-gray-400 w-12">W/L %</label>
                                                    <input
                                                        type="text"
                                                        value={editingPlayer.playerMatches.wlRate}
                                                        onChange={(e) => updateEditingPlayer('playerMatches.wlRate', e.target.value)}
                                                        className="flex-1 bg-gray-700 border border-gray-600 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-4 flex gap-4">
                                    <button
                                        onClick={cancelEditing}
                                        className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={savePlayer}
                                        className="flex-1 flex items-center justify-center gap-2 p-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                                    >
                                        <Save size={18} />
                                        {isAddingPlayer ? 'Add Player' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

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
                        <button
                            onClick={swapPlayers}
                            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                        >
                            <ArrowLeftRight size={18} />
                            Swap Players
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