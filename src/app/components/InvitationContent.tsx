import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CountdownTimer } from './CountdownTimer';
import { StorySection } from './StorySection';
import { GallerySection } from './GallerySection';
import { RSVPSection } from './RSVPSection';
import { BotanicalDivider } from './WildflowerDecor';
import { GoldFoilDivider } from './GoldFoilDecor';
import { useTheme } from '../context/ThemeContext';

// ─── Google Maps Modal ─────────────────────────────────────────────────────────
function MapModal({ venue, location, onClose }: { venue: string; location: string; onClose: () => void }) {
  const plusCode = '7GQM+55 Doha';
  const query = encodeURIComponent(`${venue}, ${location}`);
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(plusCode)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const googleMapsUrl = `https://maps.google.com/?q=${encodeURIComponent(plusCode)}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 300,
          background: 'rgba(30,10,25,0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          padding: '0',
        }}
      >
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%', maxWidth: '480px',
            background: 'rgba(255,252,250,0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '28px 28px 0 0',
            overflow: 'hidden',
            boxShadow: '0 -20px 60px rgba(139,34,82,0.18)',
            maxHeight: '85vh',
            display: 'flex', flexDirection: 'column',
          }}
        >
          {/* Handle */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 0' }}>
            <div style={{ width: '40px', height: '4px', borderRadius: '100px', background: 'rgba(200,180,200,0.4)' }} />
          </div>

          {/* Header */}
          <div style={{
            padding: '16px 20px 14px',
            borderBottom: '1px solid rgba(244,184,200,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #4A9A7A20, #4A9A7A40)',
                border: '1.5px solid rgba(74,154,122,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '18px' }}>📍</span>
              </div>
              <div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', color: '#3A2A3A', margin: '0 0 2px', fontWeight: 600 }}>
                  {venue}
                </p>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '11px', color: '#8A6A7A', margin: 0 }}>
                  {location}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'rgba(244,184,200,0.2)',
                border: '1px solid rgba(244,184,200,0.4)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="#8B4A6B" strokeWidth="2" strokeLinecap="round">
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            </button>
          </div>

          {/* Map iframe */}
          <div style={{ position: 'relative', flex: 1, minHeight: '320px' }}>
            {/* Floral corner decorations */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 1 }}>
              <div style={{ position: 'absolute', top: '8px', left: '8px', fontSize: '18px', opacity: 0.5 }}>🌸</div>
              <div style={{ position: 'absolute', top: '8px', right: '8px', fontSize: '16px', opacity: 0.4 }}>🌺</div>
            </div>
            <iframe
              src={embedSrc}
              title="Wedding Venue Location"
              width="100%"
              height="100%"
              style={{ border: 'none', display: 'block', minHeight: '320px' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* Action buttons */}
          <div style={{ padding: '14px 16px 24px', display: 'flex', gap: '10px' }}>
            <motion.a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                flex: 1, padding: '14px',
                borderRadius: '16px', border: 'none',
                background: 'linear-gradient(135deg, #4A9A7A, #2A7A5A)',
                color: 'white', textDecoration: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                boxShadow: '0 6px 24px rgba(74,154,122,0.35)',
                fontFamily: "'Poppins', sans-serif", fontSize: '13px',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Open in Google Maps
            </motion.a>

            <motion.a
              href={`https://waze.com/ul?q=${query}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '14px 16px',
                borderRadius: '16px',
                background: 'rgba(74,154,122,0.1)',
                border: '1.5px solid rgba(74,154,122,0.3)',
                color: '#3A7A5A', textDecoration: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                fontFamily: "'Poppins', sans-serif", fontSize: '12px',
              }}
            >
              <span style={{ fontSize: '16px' }}>🚗</span>
              Waze
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Invitation Card ───────────────────────────────────────────────────────────
function InvitationCard() {
  const { theme } = useTheme();
  const { couple, fonts, sizes, colors, card } = theme;
  const [showMap, setShowMap] = useState(false);
  const isGold = theme.preset === 'goldfoil';

  const Divider = isGold ? GoldFoilDivider : BotanicalDivider;

  const details = [
    { icon: '📅', label: 'Date', value: couple.date, color: isGold ? colors.gold : colors.accentPink, clickable: false },
    { icon: '🕖', label: 'Time', value: `${couple.time} — Onwards`, color: isGold ? colors.accentPink : '#7A5AB8', clickable: false },
    { icon: '🏰', label: 'Venue', value: couple.venue, color: isGold ? colors.primaryRose : colors.gold, clickable: false },
    { icon: '📍', label: 'Location', value: couple.location, color: isGold ? '#7A6C20' : '#4A9A7A', clickable: true },
  ];

  const cardShadow = isGold
    ? `0 24px 80px rgba(197,168,53,0.18), 0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)`
    : `0 20px 60px ${colors.accentPink}18, 0 4px 20px rgba(0,0,0,0.06)`;

  const borderGradient = isGold
    ? `linear-gradient(135deg, #D4AF37, #F5E17A, #C9A835, #E8C84A, #B8960C, #D4AF37)`
    : `linear-gradient(135deg, ${card.borderColor}, ${card.borderColor}80, #C5A8D4, #A8CEE8, ${card.borderColor})`;

  return (
    <>
      <section style={{ padding: '0 20px 48px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, type: 'spring', stiffness: 80, damping: 15 }}
          style={{ maxWidth: '420px', margin: '0 auto', position: 'relative' }}
        >
          {/* Outer gradient border */}
          <div style={{
            position: 'absolute', inset: '-2px', borderRadius: '32px',
            background: borderGradient,
            backgroundSize: '300% 300%',
            animation: 'gradientShift 8s ease infinite',
            zIndex: 0,
          }} />

          {/* Gold foil texture overlay on card */}
          {isGold && (
            <div style={{
              position: 'absolute', inset: '0', borderRadius: '30px',
              background: `
                radial-gradient(ellipse at 10% 10%, rgba(232,200,74,0.08) 0%, transparent 40%),
                radial-gradient(ellipse at 90% 90%, rgba(197,168,53,0.06) 0%, transparent 40%),
                radial-gradient(ellipse at 80% 10%, rgba(245,225,122,0.05) 0%, transparent 30%)
              `,
              zIndex: 2, pointerEvents: 'none', borderRadius: '30px',
            }} />
          )}

          {/* Main card */}
          <div style={{
            position: 'relative', zIndex: 1,
            background: isGold ? `rgba(255,255,255,${card.bgOpacity})` : `rgba(255,252,250,${card.bgOpacity})`,
            backdropFilter: 'blur(24px)',
            borderRadius: '30px', padding: '36px 28px',
            boxShadow: cardShadow,
          }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              {isGold ? (
                // Gold foil header decoration
                <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '16px' }}>
                  <svg width="120" height="24" viewBox="0 0 120 24" overflow="visible">
                    <defs>
                      <linearGradient id="hdrGold" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="20%" stopColor="#C9A835" />
                        <stop offset="50%" stopColor="#E8C84A" />
                        <stop offset="80%" stopColor="#C9A835" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="12" x2="42" y2="12" stroke="url(#hdrGold)" strokeWidth="1" />
                    <path d="M60 4 L64 12 L60 20 L56 12 Z" fill="#C9A835" opacity={0.75} />
                    <circle cx="60" cy="12" r="2.5" fill="#F5E17A" />
                    <circle cx="48" cy="12" r="2" fill="#C9A835" opacity={0.5} />
                    <circle cx="72" cy="12" r="2" fill="#C9A835" opacity={0.5} />
                    <line x1="78" y1="12" x2="120" y2="12" stroke="url(#hdrGold)" strokeWidth="1" />
                  </svg>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                  {['#F4B8C8', '#C5A8D4', '#FCCBA8', '#A8DCC8', '#F4B8C8'].map((c, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 16 16">
                      {[0, 72, 144, 216, 288].map(a => (
                        <ellipse key={a}
                          cx={8 + Math.cos((a * Math.PI) / 180) * 5}
                          cy={8 + Math.sin((a * Math.PI) / 180) * 5}
                          rx="2.5" ry="4" fill={c} opacity={0.85}
                          transform={`rotate(${a + 90}, ${8 + Math.cos((a * Math.PI) / 180) * 5}, ${8 + Math.sin((a * Math.PI) / 180) * 5})`}
                        />
                      ))}
                      <circle cx="8" cy="8" r="2.5" fill="#F8E4A0" />
                    </svg>
                  ))}
                </div>
              )}

              <p style={{
                fontFamily: fonts.sans,
                fontSize: `${sizes.labelText}px`,
                letterSpacing: isGold ? '3px' : '4px',
                color: colors.gold,
                textTransform: 'uppercase', margin: '0 0 8px 0',
              }}>
                Together with their families
              </p>

              <h2
                className={isGold ? 'gold-foil-name' : ''}
                style={{
                  fontFamily: fonts.script,
                  fontSize: `clamp(40px, 11vw, ${sizes.cardNames}px)`,
                  ...(isGold ? {} : {
                    background: `linear-gradient(135deg, ${colors.primaryRose}, ${colors.accentPink})`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }),
                  margin: '0', lineHeight: 1.0, fontWeight: 400,
                }}
              >
                {couple.name1} &amp; {couple.name2}
              </h2>
              <p style={{
                fontFamily: fonts.serif,
                fontSize: `${sizes.subtitleText}px`,
                color: isGold ? colors.subtitleText : '#8B6A7A',
                fontStyle: 'italic', margin: '8px 0 0 0',
              }}>
                invite you to celebrate their wedding
              </p>
            </div>

            <Divider color={colors.gold} />

            {/* Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '20px 0' }}>
              {details.map((d, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                  onClick={d.clickable ? () => setShowMap(true) : undefined}
                  whileHover={d.clickable ? { scale: 1.03, x: 4 } : {}}
                  whileTap={d.clickable ? { scale: 0.97 } : {}}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '14px 16px',
                    background: isGold
                      ? `rgba(255,255,255,0.6)`
                      : (d.clickable ? `linear-gradient(135deg, ${d.color}15, ${d.color}08)` : `${d.color}10`),
                    borderRadius: '14px',
                    border: isGold
                      ? `1px solid ${colors.gold}30`
                      : (d.clickable ? `1.5px solid ${d.color}35` : `1px solid ${d.color}20`),
                    cursor: d.clickable ? 'pointer' : 'default',
                    position: 'relative',
                    boxShadow: isGold
                      ? `0 2px 12px rgba(197,168,53,0.1)`
                      : (d.clickable ? `0 4px 16px ${d.color}18` : 'none'),
                  }}
                >
                  <span style={{ fontSize: '22px', flexShrink: 0 }}>{d.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontFamily: fonts.sans,
                      fontSize: `${sizes.labelText}px`,
                      color: d.color, margin: '0 0 2px 0',
                      letterSpacing: '2px', textTransform: 'uppercase',
                    }}>
                      {d.label}
                    </p>
                    <p style={{ fontFamily: fonts.serif, fontSize: `${sizes.detailText}px`, color: isGold ? '#3A2A10' : '#3A2A3A', margin: 0 }}>
                      {d.value}
                    </p>
                  </div>
                  {d.clickable && (
                    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                      <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill={d.color} opacity={0.8}>
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                      </motion.div>
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '8px', color: d.color, letterSpacing: '0.5px', opacity: 0.8 }}>MAP</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <Divider color={colors.gold} />

            {/* Dress code */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              style={{ textAlign: 'center', marginTop: '16px' }}
            >
              <p style={{ fontFamily: fonts.sans, fontSize: `${sizes.labelText}px`, letterSpacing: '3px', color: colors.gold, textTransform: 'uppercase', marginBottom: '6px' }}>
                Dress Code
              </p>
              <p style={{ fontFamily: fonts.serif, fontSize: `${sizes.detailText}px`, color: isGold ? colors.bodyText : '#6A4A5A', fontStyle: 'italic', margin: '0 0 16px 0' }}>
                {couple.dressCode}
              </p>
              <p style={{ fontFamily: fonts.sans, fontSize: `${sizes.bodyText - 2}px`, color: colors.labelText, lineHeight: 1.7, margin: 0 }}>
                ✨ Your presence is our greatest gift.<br />
                With love, {couple.name1} &amp; {couple.name2}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {showMap && (
        <MapModal venue={couple.venue} location={couple.location} onClose={() => setShowMap(false)} />
      )}
    </>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const { theme } = useTheme();
  const { fonts, sizes, colors, couple } = theme;

  return (
    <motion.footer
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
      viewport={{ once: true }} transition={{ duration: 1 }}
      style={{ textAlign: 'center', padding: '48px 24px 80px', background: 'linear-gradient(to bottom, transparent, rgba(244,184,200,0.08))' }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '20px' }}>
        {['#F4B8C8', '#FCCBA8', '#C5A8D4', '#A8DCC8', '#FCCBA8', '#F4B8C8'].map((c, i) => (
          <motion.div key={i} animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}>
            <svg width="20" height="20" viewBox="0 0 20 20">
              {[0, 72, 144, 216, 288].map(a => (
                <ellipse key={a} cx={10 + Math.cos((a * Math.PI) / 180) * 6} cy={10 + Math.sin((a * Math.PI) / 180) * 6} rx="3" ry="5" fill={c} opacity={0.85}
                  transform={`rotate(${a + 90}, ${10 + Math.cos((a * Math.PI) / 180) * 6}, ${10 + Math.sin((a * Math.PI) / 180) * 6})`} />
              ))}
              <circle cx="10" cy="10" r="3" fill="#F8E4A0" />
            </svg>
          </motion.div>
        ))}
      </div>

      <h3 style={{
        fontFamily: fonts.script,
        fontSize: `clamp(36px, 11vw, ${sizes.sectionHeading + 10}px)`,
        color: colors.primaryRose, margin: '0 0 8px 0', lineHeight: 1.1, fontWeight: 400,
      }}>
        {couple.name1} &amp; {couple.name2}
      </h3>
      <p style={{ fontFamily: fonts.serif, fontSize: `${sizes.detailText - 1}px`, color: colors.gold, fontStyle: 'italic', margin: '0 0 16px 0', letterSpacing: '1px' }}>
        {couple.date} · {couple.location}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{ height: '1px', width: '50px', background: `linear-gradient(to right, transparent, ${colors.gold}80)` }} />
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path d="M10 18 C10 18 2 12.5 2 7 C2 4.2 4.2 2 7 2 C8.5 2 9.8 2.7 10.7 3.8 C11.5 2.7 12.8 2 14.3 2 C17.1 2 19 4.2 19 7 C19 12.5 10 18 10 18 Z" fill="#F4B8C8" />
        </svg>
        <div style={{ height: '1px', width: '50px', background: `linear-gradient(to left, transparent, ${colors.gold}80)` }} />
      </div>

      <p style={{ fontFamily: fonts.sans, fontSize: `${sizes.bodyText - 3}px`, color: '#B09A9A', lineHeight: 1.7, maxWidth: '280px', margin: '0 auto' }}>
        {couple.quoteText}<br />
        <span style={{ color: colors.gold, fontSize: `${sizes.labelText - 1}px` }}>{couple.quoteSource}</span>
      </p>

      <p style={{ fontFamily: fonts.sans, fontSize: '10px', color: '#C8B0C0', marginTop: '32px', letterSpacing: '1px' }}>
        Made with 🌸 &amp; love
      </p>
    </motion.footer>
  );
}

// ─── Invitation Content ────────────────────────────────────────────────────────
export function InvitationContent() {
  const { theme } = useTheme();
  const { fonts, sizes, colors } = theme;

  return (
    <div style={{ position: 'relative', zIndex: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', padding: '48px 24px 32px', background: 'linear-gradient(to bottom, rgba(244,184,200,0.12), transparent)' }}
      >
        <p style={{ fontFamily: fonts.serif, fontSize: `${sizes.labelText}px`, letterSpacing: '4px', color: colors.gold, textTransform: 'uppercase', marginBottom: '6px' }}>
          You're Invited
        </p>
        <h1 style={{
          fontFamily: fonts.script,
          fontSize: `clamp(42px, 13vw, ${sizes.cardNames}px)`,
          background: `linear-gradient(135deg, ${colors.primaryRose}, ${colors.accentPink}, ${colors.primaryRose})`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          margin: 0, lineHeight: 1.0, fontWeight: 400,
        }}>
          The Wedding
        </h1>
      </motion.div>

      <InvitationCard />
      <div style={{ height: '1px', background: `linear-gradient(to right, transparent, ${colors.gold}40, transparent)`, margin: '0 auto', maxWidth: '300px' }} />
      <CountdownTimer />
      <div style={{ height: '1px', background: `linear-gradient(to right, transparent, ${colors.gold}40, transparent)`, margin: '0 auto', maxWidth: '300px' }} />
      <StorySection />
      <div style={{ height: '1px', background: `linear-gradient(to right, transparent, ${colors.gold}40, transparent)`, margin: '0 auto', maxWidth: '300px' }} />
      <GallerySection />
      <div style={{ height: '1px', background: `linear-gradient(to right, transparent, ${colors.gold}40, transparent)`, margin: '0 auto', maxWidth: '300px' }} />
      <RSVPSection />
      <Footer />
    </div>
  );
}