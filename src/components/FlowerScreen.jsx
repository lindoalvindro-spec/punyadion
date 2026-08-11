import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles, RotateCw, Heart } from 'lucide-react';
import gsap from 'gsap';

export default function FlowerScreen({ onRestart }) {
  const [landscapeMode, setLandscapeMode] = useState(false);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const bouquetRef = useRef(null);
  const textRef = useRef(null);
  const petalsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    // Card entrance
    tl.fromTo(cardRef.current,
      { opacity: 0, scale: 0.92, y: 35 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.3)' }
    );

    // Bouquet float in
    tl.fromTo(bouquetRef.current,
      { opacity: 0, scale: 0.8, rotation: -8 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: 'back.out(1.6)' },
      '-=0.4'
    );

    // Text reveal
    tl.fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.3'
    );

    // Gentle continuous floating animation on bouquet
    gsap.to(bouquetRef.current, {
      y: -8,
      rotation: 2,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    // Ambient falling petals animation
    petalsRef.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(el,
          { y: -20, opacity: 0, rotation: 0 },
          {
            y: '100vh',
            x: `+=${(i % 2 === 0 ? 40 : -40)}`,
            rotation: 360,
            opacity: 0.7,
            duration: 6 + (i % 4) * 2,
            delay: i * 0.4,
            repeat: -1,
            ease: 'sine.inOut',
          }
        );
      }
    });
  }, []);

  const petalEmojis = ['🍵', '🍃', '🌿', '💙', '✨', '🍵', '🌱'];

  return (
    <div className="stage" ref={containerRef} style={{ position: 'relative', overflow: 'hidden', padding: '20px 14px' }}>
      
      {/* Wallpaper Background (background bunga.jpg) */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'url("/background%20bunga.jpg")',
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'brightness(0.95) saturate(1.1)',
        opacity: 0.85,
      }}>
        {/* Soft Pink Tint Gradient Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(255, 240, 245, 0.4) 0%, rgba(255, 225, 235, 0.6) 100%)',
          backdropFilter: 'blur(2px)',
        }} />
      </div>

      {/* Floating Petals Particle Layer */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
        {petalEmojis.map((emoji, i) => (
          <span
            key={i}
            ref={(el) => (petalsRef.current[i] = el)}
            style={{
              position: 'absolute',
              left: `${10 + i * 14}%`,
              top: '-5%',
              fontSize: '1.2rem',
              opacity: 0,
              filter: 'drop-shadow(0 2px 6px rgba(200,59,100,0.3))',
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {/* Mode Switch Toggle Button (Floating at Top) */}
      <button
        onClick={() => setLandscapeMode(!landscapeMode)}
        style={{
          position: 'relative', zIndex: 10, marginBottom: 12,
          padding: '6px 16px', borderRadius: 20, border: 'none',
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(10px)',
          color: 'var(--pink-deep)', fontFamily: 'var(--font-cute)',
          fontSize: '0.74rem', fontWeight: 700, cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(45,16,30,0.12)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
          transition: 'all 0.25s ease',
        }}
      >
        <RotateCw size={13} /> {landscapeMode ? 'Mode HP Tegak 📱' : 'Ganti Mode Landscape 🔄'}
      </button>

      {/* Main Card Frame */}
      <div
        ref={cardRef}
        style={{
          position: 'relative', zIndex: 5,
          width: '100%', maxWidth: landscapeMode ? '100%' : '390px',
          background: 'linear-gradient(150deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 240, 245, 0.92) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: 28, padding: landscapeMode ? '16px' : '22px 18px',
          border: '1.5px solid rgba(212, 163, 89, 0.35)',
          boxShadow: '0 20px 50px rgba(45, 16, 30, 0.16), inset 0 0 25px rgba(255, 255, 255, 0.9)',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: landscapeMode ? 'rotate(90deg) scale(0.92)' : 'none',
          margin: landscapeMode ? '40px 0' : '0 auto',
        }}
      >
        {/* Layout Container: Flex Column on Mobile, Flex Row on Landscape */}
        <div style={{
          display: 'flex',
          flexDirection: landscapeMode ? 'row' : 'column',
          alignItems: 'center',
          gap: landscapeMode ? 16 : 14,
        }}>

          {/* Left / Top: Bouquet & Photo Container */}
          <div
            ref={bouquetRef}
            style={{
              width: landscapeMode ? '42%' : '100%',
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              position: 'relative', gap: 8
            }}
          >
            <div style={{
              width: 105, height: 105, borderRadius: '50%', overflow: 'hidden',
              border: '3.5px solid #fff', boxShadow: '0 8px 24px rgba(59,130,246,0.25)',
              position: 'relative', flexShrink: 0
            }}>
              <img src="/dion 13.jpeg" alt="Andinn" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = '/dion 13.jpeg'; }} />
            </div>
            <img
              src="/bucket%20bunga%202%20no%20bg.png"
              alt="Flowers for my Pretty Girl"
              style={{
                width: '100%',
                maxWidth: landscapeMode ? '160px' : '180px',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 12px 28px rgba(200, 59, 100, 0.28))',
              }}
              onError={(e) => { e.target.src = '/bunga%20buket%202%20no%20bg.png'; }}
            />
          </div>

          {/* Right / Bottom: Title & Romantic Letter Content */}
          <div
            ref={textRef}
            style={{
              flex: 1,
              textAlign: landscapeMode ? 'left' : 'center',
              width: '100%',
            }}
          >
            {/* Header Title */}
            <div style={{ marginBottom: 12 }}>
              <div style={{
                fontSize: '1.1rem',
                fontFamily: 'var(--font-display)',
                color: '#4a6b34',
                fontStyle: 'italic',
                lineHeight: 1.1,
              }}>
                A Special Bouquet For
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: landscapeMode ? '2.1rem' : '2.4rem',
                color: '#1e40af',
                lineHeight: 1.05,
                margin: '2px 0 0 0',
                letterSpacing: '-0.5px',
                textShadow: '0 2px 10px rgba(59, 130, 246, 0.2)',
              }}>
                Andinn Sayang 🤍✨
              </h2>
            </div>

            {/* Letter Content Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.88)',
              borderRadius: 18,
              padding: '14px 16px',
              border: '1px solid rgba(122, 154, 96, 0.3)',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
              lineHeight: 1.7,
              fontSize: '0.84rem',
              color: 'var(--berry)',
              textAlign: 'left',
            }}>
              <p style={{ marginBottom: 12, fontWeight: 500 }}>
                semoga kamu selalu diberikan kesehatan, kebahagiaan, dan tetap menjadi perempuan hebat yang selama ini aku kenal dan sayang. aku juga akan selalu berusaha untuk menjadi pasangan terbaik buat kamu, menemani kamu dalam setiap langkah dan selalu ada di setiap keadaan. ❤️
              </p>
              
              <div style={{
                borderTop: '1px dashed rgba(122, 154, 96, 0.35)',
                paddingTop: 10,
                marginTop: 10,
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                color: '#1e40af',
                lineHeight: 1.35,
              }}>
                aku sayang banget sama kamu, hari ini, besok, dan selamanya. muahh ❤️🌷
              </div>
            </div>

          </div>
        </div>

        {/* CTA Restart Button */}
        <button
          className="btn-primary"
          onClick={onRestart}
          style={{
            width: '100%',
            marginTop: 18,
            padding: '14px 20px',
            fontSize: '0.9rem',
          }}
        >
          Ulangi Tampilan 🔄
        </button>
      </div>

    </div>
  );
}
