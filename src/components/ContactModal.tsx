import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, ArrowRight } from 'lucide-react';
import { Badge } from './Badge';

export const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const resetForm = () => {
    setIsSuccess(false);
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[70] m-auto w-full max-w-lg h-fit max-h-[90vh] overflow-y-auto bg-zinc-900 border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
             <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                <X size={18} />
             </button>

             {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-2">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                           <Send size={32} />
                        </motion.div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Message Sent Successfully</h3>
                    <p className="text-zinc-400 max-w-xs">Thank you for reaching out. I will review your message and get back to you shortly.</p>
                    <button onClick={resetForm} className="mt-6 px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-colors">
                        Close
                    </button>
                </div>
             ) : (
                <>
                    <div className="mb-8">
                        <Badge>Contact</Badge>
                        <h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
                        <p className="text-zinc-400">Have a project in mind? Let's discuss how we can work together.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-3.5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 pl-12 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-zinc-700" placeholder="Your Name" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input required type="email" className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 pl-12 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-zinc-700" placeholder="your@email.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">Message</label>
                            <textarea required rows={4} className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-zinc-700 resize-none" placeholder="Tell me about your project..."></textarea>
                        </div>

                        <button 
                            disabled={isSubmitting}
                            className="w-full py-4 bg-white hover:bg-zinc-200 text-black font-bold rounded-2xl mt-2 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                        >
                            {isSubmitting ? "Sending..." : <>Send Message <ArrowRight size={18} /></>}
                        </button>
                    </form>
                </>
             )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
