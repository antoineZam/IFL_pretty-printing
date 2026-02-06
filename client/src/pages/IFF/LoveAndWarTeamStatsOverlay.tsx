import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

interface TeamData {
    id: number;
    team_name: string;
    player_1_name: string;
    player_1_character: string;
    player_1_division: string;
    player_1_iff_ranking: string;
    player_1_iff_record: string;
    player_1_iff_history: string;
    player_1_tekken_rank: string;
    player_1_tekken_prowess: number;
    player_1_ranked_wins: number;
    player_1_ranked_losses: number;
    player_1_ranked_wl_rate: string;
    player_2_name: string;
    player_2_character: string;
    player_2_division: string;
    player_2_iff_ranking: string;
    player_2_iff_record: string;
    player_2_iff_history: string;
    player_2_tekken_rank: string;
    player_2_tekken_prowess: number;
    player_2_ranked_wins: number;
    player_2_ranked_losses: number;
    player_2_ranked_wl_rate: string;
}

interface DisplayState {
    teamId: number | null;
    visible: boolean;
}

// Props for embedded use (optional)
interface Props {
    teamId?: number;  // If provided, fetch this team directly (embedded mode)
    embedded?: boolean;  // If true, skip default image fallback
}

// Stat row with dotted line separator (Player 1 - left aligned: label ... value)
const StatRowLeft = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-baseline gap-2">
        <span className="text-[16px] text-white/70 uppercase tracking-wide whitespace-nowrap"
            style={{ fontFamily: "'ED Manteca', sans-serif" }}>
            {label}
        </span>
        <span className="flex-1 border-b border-dotted border-white/30 mx-1" style={{ marginBottom: '4px' }} />
        <span className="text-[18px] text-white font-bold uppercase whitespace-nowrap"
            style={{ fontFamily: "'ED Manteca Black', sans-serif" }}>
            {value}
        </span>
    </div>
);

// Stat row with dotted line separator (Player 2 - right aligned: value ... label)
const StatRowRight = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-baseline gap-2">
        <span className="text-[18px] text-white font-bold uppercase whitespace-nowrap"
            style={{ fontFamily: "'ED Manteca Black', sans-serif" }}>
            {value}
        </span>
        <span className="flex-1 border-b border-dotted border-white/30 mx-1" style={{ marginBottom: '4px' }} />
        <span className="text-[16px] text-white/70 uppercase tracking-wide whitespace-nowrap"
            style={{ fontFamily: "'ED Manteca', sans-serif" }}>
            {label}
        </span>
    </div>
);

const LoveAndWarTeamStatsOverlay = ({ teamId: propTeamId, embedded = false }: Props) => {
    const [searchParams] = useSearchParams();
    const [team, setTeam] = useState<TeamData | null>(null);
    const [isVisible, setIsVisible] = useState(embedded); // If embedded, start visible
    const [animKey, setAnimKey] = useState(0);
    const [currentTeamId, setCurrentTeamId] = useState<number | null>(null);
    const [textureOverlay, setTextureOverlay] = useState<string | null>(null);

    // Available texture overlay filenames (add more as needed)
    const textureOverlays = [
        'texture_01.png',
        'texture_02.png',
        'texture_03.png',
        'texture_04.png',
        'texture_05.png',
        'texture_06.png',
        'texture_07.png',
        'texture_08.png'
    ];

    // Select random texture overlay on mount/reload (different from previous)
    useEffect(() => {
        if (textureOverlays.length === 0) return;
        
        const storageKey = 'lnw_last_texture_overlay';
        const lastTexture = sessionStorage.getItem(storageKey);
        
        // Filter out the last texture if it exists
        const availableTextures = lastTexture 
            ? textureOverlays.filter(t => t !== lastTexture)
            : textureOverlays;
        
        // If only one texture and it's the last one, use it anyway
        const texturesToChooseFrom = availableTextures.length > 0 
            ? availableTextures 
            : textureOverlays;
        
        // Randomly select a texture
        const randomIndex = Math.floor(Math.random() * texturesToChooseFrom.length);
        const selectedTexture = texturesToChooseFrom[randomIndex];
        
        setTextureOverlay(selectedTexture);
        sessionStorage.setItem(storageKey, selectedTexture);
    }, []); // Run only on mount

    // Embedded mode: fetch team directly when propTeamId changes
    useEffect(() => {
        if (propTeamId && embedded) {
            const fetchTeam = async () => {
                try {
                    const response = await fetch(`/api/iff/love-and-war/team/${propTeamId}`);
                    const data = await response.json();
                    if (data.team) {
                        if (propTeamId !== currentTeamId) {
                            setAnimKey(k => k + 1);
                            setCurrentTeamId(propTeamId);
                        }
                        setTeam(data.team);
                        setIsVisible(true);
                    }
                } catch (error) {
                    console.error('[LnW Team Stats] Error fetching team:', error);
                }
            };
            fetchTeam();
        }
    }, [propTeamId, embedded, currentTeamId]);

    // Standalone mode: use socket connection
    useEffect(() => {
        if (embedded) return; // Skip socket in embedded mode

        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';

        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');
        
        const socket: Socket = io({
            auth: { token: connectionKey || '' }
        });

        socket.on('connect', () => {
            console.log('[LnW Team Stats] Socket connected');
        });

        socket.on('love-and-war-display-update', async (state: DisplayState) => {
            console.log('[LnW Team Stats] Display update:', state);

            if (state.teamId && state.visible) {
                try {
                    const response = await fetch(`/api/iff/love-and-war/team/${state.teamId}`);
                    const data = await response.json();
                    if (data.team) {
                        if (state.teamId !== currentTeamId) {
                            setAnimKey(k => k + 1);
                            setCurrentTeamId(state.teamId);
                        }
                        setTeam(data.team);
                        setIsVisible(true);
                    }
                } catch (error) {
                    console.error('[LnW Team Stats] Error fetching team:', error);
                }
            } else {
                setIsVisible(false);
            }
        });

        socket.on('love-and-war-team-update', (updatedTeam: TeamData) => {
            if (team && updatedTeam.id === team.id) {
                setTeam(updatedTeam);
            }
        });

        return () => {
            socket.disconnect();
        };
    }, [searchParams, team, currentTeamId, embedded]);

    // If not visible or no team, show default image (standalone mode only)
    if (!isVisible || !team) {
        if (embedded) {
            return <div className="w-full h-full bg-transparent" />;
        }
        return (
            <div className="w-[1920px] h-[1080px] relative overflow-hidden">
                <img 
                    src="/source/overlay/love_and_war/default.png"
                    alt="Love and War"
                    className="w-full h-full object-cover"
                />
            </div>
        );
    }

    // Map character display names to file system names
    const getCharacterFileSlug = (characterName: string | null | undefined): string => {
        if (!characterName) return 'jin';
        
        const normalized = characterName.toLowerCase().trim();
        
        // Special cases: map display names to file names
        const characterMap: Record<string, string> = {
            'miary zo': 'miary',
            'miary_zo': 'miary',
            'armor king': 'armor_king',
            'devil jin': 'devil_jin',
            'jack-8': 'jack-8',
        };
        
        // Check if there's a special mapping
        if (characterMap[normalized]) {
            return characterMap[normalized];
        }
        
        // Default: convert spaces to underscores
        return normalized.replace(/\s+/g, '_');
    };

    // Normalize names for file paths - replace all spaces/whitespace with underscores
    const teamNameSlug = team.team_name.toLowerCase().trim().replace(/\s+/g, '_');
    const teamNameImagePath = `/source/overlay/love_and_war/team_names/${teamNameSlug}.png`;
    const teamLineworkPath = `/source/overlay/love_and_war/team_linework/${teamNameSlug}.png`;
    
    // Character image paths - convert character name to file slug
    const p1CharacterSlug = getCharacterFileSlug(team.player_1_character);
    const p2CharacterSlug = getCharacterFileSlug(team.player_2_character);
    const p1CharacterPath = `/source/overlay/characters/P1_lnw/${p1CharacterSlug}.png`;
    const p2CharacterPath = `/source/overlay/characters/P2_lnw/${p2CharacterSlug}.png`;
    const p1NamePath = `/source/overlay/love_and_war/player_names/${team.player_1_name.toLowerCase().trim().replace(/\s+/g, '_')}.png`;
    const p2NamePath = `/source/overlay/love_and_war/player_names/${team.player_2_name.toLowerCase().trim().replace(/\s+/g, '_')}.png`;

    return (
        <div 
            key={animKey}
            className={`${embedded ? 'w-full h-full' : 'w-[1920px] h-[1080px]'} relative overflow-hidden uppercase`}
            style={{ 
                backgroundColor: '#911A2C',
                fontFamily: "'ED Manteca', sans-serif"
            }}
        >

            {/* Boiler Plate */}
            <img 
                src={"/source/overlay/love_and_war/boiler_plate.png"}
                alt="Boiler Plate"
                className="absolute inset-0 w-full h-full object-cover z-[5]"
                style={{ animation: 'fadeIn 0.6s ease-out' }}
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                }}
            />

            {/* Background Linework */}
            <img 
                src={teamLineworkPath}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover z-[4] "
                style={{ animation: 'fadeIn 0.6s ease-out' }}
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                }}
            />

            {/* Random Texture Overlay - At the very foreground */}
            {textureOverlay && (
                <img 
                    src={`/source/overlay/love_and_war/texture_overlays/${textureOverlay}`}
                    alt="Texture Overlay"
                    className="absolute inset-0 w-full h-full object-cover z-[100]"
                    style={{ animation: 'fadeIn 0.6s ease-out' }}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                    }}
                />
            )}

            {/* Team Name Image - Centered (z-50 to be on top) */}
            <div 
                className="absolute top-[120px] left-1/2 transform -translate-x-1/2 z-50"
                style={{ animation: 'slideDown 0.8s ease-out' }}
            >
                <img 
                    src={teamNameImagePath}
                    style={{ transform: 'scale(1.3)' }}
                />
            </div>

            {/* Player 1 Name - Below team name, above P1 stats */}
            <div 
                className="absolute left-[390px] top-[430px] z-50"
                style={{ animation: 'slideInLeft 0.8s ease-out 0.1s both' }}
            >
                <img src={p1NamePath} alt={team.player_1_name} />
            </div>

            {/* Player 2 Name - Below team name, above P2 stats */}
            <div 
                className="absolute right-[390px] top-[430px] z-50"
                style={{ animation: 'slideInRight 0.8s ease-out 0.3s both' }}
            >
                <img src={p2NamePath} />
            </div>

            {/* Character Images - Center area */}
            {/* Player 2 Character - Right of center (behind P1) */}
            <img 
                src={p2CharacterPath}
                alt={team.player_2_character || 'Player 2'}
                className="absolute z-10"
                style={{
                    animation: 'slideInRight 0.8s ease-out 0.3s both'
                }}
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                }}
            />

            {/* Player 1 Character - Left of center (in front of P2, behind text) */}
            <img 
                src={p1CharacterPath}
                alt={team.player_1_character || 'Player 1'}
                className="absolute z-20"
                style={{
                    animation: 'slideInLeft 0.8s ease-out 0.3s both'
                }}
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                }}
            />

            {/* Player 1 Stats - Bottom Left (Bottom third starts at ~720px) */}
            <div
                className="absolute left-[60px] bottom-[60px] w-[380px] z-30"
                style={{ animation: 'slideInLeft 0.8s ease-out 0.2s both' }}
            >
                <div className="space-y-2">
                    <StatRowLeft label="DIVISION" value={team.player_1_division || 'MASTER'} />
                    <StatRowLeft label="IFF8 RANKING" value={team.player_1_iff_ranking || '#01'} />
                    <StatRowLeft label="IFF8 RECORD" value={team.player_1_iff_record || '5W, 1L'} />
                    <StatRowLeft label="IFF HISTORY" value={team.player_1_iff_history || '2X IFF CHAMPION'} />
                </div>

                <div className="h-[12px]" />

                <div className="space-y-2">
                    <StatRowLeft label="TEKKEN RANK" value={team.player_1_tekken_rank || 'TEKKEN KING'} />
                    <StatRowLeft label="TEKKEN PROWESS" value={team.player_1_tekken_prowess?.toLocaleString() || '213,457'} />
                </div>

                <div className="h-[24px]" />

                <div className="space-y-2">
                    <div className="text-[16px] text-white/70 uppercase tracking-wide"
                        style={{ fontFamily: "'ED Manteca', sans-serif" }}>
                        RANKED MATCHES
                    </div>
                    <div className="pl-2 space-y-1">
                        <StatRowLeft label="WINS" value={team.player_1_ranked_wins?.toString() || '240'} />
                        <StatRowLeft label="LOSES" value={team.player_1_ranked_losses?.toString() || '211'} />
                        <StatRowLeft label="W/L RATE" value={team.player_1_ranked_wl_rate || '53.2%'} />
                    </div>
                </div>
            </div>

            {/* Player 2 Stats - Bottom Right (Mirrored) */}
            <div 
                className="absolute right-[60px] bottom-[60px] w-[380px] z-30"
                style={{ animation: 'slideInRight 0.8s ease-out 0.4s both' }}
            >
                <div className="space-y-2">
                    <StatRowRight label="DIVISION" value={team.player_2_division || 'MASTER'} />
                    <StatRowRight label="IFF8 RANKING" value={team.player_2_iff_ranking || '#02'} />
                    <StatRowRight label="IFF8 RECORD" value={team.player_2_iff_record || '5W, 1L'} />
                    <StatRowRight label="IFF HISTORY" value={team.player_2_iff_history || '2X IFF CHAMPION'} />
                </div>

                <div className="h-[12px]" />

                <div className="space-y-2">
                    <StatRowRight label="TEKKEN RANK" value={team.player_2_tekken_rank || 'TEKKEN KING'} />
                    <StatRowRight label="TEKKEN PROWESS" value={team.player_2_tekken_prowess?.toLocaleString() || '213,457'} />
                </div>

                <div className="h-[24px]" />

                <div className="space-y-2">
                    <div className="text-[16px] text-white/70 uppercase tracking-wide text-right"
                        style={{ fontFamily: "'ED Manteca', sans-serif" }}>
                        RANKED MATCHES
                    </div>
                    <div className="space-y-1">
                        <StatRowRight label="WINS" value={team.player_2_ranked_wins?.toString() || '64'} />
                        <StatRowRight label="LOSES" value={team.player_2_ranked_losses?.toString() || '9'} />
                        <StatRowRight label="W/L RATE" value={team.player_2_ranked_wl_rate || '78%'} />
                    </div>
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -50px);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, 0);
                    }
                }
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default LoveAndWarTeamStatsOverlay;
