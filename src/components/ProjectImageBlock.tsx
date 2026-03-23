import React, { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { Project } from '../types';

export const ProjectImageBlock = ({ project, index, onInView }: { project: Project, index: number, onInView: (index: number) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  return (
    <div className="h-screen w-full flex items-center justify-center snap-center snap-always">
      <div ref={ref} className="w-[90%] max-w-4xl aspect-video relative group">
        {/* Sketchy border effect */}
        <div className="absolute -inset-3 md:-inset-4 border border-white/20 rounded-sm transform -rotate-1 pointer-events-none hidden md:block transition-transform duration-700 group-hover:-rotate-2" />
        <div className="absolute -inset-3 md:-inset-4 border border-white/20 rounded-sm transform rotate-1 pointer-events-none hidden md:block transition-transform duration-700 group-hover:rotate-2" />
        
        <div className="w-full h-full rounded-sm overflow-hidden border border-white/10 relative bg-zinc-900 shadow-2xl">
          <img 
            src={project.image} 
            alt={project.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>
      </div>
    </div>
  );
};
