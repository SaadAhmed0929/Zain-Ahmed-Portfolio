import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedCounter } from './AnimatedCounter';

export const Stats = () => {
  const stats = [
    { value: "3+", label: "YEARS EXPERIENCE", desc: "Specializing in computational fluid dynamics and thermal analysis." },
    { value: "20+", label: "PROJECTS DELIVERED", desc: "Successful engineering simulations and optimization studies." },
    { value: "15%", label: "EFFICIENCY GAIN", desc: "Average performance improvement in optimized thermal systems." },
    { value: "100%", label: "SATISFACTION", desc: "Consistently meeting high-precision engineering standards." }
  ];

  return (
    <section className="py-24 relative z-10">
      {/* Glowing Separator Lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-[4px] opacity-20"></div>
      
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-[4px] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="flex flex-col items-start text-left">
                <div className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-blue-500 font-bold text-xs tracking-[0.2em] uppercase mb-3">
                  {stat.label}
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-[240px]">
                  {stat.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
