import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Loader from './components/Loader';
import EnterScreen from './components/EnterScreen';
import Footer from './components/Footer';
import Skills from './components/Skills';
import NotFound from './components/NotFound';
import AIChatBot from './components/AIChatBot';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Helmet } from 'react-helmet-async';

function ChatBotWrapper() {
  const location = useLocation();
  return <AIChatBot />;
}

function App() {
  const [started, setStarted] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    const isBot = /bot|crawl|spider|slurp|bing/i.test(navigator.userAgent);
    const isHome = window.location.pathname === '/';
    const alreadyVisited = sessionStorage.getItem('alreadyVisited');

    if (isBot) {
      setStarted(true);
    } else if (isHome && !alreadyVisited) {
      setStarted(false);
    } else {
      setStarted(true);
    }
    setInitialCheckDone(true);
  }, []);

  const handleStart = () => {
    sessionStorage.setItem('alreadyVisited', 'true');
    setStarted(true);
    setShowLoader(true);
  };

  if (!initialCheckDone) return null;

  const schemaData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ajin Aju",
    "url": "https://ajinaju.vercel.app/",
    "sameAs": [
      "https://github.com/AjinAju20",
      "https://www.instagram.com/_ajin_aju_3_/",
      "https://www.linkedin.com/in/ajin-aju-a33b1677c/"
    ],
    "jobTitle": "Lift Technician & Gamer",
    "worksFor": { "@type": "Organization", "name": "Self-Employed" },
    "image": "https://ajinaju.vercel.app/profile_pic.png",
    "description": "Ajin Aju - Lift technician and passionate gamer."
  });

  return (
    <>
      <Helmet>
        <title>Ajin Aju | Lift Technician & Gamer</title>
        <meta name="description" content="Official portfolio of Ajin Aju - Lift technician and passionate gamer." />
        <link rel="canonical" href="https://ajinaju.vercel.app/" />
        <meta property="og:title" content="Ajin Aju | Lift Technician & Gamer" />
        <meta property="og:description" content="Official portfolio of Ajin Aju - Lift technician and passionate gamer." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ajinaju.vercel.app/" />
        <meta property="og:image" content="https://ajinaju.vercel.app/profile_pic.png" />
        <meta property="og:site_name" content="Ajin Aju Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ajin Aju | Lift Technician & Gamer" />
        <meta name="twitter:description" content="Official portfolio of Ajin Aju - Lift technician and passionate gamer." />
        <meta name="twitter:image" content="https://ajinaju.vercel.app/profile_pic.png" />
        <script type="application/ld+json">{schemaData}</script>
      </Helmet>

      {!started ? (
        <EnterScreen onEnter={handleStart} />
      ) : showLoader ? (
        <Loader onComplete={() => setShowLoader(false)} />
      ) : (
        <Router>
          <div className="bg-white dark:bg-black">
            <Navbar />
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
            <ChatBotWrapper />
            <SpeedInsights />
          </div>
        </Router>
      )}
    </>
  );
}

export default App;