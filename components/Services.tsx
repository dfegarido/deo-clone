import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Target, Palette, Database, Bot } from 'lucide-react';
import { SERVICES } from '../constants';

// Map service IDs to icons
const SERVICE_ICONS: Record<number, React.FC<{ className?: string }>> = {
  1: Mail,
  2: Target,
  3: Palette,
  4: Database,
  5: Bot,
};

const SlicedImage: React.FC<{ src: string }> = ({ src }) => {
  const slices = 5;
  
  return (
    <div className="relative w-full h-full overflow-hidden flex">
      {[...Array(slices)].map((_, i) => (
        <motion.div
          key={i}
          className="relative h-full bg-cover bg-center"
          style={{
            width: `${100 / slices}%`,
            backgroundImage: `url(${src})`,
            backgroundPosition: `${(i * 100) / (slices - 1)}% center`,
            backgroundSize: `${slices * 100}% auto`,
          }}
          initial={{ y: i % 2 === 0 ? '-100%' : '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: i % 2 === 0 ? '-100%' : '100%' }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
            delay: i * 0.05,
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      ))}
    </div>
  );
};

export const Services: React.FC = () => {
  const [activeService, setActiveService] = useState(SERVICES[0]);

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 bg-[#041814] px-4 sm:px-6 md:px-12 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-24">

          {/* Left Column: List */}
          <div className="w-full lg:w-1/2 z-10">
            <div className="mb-8 sm:mb-12 md:mb-16">

              {/* ( WHAT WE DO ) tag — Rajdhani, 600, 24px, #E3B645 */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-3 sm:mb-4"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
                  lineHeight: '110%',
                  letterSpacing: '0.04em',
                  color: '#E3B645',
                  textAlign: 'left',
                }}
              >
                ( WHAT WE DO )
              </motion.p>

              {/* Main heading — split into DM Sans + Playfair Display italic */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mb-4 sm:mb-6"
              >
                {/* "PERFORMANCE INFRASTRUCTURE" — DM Sans, 700, 75px, #041814 */}
                <h3
                  className="font-['DM_Sans'] text-[1.875rem] sm:text-[2.5rem] md:text-[3.4rem] lg:text-[4.6875rem] font-bold uppercase leading-[1em]"
                  style={{ color: '#E8EDEA' }}
                >
                  Performance<br />Infrastructure
                </h3>
                {/* "for Modern Brands." — Playfair Display italic */}
                <span
                  className="block text-[1.75rem] sm:text-[2.2rem] md:text-[3rem] lg:text-[4.0625rem]"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: 'italic',
                    fontWeight: 400,
                    lineHeight: '1.29em',
                    color: '#E8EDEA',
                  }}
                >
                  for Modern Brands.
                </span>
              </motion.div>

              {/* Description — Manrope 400, 26px, #444444 */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="font-['Manrope'] font-normal leading-[1.38em] max-w-xl mt-4 sm:mt-6"
                style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.625rem)', color: '#A3B8B0' }}
              >
                Evolutra combines owned distribution, advanced targeting, and full-funnel optimization to drive measurable revenue growth.
              </motion.p>
            </div>

            {/* Service Accordion List */}
            <div className="flex flex-col">
              {SERVICES.map((service) => {
                const isActive = activeService.id === service.id;
                return (
                  <div
                    key={service.id}
                    className="group relative"
                    style={{ borderBottom: '0.5px solid #C4A24B' }}
                    onMouseEnter={() => setActiveService(service)}
                    onClick={() => setActiveService(service)}
                  >
                    <div className={`py-5 sm:py-7 md:py-10 cursor-pointer transition-all duration-300 ${isActive ? 'pl-4 sm:pl-6 md:pl-8' : 'pl-0 hover:pl-4'}`}>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 min-w-0">
                          {React.createElement(SERVICE_ICONS[service.id] || Mail, {
                            className: `w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-colors duration-300 ${isActive ? 'text-[#C4A24B]' : 'text-[#7A9088]'}`,
                          })}
                          <h4
                            className="text-base sm:text-lg md:text-xl lg:text-[1.875rem] font-['Oswald'] uppercase font-bold transition-colors duration-300 leading-[1.2em]"
                            style={{
                              color: isActive ? '#6BC4A8' : '#5A9B86',
                            }}
                          >
                            {service.title}
                          </h4>
                        </div>

                        <motion.div
                          className="shrink-0"
                          animate={{
                            opacity: isActive ? 1 : 0,
                            x: isActive ? 0 : -20,
                          }}
                        >
                          <ArrowRight className="text-[#C4A24B] w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        </motion.div>
                      </div>

                      {/* Description Accordion */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: isActive ? 'auto' : 0,
                          opacity: isActive ? 1 : 0,
                          marginTop: isActive ? 16 : 0,
                        }}
                        className="overflow-hidden"
                      >
                        <p
                          className="font-['Manrope'] font-normal max-w-md leading-[1.5em]"
                          style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)', color: '#A3A3A3' }}
                        >
                          {service.description}
                        </p>

                        <div className="mt-4 sm:mt-6 flex items-center gap-2">
                          <span
                            className="font-['Space_Mono'] font-bold uppercase"
                            style={{ fontSize: '0.75rem', letterSpacing: '1.2px', color: '#C4A24B' }}
                          >
                            Explore Capabilities
                          </span>
                          <div className="h-[1px] w-6 sm:w-8 bg-[#C4A24B]" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Left Active Indicator Bar */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#C4A24B]"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: isActive ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual (Sticky) */}
          <div className="hidden lg:block w-full lg:w-1/2 relative h-[90vh] sticky top-20">
            <div className="w-full h-full relative rounded-lg overflow-hidden border border-white/10">
              {/* Noise overlay */}
              <div
                className="absolute inset-0 z-20 opacity-20 pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-4 h-4 border-l border-t border-white/50 z-20" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-r border-b border-white/50 z-20" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <SlicedImage src={activeService.image} />

                  {/* Overlay Gradient per spec */}
                  <div
                    className="absolute inset-0 z-10"
                    style={{
                      background: 'linear-gradient(0deg, rgba(10, 31, 23, 0.8) 0%, rgba(10, 31, 23, 0) 50%, rgba(10, 31, 23, 0.2) 100%)',
                    }}
                  />

                  {/* Metadata overlaid on image — spec: left border + pill + title + description + CTA */}
                  <div className="absolute bottom-8 left-8 z-20 flex items-stretch gap-0 max-w-md">
                    {/* Left gold border bar */}
                    <div className="w-1 self-stretch bg-[#C4A24B] shrink-0 mr-4 rounded-sm" />

                    <div className="flex flex-col">
                      {/* Service pill */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="self-start px-3 py-1 border border-white/30 backdrop-blur-md rounded-full text-[10px] font-['Space_Mono'] uppercase tracking-widest text-white mb-3"
                      >
                        Service 0{activeService.id}
                      </motion.div>

                      {/* Title */}
                      <motion.h4
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="font-['Oswald'] font-bold uppercase text-white mb-2 leading-[1.2em]"
                        style={{ fontSize: '1.875rem' }}
                      >
                        {activeService.title}
                      </motion.h4>

                      {/* Description */}
                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="font-['Manrope'] font-normal leading-[1.5em] mb-4"
                        style={{ fontSize: '1rem', color: '#A3A3A3' }}
                      >
                        {activeService.description}
                      </motion.p>

                      {/* Explore Capabilities + divider */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.45 }}
                        className="flex items-center gap-3"
                      >
                        <span
                          className="font-['Space_Mono'] font-bold uppercase"
                          style={{ fontSize: '0.75rem', letterSpacing: '1.2px', color: '#C4A24B' }}
                        >
                          Explore Capabilities
                        </span>
                        <div className="h-[1px] w-8 bg-[#C4A24B]" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
