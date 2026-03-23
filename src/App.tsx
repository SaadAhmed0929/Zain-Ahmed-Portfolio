import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun, ExternalLink, X } from 'lucide-react';

import { Certification } from './types';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Background } from './components/Background';
import { Navbar } from './components/Navbar';
import { ContactModal } from './components/ContactModal';
import { Contact } from './components/Contact';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { ProjectsPage } from './pages/ProjectsPage';
import { CertificationsPage } from './pages/CertificationsPage';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'projects' | 'certifications'>('home');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [isLightMode]);

  return (
    <div className="min-h-screen font-sans selection:bg-blue-500/30 selection:text-white bg-black">
      <CustomCursor />
      
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Background isLightMode={isLightMode} />
      
      <div className="absolute top-6 right-4 md:right-6 z-[60]">
        <button 
          onClick={() => setIsLightMode(!isLightMode)} 
          className={`relative flex items-center w-16 h-8 rounded-full p-1 transition-colors duration-300 ${isLightMode ? 'bg-zinc-200 border-zinc-300' : 'bg-zinc-800 border-white/10'} border shadow-lg`}
          aria-label="Toggle light mode"
        >
          <div className="absolute left-2 flex items-center justify-center text-zinc-400">
            <Moon size={14} />
          </div>
          <div className="absolute right-2 flex items-center justify-center text-zinc-500">
            <Sun size={14} />
          </div>
          <motion.div
            className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full shadow-md ${isLightMode ? 'bg-white text-yellow-500' : 'bg-zinc-950 text-blue-400'}`}
            animate={{ x: isLightMode ? 32 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {isLightMode ? <Sun size={14} /> : <Moon size={14} />}
          </motion.div>
        </button>
      </div>

      {currentPage === 'home' ? (
        <>
          <Navbar onContactClick={() => setIsContactOpen(true)} onProjectsClick={() => setCurrentPage('projects')} />
          <Home 
            onContactClick={() => setIsContactOpen(true)} 
            onProjectsClick={() => setCurrentPage('projects')} 
            onCertificationsClick={() => setCurrentPage('certifications')} 
            onCertClick={setSelectedCert}
            isLightMode={isLightMode} 
            isLoading={isLoading} 
          />
          <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
      ) : currentPage === 'projects' ? (
        <ProjectsPage onBack={() => setCurrentPage('home')} isLightMode={isLightMode} />
      ) : (
        <CertificationsPage onBack={() => setCurrentPage('home')} onCertClick={setSelectedCert} isLightMode={isLightMode} />
      )}

      {/* PDF Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[85vh] bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10 bg-zinc-900">
                <h3 className="text-xl font-bold text-white">{selectedCert.title}</h3>
                <div className="flex items-center gap-3">
                  <a 
                    href={selectedCert.pdf} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors text-sm font-medium"
                  >
                    <ExternalLink size={16} />
                    <span className="hidden sm:inline">Open in New Tab</span>
                  </a>
                  <button onClick={() => setSelectedCert(null)} className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors">
                    <X size={20} />
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full bg-zinc-950 relative">
                <object data={selectedCert.pdf} type="application/pdf" className="w-full h-full border-none">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-zinc-950">
                    <p className="text-zinc-400 mb-6">Your browser is blocking the embedded PDF viewer or doesn't support it.</p>
                    <a href={selectedCert.pdf} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                      <ExternalLink size={20} />
                      Open Certificate in New Tab
                    </a>
                  </div>
                </object>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollToTop />
    </div>
  );
};

export default App;
