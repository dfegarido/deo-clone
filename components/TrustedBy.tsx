import React from 'react';
import { motion } from 'framer-motion';

// bgType: 'transparent' = dark logo on transparent bg (use brightness-0 invert)
//         'light' = dark logo on white/light bg (use invert + grayscale + mix-blend-screen)
//         'colored' = white text on colored bg (use grayscale only)
type BgType = 'transparent' | 'light' | 'colored';

interface Partner {
  name: string;
  image: string;
  bgType?: BgType;
}

const BASE = import.meta.env.BASE_URL;

const PARTNERS: Partner[] = [
  // Row 1
  { name: 'Vivint', image: `${BASE}assets/vivint-logo.png` },
  { name: 'ADT', image: `${BASE}assets/adt-logo.png`, bgType: 'colored' },
  { name: 'CarShield', image: `${BASE}assets/carshield-logo.png`, bgType: 'light' },
  { name: 'HelloFresh', image: `${BASE}assets/hellofresh-logo.png` },
  { name: 'Liberty Mutual', image: `${BASE}assets/liberty-mutual-logo.png` },
  { name: 'Life Line', image: `${BASE}assets/lifeline-logo.png` },
  // Row 2
  { name: 'Saatva', image: `${BASE}assets/saatva-logo.jpg`, bgType: 'light' },
  { name: 'Renewal by Andersen', image: `${BASE}assets/rba-logo.png` },
  { name: 'Noom', image: `${BASE}assets/noom-logo.png` },
  { name: 'Quicken Loans', image: `${BASE}assets/quicken-loans-logo.webp` },
  { name: "Sam's Club", image: `${BASE}assets/sams-club-logo.png` },
  { name: 'TruGreen', image: `${BASE}assets/trugreen-logo.png` },
  // Row 3
  { name: 'Uber', image: `${BASE}assets/uber-logo.png` },
  { name: 'Warby Parker', image: `${BASE}assets/warby-parker-logo.png` },
  { name: 'Grounded Footwear', image: `${BASE}assets/grounded-footwear-logo.png`, bgType: 'light' },
  { name: "The Farmer's Dog", image: `${BASE}assets/farmers-dog-logo.webp`, bgType: 'colored' },
];

const getImageClasses = (bgType?: BgType) => {
  switch (bgType) {
    case 'light':
      // White bg with dark logo: invert turns bg black (disappears with screen blend), logo turns white
      return 'max-h-12 sm:max-h-14 md:max-h-16 w-auto object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-300 invert grayscale mix-blend-screen';
    case 'colored':
      // Colored bg with white text: just grayscale it
      return 'max-h-12 sm:max-h-14 md:max-h-16 w-auto object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-300 grayscale';
    default:
      // Transparent bg with dark logo: standard approach
      return 'max-h-12 sm:max-h-14 md:max-h-16 w-auto object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-300 brightness-0 invert';
  }
};

const PartnerCard: React.FC<{ partner: Partner; index: number }> = ({ partner, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: (index % 6) * 0.08 }}
    className="group relative bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 flex items-center justify-center hover:bg-black hover:border-[#C4A24B]/70 hover:scale-105 hover:shadow-[0_0_10px_rgba(196,162,75,0.5),0_0_30px_rgba(196,162,75,0.3),0_0_60px_rgba(196,162,75,0.2),0_0_100px_rgba(196,162,75,0.1),inset_0_0_15px_rgba(196,162,75,0.08)] transition-all duration-300 cursor-pointer"
  >
    <img
      src={partner.image}
      alt={partner.name}
      loading="lazy"
      className={getImageClasses(partner.bgType)}
    />
  </motion.div>
);

interface TrustedByProps {
  onGetInTouch: () => void;
}

export const TrustedBy: React.FC<TrustedByProps> = ({ onGetInTouch }) => {
  return (
    <section className="bg-black py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Tag */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-['Space_Mono'] font-bold tracking-[0.2em] text-[#C4A24B] uppercase mb-6 text-center"
        >
          [ Partners ]
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-['Oswald'] font-bold uppercase text-white tracking-tighter leading-tight mb-16 text-center"
        >
          Some of the partners<br />we've grown.
        </motion.h2>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {PARTNERS.map((partner, index) => (
            <PartnerCard key={partner.name} partner={partner} index={index} />
          ))}

          {/* "Your Logo Here" CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            onClick={onGetInTouch}
            className="group bg-[#6366f1] border border-[#6366f1] rounded-xl p-6 flex flex-col items-center justify-center hover:bg-[#4f46e5] transition-all duration-300 cursor-pointer"
          >
            <svg
              className="w-7 h-7 text-white/80 group-hover:text-white transition-colors duration-300 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            </svg>
            <span className="text-xs font-['Space_Mono'] font-bold uppercase tracking-wider text-white/90 group-hover:text-white transition-colors duration-300 text-center leading-tight">
              your logo<br />here
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
