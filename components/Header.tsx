import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

interface HeaderProps {
  onGetInTouch: () => void;
  onLogoClick: () => void;
  currentPage: 'home' | 'contact';
}

export const Header: React.FC<HeaderProps> = ({ onGetInTouch, onLogoClick, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label: string) => {
    e.preventDefault();
    setIsOpen(false);

    // If "Get in Touch" is clicked, navigate to contact page
    if (label.toLowerCase() === 'get in touch') {
      onGetInTouch();
      return;
    }

    // If on contact page, go home first then scroll
    if (currentPage === 'contact') {
      onLogoClick();
      return;
    }

    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);
    onLogoClick();
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 md:px-12"
      >
        <a href="#" onClick={handleLogoClick} className="text-2xl font-bold tracking-tight font-['Manrope'] lowercase">
          <span className="text-[#C4A24B]">ev</span><span className="text-[#2D5F52]">olutra</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 mix-blend-difference">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href, item.label)}
              className="text-xs font-bold font-['Space_Mono'] uppercase tracking-widest text-white hover:text-[#C4A24B] transition-colors relative group"
            >
              <span className="text-[#C4A24B] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 inline-block mr-1">/</span>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden mix-blend-difference text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? "0%" : "100%" }}
        transition={{ type: "tween", duration: 0.4 }}
        className="fixed inset-0 bg-[#041210] z-40 flex flex-col justify-center items-center md:hidden"
      >
        <nav className="flex flex-col gap-8 text-center">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href, item.label)}
              className="text-4xl font-bold uppercase tracking-tighter font-['Oswald'] hover:text-[#C4A24B] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </motion.div>
    </>
  );
};
