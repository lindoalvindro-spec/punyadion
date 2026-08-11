import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import SplashScreen from './components/SplashScreen';
import PinScreen from './components/PinScreen';
import PuzzleScreen from './components/PuzzleScreen';
import LoveLetter from './components/LoveLetter';
import FlowerScreen from './components/FlowerScreen';
import BirthdayCake from './components/BirthdayCake';
import MemoryGallery from './components/MemoryGallery';
import BirthdayWishCard from './components/BirthdayWishCard';
import SpotifyPlayer from './components/SpotifyPlayer';

const MATCHA_BLUE_EMOJIS = ['🍵', '🌿', '🍃', '💙', '✨', '🍵', '🌱', '🧋', '☘️'];

function FloatingHearts() {
  const hearts = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    emoji: MATCHA_BLUE_EMOJIS[i % MATCHA_BLUE_EMOJIS.length],
    left: `${5 + Math.random() * 90}%`,
    dur: `${7 + Math.random() * 6}s`,
    delay: `${Math.random() * 8}s`,
    size: `${10 + Math.random() * 10}px`,
  }));

  return (
    <div className="floating-hearts">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: h.left,
            fontSize: h.size,
            '--dur': h.dur,
            '--delay': h.delay,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

export default function App() {
  // Flow: splash → pin → puzzle → letter → cake → gallery → wishcard → flower
  const [stage, setStage] = useState('splash');
  const stageRef = useRef(null);

  const transitionTo = (next) => {
    if (!stageRef.current) { 
      setStage(next); 
      return; 
    }
    gsap.to(stageRef.current, {
      opacity: 0, y: 30,
      duration: 0.35, ease: 'power2.in',
      onComplete: () => {
        setStage(next);
        // Scroll to top for scrollable stages
        const shell = document.querySelector('.app-shell');
        if (shell) shell.scrollTop = 0;

        requestAnimationFrame(() => {
          if (stageRef.current) {
            gsap.fromTo(stageRef.current,
              { opacity: 0, y: -20 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
          }
        });
      }
    });
  };

  const showPlayer = stage !== 'splash' && stage !== 'pin';

  return (
    <div className="app-shell">
      {/* Background Layer (visible on non-splash stages) */}
      {stage !== 'splash' && (
        <div className="bg-layer">
          <img src="/background.jpg" alt="" className="bg-layer__image" />
          <div className="bg-gradient" />
        </div>
      )}

      {/* Floating Hearts (hidden on splash) */}
      {stage !== 'splash' && <FloatingHearts />}

      <div ref={stageRef} style={{ position: 'relative', zIndex: 1 }}>
        {stage === 'splash' && (
          <SplashScreen onStart={() => transitionTo('pin')} />
        )}
        {stage === 'pin' && (
          <PinScreen onUnlock={() => transitionTo('puzzle')} />
        )}
        {stage === 'puzzle' && (
          <PuzzleScreen onComplete={() => transitionTo('letter')} />
        )}
        {stage === 'letter' && (
          <LoveLetter onNext={() => transitionTo('cake')} />
        )}
        {stage === 'cake' && (
          <BirthdayCake onShowGallery={() => transitionTo('gallery')} />
        )}
        {stage === 'gallery' && (
          <MemoryGallery onNext={() => transitionTo('wishcard')} />
        )}
        {stage === 'wishcard' && (
          <BirthdayWishCard onNext={() => transitionTo('flower')} onRestart={() => transitionTo('splash')} />
        )}
        {stage === 'flower' && (
          <FlowerScreen onRestart={() => transitionTo('splash')} />
        )}
      </div>

      {/* Spotify Player (hidden on splash, autoplays on all stages after splash) */}
      {showPlayer && <SpotifyPlayer autoPlay={stage !== 'splash'} />}
    </div>
  );
}

