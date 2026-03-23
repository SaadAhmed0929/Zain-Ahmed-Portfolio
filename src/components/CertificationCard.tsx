import React from 'react';
import { Certification } from '../types';

export const CertificationCard = ({ cert, index, onClick }: { cert: Certification; index: number; onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="group relative rounded-2xl p-[1px] overflow-hidden cursor-pointer h-full bg-zinc-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
  >
    {/* Animated Border Line */}
    <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#3b82f6_100%)] animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    {/* Inner Card */}
    <div className="relative h-full w-full rounded-[15px] bg-zinc-950 flex flex-col p-6">
      {/* Large Number Watermark */}
      <div className="absolute top-4 right-4 text-6xl font-bold text-white/5 font-mono select-none pointer-events-none">
          {`0${index + 1}`}
      </div>
      <div className="flex flex-col flex-1 z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="text-blue-400 text-xs font-mono uppercase tracking-wider">{cert.date}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2 leading-tight">
          {cert.title}
        </h3>
        <p className="text-zinc-400 text-sm mt-auto">
          {cert.issuer}
        </p>
      </div>
    </div>
  </div>
);
