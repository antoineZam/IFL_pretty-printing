interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    message?: string;
    className?: string;
}

const LoadingSpinner = ({ size = 'md', message, className = '' }: LoadingSpinnerProps) => {
    const sizeClasses = {
        sm: 'w-5 h-5 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4'
    };

    const containerClasses = {
        sm: 'gap-2',
        md: 'gap-3',
        lg: 'gap-4'
    };

    return (
        <div className={`flex flex-col items-center justify-center ${containerClasses[size]} ${className}`}>
            <div 
                className={`${sizeClasses[size]} border-gray-700 border-t-red-500 rounded-full animate-spin`}
            />
            {message && (
                <p className="text-gray-400 text-sm animate-pulse">{message}</p>
            )}
        </div>
    );
};

export default LoadingSpinner;
