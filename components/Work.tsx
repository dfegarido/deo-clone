import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface CaseStudy {
  brand: string;
  subtitle: string;
  description: string;
  stats: { val: string; text: string }[];
  leftImage: string;
  rightImage: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    brand: 'Advertiser #1',
    subtitle: "DOE Empowers Advertiser #1's Lead Generation",
    description: "We've developed a multi-faceted approach, leveraging precise audience targeting, compelling creative assets, and data-driven optimization across both Google and Meta to drive high-quality leads.",
    stats: [
      { val: "32%", text: "Decrease in Meta CPL" },
      { val: "5X", text: "Increase in Ad Spend" },
      { val: "67%", text: "Decrease in CPL on Google Ads" },
      { val: "8K", text: "Accounts Created" },
      { val: "2K+", text: "Qualified Leads" },
      { val: "$11M", text: "In Revenue" },
    ],
    leftImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
    rightImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
  },
  {
    brand: 'Advertiser #2',
    subtitle: "Scaling Email Revenue for Advertiser #2",
    description: "High-volume email distribution combined with advanced segmentation turned cold lists into a predictable revenue engine, delivering consistent ROI month over month.",
    stats: [
      { val: "1.2B", text: "Emails Deployed" },
      { val: "48%", text: "Open Rate Lift" },
      { val: "3.2X", text: "Revenue per Send" },
      { val: "12K", text: "New Subscribers" },
      { val: "19%", text: "CTR Improvement" },
      { val: "$4.8M", text: "Attributed Revenue" },
    ],
    leftImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    rightImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
  },
  {
    brand: 'Advertiser #3',
    subtitle: "Retargeting & Data Monetization for Advertiser #3",
    description: "We turned dormant first-party data into a high-performing retargeting engine, unlocking hidden value and driving down acquisition costs across every channel.",
    stats: [
      { val: "41%", text: "Lower CAC" },
      { val: "6X", text: "ROAS on Retargeting" },
      { val: "280K", text: "Re-Engaged Contacts" },
      { val: "52%", text: "Conversion Lift" },
      { val: "$7.2M", text: "Recovered Revenue" },
      { val: "3.8X", text: "LTV Increase" },
    ],
    leftImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&auto=format&fit=crop",
    rightImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
  },
  {
    brand: 'Advertiser #4',
    subtitle: "AI-Powered Lead Qualification for Advertiser #4",
    description: "AI calling and SMS qualification dramatically increased speed-to-lead while reducing cost per acquisition across all channels.",
    stats: [
      { val: "78%", text: "Faster Lead Response" },
      { val: "4.5X", text: "Qualified Lead Volume" },
      { val: "35%", text: "Lower CPA" },
      { val: "22K", text: "AI-Qualified Leads" },
      { val: "91%", text: "Contact Rate" },
      { val: "$9.1M", text: "Pipeline Generated" },
    ],
    leftImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
    rightImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    brand: 'Advertiser #5',
    subtitle: "Full-Funnel Campaign Execution for Advertiser #5",
    description: "End-to-end creative and campaign execution with dedicated deployments and optimized journeys built to capture attention and convert at scale.",
    stats: [
      { val: "58%", text: "Higher Engagement" },
      { val: "3X", text: "Campaign Throughput" },
      { val: "44%", text: "Increase in Conversions" },
      { val: "150+", text: "Campaigns Launched" },
      { val: "$6.3M", text: "Revenue Driven" },
      { val: "2.1X", text: "Creative Performance" },
    ],
    leftImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
    rightImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=500&auto=format&fit=crop",
  },
];

const CaseStudyBlock: React.FC<{ study: CaseStudy }> = ({ study }) => {
  const blockRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"],
  });

  // Left image: slides left & rotates as you scroll
  const leftX = useTransform(scrollYProgress, [0.1, 0.6], ["10%", "-25%"]);
  const leftRotate = useTransform(scrollYProgress, [0.1, 0.6], [0, -5]);

  // Right image: slides right & rotates as you scroll
  const rightX = useTransform(scrollYProgress, [0.1, 0.6], ["-10%", "25%"]);
  const rightRotate = useTransform(scrollYProgress, [0.1, 0.6], [0, 5]);

  // Center content fades in
  const centerOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const centerScale = useTransform(scrollYProgress, [0.2, 0.4], [0.8, 1]);

  return (
    <div
      ref={blockRef}
      className="relative w-full max-w-[1920px] mx-auto min-h-[800px] flex justify-center items-center perspective-[1000px]"
    >
      {/* Left Image */}
            <motion.div 
                style={{ x: leftX, rotate: leftRotate }}
                className="absolute left-[5%] md:left-[10%] w-[45%] md:w-[35%] h-[500px] md:h-[700px] z-20 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl hidden md:block will-change-transform"
            >
                <div className="relative w-full h-full">
                    <img 
            src={study.leftImage}
                        alt="Coast" 
                        className="w-full h-full object-cover brightness-75 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                </div>
            </motion.div>

      {/* Right Image */}
            <motion.div 
                style={{ x: rightX, rotate: rightRotate }}
                className="absolute right-[5%] md:right-[10%] w-[45%] md:w-[35%] h-[500px] md:h-[700px] z-20 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl hidden md:block will-change-transform"
            >
                <div className="relative w-full h-full">
                    <img 
            src={study.rightImage}
                        alt="Architecture" 
                        className="w-full h-full object-cover brightness-75 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent" />
                </div>
            </motion.div>

      {/* Center Content */}
            <motion.div 
        style={{ opacity: centerOpacity, scale: centerScale }}
                className="relative z-30 max-w-2xl mx-auto text-center px-6 flex flex-col items-center"
            >
                {/* Brand Logo/Icon */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
            <span className="text-5xl font-['Oswald'] font-bold tracking-tight text-white">
              {study.brand}
            </span>
                    </div>
                </div>

        <h3 className="text-xs font-['Space_Mono'] uppercase tracking-[0.2em] font-bold text-[#C4A24B] mb-6">
          {study.subtitle}
                </h3>

                <p className="text-neutral-300 mb-10 leading-relaxed text-sm md:text-base max-w-lg mx-auto">
          {study.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full mb-10">
          {study.stats.map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-md hover:bg-white/10 transition-colors text-left"
            >
              <div className="text-2xl md:text-3xl font-bold font-['Oswald'] text-white mb-1">
                {item.val}
              </div>
              <div className="text-[9px] text-neutral-400 uppercase leading-tight font-['Space_Mono'] font-bold">
                {item.text}
              </div>
                        </div>
                    ))}
                </div>

            </motion.div>
    </div>
  );
};

export const Work: React.FC = () => {
  return (
    <section
      id="work"
      className="relative py-32 bg-[#071a13] overflow-hidden border-t border-white/10"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2D5F52]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-24 text-center">
            <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-xs font-bold font-['Space_Mono'] uppercase tracking-[0.2em] text-[#C4A24B] mb-4 block"
            >
                [ Selected Work ]
            </motion.span>
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-['Oswald'] font-bold text-white uppercase leading-[0.9]"
            >
            Trusted by 2,000+{' '}
            <br />
            <span className="font-serif-italic font-normal lowercase bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent">
              leading brands
            </span>
            </motion.h2>
        </div>

        {/* 5 Case Study Blocks */}
        <div className="flex flex-col gap-32">
          {CASE_STUDIES.map((study, index) => (
            <CaseStudyBlock key={index} study={study} />
          ))}
        </div>

      </div>
    </section>
  );
};
