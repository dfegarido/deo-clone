import React from 'react';
import { motion } from 'framer-motion';

interface FooterProps {
  onBecomePartner: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBecomePartner }) => {
  return (
    <footer id="contact" className="bg-[#041210] text-white pt-32 pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="container mx-auto flex flex-col items-center text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-['Oswald'] font-bold uppercase tracking-tighter mb-8 leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#C4A24B] via-[#3d8b6e] to-[#2D5F52]"
        >
          Grow with Evolutra
        </motion.h2>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-400 font-['Manrope'] max-w-xl mb-12"
        >
          Let's build a smarter growth engine for your brand.
        </motion.p>

        {/* Apply Now Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-24"
        >
          <button
            type="button"
            onClick={onBecomePartner}
            className="group inline-flex items-center gap-3 bg-[#C4A24B] hover:bg-[#2D5F52] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(196,162,75,0.4)]"
          >
            <svg width="24" height="18" viewBox="0 0 63 49" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M48 27H0.5V22H62.5V27C46.5 27 42.8333 41.3333 43 49H37.5C37.5 34.2 44.1667 28.5 48 27Z" fill="currentColor" />
              <path d="M48 22H0.5V27H62.5V22C46.5 22 42.8333 7.66667 43 0H37.5C37.5 14.8 44.1667 20.5 48 22Z" fill="currentColor" />
            </svg>
            <span>Become a Partner</span>
          </button>
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12 text-sm text-gray-500 font-['Space_Mono'] uppercase tracking-wider">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <h4 className="text-white font-bold mb-2 font-['Oswald'] tracking-widest">Contact</h4>
            <a href="mailto:hello@evolutra.com" className="hover:text-white transition-colors">hello@evolutra.com</a>
            <a href="tel:+15550000000" className="hover:text-white transition-colors">+1 (555) 000-0000</a>
          </div>
          
          <div className="flex flex-col gap-2 items-center">
            <h4 className="text-white font-bold mb-2 font-['Oswald'] tracking-widest">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center md:items-end">
             <h4 className="text-white font-bold mb-2 font-['Oswald'] tracking-widest">Legal</h4>
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

        <div className="mt-20 text-neutral-800 text-[10px] font-['Space_Mono'] uppercase tracking-widest">
          © {new Date().getFullYear()} Evolutra. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};