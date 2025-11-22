import { useRef, useLayoutEffect } from 'react';

interface UseDynamicFontSizeProps {
    name: string;
    sponsor: string;
    cardId: string;
}

const useDynamicFontSize = ({ name, sponsor, cardId }: UseDynamicFontSizeProps) => {
    const nameRef = useRef<HTMLSpanElement>(null);
    const sponsorRef = useRef<HTMLSpanElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const card = cardRef.current;
        const nameEl = nameRef.current;
        const sponsorEl = sponsorRef.current;

        if (!card || !nameEl || !sponsorEl) return;
        
        const adjustPlayerCardSize = () => {
            const containerWidth = card.clientWidth;
            const targetWidth = containerWidth * 0.90;

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            if (!context) return;
            
            let nameFontSize = 24;

            const calculateTotalWidth = (currentNameSize: number) => {
                let totalWidth = 0;
                context.font = `700 ${currentNameSize}px 'Archivo Extra Condensed Bold'`;
                totalWidth += context.measureText(name).width;
                
                if (sponsor) {
                    const sponsorFontSize = Math.min(22, currentNameSize * 0.8);
                    context.font = `600 ${sponsorFontSize}px 'Archivo Extra Condensed SemiBold'`;
                    totalWidth += context.measureText(sponsor).width;
                    totalWidth += 8; // gap
                }
                return totalWidth;
            };

            let totalWidth = calculateTotalWidth(nameFontSize);

            while (totalWidth > targetWidth && nameFontSize > 8) {
                nameFontSize -= 0.5;
                totalWidth = calculateTotalWidth(nameFontSize);
            }
            
            nameEl.style.fontSize = `${nameFontSize}px`;
            if (sponsor) {
                const finalSponsorSize = Math.min(22, nameFontSize * 0.8);
                sponsorEl.style.fontSize = `${finalSponsorSize}px`;
            } else {
                sponsorEl.style.fontSize = '';
            }

            // Vertical alignment adjustment
            const baseTop = 26;
            const initialHeight = 27; 
            const currentHeight = nameEl.offsetHeight;
            const offset = (currentHeight - initialHeight) / 2;
            card.style.top = `${baseTop - offset}px`;
        };

        adjustPlayerCardSize();

    }, [name, sponsor, cardId]);

    return { nameRef, sponsorRef, cardRef };
};

export default useDynamicFontSize;
