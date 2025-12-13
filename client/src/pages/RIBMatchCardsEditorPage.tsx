import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { 
    Save, 
    Plus, 
    Trash2, 
    ArrowLeft,
    Trophy,
    Swords
} from 'lucide-react';
import { countries } from '../utils/countries';

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
    'reina': 'Reina',
    'steve': 'Steve',
    'zafina': 'Zafina',
    'schizophrenic': 'Schizophrenic'
};

interface Match {
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
}

interface MatchCardData {
    eventTitle: string;
    eventSubtitle: string;
    partNumber: string;
    winScore: number;
    matches: Match[];
    sponsors: {
        presenter: string;
        association: string;
    };
}

export default function RIBMatchCardsEditorPage() {
    const navigate = useNavigate();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState(false);
    const [saved, setSaved] = useState(true);
    
    const [matchCards, setMatchCards] = useState<MatchCardData>({
        eventTitle: "THE RUNBACK",
        eventSubtitle: "THE FINAL CHAPTER",
        partNumber: "01",
        winScore: 3,
        matches: [],
        sponsors: { presenter: "", association: "" }
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

        newSocket.on('rib-match-cards-update', (data: MatchCardData) => {
            setMatchCards(data);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [navigate]);

    const handleChange = (path: string, value: string) => {
        setSaved(false);
        setMatchCards(prev => {
            const newData = { ...prev };
            const keys = path.split('.');
            let current: any = newData;
            
            for (let i = 0; i < keys.length - 1; i++) {
                if (keys[i].includes('[')) {
                    const [key, indexStr] = keys[i].split('[');
                    const index = parseInt(indexStr.replace(']', ''));
                    current = current[key][index];
                } else {
                    current = current[keys[i]];
                }
            }
            
            current[keys[keys.length - 1]] = value;
            return newData;
        });
    };

    const handleMatchChange = (index: number, field: string, value: string | boolean) => {
        setSaved(false);
        setMatchCards(prev => {
            const newMatches = [...prev.matches];
            // Handle isMainEvent specially - ensure only one main event at a time
            if (field === 'isMainEvent') {
                const isMain = Boolean(value);
                // If setting this as main event, unset all others
                if (isMain) {
                    newMatches.forEach((m, i) => {
                        newMatches[i] = { ...m, isMainEvent: i === index };
                    });
                } else {
                    newMatches[index] = { ...newMatches[index], isMainEvent: false };
                }
            } else {
                newMatches[index] = { ...newMatches[index], [field]: value };
            }
            return { ...prev, matches: newMatches };
        });
    };

    const addMatch = () => {
        setSaved(false);
        setMatchCards(prev => ({
            ...prev,
            matches: [
                ...prev.matches,
                {
                    id: prev.matches.length + 1,
                    matchTitle: `Match ${prev.matches.length + 1}`,
                    p1Name: "",
                    p1Title: "CHALLENGER",
                    p1Character: "",
                    p1Flag: "",
                    p1Score: 0,
                    p2Name: "",
                    p2Title: "CHALLENGER",
                    p2Character: "",
                    p2Flag: "",
                    p2Score: 0,
                    winner: null,
                    completed: false
                }
            ]
        }));
    };

    const removeMatch = (index: number) => {
        setSaved(false);
        setMatchCards(prev => ({
            ...prev,
            matches: prev.matches.filter((_, i) => i !== index).map((m, i) => ({ ...m, id: i + 1 }))
        }));
    };

    const saveChanges = () => {
        socket?.emit('rib-match-cards-update', matchCards);
        setSaved(true);
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/rib/match-control')}
                        className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-red-500">Match Cards Editor</h1>
                        <p className="text-gray-400">Edit fight cards and event details</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${connected ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                        <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'}`} />
                        {connected ? 'Connected' : 'Disconnected'}
                    </div>
                    <button
                        onClick={saveChanges}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                            saved 
                                ? 'bg-gray-800 text-gray-400' 
                                : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                    >
                        <Save size={18} />
                        {saved ? 'Saved' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Event Details */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Trophy size={20} />
                        Event Details
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Event Title</label>
                            <input
                                type="text"
                                value={matchCards.eventTitle}
                                onChange={(e) => handleChange('eventTitle', e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Event Subtitle</label>
                            <input
                                type="text"
                                value={matchCards.eventSubtitle}
                                onChange={(e) => handleChange('eventSubtitle', e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Part Number</label>
                            <input
                                type="text"
                                value={matchCards.partNumber}
                                onChange={(e) => handleChange('partNumber', e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Win Score (First To)</label>
                            <input
                                type="number"
                                min="1"
                                value={matchCards.winScore || 3}
                                onChange={(e) => {
                                    setSaved(false);
                                    setMatchCards(prev => ({ ...prev, winScore: parseInt(e.target.value) || 3 }));
                                }}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                            />
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <h3 className="text-lg font-medium mb-4">Sponsors</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Proudly Presented By</label>
                                <input
                                    type="text"
                                    value={matchCards.sponsors.presenter}
                                    onChange={(e) => handleChange('sponsors.presenter', e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">In Association With</label>
                                <input
                                    type="text"
                                    value={matchCards.sponsors.association}
                                    onChange={(e) => handleChange('sponsors.association', e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Match List */}
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Swords size={20} />
                            Match List
                        </h2>
                        <button
                            onClick={addMatch}
                            className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                            <Plus size={18} />
                            Add Match
                        </button>
                    </div>
                    
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                        {/* Matches */}
                        {matchCards.matches.map((match, index) => (
                            <div key={match.id} className={`rounded-lg p-4 ${match.isMainEvent ? 'bg-gradient-to-r from-amber-900/40 to-amber-800/20 border border-amber-500/50' : 'bg-gray-800'} ${match.completed ? 'border border-green-500/30' : ''}`}>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <h4 className="font-medium">{match.isMainEvent ? 'Main Event' : `Match ${index + 1}`}</h4>
                                        {match.completed && (
                                            <span className="text-xs px-2 py-1 bg-green-600/30 text-green-400 rounded">
                                                {match.p1Score} - {match.p2Score} • {match.winner === 'p1' ? match.p1Name : match.p2Name} wins
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={match.isMainEvent || false}
                                                onChange={(e) => handleMatchChange(index, 'isMainEvent', e.target.checked)}
                                                className="w-4 h-4 accent-amber-500"
                                            />
                                            <span className="text-xs text-amber-400">Main Event</span>
                                        </label>
                                        <button
                                            onClick={() => removeMatch(index)}
                                            className="p-1 text-red-400 hover:text-red-300 transition-colors"
                                        >
                                                <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Match Title */}
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={match.matchTitle || ''}
                                        onChange={(e) => handleMatchChange(index, 'matchTitle', e.target.value)}
                                        placeholder="Match Title (e.g., 'The Runback')"
                                        className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:border-amber-500"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={match.p1Name}
                                            onChange={(e) => handleMatchChange(index, 'p1Name', e.target.value)}
                                            placeholder="P1 Name"
                                            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:border-red-500"
                                        />
                                        <select
                                            value={match.p1Flag || ''}
                                            onChange={(e) => handleMatchChange(index, 'p1Flag', e.target.value)}
                                            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:border-red-500"
                                        >
                                            {Object.entries(countries).map(([code, name]) => (
                                                <option key={code} value={code}>{name}</option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            value={match.p1Title}
                                            onChange={(e) => handleMatchChange(index, 'p1Title', e.target.value)}
                                            placeholder="P1 Title"
                                            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:border-red-500"
                                        />
                                        <select
                                            value={match.p1Character}
                                            onChange={(e) => handleMatchChange(index, 'p1Character', e.target.value)}
                                            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:border-red-500"
                                        >
                                            {Object.entries(characters).map(([value, label]) => (
                                                <option key={value} value={value}>{label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={match.p2Name}
                                            onChange={(e) => handleMatchChange(index, 'p2Name', e.target.value)}
                                            placeholder="P2 Name"
                                            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
                                        />
                                        <select
                                            value={match.p2Flag || ''}
                                            onChange={(e) => handleMatchChange(index, 'p2Flag', e.target.value)}
                                            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
                                        >
                                            {Object.entries(countries).map(([code, name]) => (
                                                <option key={code} value={code}>{name}</option>
                                            ))}
                                        </select>
                                        <input
                                            type="text"
                                            value={match.p2Title}
                                            onChange={(e) => handleMatchChange(index, 'p2Title', e.target.value)}
                                            placeholder="P2 Title"
                                            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
                                        />
                                        <select
                                            value={match.p2Character}
                                            onChange={(e) => handleMatchChange(index, 'p2Character', e.target.value)}
                                            className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
                                        >
                                            {Object.entries(characters).map(([value, label]) => (
                                                <option key={value} value={value}>{label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {matchCards.matches.length === 0 && (
                            <div className="text-center text-gray-500 py-4">
                                No additional matches. Click "Add Match" to create one.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

