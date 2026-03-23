import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
    return (
        <div className={`group relative rounded-3xl border border-white/10 bg-zinc-900/50 p-1 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-900/10 ${className}`}>
             {/* Gradient glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Inner Content */}
            <div className="relative h-full w-full rounded-[20px] bg-black/40 backdrop-blur-sm overflow-hidden">
                {children}
            </div>
        </div>
    );
}
