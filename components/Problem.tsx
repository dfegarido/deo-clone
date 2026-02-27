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
    <section id="about" ref={containerRef} className="relative py-20 sm:py-28 md:py-36 lg:py-48 px-6 md:px-12 bg-[#04120e] overflow-hidden">
      {/* Subtle blue gradient background to match reference */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#0d2219] to-transparent opacity-20 pointer-events-none" />
      <motion.div 
        style={{ y }}
        className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] bg-[#2D5F52]/10 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24">
          
          {/* Left Column: Headline */}
          <div className="w-full md:w-3/5">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <span className="text-[#C4A24B] font-['Space_Mono'] text-xs font-bold uppercase tracking-[0.2em]">
                    [ The Problem ]
                </span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white mb-8 md:mb-12">
              <motion.span 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="block font-['Oswald'] font-bold uppercase tracking-tight"
              >
                Email Still
              </motion.span>
              
              <motion.span 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="block font-['Oswald'] font-bold uppercase tracking-tight"
              >
                  Outperforms
              </motion.span>

              <motion.span 
                  initial={{ opacity: 0, y: 50, rotate: 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
                  className="block font-serif-italic font-normal text-white/90"
              >
                  Every Channel.
              </motion.span>
            </h2>

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-neutral-400 font-['Manrope'] font-light"
            >
                While platforms shift and costs rise, email remains the highest-ROI digital channel.
            </motion.div>
          </div>

          {/* Right Column: Description */}
          <div className="w-full md:w-2/5 flex flex-col justify-center pt-4 md:pt-16 lg:pt-32">
             <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pl-0 md:pl-8 lg:pl-12 md:border-l md:border-[#2D5F52]/30"
             >
                <ul className="text-base md:text-lg lg:text-xl text-neutral-300 font-['Manrope'] leading-relaxed mb-8 md:mb-12 flex flex-col gap-3 md:gap-4">
                    {[
                        "Higher intent than social",
                        "Direct audience access",
                        "Full creative control",
                        "Measurable performance",
                        "Lower CAC at scale",
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-[#C4A24B] shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>

                <p className="text-base md:text-lg lg:text-xl text-neutral-300 font-['Manrope'] leading-relaxed mb-8 md:mb-12">
                    Email isn't just a channel.<br />
                    It's infrastructure.
                </p>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="inline-block"
                >
                    <span className="text-white font-bold text-base md:text-lg lg:text-xl border-b-2 border-[#C4A24B] pb-1">
                        And we've built ours for scale.
                    </span>
                </motion.div>
             </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};