import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const CONTENT = [
  {
    title: "Identify High-Intent Audiences",
    description: "We analyze behavioral and transactional signals to find consumers actively in-market.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
  },
  {
    title: "Deploy Dedicated Email Campaigns",
    description: "Your brand receives focused share-of-voice with optimized creative and segmentation.",
    img: "https://images.unsplash.com/photo-1558655146-d09347e0c766?q=80&w=2564&auto=format&fit=crop"
  },
  {
    title: "De-Anonymize & Retarget",
    description: "Website tagging technology identifies engaged visitors before checkout.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "Amplify Through AI & Multi-Channel",
    description: "Qualified leads are nurtured via email, SMS, and AI-driven follow-up.",
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop"
  },
  {
    title: "Optimize Relentlessly",
    description: "We track revenue, ROAS, and LTV — not vanity metrics.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
  }
];

export const StickyScroll: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-neutral-900">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Text Content */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center px-6 md:px-20 z-10 bg-neutral-900/90 md:bg-neutral-900">
          <div className="relative w-full max-w-lg h-64 md:h-80">
            {CONTENT.map((item, index) => {
              // Calculate specific ranges for each item's visibility
              // We divide the total scroll range (0 to 1) into 3 segments
              const segmentLength = 1 / CONTENT.length;
              const start = index * segmentLength;
              const end = start + segmentLength;
              
              // Fade in/out logic
              // First item starts visible
              const opacity = useTransform(
                scrollYProgress,
                [start, start + 0.1, end - 0.1, end],
                [0, 1, 1, 0]
              );

              // Slide up/down logic
              const y = useTransform(
                scrollYProgress,
                [start, start + 0.1, end - 0.1, end],
                [50, 0, 0, -50]
              );

              return (
                <motion.div
                  key={index}
                  style={{ opacity, y }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <h3 className="text-yellow-500 font-['Space_Mono'] font-bold uppercase tracking-widest text-sm mb-4">
                    0{index + 1} — Process
                  </h3>
                  <h2 className="text-4xl md:text-6xl font-['Oswald'] font-bold uppercase mb-6 text-white leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-lg text-neutral-400 font-['Manrope'] leading-relaxed font-light">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Image Visuals */}
        <div className="absolute inset-0 md:relative md:w-1/2 h-full">
           {CONTENT.map((item, index) => {
             const segmentLength = 1 / CONTENT.length;
             const start = index * segmentLength;
             const end = start + segmentLength;

             // Logic to ensure images transition smoothly
             // For the last image, we want it to stay visible until the very end of the section
             const isLast = index === CONTENT.length - 1;
             const opacityRange = isLast 
                ? [start, start + 0.05, 1, 1] 
                : [start, start + 0.05, end - 0.05, end];
             
             const opacity = useTransform(
               scrollYProgress,
               opacityRange,
               [0, 1, 1, 0]
             );
             
             // Parallax/Scale effect for the image
             const scale = useTransform(scrollYProgress, [start, end], [1.1, 1]);

             return (
               <motion.div
                 key={index}
                 style={{ opacity }}
                 className="absolute inset-0 w-full h-full"
               >
                 <motion.img
                    style={{ scale }}
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale brightness-75 contrast-125"
                 />
                 {/* Vignette Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-l from-transparent via-neutral-900/20 to-neutral-900" />
               </motion.div>
             );
           })}
        </div>

      </div>
    </section>
  );
};