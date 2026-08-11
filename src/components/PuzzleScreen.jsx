import React, { useState, useEffect, useRef } from 'react';
import { Puzzle, RotateCcw, Eye, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';

export default function PuzzleScreen({ onComplete }) {
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [preview, setPreview] = useState(false);
  const [solved, setSolved] = useState(false);
  const gridRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    shuffle();
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)' }
    );
  }, []);

  const shuffle = () => {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 7; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    let inv = 0;
    for (let i = 0; i < 9; i++)
      for (let j = i + 1; j < 9; j++)
        if (arr[i] !== 8 && arr[j] !== 8 && arr[i] > arr[j]) inv++;
    if (inv % 2 !== 0) [arr[0], arr[1]] = [arr[1], arr[0]];
    setTiles(arr);
    setMoves(0);
    setSolved(false);
  };

  const tap = (idx) => {
    if (solved) return;
    const blank = tiles.indexOf(8);
    const row = Math.floor(idx / 3), col = idx % 3;
    const bRow = Math.floor(blank / 3), bCol = blank % 3;
    const adjacent = (Math.abs(row - bRow) + Math.abs(col - bCol)) === 1;
    if (!adjacent) return;

    const next = [...tiles];
    [next[idx], next[blank]] = [next[blank], next[idx]];
    setTiles(next);
    setMoves((m) => m + 1);

    if (next.every((v, i) => v === i)) win();
  };

  const win = () => {
    setSolved(true);
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 }, colors: ['#3b82f6', '#7a9a60', '#93c5fd', '#a3c985', '#ffffff'] });
    gsap.fromTo(gridRef.current, 
      { scale: 1 }, 
      { scale: 1.05, duration: 0.4, yoyo: true, repeat: 1, ease: 'power2.out' }
    );
  };

  const autoSolve = () => {
    setTiles([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    setTimeout(win, 150);
  };

  return (
    <div className="stage">
      <div ref={cardRef} style={{
        width: '100%', maxWidth: '380px', padding: '30px 24px', opacity: 0,
        background: 'linear-gradient(145deg, rgba(255,255,255,0.96), rgba(240,249,255,0.88))',
        backdropFilter: 'blur(20px)', borderRadius: 32,
        boxShadow: '0 20px 60px rgba(15,23,42,0.12), inset 0 0 0 1px rgba(255,255,255,0.6)',
      }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 14px', borderRadius: 20, background: 'rgba(122,154,96,0.15)',
            color: '#4a6b34', fontSize: '0.7rem', fontWeight: 700, letterSpacing: 1,
            textTransform: 'uppercase', marginBottom: 10
          }}>
            <Puzzle size={12} /> Galeri Kenangan 🍵
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--berry)', 
            marginBottom: 6, lineHeight: 1.1
          }}>
            Puzzle Kenangan
          </h2>
          <p style={{ 
            fontFamily: 'var(--font-cute)', fontSize: '0.85rem', color: '#2563eb', 
            fontWeight: 600, opacity: 0.9
          }}>
            Susun potongan kenangan untuk membuka galeri utama 🌿
          </p>
        </div>

        {/* Stats Row */}
        <div style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          marginBottom: 16, padding: '0 4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, color: 'var(--pink-deep)' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'var(--font-display)', lineHeight: 1 }}>{moves}</span>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, opacity: 0.8 }}>Langkah</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setPreview(true)} style={{
              width: 36, height: 36, borderRadius: '50%', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--pink-deep)', border: '1px solid rgba(212,163,89,0.25)',
              boxShadow: '0 4px 12px rgba(45,16,30,0.06)', cursor: 'pointer', transition: 'transform 0.15s'
            }} onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'} onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <Eye size={16} />
            </button>
            <button onClick={shuffle} style={{
              width: 36, height: 36, borderRadius: '50%', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--pink-deep)', border: '1px solid rgba(212,163,89,0.25)',
              boxShadow: '0 4px 12px rgba(45,16,30,0.06)', cursor: 'pointer', transition: 'transform 0.15s'
            }} onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'} onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Puzzle Grid */}
        <div ref={gridRef} style={{
          width: '100%', aspectRatio: '1', display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', gap: 3,
          background: 'rgba(212,163,89,0.08)', padding: 6, borderRadius: 24,
          boxShadow: 'inset 0 4px 12px rgba(45,16,30,0.06), 0 8px 24px rgba(45,16,30,0.08)',
          position: 'relative', marginBottom: 26, overflow: 'hidden',
        }}>
          {tiles.map((val, i) => {
            const empty = val === 8 && !solved;
            const srcRow = Math.floor(val / 3);
            const srcCol = val % 3;
            return (
              <div key={i} onClick={() => tap(i)} style={{
                borderRadius: 12, overflow: 'hidden', position: 'relative',
                cursor: empty ? 'default' : 'pointer',
                background: empty ? 'transparent' : '#fff',
                boxShadow: empty ? 'none' : '0 2px 10px rgba(0,0,0,0.08)',
                transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              onPointerDown={(e) => { if (!empty) e.currentTarget.style.transform = 'scale(0.94)'; }}
              onPointerUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              onPointerLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {!empty && (
                  <div style={{
                    width: '300%', height: '300%', position: 'absolute', 
                    top: `${-srcRow * 100}%`, left: `${-srcCol * 100}%`,
                    backgroundImage: 'url(/dion%2013.jpeg)', backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }} />
                )}
                {!empty && !solved && (
                  <span style={{
                    position: 'absolute', top: 4, left: 4, 
                    width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(4px)',
                    color: 'var(--pink-deep)', borderRadius: '50%',
                    fontSize: '0.65rem', fontWeight: 800, fontFamily: 'var(--font-display)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}>{val + 1}</span>
                )}
              </div>
            );
          })}

          {/* Preview Overlay */}
          {preview && (
            <div onClick={() => setPreview(false)} style={{
              position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.94)',
              backdropFilter: 'blur(12px)', borderRadius: 24, zIndex: 10, 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
              padding: 20, cursor: 'pointer',
            }}>
              <div style={{
                width: '85%', aspectRatio: '1', borderRadius: 16, overflow: 'hidden',
                boxShadow: '0 12px 32px rgba(212,69,108,0.25)', marginBottom: 16
              }}>
                <img src="/dion 13.jpeg" alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ 
                color: 'var(--pink-deep)', fontSize: '0.75rem', fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: 1, background: 'rgba(212,69,108,0.08)',
                padding: '8px 16px', borderRadius: 20
              }}>Ketuk untuk menutup</span>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        {solved ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              color: 'var(--pink-deep)', fontWeight: 800, fontSize: '1rem', fontFamily: 'var(--font-display)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 16,
            }}>
              <CheckCircle2 size={18} /> KENANGAN BERHASIL TERSUSUN ✨
            </div>
            <button className="btn-primary" onClick={onComplete} style={{ width: '100%' }}>
              Buka Surat Ucapan <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <button className="btn-ghost" onClick={autoSolve} style={{ 
            width: '100%', background: 'rgba(212,69,108,0.04)', borderRadius: 16, 
            padding: '12px', fontSize: '0.85rem'
          }}>
            Lanjutkan Langsung
          </button>
        )}
      </div>
    </div>
  );
}
