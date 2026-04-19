import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { FloatingCanvas } from './components/FloatingCanvas';
import { HeroSection } from './components/HeroSection';
import { InvitationContent } from './components/InvitationContent';
import { MusicToggle } from './components/MusicToggle';
import { CMSPanel } from './components/CMSPanel';

// ─── Theme Switcher pill ───────────────────────────────────────────────────────
function ThemeSwitcher() {
  const { theme, switchPreset } = useTheme();
  const isGold = theme.preset === 'goldfoil';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.7 }}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(16px)',
        borderRadius: '100px',
        border: '1.5px solid rgba(200,180,200,0.35)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        padding: '4px',
        overflow: 'hidden',
      }}
    >
      {/* Active indicator */}
      <motion.div
        animate={{ x: isGold ? '100%' : '0%' }}
        transition={{ type: 'spring', stiffness: 340, damping: 28 }}
        style={{
          position: 'absolute',
          left: '4px',
          width: 'calc(50% - 4px)',
          top: '4px',
          bottom: '4px',
          borderRadius: '100px',
          background: isGold
            ? 'linear-gradient(135deg, #C9A835, #F5E17A, #B8960C)'
            : 'linear-gradient(135deg, #F4B8C8, #C5A8D4)',
          boxShadow: isGold
            ? '0 4px 16px rgba(197,168,53,0.45)'
            : '0 4px 16px rgba(197,68,122,0.35)',
        }}
      />

      {/* Theme 1 */}
      <button
        onClick={() => switchPreset('wildflower')}
        style={{
          position: 'relative', zIndex: 1,
          padding: '8px 18px',
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px',
          borderRadius: '100px',
          transition: 'color 0.3s',
          color: !isGold ? 'white' : '#8B6A7A',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '11px',
          letterSpacing: '0.5px',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '13px' }}>🌸</span>
        Wildflower
      </button>

      {/* Theme 2 */}
      <button
        onClick={() => switchPreset('goldfoil')}
        style={{
          position: 'relative', zIndex: 1,
          padding: '8px 18px',
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px',
          borderRadius: '100px',
          transition: 'color 0.3s',
          color: isGold ? '#3A2A08' : '#9A7A8A',
          fontFamily: "'Poppins', sans-serif",
          fontSize: '11px',
          letterSpacing: '0.5px',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '13px' }}>✨</span>
        Gold Foil
      </button>
    </motion.div>
  );
}

// ─── Inner app ─────────────────────────────────────────────────────────────────
function AppInner() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const { bg, colors } = theme;
  const isGold = theme.preset === 'goldfoil';

  useEffect(() => {
    const styleId = 'wedding-dynamic-bg';
    let el = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement('style');
      el.id = styleId;
      document.head.appendChild(el);
    }

    if (isGold) {
      el.textContent = `
        @keyframes goldBgShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes goldFoilShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes goldTextShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .wedding-gradient-bg {
          background: linear-gradient(-45deg, ${bg.color1}, ${bg.color2}, ${bg.color3}, ${bg.color4}, ${bg.color5}, ${bg.color6});
          background-size: 400% 400%;
          animation: goldBgShift ${bg.speed}s ease infinite;
        }
        .shimmer-rainbow {
          background: linear-gradient(to right, #E8C84A, #F5E17A, #C9A835, #F0D060, #B8960C, #E8C84A);
          background-size: 200% auto;
          animation: goldFoilShimmer 3s linear infinite;
        }
        .gold-foil-name {
          background: linear-gradient(90deg, #8B6914, #E8C84A, #C9A835, #F5E17A, #B8960C, #E8C84A, #8B6914);
          background-size: 250% auto;
          animation: goldTextShimmer 3.5s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gold-foil-section-head {
          background: linear-gradient(90deg, #7A6020, #D4AF37, #C9A835, #E8C84A, #7A6020);
          background-size: 250% auto;
          animation: goldTextShimmer 4s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `;
    } else {
      el.textContent = `
        @keyframes weddingGradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .wedding-gradient-bg {
          background: linear-gradient(-45deg, ${bg.color1}, ${bg.color2}, ${bg.color3}, ${bg.color4}, ${bg.color5}, ${bg.color6});
          background-size: 400% 400%;
          animation: weddingGradientShift ${bg.speed}s ease infinite;
        }
        .shimmer-rainbow {
          background: linear-gradient(to right, ${bg.color1}, ${bg.color3}, ${bg.color5}, ${bg.color2}, ${bg.color4}, ${bg.color6}, ${bg.color1});
          background-size: 200% auto;
          animation: shimmer 4s linear infinite;
        }
        .gold-foil-name {
          background: none;
          -webkit-text-fill-color: unset;
        }
        .gold-foil-section-head {
          background: none;
          -webkit-text-fill-color: unset;
        }
      `;
    }
  }, [bg, isGold]);

  return (
    <div
      className="wedding-gradient-bg"
      style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}
    >
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(197,68,122,0.3); border-radius: 100px; }
        body { font-family: 'Poppins', sans-serif; -webkit-font-smoothing: antialiased; margin: 0; padding: 0; }
      `}</style>

      <FloatingCanvas />
      <CMSPanel />
      <MusicToggle />

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="hero"
            style={{ minHeight: '100vh', position: 'relative' }}
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }}
            transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
          >
            <HeroSection onOpen={() => setIsOpen(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            style={{ minHeight: '100vh', position: 'relative', zIndex: 6 }}
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              onClick={() => {
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              whileHover={{ x: -3, scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              style={{
                position: 'fixed', top: '20px', left: '16px', zIndex: 50,
                background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)',
                border: `1px solid ${colors.gold}55`, borderRadius: '100px',
                padding: '10px 18px', display: 'flex', alignItems: 'center', gap: '6px',
                cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13 8 L3 8 M7 3 L2 8 L7 13" stroke={colors.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: colors.labelText }}>
                Cover
              </span>
            </motion.button>
            <InvitationContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gold/Rainbow shimmer bar */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="shimmer-rainbow"
          style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '4px', zIndex: 20 }}
        />
      )}

      {/* Theme Switcher */}
      <ThemeSwitcher />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
