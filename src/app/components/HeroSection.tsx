import { motion } from 'motion/react';
import { WildflowerDecor } from './WildflowerDecor';
import { GoldFoilDecor } from './GoldFoilDecor';
import { useTheme } from '../context/ThemeContext';

interface HeroSectionProps {
  onOpen: () => void;
}

export function HeroSection({ onOpen }: HeroSectionProps) {
  const { theme } = useTheme();
  const { couple, fonts, sizes, colors, button } = theme;
  const isGold = theme.preset === 'goldfoil';

  // Gold foil overlay radials
  const goldOverlay = `
    radial-gradient(ellipse at 15% 15%, rgba(232,200,74,0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 85% 15%, rgba(212,175,55,0.10) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 85%, rgba(197,168,53,0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.55) 0%, transparent 70%)
  `;

  // Wildflower overlay radials
  const wildOverlay = `
    radial-gradient(ellipse at 10% 20%, rgba(244,184,200,0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 90% 20%, rgba(197,168,212,0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 80%, rgba(168,220,200,0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 70%)
  `;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', padding: '20px',
      }}
    >
      {/* Themed decor */}
      {isGold ? <GoldFoilDecor /> : <WildflowerDecor />}

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: isGold ? goldOverlay : wildOverlay,
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* Border frame — gold foil has double gold lines */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1.2 }}
        style={{
          position: 'absolute', inset: '16px',
          border: `${isGold ? '1.5px' : '1px'} solid ${colors.gold}${isGold ? '70' : '50'}`,
          borderRadius: '24px', pointerEvents: 'none', zIndex: 3,
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 1.2 }}
        style={{
          position: 'absolute', inset: '24px',
          border: `1px solid ${colors.gold}${isGold ? '40' : '25'}`,
          borderRadius: '20px', pointerEvents: 'none', zIndex: 3,
        }}
      />
      {/* Extra inner frame for gold foil */}
      {isGold && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 1.2 }}
          style={{
            position: 'absolute', inset: '32px',
            border: `0.5px solid ${colors.gold}20`,
            borderRadius: '18px', pointerEvents: 'none', zIndex: 3,
          }}
        />
      )}

      {/* Corner ornaments */}
      {[
        { top: '28px', left: '28px', rotate: 0 },
        { top: '28px', right: '28px', rotate: 90 },
        { bottom: '28px', left: '28px', rotate: 270 },
        { bottom: '28px', right: '28px', rotate: 180 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + i * 0.1, duration: 0.6 }}
          style={{ position: 'absolute', zIndex: 4, ...pos }}
        >
          {isGold ? (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ transform: `rotate(${pos.rotate}deg)` }}>
              <path d="M 2 2 L 2 16" stroke={colors.gold} strokeWidth="1.5" opacity={0.7} />
              <path d="M 2 2 L 16 2" stroke={colors.gold} strokeWidth="1.5" opacity={0.7} />
              <circle cx="2" cy="2" r="3" fill={colors.gold} opacity={0.8} />
              <circle cx="2" cy="16" r="1.5" fill={colors.gold} opacity={0.5} />
              <circle cx="16" cy="2" r="1.5" fill={colors.gold} opacity={0.5} />
              {/* Diamond accent */}
              <path d="M 8 8 L 11 11 L 8 14 L 5 11 Z" fill={colors.gold} opacity={0.4} />
            </svg>
          ) : (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" style={{ transform: `rotate(${pos.rotate}deg)` }}>
              <path d="M 2 2 L 2 14" stroke={colors.gold} strokeWidth="1.2" opacity={0.6} />
              <path d="M 2 2 L 14 2" stroke={colors.gold} strokeWidth="1.2" opacity={0.6} />
              <circle cx="2" cy="2" r="2.5" fill={colors.gold} opacity={0.7} />
              <circle cx="8" cy="8" r="1.5" fill="#F4B8C8" opacity={0.8} />
            </svg>
          )}
        </motion.div>
      ))}

      {/* Main content */}
      <div style={{
        position: 'relative', zIndex: 10, textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        maxWidth: '360px', width: '100%',
      }}>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          style={{
            fontFamily: fonts.serif,
            fontSize: `${sizes.labelText}px`,
            letterSpacing: '4px', color: colors.gold,
            textTransform: 'uppercase', marginBottom: '12px', opacity: 0.9,
          }}
        >
          {isGold ? 'The Wedding Event Of' : 'We Are Getting Married'}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}
        >
          <div style={{ height: '1px', width: '50px', background: `linear-gradient(to right, transparent, ${colors.gold})` }} />
          {isGold ? (
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M8 2 L10 6 L14 6 L11 9 L12 13 L8 11 L4 13 L5 9 L2 6 L6 6 Z" fill={colors.gold} opacity={0.85} />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M8 0 L8.5 7 L16 8 L8.5 8.5 L8 16 L7.5 8.5 L0 8 L7.5 7 Z" fill={colors.gold} opacity={0.8} />
            </svg>
          )}
          <div style={{ height: '1px', width: '50px', background: `linear-gradient(to left, transparent, ${colors.gold})` }} />
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.9, duration: 1.1, type: 'spring', stiffness: 80 }}
        >
          <h1
            className={isGold ? 'gold-foil-name' : ''}
            style={{
              fontFamily: fonts.script,
              fontSize: `clamp(48px, 14vw, ${sizes.nameHero}px)`,
              ...(isGold ? {} : {
                background: `linear-gradient(135deg, ${colors.primaryRose}, ${colors.accentPink}, ${colors.primaryRose})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }),
              lineHeight: 1.1, letterSpacing: '2px', margin: 0, fontWeight: 400,
            }}
          >
            {couple.name1}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '2px 0' }}>
            <div style={{ height: '1px', width: '40px', background: `${colors.gold}40` }} />
            <span style={{ fontFamily: fonts.serif, fontSize: '22px', color: colors.gold, fontStyle: 'italic' }}>
              {isGold ? 'and' : '&'}
            </span>
            <div style={{ height: '1px', width: '40px', background: `${colors.gold}40` }} />
          </div>

          <h1
            className={isGold ? 'gold-foil-name' : ''}
            style={{
              fontFamily: fonts.script,
              fontSize: `clamp(48px, 14vw, ${sizes.nameHero}px)`,
              ...(isGold ? {} : {
                background: `linear-gradient(135deg, ${colors.primaryRose}, ${colors.accentPink}, ${colors.primaryRose})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }),
              lineHeight: 1.1, letterSpacing: '2px', margin: 0, fontWeight: 400,
            }}
          >
            {couple.name2}
          </h1>
        </motion.div>

        {/* Separator / heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.6, type: 'spring' }}
          style={{ marginTop: '10px', marginBottom: '4px' }}
        >
          {isGold ? (
            <svg width="140" height="28" viewBox="0 0 140 28">
              <defs>
                <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="30%" stopColor="#C9A835" />
                  <stop offset="50%" stopColor="#E8C84A" />
                  <stop offset="70%" stopColor="#C9A835" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <line x1="0" y1="14" x2="55" y2="14" stroke="url(#goldLineGrad)" strokeWidth="1" />
              <path d="M70 8 L74 14 L70 20 L66 14 Z" fill="#C9A835" opacity={0.85} />
              <circle cx="70" cy="14" r="2.5" fill="#F5E17A" opacity={0.9} />
              <line x1="85" y1="14" x2="140" y2="14" stroke="url(#goldLineGrad)" strokeWidth="1" />
              <circle cx="55" cy="14" r="2" fill="#C9A835" opacity={0.6} />
              <circle cx="85" cy="14" r="2" fill="#C9A835" opacity={0.6} />
            </svg>
          ) : (
            <motion.div className="heartbeat-anim">
              <svg width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 24 C14 24 3 17 3 9.5 C3 6.4 5.4 4 8.5 4 C10.3 4 11.9 4.9 13 6.2 C14.1 4.9 15.7 4 17.5 4 C20.6 4 23 6.4 23 9.5 C23 17 14 24 14 24 Z" fill="url(#heroHeartGrad)" />
                <defs>
                  <linearGradient id="heroHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F4B8C8" />
                    <stop offset="100%" stopColor={colors.accentPink} />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          )}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            fontFamily: fonts.sans,
            fontSize: `${sizes.subtitleText}px`,
            color: colors.subtitleText,
            lineHeight: 1.7, textAlign: 'center',
            marginTop: '8px', marginBottom: '20px',
            maxWidth: '280px', letterSpacing: '0.3px',
          }}
        >
          {isGold
            ? `We are invited you to our wedding on the`
            : couple.subtitle}
        </motion.p>

        {/* Date pill / date circle for gold */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          style={{ marginBottom: '24px' }}
        >
          {isGold ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Date circle */}
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                border: `1.5px solid ${colors.gold}70`,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.7)',
                boxShadow: `0 4px 20px ${colors.gold}20`,
              }}>
                <span style={{ fontFamily: fonts.serif, fontSize: '22px', color: colors.gold, lineHeight: 1, fontWeight: 600 }}>
                  {couple.date.split(' ')[0]}
                </span>
                <span style={{ fontFamily: fonts.sans, fontSize: '10px', color: colors.labelText, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  {couple.date.split(' ')[1]}
                </span>
              </div>
              {/* Time circle */}
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                border: `1.5px solid ${colors.gold}70`,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.7)',
                boxShadow: `0 4px 20px ${colors.gold}20`,
              }}>
                <span style={{ fontFamily: fonts.serif, fontSize: '13px', color: colors.gold, lineHeight: 1.3 }}>
                  {couple.time}
                </span>
                <span style={{ fontFamily: fonts.sans, fontSize: '9px', color: colors.labelText, letterSpacing: '0.5px' }}>
                  Onwards
                </span>
              </div>
            </div>
          ) : (
            <div style={{
              background: `${colors.gold}20`,
              border: `1px solid ${colors.gold}55`,
              borderRadius: '100px', padding: '6px 20px',
            }}>
              <span style={{ fontFamily: fonts.serif, fontSize: `${sizes.labelText + 2}px`, color: colors.gold, letterSpacing: '2px' }}>
                {couple.dateShort}
              </span>
            </div>
          )}
        </motion.div>

        {/* Venue label for gold theme */}
        {isGold && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.85, duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '20px' }}
          >
            <p style={{
              fontFamily: fonts.serif, fontSize: `${sizes.detailText + 1}px`,
              color: colors.primaryRose, margin: '0 0 2px', fontWeight: 600, letterSpacing: '0.5px',
            }}>
              {couple.venue}
            </p>
            <p style={{ fontFamily: fonts.sans, fontSize: `${sizes.labelText}px`, color: colors.labelText, margin: 0, letterSpacing: '1px' }}>
              {couple.location}
            </p>
          </motion.div>
        )}

        {/* Open Invitation Button */}
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.9, duration: 0.8, type: 'spring' }}
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.94 }}
          onClick={onOpen}
          className="open-btn-glow"
          style={{
            background: `linear-gradient(135deg, ${button.colorFrom}, ${button.colorTo}, ${button.colorFrom})`,
            backgroundSize: '200% auto',
            border: isGold ? `1px solid ${colors.gold}60` : 'none',
            borderRadius: '100px',
            padding: '15px 36px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '10px',
            position: 'relative', overflow: 'hidden',
            boxShadow: isGold
              ? `0 8px 32px ${colors.gold}50, 0 2px 8px rgba(0,0,0,0.15)`
              : `0 8px 32px ${button.colorFrom}60`,
          }}
        >
          <span style={{
            fontFamily: isGold ? fonts.serif : fonts.serif,
            fontSize: `${sizes.detailText}px`,
            color: button.textColor,
            letterSpacing: isGold ? '2px' : '1.5px',
            position: 'relative', zIndex: 1,
          }}>
            {button.label}
          </span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ position: 'relative', zIndex: 1 }}>
            <path d="M3 9 L15 9 M10 4 L15 9 L10 14" stroke={button.textColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
            style={{
              position: 'absolute', top: 0, left: 0, width: '40%', height: '100%',
              background: `linear-gradient(90deg, transparent, ${isGold ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.35)'}, transparent)`,
              transform: 'skewX(-15deg)',
            }}
          />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 0.55 }}
          transition={{ delay: 2.5, duration: 1 }}
          style={{ fontFamily: fonts.sans, fontSize: '11px', color: colors.labelText, marginTop: '16px', letterSpacing: '1px' }}
        >
          tap to reveal your invitation
        </motion.p>
      </div>
    </motion.div>
  );
}
