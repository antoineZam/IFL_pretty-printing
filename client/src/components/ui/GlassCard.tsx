import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const GlassCard = ({ children, className, style }: GlassCardProps) => {
    return (
        <div 
            className={`bg-black/50 backdrop-blur-md border border-white/10 rounded-lg shadow-xl ${className}`}
            style={style}
        >
            {children}
        </div>
    );
};

export default GlassCard;