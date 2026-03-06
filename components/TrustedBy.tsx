import React from 'react';
import { motion } from 'framer-motion';

// New images from assets/
import adtLogo from '../assets/ADT_Security_Services_Logo.svg.png';
import carShieldLogo from '../assets/CarShield_Company_Logo.png';
import helloFreshLogo from '../assets/hellofresh-logo.png';
import libertyMutualLogo from '../assets/Liberty_Mutual-Logo.wine.png';
import lifeLineLogo from '../assets/life-line-logo-300x145.png';
import saatvaLogo from '../assets/logo_saatva_mattress.jpg';
import noomLogo from '../assets/Noom-Logo.png';
import quickenLoansLogo from '../assets/Quicken-loans-stacked.webp';
import rbaLogo from '../assets/Renewal by Anderson Products _ Renewal by Andersen.png';
import samsClubLogo from '../assets/Sams-Club-Logo.png';
import truGreenLogo from '../assets/TruGreen_Primary_Logo_(R)_FullColor_RGB_(2).png';
import uberLogo from '../assets/Uber_logo_2018.png';
import warbyParkerLogo from '../assets/Warby_Parker_logo.svg.png';
import groundedFootwearLogo from '../assets/Grounded Footwear - Step Into Comfort_ Grounded Footwear.png';

// bgType: 'transparent' = dark logo on transparent bg (use brightness-0 invert)
//         'light' = dark logo on white/light bg (use invert + grayscale + mix-blend-screen)
//         'colored' = white text on colored bg (use grayscale only)
type BgType = 'transparent' | 'light' | 'colored';

interface Partner {
  name: string;
  image: string;
  bgType?: BgType;
  scale?: number; // per-logo visual scale factor (default 1)
}

const BASE = import.meta.env.BASE_URL;

const PARTNERS: Partner[] = [
  // Row 1
  { name: 'Vivint', image: `${BASE}assets/vivint-logo.png` },
  { name: 'ADT', image: adtLogo, bgType: 'colored', scale: 0.8 },
  { name: 'CarShield', image: carShieldLogo, bgType: 'light' },
  { name: 'HelloFresh', image: helloFreshLogo },
  { name: 'Liberty Mutual', image: libertyMutualLogo, scale: 0.9 },
  { name: 'Life Line', image: lifeLineLogo, scale: 1.3 },
  // Row 2
  { name: 'Saatva', image: saatvaLogo, bgType: 'light', scale: 1.1 },
  { name: 'Renewal by Andersen', image: rbaLogo },
  { name: 'Noom', image: noomLogo, scale: 0.75 },
  { name: 'Quicken Loans', image: quickenLoansLogo, scale: 0.8 },
  { name: "Sam's Club", image: samsClubLogo },
  { name: 'TruGreen', image: truGreenLogo },
  // Row 3
  { name: 'Uber', image: uberLogo, scale: 1.15 },
  { name: 'Warby Parker', image: warbyParkerLogo, scale: 1.15 },
  { name: 'Grounded Footwear', image: groundedFootwearLogo, bgType: 'light', scale: 1.25 },
  { name: "The Farmer's Dog", image: `${BASE}assets/farmers-dog-logo.webp`, bgType: 'colored', scale: 0.75 },
  { name: 'Warby Parker Alt', image: `${BASE}assets/warby-parker-alt-logo.jpg`, bgType: 'light' },
];

const IMG_BASE = 'max-w-[80%] max-h-14 sm:max-h-16 md:max-h-16 w-auto object-contain opacity-50 group-hover:opacity-100 transition-all duration-300';

const getImageClasses = (_bgType?: BgType) => {
  // All logos: grayscale at rest → original color on hover
  return `${IMG_BASE} grayscale group-hover:grayscale-0 group-hover:brightness-110`;
};

const PartnerCard: React.FC<{ partner: Partner; index: number }> = ({ partner, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: (index % 6) * 0.08 }}
    className="group relative rounded-xl aspect-[3/2] flex items-center justify-center hover:bg-black hover:border-[#C4A24B]/70 hover:scale-105 hover:shadow-[0_0_10px_rgba(196,162,75,0.5),0_0_30px_rgba(196,162,75,0.3),0_0_60px_rgba(196,162,75,0.2),0_0_100px_rgba(196,162,75,0.1),inset_0_0_15px_rgba(196,162,75,0.08)] transition-all duration-300 cursor-pointer p-4"
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
  >
    <img
      src={partner.image}
      alt={partner.name}
      loading="lazy"
      className={getImageClasses(partner.bgType)}
      style={partner.scale ? { transform: `scale(${partner.scale})` } : undefined}
    />
  </motion.div>
);

interface TrustedByProps {
  onGetInTouch: () => void;
}

export const TrustedBy: React.FC<TrustedByProps> = ({ onGetInTouch }) => {
  return (
    <section className="bg-[#CEE8DE] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Tag */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 sm:mb-6 text-center"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(1rem, 3.5vw, 1.5rem)',
            lineHeight: '110%',
            letterSpacing: '0.04em',
            color: '#E3B645',
          }}
        >
          ( PARTNERS )
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-['DM_Sans'] text-[1.8rem] sm:text-[2.2rem] md:text-[2.8rem] lg:text-[3.5rem] font-bold uppercase leading-[1.2em] text-[#041210] mb-10 md:mb-16 text-center"
        >
          Some of the partners<br />we've grown.
        </motion.h2>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {PARTNERS.map((partner, index) => (
            <PartnerCard key={index} partner={partner} index={index} />
          ))}

          {/* "Your Logo Here" CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
            onClick={onGetInTouch}
            className="group bg-[#6366f1] border border-[#6366f1] rounded-xl aspect-[3/2] p-4 flex flex-col items-center justify-center hover:bg-[#4f46e5] transition-all duration-300 cursor-pointer"
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
