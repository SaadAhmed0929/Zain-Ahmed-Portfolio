import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import { DATA } from '../constants';
import { FadeIn } from './FadeIn';

export const Contact = () => (
  <footer id="contact" className="pt-24 border-t border-zinc-900 bg-black relative overflow-hidden flex flex-col items-center">
     {/* Bottom Glow */}
     <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-900/20 blur-[100px] rounded-full opacity-30 pointer-events-none"></div>

    <div className="max-w-4xl mx-auto text-center relative z-10 px-6 w-full">
      <FadeIn>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">
            Ready to optimize your designs?
        </h2>
        <p className="text-zinc-400 mb-10 max-w-xl mx-auto">
            Reach out for collaboration on simulation projects, research, or thermal analysis consulting.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-20">
            <a href={`mailto:${DATA.social.email}`} className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                <Mail size={18} /> {DATA.social.email}
            </a>
            <div className="flex gap-4">
                <a href={DATA.social.linkedin} className="p-4 rounded-full bg-zinc-900 text-white border border-zinc-800 hover:border-blue-500 hover:text-blue-400 transition-colors">
                    <Linkedin size={20} />
                </a>
                <a href={DATA.social.github} className="p-4 rounded-full bg-zinc-900 text-white border border-zinc-800 hover:border-white transition-colors">
                    <Github size={20} />
                </a>
            </div>
        </div>
      </FadeIn>
      
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 border-t border-zinc-900 pt-8 pb-8">
        <div className="mb-4 md:mb-0">© {new Date().getFullYear()} Zain Ahmed. All rights reserved.</div>
        <div className="flex gap-4">
            <span>Lahore, PK</span>
            <span>Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Karachi' })}</span>
        </div>
      </div>
    </div>

    {/* Massive Footer Text */}
    <div className="w-full overflow-hidden flex justify-center mt-8 pointer-events-none select-none">
      <h1 className="text-[22vw] font-display font-bold text-zinc-800/40 leading-[0.75] tracking-normal uppercase translate-y-[28%]">
        ZAIN AHMED
      </h1>
    </div>
  </footer>
);
