import React, { useRef, useEffect } from 'react';
import { Crown, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export default function SplashScreen({ onStart }) {
  const containerRef = useRef(null);
  const photoRef = useRef(null);
  const overlayRef = useRef(null);
  const num20Ref = useRef(null);
  const badgeRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const btnRef = useRef(null);
  const sparklesRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    // Background Photo Reveal
    tl.fromTo(photoRef.current,
      { scale: 1.2, opacity: 0, filter: 'blur(12px)' },
      { scale: 1, opacity: 0.95, filter: 'blur(0px)', duration: 1.6, ease: 'power2.out' }
    );

    // Dark Gradient Overlay
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      0.2
    );

    // Floating Sparkling 20 Entrance
    tl.fromTo(num20Ref.current,
      { opacity: 0, y: -20, scale: 0.7 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(2.2)' },
      0.4
    );

    // Continuous Gentle Floating for 20 Badge
    gsap.to(num20Ref.current, {
      y: -8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // VIP Birthday Badge Entrance
    tl.fromTo(badgeRef.current,
      { opacity: 0, y: 15, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.6)' },
      0.6
    );

    // Subtitle Line
    tl.fromTo(line1Ref.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      0.8
    );

    // Main Title Line (Sayangku 👑)
    tl.fromTo(line2Ref.current,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
      1.0
    );

    // Birthday Greeting & Tagline
    tl.fromTo(line3Ref.current,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      1.3
    );

    // Floating Ambient Sparkles
    sparklesRef.current.forEach((el, i) => {
      if (el) {
        tl.fromTo(el,
          { opacity: 0, scale: 0, rotation: -30 },
          { opacity: 0.85, scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' },
          1.0 + i * 0.1
        );

        gsap.to(el, {
          y: `${-8 + Math.random() * 16}`,
          x: `${-6 + Math.random() * 12}`,
          duration: 2 + Math.random() * 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.15,
        });
      }
    });

    // Start Button Entrance
    tl.fromTo(btnRef.current,
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.8)' },
      1.6
    );
  }, []);

  const handleStart = () => {
    const tl = gsap.timeline();
    tl.to(containerRef.current, {
      scale: 1.03,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 0.4,
      ease: 'power2.in',
      onComplete: onStart,
    });
  };

  const sparkleData = [
    { emoji: '🍵', top: '8%', left: '7%', size: '1.3rem' },
    { emoji: '🍃', top: '14%', right: '8%', size: '1.2rem' },
    { emoji: '🎉', top: '26%', left: '5%', size: '1.2rem' },
    { emoji: '💙', top: '24%', right: '6%', size: '1.1rem' },
    { emoji: '🌿', bottom: '20%', left: '8%', size: '1.2rem' },
    { emoji: '💫', bottom: '18%', right: '7%', size: '1.2rem' },
    { emoji: '🍵', top: '42%', left: '4%', size: '1rem' },
    { emoji: '✨', top: '38%', right: '4%', size: '1.2rem' },
  ];

  return (
    <div ref={containerRef} style={{
      position: 'relative', width: '100%', minHeight: '100dvh',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', overflow: 'hidden', padding: '16px 0',
    }}>
      {/* Background Hero Photo (dion 15.jpeg) */}
      <img
        ref={photoRef}
        src="/dion 15.jpeg"
        alt="Happy Birthday Sayangku"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', opacity: 0,
        }}
        onError={(e) => { e.target.src = '/dion 15.jpeg'; }}
      />

      {/* Luxury Dark Gradient Overlay for Maximum Readability */}
      <div ref={overlayRef} style={{
        position: 'absolute', inset: 0, opacity: 0,
        background: 'radial-gradient(circle at center, rgba(15, 23, 42, 0.65) 0%, rgba(10, 15, 30, 0.9) 70%, rgba(5, 10, 20, 0.98) 100%)',
      }} />

      {/* Lucu Characters */}
      <img src="/lucu1 no bg.png" alt="Lucu 1" style={{
        position: 'absolute', bottom: '6%', left: '-2%', width: 100, 
        zIndex: 2, pointerEvents: 'none', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))'
      }} onError={(e) => e.target.style.display = 'none'} />
      <img src="/lucu 2 no bg.png" alt="Lucu 2" style={{
        position: 'absolute', bottom: '10%', right: '-2%', width: 95, 
        zIndex: 2, pointerEvents: 'none', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))'
      }} onError={(e) => e.target.style.display = 'none'} />

      {/* Floating Sparkles */}
      {sparkleData.map((s, i) => (
        <span
          key={i}
          ref={(el) => (sparklesRef.current[i] = el)}
          style={{
            position: 'absolute', fontSize: s.size, opacity: 0,
            top: s.top, left: s.left, right: s.right, bottom: s.bottom,
            pointerEvents: 'none', zIndex: 2,
            filter: 'drop-shadow(0 0 8px rgba(122,154,96,0.7))',
          }}
        >{s.emoji}</span>
      ))}

      {/* Main Birthday Exhibition Content */}
      <div style={{
        position: 'relative', zIndex: 3, textAlign: 'center',
        padding: '0 20px', maxWidth: 350, width: '100%',
      }}>

        {/* Floating Sparkling 18 Badge */}
        <div ref={num20Ref} style={{ opacity: 0, marginBottom: 8, display: 'inline-block' }}>
          <div className="sparkling-20-badge">
            <span className="sparkle-icon-left">✨</span>
            <span className="sparkling-20-text">18</span>
            <span className="sparkle-icon-right">🤍</span>
          </div>
        </div>

        {/* VIP Happy Birthday Title Badge */}
        <div ref={badgeRef} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 16px', borderRadius: 30, marginBottom: 12,
          background: 'rgba(59, 130, 246, 0.25)', backdropFilter: 'blur(12px)',
          border: '1px solid rgba(163, 201, 133, 0.6)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          opacity: 0,
        }}>
          <Crown size={14} color="var(--gold-accent)" />
          <span className="sparkling-birthday-text">
            Happy 18th Birthday Sayangku! ❤️✨
          </span>
        </div>

        {/* Subtitle */}
        <p ref={line1Ref} style={{
          fontFamily: 'var(--font-cute)', fontSize: '0.78rem', fontWeight: 600,
          color: 'rgba(224,242,254,0.9)', letterSpacing: '1.8px', textTransform: 'uppercase',
          marginBottom: 4, opacity: 0,
        }}>
          Special Dedicated To
        </p>

        {/* Main Title: Andinn */}
        <h1 ref={line2Ref} style={{
          fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#fff',
          lineHeight: 1.15, marginBottom: 10, opacity: 0,
          textShadow: '0 4px 20px rgba(59, 130, 246, 0.7), 0 0 35px rgba(122, 154, 96, 0.5)',
        }}>
          Andinn Sayang
        </h1>

        {/* Birthday Wish Box & Tagline */}
        <div ref={line3Ref} style={{ opacity: 0 }}>
          <div className="birthday-greeting-box">
            <p style={{
              fontFamily: 'var(--font-display)', fontSize: '1.25rem',
              color: '#dcfce7', margin: 0, lineHeight: 1.3,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}>
              "Selamat Ulang Tahun yang ke-18 Sayangku" ❤️✨
            </p>
          </div>

          <p style={{
            fontFamily: 'var(--font-cute)', fontSize: '0.78rem',
            color: '#bfdbfe', fontWeight: 600, marginBottom: 20,
            letterSpacing: '0.5px'
          }}>
            A Special Dedicated Collection of Moments & Memories 🌿✨
          </p>
        </div>

        {/* Action Button */}
        <button
          ref={btnRef}
          onClick={handleStart}
          style={{
            opacity: 0, padding: '14px 32px', borderRadius: 60, border: 'none',
            background: 'linear-gradient(135deg, #3b82f6 0%, #7a9a60 100%)',
            color: '#fff', fontFamily: 'var(--font-cute)', fontSize: '0.92rem',
            fontWeight: 700, cursor: 'pointer', letterSpacing: '0.5px',
            boxShadow: '0 8px 28px rgba(59, 130, 246, 0.4), 0 0 18px rgba(122, 154, 96, 0.4)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}
          onPointerDown={(e) => { e.currentTarget.style.transform = 'scale(0.96)'; }}
          onPointerUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          onPointerLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          Jelajahi Galeri Ulang Tahun 🍃
        </button>

      </div>
    </div>
  );
}
