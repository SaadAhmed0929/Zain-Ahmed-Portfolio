import React from 'react';
import { SKILLS } from '../constants';
import { FadeIn } from './FadeIn';
import { Card } from './Card';

export const Skills = () => (
    <section id="skills" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
             <FadeIn className="mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                    Technical Arsenal
                </h2>
                <p className="text-zinc-400 max-w-2xl mx-auto">
                    A comprehensive toolkit of industry-standard software and programming languages mastered over years of academic and practical application.
                </p>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SKILLS.map((skillGroup, idx) => (
                    <FadeIn key={idx} delay={idx * 0.1} className="h-full">
                        <Card className="h-full">
                            <div className="p-6 h-full">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700">
                                        {skillGroup.icon}
                                    </div>
                                    <h3 className="font-bold text-white text-sm">{skillGroup.category}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {skillGroup.items.map((item) => (
                                        <span key={item} className="px-2.5 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors cursor-default">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </FadeIn>
                ))}
            </div>
        </div>
    </section>
);
