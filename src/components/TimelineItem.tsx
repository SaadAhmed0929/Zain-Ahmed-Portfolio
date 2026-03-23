import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { Experience } from '../types';

export const TimelineItem: React.FC<{ exp: Experience; index: number }> = ({ exp, index }) => {
  return (
    <motion.div 
       initial={{ opacity: 0, x: -20 }}
       whileInView={{ opacity: 1, x: 0 }}
       viewport={{ once: true, margin: "-50px" }}
       transition={{ duration: 0.5, delay: index * 0.1 }}
       className="relative pl-8 md:pl-12 py-6 group"
    >
       {/* Dot */}
       <div className="absolute -left-[5px] top-8 w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-600 group-hover:bg-blue-500 group-hover:border-blue-400 group-hover:scale-150 transition-all duration-300 shadow-[0_0_0_4px_rgba(0,0,0,1)] z-10">
          <div className="absolute inset-0 rounded-full bg-blue-500 opacity-0 group-hover:animate-ping"></div>
       </div>

       {/* Content */}
       <div className="transition-transform duration-300 group-hover:-translate-y-1.5">
         <div className="flex flex-col sm:flex-row gap-4 sm:items-baseline justify-between mb-2">
             <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{exp.role}</h3>
             <span className="text-sm font-mono text-zinc-500 bg-zinc-900/50 px-3 py-1 rounded-full border border-zinc-800 group-hover:border-blue-500/30 transition-colors">{exp.period}</span>
         </div>
         <div className="text-zinc-400 font-semibold mb-4 flex items-center gap-2">
           <Briefcase size={14} className="text-blue-500" />
           {exp.company} 
         </div>
         <p className="text-zinc-400 leading-relaxed text-sm max-w-2xl group-hover:text-zinc-300 transition-colors">
           {exp.description}
         </p>
       </div>
    </motion.div>
  )
}
