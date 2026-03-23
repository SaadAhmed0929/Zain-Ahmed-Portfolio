import React from 'react';
import { Activity, GraduationCap, Layers } from 'lucide-react';
import { DATA } from '../constants';
import { FadeIn } from './FadeIn';
import { Card } from './Card';

export const BentoGrid = () => (
  <section id="about" className="py-24 px-6 relative z-10">
    <div className="max-w-6xl mx-auto">
      <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                    Core Competencies
                </h2>
                <p className="text-zinc-400 max-w-lg">
                    Combining academic rigor with practical application across thermal, structural, and fluid domains.
                </p>
            </div>
            <div className="hidden md:block h-px flex-1 bg-zinc-800 mx-8 mb-2"></div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
        
        {/* Focus Areas (Prominent Top Row) */}
        <FadeIn className="md:col-span-3 h-full">
            <Card className="h-full">
                <div className="p-8 h-full flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-inner">
                                <Activity className="text-green-400" size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Focus Areas</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-blue-500/30 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mb-4"></div>
                                <h4 className="text-white font-bold mb-2">Aerodynamics</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">Computational fluid dynamics and airflow optimization.</p>
                            </div>
                            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-red-500/30 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-red-500 mb-4"></div>
                                <h4 className="text-white font-bold mb-2">Thermodynamics</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">Heat transfer and thermal management systems.</p>
                            </div>
                            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-purple-500/30 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-purple-500 mb-4"></div>
                                <h4 className="text-white font-bold mb-2">Structural Integrity</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">Finite element analysis and stress testing.</p>
                            </div>
                            <div className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-yellow-500/30 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-yellow-500 mb-4"></div>
                                <h4 className="text-white font-bold mb-2">Turbomachinery</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">Rotating equipment and fluid machinery design.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </FadeIn>

        {/* Education Stack (Shifted to Bottom Right) */}
        <FadeIn className="md:col-span-1 h-full" delay={0.2}>
            <Card className="h-full">
                <div className="p-6 h-full flex flex-col justify-center gap-6 relative overflow-hidden group">
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-white border-b border-zinc-800 pb-4 mb-6">
                            <GraduationCap size={18} className="text-blue-400" />
                            <span className="font-bold">Education</span>
                        </div>
                        <div className="space-y-6">
                            {DATA.education.map((edu, i) => (
                                <div key={i}>
                                    <div className="text-sm font-bold text-white">{edu.degree}</div>
                                    <div className="text-xs text-zinc-500 mt-1">{edu.school}</div>
                                    <div className="text-xs text-blue-400 font-mono mt-1">{edu.grade}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </FadeIn>

        {/* Latest Role (Large Bottom Left) */}
        <FadeIn className="md:col-span-2 h-full" delay={0.1}>
            <Card className="h-full">
                <div className="p-8 h-full flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-zinc-800/50 rounded-lg border border-zinc-700"><Layers size={18} className="text-white"/></div>
                            <div>
                                <span className="text-xs text-zinc-500 uppercase tracking-wider block">Current Position</span>
                                <span className="font-bold text-white text-lg">{DATA.experience[0].role}</span>
                            </div>
                        </div>
                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-medium">
                            {DATA.experience[0].period}
                        </span>
                    </div>
                    <div className="pl-2 border-l-2 border-zinc-800">
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            {DATA.experience[0].description}
                        </p>
                    </div>
                </div>
            </Card>
        </FadeIn>
      </div>
    </div>
  </section>
);
