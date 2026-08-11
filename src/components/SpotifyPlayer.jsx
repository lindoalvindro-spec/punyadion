import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Plus, Heart, 
  Volume2, VolumeX, Disc, Sparkles, ChevronUp, ChevronDown 
} from 'lucide-react';
import gsap from 'gsap';

export default function SpotifyPlayer({ autoPlay = false }) {
  const [playing, setPlaying] = useState(autoPlay);
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = useRef(null);
  const widgetRef = useRef(null);
  const pillRef = useRef(null);

  // Trigger autoPlay when autoPlay prop becomes true
  useEffect(() => {
    if (autoPlay) {
      setPlaying(true);
    }
  }, [autoPlay]);

  // Handle play/pause with global user interaction fallback
  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            console.log('Audio autoplay prevented, awaiting interaction:', e);
            const resumeAudio = () => {
              if (audioRef.current) {
                audioRef.current.play().then(() => {
                  setPlaying(true);
                }).catch(() => {});
              }
            };
            window.addEventListener('click', resumeAudio, { once: true });
            window.addEventListener('touchstart', resumeAudio, { once: true });
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  // Handle mute
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  // GSAP Pop-up Entrance Animation on Expand
  useEffect(() => {
    if (expanded && widgetRef.current) {
      gsap.fromTo(widgetRef.current,
        { opacity: 0, scale: 0.82, y: 35, transformOrigin: 'bottom center' },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.6)' }
      );
    }
  }, [expanded]);

  // GSAP Entrance Animation on Mini Pill Reveal
  useEffect(() => {
    if (!expanded && pillRef.current) {
      gsap.fromTo(pillRef.current,
        { opacity: 0, scale: 0.88, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.8)' }
      );
    }
  }, [expanded]);

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setCurrentTime(current);
      if (total) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time) || !time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const formatRemaining = (current, total) => {
    if (isNaN(total) || !total) return '-0:00';
    const remaining = total - current;
    const minutes = Math.floor(remaining / 60);
    const seconds = Math.floor(remaining % 60);
    return `-${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
      audioRef.current.currentTime = newProgress * duration;
    }
  };

  const restartSong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (!playing) setPlaying(true);
    }
  };

  // GSAP Smooth Minimize Animation
  const minimizeWidget = () => {
    if (widgetRef.current) {
      gsap.to(widgetRef.current, {
        opacity: 0,
        scale: 0.85,
        y: 25,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => setExpanded(false)
      });
    } else {
      setExpanded(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', bottom: 14, left: 0, right: 0, margin: '0 auto',
      zIndex: 99999, width: '92%', maxWidth: expanded ? 410 : 'max-content',
      display: 'flex', justifyContent: 'center',
    }}>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/Kasih Putih.mp3"
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)}
      />

      {/* ── MODE 1: Sleek Floating Mini Pill (default) ── */}
      {!expanded && (
        <div
          ref={pillRef}
          onClick={() => setExpanded(true)}
          style={{
            background: 'rgba(18, 18, 18, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 50,
            padding: '6px 14px 6px 8px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 15px rgba(29, 185, 84, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            color: '#ffffff',
            cursor: 'pointer',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            userSelect: 'none',
          }}
          onPointerDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
          onPointerUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {/* Mini Album Cover */}
          <div style={{
            width: 34, height: 34, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
            position: 'relative', background: '#282828',
            border: '1.5px solid #1DB954',
          }}>
            <img
              src="/dion 13.jpeg"
              alt="Kasih Putih"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.src = '/dion 13.jpeg'; }}
            />
            {playing && (
              <div className="anim-spin" style={{
                position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Disc size={16} color="#1DB954" />
              </div>
            )}
          </div>

          {/* Song Info */}
          <div style={{ overflow: 'hidden', paddingRight: 4 }}>
            <div style={{
              fontSize: '0.78rem', fontWeight: 700, color: '#ffffff',
              lineHeight: 1.1, whiteSpace: 'nowrap'
            }}>
              Kasih Putih
            </div>
            <div style={{
              fontSize: '0.66rem', color: '#1DB954', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 3, marginTop: 1
            }}>
              {playing ? '🎵 Playing' : '▶ Tap for Player'}
            </div>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            style={{
              width: 28, height: 28, borderRadius: '50%', border: 'none',
              background: '#ffffff', color: '#000000',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            {playing ? <Pause size={13} fill="#000" /> : <Play size={13} fill="#000" style={{ marginLeft: 1 }} />}
          </button>

          {/* Expand Indicator */}
          <div style={{ color: '#b3b3b3', display: 'flex', alignItems: 'center', opacity: 0.8 }}>
            <ChevronUp size={16} />
          </div>
        </div>
      )}

      {/* ── MODE 2: GSAP Animated Pop-up Spotify Widget UI ── */}
      {expanded && (
        <div
          ref={widgetRef}
          style={{
            background: 'rgba(18, 18, 18, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 24,
            padding: '12px 14px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(29, 185, 84, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            color: '#ffffff',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            position: 'relative',
          }}
        >
          {/* Close/Minimize Button at Top-Right */}
          <button
            onClick={minimizeWidget}
            style={{
              position: 'absolute', top: 10, right: 10,
              width: 24, height: 24, borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)', border: 'none',
              color: '#b3b3b3', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 10, transition: 'background 0.2s'
            }}
            title="Minimize"
          >
            <ChevronDown size={16} />
          </button>

          {/* Left Side: Album Cover */}
          <div style={{
            width: 76, height: 76, borderRadius: 16, overflow: 'hidden', flexShrink: 0,
            position: 'relative', boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
            background: '#282828',
          }}>
            <img
              src="/dion 13.jpeg"
              alt="Kasih Putih"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.src = '/dion 13.jpeg'; }}
            />
            {playing && (
              <div style={{
                position: 'absolute', bottom: 4, right: 4, width: 18, height: 18,
                borderRadius: '50%', background: '#1DB954', display: 'flex',
                alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
              }}>
                <Disc size={11} color="#000" className="anim-spin" />
              </div>
            )}
          </div>

          {/* Right Side: Info, Progress & Controls */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0, paddingRight: 24 }}>
            
            {/* Top Row: Song Title, Singer & Heart */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ overflow: 'hidden', paddingRight: 4 }}>
                <div style={{
                  fontSize: '0.88rem', fontWeight: 700, color: '#ffffff',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  letterSpacing: '-0.2px'
                }}>
                  Kasih Putih
                </div>
                <div style={{
                  fontSize: '0.74rem', color: '#b3b3b3', fontWeight: 500,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 1
                }}>
                  Glenn Fredly
                </div>
              </div>

              <button
                onClick={() => setLiked(!liked)}
                style={{
                  background: 'none', border: 'none', color: liked ? '#1DB954' : '#b3b3b3',
                  cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center',
                  flexShrink: 0
                }}
              >
                {liked ? <Heart size={18} fill="#1DB954" /> : <Plus size={18} />}
              </button>
            </div>

            {/* Middle Row: Progress Bar & Time */}
            <div>
              <div
                onClick={handleSeek}
                style={{
                  height: 4, background: '#4d4d4d', borderRadius: 4,
                  cursor: 'pointer', position: 'relative', overflow: 'hidden'
                }}
              >
                <div style={{
                  width: `${progress}%`, height: '100%', borderRadius: 4,
                  background: '#ffffff', transition: 'width 0.1s linear'
                }} />
              </div>

              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: '0.62rem', color: '#b3b3b3', marginTop: 3, fontWeight: 500
              }}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatRemaining(currentTime, duration)}</span>
              </div>
            </div>

            {/* Bottom Row: Control Buttons */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              paddingTop: 1
            }}>
              <button
                onClick={() => setMuted(!muted)}
                style={{ background: 'none', border: 'none', color: muted ? '#1DB954' : '#b3b3b3', cursor: 'pointer', padding: 2 }}
              >
                {muted ? <VolumeX size={15} /> : <Sparkles size={15} />}
              </button>

              <button
                onClick={restartSong}
                style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: 2 }}
              >
                <SkipBack size={18} fill="#ffffff" />
              </button>

              <button
                onClick={togglePlay}
                style={{
                  width: 36, height: 36, borderRadius: '50%', border: 'none',
                  background: '#ffffff', color: '#000000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              >
                {playing ? <Pause size={17} fill="#000000" /> : <Play size={17} fill="#000000" style={{ marginLeft: 2 }} />}
              </button>

              <button
                onClick={restartSong}
                style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: 2 }}
              >
                <SkipForward size={18} fill="#ffffff" />
              </button>

              <button
                onClick={() => setMuted(!muted)}
                style={{ background: 'none', border: 'none', color: muted ? '#e85d88' : '#b3b3b3', cursor: 'pointer', padding: 2 }}
              >
                {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
