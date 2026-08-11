import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

export default function MemoryGallery({ onNext }) {
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState('next');
  const [lightbox, setLightbox] = useState(false);
  const containerRef = useRef(null);

  const exhibits = [
    { src: '/dion 1.jpeg', tag: 'EXHIBIT #01', title: 'Beautiful Smile ✨' },
    { src: '/dion 2.jpeg', tag: 'EXHIBIT #02', title: 'Sweet Moments 🌸' },
    { src: '/dion 3.jpeg', tag: 'EXHIBIT #03', title: 'Radiant & Cute 💫' },
    { src: '/dion 4.jpeg', tag: 'EXHIBIT #04', title: 'Warm Atmosphere ☀️' },
    { src: '/dion 5.jpeg', tag: 'EXHIBIT #05', title: 'Precious Moments 💎' },
    { src: '/dion 6.jpeg', tag: 'EXHIBIT #06', title: 'Favorite View 🌺' },
    { src: '/dion 7.jpeg', tag: 'EXHIBIT #07', title: 'Adorable Grace 🍃' },
    { src: '/dion 8.jpeg', tag: 'EXHIBIT #08', title: 'Sunshine Smile ☀️' },
    { src: '/dion 9.jpeg', tag: 'EXHIBIT #09', title: 'Pure Happiness 🤍' },
    { src: '/dion 10.jpeg', tag: 'EXHIBIT #10', title: 'Sweetest Eyes ✨' },
    { src: '/dion 11.jpeg', tag: 'EXHIBIT #11', title: 'Heartwarming Glow 🌸' },
    { src: '/dion 12.jpeg', tag: 'EXHIBIT #12', title: 'Joyful Moments 🎉' },
    { src: '/dion 13.jpeg', tag: 'EXHIBIT #13', title: 'Forever Precious 💎' },
    { src: '/dion 14.jpeg', tag: 'EXHIBIT #14', title: 'Special Grace 🌷' },
    { src: '/dion 15.jpeg', tag: 'EXHIBIT #15', title: 'Endless Love ❤️' },
  ];

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo('.gallery-header', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
    tl.fromTo('.gallery-frame', 
      { opacity: 0, scale: 0.96, y: 25 }, 
      { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      "-=0.4"
    );
    tl.fromTo('.gallery-controls',
      { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.2"
    );
  }, []);

  // GSAP Smooth Slide Animation (Kiri -> Kanan & Kanan -> Kiri)
  useEffect(() => {
    const photoEl = document.getElementById('gallery-photo');
    const tagEl = document.getElementById('gallery-tag-bar');
    
    if (photoEl) {
      const fromX = direction === 'next' ? 90 : -90;
      
      const tl = gsap.timeline();
      tl.fromTo(photoEl,
        { opacity: 0, x: fromX, scale: 0.96, filter: 'blur(6px)' },
        { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power2.out' }
      );

      if (tagEl) {
        tl.fromTo(tagEl,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
          '-=0.35'
        );
      }
    }

    // Smoothly scroll active thumbnail into view
    const activeThumb = document.getElementById(`thumb-${idx}`);
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [idx, direction]);

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection('next');
      setIdx((prev) => (prev + 1) % exhibits.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [exhibits.length]);

  const current = exhibits[idx];

  const prevSlide = () => {
    setDirection('prev');
    setIdx((prev) => (prev === 0 ? exhibits.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection('next');
    setIdx((prev) => (prev + 1) % exhibits.length);
  };

  const selectThumbnail = (i) => {
    if (i === idx) return;
    setDirection(i > idx ? 'next' : 'prev');
    setIdx(i);
  };

  return (
    <div className="stage stage--scroll" ref={containerRef}>
      {/* Flower Chain Decoration */}
      <img src="/Untitled - July 29, 2026 at 22.02.49.png" alt="Decoration" style={{
        width: '100%', maxWidth: 280, maxHeight: 140, objectFit: 'contain', 
        marginBottom: 4, marginTop: -20, opacity: 0.95, pointerEvents: 'none',
        filter: 'drop-shadow(0 4px 12px rgba(212,69,108,0.25))'
      }} onError={(e) => e.target.style.display = 'none'} />

      {/* Museum Title */}
      <div className="gallery-header" style={{ textAlign: 'center', marginBottom: 24, width: '100%', maxWidth: 390, position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 14px', borderRadius: 20, background: 'rgba(122,154,96,0.15)',
          border: '1px solid rgba(122,154,96,0.35)', marginBottom: 10
        }}>
          <Sparkles size={13} color="#4a6b34" />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4a6b34', letterSpacing: 1.5, textTransform: 'uppercase' }}>
            Galeri Foto & Kenangan 🍵
          </span>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#1e40af',
          lineHeight: 1.15, marginBottom: 6, letterSpacing: '-0.5px'
        }}>
          Galeri Foto Andinn 🤍✨
        </h1>
      </div>

      {/* Main Exhibition Frame */}
      <div className="gallery-frame" style={{
        width: '100%', maxWidth: 370, padding: 16, marginBottom: 24,
        background: '#ffffff', borderRadius: 28,
        border: '1.5px solid rgba(96,165,250,0.3)',
        boxShadow: '0 20px 50px rgba(15,23,42,0.12), 0 2px 10px rgba(122,154,96,0.1)',
        position: 'relative',
      }}>
        {/* Top Tag Bar */}
        <div id="gallery-tag-bar" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 12, padding: '0 4px'
        }}>
          <span style={{
            fontSize: '0.7rem', fontWeight: 800, color: 'var(--gold-accent)',
            letterSpacing: 1.5, textTransform: 'uppercase'
          }}>
            {current.tag}
          </span>
          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--berry)',
            fontWeight: 700
          }}>
            {current.title}
          </span>
        </div>

        {/* Photo Container */}
        <div style={{
          position: 'relative', width: '100%', aspectRatio: '3/4', 
          borderRadius: 20, overflow: 'hidden', background: 'var(--pink-whisper)',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
        }}>
          <img
            id="gallery-photo"
            key={idx}
            src={current.src}
            alt={current.title}
            style={{ 
              width: '100%', height: '100%', objectFit: 'cover',
              transformOrigin: 'center center'
            }}
            onError={(e) => { e.target.src = '/dion 1.jpeg'; }}
          />

          {/* Lightbox Inspect Trigger */}
          <button
            onClick={() => setLightbox(true)}
            style={{
              position: 'absolute', top: 12, right: 12, width: 36, height: 36,
              borderRadius: '50%', background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(8px)', border: 'none', color: 'var(--pink-deep)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'transform 0.15s ease'
            }}
            onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
            onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Maximize2 size={16} />
          </button>

          {/* Nav Arrows overlay */}
          <button
            onClick={prevSlide}
            style={{
              position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
              width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(6px)', border: 'none', color: 'var(--berry)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.75)',
              backdropFilter: 'blur(6px)', border: 'none', color: 'var(--berry)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="gallery-controls" style={{
        display: 'flex', gap: 8, justifyContent: 'flex-start', marginBottom: 28,
        maxWidth: 370, width: '100%', overflowX: 'auto', padding: '6px 4px',
        scrollbarWidth: 'thin'
      }}>
        {exhibits.map((item, i) => (
          <div
            key={i}
            id={`thumb-${i}`}
            onClick={() => selectThumbnail(i)}
            style={{
              width: i === idx ? 48 : 36, height: 48, borderRadius: 10, overflow: 'hidden',
              border: i === idx ? '2px solid var(--pink-deep)' : '1.5px solid transparent',
              opacity: i === idx ? 1 : 0.6,
              transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)', cursor: 'pointer',
              flexShrink: 0, boxShadow: i === idx ? '0 4px 12px rgba(200,59,100,0.3)' : 'none',
            }}
          >
            <img src={item.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(15, 5, 10, 0.92)',
            backdropFilter: 'blur(16px)', zIndex: 9999, display: 'flex',
            alignItems: 'center', justifyContent: 'center', padding: 20, cursor: 'pointer'
          }}
        >
          <button
            onClick={() => setLightbox(false)}
            style={{
              position: 'absolute', top: 20, right: 20, width: 42, height: 42,
              borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: 'none',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={22} />
          </button>

          <div style={{ maxWidth: '90vw', maxHeight: '85vh', borderRadius: 20, overflow: 'hidden', border: '2px solid var(--gold-accent)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
            <img src={current.src} alt={current.title} style={{ width: '100%', height: '100%', objectFit: 'contain', maxHeight: '80vh' }} />
            <div style={{ padding: '12px', background: 'rgba(30,10,20,0.85)', textAlign: 'center', color: 'var(--gold-light)', fontFamily: 'var(--font-display)', fontSize: '1.2rem' }}>
              {current.tag}: {current.title}
            </div>
          </div>
        </div>
      )}

      {/* Next Button */}
      <button className="gallery-controls btn-primary" onClick={onNext} style={{ width: '100%', maxWidth: 370 }}>
        Lanjutkan ke Kartu Ucapan 🎴 <ArrowRight size={16} />
      </button>
    </div>
  );
}
