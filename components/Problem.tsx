import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Problem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a subtle parallax background effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="about" ref={containerRef} className="relative py-32 md:py-48 px-6 md:px-12 bg-[#020617] overflow-hidden">
      {/* Subtle blue gradient background to match reference */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#0f172a] to-transparent opacity-20 pointer-events-none" />
      <motion.div 
        style={{ y }}
        className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Headline */}
          <div className="w-full lg:w-3/5">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <span className="text-blue-500 font-['Space_Mono'] text-xs font-bold uppercase tracking-[0.2em]">
                    The Problem
                </span>
            </motion.div>

            <h2 className="text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] text-white mb-12">
              <motion.span 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="block font-['Oswald'] font-bold uppercase tracking-tight"
              >
                Most enterprise
              </motion.span>
              
              <div className="block">
                <motion.span 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="font-['Oswald'] font-bold uppercase tracking-tight mr-4"
                >
                    marketing
                </motion.span>
                <motion.span 
                    initial={{ opacity: 0, y: 50, rotate: 2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
                    className="font-serif-italic font-normal text-white/90"
                >
                    is noise.
                </motion.span>
              </div>
            </h2>

            <div className="flex flex-col gap-4">
                {[
                    "Impressions without impact.",
                    "Budget without accountability.",
                    "Data without direction."
                ].map((text, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 + (i * 0.1) }}
                        className="text-xl md:text-3xl text-neutral-400 font-['Manrope'] font-light"
                    >
                        {text}
                    </motion.div>
                ))}
            </div>
          </div>

          {/* Right Column: Description */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center pt-8 lg:pt-32">
             <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pl-0 lg:pl-12 lg:border-l lg:border-blue-900/30"
             >
                <p className="text-lg md:text-xl text-neutral-300 font-['Manrope'] leading-relaxed mb-8">
                    Enterprise organizations pour millions into digital channels and walk away with vanity metrics. Click-through rates. Reach. Engagement. None of it correlates with pipeline, revenue, or growth.
                </p>
                
                <p className="text-lg md:text-xl text-neutral-300 font-['Manrope'] leading-relaxed mb-12">
                    The problem is not budget. It’s the absence of a system built specifically to turn digital attention into measurable business outcomes.
                </p>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="inline-block"
                >
                    <span className="text-white font-bold text-xl border-b-2 border-blue-500 pb-1">
                        That’s exactly what we built.
                    </span>
                </motion.div>
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};