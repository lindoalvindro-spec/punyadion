import React, { useState, useRef, useEffect } from 'react';
import { Flame, Camera, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';

export default function BirthdayCake({ onShowGallery }) {
  const [lit, setLit] = useState(true);
  const [blown, setBlown] = useState(false);
  const cardRef = useRef(null);
  const cakeRef = useRef(null);
  const flamesRef = useRef([]);
  const glowsRef = useRef([]);
  const smokeRef = useRef([]);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Card Entrance Motion
    const tl = gsap.timeline();
    tl.fromTo(cardRef.current,
      { opacity: 0, y: 40, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.4)' }
    );
    tl.fromTo(cakeRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    // Continuous GSAP Flame Flickering Motion
    flamesRef.current.forEach((el, i) => {
      if (el) {
        gsap.to(el, {
          scaleY: 1.15,
          scaleX: 0.92,
          rotation: (i % 2 === 0 ? 3 : -3),
          duration: 0.35 + (i * 0.1),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    });

    // Continuous GSAP Glow Pulse
    glowsRef.current.forEach((el, i) => {
      if (el) {
        gsap.to(el, {
          scale: 1.25,
          opacity: 0.8,
          duration: 0.5 + (i * 0.1),
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }
    });

    // Ambient Floating Sparkle Particles
    particlesRef.current.forEach((el, i) => {
      if (el) {
        gsap.to(el, {
          y: `-=${12 + (i % 3) * 6}`,
          x: `+=${(i % 2 === 0 ? 8 : -8)}`,
          rotation: (i % 2 === 0 ? 15 : -15),
          opacity: 0.9,
          duration: 2 + (i % 3),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      }
    });
  }, []);

  const blow = () => {
    if (!lit || blown) return;
    setBlown(true);

    flamesRef.current.forEach((flame, i) => {
      const glow = glowsRef.current[i];
      const smoke = smokeRef.current[i];

      if (glow) {
        gsap.to(glow, { opacity: 0, scale: 0, duration: 0.2 });
      }

      if (flame) {
        gsap.to(flame, {
          scaleY: 0,
          scaleX: 0.2,
          y: -15,
          opacity: 0,
          duration: 0.35,
          delay: i * 0.08,
          ease: 'power2.in',
        });
      }

      if (smoke) {
        gsap.fromTo(smoke,
          { opacity: 0, y: 0, scale: 0.5 },
          { opacity: 0.8, y: -35, scale: 1.5, duration: 0.8, delay: i * 0.08 + 0.2, ease: 'power1.out',
            onComplete: () => {
              gsap.to(smoke, { opacity: 0, y: -50, duration: 0.4 });
            }
          }
        );
      }
    });

    gsap.to(cakeRef.current, {
      y: 6,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut'
    });

    setTimeout(() => {
      setLit(false);

      const count = 220;
      const defaults = { origin: { y: 0.65 } };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55, colors: ['#d4a359', '#e85d88', '#f497b5'] });
      fire(0.2, { spread: 60, colors: ['#ffffff', '#f7e7c4', '#c83b64'] });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ['#ffe4e1', '#ffc0cb', '#ffffff'] });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }, 450);
  };

  const bgParticles = [
    { emoji: '🍵', top: '10%', left: '8%', size: '1.2rem' },
    { emoji: '🍃', top: '18%', right: '10%', size: '1rem' },
    { emoji: '⭐', top: '40%', left: '5%', size: '0.9rem' },
    { emoji: '💙', top: '55%', right: '6%', size: '1.1rem' },
    { emoji: '🌿', bottom: '25%', left: '10%', size: '1rem' },
    { emoji: '👑', bottom: '20%', right: '12%', size: '1.2rem' },
  ];

  return (
    <div className="stage" style={{ position: 'relative' }}>
      {bgParticles.map((p, i) => (
        <span
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          style={{
            position: 'absolute',
            top: p.top, left: p.left, right: p.right, bottom: p.bottom,
            fontSize: p.size, pointerEvents: 'none', zIndex: 0, opacity: 0.65,
            filter: 'drop-shadow(0 0 8px rgba(122,154,96,0.4))'
          }}
        >
          {p.emoji}
        </span>
      ))}

      <div ref={cardRef} className="glass" style={{
        width: '100%', maxWidth: '370px', padding: '28px 22px', textAlign: 'center', opacity: 0,
        background: 'linear-gradient(170deg, #ffffff 0%, #f0f9ff 50%, #ecf8e5 100%)',
        border: '1.5px solid var(--glass-border)',
        boxShadow: '0 20px 50px rgba(15,23,42,0.14), inset 0 0 30px rgba(255,255,255,0.8)',
        borderRadius: 28, position: 'relative', zIndex: 1,
      }}>
        {/* Header Title */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <Sparkles size={18} color="#7a9a60" />
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--berry)',
              lineHeight: 1.15, marginBottom: 4
            }}>Make a Wish, Andinn Sayang 🤍✨</h2>
            <Sparkles size={18} color="#3b82f6" />
          </div>
          <p style={{
            fontFamily: 'var(--font-cute)', fontSize: '0.84rem', color: '#2563eb',
            fontWeight: 600, margin: 0, opacity: 0.9, transition: 'all 0.3s ease'
          }}>
            {lit ? 'Ketuk lilin untuk memadamkan apinya 🕯️' : '✨ Doa dan harapanmu telah terpanjatkan 🌿'}
          </p>
        </div>

        {/* ── 🎂 Aesthetic 3D Birthday Cake Container ── */}
        <div ref={cakeRef} style={{
          position: 'relative', width: 250, height: 210, margin: '0 auto 20px',
          cursor: lit ? 'pointer' : 'default',
        }} onClick={blow}>

          {/* Candle Flames & Sticks */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 34,
            position: 'absolute', top: 0, width: '100%', zIndex: 10,
          }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                {/* Smoke Cloud */}
                <div ref={(el) => (smokeRef.current[i] = el)} style={{
                  position: 'absolute', top: -18, fontSize: '1.2rem', opacity: 0, pointerEvents: 'none',
                }}>
                  💨
                </div>

                {/* Radial Flame Glow */}
                <div ref={(el) => (glowsRef.current[i] = el)} style={{
                  position: 'absolute', top: -6, width: 36, height: 36, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,200,80,0.8) 0%, rgba(255,120,40,0.35) 50%, transparent 100%)',
                  filter: 'blur(4px)', pointerEvents: 'none', display: lit ? 'block' : 'none',
                }} />

                {/* GSAP Flickering Flame */}
                <div ref={(el) => (flamesRef.current[i] = el)} style={{
                  height: 32, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                  transformOrigin: 'center bottom',
                }}>
                  {lit && (
                    <div style={{
                      color: '#FF9800', filter: 'drop-shadow(0 0 10px #FFD700) drop-shadow(0 0 20px #FF5722)',
                    }}>
                      <Flame size={26} fill="#FFC107" />
                    </div>
                  )}
                </div>

                {/* Candle Stick */}
                <div style={{
                  width: 9, height: 36, borderRadius: '6px 6px 3px 3px',
                  background: `linear-gradient(180deg, ${['#3b82f6', '#7a9a60', '#60a5fa'][i]} 0%, #ffffff 100%)`,
                  border: '1px solid rgba(255,255,255,0.8)',
                  boxShadow: '0 3px 6px rgba(15,23,42,0.18)',
                }} />
              </div>
            ))}
          </div>

          {/* Top Tier (Matcha Cream Tier) */}
          <div style={{
            position: 'absolute', top: 62, left: '50%', transform: 'translateX(-50%)',
            width: 160, height: 50, borderRadius: '18px 18px 12px 12px',
            background: 'linear-gradient(180deg, #a3c985 0%, #4a6b34 100%)',
            boxShadow: 'inset 0 4px 10px rgba(255,255,255,0.6), 0 6px 16px rgba(15,23,42,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, zIndex: 4,
          }}>
            <span style={{ fontSize: '1rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>🍵</span>
            <span style={{ fontSize: '1rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>🍃</span>
            <span style={{ fontSize: '1rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>🍵</span>
          </div>

          {/* Elegant Cream Drips */}
          <div style={{
            position: 'absolute', top: 104, left: '50%', transform: 'translateX(-50%)',
            width: 160, display: 'flex', justifyContent: 'space-evenly', zIndex: 5, pointerEvents: 'none'
          }}>
            {[10, 14, 9, 13, 11, 15, 10].map((h, i) => (
              <div key={i} style={{
                width: 12, height: h, borderRadius: '0 0 6px 6px',
                background: 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%)',
                boxShadow: '0 2px 4px rgba(15,23,42,0.1)',
              }} />
            ))}
          </div>

          {/* Bottom Tier (Ocean & Matcha Cream Tier) */}
          <div style={{
            position: 'absolute', top: 110, left: '50%', transform: 'translateX(-50%)',
            width: 216, height: 72, borderRadius: '22px',
            background: 'linear-gradient(180deg, #ffffff 0%, #eff6ff 60%, #e0f2fe 100%)',
            border: '1.5px solid rgba(122,154,96,0.35)',
            boxShadow: '0 10px 28px rgba(15,23,42,0.12), inset 0 3px 8px rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3,
            paddingTop: 8,
          }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(96,165,250,0.15), rgba(163,201,133,0.25))',
              padding: '6px 18px', borderRadius: 20, border: '1px dashed rgba(122,154,96,0.4)',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: '#1e40af',
                fontWeight: 700, letterSpacing: '0.5px', margin: 0, lineHeight: 1.1
              }}>
                Happy 18th Birthday Sayangku! ❤️✨
              </span>
            </div>
          </div>

          {/* Glass / Ceramic Cake Plate Base */}
          <div style={{
            position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
            width: 246, height: 18, borderRadius: '0 0 50% 50% / 0 0 100% 100%',
            background: 'linear-gradient(180deg, #ffffff 0%, #f4e8eb 100%)',
            border: '1.5px solid rgba(212,163,89,0.3)', boxShadow: '0 8px 18px rgba(0,0,0,0.08)', zIndex: 2,
          }} />

          {/* Shadow underneath plate */}
          <div style={{
            position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
            width: 220, height: 10, borderRadius: '50%',
            background: 'rgba(45,16,30,0.12)', filter: 'blur(5px)', zIndex: 1
          }} />
        </div>

        {/* Guidance Badge */}
        {!lit && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'linear-gradient(135deg, rgba(212,163,89,0.15), rgba(248,164,190,0.2))',
            padding: '8px 18px', borderRadius: 20, marginBottom: 20,
            border: '1px solid rgba(212,163,89,0.3)',
          }}>
            <Sparkles size={15} color="var(--pink-deep)" />
            <span style={{
              fontFamily: 'var(--font-cute)', fontSize: '0.82rem', color: 'var(--pink-deep)', fontWeight: 700
            }}>
              Lilin telah dipadamkan dengan indah ✨
            </span>
          </div>
        )}

        {/* CTA Button */}
        {lit ? (
          <button className="btn-primary" onClick={blow} style={{ width: '100%', padding: '16px 20px', fontSize: '0.95rem' }}>
            <Flame size={18} fill="#fff" /> Tiup Lilin 🕯️
          </button>
        ) : (
          <button className="btn-primary" onClick={onShowGallery} style={{ width: '100%', padding: '16px 20px', fontSize: '0.95rem' }}>
            Lihat Galeri Foto 📷 <Camera size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
