import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Problem } from './components/Problem';
import { Work } from './components/Work';
import { Services } from './components/Services';
import { StickyScroll } from './components/StickyScroll';
import { Footer } from './components/Footer';

// Smooth scroll implementation helper
// Note: In a real production app, we would use a library like 'lenis' here
// But to ensure it works without npm install in this environment, 
// we are using standard CSS scroll-behavior: smooth in global styles for simplicity
// and Framer Motion for the parallax effects.

function App() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <StickyScroll />
        <Work />
        <Services />
      </main>
      <Footer />
    </div>
  );
}

export default App;