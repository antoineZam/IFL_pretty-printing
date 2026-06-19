import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import type { IFF9MatchData } from '../../types/iff9';

// NOTE: Fonts are intentionally left as system defaults for IFF9 until the
// brand fonts/assets are delivered. Positioning mirrors the Love & War 1v1
// overlay so the disposition is identical.

interface Props {
    socket?: Socket | null;       // If provided, listen on this socket instead of creating one
    embedded?: boolean;           // If true, fill parent instead of fixed 1920x1080
    initialData?: IFF9MatchData | null;
}

const IFF9MatchOverlay = ({ socket: propSocket, embedded = false, initialData = null }: Props) => {
    const [searchParams] = useSearchParams();
    const [data, setData] = useState<IFF9MatchData | null>(initialData);
    const [error, setError] = useState<string | null>(null);

    // Transparent background (standalone mode only)
    useEffect(() => {
        if (embedded) return;
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        return () => {
            document.body.style.backgroundColor = '';
            document.documentElement.style.backgroundColor = '';
        };
    }, [embedded]);

    // Listen on provided socket (embedded mode)
    useEffect(() => {
        if (!propSocket) return;
        const handleData = (serverData: IFF9MatchData) => setData(serverData);
        propSocket.on('iff9-match-data', handleData);
        return () => { propSocket.off('iff9-match-data', handleData); };
    }, [propSocket]);

    // Create own socket (standalone mode)
    useEffect(() => {
        if (embedded || propSocket) return;
        const key = searchParams.get('key');
        if (!key) {
            setError('No connection key');
            return;
        }
        const socket: Socket = io({ auth: { token: key } });
        socket.on('connect_error', (err) => setError(`Connection Failed: ${err.message}`));
        socket.on('iff9-match-data', (serverData: IFF9MatchData) => setData(serverData));
        return () => { socket.disconnect(); };
    }, [searchParams, embedded, propSocket]);

    const containerClass = embedded ? 'w-full h-full' : 'w-[1920px] h-[1080px]';

    if (error && !embedded) {
        return (
            <div className={`${containerClass} flex items-center justify-center bg-transparent text-red-500 text-4xl`}>
                {error}
            </div>
        );
    }

    if (!data) {
        return <div className={`${containerClass} bg-transparent`} />;
    }

    const matchType = data.match_type || 'challengers';
    // Asset set differs for masters vs challengers (delivered later).
    const streamOverlayPath = `/source/overlay/iff_9/${matchType}/1v1_overlay.png`;
    const bottomPagePath = `/source/overlay/iff_9/${matchType}/bottom_page.png`;

    return (
        <div className={`${containerClass} bg-transparent text-white uppercase overflow-hidden font-pp-neue-bit-bold tracking-widest`}>
            <div className="relative w-full h-full">
                {/* Stream overlay (asset pending) */}
                <img
                    src={streamOverlayPath}
                    alt="IFF9 Overlay"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <img
                    src={bottomPagePath}
                    alt="Bottom Page"
                    className="absolute bottom-0 left-0 w-full h-full object-cover z-0"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />

                {/* Player 1 Country Code (Alpha-3) */}
                <div className="absolute top-[26px] left-[138px] text-[28px] text-white/80 z-10" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
                    {data.player_1_country || ''}
                </div>

                {/* Player 1 Rank */}
                <div className="absolute top-[26px] left-[555px] text-[22px] text-white/50 flex items-baseline z-10" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
                    <span className="mr-1">IFF9</span>
                    <span>RANK #</span>
                    <span className={`ml-1 text-white ${data.player_1_rank ? '' : 'opacity-50'}`}>{data.player_1_rank ?? 'N/A'}</span>
                </div>

                {/* Player 1 name - left half (matches Love & War 1v1 positioning) */}
                <div className="absolute w-full h-[100px] z-10 flex items-center">
                    <div className="absolute left-[-280px] right-[calc(50%+100px)] flex items-center justify-center">
                        <span className="text-[34px] text-white whitespace-nowrap uppercase" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
                            {data.player_1_name}
                        </span>
                    </div>
                </div>

                {/* Player 1 score */}
                <div className="absolute top-[-5px] left-[724px] text-[30px] w-[100px] text-center z-10" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
                    {data.player_1_score}
                </div>

                {/* Player 2 Country Code (Alpha-3) */}
                <div className="absolute top-[26px] right-[136px] text-[28px] text-white/80 z-10 text-right" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
                    {data.player_2_country || ''}
                </div>

                {/* Player 2 Rank */}
                <div className="absolute top-[26px] right-[555px] text-[22px] text-white/50 flex items-baseline justify-end z-10" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
                    <span className="mr-1">IFF9</span>
                    <span>RANK #</span>
                    <span className={`ml-1 text-white ${data.player_2_rank ? '' : 'opacity-50'}`}>{data.player_2_rank ?? 'N/A'}</span>
                </div>

                {/* Player 2 name - right half */}
                <div className="absolute w-full h-[100px] z-10 flex items-center">
                    <div className="absolute right-[-280px] left-[calc(50%+100px)] flex items-center justify-center">
                        <span className="text-[34px] text-white whitespace-nowrap uppercase" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
                            {data.player_2_name}
                        </span>
                    </div>
                </div>

                {/* Player 2 score */}
                <div className="absolute top-[-5px] right-[725px] text-[30px] w-[100px] text-center z-10" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
                    {data.player_2_score}
                </div>

                {/* Round / match info - centered */}
                <div className="absolute top-[3px] left-1/2 -translate-x-1/2 text-[20px] text-center w-[600px] z-10" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
                    {data.round_name}
                </div>
            </div>
        </div>
    );
};

export default IFF9MatchOverlay;
