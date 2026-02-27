import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TEXT = "We control the distribution, target with precision, and generate measurable affiliate growth — not attribution noise.";

// Split text into words, each word into characters
const WORDS = TEXT.split(' ');

export const KaraokeHeading: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.3"],
  });

  // Flatten all chars to get total count for progress mapping
  let charIndex = 0;
  const totalChars = TEXT.replace(/ /g, '').length;

  return (
    <section
      ref={containerRef}
      className="relative py-28 sm:py-36 md:py-44 lg:py-52 px-6 md:px-12 bg-[#071a13] overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C4A24B]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block text-xs font-['Space_Mono'] font-bold uppercase tracking-[0.2em] text-[#C4A24B] mb-8 md:mb-12"
        >
          [ We Are Evolutra ]
        </motion.span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-['Oswald'] font-bold uppercase leading-[1.1] tracking-tight">
          {WORDS.map((word, wIdx) => {
            // Reset charIndex tracking per render by computing it inline
            const wordChars = word.split('');

            return (
              <span key={wIdx} className="inline-block mr-[0.3em]">
                {wordChars.map((char, cIdx) => {
                  // Calculate the global index for this character
                  let globalIdx = 0;
                  for (let w = 0; w < wIdx; w++) {
                    globalIdx += WORDS[w].length;
                  }
                  globalIdx += cIdx;

                  // Map each character to a small range of the scroll progress
                  const start = globalIdx / totalChars;
                  const end = (globalIdx + 1) / totalChars;

                  return (
                    <KaraokeChar
                      key={`${wIdx}-${cIdx}`}
                      char={char}
                      scrollYProgress={scrollYProgress}
                      start={start}
                      end={end}
                    />
                  );
                })}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
};

// Individual animated character
const KaraokeChar: React.FC<{
  char: string;
  scrollYProgress: any;
  start: number;
  end: number;
}> = ({ char, scrollYProgress, start, end }) => {
  const color = useTransform(
    scrollYProgress,
    [start, end],
    ["rgba(255,255,255,0.15)", "rgba(255,255,255,1)"]
  );

  const textShadow = useTransform(
    scrollYProgress,
    [start, end],
    ["0 0 0px transparent", "0 0 20px rgba(196,162,75,0.4)"]
  );

  return (
    <motion.span
      style={{ color, textShadow }}
      className="inline-block transition-none"
    >
      {char}
    </motion.span>
  );
};

