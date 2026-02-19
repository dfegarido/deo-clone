import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-6 md:px-12 mix-blend-difference text-white"
      >
        <a href="#" className="text-2xl font-bold tracking-tighter font-['Oswald'] uppercase">
          DOE<span className="text-gray-400">CLONE</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xs font-bold font-['Space_Mono'] uppercase tracking-widest hover:text-yellow-500 transition-colors relative group"
            >
              <span className="text-yellow-500 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 inline-block mr-1">/</span>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? "0%" : "100%" }}
        transition={{ type: "tween", duration: 0.4 }}
        className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center md:hidden"
      >
        <nav className="flex flex-col gap-8 text-center">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-4xl font-bold uppercase tracking-tighter font-['Oswald'] hover:text-yellow-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </motion.div>
    </>
  );
};