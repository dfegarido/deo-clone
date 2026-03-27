import React from 'react';
import { motion } from 'framer-motion';

interface FooterProps {
  onBecomePartner: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBecomePartner }) => {
  return (
    <footer
      id="contact"
      className="text-white overflow-hidden"
      style={{
        background: '#041210',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="container mx-auto px-6 md:px-[87px] flex flex-col items-center text-center pt-32 pb-12">

        {/* Heading — DM Sans 700 56px uppercase gradient */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 56px)',
            lineHeight: '67px',
            textTransform: 'uppercase',
            textAlign: 'center',
            backgroundImage: 'linear-gradient(180deg, #E8D5A3 0%, #FFFFFF 50%, #A8E6CF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Grow with Evolutra
        </motion.h2>

        {/* Subtitle — Manrope 400 18px #9CA3AF */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '28px',
            color: '#9CA3AF',
            textAlign: 'center',
          }}
        >
          Let's build a smarter growth engine for your brand.
        </motion.p>

        {/* Button — C4A24B bg, rounded-full, Manrope 700 14px letter-spacing 1.4px */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-24"
        >
          <button
            type="button"
            onClick={onBecomePartner}
            className="group inline-flex items-center gap-3 transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(196,162,75,0.4)] hover:bg-[#2D5F52]"
            style={{
              background: '#C4A24B',
              borderRadius: '9999px',
              paddingLeft: '32px',
              paddingRight: '32px',
              height: '52px',
            }}
          >
            {/* Arrow SVG */}
            <svg
              width="24"
              height="18"
              viewBox="0 0 63 49"
              fill="none"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M48 27H0.5V22H62.5V27C46.5 27 42.8333 41.3333 43 49H37.5C37.5 34.2 44.1667 28.5 48 27Z" fill="white" />
              <path d="M48 22H0.5V27H62.5V22C46.5 22 42.8333 7.66667 43 0H37.5C37.5 14.8 44.1667 20.5 48 22Z" fill="white" />
            </svg>
            {/* Label — Manrope 700 14px letter-spacing 1.4px uppercase white */}
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '1.4px',
                textTransform: 'uppercase',
                color: '#FFFFFF',
              }}
            >
              Become a Partner
            </span>
          </button>
        </motion.div>

        {/* Bottom 3-column links */}
        <div
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 pt-12"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          {/* Contact */}
          <div className="flex flex-col gap-2 items-center md:items-start">
            <h4
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '1.4px',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                marginBottom: '8px',
              }}
            >
              Contact
            </h4>
            <a
              href="mailto:hello@evolutra.com"
              className="hover:text-white transition-colors"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0.7px',
                textTransform: 'uppercase',
                color: '#6B7280',
              }}
            >
              hello@evolutra.com
            </a>
            {/* <a
              href="tel:+15550000000"
              className="hover:text-white transition-colors"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0.7px',
                textTransform: 'uppercase',
                color: '#6B7280',
              }}
            >
              +1 (555) 000-0000
            </a> */}
          </div>

          {/* Social */}
          <div className="flex flex-col gap-2 items-center">
            <h4
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '1.4px',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                marginBottom: '8px',
              }}
            >
              Social
            </h4>
            <div className="flex gap-6">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/company/evolutra-digital/posts/?feedView=all' },
                { label: 'Twitter', href: 'https://x.com/evolutra?s=21' },
              ].map((platform) => (
                <a
                  key={platform.label}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    letterSpacing: '0.7px',
                    textTransform: 'uppercase',
                    color: '#6B7280',
                  }}
                >
                  {platform.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-2 items-center md:items-end">
            <h4
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '1.4px',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                marginBottom: '8px',
              }}
            >
              Legal
            </h4>
            {['Privacy Policy', 'Terms of Service'].map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-white transition-colors"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0.7px',
                  textTransform: 'uppercase',
                  color: '#6B7280',
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright — Space Mono 400 10px letter-spacing 1px #262626 */}
        <div
          className="mt-20"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontWeight: 400,
            fontSize: '10px',
            lineHeight: '15px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#9CA3AF',
            textAlign: 'center',
          }}
        >
          © {new Date().getFullYear()} Evolutra. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};
