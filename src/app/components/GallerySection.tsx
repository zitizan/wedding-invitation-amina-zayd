import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BotanicalDivider } from './WildflowerDecor';
import { useTheme } from '../context/ThemeContext';

// ─── Slide variants per effect ─────────────────────────────────────────────────
function getVariants(effect: string, dir: number) {
  const xIn = dir > 0 ? '100%' : '-100%';
  const xOut = dir > 0 ? '-100%' : '100%';

  switch (effect) {
    case 'slide':
      return {
        enter: { x: xIn, opacity: 0, scale: 1 },
        center: { x: 0, opacity: 1, scale: 1 },
        exit: { x: xOut, opacity: 0, scale: 1 },
      };
    case 'zoom-fade':
      return {
        enter: { x: 0, opacity: 0, scale: 1.08 },
        center: { x: 0, opacity: 1, scale: 1 },
        exit: { x: 0, opacity: 0, scale: 0.94 },
      };
    case 'zoom-slide':
    default:
      return {
        enter: { x: xIn, opacity: 0, scale: 1.06 },
        center: { x: 0, opacity: 1, scale: 1 },
        exit: { x: xOut, opacity: 0, scale: 0.94 },
      };
  }
}

// ─── Ken Burns animated image ──────────────────────────────────────────────────
function KenBurnsImage({
  src, alt, zoomScale, zoomDir, speed,
}: {
  src: string; alt: string;
  zoomScale: number; zoomDir: 'in' | 'out' | 'alternate';
  speed: number;
}) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setTick(t => t + 1);
  }, [src]);

  // For alternate, odd tick = zoom-in, even = zoom-out
  const isZoomIn =
    zoomDir === 'in' ? true :
    zoomDir === 'out' ? false :
    tick % 2 === 0;

  return (
    <motion.img
      key={`${src}-${tick}`}
      src={src}
      alt={alt}
      initial={{ scale: isZoomIn ? 1 : zoomScale }}
      animate={{ scale: isZoomIn ? zoomScale : 1 }}
      transition={{ duration: speed, ease: 'linear' }}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        objectFit: 'cover',
        display: 'block',
        transformOrigin: 'center center',
        willChange: 'transform',
      }}
    />
  );
}

// ─── Floral corner ornament ────────────────────────────────────────────────────
function FloralCorner({ color, rotate }: { color: string; rotate: number }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
      style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M4 4 L4 20" stroke={color} strokeWidth="1.5" opacity={0.7} strokeLinecap="round" />
      <path d="M4 4 L20 4" stroke={color} strokeWidth="1.5" opacity={0.7} strokeLinecap="round" />
      <circle cx="4" cy="4" r="3" fill={color} opacity={0.8} />
      {/* Small flower */}
      {[0, 72, 144, 216, 288].map(a => (
        <ellipse key={a}
          cx={13 + Math.cos((a * Math.PI) / 180) * 5}
          cy={13 + Math.sin((a * Math.PI) / 180) * 5}
          rx="2.5" ry="4" fill={color} opacity={0.5}
          transform={`rotate(${a + 90}, ${13 + Math.cos((a * Math.PI) / 180) * 5}, ${13 + Math.sin((a * Math.PI) / 180) * 5})`}
        />
      ))}
      <circle cx="13" cy="13" r="3" fill={color} opacity={0.7} />
      <circle cx="13" cy="13" r="1.5" fill="white" opacity={0.9} />
    </svg>
  );
}

// ─── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ speed, active, color }: { speed: number; active: boolean; color: string }) {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.2)', zIndex: 10 }}>
      <AnimatePresence>
        {active && (
          <motion.div
            key={`prog-${speed}`}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            exit={{ width: '100%' }}
            transition={{ duration: speed, ease: 'linear' }}
            style={{ height: '100%', background: color, originX: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Gallery ──────────────────────────────────────────────────────────────
export function GallerySection() {
  const { theme } = useTheme();
  const { fonts, sizes, colors, gallery } = theme;
  const {
    autoPlay, speed, zoomScale, zoomDirection, fadeDuration,
    slideDirection, effect, showCaptions, showDots, showArrows,
    overlayOpacity, images,
  } = gallery;

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward (RTL), -1 = backward (LTR)
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const safeImages = images.filter(img => img.url.trim());
  const total = safeImages.length;

  const goTo = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrent((idx + total) % total);
  }, [total]);

  const next = useCallback(() => {
    const dir = slideDirection === 'rtl' ? 1 : -1;
    goTo(current + 1, dir);
  }, [current, slideDirection, goTo]);

  const prev = useCallback(() => {
    const dir = slideDirection === 'rtl' ? -1 : 1;
    goTo(current - 1, dir);
  }, [current, slideDirection, goTo]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isPaused || isHovered || total < 2) return;
    timerRef.current = setInterval(next, speed * 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoPlay, isPaused, isHovered, speed, next, total]);

  if (total === 0) return null;

  const img = safeImages[current];
  const vars = getVariants(effect, direction);
  const frameColor = img.frame || colors.accentPink;

  return (
    <section style={{ padding: '48px 0 0', overflow: 'hidden' }}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '32px', padding: '0 24px' }}
      >
        <p style={{ fontFamily: fonts.serif, fontSize: `${sizes.labelText}px`, letterSpacing: '4px', color: colors.gold, textTransform: 'uppercase', marginBottom: '8px' }}>
          Memories
        </p>
        <h2 style={{ fontFamily: fonts.script, fontSize: `clamp(32px, 10vw, ${sizes.sectionHeading}px)`, color: colors.primaryRose, margin: '0', lineHeight: 1.1, fontWeight: 400 }}>
          Our Gallery
        </h2>
        <BotanicalDivider color={colors.gold} />
        <p style={{ fontFamily: fonts.sans, fontSize: `${sizes.bodyText - 2}px`, color: colors.labelText, marginTop: '4px' }}>
          {autoPlay ? '✨ Auto-playing · tap arrows to navigate' : '✨ Tap arrows to navigate'}
        </p>
      </motion.div>

      {/* ─── Cinematic Stage ─── */}
      <div
        style={{ position: 'relative', width: '100%', maxWidth: '480px', margin: '0 auto', paddingBottom: '0' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Outer floral frame */}
        <div style={{
          position: 'relative',
          padding: '10px',
          background: `linear-gradient(135deg, ${frameColor}40, rgba(255,255,255,0.2), ${frameColor}40)`,
          borderRadius: '28px',
          boxShadow: `0 20px 60px ${frameColor}50, 0 4px 20px rgba(0,0,0,0.1)`,
          margin: '0 16px',
        }}>
          {/* Floral corners */}
          {[
            { pos: { top: '-2px', left: '-2px' }, rotate: 0 },
            { pos: { top: '-2px', right: '-2px' }, rotate: 90 },
            { pos: { bottom: '-2px', left: '-2px' }, rotate: 270 },
            { pos: { bottom: '-2px', right: '-2px' }, rotate: 180 },
          ].map((c, i) => (
            <div key={i} style={{ position: 'absolute', ...c.pos, zIndex: 20, pointerEvents: 'none' }}>
              <FloralCorner color={frameColor} rotate={c.rotate} />
            </div>
          ))}

          {/* Inner clip area */}
          <div style={{
            borderRadius: '20px',
            overflow: 'hidden',
            position: 'relative',
            aspectRatio: '3/4',
            background: '#1a0a14',
          }}>
            {/* AnimatePresence for slide transition */}
            <AnimatePresence initial={false} mode="sync" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={{
                  enter: () => vars.enter,
                  center: vars.center,
                  exit: () => vars.exit,
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: fadeDuration, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  position: 'absolute', inset: 0, overflow: 'hidden',
                }}
              >
                {/* Ken Burns on the image itself */}
                <KenBurnsImage
                  src={img.url}
                  alt={img.caption}
                  zoomScale={zoomScale}
                  zoomDir={zoomDirection}
                  speed={speed}
                />

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(
                    to bottom,
                    rgba(20,5,15,${overlayOpacity * 0.003}) 0%,
                    transparent 35%,
                    transparent 55%,
                    rgba(20,5,15,${overlayOpacity * 0.009}) 100%
                  )`,
                  zIndex: 2,
                }} />

                {/* Subtle shimmer edge */}
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 3,
                  background: `linear-gradient(
                    135deg,
                    ${frameColor}15 0%,
                    transparent 40%,
                    transparent 60%,
                    ${frameColor}10 100%
                  )`,
                }} />

                {/* Caption */}
                {showCaptions && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: fadeDuration * 0.6, duration: 0.5 }}
                    style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
                      padding: '20px 20px 16px',
                      background: 'linear-gradient(to top, rgba(20,5,15,0.7) 0%, transparent 100%)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ height: '1px', flex: 1, background: `linear-gradient(to right, transparent, ${frameColor}80)` }} />
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <path d="M5 0 L5.4 4.3 L10 5 L5.4 5.6 L5 10 L4.6 5.6 L0 5 L4.6 4.3 Z" fill={frameColor} opacity={0.9} />
                      </svg>
                      <div style={{ height: '1px', flex: 1, background: `linear-gradient(to left, transparent, ${frameColor}80)` }} />
                    </div>
                    <p style={{
                      fontFamily: fonts.script, fontSize: '26px',
                      color: 'white', margin: '6px 0 0', textAlign: 'center',
                      lineHeight: 1.2, fontWeight: 400,
                      textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                    }}>
                      {img.caption}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            {autoPlay && (
              <ProgressBar speed={speed} active={!isPaused && !isHovered} color={frameColor} />
            )}

            {/* Slide counter */}
            <div style={{
              position: 'absolute', top: '14px', right: '14px', zIndex: 15,
              background: 'rgba(20,5,15,0.5)', backdropFilter: 'blur(8px)',
              borderRadius: '100px', padding: '4px 10px',
              border: `1px solid ${frameColor}50`,
            }}>
              <span style={{ fontFamily: fonts.sans, fontSize: '10px', color: 'rgba(255,255,255,0.9)', letterSpacing: '1px' }}>
                {current + 1} / {total}
              </span>
            </div>

            {/* Pause / play indicator on hover */}
            <AnimatePresence>
              {autoPlay && isHovered && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setIsPaused(p => !p)}
                  style={{
                    position: 'absolute', top: '14px', left: '14px', zIndex: 15,
                    background: 'rgba(20,5,15,0.5)', backdropFilter: 'blur(8px)',
                    border: `1px solid ${frameColor}50`,
                    borderRadius: '100px', padding: '5px 10px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px',
                  }}
                >
                  {isPaused ? (
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="white"><path d="M0 0 L10 6 L0 12 Z" /></svg>
                  ) : (
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="white"><rect x="0" y="0" width="3.5" height="12" rx="1" /><rect x="6.5" y="0" width="3.5" height="12" rx="1" /></svg>
                  )}
                  <span style={{ fontFamily: fonts.sans, fontSize: '10px', color: 'rgba(255,255,255,0.9)' }}>
                    {isPaused ? 'Play' : 'Pause'}
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ─── Arrow navigation ─── */}
        {showArrows && total > 1 && (
          <>
            {[
              { side: 'left', action: prev, icon: 'M14 6 L4 6 M8 1 L3 6 L8 11' },
              { side: 'right', action: next, icon: 'M4 6 L14 6 M10 1 L15 6 L10 11' },
            ].map(({ side, action, icon }) => (
              <motion.button
                key={side}
                onClick={action}
                whileHover={{ scale: 1.12, x: side === 'left' ? -3 : 3 }}
                whileTap={{ scale: 0.88 }}
                style={{
                  position: 'absolute',
                  top: '50%', transform: 'translateY(-50%)',
                  ...(side === 'left' ? { left: '0px' } : { right: '0px' }),
                  zIndex: 30,
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: `rgba(255,255,255,0.88)`,
                  backdropFilter: 'blur(12px)',
                  border: `1.5px solid ${frameColor}70`,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.12)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                  <path d={icon} stroke={colors.primaryRose} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            ))}
          </>
        )}
      </div>

      {/* ─── Dot navigation ─── */}
      {showDots && total > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px', padding: '0 20px' }}>
          {safeImages.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                width: current === i ? '28px' : '8px',
                background: current === i ? img.frame : 'rgba(200,180,190,0.4)',
                boxShadow: current === i ? `0 0 12px ${img.frame}80` : 'none',
              }}
              transition={{ duration: 0.35 }}
              style={{ height: '8px', borderRadius: '100px', cursor: 'pointer', border: 'none', padding: 0 }}
            />
          ))}
        </div>
      )}

      {/* ─── Thumbnail strip ─── */}
      <div style={{
        display: 'flex', gap: '8px', overflowX: 'auto', padding: '20px 16px 48px 15px',
        scrollbarWidth: 'none', justifyContent: total <= 4 ? 'center' : 'flex-start',
      }}>
        {safeImages.map((img, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              opacity: current === i ? 1 : 0.55,
              outline: current === i ? `2.5px solid ${img.frame}` : '2.5px solid transparent',
              outlineOffset: '2px',
            }}
            transition={{ duration: 0.25 }}
            style={{
              flexShrink: 0, width: '56px', height: '72px', borderRadius: '12px',
              overflow: 'hidden', cursor: 'pointer', padding: 0, border: 'none',
              background: 'none', position: 'relative',
            }}
          >
            <img
              src={img.url} alt={img.caption}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {current === i && (
              <motion.div
                layoutId="thumb-glow"
                style={{
                  position: 'absolute', inset: 0,
                  border: `2px solid ${img.frame}`,
                  borderRadius: '12px', pointerEvents: 'none',
                }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </section>
  );
}