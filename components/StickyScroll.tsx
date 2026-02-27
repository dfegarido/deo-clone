import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Plain white icon logos (no background, just the lettermark)
const plainIcon = (letter: string) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Ctext x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial,Helvetica,sans-serif' font-weight='bold' font-size='${letter.length > 2 ? 13 : letter.length > 1 ? 18 : 28}'%3E${encodeURIComponent(letter)}%3C/text%3E%3C/svg%3E`;

const LOGOS = {
  // Paid Social
  meta: plainIcon("f"),
  tiktok: plainIcon("Tk"),
  snapchat: plainIcon("Sc"),
  pinterest: plainIcon("P"),
  linkedin: plainIcon("in"),
  x: plainIcon("X"),
  reddit: plainIcon("r/"),
  // Paid Search
  google: plainIcon("G"),
  microsoft: plainIcon("M"),
  amazon: plainIcon("a"),
  // Creative
  adobe: plainIcon("Ai"),
  figma: plainIcon("F"),
  canva: plainIcon("C"),
  // Lifecycle
  klaviyo: plainIcon("K"),
  attentive: plainIcon("A"),
  mailchimp: plainIcon("Mc"),
  activecampaign: plainIcon("AC"),
  constantcontact: plainIcon("CC"),
  // Web Design
  wordpress: plainIcon("W"),
  shopify: plainIcon("S"),
  bigcommerce: plainIcon("B"),
  webflow: plainIcon("W"),
};

// Inline SVG icons as data URIs (white strokes for dark background)
const ICONS = {
  paidSocial: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M42 12L18 24H8a2 2 0 00-2 2v12a2 2 0 002 2h10l24 12V12z'/%3E%3Cpath d='M50 22a10 10 0 010 20'/%3E%3Cpath d='M56 16a18 18 0 010 32'/%3E%3C/svg%3E",
  paidSearch: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='26' cy='26' r='16'/%3E%3Cpath d='M38 38l18 18'/%3E%3C/svg%3E",
  creative: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 20h40v28a4 4 0 01-4 4H16a4 4 0 01-4-4V20z'/%3E%3Cpath d='M12 20l8-8h24l8 8'/%3E%3Ccircle cx='32' cy='34' r='8'/%3E%3Ccircle cx='32' cy='34' r='3'/%3E%3C/svg%3E",
  lifecycle: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M8 32a24 24 0 0140.97-16.97'/%3E%3Cpath d='M56 8v16H40'/%3E%3Cpath d='M56 32A24 24 0 0115.03 48.97'/%3E%3Cpath d='M8 56V40h16'/%3E%3C/svg%3E",
  webDesign: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='4' y='8' width='56' height='48' rx='4'/%3E%3Cline x1='4' y1='20' x2='60' y2='20'/%3E%3Cpolyline points='20 34 12 42 20 50'/%3E%3Cpolyline points='44 34 52 42 44 50'/%3E%3Cline x1='36' y1='30' x2='28' y2='54'/%3E%3C/svg%3E",
};

// Section images for the right column
const SECTION_IMAGES = {
  paidSocial: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80&auto=format&fit=crop",
  paidSearch: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop",
  creative: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80&auto=format&fit=crop",
  lifecycle: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=1200&q=80&auto=format&fit=crop",
  webDesign: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80&auto=format&fit=crop",
};

const CONTENT = [
  {
    icon: ICONS.paidSocial,
    label: "Paid Social",
    title: "Paid Social",
    description: "Boost acquisition and retention with Evolutra's Paid Social strategies, driving engagement and results.",
    img: SECTION_IMAGES.paidSocial,
    partners: [
      { name: "Meta", logo: LOGOS.meta },
      { name: "TikTok", logo: LOGOS.tiktok },
      { name: "Snapchat", logo: LOGOS.snapchat },
      { name: "Pinterest", logo: LOGOS.pinterest },
      { name: "LinkedIn", logo: LOGOS.linkedin },
      { name: "X", logo: LOGOS.x },
      { name: "Reddit", logo: LOGOS.reddit },
    ],
    cta: "Let's Talk Social"
  },
  {
    icon: ICONS.paidSearch,
    label: "Paid Search",
    title: "Paid Search",
    description: "Dominate Paid Search with data-backed strategies that drive traffic, boost visibility, and deliver growth.",
    img: SECTION_IMAGES.paidSearch,
    partners: [
      { name: "Google", logo: LOGOS.google },
      { name: "Microsoft", logo: LOGOS.microsoft },
      { name: "Amazon", logo: LOGOS.amazon },
    ],
    cta: "Let's Talk Paid Search"
  },
  {
    icon: ICONS.creative,
    label: "Creative",
    title: "Creative",
    description: "Scroll-stopping creative that connects with your audience. From ad design to landing pages, we produce assets that drive performance.",
    img: SECTION_IMAGES.creative,
    partners: [
      { name: "Adobe", logo: LOGOS.adobe },
      { name: "Figma", logo: LOGOS.figma },
      { name: "Canva", logo: LOGOS.canva },
    ],
    cta: "Let's Talk Creative"
  },
  {
    icon: ICONS.lifecycle,
    label: "Lifecycle Marketing",
    title: "Lifecycle Marketing",
    description: "Data-driven strategies that build trust, boost retention, and turn prospects into loyal, long-term customers.",
    img: SECTION_IMAGES.lifecycle,
    partners: [
      { name: "Klaviyo", logo: LOGOS.klaviyo },
      { name: "Attentive", logo: LOGOS.attentive },
      { name: "Mailchimp", logo: LOGOS.mailchimp },
      { name: "ActiveCampaign", logo: LOGOS.activecampaign },
      { name: "Constant Contact", logo: LOGOS.constantcontact },
    ],
    cta: "Let's Talk Lifecycle Marketing"
  },
  {
    icon: ICONS.webDesign,
    label: "Web Design & Development",
    title: "Web Design & Development",
    description: "We craft intuitive, robust web solutions that transform your vision into captivating digital experiences.",
    img: SECTION_IMAGES.webDesign,
    partners: [
      { name: "WordPress VIP", logo: LOGOS.wordpress },
      { name: "Shopify Plus", logo: LOGOS.shopify },
      { name: "BigCommerce", logo: LOGOS.bigcommerce },
      { name: "Webflow", logo: LOGOS.webflow },
    ],
    cta: "Let's Talk Web"
  },
];

export const StickyScroll: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={targetRef} className="relative h-[500vh] bg-[#020a07]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Text Content */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center px-6 md:px-20 z-10 bg-[#020a07]/90 md:bg-[#020a07]">
          <div className="relative w-full max-w-lg h-[420px] md:h-[480px]">
            {CONTENT.map((item, index) => {
              const segmentLength = 1 / CONTENT.length;
              const start = index * segmentLength;
              const end = start + segmentLength;
              
              const opacity = useTransform(
                scrollYProgress,
                [start, start + 0.08, end - 0.08, end],
                [0, 1, 1, 0]
              );

              const y = useTransform(
                scrollYProgress,
                [start, start + 0.08, end - 0.08, end],
                [50, 0, 0, -50]
              );

              return (
                <motion.div
                  key={index}
                  style={{ opacity, y }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  {/* Service Icon + Label */}
                  <div className="flex items-center gap-3 mb-5">
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-5 h-5 md:w-6 md:h-6 object-contain"
                    />
                    <span className="text-[#C4A24B] font-['Space_Mono'] font-bold uppercase tracking-widest text-xs md:text-sm">
                      {item.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-5xl font-['Oswald'] font-bold uppercase mb-4 text-white leading-tight">
                    {item.title}
                  </h2>

                  {/* Description */}
                  <p className="text-base md:text-lg text-neutral-400 font-['Manrope'] leading-relaxed font-light mb-6">
                    {item.description}
                  </p>

                  {/* Certified Partners */}
                  <div className="mb-5">
                    <p className="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-neutral-400 mb-3">
                      ── certified partners
                    </p>
                    <div className="flex items-center gap-4 flex-wrap">
                      {item.partners.map((partner, pIdx) => (
                        <img
                          key={pIdx}
                          src={partner.logo}
                          alt={partner.name}
                          title={partner.name}
                          className="w-8 h-8 md:w-9 md:h-9 object-contain opacity-50 hover:opacity-100 transition-opacity duration-200"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="self-start text-xs font-['Space_Mono'] font-bold uppercase tracking-widest text-[#C4A24B] border border-[#C4A24B]/30 rounded-full px-5 py-2.5 hover:bg-[#C4A24B]/10 hover:border-[#C4A24B]/60 transition-all duration-300">
                    {item.cta}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Image Visuals */}
        <div className="absolute inset-0 md:relative md:w-1/2 h-full">
           {CONTENT.map((item, index) => {
             const segmentLength = 1 / CONTENT.length;
             const start = index * segmentLength;
             const end = start + segmentLength;

             const isLast = index === CONTENT.length - 1;
             const opacityRange = isLast 
                ? [start, start + 0.05, 1, 1] 
                : [start, start + 0.05, end - 0.05, end];
             
             const opacity = useTransform(
               scrollYProgress,
               opacityRange,
               [0, 1, 1, 0]
             );
             
             const scale = useTransform(scrollYProgress, [start, end], [1.1, 1]);

             return (
               <motion.div
                 key={index}
                 style={{ opacity }}
                 className="absolute inset-0 w-full h-full"
               >
                <motion.img
                   style={{ scale }}
                   src={item.img}
                   alt={item.title}
                   className="w-full h-full object-cover"
                />
                 {/* Vignette Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#020a07]/50 to-[#020a07]" />
               </motion.div>
             );
           })}
        </div>

      </div>
    </section>
  );
};
