import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, VolumeX, Volume1, Volume2, X, ChevronUp, Link2, CheckCircle2, AlertCircle, Plus } from 'lucide-react';

// Paste your hosted MP3/audio URL below, or leave empty to use the Add Music input
const DEFAULT_MUSIC_URL = '';

const BARS = [4, 9, 15, 11, 19, 13, 7, 17, 11, 9, 15, 7];

export function MusicToggle() {
  const [musicUrl, setMusicUrl] = useState(DEFAULT_MUSIC_URL);
  const [inputUrl, setInputUrl] = useState(DEFAULT_MUSIC_URL);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlStatus, setUrlStatus] = useState<'idle' | 'ok' | 'error'>('idle');

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showPanel, setShowPanel] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Build / rebuild audio whenever URL changes
  const buildAudio = useCallback((url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    if (!url) return;
    const audio = new Audio();
    audio.loop = true;
    audio.volume = volume / 100;
    audio.crossOrigin = 'anonymous';
    audio.preload = 'auto';
    audio.src = url;
    audioRef.current = audio;
  }, []); // eslint-disable-line

  // Init
  useEffect(() => {
    buildAudio(musicUrl);
    const timer = setTimeout(() => setShowTooltip(false), 4000);
    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []); // eslint-disable-line

  // Sync volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  // Close panel on outside click
  useEffect(() => {
    if (!showPanel) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowPanel(false);
        setShowUrlInput(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showPanel]);

  const toggleMusic = async () => {
    setShowTooltip(false);
    if (!musicUrl) {
      setShowPanel(true);
      setShowUrlInput(true);
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      try {
        audio.volume = volume / 100;
        await audio.play();
        setIsPlaying(true);
        setUrlStatus('ok');
      } catch (err) {
        console.error('Audio play failed:', err);
        setUrlStatus('error');
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const applyUrl = async () => {
    const url = inputUrl.trim();
    if (!url) return;
    setUrlStatus('idle');
    setIsPlaying(false);
    setMusicUrl(url);
    buildAudio(url);
    // Try playing immediately
    await new Promise(r => setTimeout(r, 80));
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume / 100;
    setIsLoading(true);
    try {
      await audio.play();
      setIsPlaying(true);
      setUrlStatus('ok');
      setShowUrlInput(false);
    } catch (err) {
      console.error('Audio play failed:', err);
      setUrlStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ''; }
    setIsPlaying(false);
    setShowPanel(false);
    setRemoved(true);
  };

  const VolumeIcon = volume === 0 ? VolumeX : volume < 55 ? Volume1 : Volume2;
  const hasUrl = !!musicUrl;

  if (removed) return null;

  return (
    <div
      ref={panelRef}
      style={{ position: 'fixed', bottom: '28px', right: '20px', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}
    >
      {/* ── Expanded Panel ── */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            key="music-panel"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            style={{
              width: '240px',
              borderRadius: '22px',
              background: 'rgba(255,250,252,0.98)',
              backdropFilter: 'blur(28px)',
              border: '1.5px solid rgba(212,175,106,0.28)',
              boxShadow: '0 16px 56px rgba(139,34,82,0.15), 0 4px 18px rgba(0,0,0,0.1)',
              overflow: 'hidden',
            }}
          >
            {/* ── Header ── */}
            <div style={{
              padding: '13px 15px 11px',
              background: 'linear-gradient(135deg, rgba(244,184,200,0.28), rgba(197,168,212,0.2))',
              borderBottom: '1px solid rgba(212,175,106,0.15)',
              display: 'flex', alignItems: 'center', gap: '9px',
            }}>
              <motion.div
                animate={isPlaying ? { rotate: [0, -12, 12, -8, 8, 0] } : { rotate: 0 }}
                transition={{ duration: 1.4, repeat: isPlaying ? Infinity : 0, repeatDelay: 0.5 }}
              >
                <Music size={16} color="#8B2252" strokeWidth={1.8} />
              </motion.div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px', color: '#6A3A5A', margin: 0, lineHeight: 1.1 }}>
                  Romantic Music
                </p>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '10px', color: '#B09AB0', margin: '2px 0 0', lineHeight: 1 }}>
                  {!hasUrl ? 'No music added yet' : isPlaying ? '♪ Now playing…' : 'Ready to play'}
                </p>
              </div>
              <button
                onClick={() => { setShowPanel(false); setShowUrlInput(false); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex' }}
              >
                <ChevronUp size={14} color="#B09AB0" />
              </button>
            </div>

            {/* ── Waveform ── */}
            <div style={{ padding: '12px 16px 0', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '3px', height: '34px' }}>
              {BARS.map((h, i) => (
                <motion.div
                  key={i}
                  animate={isPlaying
                    ? { height: [`${h}px`, `${Math.max(3, h + (i % 2 === 0 ? 9 : -5))}px`, `${h}px`] }
                    : { height: '3px' }}
                  transition={{ duration: 0.55 + i * 0.07, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                  style={{
                    width: '3px', borderRadius: '100px',
                    background: 'linear-gradient(to top, #C5447A, #F4B8C8)',
                    opacity: isPlaying ? 0.9 : 0.25,
                  }}
                />
              ))}
            </div>

            {/* ── Play / Pause ── */}
            <div style={{ padding: '10px 15px 0' }}>
              <motion.button
                onClick={toggleMusic}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                disabled={isLoading}
                style={{
                  width: '100%', padding: '10px', borderRadius: '100px', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  background: !hasUrl
                    ? 'linear-gradient(135deg, #A08CB0, #C5A8D4)'
                    : isPlaying
                      ? 'linear-gradient(135deg, #8B2252, #C5447A)'
                      : 'linear-gradient(135deg, #C9A85C, #E8C060)',
                  boxShadow: !hasUrl
                    ? '0 4px 16px rgba(160,140,176,0.35)'
                    : isPlaying
                      ? '0 4px 18px rgba(197,68,122,0.4)'
                      : '0 4px 18px rgba(201,168,92,0.38)',
                  opacity: isLoading ? 0.7 : 1,
                  transition: 'background 0.3s, box-shadow 0.3s',
                }}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                    style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }}
                  />
                ) : !hasUrl ? (
                  <><Plus size={14} color="white" /><span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: 'white' }}>Add Music First</span></>
                ) : isPlaying ? (
                  <><svg width="12" height="14" viewBox="0 0 12 14" fill="white"><rect x="0" y="0" width="4" height="14" rx="2" /><rect x="8" y="0" width="4" height="14" rx="2" /></svg><span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: 'white' }}>Pause</span></>
                ) : (
                  <><svg width="12" height="14" viewBox="0 0 12 14" fill="white"><path d="M0 0 L12 7 L0 14 Z" /></svg><span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: 'white' }}>Play Music</span></>
                )}
              </motion.button>
            </div>

            {/* ── Volume ── */}
            <div style={{ padding: '12px 15px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <motion.button
                  onClick={() => setVolume(v => v === 0 ? 50 : 0)}
                  whileHover={{ scale: 1.18 }} whileTap={{ scale: 0.86 }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexShrink: 0 }}
                >
                  <VolumeIcon size={16} color={volume === 0 ? '#D0B0C0' : '#8B2252'} strokeWidth={1.8} />
                </motion.button>
                <div style={{ flex: 1, position: 'relative', height: '24px', display: 'flex', alignItems: 'center' }}>
                  <div style={{ position: 'absolute', left: 0, right: 0, height: '4px', borderRadius: '100px', background: 'rgba(200,180,200,0.28)' }} />
                  <div style={{ position: 'absolute', left: 0, width: `${volume}%`, height: '4px', borderRadius: '100px', background: 'linear-gradient(to right, #C5447A, #F4B8C8)', transition: 'width 0.08s' }} />
                  <input
                    type="range" min={0} max={100} step={1} value={volume}
                    onChange={e => setVolume(Number(e.target.value))}
                    style={{ position: 'absolute', left: 0, right: 0, width: '100%', opacity: 0, height: '24px', cursor: 'pointer', margin: 0 }}
                  />
                  <div style={{
                    position: 'absolute', left: `calc(${volume}% - 7px)`,
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: 'white', border: '2px solid #C5447A',
                    boxShadow: '0 2px 8px rgba(197,68,122,0.3)', pointerEvents: 'none', transition: 'left 0.05s',
                  }} />
                </div>
                <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#C9A85C', minWidth: '30px', textAlign: 'right', flexShrink: 0 }}>
                  {volume}%
                </span>
              </div>
            </div>

            {/* ── Add / Change Music URL ── */}
            <div style={{ padding: '12px 15px 0' }}>
              <motion.button
                onClick={() => setShowUrlInput(s => !s)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%', padding: '8px 12px', borderRadius: '12px', cursor: 'pointer',
                  border: '1.5px dashed rgba(201,168,92,0.45)',
                  background: showUrlInput ? 'rgba(244,184,200,0.18)' : 'rgba(255,248,235,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  transition: 'background 0.2s',
                }}
              >
                <Link2 size={13} color="#C9A85C" />
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '11px', color: '#A07030' }}>
                  {hasUrl ? 'Change Music URL' : '+ Add Music URL'}
                </span>
              </motion.button>

              <AnimatePresence>
                {showUrlInput && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                      <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '10px', color: '#B09AB0', margin: 0, lineHeight: 1.5 }}>
                        Paste a direct MP3 / audio URL (Google Drive, Dropbox, etc.)
                      </p>
                      <input
                        type="text"
                        value={inputUrl}
                        onChange={e => { setInputUrl(e.target.value); setUrlStatus('idle'); }}
                        onKeyDown={e => e.key === 'Enter' && applyUrl()}
                        placeholder="https://example.com/music.mp3"
                        style={{
                          width: '100%', padding: '8px 10px', borderRadius: '10px', boxSizing: 'border-box',
                          border: urlStatus === 'error'
                            ? '1.5px solid #E57373'
                            : urlStatus === 'ok'
                              ? '1.5px solid #81C784'
                              : '1.5px solid rgba(197,168,212,0.5)',
                          background: 'white', outline: 'none',
                          fontFamily: "'Poppins', sans-serif", fontSize: '11px', color: '#5A3A5A',
                          transition: 'border 0.2s',
                        }}
                      />
                      {urlStatus === 'error' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <AlertCircle size={12} color="#E57373" />
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '10px', color: '#E57373' }}>
                            Could not play. Try a direct download link.
                          </span>
                        </div>
                      )}
                      {urlStatus === 'ok' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <CheckCircle2 size={12} color="#81C784" />
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '10px', color: '#66A869' }}>
                            Playing successfully!
                          </span>
                        </div>
                      )}
                      <motion.button
                        onClick={applyUrl}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!inputUrl.trim()}
                        style={{
                          padding: '8px 14px', borderRadius: '10px', border: 'none', cursor: inputUrl.trim() ? 'pointer' : 'not-allowed',
                          background: inputUrl.trim() ? 'linear-gradient(135deg, #C9A85C, #E8C060)' : 'rgba(200,180,200,0.3)',
                          fontFamily: "'Poppins', sans-serif", fontSize: '12px',
                          color: inputUrl.trim() ? 'white' : '#B0A0B0',
                          boxShadow: inputUrl.trim() ? '0 4px 14px rgba(201,168,92,0.35)' : 'none',
                          transition: 'all 0.2s',
                        }}
                      >
                        Load & Play
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Remove ── */}
            <div style={{ padding: '12px 15px 15px' }}>
              <motion.button
                onClick={handleRemove}
                whileHover={{ background: 'rgba(244,184,200,0.28)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%', padding: '8px 12px', borderRadius: '12px',
                  border: '1px solid rgba(197,68,122,0.2)',
                  background: 'rgba(244,184,200,0.1)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  transition: 'background 0.2s',
                }}
              >
                <X size={13} color="#C5447A" />
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '11px', color: '#C5447A' }}>
                  Remove Music Player
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Tooltip ── */}
      <AnimatePresence>
        {showTooltip && !showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
            style={{
              position: 'absolute', bottom: '66px', right: 0,
              background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(212,175,106,0.4)', borderRadius: '12px',
              padding: '8px 14px', whiteSpace: 'nowrap',
              fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: '#8B4A6B',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)', pointerEvents: 'none',
            }}
          >
            🎵 {hasUrl ? 'Music controls' : 'Add romantic music'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB ── */}
      <motion.button
        onClick={() => { setShowTooltip(false); setShowPanel(p => !p); }}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        style={{
          width: '54px', height: '54px', borderRadius: '50%',
          background: isPlaying
            ? 'linear-gradient(135deg, #8B2252, #C5447A)'
            : hasUrl
              ? 'linear-gradient(135deg, #C9A85C, #E8C060)'
              : 'linear-gradient(135deg, #F4B8C8, #C5A8D4)',
          border: '2.5px solid rgba(255,255,255,0.9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', position: 'relative',
          boxShadow: isPlaying
            ? '0 0 26px rgba(197,68,122,0.55), 0 4px 20px rgba(0,0,0,0.15)'
            : hasUrl
              ? '0 0 20px rgba(201,168,92,0.45), 0 4px 20px rgba(0,0,0,0.12)'
              : '0 4px 20px rgba(0,0,0,0.15)',
          transition: 'box-shadow 0.3s, background 0.3s',
        }}
      >
        {/* Pulse rings */}
        {isPlaying && [1, 2, 3].map(i => (
          <motion.div
            key={i}
            style={{ position: 'absolute', inset: `-${i * 8}px`, borderRadius: '50%', border: '1.5px solid rgba(197,68,122,0.3)', pointerEvents: 'none' }}
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
          />
        ))}

        {isLoading ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
            style={{ width: '20px', height: '20px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }} />
        ) : !hasUrl ? (
          <Plus size={22} color="white" strokeWidth={2} />
        ) : isPlaying ? (
          <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 0.85, repeat: Infinity }}>
            <Music size={22} color="white" strokeWidth={1.8} />
          </motion.div>
        ) : (
          <Music size={22} color="white" strokeWidth={1.8} />
        )}
      </motion.button>
    </div>
  );
}
