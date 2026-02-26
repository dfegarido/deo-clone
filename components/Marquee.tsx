import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const INDUSTRIES = [
  {
    company: "Health & Wellness",
    bgImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop",
    gradient: "from-yellow-600 to-amber-700",
    stats: [
      { value: "Supplements" },
      { value: "Fitness Programs" },
      { value: "Wellness Guides" }
    ]
  },
  {
    company: "Home Services",
    bgImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=500&auto=format&fit=crop",
    gradient: "from-amber-800 to-stone-900",
    stats: [
      { value: "Home Improvement" },
      { value: "Maintenance" },
      { value: "Smart Home Products" }
    ]
  },
  {
    company: "Finance",
    bgImage: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=500&auto=format&fit=crop",
    gradient: "from-orange-500 to-red-600",
    stats: [
      { value: "Personal Loans" },
      { value: "Credit & Tax Solutions" },
      { value: "Debt Programs" }
    ]
  },
  {
    company: "Consumer Products",
    bgImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop",
    gradient: "from-purple-600 to-fuchsia-700",
    stats: [
      { value: "High-Converting DTC" },
      { value: "Marketplace Offers" },
      { value: "Scalable Growth" }
    ]
  },
];

// Quadruple data to create a massive ring for desktop 3D carousel
const CAROUSEL_ITEMS = [
    ...INDUSTRIES, 
    ...INDUSTRIES, 
    ...INDUSTRIES, 
    ...INDUSTRIES
];

// Mobile Card Component
const MobileIndustryCard: React.FC<{ industry: typeof INDUSTRIES[0]; index: number }> = ({ industry, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative rounded-xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl"
  >
    {/* Background Image */}
    <div className="relative h-48">
      <img
        src={industry.bgImage}
        alt={industry.company}
        className="w-full h-full object-cover opacity-60"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="absolute bottom-4 left-4 z-10">
        <h3 className="text-2xl font-['Oswald'] font-bold text-white tracking-tight drop-shadow-lg">
          {industry.company}
        </h3>
      </div>
    </div>

    {/* Items List */}
    <div className="p-4">
      <ul className="flex flex-col gap-2">
        {industry.stats.map((stat, idx) => (
          <li key={idx} className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
            <span className="text-sm font-['Manrope'] font-medium text-white/90 tracking-wide">
              {stat.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

export const Marquee: React.FC = () => {
  const controls = useAnimation();

  // Carousel Configuration (desktop only)
  const CARD_WIDTH = 400;
  const CARD_GAP = 30; 
  const ITEM_COUNT = CAROUSEL_ITEMS.length;
  const RADIUS = Math.round((ITEM_COUNT * (CARD_WIDTH + CARD_GAP)) / (2 * Math.PI));
  const ANGLE_STEP = 360 / ITEM_COUNT;

  useEffect(() => {
    controls.start({
        rotateY: [360, 0], 
        transition: {
            duration: 120,
            ease: "linear",
            repeat: Infinity,
        }
    });
  }, [controls]);

  return (
    <div className="w-full py-16 md:py-20 bg-black overflow-hidden relative z-20 border-y border-white/5 flex flex-col items-center">
      
      {/* Section Header */}
      <div className="container mx-auto px-6 mb-10 md:mb-16 text-center relative z-30 pointer-events-none">
        <h2 className="text-xs font-bold font-['Space_Mono'] uppercase tracking-[0.3em] text-neutral-500 mb-3">Industries We Scale</h2>
        <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-['Oswald'] font-bold uppercase text-white tracking-tighter leading-tight">
          Proven Across High-Performance{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">Verticals</span>
        </h3>
      </div>

      {/* Mobile: Card Grid (visible on small screens) */}
      <div className="md:hidden container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {INDUSTRIES.map((industry, index) => (
            <MobileIndustryCard key={index} industry={industry} index={index} />
          ))}
        </div>
      </div>

      {/* Desktop: 3D Carousel (hidden on mobile) */}
      <div 
        className="hidden md:flex relative w-full h-[650px] justify-center items-center perspective-[1500px]"
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
                            transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                            backfaceVisibility: 'hidden',
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
                                
                                {/* Items List */}
                                <div className="bg-black/60 border border-white/10 rounded-lg p-5 mb-2">
                                    <ul className="flex flex-col gap-3">
                                        {study.stats.map((stat, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <span className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
                                                <span className="text-base font-['Manrope'] font-medium text-white/90 tracking-wide">
                                                    {stat.value}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
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

      {/* Bottom Text */}
      <div className="container mx-auto px-6 mt-8 md:mt-8 text-center relative z-30">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-neutral-400 font-['Manrope'] text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Our vertical depth allows us to match offers with proven audience demand.
        </motion.p>
      </div>
      
      {/* Strong Vignettes (desktop only) */}
      <div className="hidden md:block absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-black via-black/80 to-transparent z-30 pointer-events-none" />
      <div className="hidden md:block absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-black via-black/80 to-transparent z-30 pointer-events-none" />
    </div>
  );
};
