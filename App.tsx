import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Problem } from './components/Problem';
import { Work } from './components/Work';
import { Services } from './components/Services';
import { StickyScroll } from './components/StickyScroll';
import { TrustedBy } from './components/TrustedBy';
import { Footer } from './components/Footer';
import { Contact } from './components/Contact';
import { KaraokeHeading } from './components/KaraokeHeading';
import { Solutions } from './components/Solutions';
import { JoinUs } from './components/JoinUs';

// Smooth scroll implementation helper
// Note: In a real production app, we would use a library like 'lenis' here
// But to ensure it works without npm install in this environment, 
// we are using standard CSS scroll-behavior: smooth in global styles for simplicity
// and Framer Motion for the parallax effects.

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'contact' | 'solutions' | 'join-us'>('home');

  const navigateToContact = () => {
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const navigateToSolutions = () => {
    setCurrentPage('solutions');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const navigateToJoinUs = () => {
    setCurrentPage('join-us');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash === '#contact-page') {
        setCurrentPage('contact');
      } else if (hash === '#solutions-page') {
        setCurrentPage('solutions');
      } else if (hash === '#join-us-page') {
        setCurrentPage('join-us');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (currentPage === 'contact') {
      window.history.pushState(null, '', '#contact-page');
    } else if (currentPage === 'solutions') {
      window.history.pushState(null, '', '#solutions-page');
    } else if (currentPage === 'join-us') {
      window.history.pushState(null, '', '#join-us-page');
    } else {
      if (window.location.hash === '#contact-page' || window.location.hash === '#solutions-page' || window.location.hash === '#join-us-page') {
        window.history.pushState(null, '', '#');
      }
    }
  }, [currentPage]);

  return (
    <div className="bg-[#041210] min-h-screen text-white selection:bg-[#C4A24B] selection:text-black">
      <Header onGetInTouch={navigateToContact} onLogoClick={navigateToHome} onSolutionsClick={navigateToSolutions} onJoinUsClick={navigateToJoinUs} currentPage={currentPage} />
      
      {currentPage === 'home' ? (
        <>
          <main>
            <Hero onGetInTouch={navigateToContact} />
            <TrustedBy onGetInTouch={navigateToContact} />
            <Problem />
            <Services />
            <KaraokeHeading />
            <StickyScroll />
            <Marquee />
            <Work />
          </main>
          <Footer onBecomePartner={navigateToContact} />
        </>
      ) : currentPage === 'solutions' ? (
        <>
          <main>
            <Solutions />
          </main>
          <Footer onBecomePartner={navigateToContact} />
        </>
      ) : currentPage === 'join-us' ? (
        <>
          <main>
            <JoinUs onBack={navigateToHome} />
          </main>
          <Footer onBecomePartner={navigateToContact} />
        </>
      ) : (
        <main>
          <Contact onBack={navigateToHome} />
        </main>
      )}
    </div>
  );
}

export default App;
