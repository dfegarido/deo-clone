import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const CASE_STUDIES = [
  {
    company: "chirp.",
    bgImage: "https://images.unsplash.com/photo-1512413317768-54b9bc2f2604?q=80&w=500&auto=format&fit=crop",
    gradient: "from-yellow-600 to-amber-700",
    stats: [
      { value: "10% ↑", label: "Increase in Conversions" },
      { value: "31% ↓", label: "Lower CPA" },
      { value: "3X ↑", label: "TikTok Traffic" }
    ]
  },
  {
    company: "GIRLS CREW",
    bgImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=500&auto=format&fit=crop",
    gradient: "from-amber-800 to-stone-900",
    stats: [
      { value: "15X ↑", label: "Revenue Increase" },
      { value: "4.5X", label: "ROAS" },
      { value: "20%", label: "Retention Rate" }
    ]
  },
  {
    company: "AliExpress",
    bgImage: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=500&auto=format&fit=crop",
    gradient: "from-orange-500 to-red-600",
    stats: [
      { value: "1BN+", label: "Impressions" },
      { value: "400K+", label: "App Installs" },
      { value: "52% ↓", label: "Lower CPC" }
    ]
  },
  {
    company: "TRILLER",
    bgImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop",
    gradient: "from-purple-600 to-fuchsia-700",
    stats: [
      { value: "100K ↑", label: "Downloads" },
      { value: "27% ↓", label: "CPI Decrease" },
      { value: "$1.50", label: "CPI for Google" }
    ]
  },
   {
    company: "FASHION NOVA",
    bgImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=500&auto=format&fit=crop",
    gradient: "from-pink-500 to-rose-600",
    stats: [
      { value: "20%", label: "Market Share" },
      { value: "5M+", label: "New Followers" },
      { value: "9.8/10", label: "CSAT Score" }
    ]
  }
];

// Quadruple data to create a massive ring. 
// This creates a smoother "curved wall" effect rather than a tight cylinder.
const CAROUSEL_ITEMS = [
    ...CASE_STUDIES, 
    ...CASE_STUDIES, 
    ...CASE_STUDIES, 
    ...CASE_STUDIES
];

export const Marquee: React.FC = () => {
  const controls = useAnimation();

  // Carousel Configuration
  const CARD_WIDTH = 400; // Wider cards for impact
  const CARD_GAP = 30; 
  const ITEM_COUNT = CAROUSEL_ITEMS.length;
  
  // Calculate radius. 
  // Circumference = Count * (Width + Gap)
  // Radius = Circumference / 2PI
  // This ensures the items touch edge-to-edge perfectly in 3D space.
  const RADIUS = Math.round((ITEM_COUNT * (CARD_WIDTH + CARD_GAP)) / (2 * Math.PI));
  
  const ANGLE_STEP = 360 / ITEM_COUNT;

  useEffect(() => {
    controls.start({
        // 360 -> 0 Rotation creates a "Right to Left" movement for the front-facing items
        rotateY: [360, 0], 
        transition: {
            duration: 120, // Keep it slow and majestic
            ease: "linear",
            repeat: Infinity,
        }
    });
  }, [controls]);

  return (
    <div className="w-full py-20 bg-black overflow-hidden relative z-20 border-y border-white/5 flex flex-col items-center">
      
      <div className="container mx-auto px-6 mb-16 text-center relative z-30 pointer-events-none">
        <h2 className="text-xs font-bold font-['Space_Mono'] uppercase tracking-[0.3em] text-neutral-500 mb-3">Case Studies</h2>
        <h3 className="text-5xl md:text-7xl font-['Oswald'] font-bold uppercase text-white tracking-tighter">
          Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">Results</span>
        </h3>
      </div>

      <div 
        className="relative w-full h-[650px] flex justify-center items-center perspective-[1500px]"
      >
        <motion.div
            className="relative w-[400px] h-[550px] will-change-transform"
            animate={controls}
            style={{ 
                transformStyle: "preserve-3d",
            }}
        >
            {CAROUSEL_ITEMS.map((study, i) => {
                const angle = i * ANGLE_STEP;
                return (
                    <div 
                        key={i}
                        className="absolute inset-0"
                        style={{
                            // RotateY places them in a circle
                            // TranslateZ pushes them out to the radius
                            transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                            backfaceVisibility: 'hidden', // Hides the "return" loop for a "one-way" feel
                            WebkitBackfaceVisibility: 'hidden'
                        }}
                    >
                        {/* Card Container */}
                        <div className="w-full h-full relative rounded-xl overflow-hidden group bg-neutral-900 border border-white/10 shadow-2xl">
                             
                             {/* Background Image */}
                            <div className="absolute inset-0">
                                <img 
                                    src={study.bgImage} 
                                    alt={study.company} 
                                    className="w-full h-full object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-80"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                                {/* Logo / Title Area */}
                                <div className="mt-8 flex justify-center">
                                    <h3 className="text-4xl font-['Oswald'] font-bold text-white tracking-tight drop-shadow-lg">
                                        {study.company}
                                    </h3>
                                </div>
                                
                                {/* Stats Section - Removed backdrop-blur for performance */}
                                <div className="flex flex-col gap-3 mb-2">
                                    {study.stats.map((stat, idx) => (
                                        <div key={idx} className="bg-black/60 border border-white/10 rounded-lg p-3 flex items-center justify-between">
                                            <span className="text-lg font-bold font-['Oswald'] text-white">
                                                {stat.value}
                                            </span>
                                            <span className="text-[9px] font-['Space_Mono'] font-bold uppercase tracking-wider text-white/80">
                                                {stat.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Hover Highlight Border */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/50 rounded-xl transition-colors duration-300 pointer-events-none" />
                        </div>
                    </div>
                );
            })}
        </motion.div>
      </div>
      
      {/* Strong Vignettes to merge edges into darkness */}
      <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-30 pointer-events-none" />
    </div>
  );
};