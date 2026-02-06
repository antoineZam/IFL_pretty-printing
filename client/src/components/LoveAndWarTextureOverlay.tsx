import { useState, useEffect } from 'react';

// Available texture overlay filenames
const textureOverlays = [
    'texture_01.png',
    'texture_02.png',
    'texture_03.png',
    'texture_04.png',
    'texture_05.png',
    'texture_06.png',
    'texture_07.png',
    'texture_08.png',
];

/**
 * LoveAndWarTextureOverlay Component
 * 
 * Displays a random texture overlay that changes on each page load/reload.
 * Ensures the texture is different from the previous one.
 */
export const LoveAndWarTextureOverlay = () => {
    const [textureOverlay, setTextureOverlay] = useState<string | null>(null);

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

    if (!textureOverlay) return null;

    return (
        <img 
            src={`/source/overlay/love_and_war/texture_overlays/${textureOverlay}`}
            alt="Texture Overlay"
            className="absolute inset-0 w-full h-full object-cover z-[100] pointer-events-none"
            style={{ animation: 'fadeIn 0.6s ease-out' }}
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
            }}
        />
    );
};

export default LoveAndWarTextureOverlay;
