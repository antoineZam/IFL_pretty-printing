import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const GlassCard = ({ children, className, style }: GlassCardProps) => {
    return (
        <div 
            className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg shadow-lg ${className}`}
            style={style}
        >
            {children}
        </div>
    );
};

export default GlassCard;