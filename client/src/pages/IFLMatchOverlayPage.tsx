import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

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

const IFLMatchOverlayPage = () => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<PlayerData | null>(null);
    const [error, setError] = useState<string | null>(null);

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
        return <div className="w-[1920px] h-[1080px] flex items-center justify-center bg-transparent text-red-500 text-4xl">{error}</div>;
    }

    if (!data) {
        return <div className="w-[1920px] h-[1080px] bg-transparent"></div>;
    }

    // Create a placeholder SVG for when no flag is selected
    const noFlagSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="57" viewBox="0 0 80 57"><rect width="80" height="57" fill="#374151"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#9ca3af">NO FLAG</text></svg>`;
    const noFlagUrl = `data:image/svg+xml;base64,${btoa(noFlagSvg)}`;

    const p1FlagUrl = data.p1Flag ? `https://flagcdn.com/h240/${data.p1Flag.toLowerCase()}.png` : noFlagUrl;
    const p2FlagUrl = data.p2Flag ? `https://flagcdn.com/h240/${data.p2Flag.toLowerCase()}.png` : noFlagUrl;

    return (
        <div className="w-[1920px] h-[1080px] bg-transparent text-white uppercase font-archivo overflow-hidden">
            <div className="relative w-full h-full">
                {/* Background Images */}
                <div className="absolute top-0 left-0 w-[1920px] h-[1080px] bg-no-repeat" style={{ backgroundImage: "url('/source/overlay/ifl/IFL_overlays_p1.png')" }} />
                <div className="absolute top-0 left-0 w-[1920px] h-[1080px] bg-no-repeat" style={{ backgroundImage: "url('/source/overlay/ifl/IFL_overlays_p2.png')" }} />
                <div className="absolute top-0 left-0 w-[1920px] h-[1080px] bg-no-repeat" style={{ backgroundImage: "url('/source/overlay/ifl/IFL_overlays_tracker.png')" }} />
                <div className="absolute top-0 left-0 w-[1920px] h-[1080px] bg-no-repeat" style={{ backgroundImage: "url('/source/overlay/ifl/IFL_overlays_logo.png')" }} />
                <div className="absolute top-0 left-0 w-[1920px] h-[1080px] bg-no-repeat" style={{ backgroundImage: "url('/source/overlay/ifl/bottom_bar_elements.png')" }} />
                
                {/* Player 1 Info */}
                <div 
                    className="absolute top-[14px] left-[134px] w-[80px] h-[57px] bg-cover bg-center border border-white" 
                    style={{ 
                        backgroundImage: `url(${p1FlagUrl})`, 
                        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 65% 100%)' 
                    }} 
                />
                <div className="absolute top-[24px] left-[230px] text-[24px] font-medium w-[550px] flex items-baseline text-shadow">
                    {data.p1Team && <span className="text-[#cccccc] text-[20px]">{data.p1Team}</span>}
                    {data.p1Team && <span className="mx-[5px]">|</span>}
                    <span className="text-[24px]">{data.p1Name}</span>
                </div>
                <div className="absolute top-[8px] left-[603px] text-[45px] w-[100px] text-center text-shadow">{data.p1Score}</div>

                {/* Player 2 Info */}
                 <div 
                    className="absolute top-[13px] right-[141px] w-[80px] h-[57px] bg-cover bg-center border border-white" 
                    style={{ 
                        backgroundImage: `url(${p2FlagUrl})`, 
                        clipPath: 'polygon(0 0, 100% 0, 38% 100%, 0 100%)' 
                    }} 
                />
                <div className="absolute top-[24px] right-[240px] text-[24px] font-medium w-[550px] flex items-baseline justify-end text-shadow">
                    <span className="text-[24px]">{data.p2Name}</span>
                    {data.p2Team && <span className="mx-[5px]">|</span>}
                    {data.p2Team && <span className="text-[#cccccc] text-[18px]">{data.p2Team}</span>}
                </div>
                <div className="absolute top-[8px] right-[610px] text-[45px] w-[100px] text-center text-shadow">{data.p2Score}</div>

                {/* Round and Event */}
                <div className="absolute top-[3px] left-1/2 -translate-x-1/2 text-[16px] text-center w-[600px] tracking-[5px] text-shadow">
                    {data.round}
                </div>
                <div className="absolute bottom-[35px] right-[460px] text-[28px] font-bold text-shadow">
                    {data.eventNumber ? `IFL WEEK #${data.eventNumber}` : ''}
                </div>
            </div>
        </div>
    );
};

export default IFLMatchOverlayPage;
