import { useState, useEffect } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { ChevronLeft, Plus, Trash2, Play, Trophy, Check, X, Users, FolderPlus, Layers } from 'lucide-react';
import { io } from 'socket.io-client';

interface Team {
    id: number;
    team_id: number;
    team_name: string;
    seed: number | null;
    group_id: number | null;
    group_name: string | null;
    player_1_name: string;
    player_2_name: string;
    player_1_character: string;
    player_2_character: string;
    wins: number;
    losses: number;
}

interface Match {
    id: number;
    tournament_id: number;
    group_id: number | null;
    group_name: string | null;
    round: string;
    round_order: number;
    match_number: number;
    team_1_id: number | null;
    team_2_id: number | null;
    team_1_name: string | null;
    team_2_name: string | null;
    team_1_score: number;
    team_2_score: number;
    winner_team_id: number | null;
    winner_name: string | null;
    next_match_id: number | null;
    is_complete: boolean;
    bracket_position: string | null;
}

interface Group {
    id: number;
    tournament_id: number;
    name: string;
    group_order: number;
    status: string;
    team_count: number;
    match_count: number;
}

interface Tournament {
    id: number;
    name: string;
    format: string;
    status: string;
    groups: Group[];
    teams: Team[];
    matches: Match[];
}

interface AvailableTeam {
    id: number;
    team_name: string;
    player_1_name: string;
    player_2_name: string;
}

const LoveAndWarBracketPage = () => {
    const { id: tournamentId } = useParams();
    const [searchParams] = useSearchParams();
    const key = searchParams.get('key') || localStorage.getItem('connectionKey');

    const [tournament, setTournament] = useState<Tournament | null>(null);
    const [availableTeams, setAvailableTeams] = useState<AvailableTeam[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
    const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
    const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
    const [isAssignTeamModalOpen, setIsAssignTeamModalOpen] = useState(false);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
    const [scoreInput, setScoreInput] = useState({ team_1_score: 0, team_2_score: 0 });
    const [newGroupName, setNewGroupName] = useState('');

    useEffect(() => {
        loadTournament();
        loadAvailableTeams();

        const newSocket = io({ auth: { token: key } });

        newSocket.on('lnw-bracket-update', (data: { tournament_id: string }) => {
            if (data.tournament_id === tournamentId) {
                loadTournament();
            }
        });

        return () => {
            newSocket.disconnect();
        };
    }, [tournamentId, key]);

    const loadTournament = async () => {
        try {
            const response = await fetch(`/api/iff/love-and-war/tournament/${tournamentId}`);
            const data = await response.json();
            setTournament(data.tournament);
            
            // Auto-select first group if none selected
            if (data.tournament?.groups?.length > 0 && !selectedGroupId) {
                setSelectedGroupId(data.tournament.groups[0].id);
            }
        } catch (error) {
            console.error('Error loading tournament:', error);
        }
    };

    const loadAvailableTeams = async () => {
        try {
            const response = await fetch('/api/iff/love-and-war/teams');
            const data = await response.json();
            setAvailableTeams(data.teams || []);
        } catch (error) {
            console.error('Error loading teams:', error);
        }
    };

    const handleAddTeam = async (teamId: number) => {
        try {
            const seed = tournament?.teams.length ? tournament.teams.length + 1 : 1;
            const response = await fetch(`/api/iff/love-and-war/tournament/${tournamentId}/teams`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ team_id: teamId, seed })
            });

            if (response.ok) {
                await loadTournament();
            }
        } catch (error) {
            console.error('Error adding team:', error);
        }
    };

    const handleRemoveTeam = async (teamId: number) => {
        if (!confirm('Remove this team from the tournament?')) return;
        
        try {
            await fetch(`/api/iff/love-and-war/tournament/${tournamentId}/teams/${teamId}`, {
                method: 'DELETE'
            });
            await loadTournament();
        } catch (error) {
            console.error('Error removing team:', error);
        }
    };

    const handleCreateGroup = async () => {
        if (!newGroupName.trim()) {
            alert('Please enter a group name');
            return;
        }

        try {
            const response = await fetch(`/api/iff/love-and-war/tournament/${tournamentId}/groups`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newGroupName.trim() })
            });

            if (response.ok) {
                const data = await response.json();
                await loadTournament();
                setSelectedGroupId(data.group.id);
                setNewGroupName('');
                setIsCreateGroupModalOpen(false);
            }
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    const handleDeleteGroup = async (groupId: number) => {
        if (!confirm('Delete this group? Teams will be unassigned but remain in the tournament.')) return;

        try {
            await fetch(`/api/iff/love-and-war/group/${groupId}`, {
                method: 'DELETE'
            });
            await loadTournament();
            if (selectedGroupId === groupId) {
                setSelectedGroupId(tournament?.groups.find(g => g.id !== groupId)?.id || null);
            }
        } catch (error) {
            console.error('Error deleting group:', error);
        }
    };

    const handleAssignTeamToGroup = async (teamId: number, groupId: number) => {
        try {
            await fetch(`/api/iff/love-and-war/group/${groupId}/teams/${teamId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tournament_id: tournamentId })
            });
            await loadTournament();
        } catch (error) {
            console.error('Error assigning team to group:', error);
        }
    };

    const handleRemoveTeamFromGroup = async (teamId: number) => {
        try {
            await fetch(`/api/iff/love-and-war/group/${selectedGroupId}/teams/${teamId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tournament_id: tournamentId })
            });
            await loadTournament();
        } catch (error) {
            console.error('Error removing team from group:', error);
        }
    };

    // Generate single elimination bracket
    const generateSingleEliminationBracket = (groupId: number, teams: Team[]): Partial<Match>[] => {
        const numTeams = teams.length;
        const numRounds = Math.ceil(Math.log2(numTeams));
        const perfectBracketSize = Math.pow(2, numRounds);
        
        // Round names for winners bracket
        const roundNames: { [key: number]: string } = {};
        if (numRounds >= 1) roundNames[numRounds] = 'Finals';
        if (numRounds >= 2) roundNames[numRounds - 1] = 'Semi Finals';
        if (numRounds >= 3) roundNames[numRounds - 2] = 'Quarter Finals';
        for (let i = 1; i <= numRounds - 3; i++) {
            roundNames[i] = `Round ${i}`;
        }

        const matches: Partial<Match>[] = [];
        let matchCounter = 1;
        
        // First round matches
        const firstRoundMatchCount = perfectBracketSize / 2;
        
        for (let i = 0; i < firstRoundMatchCount; i++) {
            const team1Index = i;
            const team2Index = perfectBracketSize - 1 - i;
            
            const team1 = teams[team1Index] || null;
            const team2 = team2Index < numTeams ? teams[team2Index] : null;
            
            // Handle byes
            if (!team2 && team1) {
                matches.push({
                    tournament_id: tournament!.id,
                    group_id: groupId,
                    round: roundNames[1] || 'Round 1',
                    round_order: 1,
                    match_number: matchCounter++,
                    team_1_id: team1.team_id,
                    team_2_id: null,
                    team_1_score: 0,
                    team_2_score: 0,
                    winner_team_id: team1.team_id,
                    is_complete: true,
                    bracket_position: 'upper'
                });
            } else if (team1 && team2) {
                matches.push({
                    tournament_id: tournament!.id,
                    group_id: groupId,
                    round: roundNames[1] || 'Round 1',
                    round_order: 1,
                    match_number: matchCounter++,
                    team_1_id: team1.team_id,
                    team_2_id: team2.team_id,
                    team_1_score: 0,
                    team_2_score: 0,
                    winner_team_id: null,
                    is_complete: false,
                    bracket_position: 'upper'
                });
            }
        }

        // Generate subsequent rounds (TBD matches)
        for (let round = 2; round <= numRounds; round++) {
            const matchesInRound = Math.pow(2, numRounds - round);
            for (let i = 0; i < matchesInRound; i++) {
                matches.push({
                    tournament_id: tournament!.id,
                    group_id: groupId,
                    round: roundNames[round] || `Round ${round}`,
                    round_order: round,
                    match_number: matchCounter++,
                    team_1_id: null,
                    team_2_id: null,
                    team_1_score: 0,
                    team_2_score: 0,
                    winner_team_id: null,
                    is_complete: false,
                    bracket_position: 'upper'
                });
            }
        }

        return matches;
    };

    // Generate double elimination bracket
    const generateDoubleEliminationBracket = (groupId: number, teams: Team[]): Partial<Match>[] => {
        const numTeams = teams.length;
        const numWinnersRounds = Math.ceil(Math.log2(numTeams));
        const perfectBracketSize = Math.pow(2, numWinnersRounds);
        
        const matches: Partial<Match>[] = [];
        let matchCounter = 1;
        
        // Winners bracket round names
        const winnersRoundNames: { [key: number]: string } = {};
        if (numWinnersRounds >= 1) winnersRoundNames[numWinnersRounds] = 'Winners Finals';
        if (numWinnersRounds >= 2) winnersRoundNames[numWinnersRounds - 1] = 'Winners Semis';
        if (numWinnersRounds >= 3) winnersRoundNames[numWinnersRounds - 2] = 'Winners Quarters';
        for (let i = 1; i <= numWinnersRounds - 3; i++) {
            winnersRoundNames[i] = `Winners R${i}`;
        }

        // =====================
        // WINNERS BRACKET
        // =====================
        
        // First round matches (with seeding)
        const firstRoundMatchCount = perfectBracketSize / 2;
        
        for (let i = 0; i < firstRoundMatchCount; i++) {
            const team1Index = i;
            const team2Index = perfectBracketSize - 1 - i;
            
            const team1 = teams[team1Index] || null;
            const team2 = team2Index < numTeams ? teams[team2Index] : null;
            
            if (!team2 && team1) {
                // Bye - team auto advances
                matches.push({
                    tournament_id: tournament!.id,
                    group_id: groupId,
                    round: winnersRoundNames[1] || 'Winners R1',
                    round_order: 1,
                    match_number: matchCounter++,
                    team_1_id: team1.team_id,
                    team_2_id: null,
                    team_1_score: 0,
                    team_2_score: 0,
                    winner_team_id: team1.team_id,
                    is_complete: true,
                    bracket_position: 'upper'
                });
            } else if (team1 && team2) {
                matches.push({
                    tournament_id: tournament!.id,
                    group_id: groupId,
                    round: winnersRoundNames[1] || 'Winners R1',
                    round_order: 1,
                    match_number: matchCounter++,
                    team_1_id: team1.team_id,
                    team_2_id: team2.team_id,
                    team_1_score: 0,
                    team_2_score: 0,
                    winner_team_id: null,
                    is_complete: false,
                    bracket_position: 'upper'
                });
            }
        }

        // Subsequent winners rounds
        for (let round = 2; round <= numWinnersRounds; round++) {
            const matchesInRound = Math.pow(2, numWinnersRounds - round);
            for (let i = 0; i < matchesInRound; i++) {
                matches.push({
                    tournament_id: tournament!.id,
                    group_id: groupId,
                    round: winnersRoundNames[round] || `Winners R${round}`,
                    round_order: round,
                    match_number: matchCounter++,
                    team_1_id: null,
                    team_2_id: null,
                    team_1_score: 0,
                    team_2_score: 0,
                    winner_team_id: null,
                    is_complete: false,
                    bracket_position: 'upper'
                });
            }
        }

        // =====================
        // LOSERS BRACKET
        // =====================
        // Losers bracket has roughly (2 * winnersRounds - 1) rounds
        // Each winners round feeds losers into the losers bracket
        // Losers bracket alternates between:
        //   - Receiving losers from winners bracket
        //   - Normal elimination within losers bracket
        
        const numLosersRounds = (numWinnersRounds * 2) - 1;
        let losersRoundOrder = numWinnersRounds + 1; // Start after winners bracket round orders
        
        // Calculate how many matches in each losers round
        // Round 1: losers from WR1 (firstRoundMatchCount / 2 after pairing)
        // Structure alternates between "drop-down" rounds and "elimination" rounds
        
        let losersRemaining = Math.floor(firstRoundMatchCount / 2); // Initial matches from WR1 losers paired
        
        for (let losersRound = 1; losersRound <= numLosersRounds; losersRound++) {
            let matchesInRound: number;
            let roundName: string;
            
            if (losersRound === numLosersRounds) {
                // Losers Finals
                matchesInRound = 1;
                roundName = 'Losers Finals';
            } else if (losersRound === numLosersRounds - 1) {
                // Losers Semis
                matchesInRound = 1;
                roundName = 'Losers Semis';
            } else if (losersRound % 2 === 1) {
                // Odd round: losers from winners bracket drop in
                matchesInRound = losersRemaining;
                roundName = `Losers R${losersRound}`;
            } else {
                // Even round: elimination within losers bracket
                matchesInRound = Math.ceil(losersRemaining / 2);
                losersRemaining = matchesInRound;
                roundName = `Losers R${losersRound}`;
            }
            
            for (let i = 0; i < matchesInRound; i++) {
                matches.push({
                    tournament_id: tournament!.id,
                    group_id: groupId,
                    round: roundName,
                    round_order: losersRoundOrder,
                    match_number: matchCounter++,
                    team_1_id: null,
                    team_2_id: null,
                    team_1_score: 0,
                    team_2_score: 0,
                    winner_team_id: null,
                    is_complete: false,
                    bracket_position: 'lower'
                });
            }
            
            losersRoundOrder++;
        }

        // =====================
        // GRAND FINALS
        // =====================
        // Grand Finals: Winners bracket champion vs Losers bracket champion
        matches.push({
            tournament_id: tournament!.id,
            group_id: groupId,
            round: 'Grand Finals',
            round_order: losersRoundOrder,
            match_number: matchCounter++,
            team_1_id: null,
            team_2_id: null,
            team_1_score: 0,
            team_2_score: 0,
            winner_team_id: null,
            is_complete: false,
            bracket_position: 'grand_finals'
        });

        // Grand Finals Reset (in case losers bracket winner wins first GF)
        matches.push({
            tournament_id: tournament!.id,
            group_id: groupId,
            round: 'Grand Finals Reset',
            round_order: losersRoundOrder + 1,
            match_number: matchCounter++,
            team_1_id: null,
            team_2_id: null,
            team_1_score: 0,
            team_2_score: 0,
            winner_team_id: null,
            is_complete: false,
            bracket_position: 'grand_finals'
        });

        return matches;
    };

    const generateBracketForGroup = async (groupId: number) => {
        const groupTeams = tournament?.teams.filter(t => t.group_id === groupId) || [];
        
        if (groupTeams.length < 2) {
            alert('Need at least 2 teams in this group to generate a bracket');
            return;
        }

        const teams = [...groupTeams].sort((a, b) => (a.seed || 999) - (b.seed || 999));
        
        // Generate bracket based on tournament format
        const isDoubleElim = tournament?.format === 'double_elimination';
        const matches = isDoubleElim 
            ? generateDoubleEliminationBracket(groupId, teams)
            : generateSingleEliminationBracket(groupId, teams);

        // Create matches in database
        try {
            for (const match of matches) {
                await fetch(`/api/iff/love-and-war/tournament/${tournamentId}/matches`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(match)
                });
            }

            // Update group status
            await fetch(`/api/iff/love-and-war/group/${groupId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'in_progress' })
            });

            // Update tournament status if needed
            if (tournament?.status === 'setup') {
                await fetch(`/api/iff/love-and-war/tournament/${tournamentId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...tournament, status: 'in_progress' })
                });
            }

            await loadTournament();
        } catch (error) {
            console.error('Error generating bracket:', error);
        }
    };

    const handleOpenScoreModal = (match: Match) => {
        setSelectedMatch(match);
        setScoreInput({
            team_1_score: match.team_1_score,
            team_2_score: match.team_2_score
        });
        setIsScoreModalOpen(true);
    };

    // Find the next match for a winner to advance to (winners bracket)
    const findNextWinnersMatch = (currentMatch: Match, allMatches: Match[]): Match | null => {
        const currentRoundMatches = allMatches.filter(
            m => m.bracket_position === 'upper' && m.round_order === currentMatch.round_order
        ).sort((a, b) => a.match_number - b.match_number);
        
        const nextRoundMatches = allMatches.filter(
            m => m.bracket_position === 'upper' && m.round_order === currentMatch.round_order + 1
        ).sort((a, b) => a.match_number - b.match_number);
        
        if (nextRoundMatches.length === 0) return null;
        
        // Find current match index in its round
        const matchIndex = currentRoundMatches.findIndex(m => m.id === currentMatch.id);
        // Winner goes to match at index floor(matchIndex / 2) in next round
        const nextMatchIndex = Math.floor(matchIndex / 2);
        
        return nextRoundMatches[nextMatchIndex] || null;
    };

    // Find the next match for a loser to drop to (losers bracket)
    const findNextLosersMatch = (currentMatch: Match, allMatches: Match[]): Match | null => {
        if (!isDoubleElim) return null;
        
        // Losers from winners bracket go to losers bracket
        if (currentMatch.bracket_position === 'upper') {
            const currentRoundOrder = currentMatch.round_order;
            const currentRoundMatches = allMatches.filter(
                m => m.bracket_position === 'upper' && m.round_order === currentRoundOrder
            ).sort((a, b) => a.match_number - b.match_number);
            
            // Calculate which losers round to drop to
            // WR1 losers -> LR1, WR2 losers -> LR2 or LR3, etc.
            const losersRoundOrder = currentRoundOrder === 1 
                ? allMatches.filter(m => m.bracket_position === 'lower').sort((a, b) => a.round_order - b.round_order)[0]?.round_order
                : null;
            
            if (!losersRoundOrder) {
                // Just find first available losers match
                const losersMatches = allMatches.filter(
                    m => m.bracket_position === 'lower' && !m.team_1_id
                ).sort((a, b) => a.round_order - b.round_order || a.match_number - b.match_number);
                return losersMatches[0] || null;
            }
            
            const targetLosersMatches = allMatches.filter(
                m => m.bracket_position === 'lower' && m.round_order === losersRoundOrder
            ).sort((a, b) => a.match_number - b.match_number);
            
            const matchIndex = currentRoundMatches.findIndex(m => m.id === currentMatch.id);
            return targetLosersMatches[Math.floor(matchIndex / 2)] || targetLosersMatches[0] || null;
        }
        
        // Losers within losers bracket advance within losers bracket
        if (currentMatch.bracket_position === 'lower') {
            const nextRoundMatches = allMatches.filter(
                m => m.bracket_position === 'lower' && m.round_order === currentMatch.round_order + 1
            ).sort((a, b) => a.match_number - b.match_number);
            
            if (nextRoundMatches.length === 0) return null;
            
            const currentRoundMatches = allMatches.filter(
                m => m.bracket_position === 'lower' && m.round_order === currentMatch.round_order
            ).sort((a, b) => a.match_number - b.match_number);
            
            const matchIndex = currentRoundMatches.findIndex(m => m.id === currentMatch.id);
            const nextMatchIndex = Math.floor(matchIndex / 2);
            
            return nextRoundMatches[nextMatchIndex] || null;
        }
        
        return null;
    };

    // Find grand finals match for winners/losers bracket champions
    const findGrandFinalsMatch = (allMatches: Match[]): Match | null => {
        return allMatches.find(m => m.bracket_position === 'grand_finals' && m.round === 'Grand Finals') || null;
    };

    // Advance winner to next match
    const advanceWinner = async (nextMatch: Match, winnerId: number) => {
        // Determine which slot to put the winner in
        const slot = !nextMatch.team_1_id ? 'team_1' : 'team_2';
        
        await fetch(`/api/iff/love-and-war/match/${nextMatch.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...nextMatch,
                [`${slot}_id`]: winnerId
            })
        });
    };

    const handleSubmitScore = async () => {
        if (!selectedMatch) return;

        const winner = scoreInput.team_1_score > scoreInput.team_2_score 
            ? selectedMatch.team_1_id 
            : scoreInput.team_2_score > scoreInput.team_1_score 
                ? selectedMatch.team_2_id 
                : null;

        const loser = winner === selectedMatch.team_1_id 
            ? selectedMatch.team_2_id 
            : selectedMatch.team_1_id;


        try {
            // Update the current match
            await fetch(`/api/iff/love-and-war/match/${selectedMatch.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...selectedMatch,
                    team_1_score: scoreInput.team_1_score,
                    team_2_score: scoreInput.team_2_score,
                    winner_team_id: winner,
                    is_complete: winner !== null
                })
            });

            // Handle bracket progression if match is complete
            if (winner !== null && tournament) {
                const allMatches = groupMatches;
                
                // Winners bracket progression
                if (selectedMatch.bracket_position === 'upper') {
                    // Check if this is Winners Finals
                    const isWinnersFinals = selectedMatch.round.toLowerCase().includes('winners finals') || 
                        selectedMatch.round.toLowerCase() === 'finals';
                    
                    if (isWinnersFinals && isDoubleElim) {
                        // Winner goes to Grand Finals
                        const grandFinals = findGrandFinalsMatch(allMatches);
                        if (grandFinals && winner) {
                            await advanceWinner(grandFinals, winner);
                        }
                        // Loser goes to Losers Finals
                        if (loser) {
                            const losersFinals = allMatches.find(m => 
                                m.bracket_position === 'lower' && 
                                m.round.toLowerCase().includes('losers finals')
                            );
                            if (losersFinals) {
                                await advanceWinner(losersFinals, loser);
                            }
                        }
                    } else {
                        // Normal winners bracket - winner advances
                        const nextWinnersMatch = findNextWinnersMatch(selectedMatch, allMatches);
                        if (nextWinnersMatch && winner) {
                            await advanceWinner(nextWinnersMatch, winner);
                        }
                        
                        // In double elim, loser drops to losers bracket
                        if (isDoubleElim && loser) {
                            const nextLosersMatch = findNextLosersMatch(selectedMatch, allMatches);
                            if (nextLosersMatch) {
                                await advanceWinner(nextLosersMatch, loser);
                            }
                        }
                    }
                }
                
                // Losers bracket progression
                if (selectedMatch.bracket_position === 'lower') {
                    const isLosersFinals = selectedMatch.round.toLowerCase().includes('losers finals');
                    
                    if (isLosersFinals) {
                        // Losers Finals winner goes to Grand Finals
                        const grandFinals = findGrandFinalsMatch(allMatches);
                        if (grandFinals && winner) {
                            await advanceWinner(grandFinals, winner);
                        }
                    } else {
                        // Normal losers bracket - winner advances within losers
                        const nextLosersMatch = findNextLosersMatch(selectedMatch, allMatches);
                        if (nextLosersMatch && winner) {
                            await advanceWinner(nextLosersMatch, winner);
                        }
                    }
                    // Loser is eliminated - no progression needed
                }
                
                // Grand Finals progression
                if (selectedMatch.bracket_position === 'grand_finals') {
                    const isGrandFinalsReset = selectedMatch.round.toLowerCase().includes('reset');
                    
                    if (!isGrandFinalsReset) {
                        // First Grand Finals - check if losers bracket winner won
                        // If so, trigger reset match
                        const grandFinalsReset = allMatches.find(m => 
                            m.bracket_position === 'grand_finals' && 
                            m.round.toLowerCase().includes('reset')
                        );
                        
                        if (grandFinalsReset && winner) {
                            // Both players go to reset match
                            await fetch(`/api/iff/love-and-war/match/${grandFinalsReset.id}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    ...grandFinalsReset,
                                    team_1_id: selectedMatch.team_1_id,
                                    team_2_id: selectedMatch.team_2_id
                                })
                            });
                        }
                    }
                    // Reset match winner is the tournament champion - no further progression
                }
            }

            setIsScoreModalOpen(false);
            await loadTournament();
        } catch (error) {
            console.error('Error submitting score:', error);
        }
    };

    // Get matches for selected group
    const groupMatches = selectedGroupId 
        ? tournament?.matches.filter(m => m.group_id === selectedGroupId) || []
        : [];

    // Separate matches by bracket position
    const upperBracketMatches = groupMatches.filter(m => m.bracket_position === 'upper');
    const lowerBracketMatches = groupMatches.filter(m => m.bracket_position === 'lower');
    const grandFinalsMatches = groupMatches.filter(m => m.bracket_position === 'grand_finals');
    
    const isDoubleElim = tournament?.format === 'double_elimination';

    // Group matches by round for bracket display
    const groupMatchesByRound = (matches: Match[]) => {
        const byRound: { [key: number]: Match[] } = {};
        matches.forEach(match => {
            if (!byRound[match.round_order]) {
                byRound[match.round_order] = [];
            }
            byRound[match.round_order].push(match);
        });
        return byRound;
    };

    const upperMatchesByRound = groupMatchesByRound(upperBracketMatches);
    const lowerMatchesByRound = groupMatchesByRound(lowerBracketMatches);
    
    const upperRoundOrders = Object.keys(upperMatchesByRound).map(Number).sort((a, b) => a - b);
    const lowerRoundOrders = Object.keys(lowerMatchesByRound).map(Number).sort((a, b) => a - b);

    // Calculate bracket dimensions
    const maxUpperMatchesInRound = upperBracketMatches.filter(m => m.round_order === Math.min(...upperRoundOrders)).length || 0;
    const maxLowerMatchesInRound = lowerBracketMatches.length > 0 
        ? Math.max(...Object.values(lowerMatchesByRound).map(m => m.length))
        : 0;
    const matchHeight = 100;
    const matchWidth = 220;
    const roundGap = 60;
    const connectorWidth = 30;

    const teamsNotInTournament = availableTeams.filter(
        t => !tournament?.teams.find(tt => tt.team_id === t.id)
    );

    const teamsNotInGroup = tournament?.teams.filter(t => !t.group_id) || [];
    const teamsInSelectedGroup = tournament?.teams.filter(t => t.group_id === selectedGroupId) || [];
    const selectedGroup = tournament?.groups.find(g => g.id === selectedGroupId);

    if (!tournament) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                Loading tournament...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <Link to={`/iff/love-and-war/tournaments?key=${key}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors mb-2">
                        <ChevronLeft size={18} />
                        <span className="text-sm">Back to Tournaments</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-red-400">{tournament.name}</h1>
                    <div className="flex items-center gap-3 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            tournament.status === 'setup' ? 'bg-yellow-500/20 text-yellow-400' :
                            tournament.status === 'in_progress' ? 'bg-green-500/20 text-green-400' :
                            'bg-gray-500/20 text-gray-400'
                        }`}>
                            {tournament.status.toUpperCase().replace('_', ' ')}
                        </span>
                        <span className="text-gray-500 text-sm">
                            {tournament.format === 'single_elimination' ? 'Single Elimination' : 'Double Elimination'}
                        </span>
                        <span className="text-gray-500 text-sm">
                            • {tournament.groups.length} Groups • {tournament.teams.length} Teams
                        </span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link
                        to={`/iff/love-and-war/tournament/${tournamentId}/rankings?key=${key}`}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <Trophy size={18} />
                        Rankings
                    </Link>
                    <button
                        onClick={() => setIsAddTeamModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                        <Plus size={18} />
                        Add Teams
                    </button>
                    <button
                        onClick={() => setIsCreateGroupModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                    >
                        <FolderPlus size={18} />
                        Create Group
                    </button>
                </div>
            </div>

            {/* Group Tabs */}
            {tournament.groups.length > 0 && (
                <div className="flex items-center gap-2 mb-6 border-b border-gray-800 pb-3 overflow-x-auto">
                    <Layers size={18} className="text-gray-500 flex-shrink-0" />
                    {tournament.groups.map((group) => (
                        <button
                            key={group.id}
                            onClick={() => setSelectedGroupId(group.id)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors flex-shrink-0 ${
                                selectedGroupId === group.id
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                            }`}
                        >
                            {group.name}
                            <span className="ml-2 text-xs opacity-70">
                                ({group.team_count} teams)
                            </span>
                        </button>
                    ))}
                </div>
            )}

            {/* No Groups Message */}
            {tournament.groups.length === 0 && (
                <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-800 mb-6">
                    <Layers size={48} className="mx-auto mb-4 text-gray-600" />
                    <h3 className="text-lg font-bold text-white mb-2">No Groups Created</h3>
                    <p className="text-gray-400 mb-4">
                        Create groups to organize teams into separate brackets.
                        Each group will have its own elimination bracket.
                    </p>
                    <button
                        onClick={() => setIsCreateGroupModalOpen(true)}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                        <FolderPlus size={18} />
                        Create First Group
                    </button>
                </div>
            )}

            {/* Selected Group Content */}
            {selectedGroup && (
                <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                {selectedGroup.name}
                                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                    selectedGroup.status === 'setup' ? 'bg-yellow-500/20 text-yellow-400' :
                                    selectedGroup.status === 'in_progress' ? 'bg-green-500/20 text-green-400' :
                                    'bg-gray-500/20 text-gray-400'
                                }`}>
                                    {selectedGroup.status.toUpperCase()}
                                </span>
                            </h2>
                            <p className="text-sm text-gray-400">
                                {teamsInSelectedGroup.length} teams • {groupMatches.length} matches
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {selectedGroup.status === 'setup' && (
                                <>
                                    <button
                                        onClick={() => setIsAssignTeamModalOpen(true)}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
                                    >
                                        <Users size={16} />
                                        Assign Teams
                                    </button>
                                    {teamsInSelectedGroup.length >= 2 && (
                                        <button
                                            onClick={() => generateBracketForGroup(selectedGroupId!)}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-sm"
                                        >
                                            <Play size={16} />
                                            Generate Bracket
                                        </button>
                                    )}
                                </>
                            )}
                            <button
                                onClick={() => handleDeleteGroup(selectedGroupId!)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-gray-700 hover:bg-red-600 rounded-lg transition-colors text-sm"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Teams in this group (setup mode) */}
                    {selectedGroup.status === 'setup' && teamsInSelectedGroup.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
                            {teamsInSelectedGroup.map((team, index) => (
                                <div key={team.id} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs bg-gray-600 px-2 py-0.5 rounded">
                                            Seed #{team.seed || index + 1}
                                        </span>
                                        <button
                                            onClick={() => handleRemoveTeamFromGroup(team.team_id)}
                                            className="text-gray-500 hover:text-red-400 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                    <h3 className="font-bold text-white text-sm">{team.team_name}</h3>
                                    <p className="text-xs text-gray-400">
                                        {team.player_1_name} & {team.player_2_name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Bracket Display for this group */}
                    {groupMatches.length > 0 && (
                        <div className="space-y-8">
                            {/* Winners Bracket */}
                            {upperBracketMatches.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        <h3 className="text-lg font-bold text-white">
                                            {isDoubleElim ? 'Winners Bracket' : 'Bracket'}
                                        </h3>
                                    </div>
                                    <div className="overflow-x-auto pb-4 bg-gray-800/30 rounded-lg p-4">
                                        <div 
                                            className="relative"
                                            style={{ 
                                                minWidth: `${upperRoundOrders.length * (matchWidth + roundGap + connectorWidth)}px`,
                                                minHeight: `${Math.max(maxUpperMatchesInRound * matchHeight, 200) + 60}px`
                                            }}
                                        >
                                            {upperRoundOrders.map((roundOrder, roundIndex) => {
                                                const roundMatches = upperMatchesByRound[roundOrder].sort((a, b) => a.match_number - b.match_number);
                                                const roundName = roundMatches[0]?.round || `Round ${roundOrder}`;
                                                
                                                const matchesInRound = roundMatches.length;
                                                const totalHeight = maxUpperMatchesInRound * matchHeight;
                                                const spaceBetween = totalHeight / matchesInRound;
                                                
                                                return (
                                                    <div 
                                                        key={roundOrder}
                                                        className="absolute top-0"
                                                        style={{ 
                                                            left: `${roundIndex * (matchWidth + roundGap + connectorWidth)}px`,
                                                            width: `${matchWidth}px`
                                                        }}
                                                    >
                                                        <div className="text-center mb-4">
                                                            <span className="text-sm font-bold text-green-400 uppercase tracking-wider">
                                                                {roundName}
                                                            </span>
                                                        </div>

                                                        {roundMatches.map((match, matchIndex) => {
                                                            const topOffset = (matchIndex * spaceBetween) + (spaceBetween - matchHeight) / 2;
                                                            
                                                            return (
                                                                <div
                                                                    key={match.id}
                                                                    className="absolute w-full"
                                                                    style={{ top: `${topOffset + 40}px` }}
                                                                >
                                                                    <MatchCard 
                                                                        match={match}
                                                                        onEditScore={() => handleOpenScoreModal(match)}
                                                                        bracketType="upper"
                                                                    />
                                                                    
                                                                    {roundIndex < upperRoundOrders.length - 1 && (
                                                                        <div 
                                                                            className="absolute top-1/2 bg-green-600/50"
                                                                            style={{
                                                                                left: `${matchWidth}px`,
                                                                                width: `${connectorWidth}px`,
                                                                                height: '2px'
                                                                            }}
                                                                        />
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Losers Bracket (Double Elimination only) */}
                            {isDoubleElim && lowerBracketMatches.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <h3 className="text-lg font-bold text-white">Losers Bracket</h3>
                                    </div>
                                    <div className="overflow-x-auto pb-4 bg-red-900/10 rounded-lg p-4 border border-red-900/30">
                                        <div 
                                            className="relative"
                                            style={{ 
                                                minWidth: `${lowerRoundOrders.length * (matchWidth + roundGap + connectorWidth)}px`,
                                                minHeight: `${Math.max(maxLowerMatchesInRound * matchHeight, 150) + 60}px`
                                            }}
                                        >
                                            {lowerRoundOrders.map((roundOrder, roundIndex) => {
                                                const roundMatches = lowerMatchesByRound[roundOrder].sort((a, b) => a.match_number - b.match_number);
                                                const roundName = roundMatches[0]?.round || `Losers R${roundIndex + 1}`;
                                                
                                                const matchesInRound = roundMatches.length;
                                                const totalHeight = maxLowerMatchesInRound * matchHeight;
                                                const spaceBetween = matchesInRound > 0 ? totalHeight / matchesInRound : totalHeight;
                                                
                                                return (
                                                    <div 
                                                        key={roundOrder}
                                                        className="absolute top-0"
                                                        style={{ 
                                                            left: `${roundIndex * (matchWidth + roundGap + connectorWidth)}px`,
                                                            width: `${matchWidth}px`
                                                        }}
                                                    >
                                                        <div className="text-center mb-4">
                                                            <span className="text-sm font-bold text-red-400 uppercase tracking-wider">
                                                                {roundName}
                                                            </span>
                                                        </div>

                                                        {roundMatches.map((match, matchIndex) => {
                                                            const topOffset = (matchIndex * spaceBetween) + (spaceBetween - matchHeight) / 2;
                                                            
                                                            return (
                                                                <div
                                                                    key={match.id}
                                                                    className="absolute w-full"
                                                                    style={{ top: `${topOffset + 40}px` }}
                                                                >
                                                                    <MatchCard 
                                                                        match={match}
                                                                        onEditScore={() => handleOpenScoreModal(match)}
                                                                        bracketType="lower"
                                                                    />
                                                                    
                                                                    {roundIndex < lowerRoundOrders.length - 1 && (
                                                                        <div 
                                                                            className="absolute top-1/2 bg-red-600/50"
                                                                            style={{
                                                                                left: `${matchWidth}px`,
                                                                                width: `${connectorWidth}px`,
                                                                                height: '2px'
                                                                            }}
                                                                        />
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Grand Finals (Double Elimination only) */}
                            {isDoubleElim && grandFinalsMatches.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <Trophy size={18} className="text-yellow-500" />
                                        <h3 className="text-lg font-bold text-white">Grand Finals</h3>
                                    </div>
                                    <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-lg p-4 border border-yellow-600/30">
                                        <div className="flex flex-wrap gap-4 justify-center">
                                            {grandFinalsMatches.sort((a, b) => a.round_order - b.round_order).map((match) => (
                                                <div key={match.id} className="w-[280px]">
                                                    <div className="text-center mb-2">
                                                        <span className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
                                                            {match.round}
                                                        </span>
                                                    </div>
                                                    <MatchCard 
                                                        match={match}
                                                        onEditScore={() => handleOpenScoreModal(match)}
                                                        bracketType="grand_finals"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {groupMatches.length === 0 && teamsInSelectedGroup.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <Users size={32} className="mx-auto mb-2 opacity-50" />
                            <p>No teams assigned to this group yet.</p>
                            <p className="text-sm">Click "Assign Teams" to add teams to this group.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Unassigned Teams Section */}
            {tournament.teams.length > 0 && teamsNotInGroup.length > 0 && (
                <div className="bg-gray-900/30 rounded-xl border border-gray-800 p-4">
                    <h3 className="text-sm font-bold text-gray-400 mb-3 flex items-center gap-2">
                        <Users size={16} />
                        Unassigned Teams ({teamsNotInGroup.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {teamsNotInGroup.map((team) => (
                            <div key={team.id} className="bg-gray-800 rounded-lg px-3 py-2 text-sm flex items-center gap-2">
                                <span className="font-medium text-white">{team.team_name}</span>
                                <button
                                    onClick={() => handleRemoveTeam(team.team_id)}
                                    className="text-gray-500 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Add Team Modal */}
            {isAddTeamModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-800 max-h-[80vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Add Teams to Tournament</h2>
                            <button onClick={() => setIsAddTeamModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {teamsNotInTournament.map((team) => (
                                <button
                                    key={team.id}
                                    onClick={() => handleAddTeam(team.id)}
                                    className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <h3 className="font-semibold text-white">{team.team_name}</h3>
                                    <p className="text-xs text-gray-400">{team.player_1_name} & {team.player_2_name}</p>
                                </button>
                            ))}
                            {teamsNotInTournament.length === 0 && (
                                <p className="text-center text-gray-500 py-4">All available teams are already in the tournament</p>
                            )}
                        </div>

                        <button onClick={() => setIsAddTeamModalOpen(false)} className="w-full mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                            Done
                        </button>
                    </div>
                </div>
            )}

            {/* Create Group Modal */}
            {isCreateGroupModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-800">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Create New Group</h2>
                            <button onClick={() => setIsCreateGroupModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400 mb-2">Group Name</label>
                            <input
                                type="text"
                                value={newGroupName}
                                onChange={(e) => setNewGroupName(e.target.value)}
                                placeholder="e.g., Group A, Pool 1, Winners Bracket"
                                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setIsCreateGroupModalOpen(false)} className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleCreateGroup} className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors font-semibold">
                                Create Group
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Assign Team to Group Modal */}
            {isAssignTeamModalOpen && selectedGroupId && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-800 max-h-[80vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Assign Teams to {selectedGroup?.name}</h2>
                            <button onClick={() => setIsAssignTeamModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {teamsNotInGroup.map((team) => (
                                <button
                                    key={team.id}
                                    onClick={() => handleAssignTeamToGroup(team.team_id, selectedGroupId)}
                                    className="w-full text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <h3 className="font-semibold text-white">{team.team_name}</h3>
                                    <p className="text-xs text-gray-400">{team.player_1_name} & {team.player_2_name}</p>
                                </button>
                            ))}
                            {teamsNotInGroup.length === 0 && (
                                <p className="text-center text-gray-500 py-4">All teams are already assigned to groups</p>
                            )}
                        </div>

                        <button onClick={() => setIsAssignTeamModalOpen(false)} className="w-full mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                            Done
                        </button>
                    </div>
                </div>
            )}

            {/* Score Modal */}
            {isScoreModalOpen && selectedMatch && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-800">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white">Report Score</h2>
                            <button onClick={() => setIsScoreModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <p className="font-semibold text-white">{selectedMatch.team_1_name || 'TBD'}</p>
                                </div>
                                <input
                                    type="number"
                                    min="0"
                                    value={scoreInput.team_1_score}
                                    onChange={(e) => setScoreInput({ ...scoreInput, team_1_score: parseInt(e.target.value) || 0 })}
                                    className="w-20 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-center text-xl font-bold focus:border-red-500 focus:outline-none"
                                    disabled={!selectedMatch.team_1_id}
                                />
                            </div>

                            <div className="text-center text-gray-500">VS</div>

                            <div className="flex items-center gap-4">
                                <div className="flex-1">
                                    <p className="font-semibold text-white">{selectedMatch.team_2_name || 'TBD'}</p>
                                </div>
                                <input
                                    type="number"
                                    min="0"
                                    value={scoreInput.team_2_score}
                                    onChange={(e) => setScoreInput({ ...scoreInput, team_2_score: parseInt(e.target.value) || 0 })}
                                    className="w-20 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-center text-xl font-bold focus:border-red-500 focus:outline-none"
                                    disabled={!selectedMatch.team_2_id}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setIsScoreModalOpen(false)} className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitScore}
                                disabled={!selectedMatch.team_1_id || !selectedMatch.team_2_id}
                                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg transition-colors font-semibold"
                            >
                                Save Score
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Match Card Component
interface MatchCardProps {
    match: Match;
    onEditScore: () => void;
    bracketType?: 'upper' | 'lower' | 'grand_finals';
}

const MatchCard = ({ match, onEditScore, bracketType = 'upper' }: MatchCardProps) => {
    const isComplete = match.is_complete;
    const team1IsWinner = match.winner_team_id === match.team_1_id;
    const team2IsWinner = match.winner_team_id === match.team_2_id;

    // Color schemes based on bracket type
    const colorSchemes = {
        upper: {
            border: isComplete ? 'border-green-500/30' : 'border-gray-700',
            hoverBorder: 'hover:border-green-500/50',
            winnerBg: 'bg-green-900/30',
            winnerText: 'text-green-400',
            accentColor: 'text-green-400'
        },
        lower: {
            border: isComplete ? 'border-red-500/30' : 'border-gray-700',
            hoverBorder: 'hover:border-red-500/50',
            winnerBg: 'bg-red-900/30',
            winnerText: 'text-red-400',
            accentColor: 'text-red-400'
        },
        grand_finals: {
            border: isComplete ? 'border-yellow-500/30' : 'border-yellow-600/30',
            hoverBorder: 'hover:border-yellow-500/50',
            winnerBg: 'bg-yellow-900/30',
            winnerText: 'text-yellow-400',
            accentColor: 'text-yellow-400'
        }
    };

    const colors = colorSchemes[bracketType];

    return (
        <div 
            className={`bg-gray-900 rounded-lg border overflow-hidden cursor-pointer transition-all ${colors.border} ${colors.hoverBorder}`}
            onClick={onEditScore}
        >
            <div className={`flex items-center gap-2 px-3 py-2 border-b border-gray-800 ${team1IsWinner ? colors.winnerBg : ''}`}>
                <div className="flex-1 truncate">
                    <span className={`text-sm ${match.team_1_id ? team1IsWinner ? `font-bold ${colors.winnerText}` : 'text-white' : 'text-gray-500 italic'}`}>
                        {match.team_1_name || 'TBD'}
                    </span>
                </div>
                <span className={`text-lg font-bold min-w-[24px] text-center ${team1IsWinner ? colors.winnerText : 'text-gray-400'}`}>
                    {match.team_1_id ? match.team_1_score : '-'}
                </span>
                {team1IsWinner && <Check size={14} className={colors.accentColor} />}
            </div>

            <div className={`flex items-center gap-2 px-3 py-2 ${team2IsWinner ? colors.winnerBg : ''}`}>
                <div className="flex-1 truncate">
                    <span className={`text-sm ${match.team_2_id ? team2IsWinner ? `font-bold ${colors.winnerText}` : 'text-white' : 'text-gray-500 italic'}`}>
                        {match.team_2_name || 'TBD'}
                    </span>
                </div>
                <span className={`text-lg font-bold min-w-[24px] text-center ${team2IsWinner ? colors.winnerText : 'text-gray-400'}`}>
                    {match.team_2_id ? match.team_2_score : '-'}
                </span>
                {team2IsWinner && <Check size={14} className={colors.accentColor} />}
            </div>
        </div>
    );
};

export default LoveAndWarBracketPage;
