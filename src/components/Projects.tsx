import React from 'react';
import { DATA } from '../constants';
import { FadeIn } from './FadeIn';
import { ProjectCard } from './ProjectCard';
import { ArrowRight } from 'lucide-react';

export const Projects = ({ onMoreClick }: { onMoreClick: () => void }) => (
  // Removed bg-black to allow global background
  <section id="projects" className="py-24 px-6 relative z-10">
    <div className="max-w-6xl mx-auto">
      <FadeIn className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">Featured Projects</h2>
          <p className="text-zinc-400 max-w-2xl text-lg">
              A selection of technical problems solved through simulation, analysis, and engineering principles.
          </p>
        </div>
        <button 
          onClick={onMoreClick}
          className="group relative flex items-center justify-center rounded-full overflow-hidden p-[1px] transition-all"
        >
          <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#3b82f6_100%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
          <div className="relative flex items-center gap-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 group-hover:border-transparent px-6 py-3 rounded-full w-full h-full z-10 transition-colors">
            <span className="font-medium text-zinc-400 group-hover:text-white transition-colors">Discover more projects</span>
            <ArrowRight size={16} className="text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </button>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {DATA.projects.slice(0, 2).map((project, index) => (
          <FadeIn key={project.id} delay={index * 0.1}>
            <ProjectCard project={project} index={index} />
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);
