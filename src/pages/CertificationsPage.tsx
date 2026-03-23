import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { DATA } from '../constants';
import { InteractiveMesh } from '../components/InteractiveMesh';
import { FadeIn } from '../components/FadeIn';
import { Certification } from '../types';
import { Contact } from '../components/Contact';

export const CertificationsPage = ({ onBack, onCertClick, isLightMode }: { onBack: () => void, onCertClick: (cert: Certification) => void, isLightMode: boolean }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-8 relative z-10 bg-black">
      {/* Background Animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <InteractiveMesh isLightMode={isLightMode} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pb-24">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </button>

        <FadeIn className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-6">Certifications</h1>
          <p className="text-zinc-400 max-w-2xl text-xl">
              A complete record of my professional certifications and continuous learning achievements.
          </p>
        </FadeIn>

        <div className="w-full border-t border-white/10">
          {DATA.certifications.map((cert, index) => (
            <FadeIn key={cert.id} delay={index * 0.1}>
              <div 
                onClick={() => onCertClick(cert)}
                className="group relative border-b border-white/10 py-12 md:py-16 px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/[0.02] transition-colors cursor-pointer overflow-hidden"
              >
                  {/* Animated Bottom Border */}
                  <div className="absolute bottom-0 left-0 h-[1px] bg-blue-500 w-full scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-20"></div>
                  
                  <div className="relative z-10 flex-1 md:w-1/2">
                      <div className="flex items-center gap-4 mb-4">
                          <span className="text-blue-500/40 font-mono text-sm">{`0${index + 1}`}</span>
                          <div className="h-px w-8 bg-blue-500/20"></div>
                          <span className="text-blue-400 text-xs font-mono uppercase tracking-widest">{cert.issuer}</span>
                      </div>
                      <h3 className="text-4xl md:text-6xl font-bold text-white group-hover:translate-x-4 transition-transform duration-500 tracking-tight">
                          {cert.title}
                      </h3>
                  </div>

                  <div className="relative z-10 mt-6 md:mt-0 md:w-1/3 md:text-right flex flex-col md:items-end">
                      <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-md group-hover:text-zinc-300 transition-colors">
                          {cert.description}
                      </p>
                      <div className="flex flex-wrap gap-2 md:justify-end">
                          {cert.skills.map(skill => (
                              <span key={skill} className="px-3 py-1 text-xs border border-blue-500/20 rounded-full text-blue-300/80 backdrop-blur-md bg-blue-500/5 font-mono group-hover:border-blue-500/40 transition-colors">
                                  {skill}
                              </span>
                          ))}
                      </div>
                  </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <Contact />
    </div>
  );
};
