import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './ui/Button';

interface HeroProps {
  onGetInTouch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetInTouch }) => {
  const { scrollY } = useScroll();
  // Parallax y-axis
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  // Subtle Zoom on scroll
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);
  // Opacity fade
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center"
      style={{ background: '#041814' }}
    >
      {/* Background */}
      <motion.div
        style={{ y, scale, background: '#041814' }}
        className="absolute inset-0 z-0"
      >
        {/* Noise Texture Overlay for Premium Feel */}
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Label pill */}
          <div className="mb-6 overflow-hidden px-2">
            <motion.span
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-block px-5 py-[5px] rounded-full"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(6px)',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '110%',
                letterSpacing: '0.04em',
                color: '#E3B645',
                textAlign: 'center',
              }}
            >
              ( Performance Growth Partner )
            </motion.span>
          </div>

          {/* Main heading */}
          <h1
            className="font-['DM_Sans'] text-[2.8rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[6.875rem] font-bold leading-[0.91em] tracking-[-2px] md:tracking-[-4px] uppercase mb-8"
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgba(45, 175, 169, 0.6) 5.91%, rgba(250, 253, 215, 0.6) 94.15%)',
              backgroundColor: '#FFFFFF',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Own the Inbox.<br />Scale With Precision.
          </h1>

          {/* Subtitle */}
          <p
            className="max-w-2xl mx-auto mb-10"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(1rem, 2.2vw, 1.625rem)',
              lineHeight: '40px',
              textAlign: 'center',
              letterSpacing: '0.5px',
              color: '#FFFFFF',
            }}
          >
            We are a performance-driven email and data infrastructure partner built for brands that demand measurable growth.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={onGetInTouch}
              className="transition-all duration-300 hover:opacity-90 hover:scale-105"
              style={{
                width: '252px',
                height: '52px',
                background: '#C4A24B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 500,
                  fontSize: '24px',
                  lineHeight: '110%',
                  letterSpacing: '0.04em',
                  color: '#000000',
                  textTransform: 'uppercase',
                }}
              >
                Get In Touch
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3 z-10"
      >
        <span
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 500,
            fontSize: '24px',
            lineHeight: '110%',
            letterSpacing: '0.04em',
            color: '#8BAFAC',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '2px',
            height: '58px',
            background: 'linear-gradient(180deg, #8BAFAC 0%, rgba(139,175,172,0) 100%)',
          }}
        />
      </motion.div>
    </section>
  );
};