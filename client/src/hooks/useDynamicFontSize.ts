import { useRef, useLayoutEffect } from 'react';

interface UseDynamicFontSizeProps {
    name: string;
    sponsor: string;
    cardId: string;
}

// One measurement context shared by every card, instead of allocating a fresh
// canvas on each layout pass.
let measureContext: CanvasRenderingContext2D | null | undefined;

function getMeasureContext(): CanvasRenderingContext2D | null {
    if (measureContext === undefined) {
        measureContext = document.createElement('canvas').getContext('2d');
    }
    return measureContext;
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

            const context = getMeasureContext();
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

            // Binary search over the same 0.5px steps the linear scan used, so it
            // lands on an identical size in ~5 measurements instead of up to 32.
            if (calculateTotalWidth(nameFontSize) > targetWidth) {
                let lo = 8;   // smallest size the scan would ever stop at
                let hi = 24;  // known too wide
                while (hi - lo > 0.5) {
                    const mid = Math.round(((lo + hi) / 2) * 2) / 2;
                    if (mid <= lo || mid >= hi) break;
                    if (calculateTotalWidth(mid) > targetWidth) hi = mid;
                    else lo = mid;
                }
                nameFontSize = calculateTotalWidth(lo) > targetWidth ? 8 : lo;
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
