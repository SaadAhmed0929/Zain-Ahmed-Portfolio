import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Download, Loader2 } from 'lucide-react';
import { DATA } from '../constants';
import { InteractiveMesh } from './InteractiveMesh';

export const Hero = ({ onContactClick, onProjectsClick, isLightMode, isLoading }: { onContactClick: () => void, onProjectsClick: () => void, isLightMode: boolean, isLoading: boolean }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownloadCV = () => {
    if (isDownloading || downloadComplete) return;
    setIsDownloading(true);
    // Simulate download
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadComplete(true);
      // Reset after a while
      setTimeout(() => setDownloadComplete(false), 3000);
    }, 2000);
  };

  return (
    <section className="min-h-screen flex flex-col pt-24 pb-16 md:pb-24 px-6 relative overflow-hidden">
      {/* 3D Mesh Animation Background */}
      <InteractiveMesh isLightMode={isLightMode} />
      
      <div className="flex-1 flex flex-col justify-center z-10 w-full max-w-[1400px] mx-auto relative">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-start relative top-8 md:top-12"
        >
            <h1 className={`text-[16vw] md:text-[13vw] font-display tracking-normal leading-[0.85] uppercase m-0 blueprint-text-white ${!isLoading ? 'blueprint-ready' : ''}`}>
              ENGINEERING
              <div className="blueprint-text-crosshair" style={{ left: '15%' }}>
                <div className="absolute" style={{ top: '50%', left: '50%', width: '4vw', height: '1px', transform: 'translate(-50%, -50%) rotate(-45deg)' }}>
                  <div className="blueprint-angled-line w-full h-full" style={{ background: 'rgba(255,255,255,0.4)' }}></div>
                  <span className="blueprint-label font-display text-[10px] md:text-sm tracking-wider" style={{ left: '100%', top: '50%', transform: 'translate(4px, -50%) rotate(45deg)', color: 'white', WebkitTextStroke: '0px' }}>ø 1.7 CM</span>
                </div>
              </div>
              <div className="blueprint-text-crosshair" style={{ left: '85%' }}></div>
              <div className="absolute" style={{ top: '-15%', left: '0', right: '0', height: '1px' }}>
                <div className="blueprint-dim-h w-full h-full"></div>
                <span className="blueprint-label font-display text-[10px] md:text-sm tracking-wider" style={{ left: '50%', top: '50%', color: 'white', WebkitTextStroke: '0px' }}>14.0 CM</span>
              </div>
              <div className="absolute" style={{ top: '0', bottom: '0', left: '-5%', width: '1px' }}>
                <div className="blueprint-dim-v w-full h-full"></div>
                <span className="blueprint-label font-display text-[10px] md:text-sm tracking-wider" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%) rotate(-90deg)', color: 'white', WebkitTextStroke: '0px' }}>4.5 CM</span>
              </div>
            </h1>
            <h1 className={`text-[16vw] md:text-[13vw] font-display tracking-normal leading-[0.85] uppercase m-0 blueprint-text-blue ${!isLoading ? 'blueprint-ready' : ''}`}>
              SIMULATED
              <div className="blueprint-text-crosshair" style={{ left: '25%' }}></div>
              <div className="blueprint-text-crosshair" style={{ left: '75%' }}></div>
              <div className="absolute" style={{ bottom: '-15%', left: '10%', right: '10%', height: '1px' }}>
                <div className="blueprint-dim-h w-full h-full"></div>
                <span className="blueprint-label font-display text-[10px] md:text-sm tracking-wider" style={{ left: '50%', top: '50%', color: '#3b82f6', WebkitTextStroke: '0px' }}>9.5 CM</span>
              </div>
              <div className="absolute" style={{ top: '20%', left: '25%', width: '4vw', height: '1px', transform: 'rotate(-45deg)', transformOrigin: 'left center' }}>
                <div className="blueprint-angled-line w-full h-full" style={{ background: 'rgba(59,130,246,0.4)' }}></div>
                <span className="blueprint-label font-display text-[10px] md:text-sm tracking-wider" style={{ left: '100%', top: '50%', transform: 'translate(0, -50%) rotate(45deg)', color: '#3b82f6', WebkitTextStroke: '0px' }}>R 3.3 CM</span>
              </div>
            </h1>
        </motion.div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto z-10 flex flex-col md:flex-row justify-end items-end mt-4 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-sm flex flex-col items-start md:items-end text-left md:text-right"
        >
          <div className="text-sm md:text-xl font-sans font-bold text-zinc-400 tracking-[0.3em] uppercase whitespace-nowrap mb-4">
            {DATA.name}
          </div>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
            I'm {DATA.name}, a {DATA.title} turning complex physics into precise engineering solutions through advanced simulations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-start md:justify-end w-full">
            <button 
              onClick={onProjectsClick} 
              className="group relative w-full sm:w-auto flex items-center justify-center rounded-full overflow-hidden p-[1px] transition-all"
            >
              <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#3b82f6_100%)] animate-[spin_4s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              <div className="relative flex items-center justify-center gap-2 bg-white hover:bg-zinc-950 border border-white group-hover:border-transparent px-4 md:px-8 py-3 md:py-4 rounded-full w-full h-full z-10 transition-colors text-black hover:text-white font-bold text-xs md:text-base whitespace-nowrap">
                VIEW PROJECTS <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
              </div>
            </button>
            <a 
              href="/Zain_Ahmed_CV.pdf"
              download="Zain_Ahmed_CV.pdf"
              onClick={handleDownloadCV} 
              className={`w-full sm:w-auto px-4 md:px-8 py-3 md:py-4 rounded-full border transition-all flex items-center justify-center gap-2 font-medium min-w-0 md:min-w-[180px] text-xs md:text-base whitespace-nowrap
                ${downloadComplete 
                  ? 'bg-green-500/20 border-green-500 text-green-400' 
                  : isDownloading
                    ? 'bg-zinc-800 border-zinc-700 text-zinc-300 pointer-events-none'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:bg-white hover:text-black hover:border-white'
                }`}
            >
              {downloadComplete ? (
                <>Downloaded <Check size={16} className="md:w-[18px] md:h-[18px]" /></>
              ) : isDownloading ? (
                <>Downloading... <Loader2 size={16} className="animate-spin md:w-[18px] md:h-[18px]" /></>
              ) : (
                <>Download CV <Download size={16} className="md:w-[18px] md:h-[18px]" /></>
              )}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
