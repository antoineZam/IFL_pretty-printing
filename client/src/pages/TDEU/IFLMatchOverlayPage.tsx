import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';


interface PlayerData {
    p1Flag: string;
    p1Team: string;
    p1Name: string;
    p1Rank: number | null;
    p2Flag: string;
    p2Team: string;
    p2Name: string;
    p2Rank: number | null;
    p1Score: number;
    p2Score: number;
    round: string;
    eventNumber: string;
}

const FLAG_FILTER =
    'saturate(0.93) hue-rotate(-8deg) brightness(0.97) contrast(.97) saturate(.83)';

const LINK_ASSETS = [
    '/source/overlay/ifl/links/discord.png',
    '/source/overlay/ifl/links/twitch.png',
    '/source/overlay/ifl/links/twitter.png',
    '/source/overlay/ifl/links/matcherino.png',
];

const LOGO_ASSETS = [
    '/source/overlay/ifl/ifl_logo.png',
    '/source/overlay/ifl/tekkendojo_logo.png',
];

const IFLMatchOverlayPage = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<PlayerData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentLinkIndex, setCurrentLinkIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);
    const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
    const [isLogoFading, setIsLogoFading] = useState(false);

    // Rotate through link assets every 10 seconds with fade animation
    useEffect(() => {
        const interval = setInterval(() => {
            setIsFading(true);
            setTimeout(() => {
                setCurrentLinkIndex((prev) => (prev + 1) % LINK_ASSETS.length);
                setIsFading(false);
            }, 500); // Fade out duration
        }, 10000); // 10 second delay

        return () => clearInterval(interval);
    }, []);

    // Rotate through logo assets every 10 seconds with fade animation
    useEffect(() => {
        const interval = setInterval(() => {
            setIsLogoFading(true);
            setTimeout(() => {
                setCurrentLogoIndex((prev) => (prev + 1) % LOGO_ASSETS.length);
                setIsLogoFading(false);
            }, 500); // Fade out duration
        }, 10000); // 10 second delay

        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        return () => {
            document.body.style.backgroundColor = ''; // Reverts to the default style
        };
    }, []);

    useEffect(() => {
        const key = searchParams.get('key') || localStorage.getItem('connectionKey');
        if (!key) {
            setError('No connection key provided');
            return;
        }

        const socket: Socket = io({ auth: { token: key } });

        socket.on('connect_error', (err) => {
            setError(`Connection Failed: ${err.message}`);
        });

        socket.on('data-update', (serverData: PlayerData) => {
            setData(serverData);
        });

        return () => {
            socket.disconnect();
        };
    }, [searchParams]);

    if (error) {
        return (
            <div className="w-[1920px] h-[1080px] flex items-center justify-center bg-transparent text-red-500 text-4xl">
                {error}
            </div>
        );
    }

    if (!data) {
        return <div className="w-[1920px] h-[1080px] bg-transparent"></div>;
    }

    const noFlagUrl = '/source/overlay/ifl/no-flag.png';

    const p1FlagUrl = data.p1Flag
        ? `https://flagcdn.com/h240/${data.p1Flag.toLowerCase()}.png`
        : noFlagUrl;
    const p2FlagUrl = data.p2Flag
        ? `https://flagcdn.com/h240/${data.p2Flag.toLowerCase()}.png`
        : noFlagUrl;

    return (
        <div className="w-[1920px] h-[1080px] bg-transparent text-white font-archivo-semi-expanded-bold overflow-hidden">
            <div className="relative w-full h-full">
                {/* Background Images */}
                <div
                    className="absolute top-0 left-0 w-[1920px] h-[1080px] bg-no-repeat"
                    style={{ backgroundImage: "url('/source/overlay/ifl/overlay.png')" }}
                />

                {/* Player 1 Flag (with recolour filter) */}
                <div
                    className="absolute top-[15px] left-[138px] w-[82px] h-[54px] bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(10,15,30,0.36), transparent 35%, transparent 65%, rgba(10,15,30,0.36)), url(${p1FlagUrl})`,
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 62% 100%)',
                        filter: FLAG_FILTER,
                    }}
                />

                {/* Player 1 Info */}
                <div className="absolute top-[22px] left-[240px] text-[28px] flex items-baseline text-shadow">
                    {data.p1Team && (
                        <span className="font-archivo-extra-condensed-light uppercase opacity-50" style={{ fontSize: '82%' }}>{data.p1Team}</span>
                    )}
                    {data.p1Team && <span className="mx-[5px] opacity-50"></span>}
                    <span className="font-archivo-semi-condensed-bold">{data.p1Name}</span>
                </div>
                {/* Player 1 Rank - Fixed position, 21% smaller than player name, same color as team */}
                <div className="absolute top-[26px] left-[555px] text-[22px] text-white opacity-50 text-shadow flex items-baseline">
                    <span className="font-archivo-extra-condensed-extrabold-italic mr-1">IFL</span>
                    <span className="font-archivo-extra-condensed-medium-italic">RANK #</span>
                    <span className={data.p1Rank ? 'font-archivo-bold' : 'font-archivo-condensed-bold'}>{data.p1Rank ?? 'N/A'}</span>
                </div>
                {/* Player 1 Score - Archivo Expanded Bold, 33% smaller than player name */}
                <div className="absolute top-[2px] left-[700px] text-[19px] w-[100px] text-center text-shadow font-archivo-expanded-bold">
                    {data.p1Score}
                </div>

                {/* Player 2 Flag (with recolour filter) */}
                <div
                    className="absolute top-[15px] right-[136px] w-[82px] h-[54px] bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(10,15,30,0.36), transparent 35%, transparent 65%, rgba(10,15,30,0.36)), url(${p2FlagUrl})`,
                        clipPath: 'polygon(0 0, 98% 0, 38% 100%, 0 100%)',
                        filter: FLAG_FILTER,
                    }}
                />

                {/* Player 2 Rank - Fixed position, 21% smaller than player name, same color as team */}
                <div className="absolute top-[26px] right-[555px] text-[22px] text-white opacity-50 text-shadow flex items-baseline">
                    <span className="font-archivo-extra-condensed-extrabold-italic mr-1">IFL</span>
                    <span className="font-archivo-extra-condensed-medium-italic">RANK #</span>
                    <span className={data.p2Rank ? 'font-archivo-bold' : 'font-archivo-condensed-bold'}>{data.p2Rank ?? 'N/A'}</span>
                </div>
                {/* Player 2 Info */}
                <div className="absolute top-[22px] right-[240px] text-[28px] flex items-baseline justify-end text-shadow">
                    <span className="font-archivo-semi-condensed-bold">{data.p2Name}</span>
                    {data.p2Team && <span className="mx-[5px] opacity-50"></span>}
                    {data.p2Team && (
                        <span className="font-archivo-extra-condensed-light uppercase opacity-50" style={{ fontSize: '82%' }}>{data.p2Team}</span>
                    )}
                </div>
                {/* Player 2 Score - Archivo Expanded Bold, 33% smaller than player name */}
                <div className="absolute top-[2px] right-[700px] text-[19px] w-[100px] text-center text-shadow font-archivo-expanded-bold">
                    {data.p2Score}
                </div>

                {/* Round Name - Archivo Extra Condensed Light, 47% smaller than player name */}
                <div className="absolute top-[3px] left-1/2 -translate-x-1/2 text-[15px] text-center w-[600px] tracking-[2px] text-shadow uppercase font-archivo-extra-condensed-light">
                    {data.round}
                </div>
                {/* <div className="absolute bottom-[30px] right-[550px] text-[32px] font-bold text-shadow">
                    {data.eventNumber ? `# ${data.eventNumber}` : ''}
                </div> */}
                {/* Rotating Link Assets */}
                <div className="absolute">
                    <img
                        src={LINK_ASSETS[currentLinkIndex]}
                        alt="link"
                        className="w-auto object-contain transition-opacity duration-500"
                        style={{ opacity: isFading ? 0 : 1 }}
                    />
                </div>
                {/* IFL WEEK# */}
                <div className="absolute bottom-[32px] left-[215px] text-[29px] tracking-normal text-shadow flex items-baseline">
                    <span className="font-archivo-expanded-black-italic">IFL</span>
                    <span className="font-archivo-condensed-black-italic opacity-50 ml-2">WEEK #{data.eventNumber}</span>
                </div>
                
                {/* Logo Carousel - IFL logo / Tekkendojo logo (same pattern as LINK_ASSETS) */}
                <div className="absolute">
                    <img
                        src={LOGO_ASSETS[currentLogoIndex]}
                        alt="logo"
                        className="w-auto object-contain transition-opacity duration-500"
                        style={{ opacity: isLogoFading ? 0 : 1 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default IFLMatchOverlayPage;