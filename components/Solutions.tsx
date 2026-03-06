import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Search, Network, Monitor, Crosshair, Users, BarChart2, RadioTower, CheckCircle2, ChevronDown, Mail, Palette, List, Database, Zap } from 'lucide-react';

interface ServiceCard {
  id: number;
  icon: React.FC<{ className?: string }>;
  title: string;
  description: string;
  partners: string[];
  buttonText: string;
}

const SERVICES: ServiceCard[] = [
  {
    id: 1,
    icon: Target,
    title: 'A Crowded Digital Space',
    description: "The internet is more saturated than ever before. E-commerce stores, social platforms, newsletters, and media sites are all fighting for the same limited consumer attention.",
    partners: ['TikTok', 'Snapchat', 'Pinterest', 'LinkedIn', 'X', 'Meta', 'Reddit'],
    buttonText: "LET'S TALK SOCIAL",
  },
  {
    id: 2,
    icon: Search,
    title: 'The Explosion of Content',
    description: 'Videos, blogs, podcasts, social feeds, newsletters — content is being produced at an unprecedented pace. The result? Even great brands struggle to stand out.',
    partners: [],
    buttonText: "LET'S TALK PAID SEARCH",
  },
  {
    id: 3,
    icon: Network,
    title: 'Increasing Marketing Costs',
    description: 'Paid advertising costs continue to rise while returns shrink. Marketers are spending more but seeing less predictable results.',
    partners: [],
    buttonText: 'LETS TALK LIFECYCLE MARKETING',
  },
  {
    id: 4,
    icon: Monitor,
    title: 'Growing Regulatory Restrictions',
    description: 'New rules from major platforms like Google and Yahoo are constantly changing the landscape. Data privacy, deliverability, and compliance have become critical challenges.',
    partners: [],
    buttonText: 'LETS TALK WEB',
  },
];

// Partner logo for dark section
const PartnerLogoDark: React.FC<{ name: string }> = ({ name }) => (
  <div className="px-3 py-1.5 bg-white/5 rounded border border-white/10 text-white/60 text-xs font-['Space_Mono'] uppercase tracking-wider">
    {name}
  </div>
);

export const Solutions: React.FC = () => {
  return (
    <div className="min-h-screen">

      {/* ── SECTION 1 ── The Challenge — dark #041814 (matches Hero) */}
      <section className="py-20 sm:py-28 md:py-36 px-6 md:px-12 bg-[#041814] text-white">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <div className="mb-6 overflow-hidden px-2 flex justify-center">
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
                  fontSize: 'clamp(1rem, 3.5vw, 1.5rem)',
                  lineHeight: '110%',
                  letterSpacing: '0.04em',
                  color: '#E3B645',
                  textAlign: 'center',
                }}
              >
                ( THE CHALLENGE )
              </motion.span>
            </div>
            <h1 className="font-['DM_Sans'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase mb-4 text-white">
              The Digital World Is
            </h1>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: 'italic',
                color: '#ffffff',
              }}
            >
              Louder Than Ever
            </h2>
            <p className="mt-6 md:mt-8 max-w-2xl mx-auto font-['Manrope'] text-base sm:text-lg text-white/80 leading-relaxed">
              Today's brands aren't just competing with their direct competitors. They're competing with every piece of content online.
            </p>
            <p className="mt-4 max-w-2xl mx-auto font-['Manrope'] text-base sm:text-lg text-white/80 leading-relaxed">
              Consumers are overwhelmed with information, and getting their attention is harder than ever.
            </p>
          </motion.div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {SERVICES.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-[#071A13] border border-white/10 rounded-lg p-6 md:p-8 flex flex-col hover:border-[#C4A24B]/50 transition-colors duration-300"
                >
                  <div className="mb-4">
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  <h3 className="font-['Oswald'] text-xl md:text-2xl font-bold uppercase mb-3 text-white">
                    {service.title}
                  </h3>
                  <p className="font-['Manrope'] text-sm md:text-base text-white/70 mb-6 flex-grow leading-relaxed">
                    {service.description}
                  </p>
                  <button
                    className="w-full transition-all duration-300 hover:opacity-90 hover:scale-105"
                    style={{
                      height: '52px',
                      background: '#C4A24B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 0,
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 500,
                      fontSize: '18px',
                      lineHeight: '110%',
                      letterSpacing: '0.04em',
                      color: '#000000',
                      textTransform: 'uppercase',
                    }}
                  >
                    {service.buttonText}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 2 ── The Solution — light #CEE8DE (matches TrustedBy) */}
      <section className="py-20 sm:py-28 md:py-36 px-6 md:px-12 bg-[#CEE8DE]">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

            {/* Left Column: Label + Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/3 lg:sticky lg:top-24 lg:self-start"
            >
              <span
                className="inline-block mb-6 px-5 py-[5px] rounded-full"
                style={{
                  border: '1px solid rgba(4, 24, 20, 0.25)',
                  backdropFilter: 'blur(6px)',
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(1rem, 3.5vw, 1.5rem)',
                  lineHeight: '110%',
                  letterSpacing: '0.04em',
                  color: '#E3B645',
                }}
              >
                ( THE SOLUTION )
              </span>
              <h2 className="font-['DM_Sans'] text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-tight mb-6 text-[#041814]">
                Smarter Distribution. Better Targeting.
              </h2>
              <h3
                className="text-2xl sm:text-3xl md:text-4xl font-normal mb-8"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  color: '#041814',
                }}
              >
                Real Results.
              </h3>
              <p className="font-['Manrope'] text-base sm:text-lg leading-relaxed" style={{ color: '#444444' }}>
                At Evolutra, our approach focuses on understanding consumer behavior and delivering marketing that feels relevant instead of intrusive.
              </p>
            </motion.div>

            {/* Right Column: Feature Grid */}
            <div className="w-full lg:w-2/3">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#041814]/10">
                {[
                  {
                    icon: Crosshair,
                    title: 'Highly Targeted Marketing',
                    description: 'We use precise audience targeting to ensure your message reaches people who are most likely to engage and convert.',
                  },
                  {
                    icon: Users,
                    title: 'Identifying Consumer Needs',
                    description: 'By analyzing behavior and preferences, we help brands understand what customers actually want — and how to deliver it.',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className={`p-8 md:p-10 border-t border-[#041814]/10 ${i === 0 ? 'md:border-r md:border-[#041814]/10' : ''}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#C4A24B]/10 flex items-center justify-center mb-6 border border-[#C4A24B]/30">
                      <item.icon className="w-5 h-5 text-[#C4A24B]" />
                    </div>
                    <h4 className="font-['Oswald'] text-xl md:text-2xl font-bold uppercase mb-3 text-[#041814]">
                      {item.title}
                    </h4>
                    <p className="font-['Manrope'] text-base leading-relaxed" style={{ color: '#444444' }}>
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#041814]/10">
                {[
                  {
                    icon: BarChart2,
                    title: 'Proving Intent with Data',
                    description: 'Our data-driven strategies help identify signals of interest and buying intent, allowing campaigns to perform with greater accuracy.',
                  },
                  {
                    icon: RadioTower,
                    title: 'Capturing Attention in the Right Channels',
                    description: 'Instead of fighting for space in overcrowded environments, we focus on channels where meaningful engagement can happen.',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className={`p-8 md:p-10 border-t border-[#041814]/10 ${i === 0 ? 'md:border-r md:border-[#041814]/10' : ''}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#C4A24B]/10 flex items-center justify-center mb-6 border border-[#C4A24B]/30">
                      <item.icon className="w-5 h-5 text-[#C4A24B]" />
                    </div>
                    <h4 className="font-['Oswald'] text-xl md:text-2xl font-bold uppercase mb-3 text-[#041814]">
                      {item.title}
                    </h4>
                    <p className="font-['Manrope'] text-base leading-relaxed" style={{ color: '#444444' }}>
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Result callout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-8 md:p-10 border-t border-[#041814]/10"
              >
                <p
                  className="text-xl sm:text-2xl leading-relaxed"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', color: '#041814' }}
                >
                  The result is marketing that feels personal, measurable, and scalable.
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3 ── Why We Love Email — dark #041814 */}
      <EndToEndSection />

      {/* ── SECTION 4 ── End-to-End Email Marketing — light #CEE8DE */}
      <FullServiceSection />

    </div>
  );
};

const END_TO_END_SERVICES = [
  {
    icon: BarChart2,
    title: 'Superior Conversion Rates',
    description: 'Email consistently outperforms many social platforms when it comes to converting attention into real results.',
  },
  {
    icon: Database,
    title: 'Full Performance Transparency',
    description: 'Every campaign provides detailed insights — opens, clicks, engagement, and conversions — giving marketers the ability to refine strategy in real time.',
  },
  {
    icon: Users,
    title: 'Massive Audience Reach',
    description: 'Billions of people check email every day. It remains one of the most universally used digital communication channels.',
  },
  {
    icon: Zap,
    title: 'Exceptional ROI',
    description: 'Email marketing continues to deliver one of the highest returns in digital marketing, generating an average of $42 for every $1 spent.',
  },
  {
    icon: CheckCircle2,
    title: 'Customer Retention',
    description: 'Personalized messages, updates, and offers help brands maintain strong relationships with their audience over time.',
  },
  {
    icon: Target,
    title: 'Cost-Effective Growth',
    description: 'Compared to paid advertising or social media campaigns, email allows brands to scale outreach efficiently with a much lower cost barrier.',
  },
];

const MEDIA_CARDS = [
  {
    tag: 'Email Strategy',
    title: 'How data-driven email campaigns drive 3x higher conversion rates for e-commerce brands',
    source: 'Evolutra Insights',
    date: 'Mar 2025',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80&auto=format&fit=crop',
  },
  {
    tag: 'Creative',
    title: 'The anatomy of a high-converting email: design principles that actually work',
    source: 'Evolutra Blog',
    date: 'Feb 2025',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80&auto=format&fit=crop',
  },
  {
    tag: 'Segmentation',
    title: 'Why list hygiene is the most underrated lever in email marketing performance',
    source: 'Evolutra Insights',
    date: 'Jan 2025',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format&fit=crop',
  },
  {
    tag: 'Deliverability',
    title: 'Scaling to 100M sends per month: what we learned about infrastructure and inbox rates',
    source: 'Evolutra Blog',
    date: 'Dec 2024',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80&auto=format&fit=crop',
  },
];

// Section 3 — dark bg #041814
const EndToEndSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-28 md:py-36 px-6 md:px-12 bg-[#041814] text-white">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Left Column: Media Cards Grid */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 grid grid-cols-2 gap-4"
          >
            {MEDIA_CARDS.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-lg overflow-hidden border border-white/10 group cursor-pointer flex flex-col"
                style={{ minHeight: '220px' }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                <div className="relative z-10 flex flex-col justify-between h-full p-4">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-[#C4A24B]/20 border border-[#C4A24B]/40 rounded text-[10px] font-['Space_Mono'] uppercase tracking-wider text-[#C4A24B]">
                      {card.tag}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-['Space_Mono'] text-white/50 uppercase tracking-wider">{card.source}</span>
                      <span className="text-white/30 text-xs">·</span>
                      <span className="text-[10px] font-['Space_Mono'] text-white/50">{card.date}</span>
                    </div>
                    <p className="font-['Manrope'] text-xs sm:text-sm font-semibold text-white leading-snug">
                      {card.title}
                    </p>
                    <span className="inline-block mt-2 text-[10px] font-['Space_Mono'] uppercase tracking-wider text-[#C4A24B] group-hover:underline">
                      Read more
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column: Heading + Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="font-['DM_Sans'] text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-tight mb-6 text-white">
              Why We Love Email So Much
            </h2>
            <p className="font-['Manrope'] text-base sm:text-lg text-white/70 leading-relaxed mb-4">
              In a constantly shifting digital landscape, email remains one of the most powerful marketing channels available.
            </p>
            <p className="font-['Manrope'] text-base sm:text-lg text-white/70 leading-relaxed mb-10">
              It allows brands to build direct relationships with their audience while delivering highly personalized messages that drive action.
            </p>

            {/* Accordion */}
            <div className="flex flex-col">
              {END_TO_END_SERVICES.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="border-t border-white/10 last:border-b">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <CheckCircle2
                          className={`w-5 h-5 shrink-0 transition-colors duration-300 ${isOpen ? 'text-[#C4A24B]' : 'text-white/30'}`}
                        />
                        <span className={`font-['Oswald'] text-base sm:text-lg font-bold uppercase tracking-wide transition-colors duration-300 ${isOpen ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                          {item.title}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#C4A24B]' : ''}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pb-5 pl-9">
                            <p className="font-['Manrope'] text-base text-white/60 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

const FULL_SERVICE_ITEMS = [
  {
    icon: Mail,
    title: 'Strategy & Campaign Execution',
    description: 'We manage the entire lifecycle of your campaigns — from planning and creative development to deployment and performance analysis.',
  },
  {
    icon: Palette,
    title: 'Custom Creative Design',
    description: 'Our creative team builds high-performing email templates and visuals designed to capture attention and encourage engagement.',
  },
  {
    icon: List,
    title: 'List Management & Targeted Campaigns',
    description: 'We maintain clean, well-segmented lists to ensure your campaigns reach the right audience segments with relevant messaging.',
  },
  {
    icon: Database,
    title: 'Advanced Data Segmentation',
    description: 'Using our internal data and analytics capabilities, we segment audiences based on behavior, intent, and engagement patterns.',
  },
  {
    icon: Zap,
    title: 'High-Volume Email Delivery',
    description: 'Our infrastructure enables large-scale distribution, allowing campaigns to reach millions of potential customers efficiently.',
  },
];

// Section 4 — light bg #CEE8DE
const FullServiceSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-28 md:py-36 px-6 md:px-12 bg-[#CEE8DE]">
      <div className="container mx-auto">

        {/* Top centered heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
        >
          <h2 className="font-['DM_Sans'] text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-tight mb-6 text-[#041814]">
            End-to-End{' '}
            <span style={{ color: '#C4A24B' }}>Email Marketing</span>{' '}
            Solutions
          </h2>
          <p className="font-['Manrope'] text-base sm:text-lg leading-relaxed" style={{ color: '#444444' }}>
            Evolutra provides a complete set of services designed to help brands scale customer acquisition and engagement through intelligent email marketing.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">

          {/* Left: Feature image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="w-full lg:w-1/2"
          >
            <img
              src="https://sweatpantsagency.com/wp-content/uploads/2024/10/Unlock-Exceptional-Growth-with-Strategic-Data-Driven-Email-SMS-Marketing-1.png"
              alt="End-to-End Email Marketing Solutions"
              className="w-full h-auto rounded-2xl"
            />
          </motion.div>

          {/* Right: Accordion — dark-on-light styling */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="w-full lg:w-1/2 flex flex-col gap-3"
          >
            {FULL_SERVICE_ITEMS.map((item, i) => {
              const isOpen = openIndex === i;
              const IconComp = item.icon;
              return (
                <div
                  key={i}
                  className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-[#C4A24B]/50 bg-[#C4A24B]/10'
                      : 'border-[#041814]/10 bg-[#041814]/5 hover:border-[#041814]/20'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? 'bg-[#C4A24B]/20' : 'bg-[#041814]/10'}`}>
                        <IconComp className={`w-5 h-5 transition-colors duration-300 ${isOpen ? 'text-[#C4A24B]' : 'text-[#041814]/50'}`} />
                      </div>
                      <span className={`font-['Oswald'] text-base sm:text-lg font-bold uppercase tracking-wide transition-colors duration-300 ${isOpen ? 'text-[#041814]' : 'text-[#041814]/70 group-hover:text-[#041814]'}`}>
                        {item.title}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 text-[#C4A24B]' : 'text-[#041814]/30'}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pl-[4.25rem]">
                          <p className="font-['Manrope'] text-sm sm:text-base leading-relaxed" style={{ color: '#444444' }}>
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Let's Talk button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-4"
            >
              <button
                className="transition-all duration-300 hover:opacity-90 hover:scale-105"
                style={{
                  width: '252px',
                  height: '52px',
                  background: '#C4A24B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 0,
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 500,
                  fontSize: '24px',
                  lineHeight: '110%',
                  letterSpacing: '0.04em',
                  color: '#000000',
                  textTransform: 'uppercase',
                }}
              >
                Let's Talk
              </button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
