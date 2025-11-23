interface CyberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
  }
  
  export const CyberInput = ({ label, ...props }: CyberInputProps) => (
    <div className="flex flex-col gap-1.5 group">
      <label className="text-xs font-bold uppercase tracking-widest text-gray-500 group-focus-within:text-primary transition-colors">
        {label}
      </label>
      <input
        {...props}
        className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300"
      />
    </div>
  );