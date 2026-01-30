import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

// Optimized with React.memo to prevent re-renders
export const GlassCard: React.FC<GlassCardProps> = React.memo(({ children, className = '' }) => {
  return (
    <div 
      className={`
        bg-[#0f172a]/40 
        backdrop-blur-2xl 
        border border-white/10 
        shadow-[0_0_25px_-5px_rgba(255,255,255,0.1)]
        rounded-2xl
        ${className}
      `}
    >
      {children}
    </div>
  );
});