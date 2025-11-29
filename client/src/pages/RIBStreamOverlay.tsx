import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

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

interface Props {
    forceShow?: boolean;
}

export default function RIBStreamOverlay({ forceShow = false }: Props) {
    const [searchParams] = useSearchParams();
    const [streamData, setStreamData] = useState<StreamData>({
        matchTitle: '',
        p1Name: '', p1Flag: '', p1Score: 0,
        p2Name: '', p2Flag: '', p2Score: 0
    });
    const [overlayState, setOverlayState] = useState<OverlayState | null>(null);
    const [animKey, setAnimKey] = useState(0);

    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';

        const connectionKey = searchParams.get('key') || localStorage.getItem('connectionKey');
        const newSocket: Socket = io({
            auth: { token: connectionKey || '' }
        });

        newSocket.on('rib-stream-data-update', (data: StreamData) => setStreamData(data));
        newSocket.on('rib-overlay-state-update', (data: OverlayState) => {
            setOverlayState(prev => {
                if (prev && data.animationTrigger !== prev.animationTrigger) {
                    setAnimKey(k => k + 1);
                }
                return data;
            });
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const shouldShow = forceShow || (overlayState && overlayState.showStreamOverlay);

    if (!shouldShow) {
        return <div className="w-[1920px] h-[1080px]" />;
    }

    const noFlagUrl = '/source/overlay/ifl/no-flag.png';

    const p1FlagUrl = streamData.p1Flag
        ? `https://flagcdn.com/h240/${streamData.p1Flag.toLowerCase()}.png`
        : noFlagUrl;
    const p2FlagUrl = streamData.p2Flag
        ? `https://flagcdn.com/h240/${streamData.p2Flag.toLowerCase()}.png`
        : noFlagUrl;

    return (
        <div className="w-[1920px] h-[1080px] relative overflow-hidden font-['Archivo']">
            {/* Base Overlay Image */}
            <img 
                key={`overlay-${animKey}`}
                src="/source/overlay/run_it_back/match_overlay/runitback_overlay.png"
                alt="Overlay"
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ animation: `fadeIn 0.3s ease-out` }}
            />

            {/* Player 1 Flag - positioned over the left circle */}
            <div 
                key={`p1flag-${animKey}`}
                className="absolute top-[21px] left-[202px] w-[46px] h-[46px] rounded-full overflow-hidden z-10"
                style={{
                    backgroundImage: `url(${p1FlagUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    animation: `fadeIn 0.4s ease-out 0.1s both`
                }}
            />

            {/* Player 1 Name - left aligned to edge of flag with padding */}
            <div 
                key={`p1name-${animKey}`}
                className="absolute top-[28px] left-[280px] h-[30px] flex items-center"
                style={{ animation: `slideInLeft 0.4s ease-out 0.1s both`, fontFamily: 'Gotham Book, Gotham, sans-serif' }}
            >
                <span className="text-[#3a3a3a] text-[28px] font-bold tracking-tight">
                    {streamData.p1Name}
                </span>
            </div>

            {/* Player 1 Score */}
            <div 
                key={`p1score-${animKey}`}
                className="absolute top-[20px] left-[620px] w-[50px] h-[45px] flex items-center justify-center"
                style={{ animation: `fadeIn 0.4s ease-out 0.2s both`, fontFamily: 'Gotham Bold, Gotham, sans-serif' }}
            >
                <span className="text-[#c45c4c] text-[40px] font-bold">{streamData.p1Score}</span>
            </div>

            {/* Player 2 Flag - positioned over the right circle */}
            <div 
                key={`p2flag-${animKey}`}
                className="absolute top-[21px] right-[204px] w-[46px] h-[46px] rounded-full overflow-hidden z-10"
                style={{
                    backgroundImage: `url(${p2FlagUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    animation: `fadeIn 0.4s ease-out 0.1s both`
                }}
            />

            {/* Player 2 Name - right aligned to edge of flag with padding */}
            <div 
                key={`p2name-${animKey}`}
                className="absolute top-[28px] right-[280px] h-[30px] flex items-center justify-end"
                style={{ animation: `slideInRight 0.4s ease-out 0.1s both`, fontFamily: 'Gotham Book, Gotham, sans-serif' }}
            >
                <span className="text-[#3a3a3a] text-[28px] font-bold tracking-tight">
                    {streamData.p2Name}
                </span>
            </div>

            {/* Player 2 Score */}
            <div 
                key={`p2score-${animKey}`}
                className="absolute top-[20px] right-[625px] w-[50px] h-[45px] flex items-center justify-center"
                style={{ animation: `fadeIn 0.4s ease-out 0.2s both`, fontFamily: 'Gotham Bold, Gotham, sans-serif' }}
            >
                <span className="text-[#c45c4c] text-[40px] font-bold">{streamData.p2Score}</span>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideInLeft {
                    from { transform: translateX(-20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideInRight {
                    from { transform: translateX(20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

