import { useMemo, memo } from 'react';

interface IntroVideoProps {
    url: string;
    volume?: number;
    isPlaying?: boolean;
}

// Extract YouTube video ID from various URL formats
const getYouTubeVideoId = (url: string): string => {
    if (!url) return '';
    
    // Standard watch URL: https://www.youtube.com/watch?v=VIDEO_ID
    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch) return watchMatch[1];
    
    // Short URL: https://youtu.be/VIDEO_ID
    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) return shortMatch[1];
    
    // Embed URL
    const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
    if (embedMatch) return embedMatch[1];
    
    return '';
};

export const IntroVideoPlayer = memo(({ url, isPlaying = true }: IntroVideoProps) => {
    const videoId = useMemo(() => getYouTubeVideoId(url), [url]);
    
    // Build embed URL with autoplay
    const embedUrl = useMemo(() => {
        if (!videoId) return '';
        const params = new URLSearchParams({
            autoplay: '1',
            mute: '0',  // Start unmuted - will work in OBS browser source
            controls: '0',
            modestbranding: '1',
            rel: '0',
            fs: '0',
            iv_load_policy: '3',
            playsinline: '1',
            enablejsapi: '1'
        });
        return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    }, [videoId]);

    console.log('[IntroVideo] videoId:', videoId, 'isPlaying:', isPlaying);

    if (!videoId) {
        return (
            <div className="w-full h-full bg-black flex items-center justify-center">
                <p className="text-white text-2xl">Invalid YouTube URL</p>
            </div>
        );
    }

    if (!isPlaying) {
        return <div className="w-full h-full bg-black" />;
    }

    return (
        <div className="w-full h-full bg-black">
            <iframe
                key={videoId}
                src={embedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none' }}
            />
        </div>
    );
});

IntroVideoPlayer.displayName = 'IntroVideoPlayer';

export default IntroVideoPlayer;

