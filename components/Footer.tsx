import React from 'react';
import { Button } from './ui/Button';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-black text-white pt-32 pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="container mx-auto flex flex-col items-center text-center">
        <h2 className="text-6xl md:text-9xl font-['Oswald'] font-bold uppercase tracking-tighter mb-8 leading-none">
          Let's Work<br /><span className="text-neutral-600">Together</span>
        </h2>
        
        <p className="text-lg text-gray-400 font-['Manrope'] max-w-xl mb-12">
          Ready to scale your brand? We help ambitious businesses grow through strategic digital marketing and creative excellence.
        </p>

        <Button className="mb-24 scale-125">Start Your Project</Button>

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