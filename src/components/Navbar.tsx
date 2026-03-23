import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = ({ onContactClick, onProjectsClick }: { onContactClick: () => void, onProjectsClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Career', href: '#experience' },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`
          flex items-center gap-2 p-2 rounded-full border transition-all duration-300
          ${isScrolled 
            ? 'bg-zinc-900/80 border-zinc-800 backdrop-blur-xl shadow-lg shadow-black/50' 
            : 'bg-zinc-900/50 border-white/10 backdrop-blur-md'
          }
        `}
      >
        <div className="px-4 py-1">
            <span className="font-bold text-white tracking-tight">
                {isScrolled ? "Zain" : "Zain Ahmed"}
                <span className="text-blue-500">.</span>
            </span>
        </div>

        <div className="hidden md:flex items-center">
            {navLinks.map((link) => (
              link.name === 'Projects' ? (
                <button
                  key={link.name}
                  onClick={onProjectsClick}
                  className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                >
                  {link.name}
                </button>
              ) : (
                <a 
                    key={link.name} 
                    href={link.href} 
                    className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
                >
                    {link.name}
                </a>
              )
            ))}
        </div>

        <div className="flex items-center gap-2 pr-1">
             <button onClick={onContactClick} className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition-colors">
                Contact
             </button>
             <button 
                className="md:hidden p-2 text-zinc-300 bg-zinc-800 rounded-full"
                onClick={() => setIsMobileMenuOpen(true)}
             >
                <Menu size={18} />
             </button>
        </div>
      </motion.nav>

       {/* Mobile Menu Overlay */}
       <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-x-4 top-20 z-[60] bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-2xl flex flex-col gap-2 origin-top"
          >
             <div className="flex justify-between items-center mb-4 px-2">
                <span className="text-sm font-mono text-zinc-500">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-400 p-1 bg-zinc-800 rounded-full">
                    <X size={16} />
                </button>
             </div>
            {navLinks.map((link) => (
              link.name === 'Projects' ? (
                <button
                  key={link.name}
                  onClick={() => { setIsMobileMenuOpen(false); onProjectsClick(); }}
                  className="p-3 text-left text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors text-lg font-medium w-full"
                >
                  {link.name}
                </button>
              ) : (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors text-lg font-medium"
                >
                  {link.name}
                </a>
              )
            ))}
            <button onClick={() => { setIsMobileMenuOpen(false); onContactClick(); }} className="mt-2 p-3 text-center bg-blue-600 text-white rounded-xl font-medium w-full">
                Contact Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
