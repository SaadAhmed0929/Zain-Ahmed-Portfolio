import React from 'react';
import { Project } from '../types';

const getFocusAreaColor = (area: string) => {
  switch (area) {
    case 'Aerodynamics':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]';
    case 'Thermodynamics':
      return 'bg-red-500/20 text-red-400 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
    case 'Structural Integrity':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]';
    case 'Turbomachinery':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]';
    default:
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]';
  }
};

export const ProjectCard = ({ project, index }: { project: Project, index: number }) => (
  <div className="group relative h-[450px] w-full rounded-3xl p-[1px] overflow-hidden">
      {/* Animated Border */}
      <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#3b82f6_100%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
      
      {/* Inner Card */}
      <div className="relative h-full w-full overflow-hidden rounded-[23px] bg-zinc-900 border border-white/10 group-hover:border-transparent transition-colors duration-300">
          {/* Background Image */}
          <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${project.image})` }}
          />
          
          {/* Dark Overlay - Gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 transition-opacity duration-500 group-hover:from-black/95 group-hover:via-black/60" />
          
          {/* Content Container */}
          <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
              {/* Focus Area Tag */}
              <div className="absolute top-8 left-8">
                  <span className={`px-4 py-1.5 border rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${getFocusAreaColor(project.focusArea)}`}>
                      {project.focusArea}
                  </span>
              </div>

              {/* Large Number Watermark */}
              <div className="absolute top-8 right-8 text-8xl font-bold text-white/5 font-mono select-none transition-all duration-500 group-hover:text-white/10 group-hover:scale-110 pointer-events-none">
                  {`0${index + 1}`}
              </div>

              <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="text-blue-400 text-xs font-mono mb-2 uppercase tracking-widest">{project.category}</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
                      {project.title}
                  </h3>
                  
                  <p className="text-zinc-300 max-w-md text-sm leading-relaxed mb-6 opacity-90 border-l-2 border-blue-500 pl-4">
                      {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                      {project.specs.map(spec => (
                          <span key={spec} className="px-3 py-1 text-xs border border-white/20 rounded-full text-white/80 backdrop-blur-md bg-white/5 font-mono">
                              {spec}
                          </span>
                      ))}
                  </div>
              </div>
          </div>
      </div>
  </div>
);
