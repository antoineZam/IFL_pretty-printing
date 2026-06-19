import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
    ChevronLeft, Plus, Minus, Trash2, Save, Send, Eye, Image, PlayCircle, Tv,
    ArrowUp, ArrowDown, Star, RotateCcw, Calendar
} from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import type {
    IFF9Match, IFF9Week, IFF9MatchData, IFF9Lineup, IFF9DisplayMode, IFF9MatchType
} from '../../types/iff9';
import { defaultIFF9Match } from '../../types/iff9';

const emptyWeek: IFF9Week = { name: 'IFF9 Qualifiers', week_number: 1, event_date: null, status: 'setup' };

// Minimal shape of an iff_players row used for autocompletion.
interface IFFPlayer {
    id: number;
    name: string;
    character_name?: string | null;
    iff_history?: string | null;
    iff8_ranking?: string | null;
}

function buildMatchData(week: IFF9Week, match: IFF9Match): IFF9MatchData {
    return {
        week_name: week.name,
        week_number: week.week_number,
        event_date: week.event_date,
        match_number: match.match_number,
        match_type: match.match_type,
        round_name: match.round_name,
        player_1_name: match.player_1_name,
        player_1_info: match.player_1_info,
        player_1_character: match.player_1_character,
        player_1_score: match.player_1_score,
        player_2_name: match.player_2_name,
        player_2_info: match.player_2_info,
        player_2_character: match.player_2_character,
        player_2_score: match.player_2_score,
        win_score: match.win_score,
    };
}

const IFF9MatchControlPage = () => {
    const [searchParams] = useSearchParams();
    const key = searchParams.get('key') || localStorage.getItem('connectionKey');

    const [weeks, setWeeks] = useState<IFF9Week[]>([]);
    const [players, setPlayers] = useState<IFFPlayer[]>([]);
    const [week, setWeek] = useState<IFF9Week>(emptyWeek);
    const [matches, setMatches] = useState<IFF9Match[]>([]);
    const [deletedIds, setDeletedIds] = useState<number[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [displayMode, setDisplayMode] = useState<IFF9DisplayMode>('idle');
    const [isLoading, setIsLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [pushed, setPushed] = useState(false);
    const skipLiveRef = useRef(true);

    useEffect(() => {
        const newSocket = io({ auth: { token: key } });
        setSocket(newSocket);
        return () => { newSocket.disconnect(); };
    }, [key]);

    useEffect(() => {
        loadWeeks();
        loadPlayers();
    }, []);

    const loadPlayers = async () => {
        try {
            const res = await fetch('/api/iff/players');
            if (res.ok) {
                const data = await res.json();
                setPlayers(data.players || []);
            }
        } catch (err) {
            console.error('Error loading IFF players:', err);
        }
    };

    const loadWeeks = async () => {
        try {
            setIsLoading(true);
            const res = await fetch('/api/iff/iff-9/weeks');
            if (res.ok) {
                const data = await res.json();
                setWeeks(data.weeks || []);
            }
        } catch (err) {
            console.error('Error loading IFF9 weeks:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const loadWeek = async (id: number) => {
        try {
            const res = await fetch(`/api/iff/iff-9/week/${id}`);
            if (!res.ok) return;
            const data = await res.json();
            skipLiveRef.current = true;
            setWeek({
                id: data.week.id,
                name: data.week.name,
                week_number: data.week.week_number,
                event_date: data.week.event_date ? String(data.week.event_date).slice(0, 10) : null,
                status: data.week.status,
            });
            setMatches((data.week.matches || []).map((m: IFF9Match) => ({
                ...defaultIFF9Match, ...m,
                is_complete: !!m.is_complete, is_active: !!m.is_active,
            })));
            setDeletedIds([]);
        } catch (err) {
            console.error('Error loading IFF9 week:', err);
        }
    };

    const activeMatch = matches.find(m => m.is_active) || matches[0] || null;

    // Live sync: push lineup + active match to overlay/cards whenever data changes.
    const pushLive = useCallback(() => {
        if (!socket) return;
        const lineup: IFF9Lineup = {
            week_name: week.name,
            week_number: week.week_number,
            event_date: week.event_date,
            matches,
        };
        socket.emit('iff9-lineup-update', lineup);
        const am = matches.find(m => m.is_active) || matches[0];
        if (am) socket.emit('iff9-match-update', buildMatchData(week, am));
    }, [socket, week, matches]);

    useEffect(() => {
        if (skipLiveRef.current) {
            skipLiveRef.current = false;
            return;
        }
        pushLive();
    }, [week, matches, pushLive]);

    const updateDisplayMode = (mode: IFF9DisplayMode) => {
        setDisplayMode(mode);
        if (socket) {
            socket.emit('iff9-display-mode', { mode, visible: mode !== 'idle' });
            if (mode !== 'idle') pushLive();
        }
    };

    // ---- Match list mutations ----
    const addMatch = () => {
        setMatches(prev => {
            const nextNumber = prev.reduce((max, m) => Math.max(max, m.match_number), 0) + 1;
            const nextOrder = prev.reduce((max, m) => Math.max(max, m.match_order), 0) + 1;
            return [...prev, {
                ...defaultIFF9Match,
                match_number: nextNumber,
                match_order: nextOrder,
                is_active: prev.length === 0,
                player_1_name: 'Player 1',
                player_2_name: 'Player 2',
            }];
        });
    };

    const updateMatch = (index: number, updates: Partial<IFF9Match>) => {
        setMatches(prev => prev.map((m, i) => i === index ? { ...m, ...updates } : m));
    };

    const deleteMatch = (index: number) => {
        setMatches(prev => {
            const target = prev[index];
            if (target?.id) setDeletedIds(d => [...d, target.id as number]);
            return prev.filter((_, i) => i !== index);
        });
    };

    const setActiveMatch = (index: number) => {
        setMatches(prev => prev.map((m, i) => ({ ...m, is_active: i === index })));
    };

    const adjustScore = (index: number, slot: 1 | 2, delta: number) => {
        setMatches(prev => prev.map((m, i) => {
            if (i !== index) return m;
            const field = slot === 1 ? 'player_1_score' : 'player_2_score';
            return { ...m, [field]: Math.max(0, (m as any)[field] + delta) };
        }));
    };

    const moveMatch = (index: number, dir: -1 | 1) => {
        setMatches(prev => {
            const target = index + dir;
            if (target < 0 || target >= prev.length) return prev;
            const copy = [...prev];
            [copy[index], copy[target]] = [copy[target], copy[index]];
            return copy.map((m, i) => ({ ...m, match_order: i + 1 }));
        });
    };

    const pushToOverlay = () => {
        pushLive();
        setPushed(true);
        setTimeout(() => setPushed(false), 1500);
    };

    // ---- Persistence ----
    const saveAll = async () => {
        try {
            // 1. Save week (create or update) to obtain an id.
            const weekRes = await fetch(
                week.id ? `/api/iff/iff-9/week/${week.id}` : '/api/iff/iff-9/week',
                {
                    method: week.id ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(week),
                }
            );
            const weekData = await weekRes.json();
            const weekId = weekData.week?.id || week.id;
            if (!weekId) throw new Error('No week id returned');

            // 2. Delete removed matches.
            for (const id of deletedIds) {
                await fetch(`/api/iff/iff-9/match/${id}`, { method: 'DELETE' });
            }

            // 3. Upsert matches.
            for (const m of matches) {
                const body = JSON.stringify({ ...m, week_id: weekId });
                if (m.id) {
                    await fetch(`/api/iff/iff-9/match/${m.id}`, {
                        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body,
                    });
                } else {
                    await fetch(`/api/iff/iff-9/week/${weekId}/match`, {
                        method: 'POST', headers: { 'Content-Type': 'application/json' }, body,
                    });
                }
            }

            setDeletedIds([]);
            await loadWeeks();
            await loadWeek(weekId);
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            console.error('Error saving IFF9 week:', err);
        }
    };

    const newWeek = () => {
        skipLiveRef.current = true;
        setWeek({ ...emptyWeek });
        setMatches([]);
        setDeletedIds([]);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <LoadingSpinner size="lg" message="Loading IFF9..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-[#04110c] to-black text-white">
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <Link to="/iff/iff-9" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#34d399] transition-colors mb-2">
                            <ChevronLeft size={18} />
                            <span className="text-sm">Back to IFF9</span>
                        </Link>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#10b981] to-[#34d399] bg-clip-text text-transparent uppercase tracking-widest font-mono">
                            IFF9 Match Control
                        </h1>
                        <p className="text-gray-500 mt-1">Build the week lineup and drive the live overlay / match cards</p>
                    </div>
                    <Link
                        to={`/iff/iff-9/unified-overlay${key ? `?key=${key}` : ''}`}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-800/80 hover:bg-gray-700 border border-gray-700 rounded-xl transition-all hover:border-[#10b981]/50"
                    >
                        <Eye size={18} className="text-[#34d399]" />
                        <span className="font-medium">Open Overlay</span>
                    </Link>
                </div>

                {/* Push button */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={pushToOverlay}
                        className={`flex items-center gap-4 px-10 py-5 rounded-2xl transition-all text-xl font-bold shadow-2xl ${
                            pushed
                                ? 'bg-green-500 text-white scale-105'
                                : 'bg-gradient-to-r from-[#059669] via-[#10b981] to-[#059669] hover:scale-105 text-white shadow-[#10b981]/30'
                        }`}
                    >
                        <Send size={26} className={pushed ? '' : 'animate-pulse'} />
                        {pushed ? 'Pushed!' : 'Push to Overlay'}
                    </button>
                </div>

                {/* Display mode + persistence controls */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-5 mb-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-400 font-medium">Display:</span>
                            <div className="flex bg-gray-800/50 p-1 rounded-xl">
                                <button
                                    onClick={() => updateDisplayMode('idle')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${displayMode === 'idle' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                                >
                                    <Image size={16} /> Idle
                                </button>
                                <button
                                    onClick={() => updateDisplayMode('match')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${displayMode === 'match' ? 'bg-[#10b981] text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                                >
                                    <PlayCircle size={16} /> Match Overlay
                                </button>
                                <button
                                    onClick={() => updateDisplayMode('match-cards')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${displayMode === 'match-cards' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                                >
                                    <Tv size={16} /> Match Cards
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={saveAll}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all font-semibold ${saved ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'}`}
                            >
                                <Save size={18} /> {saved ? 'Saved!' : 'Save to DB'}
                            </button>
                            <button
                                onClick={() => socket?.emit('iff9-refresh-overlay')}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-semibold bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
                            >
                                <RotateCcw size={18} /> Refresh
                            </button>
                        </div>
                    </div>
                </div>

                {/* Week metadata */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-5 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Week / Event</h2>
                        <div className="flex items-center gap-2">
                            <select
                                value={week.id ?? ''}
                                onChange={(e) => e.target.value ? loadWeek(parseInt(e.target.value)) : newWeek()}
                                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm"
                            >
                                <option value="">New week...</option>
                                {weeks.map(w => (
                                    <option key={w.id} value={w.id}>{w.name} {w.week_number ? `(W${w.week_number})` : ''}</option>
                                ))}
                            </select>
                            <button onClick={newWeek} className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-sm">
                                <Plus size={14} /> New
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Event Name</label>
                            <input
                                type="text"
                                value={week.name}
                                onChange={(e) => setWeek(w => ({ ...w, name: e.target.value }))}
                                className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-[#10b981] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Week Number</label>
                            <input
                                type="number"
                                value={week.week_number ?? ''}
                                onChange={(e) => setWeek(w => ({ ...w, week_number: e.target.value ? parseInt(e.target.value) : null }))}
                                className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-[#10b981] focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1"><Calendar size={12} /> Date</label>
                            <input
                                type="date"
                                value={week.event_date ?? ''}
                                onChange={(e) => setWeek(w => ({ ...w, event_date: e.target.value || null }))}
                                className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-[#10b981] focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Lineup editor */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-5 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Match Lineup ({matches.length})</h2>
                        <button onClick={addMatch} className="flex items-center gap-2 px-4 py-2 bg-[#10b981]/20 hover:bg-[#10b981]/40 border border-[#10b981]/40 rounded-lg text-sm font-medium text-[#34d399]">
                            <Plus size={16} /> Add Match
                        </button>
                    </div>

                    {matches.length === 0 ? (
                        <p className="text-center text-gray-600 py-8">No matches yet. Add one to start the lineup.</p>
                    ) : (
                        <div className="space-y-3">
                            {matches.map((m, index) => (
                                <MatchRow
                                    key={m.id ?? `idx-${index}`}
                                    match={m}
                                    index={index}
                                    count={matches.length}
                                    players={players}
                                    onUpdate={(u) => updateMatch(index, u)}
                                    onDelete={() => deleteMatch(index)}
                                    onSetActive={() => setActiveMatch(index)}
                                    onAdjustScore={(slot, delta) => adjustScore(index, slot, delta)}
                                    onMove={(dir) => moveMatch(index, dir)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Active match preview */}
                {activeMatch && (
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-5">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                            Live Active Match
                            <span className="ml-2 px-2 py-0.5 rounded text-xs bg-[#10b981]/30 text-[#34d399]">
                                MATCH_{String(activeMatch.match_number).padStart(2, '0')} / {activeMatch.match_type}
                            </span>
                        </h3>
                        <div className="bg-black/80 rounded-xl p-6 border border-gray-700/50 flex items-center justify-between">
                            <div className="text-left flex-1 min-w-0">
                                <span className="text-2xl font-bold text-white truncate block">{activeMatch.player_1_name}</span>
                                <span className="text-xs text-gray-500 uppercase">{activeMatch.player_1_info}</span>
                            </div>
                            <div className="flex items-center gap-6 px-8">
                                <span className="text-5xl font-black text-white">{activeMatch.player_1_score}</span>
                                <div className="text-center">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{activeMatch.round_name || '—'}</p>
                                    <p className="text-xl text-[#10b981] font-black">VS</p>
                                    <p className="text-xs text-gray-600 mt-1">FT{activeMatch.win_score}</p>
                                </div>
                                <span className="text-5xl font-black text-white">{activeMatch.player_2_score}</span>
                            </div>
                            <div className="text-right flex-1 min-w-0">
                                <span className="text-2xl font-bold text-white truncate block">{activeMatch.player_2_name}</span>
                                <span className="text-xs text-gray-500 uppercase">{activeMatch.player_2_info}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

import { Autocomplete } from '../../components/ui/Autocomplete';

// ---- Player name input with DB autocompletion ----
interface PlayerAutocompleteProps {
    value: string;
    players: IFFPlayer[];
    placeholder: string;
    onChangeText: (text: string) => void;
    onSelectPlayer: (player: IFFPlayer) => void;
}

const PlayerAutocomplete = ({ value, players, placeholder, onChangeText, onSelectPlayer }: PlayerAutocompleteProps) => {
    const query = value.trim().toLowerCase();
    const matches = query
        ? players.filter(p => p.name.toLowerCase().includes(query)).slice(0, 8)
        : players.slice(0, 8);

    return (
        <Autocomplete
            value={value}
            items={matches}
            placeholder={placeholder}
            inputClassName="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white font-medium focus:border-[#10b981] focus:outline-none"
            onChangeText={onChangeText}
            onSelect={onSelectPlayer}
            keyExtractor={(p) => p.id}
            renderItem={(p, isHighlighted) => (
                <div className={`w-full text-left px-3 py-2 flex items-center justify-between gap-2 transition-colors ${isHighlighted ? 'bg-[#10b981]/20' : 'hover:bg-gray-800'}`}>
                    <span className="text-sm text-white font-medium truncate">{p.name}</span>
                    {p.character_name && <span className="text-[11px] text-gray-400 uppercase shrink-0">{p.character_name}</span>}
                </div>
            )}
        />
    );
};

import { TEKKEN_8_CHARACTERS } from '../../utils/characters';

interface CharacterAutocompleteProps {
    value: string;
    placeholder?: string;
    onChangeText: (text: string) => void;
}

const CharacterAutocomplete = ({ value, placeholder, onChangeText }: CharacterAutocompleteProps) => {
    const matches = useMemo(() => {
        if (!value) return TEKKEN_8_CHARACTERS;
        const q = value.toLowerCase();
        return TEKKEN_8_CHARACTERS.filter(c => c.toLowerCase().includes(q));
    }, [value]);

    return (
        <Autocomplete
            value={value}
            items={matches}
            placeholder={placeholder}
            containerClassName="relative flex-1"
            inputClassName="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 text-sm focus:border-[#10b981] focus:outline-none"
            onChangeText={onChangeText}
            onSelect={(char) => onChangeText(char)}
            keyExtractor={(char) => char}
            renderItem={(char, isHighlighted) => (
                <div className={`w-full text-left px-3 py-2 text-sm transition-colors ${isHighlighted ? 'bg-[#10b981]/20 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                    {char}
                </div>
            )}
        />
    );
};

// ---- Single editable match row ----
interface MatchRowProps {
    match: IFF9Match;
    index: number;
    count: number;
    players: IFFPlayer[];
    onUpdate: (updates: Partial<IFF9Match>) => void;
    onDelete: () => void;
    onSetActive: () => void;
    onAdjustScore: (slot: 1 | 2, delta: number) => void;
    onMove: (dir: -1 | 1) => void;
}

const MatchRow = ({ match, index, count, players, onUpdate, onDelete, onSetActive, onAdjustScore, onMove }: MatchRowProps) => {
    // Auto-fill name + character + accolades when a DB player is chosen.
    const fillFromPlayer = (slot: 1 | 2, p: IFFPlayer) => {
        const accolades = p.iff_history || p.iff8_ranking || '';
        if (slot === 1) {
            onUpdate({ player_1_name: p.name, player_1_character: p.character_name || '', player_1_info: accolades });
        } else {
            onUpdate({ player_2_name: p.name, player_2_character: p.character_name || '', player_2_info: accolades });
        }
    };
    return (
        <div className={`rounded-xl border p-4 transition-all ${match.is_active ? 'border-[#10b981]/60 bg-[#10b981]/5' : 'border-gray-700/60 bg-gray-800/30'}`}>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onSetActive}
                        title="Set as active / featured"
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${match.is_active ? 'bg-[#10b981] text-black' : 'bg-gray-800 text-gray-500 border border-gray-700 hover:border-[#10b981]/50'}`}
                    >
                        <Star size={16} fill={match.is_active ? 'currentColor' : 'none'} />
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 uppercase">Match</span>
                        <input
                            type="number"
                            value={match.match_number}
                            onChange={(e) => onUpdate({ match_number: parseInt(e.target.value) || 1 })}
                            className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded-lg text-center text-white"
                        />
                    </div>
                    {/* Masters / Challengers / Final Boss / Qualifier toggle */}
                    <div className="flex bg-gray-800/60 p-1 rounded-lg">
                        {(['masters', 'challengers', 'finalboss', 'qualifier'] as IFF9MatchType[]).map(t => (
                            <button
                                key={t}
                                onClick={() => onUpdate({ match_type: t })}
                                className={`px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wider transition-all ${match.match_type === t ? 'bg-[#10b981] text-black' : 'text-gray-400 hover:text-white'}`}
                            >
                                {t === 'finalboss' ? 'boss' : t}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <button onClick={() => onMove(-1)} disabled={index === 0} className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-30"><ArrowUp size={14} /></button>
                    <button onClick={() => onMove(1)} disabled={index === count - 1} className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-30"><ArrowDown size={14} /></button>
                    <button onClick={onDelete} className="p-1.5 rounded-lg bg-red-900/40 hover:bg-red-800/60 text-red-300"><Trash2 size={14} /></button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Player 1 */}
                <div className="space-y-2">
                    <PlayerAutocomplete
                        value={match.player_1_name}
                        players={players}
                        placeholder="Player 1 name"
                        onChangeText={(text) => onUpdate({ player_1_name: text })}
                        onSelectPlayer={(p) => fillFromPlayer(1, p)}
                    />
                    <input
                        type="text" value={match.player_1_info}
                        onChange={(e) => onUpdate({ player_1_info: e.target.value })}
                        placeholder="Accolades (e.g. 2X IFF CHAMPION / 3X FINALIST)"
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 text-sm focus:border-[#10b981] focus:outline-none"
                    />
                    <div className="flex items-center gap-2">
                        <CharacterAutocomplete
                            value={match.player_1_character}
                            onChangeText={(text) => onUpdate({ player_1_character: text })}
                            placeholder="Character"
                        />
                        <div className="flex items-center gap-1">
                            <button onClick={() => onAdjustScore(1, -1)} className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center"><Minus size={16} /></button>
                            <span className="w-10 text-center text-2xl font-black text-white">{match.player_1_score}</span>
                            <button onClick={() => onAdjustScore(1, 1)} className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center"><Plus size={16} /></button>
                        </div>
                    </div>
                </div>

                {/* Player 2 */}
                <div className="space-y-2">
                    <PlayerAutocomplete
                        value={match.player_2_name}
                        players={players}
                        placeholder="Player 2 name"
                        onChangeText={(text) => onUpdate({ player_2_name: text })}
                        onSelectPlayer={(p) => fillFromPlayer(2, p)}
                    />
                    <input
                        type="text" value={match.player_2_info}
                        onChange={(e) => onUpdate({ player_2_info: e.target.value })}
                        placeholder="Accolades (e.g. 2X IFF CHAMPION / 7X FINALIST)"
                        className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 text-sm focus:border-[#10b981] focus:outline-none"
                    />
                    <div className="flex items-center gap-2">
                        <CharacterAutocomplete
                            value={match.player_2_character}
                            onChangeText={(text) => onUpdate({ player_2_character: text })}
                            placeholder="Character"
                        />
                        <div className="flex items-center gap-1">
                            <button onClick={() => onAdjustScore(2, -1)} className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center"><Minus size={16} /></button>
                            <span className="w-10 text-center text-2xl font-black text-white">{match.player_2_score}</span>
                            <button onClick={() => onAdjustScore(2, 1)} className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center"><Plus size={16} /></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Round / win score */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <input
                    type="text" value={match.round_name}
                    onChange={(e) => onUpdate({ round_name: e.target.value })}
                    placeholder="Round / stage label (e.g. MISTER)"
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm focus:border-[#10b981] focus:outline-none"
                />
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">First to</span>
                    <input
                        type="number" value={match.win_score}
                        onChange={(e) => onUpdate({ win_score: parseInt(e.target.value) || 1 })}
                        className="w-20 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-center focus:border-[#10b981] focus:outline-none"
                    />
                    <label className="flex items-center gap-2 ml-auto text-sm text-gray-400">
                        <input type="checkbox" checked={match.is_complete} onChange={(e) => onUpdate({ is_complete: e.target.checked })} />
                        Complete
                    </label>
                </div>
            </div>
        </div>
    );
};

export default IFF9MatchControlPage;
