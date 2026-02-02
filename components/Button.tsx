
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'rainbow' | 'rainbow-stop';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = React.memo(({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className = '',
  ...props 
}) => {
  
  const baseStyles = "px-6 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:cursor-not-allowed";
  
  const variants = {
    // Primary: Gradient Gold to Bronze, Dark Teal text for contrast
    primary: "bg-gradient-to-r from-[#e2b36e] to-[#b28e67] text-[#09232b] shadow-lg hover:shadow-[#e2b36e]/20 border border-[#e2b36e]/20",
    secondary: "bg-white bg-opacity-20 hover:bg-opacity-30 text-white border border-white border-opacity-20 focus:ring-white",
    glass: "bg-[#e2b36e]/5 hover:bg-[#e2b36e]/10 text-white border border-[#e2b36e]/10 backdrop-blur-md",
    rainbow: "", 
    "rainbow-stop": "" 
  };

  if (variant === 'rainbow' || variant === 'rainbow-stop') {
    const isStop = variant === 'rainbow-stop';
    
    // Updated gradients to match Gold/Teal theme
    const generateSpinGradient = 'conic-gradient(from 0deg, #e2b36e, #ffffff, #b28e67, #ffffff, #e2b36e)'; 
    const generateInnerGradient = 'bg-gradient-to-r from-[#e2b36e] to-[#b28e67]';
    
    const stopSpinGradient = 'conic-gradient(from 0deg, #dc2626, #991b1b, #dc2626)';
    const stopInnerGradient = 'bg-gradient-to-r from-red-700 to-red-900';

    const currentSpinGradient = isStop ? stopSpinGradient : generateSpinGradient;
    const currentInnerGradient = isStop ? stopInnerGradient : generateInnerGradient;
    
    const textColorClass = isStop ? 'text-white' : 'text-[#09232b]';

    return (
      <button 
        className={`relative group rounded-xl ${className} ${isLoading ? 'opacity-90' : ''}`}
        disabled={isLoading && !isStop}
        {...props}
      >
        <style>{`
          @keyframes scan-light {
            0% { transform: translateX(-150%) skewX(-25deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(350%) skewX(-25deg); opacity: 0; }
          }
        `}</style>

        <div className={`absolute inset-0 rounded-xl transition-all duration-500 blur-lg ${isStop ? 'opacity-40 group-hover:opacity-60 bg-red-600' : 'opacity-40 group-hover:opacity-70 bg-[#e2b36e]'}`}>
             <div className="w-full h-full rounded-xl overflow-hidden relative">
                 <div className="absolute inset-0 flex items-center justify-center">
                     <div 
                       className="w-[150%] aspect-square animate-spin-slow flex-none" 
                       style={{ 
                         backgroundImage: currentSpinGradient,
                       }}
                     />
                </div>
             </div>
        </div>
        
        <div className="relative rounded-xl overflow-hidden p-[1.5px] transition-all duration-300">
            <div className="absolute inset-0 flex items-center justify-center">
                 <div 
                   className="w-[300%] aspect-square animate-spin-slow flex-none" 
                   style={{ 
                     backgroundImage: currentSpinGradient,
                   }}
                 />
            </div>
            
            <div className={`relative h-full w-full rounded-[10px] px-6 py-2 flex items-center justify-center gap-2 overflow-hidden font-bold tracking-wider shadow-inner z-10 transition-all duration-500 ${currentInnerGradient} ${!isStop && 'group-hover:brightness-110'} ${textColorClass}`}>
                
                {isStop && (
                    <div 
                      className="absolute inset-y-0 w-2/3 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                      style={{ animation: 'scan-light 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
                    ></div>
                )}
                
                <div className="relative z-10 flex items-center gap-2 transition-all duration-300">
                  {isLoading && !isStop ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#09232b]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : children}
                </div>
            </div>
        </div>
      </button>
    );
  }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : children}
    </button>
  );
});