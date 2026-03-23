import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { DATA } from '../constants';
import { InteractiveMesh } from '../components/InteractiveMesh';
import { ProjectImageBlock } from '../components/ProjectImageBlock';

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

export const ProjectsPage = ({ onBack, isLightMode }: { onBack: () => void, isLightMode: boolean }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-[#0a0a0a] h-screen w-full overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-10">
      {/* Background Animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <InteractiveMesh isLightMode={isLightMode} />
      </motion.div>

      {/* Back Button */}
      <button 
        onClick={onBack}
        className="fixed top-8 left-6 md:left-12 z-50 group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mix-blend-difference"
      >
        <ArrowRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium tracking-widest text-sm uppercase">Back</span>
      </button>

      <div className="flex flex-col lg:flex-row w-full min-h-screen pb-32">
        {/* Left Side: Scrolling Images */}
        <div className="w-full lg:w-[55%] flex flex-col px-6 md:px-12 lg:pl-24 lg:pr-12">
          {DATA.projects.map((project, index) => (
            <ProjectImageBlock 
              key={project.id} 
              project={project} 
              index={index} 
              onInView={setActiveIndex} 
            />
          ))}
        </div>

        {/* Right Side: Sticky Text */}
        <div className="w-full lg:w-[45%] lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center px-6 md:px-12 lg:pr-24 lg:pl-12 py-12 lg:py-0 pointer-events-none">
          <div className="w-full max-w-lg pointer-events-auto">
            {/* Header */}
            <div className="mb-10 hidden lg:block">
              <div className="flex justify-between items-end mb-3">
                <span className="text-xl tracking-tight text-white uppercase font-bold">Projects</span>
                <a 
                  href="/Zain_Ahmed_Projects.pdf"
                  download="Zain_Ahmed_Projects.pdf"
                  className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
                >
                  <span className="font-mono text-xs uppercase tracking-widest">Download Info</span>
                  <Download size={14} className="group-hover:translate-y-1 transition-transform" />
                </a>
              </div>
              <div className="h-px w-full bg-zinc-800"></div>
            </div>

            <div className="flex items-center gap-4 mb-4 text-blue-500/60 font-mono text-xs tracking-[0.3em]">
              <span>[</span>
              <span className="text-blue-400">0{activeIndex + 1}</span>
              <span>/</span>
              <span>0{DATA.projects.length}</span>
              <span>]</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-start"
              >
                <div className="mb-5">
                  <span className={`px-4 py-1.5 border rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${getFocusAreaColor(DATA.projects[activeIndex].focusArea)}`}>
                      {DATA.projects[activeIndex].focusArea}
                  </span>
                </div>
                <h2 className="text-4xl xl:text-5xl font-bold text-white tracking-tight mb-3 uppercase">
                  {DATA.projects[activeIndex].title}
                </h2>
                
                <div className="text-blue-400 font-medium mb-6 text-base flex items-center gap-3">
                  <span className="h-px w-6 bg-blue-500/50"></span>
                  {DATA.projects[activeIndex].category}
                </div>
                
                <p className="text-zinc-400 text-base leading-relaxed mb-6">
                  {DATA.projects[activeIndex].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {DATA.projects[activeIndex].specs.map(spec => (
                    <span key={spec} className="px-3 py-1.5 text-[10px] border border-blue-500/20 rounded-full text-blue-300/80 bg-blue-500/5 font-mono group-hover:border-blue-500/40 transition-colors">
                      {spec}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Projects Page Footer - Fixed */}
      <div className="fixed bottom-0 left-0 w-full z-50 px-6 md:px-12 lg:px-24 pb-8 pt-4 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent">
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
              <Github size={16} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors">
              <Linkedin size={16} />
            </a>
            <a href="mailto:zain@example.com" className="text-zinc-500 hover:text-emerald-400 transition-colors">
              <Mail size={16} />
            </a>
          </div>
          <div className="text-zinc-500 text-[9px] font-mono tracking-[0.2em] uppercase">
            © ALL RIGHTS RESERVED ZAIN AHMED
          </div>
        </div>
      </div>
    </div>
  );
};
