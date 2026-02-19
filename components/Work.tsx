import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../constants';

export const Work: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate movements for splitting effect
  const leftX = useTransform(scrollYProgress, [0.2, 0.7], ["10%", "-35%"]);
  const rightX = useTransform(scrollYProgress, [0.2, 0.7], ["-10%", "35%"]);
  
  // Rotations for dynamic feel
  const leftRotate = useTransform(scrollYProgress, [0.2, 0.7], [0, -5]);
  const rightRotate = useTransform(scrollYProgress, [0.2, 0.7], [0, 5]);
  
  // Content Reveal
  const opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1]);

  return (
    <section id="work" ref={containerRef} className="relative py-32 bg-black overflow-hidden border-t border-white/10 min-h-[140vh]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-24 text-center">
            <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-xs font-bold font-['Space_Mono'] uppercase tracking-[0.4em] text-yellow-500 mb-4 block"
            >
                Selected Work
            </motion.span>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-8xl lg:text-[7rem] font-['Oswald'] font-bold text-white uppercase leading-[0.9]"
            >
            We drop <span className="font-serif-italic font-normal lowercase bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent">results.</span>
            <br />
            Not just reels.
            </motion.h2>
        </div>

        {/* Split Animation Container */}
        <div className="relative w-full max-w-[1920px] mx-auto min-h-[800px] flex justify-center items-center perspective-[1000px]">
            
            {/* Left Image (Nature/Coast) */}
            <motion.div 
                style={{ x: leftX, rotate: leftRotate }}
                className="absolute left-[5%] md:left-[10%] w-[45%] md:w-[35%] h-[500px] md:h-[700px] z-20 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl hidden md:block will-change-transform"
            >
                <div className="relative w-full h-full">
                    <img 
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" 
                        alt="Coast" 
                        className="w-full h-full object-cover brightness-75 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                </div>
            </motion.div>

            {/* Right Image (Architecture) */}
            <motion.div 
                style={{ x: rightX, rotate: rightRotate }}
                className="absolute right-[5%] md:right-[10%] w-[45%] md:w-[35%] h-[500px] md:h-[700px] z-20 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl hidden md:block will-change-transform"
            >
                <div className="relative w-full h-full">
                    <img 
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop" 
                        alt="Architecture" 
                        className="w-full h-full object-cover brightness-75 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
                </div>
            </motion.div>

            {/* Center Content (Revealed) */}
            <motion.div 
                style={{ opacity, scale }}
                className="relative z-30 max-w-2xl mx-auto text-center px-6 flex flex-col items-center"
            >
                {/* Brand Logo/Icon */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                            </svg>
                        </div>
                        <span className="text-5xl font-['Oswald'] font-bold tracking-tight text-white">Engine</span>
                    </div>
                </div>

                <h3 className="text-xs font-['Space_Mono'] uppercase tracking-[0.2em] font-bold text-blue-400 mb-6">
                    DOE Empowers Engine's Lead Generation
                </h3>

                <p className="text-neutral-300 mb-10 leading-relaxed text-sm md:text-base max-w-lg mx-auto">
                    We've developed a multi-faceted approach, leveraging precise audience targeting, compelling creative assets, and data-driven optimization across both Google and Meta to drive high-quality leads.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full mb-10">
                    {[
                        { val: "32%", text: "Decrease in Meta CPL" },
                        { val: "5X", text: "Increase in Ad Spend" },
                        { val: "67%", text: "Decrease in CPL on Google Ads" },
                        { val: "8K", text: "Accounts Created" },
                        { val: "2K+", text: "Qualfied Leads" },
                        { val: "$11M", text: "In Revenue" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-md hover:bg-white/10 transition-colors text-left">
                            <div className="text-2xl md:text-3xl font-bold font-['Oswald'] text-white mb-1">{item.val}</div>
                            <div className="text-[9px] text-neutral-400 uppercase leading-tight font-['Space_Mono'] font-bold">{item.text}</div>
                        </div>
                    ))}
                </div>

                <button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all flex items-center gap-3 mx-auto group shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] hover:scale-105">
                    <Sparkles size={16} className="animate-pulse" />
                    <span>View Case Study</span>
                </button>
            </motion.div>
        </div>

        {/* More Work Link */}
        <div className="mt-24 flex justify-center">
            <a href="#" className="group flex items-center gap-2 text-white font-['Space_Mono'] uppercase tracking-widest text-xs hover:text-yellow-500 transition-colors">
                <span>View All Projects</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
        </div>
      </div>
    </section>
  );
};