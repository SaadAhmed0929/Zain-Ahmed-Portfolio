import React from 'react';
import { motion } from 'framer-motion';
import { DATA } from '../constants';
import { TimelineItem } from './TimelineItem';

export const ExperienceList = () => (
  <section id="experience" className="py-24 px-6 relative z-10">
    <div className="max-w-4xl mx-auto">
      {/* Explicitly using motion.h2 directly to control visibility more robustly */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-white mb-16 pl-6 border-l-4 border-blue-500"
      >
        Professional History
      </motion.h2>
      
      <div className="relative border-l border-zinc-800 ml-3 md:ml-6 space-y-2">
        {DATA.experience.map((exp, index) => (
           <TimelineItem key={exp.id} exp={exp} index={index} />
        ))}
      </div>
    </div>
  </section>
);
