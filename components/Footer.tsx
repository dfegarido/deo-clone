import React from 'react';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-black text-white pt-32 pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="container mx-auto flex flex-col items-center text-center">
        {/* Infinity SVG Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 305 202" width="200" height="130" className="opacity-80">
            <g>
              <path fill="rgb(135,154,239)" d="M32.898,133.205 C32.898,144.818 35.45,153.732 38.787,159.126 C43.162,166.191 49.687,169.189 56.339,169.189 C64.918,169.189 72.766,167.063 87.891,146.176 C100.012,129.435 114.287,105.936 123.894,91.204 C129.317,82.885 134.74,74.565 140.163,66.245 C151.464,48.912 164.545,29.644 179.544,16.583 C191.792,5.922 204.996,0 218.289,0 C240.607,0 261.865,12.913 278.134,37.132 C295.939,63.654 304.582,97.064 304.582,131.539 C304.582,152.036 300.536,167.095 293.651,178.993 C287,190.498 274.035,201.995 252.226,201.995 L252.226,169.184 C270.9,169.184 275.559,152.051 275.559,132.444 C275.559,104.503 269.035,73.496 254.661,51.34 C244.463,35.625 231.244,26.022 216.701,26.022 C200.971,26.022 188.314,37.869 174.088,58.986 C166.525,70.207 158.762,83.881 150.044,99.311 C146.845,104.969 143.646,110.627 140.447,116.285 C121.172,150.418 116.289,158.188 106.65,171.013 C89.757,193.474 75.33,201.99 56.339,201.99 C33.809,201.99 19.563,192.249 10.74,177.57 C3.538,165.61 0,149.915 0,132.032 L32.898,133.205Z" />
              <path fill="rgb(135,154,239)" d="M25.94,39.447 C41.023,16.234 62.79,0 87.755,0 L87.224,33.029 C74.229,33.029 63.191,42.134 53.956,56.062 C40.895,75.743 32.905,105.058 32.905,133.211 C32.905,144.823 35.456,153.738 38.794,159.131 L10.74,177.575 C3.538,165.615 0,149.92 0,132.037 C0,99.517 8.94,65.622 25.94,39.447Z" />
              <path fill="rgb(135,154,239)" d="M25.94,39.447 C41.023,16.234 62.79,0 87.755,0 C102.213,0 116.589,4.273 131.595,16.509 C148.012,29.885 165.51,51.922 187.341,88.227 L195.168,101.252 C214.064,132.683 224.814,148.854 231.106,156.479 C239.198,166.271 244.865,169.191 252.226,169.191 C270.901,169.191 275.56,152.057 275.56,132.45 L304.582,131.541 C304.582,152.037 300.537,167.096 293.651,178.994 C287,190.5 274.035,201.996 252.226,201.996 C238.668,201.996 226.658,199.056 213.375,186.544 C203.169,176.942 191.227,159.884 182.043,144.549 L154.727,98.99 C141.022,76.126 128.445,59.078 121.173,51.357 C113.344,43.054 103.282,33.029 87.224,33.029 C74.229,33.029 63.191,42.134 53.956,56.062 L25.94,39.447Z" />
            </g>
          </svg>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-9xl font-['Oswald'] font-bold uppercase tracking-tighter mb-8 leading-none"
        >
          Grow with Evolutra
        </motion.h2>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-400 font-['Manrope'] max-w-xl mb-12"
        >
          Let's build a smarter growth engine for your brand.
        </motion.p>

        {/* Apply Now Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-24"
        >
          <button
            type="button"
            className="group inline-flex items-center gap-3 bg-[#3E6CFF] hover:bg-[#2d5be6] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(62,108,255,0.4)]"
          >
            <svg width="24" height="18" viewBox="0 0 63 49" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M48 27H0.5V22H62.5V27C46.5 27 42.8333 41.3333 43 49H37.5C37.5 34.2 44.1667 28.5 48 27Z" fill="currentColor" />
              <path d="M48 22H0.5V27H62.5V22C46.5 22 42.8333 7.66667 43 0H37.5C37.5 14.8 44.1667 20.5 48 22Z" fill="currentColor" />
            </svg>
            <span>Become a Partner</span>
          </button>
        </motion.div>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12 text-sm text-gray-500 font-['Space_Mono'] uppercase tracking-wider">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <h4 className="text-white font-bold mb-2 font-['Oswald'] tracking-widest">Contact</h4>
            <a href="mailto:hello@doemedia.clone" className="hover:text-white transition-colors">hello@doemedia.clone</a>
            <a href="tel:+15550000000" className="hover:text-white transition-colors">+1 (555) 000-0000</a>
          </div>
          
          <div className="flex flex-col gap-2 items-center">
            <h4 className="text-white font-bold mb-2 font-['Oswald'] tracking-widest">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center md:items-end">
             <h4 className="text-white font-bold mb-2 font-['Oswald'] tracking-widest">Legal</h4>
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

        <div className="mt-20 text-neutral-800 text-[10px] font-['Space_Mono'] uppercase tracking-widest">
          © {new Date().getFullYear()} DOE Media Clone. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};