import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Problem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="about" ref={containerRef} className="relative py-20 sm:py-28 md:py-36 lg:py-48 px-6 md:px-12 bg-[#041814] overflow-hidden">
      {/* Overlay + Blur — matches spec: left 66.52%, right -25%, top -55.58%, bottom 43.97% */}
      <motion.div 
        className="absolute pointer-events-none"
        style={{
          left: '66.52%',
          right: '-25%',
          top: '-55.58%',
          bottom: '43.97%',
          background: 'rgba(45, 95, 82, 0.1)',
          filter: 'blur(60px)',
          borderRadius: '9999px',
          y,
        }}
      />

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24">
          
          {/* Left Column: Headline */}
          <div className="w-full md:w-3/5">
            <h2 className="mb-8 md:mb-12">
              {/* "Email Outperforms" — gradient per spec */}
              <motion.span 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="block font-['DM_Sans'] text-[1.875rem] sm:text-[2.5rem] md:text-[3.4rem] lg:text-[4.6875rem] font-bold uppercase leading-[1em] text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(180deg, #A8EAC5 0%, #EFE9E9 100%)' }}
              >
                Email
              </motion.span>
              
              <motion.span 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="block font-['DM_Sans'] text-[1.875rem] sm:text-[2.5rem] md:text-[3.4rem] lg:text-[4.6875rem] font-bold uppercase leading-[1em] text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(180deg, #A8EAC5 0%, #EFE9E9 100%)' }}
              >
                Outperforms
              </motion.span>

              {/* "Every Channel." — Playfair Display italic per spec */}
              <motion.span 
                initial={{ opacity: 0, y: 50, rotate: 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
                className="block text-[1.75rem] sm:text-[2.2rem] md:text-[3rem] lg:text-[4.0625rem] text-white"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  lineHeight: '1.29em',
                }}
              >
                Every Channel.
              </motion.span>
            </h2>

            {/* "While platforms shift..." */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-['Manrope'] font-light leading-[1.38em]"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.625rem)', color: '#A8E6CF' }}
            >
              While platforms shift and costs rise, email remains the highest-ROI digital channel.
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-2/5 flex flex-col justify-start">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pl-0 md:pl-8 lg:pl-12 md:border-l md:border-[#2D5F52]/30"
            >
              {/* List items */}
              <ul className="font-['Manrope'] font-normal leading-[1.12em] mb-8 md:mb-12 flex flex-col gap-3 md:gap-4"
                style={{ color: '#D4D4D4', fontSize: 'clamp(0.9rem, 1.8vw, 1.5625rem)' }}
              >
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

              {/* "Email isn't just a channel. It's infrastructure." */}
              <p
                className="font-['Manrope'] font-normal leading-[1.08em] mb-8 md:mb-12 text-white"
                style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.625rem)' }}
              >
                Email isn't just a channel.<br />
                It's infrastructure.
              </p>

              {/* "And we've built ours for scale." */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="inline-block"
              >
                <span
                  className="font-['Manrope'] font-bold text-white border-b-2 border-[#C4A24B] pb-1"
                  style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.625rem)', lineHeight: '1.08em' }}
                >
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
