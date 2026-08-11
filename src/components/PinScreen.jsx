import React, { useState, useRef, useEffect } from 'react';
import { Lock, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';

export default function PinScreen({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const correctPin = '140124';
  const cardRef = useRef(null);
  const dotsRef = useRef([]);
  const lockRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(cardRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.4)' }
    );
    tl.fromTo(lockRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.55, ease: 'back.out(2)' },
      '-=0.3'
    );
  }, []);

  const press = (num) => {
    if (pin.length >= 6) return;
    const next = pin + num;
    setPin(next);
    setError(false);

    // Animate dot pop-in
    const dot = dotsRef.current[next.length - 1];
    if (dot) gsap.fromTo(dot, { scale: 0.5 }, { scale: 1, duration: 0.25, ease: 'back.out(3)' });

    if (next.length === 6) {
      setTimeout(() => verify(next), 200);
    }
  };

  const erase = () => { setPin(pin.slice(0, -1)); setError(false); };
  const clear = () => { setPin(''); setError(false); };

  const verify = (p) => {
    if (p === correctPin) {
      gsap.to(lockRef.current, { rotation: 20, duration: 0.2, yoyo: true, repeat: 1 });
      gsap.to(cardRef.current, {
        scale: 1.06, opacity: 0, y: -30,
        duration: 0.55, ease: 'back.in(1.7)', delay: 0.3,
        onComplete: onUnlock,
      });
    } else {
      setError(true);
      setPin('');
      gsap.to(cardRef.current, {
        x: [0, -14, 14, -10, 10, -4, 4, 0],
        duration: 0.45, ease: 'power2.out'
      });
    }
  };

  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '⌫'];

  return (
    <div className="stage">
      <div ref={cardRef} className="glass" style={{
        width: '100%', maxWidth: '350px', padding: '34px 22px', opacity: 0,
        border: '1.5px solid var(--glass-border)',
      }}>
        {/* Lock Icon */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <div ref={lockRef} style={{
            width: 62, height: 62, borderRadius: '50%',
            background: 'linear-gradient(145deg, #7a9a60, #3b82f6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 28px rgba(59, 130, 246, 0.3)', color: '#fff',
          }}>
            <Lock size={26} strokeWidth={2.3} />
          </div>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--berry)',
          textAlign: 'center', lineHeight: 1.2, marginBottom: 4,
        }}>
          Akses Galeri Spesial 🍵✨
        </h1>
        <p style={{
          fontFamily: 'var(--font-cute)', fontSize: '0.82rem', color: '#2563eb',
          textAlign: 'center', fontWeight: 600, marginBottom: 22, opacity: 0.9,
        }}>
          Masukkan kode sandi akses 🍵
        </p>

        {/* PIN Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 22 }}>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const filled = pin.length > i;
            return (
              <div key={i} ref={(el) => (dotsRef.current[i] = el)} style={{
                width: 38, height: 38, borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: filled
                  ? 'linear-gradient(135deg, #7a9a60, #3b82f6)'
                  : 'rgba(255,255,255,0.85)',
                border: filled ? 'none' : '2px dashed #93c5fd',
                boxShadow: filled ? '0 4px 16px rgba(59, 130, 246, 0.3)' : 'none',
                transition: 'all 0.2s ease',
              }}>
                {filled && <span style={{ fontSize: '0.9rem' }}>🍃</span>}
              </div>
            );
          })}
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(212,69,108,0.12)', color: 'var(--pink-deep)',
            padding: '8px 14px', borderRadius: 14, fontSize: '0.78rem', fontWeight: 600,
            marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            border: '1px solid rgba(212,69,108,0.25)',
          }}>
            <AlertCircle size={14} /> Kode akses tidak sesuai. Silakan coba lagi.
          </div>
        )}

        {/* Keypad */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8, marginBottom: 12,
        }}>
          {keys.map((k) => {
            const isAction = k === 'C' || k === '⌫';
            return (
              <button key={k} onClick={() => {
                if (k === 'C') clear();
                else if (k === '⌫') erase();
                else press(k.toString());
              }}
              style={{
                height: 52, borderRadius: 14,
                border: isAction ? 'none' : '1px solid rgba(212,163,89,0.3)',
                background: isAction ? 'rgba(248,164,190,0.2)' : 'rgba(255,255,255,0.85)',
                color: isAction ? 'var(--pink-deep)' : 'var(--berry)',
                fontFamily: 'var(--font-cute)',
                fontSize: isAction ? '0.8rem' : '1.15rem',
                fontWeight: 700, cursor: 'pointer',
                boxShadow: isAction ? 'none' : '0 3px 10px rgba(45,16,30,0.06)',
                transition: 'transform 0.1s, background 0.15s',
              }}
              onPointerDown={(e) => { e.currentTarget.style.transform = 'scale(0.93)'; }}
              onPointerUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              onPointerLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {k}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
