import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const INDUSTRIES = [
  {
    company: "Health & Wellness",
    bgImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    stats: [
      { value: "45%", direction: "up" as const, label: "Increase in Supplement Sales" },
      { value: "3X",  direction: "up" as const, label: "ROAS on Wellness Campaigns" },
      { value: "28%", direction: "down" as const, label: "Decrease in CPA" },
    ],
  },
  {
    company: "Home Services",
    bgImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
    stats: [
      { value: "120%", direction: "up" as const,  label: "Increase in Qualified Leads" },
      { value: "35%",  direction: "down" as const, label: "Decrease in Cost Per Lead" },
      { value: "5X",   direction: "up" as const,  label: "Increase in Booking Rate" },
    ],
  },
  {
    company: "Finance",
    bgImage: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=800&auto=format&fit=crop",
    stats: [
      { value: "250%", direction: "up" as const,  label: "Increase in Loan Applications" },
      { value: "42%",  direction: "down" as const, label: "Decrease in CPL" },
      { value: "$12M+",direction: "up" as const,  label: "Revenue Generated" },
    ],
  },
  {
    company: "Consumer Products",
    bgImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
    stats: [
      { value: "180%", direction: "up" as const,  label: "Increase in DTC Revenue" },
      { value: "67%",  direction: "down" as const, label: "Decrease in CAC" },
      { value: "4X",   direction: "up" as const,  label: "Marketplace Growth" },
    ],
  },
  {
    company: "E-Commerce",
    bgImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
    stats: [
      { value: "310%", direction: "up" as const,  label: "Increase in Online Revenue" },
      { value: "55%",  direction: "down" as const, label: "Lower Cart Abandonment" },
      { value: "8X",   direction: "up" as const,  label: "ROAS on Paid Social" },
    ],
  },
  {
    company: "Insurance",
    bgImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
    stats: [
      { value: "90%",  direction: "down" as const, label: "Decrease in CPL" },
      { value: "200%", direction: "up" as const,  label: "Increase in Qualified Leads" },
      { value: "$8M+", direction: "up" as const,  label: "Pipeline Generated" },
    ],
  },
  {
    company: "Travel & Hospitality",
    bgImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    stats: [
      { value: "75%",  direction: "up" as const,  label: "Increase in Bookings" },
      { value: "40%",  direction: "down" as const, label: "Lower CPA" },
      { value: "6X",   direction: "up" as const,  label: "Email Revenue Growth" },
    ],
  },
  {
    company: "Tech & SaaS",
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    stats: [
      { value: "500%", direction: "up" as const,  label: "Increase in Trial Sign-Ups" },
      { value: "60%",  direction: "down" as const, label: "Decrease in CAC" },
      { value: "12X",  direction: "up" as const,  label: "Paid Media ROAS" },
    ],
  },
];

// Duplicate for infinite loop (mirrors DOE media's duplicate-once strategy)
const SLIDER_ITEMS = [...INDUSTRIES, ...INDUSTRIES];

// ── Mobile Card ──
const MobileCard: React.FC<{ item: typeof INDUSTRIES[0]; index: number }> = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    className="relative overflow-hidden rounded-2xl bg-neutral-900 shadow-xl"
    style={{ height: '260px' }}
  >
    <img src={item.bgImage} alt={item.company} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
    <div className="relative z-10 h-full flex flex-col items-center justify-center gap-2 px-3 py-4">
      <h3 className="text-sm font-['DM_Sans'] font-bold text-white tracking-tight text-center uppercase leading-tight">{item.company}</h3>
      <div className="flex flex-col gap-1.5 w-full">
        {item.stats.map((s, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg px-2 py-1.5 flex items-center gap-1.5">
            <span className="text-sm font-['DM_Sans'] font-bold text-white leading-none shrink-0">{s.value}</span>
            <span className={`text-xs font-bold leading-none shrink-0 ${s.direction === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>{s.direction === 'up' ? '↑' : '↓'}</span>
            <span className="text-[8px] font-['Space_Mono'] font-bold uppercase tracking-wide text-white/75 leading-tight">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

/*
 * ── DOE-media flat slider ──────────────────────────────────────────────────
 * Matches the exact structure and behaviour of doe-simple-slider:
 *   • viewport  overflow:hidden  cursor:grab
 *   • track     display:flex  gap:18px  translate3d scroll
 *   • cards     5 per row (desktop), 2 per row (mobile)  no 3D transforms
 *   • loop      cards duplicated once → seamless wrap
 *   • hover     pause auto-scroll
 *   • drag      pointer events for manual scrub
 * ─────────────────────────────────────────────────────────────────────────
 */
export const Marquee: React.FC = () => {
  const trackRef   = useRef<HTMLDivElement>(null);
  const posRef     = useRef(0);
  const rafRef     = useRef(0);
  const pausedRef  = useRef(false);
  const pressedRef = useRef(false);

  const SPEED = 0.4; // px per frame  (~24px/s at 60fps)
  const GAP   = 18;  // gap between cards (px) — matches DOE

  // Responsive card sizing — matches DOE media (2 on mobile, 3 on tablet, 5 on desktop)
  const [cardStyle, setCardStyle] = useState({ width: 'calc((100% - 72px) / 5)', height: '580px' });

  useEffect(() => {
    const updateCardSize = () => {
      const vw = window.innerWidth;
      if (vw < 640) {
        setCardStyle({ width: 'calc((100% - 18px) / 2)', height: '300px' });
      } else if (vw < 1024) {
        setCardStyle({ width: 'calc((100% - 36px) / 3)', height: '420px' });
      } else {
        setCardStyle({ width: 'calc((100% - 72px) / 5)', height: '580px' });
      }
    };
    updateCardSize();
    window.addEventListener('resize', updateCardSize);
    return () => window.removeEventListener('resize', updateCardSize);
  }, []);

  useEffect(() => {
    const track    = trackRef.current;
    const viewport = track?.parentElement as HTMLElement | null;
    if (!track || !viewport) return;

    const halfWidth = () => track.scrollWidth / 2;

    const wrap = () => {
      const half = halfWidth();
      if (!half) return;
      while (posRef.current <= -half) posRef.current += half;
      while (posRef.current > 0)      posRef.current -= half;
    };

    const render = () => {
      track.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
    };

    const tick = () => {
      if (!pausedRef.current && !pressedRef.current) {
        posRef.current -= SPEED;
        wrap();
        render();
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    wrap();
    render();
    rafRef.current = requestAnimationFrame(tick);

    // ── Hover pause (matches DOE) ──
    const pause   = () => { pausedRef.current = true; };
    const unpause = () => { pausedRef.current = false; };
    viewport.addEventListener('mouseenter', pause);
    viewport.addEventListener('mouseleave', unpause);

    // ── Pointer drag ──
    let startX = 0, startPos = 0, dragging = false;

    const onDown = (e: PointerEvent) => {
      pressedRef.current = true;
      dragging = false;
      startX   = e.clientX;
      startPos = posRef.current;
      viewport.setPointerCapture(e.pointerId);
      viewport.style.cursor = 'grabbing';
    };

    const onMove = (e: PointerEvent) => {
      if (!pressedRef.current) return;
      const dx = e.clientX - startX;
      if (!dragging && Math.abs(dx) < 8) return;
      dragging = true;
      posRef.current = startPos + dx;
      wrap();
      render();
    };

    const onUp = () => {
      pressedRef.current = false;
      viewport.style.cursor = 'grab';
    };

    viewport.addEventListener('pointerdown', onDown);
    viewport.addEventListener('pointermove', onMove);
    viewport.addEventListener('pointerup',   onUp);
    viewport.addEventListener('pointercancel', onUp);
    viewport.addEventListener('dragstart', (e) => e.preventDefault());

    return () => {
      cancelAnimationFrame(rafRef.current);
      viewport.removeEventListener('mouseenter', pause);
      viewport.removeEventListener('mouseleave', unpause);
      viewport.removeEventListener('pointerdown', onDown);
      viewport.removeEventListener('pointermove', onMove);
      viewport.removeEventListener('pointerup',   onUp);
      viewport.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return (
    <div className="w-full py-16 md:py-20 bg-[#04120e] overflow-hidden relative z-20 border-y border-white/5">

      {/* Section Header */}
      <div className="container mx-auto px-6 mb-10 md:mb-14 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs font-bold font-['Space_Mono'] uppercase tracking-[0.2em] text-[#C4A24B] mb-3"
        >[ Industries We Scale ]</motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-['DM_Sans'] text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] font-bold uppercase leading-[1.2em] text-white"
        >
          Proven Across High-Performance Verticals
        </motion.h3>
      </div>

      {/*
        Carousel — shown on all screen sizes.
        ─────────────────────────────────────────────────────────────
        • clip-path polygon = 25% parabolic arc on top (∪) and bottom (∩)
          → at the CENTER the container is SLIM  (50% of full height visible)
          → at the EDGES  the container is TALL  (100% of full height visible)
        • Cards are a fixed 580px tall with content CENTERED vertically,
          so the arc clips only the blank image-fill zones, never the text.
        • No 3D, no perspective, no rotateY — pure 2D clip shape only.
      */}
      <div
        className="relative w-full overflow-hidden cursor-grab select-none"
        style={{
          touchAction: 'pan-y',
          // 12% parabolic arc: y = 12 × 4x(1-x) %
          clipPath: `polygon(
            0% 0%,
            10% 4.3%, 20% 7.7%, 30% 10%, 40% 11.5%, 50% 12%, 60% 11.5%, 70% 10%, 80% 7.7%, 90% 4.3%,
            100% 0%,
            100% 100%,
            90% 95.7%, 80% 92.3%, 70% 90%, 60% 88.5%, 50% 88%, 40% 88.5%, 30% 90%, 20% 92.3%, 10% 95.7%,
            0% 100%
          )`,
        }}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ gap: `${GAP}px`, padding: '10px 0' }}
        >
          {SLIDER_ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 relative overflow-hidden rounded-2xl group"
              style={cardStyle}
            >
              {/* Background image — fills the full card */}
              <img
                src={item.bgImage}
                alt={item.company}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                draggable={false}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

              {/*
                Content CENTERED vertically — stays inside the safe zone
                (between the two arc clip boundaries at ~145px from each end)
              */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 sm:gap-2 md:gap-3 px-2 sm:px-3 md:px-4 z-10">
                {/* Company name */}
                <h3 className="text-[10px] sm:text-sm md:text-base lg:text-xl xl:text-2xl font-['DM_Sans'] font-bold text-white uppercase tracking-tight drop-shadow-lg text-center mb-0.5">
                  {item.company}
                </h3>

                {/* Stats */}
                <div className="flex flex-col gap-1 sm:gap-1.5 md:gap-2 w-full">
                  {item.stats.map((s, idx) => (
                    <div
                      key={idx}
                      className="bg-white/[0.12] backdrop-blur-md border border-white/20 rounded-lg sm:rounded-xl px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2.5 flex items-center gap-1 sm:gap-1.5 md:gap-2"
                    >
                      <span className="text-[10px] sm:text-sm md:text-base lg:text-lg xl:text-xl font-['DM_Sans'] font-bold text-white leading-none tracking-tight shrink-0">
                        {s.value}
                      </span>
                      <span className={`text-[10px] sm:text-xs md:text-sm font-bold leading-none shrink-0 ${s.direction === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {s.direction === 'up' ? '↑' : '↓'}
                      </span>
                      <span className="text-[7px] sm:text-[8px] md:text-[9px] font-['Space_Mono'] font-bold uppercase tracking-wide text-white/80 leading-tight">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edge fade vignettes */}
        <div className="absolute top-0 left-0 w-[8%] h-full bg-gradient-to-r from-[#04120e] to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-[8%] h-full bg-gradient-to-l from-[#04120e] to-transparent pointer-events-none z-10" />
      </div>

      {/* Bottom caption */}
      <div className="container mx-auto px-6 mt-8 text-center">
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
    </div>
  );
};
