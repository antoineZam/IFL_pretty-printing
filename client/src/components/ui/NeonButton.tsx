interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'danger' | 'ghost';
  }
  
  export const NeonButton = ({ children, variant = 'primary', className = "", ...props }: NeonButtonProps) => {
    const baseStyles = "px-6 py-3 rounded-lg font-bold uppercase tracking-widest transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2";
    
    const variants = {
      primary: "bg-primary text-black hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(218,165,32,0.4)]",
      danger: "bg-red-900/20 text-red-500 border border-red-900/50 hover:bg-red-900/40 hover:border-red-500",
      ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"
    };
  
    return (
      <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  };