import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import useDynamicFontSize from '../hooks/useDynamicFontSize';

// Data interfaces
interface Player {
    name: string;
    sponsor: string;
    active: boolean;
}
interface Team {
    name: string;
    tag: string;
    players: Player[];
    score: number;
}
interface TagTeamData {
    team1: Team;
    team2: Team;
    round: string;
}

// PlayerCard component
interface PlayerCardProps {
    player: Player;
    className: string;
    cardId: string;
}
const PlayerCard = ({ player, className, cardId }: PlayerCardProps) => {
    const { nameRef, sponsorRef, cardRef } = useDynamicFontSize({
        name: player.name,
        sponsor: player.sponsor,
        cardId,
    });

    return (
        <div ref={cardRef} id={cardId} className={`flex flex-row items-baseline gap-2 max-w-[250px] overflow-hidden justify-center ${className} ${!player.active ? 'opacity-50' : ''}`}>
            <span ref={sponsorRef} className="text-white/50 text-[18px] font-semibold whitespace-nowrap">{player.sponsor}</span>
            <span ref={nameRef} className="text-[24px] font-bold text-white whitespace-nowrap">{player.name}</span>
        </div>
    );
};


const TagTeamOverlayPage = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<TagTeamData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const key = searchParams.get('key');
        if (!key) {
            setError('No connection key');
            return;
        }

        const socket: Socket = io({ auth: { token: key } });
        socket.on('connect_error', (err) => setError(`Connection Failed: ${err.message}`));
        socket.on('tag-team-data', (serverData: TagTeamData) => setData(serverData));

        return () => {
            socket.disconnect();
        };
    }, [searchParams]);

    const overlayImage = useMemo(() => {
        if (!data) return '';
        const t1Active = data.team1.players.findIndex(p => p.active);
        const t2Active = data.team2.players.findIndex(p => p.active);
        let imgNum = 1;
        if (t1Active === 0 && t2Active === 0) imgNum = 4;
        else if (t1Active === 1 && t2Active === 0) imgNum = 3;
        else if (t1Active === 0 && t2Active === 1) imgNum = 2;
        return `/source/overlay/tag_tournament/team${imgNum}.png`;
    }, [data]);
    
    if (error) return <div className="w-[1920px] h-[1080px] flex items-center justify-center bg-transparent text-red-500 text-4xl">{error}</div>;
    if (!data) return <div className="w-[1920px] h-[1080px] bg-transparent"></div>;

    const { team1, team2, round } = data;

    return (
        <div className="w-[1920px] h-[1080px] bg-transparent text-white uppercase font-archivo-extra-condensed-bold overflow-hidden">
            <div className="relative w-full h-full">
                <div className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-contain bg-center transition-all" style={{ backgroundImage: `url('${overlayImage}')` }} />
                
                {/* Team 1 */}
                <div className="absolute top-0.5 w-full h-[100px] text-shadow">
                     <PlayerCard player={team1.players[0]} className="absolute left-[195px] right-[calc(100%-415px)]" cardId="t1-p1-card" />
                     <div className="absolute top-7 left-[427px] w-0.5 h-[30px] bg-yellow-400 opacity-0" />
                     <PlayerCard player={team1.players[1]} className="absolute left-[432px] w-[258px]" cardId="t1-p2-card" />
                </div>
                <div className="absolute top-0 left-[690px] text-[27px] w-[100px] text-center font-bold font-archivo-expanded-regular">{team1.score}</div>

                {/* Team 2 */}
                <div className="absolute top-0.5 w-full h-[100px] text-shadow">
                    <PlayerCard player={team2.players[0]} className="absolute right-[195px] left-[calc(100%-410px)]" cardId="t2-p1-card" />
                    <div className="absolute top-7 right-[423px] w-0.5 h-[30px] bg-yellow-400 opacity-0" />
                    <PlayerCard player={team2.players[1]} className="absolute right-[428px] w-[262px]" cardId="t2-p2-card" />
                </div>
                <div className="absolute top-0 right-[690px] text-[27px] w-[100px] text-center font-bold font-archivo-expanded-regular">{team2.score}</div>
                
                {/* Round */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 text-base text-center w-[600px] tracking-[2px] font-semibold">{round}</div>
            </div>
        </div>
    );
};

export default TagTeamOverlayPage;
