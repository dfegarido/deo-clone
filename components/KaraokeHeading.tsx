import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TEXT = "We control the distribution, target with precision, and generate measurable affiliate growth — not attribution noise.";

const WORDS = TEXT.split(' ');

export const KaraokeHeading: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.3"],
  });

  const totalChars = TEXT.replace(/ /g, '').length;

  return (
    <section
      ref={containerRef}
      className="relative py-28 sm:py-36 md:py-44 lg:py-52 px-6 md:px-12 overflow-hidden"
      style={{ background: '#071A13' }}
    >
      {/* Overlay + Blur — centered, 600×400, rgba(196,162,75,0.05), blur 75px */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{
          width: 'min(600px, 88vw)',
          height: 'min(400px, 56vw)',
          background: 'rgba(196, 162, 75, 0.05)',
          filter: 'blur(75px)',
          borderRadius: '9999px',
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10 text-center">

        {/* ( WE ARE EVOLUTRA ) — Rajdhani 600, 24px, #E3B645 */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-6 sm:mb-8 md:mb-12 px-2"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            lineHeight: '110%',
            letterSpacing: '0.04em',
            color: '#E3B645',
          }}
        >
          ( WE ARE EVOLUTRA )
        </motion.span>

        {/* Karaoke: unrevealed = black; revealed = left-to-right gradient (teal → white) */}
        <h2
          className="font-['DM_Sans'] text-[1.875rem] sm:text-[2.5rem] md:text-[3.4rem] lg:text-[4.375rem] font-bold uppercase text-center"
          style={{ lineHeight: '1.143em' }}
        >
          {WORDS.map((word, wIdx) => (
            <span key={wIdx} className="inline-block mr-[0.3em]">
              {word.split('').map((char, cIdx) => {
                let globalIdx = 0;
                for (let w = 0; w < wIdx; w++) {
                  globalIdx += WORDS[w].length;
                }
                globalIdx += cIdx;

                const start = globalIdx / totalChars;
                const end = (globalIdx + 1) / totalChars;
                const charPosition = (start + end) / 2; // 0 = left (teal), 1 = right (white)

                return (
                  <KaraokeChar
                    key={`${wIdx}-${cIdx}`}
                    char={char}
                    scrollYProgress={scrollYProgress}
                    start={start}
                    end={end}
                    charPosition={charPosition}
                  />
                );
              })}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};

// Gradient: teal (left) → white (right)
const TEAL = { r: 45, g: 175, b: 169 };
const WHITE = { r: 250, g: 253, b: 215 };

const getGradientColor = (t: number) =>
  `rgb(${Math.round(TEAL.r + (WHITE.r - TEAL.r) * t)}, ${Math.round(TEAL.g + (WHITE.g - TEAL.g) * t)}, ${Math.round(TEAL.b + (WHITE.b - TEAL.b) * t)})`;

// Reveal sweep: left-to-right. Character is revealed when scroll passes its horizontal position (charPosition).
const REVEAL_SMOOTH = 0.04; // Small scroll window for smooth transition

const KaraokeChar: React.FC<{
  char: string;
  scrollYProgress: any;
  start: number;
  end: number;
  charPosition: number;
}> = ({ char, scrollYProgress, charPosition }) => {
  const color = useTransform(
    scrollYProgress,
    [charPosition - REVEAL_SMOOTH, charPosition + REVEAL_SMOOTH],
    ['rgb(0,0,0)', getGradientColor(charPosition)]
  );

  return (
    <motion.span style={{ color }} className="inline-block transition-none">
      {char}
    </motion.span>
  );
};
