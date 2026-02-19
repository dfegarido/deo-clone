import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../constants';

const SlicedImage: React.FC<{ src: string }> = ({ src }) => {
  const slices = 5; // Number of vertical slices
  
  return (
    <div className="relative w-full h-full overflow-hidden flex">
      {[...Array(slices)].map((_, i) => (
        <motion.div
          key={i}
          className="relative h-full bg-cover bg-center"
          style={{
            width: `${100 / slices}%`,
            backgroundImage: `url(${src})`,
            // Adjust background position to display the correct slice of the image
            backgroundPosition: `${(i * 100) / (slices - 1)}% center`,
            backgroundSize: `${slices * 100}% auto` // Ensure the image scales to cover the full width virtually
          }}
          initial={{ y: i % 2 === 0 ? '-100%' : '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: i % 2 === 0 ? '-100%' : '100%' }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1], // Custom bezier for snappy feeling
            delay: i * 0.05 // Stagger effect
          }}
        >
            {/* Dark overlay for text contrast if needed, though usually handled by parent */}
            <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      ))}
    </div>
  );
};

export const Services: React.FC = () => {
  const [activeService, setActiveService] = useState(SERVICES[0]);

  return (
    <section id="services" className="py-24 bg-neutral-900 text-white px-6 md:px-12 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            
          {/* Left Column: List */}
          <div className="w-full lg:w-1/2 z-10">
            <div className="mb-16">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-xs font-bold font-['Space_Mono'] uppercase tracking-[0.4em] text-yellow-500 mb-4"
                >
                    Scope of Work
                </motion.h2>
                <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-['Oswald'] font-bold uppercase"
                >
                    Our Expertise
                </motion.h3>
            </div>

            <div className="flex flex-col">
              {SERVICES.map((service) => (
                <div
                  key={service.id}
                  className="group relative border-b border-white/10"
                  onMouseEnter={() => setActiveService(service)}
                >
                  <div className={`py-10 cursor-pointer transition-all duration-300 ${activeService.id === service.id ? 'pl-8' : 'pl-0 hover:pl-4'}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <span className={`text-xs font-['Space_Mono'] transition-colors duration-300 ${activeService.id === service.id ? 'text-yellow-500' : 'text-neutral-600'}`}>
                                0{service.id}
                            </span>
                            <h4 className={`text-3xl md:text-5xl font-['Oswald'] uppercase font-bold transition-colors duration-300 ${activeService.id === service.id ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                                {service.title}
                            </h4>
                        </div>
                        
                        {/* Arrow indicator */}
                        <motion.div
                            animate={{ 
                                opacity: activeService.id === service.id ? 1 : 0,
                                x: activeService.id === service.id ? 0 : -20 
                            }}
                        >
                            <ArrowRight className="text-yellow-500" />
                        </motion.div>
                    </div>
                    
                    {/* Description Accordion */}
                    <motion.div
                        initial={false}
                        animate={{ 
                            height: activeService.id === service.id ? 'auto' : 0,
                            opacity: activeService.id === service.id ? 1 : 0,
                            marginTop: activeService.id === service.id ? 24 : 0
                        }}
                        className="overflow-hidden"
                    >
                        <p className="font-['Manrope'] text-neutral-400 max-w-md leading-relaxed">
                            {service.description}
                        </p>
                        
                        <div className="mt-6 flex items-center gap-2 text-yellow-500 text-xs font-['Space_Mono'] uppercase tracking-widest font-bold">
                            <span>Explore Capabilities</span>
                            <div className="h-[1px] w-8 bg-yellow-500" />
                        </div>
                    </motion.div>
                  </div>
                  
                  {/* Left Active Indicator Bar */}
                  <motion.div 
                    className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: activeService.id === service.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual (Sticky) */}
          <div className="hidden lg:block w-full lg:w-1/2 relative h-[80vh] sticky top-20">
             <div className="w-full h-full relative rounded-lg overflow-hidden border border-white/10">
                {/* Noise overlay */}
                <div className="absolute inset-0 z-20 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }} />
                
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
                        {/* The splitting image component */}
                        <SlicedImage src={activeService.image} />
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-neutral-900/20 z-10" />
                        
                        {/* Metadata overlaid on image */}
                        <div className="absolute bottom-8 left-8 z-20">
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="inline-block px-3 py-1 border border-white/30 backdrop-blur-md rounded-full text-[10px] font-['Space_Mono'] uppercase tracking-widest text-white mb-2"
                            >
                                Service 0{activeService.id}
                            </motion.div>
                            <motion.h4 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-4xl font-['Oswald'] font-bold uppercase text-white"
                            >
                                {activeService.title}
                            </motion.h4>
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