import React from 'react';
import { motion } from 'framer-motion';

const PARTNERS = [
  // Row 1
  { name: 'AliExpress', image: 'https://doemedia.com/wp-content/uploads/2024/12/aliexpress-1.webp' },
  { name: 'Akira', image: 'https://doemedia.com/wp-content/uploads/2024/12/akira.png' },
  { name: 'Engine', image: 'https://doemedia.com/wp-content/uploads/2025/06/engine-doe-media-partner.png' },
  { name: 'Katzkin', image: 'https://doemedia.com/wp-content/uploads/2024/12/katzkin.png' },
  { name: 'Pure Green', image: 'https://doemedia.com/wp-content/uploads/2024/12/pure-green-logo-doe-media.png' },
  { name: 'GirlsCrew', image: 'https://doemedia.com/wp-content/uploads/2024/12/girlscrew-e1700189255805.png' },
  // Row 2
  { name: 'HB', image: 'https://doemedia.com/wp-content/uploads/2024/12/HB-logo-partners.png' },
  { name: 'Get Maine Lobster', image: 'https://doemedia.com/wp-content/uploads/2024/12/getmainelobster.png' },
  { name: 'Moon Cheese', image: 'https://doemedia.com/wp-content/uploads/2024/12/mooncheese-e1733857129275.png' },
  { name: 'Hammonds', image: 'https://doemedia.com/wp-content/uploads/2024/12/hammonds.png' },
  { name: 'Level 9 Sports', image: 'https://doemedia.com/wp-content/uploads/2024/12/level9sports.png' },
  { name: 'Paul Fredrick', image: 'https://doemedia.com/wp-content/uploads/2025/02/paul-fredrick-logo.png' },
  // Row 3
  { name: 'Chirp', image: 'https://doemedia.com/wp-content/uploads/2024/12/chirp-1.png' },
  { name: 'Triller', image: 'https://doemedia.com/wp-content/uploads/2025/02/triller-logo.png' },
  { name: 'Layer 1', image: 'https://doemedia.com/wp-content/uploads/2025/06/Layer-1-1024x339.png' },
  { name: 'WoolX', image: 'https://doemedia.com/wp-content/uploads/2024/12/woolx.png' },
  { name: 'MVM', image: 'https://doemedia.com/wp-content/uploads/2024/12/mvm-1-1.png' },
  { name: 'Power Crunch', image: 'https://doemedia.com/wp-content/uploads/2024/12/power-crunch-logo-doe-media.png' },
  // Row 4
  { name: 'Hanks', image: 'https://doemedia.com/wp-content/uploads/2024/12/hanks.png' },
  { name: 'Cymbiotika', image: 'https://doemedia.com/wp-content/uploads/2026/01/cymbiotika-doe-partners.png' },
  { name: 'The Tox', image: 'https://doemedia.com/wp-content/uploads/2025/02/the-tox-logo.png' },
  { name: "Malley's Chocolate", image: 'https://doemedia.com/wp-content/uploads/2024/12/malleys-chocolate-doe-media-partner.png' },
  { name: 'Hanoush', image: 'https://doemedia.com/wp-content/uploads/2024/12/hanoush.png' },
  { name: 'Movado', image: 'https://doemedia.com/wp-content/uploads/2024/12/movado-1.png' },
  { name: 'Blenders', image: 'https://doemedia.com/wp-content/uploads/2026/01/blenders-logo.png' },
];

const PartnerCard: React.FC<{ partner: typeof PARTNERS[0]; index: number }> = ({ partner, index }) => (
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
      className="max-h-12 sm:max-h-14 md:max-h-16 w-auto object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-300 brightness-0 invert"
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
