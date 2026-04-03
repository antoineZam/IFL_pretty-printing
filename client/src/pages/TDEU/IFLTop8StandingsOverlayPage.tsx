import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { getCountryCode } from '../../utils/countries';

interface Top8Player {
    placement: number;
    name: string;
    sponsor: string | null;
    country: string | null;
    twitter: string;
    character: string;
}

interface Top8StandingsData {
    weekNumber: string;
    tournamentName: string;
    players: Top8Player[];
    lastUpdated: string;
}

// Layout constants for positioning (based on TOP8_plates.png)
const FIRST_PLACE = {
    left: 130,
    top: 710,
    width: 960,  // Half of 1920px
    height: 120
};

const PLACEMENTS_2_3 = [
    { left: 1034, top: 208, width: 360, height: 80 },  // 2nd - shifted left
    { left: 1463, top: 208, width: 380, height: 80 }   // 3rd - shifted left
];

const PLACEMENTS_4_8 = [
    { left: 1031, top: 438.5, width: 580, height: 65 },  // 4th
    { left: 1031, top: 555.5, width: 580, height: 65 },  // 5th
    { left: 1031, top: 672.5, width: 580, height: 65 },  // 5th (tie)
    { left: 1031, top: 788.5, width: 580, height: 65 },  // 7th
    { left: 1031, top: 906.5, width: 580, height: 65 }   // 7th (tie)
];

const FLAG_FILTER = 'saturate(0.93) hue-rotate(-8deg) brightness(0.97) contrast(.97) saturate(.83)';

const IFLTop8StandingsOverlayPage = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<Top8StandingsData | null>(null);

    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        return () => {
            document.body.style.backgroundColor = '';
            document.documentElement.style.backgroundColor = '';
        };
    }, []);

    useEffect(() => {
        const key = searchParams.get('key') || localStorage.getItem('connectionKey');
        if (!key) return;

        const socket = io({ auth: { token: key } });

        socket.on('top8-standings-data', (newData: Top8StandingsData) => {
            console.log('[Top8 Standings] Received data:', newData);
            setData(newData);
        });

        return () => {
            socket.disconnect();
        };
    }, [searchParams]);

    const getCharacterUrl = (character: string, isLarge: boolean) => {
        if (!character) return '';
        const folder = isLarge ? 'stat_screen' : 'P1_icon';
        return `/source/overlay/characters/${folder}/${character.toLowerCase()}.png`;
    };

    const getFlagUrl = (country: string | null) => {
        const code = getCountryCode(country);
        return code ? `https://flagcdn.com/h80/${code}.png` : '/source/overlay/ifl/no-flag.png';
    };

    // Render 1st place (large, left side)
    const renderFirstPlace = (player: Top8Player | undefined) => {
        if (!player) return null;
        
        return (
            <div
                className="absolute flex items-center"
                style={{
                    left: `${FIRST_PLACE.left}px`,
                    top: `${FIRST_PLACE.top}px`,
                    width: `${FIRST_PLACE.width}px`,
                    height: `${FIRST_PLACE.height}px`
                }}
            >
                {/* Placement badge */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 text-8xl font-black italic text-yellow-400 drop-shadow-lg font-archivo-semi-condensed-bold">
                    1<sup className="ml-1 align-super" style={{ verticalAlign: 'super', fontSize: '0.4em' }}>st</sup>
                </div>

                {/* Flag */}
                <div 
                    className="absolute overflow-hidden"
                    style={{
                        left: '117px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '157px',
                        height: '192px',
                        clipPath: 'polygon(0 0, 84.5% 0, 100% 100%, 16% 100%)'
                    }}
                >
                    <img
                        src={getFlagUrl(player.country)}
                        alt="flag"
                        className="w-full h-full object-cover"
                        style={{ filter: FLAG_FILTER }}
                    />
                </div>

                {/* Player Info - starts after flag */}
                <div className="absolute top-1/2 -translate-y-1/2 font-archivo-semi-condensed-bold" style={{ left: '300px' }}>
                    <div className="text-4xl font-black italic text-white uppercase tracking-tight">
                        {player.name}
                    </div>
                    {player.sponsor && (
                        <div className="font-black italic text-cyan-400" style={{ fontSize: '80%' }}>[{player.sponsor}]</div>
                    )}
                    {player.twitter && (
                        <div className="font-black italic text-gray-300" style={{ fontSize: '80%' }}>@{player.twitter.replace('@', '')}</div>
                    )}
                </div>
            </div>
        );
    };

    // Render 2nd and 3rd place (top right)
    const renderPlacement2or3 = (player: Top8Player | undefined, position: number) => {
        if (!player) return null;
        const layout = PLACEMENTS_2_3[position === 2 ? 0 : 1];
        
        return (
            <div
                className="absolute flex items-center"
                style={{
                    left: `${layout.left}px`,
                    top: `${layout.top}px`,
                    width: `${layout.width}px`,
                    height: `${layout.height}px`
                }}
            >
                {/* Player Info - Top */}
                <div className="absolute left-0 right-16 font-archivo-semi-condensed-bold" style={{ top: '8px' }}>
                    <div className="text-3xl font-black italic text-white uppercase truncate">
                        {player.name}
                    </div>
                    {player.sponsor && (
                        <div className="font-black italic text-cyan-400" style={{ fontSize: '80%' }}>[{player.sponsor}]</div>
                    )}
                    {player.twitter && (
                        <div className="font-black italic text-gray-400" style={{ fontSize: '80%' }}>@{player.twitter.replace('@', '')}</div>
                    )}
                </div>

                {/* Placement - lower position */}
                <div className="absolute left-0 text-5xl font-black italic text-white font-archivo-semi-condensed-bold" style={{ bottom: '-80px' }}>
                    {position}<sup className="ml-1 align-super" style={{ verticalAlign: 'super', fontSize: '0.4em' }}>{position === 2 ? 'nd' : 'rd'}</sup>
                </div>

                {/* Flag */}
                <div 
                    className="absolute overflow-hidden"
                    style={{
                        left: '75px',
                        bottom: '-116px',
                        width: '124px',
                        height: '98px',
                        clipPath: 'polygon(0 0, 89% 0, 100% 100%, 10% 100%)'
                    }}
                >
                    <img
                        src={getFlagUrl(player.country)}
                        alt="flag"
                        className="w-full h-full object-cover"
                        style={{ filter: FLAG_FILTER }}
                    />
                </div>

                {/* Character */}
                {player.character && (
                    <img
                        src={getCharacterUrl(player.character, false)}
                        alt={player.character}
                        className="absolute right-0 bottom-0 h-20 w-auto object-contain"
                    />
                )}
            </div>
        );
    };

    // Render placements 4-8 (right side list)
    const renderPlacement4to8 = (player: Top8Player | undefined, index: number) => {
        if (!player) return null;
        const layout = PLACEMENTS_4_8[index];
        const placement = player.placement;
        
        return (
            <div
                className="absolute flex items-center"
                style={{
                    left: `${layout.left}px`,
                    top: `${layout.top}px`,
                    width: `${layout.width}px`,
                    height: `${layout.height}px`
                }}
            >
                {/* Placement */}
                <div className="w-20 text-5xl font-black italic text-white font-archivo-semi-condensed-bold pl-3">
                    {placement}<sup className="ml-1 align-super" style={{ verticalAlign: 'super', fontSize: '0.4em' }}>th</sup>
                </div>

                {/* Flag */}
                <div 
                    className="overflow-hidden mr-4"
                    style={{
                        width: '123px',
                        height: '98px',
                        marginLeft: '-2px',
                        clipPath: 'polygon(0 0, 89.5% 0, 100% 100%, 10.5% 100%)'
                    }}
                >
                    <img
                        src={getFlagUrl(player.country)}
                        alt="flag"
                        className="w-full h-full object-cover"
                        style={{ filter: FLAG_FILTER }}
                    />
                </div>

                {/* Player Info */}
                <div className="flex-1 min-w-0 font-archivo-semi-condensed-bold">
                    <div className="text-3xl font-black italic text-white uppercase truncate">
                        {player.name}
                    </div>
                    {player.sponsor && (
                        <div className="font-black italic text-cyan-400" style={{ fontSize: '80%' }}>[{player.sponsor}]</div>
                    )}
                    {player.twitter && (
                        <div className="font-black italic text-gray-400" style={{ fontSize: '80%' }}>@{player.twitter.replace('@', '')}</div>
                    )}
                </div>

                {/* Character */}
                {player.character && (
                    <img
                        src={getCharacterUrl(player.character, false)}
                        alt={player.character}
                        className="h-14 w-auto object-contain"
                    />
                )}
            </div>
        );
    };

    return (
        <div className="w-[1920px] h-[1080px] bg-transparent relative overflow-hidden font-archivo-semi-condensed-bold">
            {/* Background */}
            <img
                src="/source/overlay/ifl/TOP8_background.png"
                alt="background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Plates overlay */}
            <img
                src="/source/overlay/ifl/TOP8_plates.png"
                alt="plates"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Title */}
            <div className="absolute top-[100px] left-2/3 -translate-x-1/2 text-center">
                <h1 className="text-5xl text-white tracking-wider">
                    <span className="font-archivo-black">IFL </span>
                    <span className="text-gray-400 font-archivo-black">WEEK#{data?.weekNumber || '01'}</span>
                    <span className="ml-3 text-sky-400 font-archivo-black">TOP 8</span>
                </h1>
            </div>

            {data?.players && (
                <>
                    {/* 1st Place - Large on left with big character render */}
                    {renderFirstPlace(data.players[0])}
                    
                    {/* Large character render for 1st place */}
                    {data.players[0]?.character && (
                        <img
                            src={getCharacterUrl(data.players[0].character, true)}
                            alt={data.players[0].character}
                            className="absolute left-32 top-24 h-[450px] w-auto object-contain"
                            style={{ transform: 'scaleX(-1)' }}
                        />
                    )}

                    {/* 2nd and 3rd place */}
                    {renderPlacement2or3(data.players[1], 2)}
                    {renderPlacement2or3(data.players[2], 3)}

                    {/* 4th - 8th place */}
                    {data.players.slice(3, 8).map((player, idx) => (
                        renderPlacement4to8(player, idx)
                    ))}
                </>
            )}

            {/* Footer */}
            <div className="absolute bottom-6 left-8 flex items-center gap-4">
                <img
                    src="/source/overlay/ifl/tekkendojo_logo.png"
                    alt="Tekken Dojo"
                    className="h-12"
                />
            </div>

            <div className="absolute bottom-6 right-8 text-sm text-gray-400">
                ALL RIGHTS RESERVED © 2026 &nbsp;&nbsp;&nbsp; TEKKEN 8 ™ BANDAI NAMCO
            </div>
        </div>
    );
};

export default IFLTop8StandingsOverlayPage;
