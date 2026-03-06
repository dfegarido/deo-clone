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
    bgImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop",
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
          style={{
            fontFamily: "'Space Mono', monospace",
            fontWeight: 700,
            fontSize: '12px',
            lineHeight: '16px',
            letterSpacing: '2.4px',
            textTransform: 'uppercase',
            color: '#C4A24B',
            marginBottom: '12px',
          }}
        >[ Industries We Scale ]</motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 56px)',
            lineHeight: '1.2em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
          }}
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
        style={{ touchAction: 'pan-y' }}
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

              {/* Gradient overlay — spec: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%) */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)' }}
              />

              {/* Content — centered vertically per spec (title + stats block centered at card midpoint) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10 gap-3">
                {/* Company name — DM Sans 700 24px uppercase, drop-shadow */}
                <h3
                  className="text-white text-center uppercase drop-shadow-lg"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(14px, 1.5vw, 24px)',
                    lineHeight: '32px',
                    letterSpacing: '-0.6px',
                  }}
                >
                  {item.company}
                </h3>

                {/* Stats badges */}
                <div className="flex flex-col gap-2 w-full">
                  {item.stats.map((s, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-3 py-2.5"
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(6px)',
                        borderRadius: '12px',
                        height: '50px',
                      }}
                    >
                      <span
                        className="text-white leading-none shrink-0"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 700,
                          fontSize: 'clamp(12px, 1.2vw, 20px)',
                          letterSpacing: '-0.5px',
                        }}
                      >
                        {s.value}
                      </span>
                      <span
                        className={`font-bold leading-none shrink-0 ${s.direction === 'up' ? 'text-[#34D399]' : 'text-[#FB7185]'}`}
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 700,
                          fontSize: '14px',
                        }}
                      >
                        {s.direction === 'up' ? '↑' : '↓'}
                      </span>
                      <span
                        className="text-white/80 leading-tight uppercase"
                        style={{
                          fontFamily: "'Space Mono', monospace",
                          fontWeight: 700,
                          fontSize: 'clamp(7px, 0.6vw, 9px)',
                          letterSpacing: '0.225px',
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edge fade vignettes — spec: left: 0% right: 92% and left: 92% right: 0% */}
        <div
          className="absolute top-0 left-0 w-[8%] h-full pointer-events-none z-10"
          style={{ background: 'linear-gradient(90deg, #04120E 0%, rgba(4,18,14,0) 100%)' }}
        />
        <div
          className="absolute top-0 right-0 w-[8%] h-full pointer-events-none z-10"
          style={{ background: 'linear-gradient(270deg, #04120E 0%, rgba(4,18,14,0) 100%)' }}
        />
      </div>

      {/* Bottom caption */}
      <div className="container mx-auto px-6 mt-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '28px',
            color: '#A3A3A3',
          }}
          className="max-w-2xl mx-auto text-center"
        >
          Our vertical depth allows us to match offers with proven audience demand.
        </motion.p>
      </div>
    </div>
  );
};
