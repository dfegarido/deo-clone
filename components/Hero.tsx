import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './ui/Button';

interface HeroProps {
  onGetInTouch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetInTouch }) => {
  const { scrollY } = useScroll();
  // Parallax y-axis
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  // Subtle Zoom on scroll
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  // Opacity fade
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#041210]">
      {/* Background */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0 bg-[#041210]"
      >
        {/* Noise Texture Overlay for Premium Feel */}
        <div 
            className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
            }}
        />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="mb-4 overflow-hidden">
             <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-block px-3 py-1 border border-white/30 rounded-full text-xs font-['Space_Mono'] font-bold uppercase tracking-wider text-white/80 backdrop-blur-md"
             >
                Performance Growth Partner
             </motion.span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] leading-[0.9] font-bold font-['Oswald'] uppercase tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-[#e8d5a3] via-white to-[#a8e6cf]">
            Own the Inbox.<br />Scale With Precision.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/80 font-['Manrope'] font-light tracking-wide leading-relaxed">
            We are a performance-driven email and data infrastructure partner built for brands that demand measurable growth.
          </p>
          <div className="flex justify-center">
            <Button onClick={onGetInTouch}>Get In Touch</Button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] font-['Space_Mono'] uppercase tracking-[0.2em] text-gray-500">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
      </motion.div>
    </section>
  );
};