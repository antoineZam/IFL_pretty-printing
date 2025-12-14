import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

const SPONSOR_LOGOS = [
    '/source/overlay/ifl/ingage_logo.png',
    '/source/overlay/ifl/reversal_logo.png',
    '/source/overlay/ifl/tekkendojo_logo.png',
];
const LOGO_ROTATION_INTERVAL = 5000; // 5 seconds per logo
const FADE_DURATION = 800; // ms for fade transition

interface PlayerData {
    p1Flag: string;
    p1Team: string;
    p1Name: string;
    p2Flag: string;
    p2Team: string;
    p2Name: string;
    p1Score: number;
    p2Score: number;
    round: string;
    eventNumber: string;
}

const FLAG_FILTER =
    'saturate(0.93) hue-rotate(-8deg) brightness(0.97) contrast(.97) saturate(.83)';

const IFLMatchOverlayPage = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<PlayerData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
    const [logoOpacity, setLogoOpacity] = useState(1);

    // Rotate through sponsor logos with fade animation
    const rotateLogo = useCallback(() => {
        // Fade out
        setLogoOpacity(0);
        
        // After fade out completes, change logo and fade in
        setTimeout(() => {
            setCurrentLogoIndex((prev) => (prev + 1) % SPONSOR_LOGOS.length);
            setLogoOpacity(1);
        }, FADE_DURATION);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(rotateLogo, LOGO_ROTATION_INTERVAL);
        return () => clearInterval(intervalId);
    }, [rotateLogo]);

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
        <div className="w-[1920px] h-[1080px] bg-transparent text-white uppercase font-archivo overflow-hidden">
            <div className="relative w-full h-full">
                {/* Background Images */}
                <div
                    className="absolute top-0 left-0 w-[1920px] h-[1080px] bg-no-repeat"
                    style={{ backgroundImage: "url('/source/overlay/ifl/IFL_overlays_filled.png')" }}
                />
                <div
                    className="absolute top-0 left-0 w-[1920px] h-[1080px] bg-no-repeat"
                    style={{ backgroundImage: "url('/source/overlay/ifl/IFL_overlays_tracker.png')" }}
                />
                {/* Rotating Sponsor Logos */}
                <div
                    className="absolute top-0 left-0 w-[1920px] h-[1080px] bg-no-repeat"
                    style={{
                        backgroundImage: `url('${SPONSOR_LOGOS[currentLogoIndex]}')`,
                        opacity: logoOpacity,
                        transition: `opacity ${FADE_DURATION}ms ease-in-out`,
                    }}
                />
                <div
                    className="absolute top-0 left-0 w-[1920px] h-[1080px] bg-no-repeat"
                    style={{ backgroundImage: "url('/source/overlay/ifl/bottom_bar_elements.png')" }}
                />

                {/* Player 1 Flag (with recolour filter) */}
                <div
                    className="absolute top-[14px] left-[138px] w-[81px] h-[55px] bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(10,15,30,0.36), transparent 35%, transparent 65%, rgba(10,15,30,0.36)), url(${p1FlagUrl})`,
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 63% 100%)',
                        filter: FLAG_FILTER,
                    }}
                />

                {/* Player 1 Info */}
                <div className="absolute top-[24px] left-[240px] text-[24px] font-medium w-[550px] flex items-baseline text-shadow">
                    {data.p1Team && (
                        <span className="text-[#cccccc] text-[20px]">{data.p1Team}</span>
                    )}
                    {data.p1Team && <span className="mx-[5px]">|</span>}
                    <span className="text-[24px]">{data.p1Name}</span>
                </div>
                <div className="absolute top-[8px] left-[613px] text-[45px] w-[100px] text-center text-shadow">
                    {data.p1Score}
                </div>

                {/* Player 2 Flag (with recolour filter) */}
                <div
                    className="absolute top-[14px] right-[136px] w-[82px] h-[55px] bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, rgba(10,15,30,0.36), transparent 35%, transparent 65%, rgba(10,15,30,0.36)), url(${p2FlagUrl})`,
                        clipPath: 'polygon(0 0, 100% 0, 38% 100%, 0 100%)',
                        filter: FLAG_FILTER,
                    }}
                />

                {/* Player 2 Info */}
                <div className="absolute top-[24px] right-[240px] text-[24px] font-medium w-[550px] flex items-baseline justify-end text-shadow">
                    <span className="text-[24px]">{data.p2Name}</span>
                    {data.p2Team && <span className="mx-[5px]">|</span>}
                    {data.p2Team && (
                        <span className="text-[#cccccc] text-[18px]">{data.p2Team}</span>
                    )}
                </div>
                <div className="absolute top-[8px] right-[613px] text-[45px] w-[100px] text-center text-shadow">
                    {data.p2Score}
                </div>

                {/* Round and Event */}
                <div className="absolute top-[3px] left-1/2 -translate-x-1/2 text-[16px] text-center w-[600px] tracking-[3px] text-shadow">
                    {data.round}
                </div>
                <div className="absolute bottom-[36px] right-[510px] text-[22px] font-bold text-shadow">
                    {data.eventNumber ? `${data.eventNumber}` : ''}
                </div>
                <div className="absolute bottom-[36px] right-[160px] text-[22px] font-bold text-shadow">
                    Road to Ingage
                </div>
            </div>
        </div>
    );
};

export default IFLMatchOverlayPage;
