import { useState } from 'react';
import type { CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BotanicalDivider } from './WildflowerDecor';
import { useTheme } from '../context/ThemeContext';

export function RSVPSection() {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  // WhatsApp number inline editor
  const [editingWA, setEditingWA] = useState(false);
  const [waInput, setWaInput] = useState('');

  const { theme, update } = useTheme();
  const { fonts, sizes, colors, couple } = theme;

  const whatsappNumber = couple.whatsappNumber || '97466861474';

  const handleSaveWA = () => {
    const clean = waInput.replace(/\D/g, '');
    if (clean.length >= 7) {
      update('couple', { whatsappNumber: clean });
    }
    setEditingWA(false);
  };

  const handleAccept = () => {
    if (!name.trim()) return;
    const message = encodeURIComponent(
      `🌸 Wedding RSVP — ${couple.name1} & ${couple.name2}\n\n👤 Name: ${name}\n✅ Joyfully Accepting — ${guests} guest${guests > 1 ? 's' : ''}\n\n📅 ${couple.date} | ${couple.venue}, ${couple.location}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    setSubmitted(true);
  };

  const inputStyle = (field: string): CSSProperties => ({
    width: '100%', padding: '14px 16px', borderRadius: '14px',
    border: `1.5px solid ${focused === field ? 'rgba(197,168,212,0.7)' : 'rgba(200,180,200,0.35)'}`,
    background: focused === field ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.65)',
    backdropFilter: 'blur(12px)',
    fontFamily: fonts.sans,
    fontSize: `${sizes.bodyText}px`,
    color: '#5A3A5A', outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: focused === field ? '0 4px 20px rgba(197,168,212,0.25)' : 'none',
    boxSizing: 'border-box',
  });

  if (submitted) {
    return (
      <section style={{ padding: '48px 24px', textAlign: 'center' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          style={{
            background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(244,184,200,0.4)',
            borderRadius: '24px', padding: '48px 32px',
            maxWidth: '360px', margin: '0 auto',
            boxShadow: '0 20px 60px rgba(244,184,200,0.25)',
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: '56px', marginBottom: '16px' }}
          >
            🌸
          </motion.div>
          <h3 style={{ fontFamily: fonts.script, fontSize: '40px', color: colors.primaryRose, margin: '0 0 12px 0', fontWeight: 400 }}>
            Thank You!
          </h3>
          <p style={{ fontFamily: fonts.sans, fontSize: `${sizes.bodyText}px`, color: colors.bodyText, lineHeight: 1.7, margin: '0 0 24px 0' }}>
            Your RSVP has been sent via WhatsApp. We can't wait to celebrate this beautiful day with you!
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={() => { setSubmitted(false); setName(''); setGuests(1); }}
            style={{
              background: 'linear-gradient(135deg, #F4B8C8, #C5A8D4)', border: 'none',
              borderRadius: '100px', padding: '12px 28px', fontFamily: fonts.sans,
              fontSize: `${sizes.bodyText - 1}px`, color: 'white', cursor: 'pointer',
            }}
          >
            Submit Another
          </motion.button>
        </motion.div>
      </section>
    );
  }

  return (
    <section style={{ padding: '48px 24px' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '32px' }}
      >
        <p style={{ fontFamily: fonts.serif, fontSize: `${sizes.labelText}px`, letterSpacing: '4px', color: colors.gold, textTransform: 'uppercase', marginBottom: '8px' }}>
          Will You Join Us?
        </p>
        <h2 style={{ fontFamily: fonts.script, fontSize: `clamp(32px, 10vw, ${sizes.sectionHeading}px)`, color: colors.primaryRose, margin: '0', lineHeight: 1.1, fontWeight: 400 }}>
          RSVP
        </h2>
        <BotanicalDivider color={colors.gold} />

        {/* WhatsApp Number Editor */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(37,211,102,0.08)',
            border: '1px solid rgba(37,211,102,0.25)',
            borderRadius: '100px', padding: '6px 14px',
            marginTop: '10px',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 22 22" fill="#25D366">
            <path d="M11 0C4.9 0 0 4.9 0 11c0 1.9.5 3.8 1.4 5.4L0 22l5.7-1.5C7.3 21.5 9.1 22 11 22c6.1 0 11-4.9 11-11S17.1 0 11 0zm5.4 15.3c-.2.6-1.2 1.1-1.7 1.2-.4.1-.9.1-1.4-.1-.3-.1-.7-.2-1.2-.5-2.1-.9-3.5-3-3.6-3.1-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .5.4.2.4.7 1.7.7 1.8.1.1.1.3 0 .4-.1.2-.1.3-.3.4-.1.2-.3.3-.4.5-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1.2-.2.6-.8.8-1 .2-.3.4-.2.7-.1.3.1 1.7.8 2 .9.3.1.5.2.5.3.1.3.1 1-.1 1.7z" />
          </svg>

          <AnimatePresence mode="wait">
            {editingWA ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}
              >
                <span style={{ fontFamily: fonts.sans, fontSize: '11px', color: '#25D366', whiteSpace: 'nowrap' }}>+</span>
                <input
                  autoFocus
                  type="tel"
                  value={waInput}
                  onChange={e => setWaInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSaveWA(); if (e.key === 'Escape') setEditingWA(false); }}
                  placeholder={whatsappNumber}
                  style={{
                    border: 'none', outline: 'none', background: 'transparent',
                    fontFamily: 'monospace', fontSize: '12px', color: '#2A7A4A',
                    width: '130px', padding: '2px 0',
                  }}
                />
                <button
                  onClick={handleSaveWA}
                  style={{ border: 'none', background: 'rgba(37,211,102,0.2)', borderRadius: '100px', padding: '3px 10px', cursor: 'pointer', fontFamily: fonts.sans, fontSize: '10px', color: '#1A7A3A' }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingWA(false)}
                  style={{ border: 'none', background: 'rgba(200,100,100,0.15)', borderRadius: '100px', padding: '3px 8px', cursor: 'pointer', fontFamily: fonts.sans, fontSize: '10px', color: '#AA4444' }}
                >
                  ✕
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="display"
                onClick={() => { setWaInput(whatsappNumber); setEditingWA(true); }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  border: 'none', background: 'transparent', cursor: 'pointer',
                  padding: 0,
                }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#2A7A4A' }}>
                  +{whatsappNumber}
                </span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4AB890" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{
          background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)',
          border: '1.5px solid rgba(244,184,200,0.35)',
          borderRadius: '28px', padding: '32px 24px',
          maxWidth: '400px', margin: '0 auto',
          boxShadow: '0 20px 60px rgba(244,184,200,0.2), 0 4px 20px rgba(0,0,0,0.06)',
        }}
      >
        {/* Name */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontFamily: fonts.serif, fontSize: `${sizes.labelText + 2}px`, color: '#8B4A6B', marginBottom: '8px', letterSpacing: '0.5px' }}>
            Your Name
          </label>
          <input
            type="text" value={name} onChange={e => setName(e.target.value)}
            onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
            placeholder="Enter your full name" style={inputStyle('name')}
          />
        </div>

        {/* Guests 1–10 */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{ display: 'block', fontFamily: fonts.serif, fontSize: `${sizes.labelText + 2}px`, color: '#8B4A6B', marginBottom: '12px', letterSpacing: '0.5px' }}>
            Number of Guests
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <motion.button
                key={n}
                onClick={() => setGuests(n)}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.92 }}
                animate={{
                  background: guests === n
                    ? `linear-gradient(135deg, ${colors.accentPink}, #C5A8D4)`
                    : 'rgba(255,255,255,0.7)',
                  borderColor: guests === n ? colors.accentPink : 'rgba(200,180,200,0.4)',
                  color: guests === n ? 'white' : '#8B4A6B',
                  boxShadow: guests === n ? `0 6px 20px ${colors.accentPink}55` : '0 2px 8px rgba(0,0,0,0.05)',
                }}
                transition={{ duration: 0.2 }}
                style={{
                  height: '46px', borderRadius: '12px',
                  border: '1.5px solid rgba(200,180,200,0.4)',
                  cursor: 'pointer',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '1px',
                  fontFamily: fonts.serif,
                }}
              >
                <span style={{ fontSize: '16px', lineHeight: 1 }}>{n}</span>
                <span style={{ fontSize: '8px', lineHeight: 1, opacity: guests === n ? 0.9 : 0.55, fontFamily: fonts.sans }}>
                  {n === 1 ? 'guest' : 'guests'}
                </span>
              </motion.button>
            ))}
          </div>
          <AnimatePresence>
            <motion.p
              key={guests}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontFamily: fonts.sans, fontSize: '12px', color: colors.gold, textAlign: 'center', margin: '10px 0 0', fontStyle: 'italic' }}
            >
              {guests === 1 ? '🌸 1 guest selected' : `🌸 ${guests} guests selected`}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Joyfully Accept → WhatsApp */}
        <motion.button
          onClick={handleAccept}
          whileHover={name.trim() ? { scale: 1.04, y: -3, boxShadow: '0 16px 48px rgba(244,120,160,0.45)' } : {}}
          whileTap={name.trim() ? { scale: 0.96 } : {}}
          animate={{ opacity: name.trim() ? 1 : 0.55 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '100%', padding: '18px 24px',
            borderRadius: '20px', border: 'none',
            background: name.trim()
              ? 'linear-gradient(135deg, #E8607A, #C5447A, #8B2252)'
              : 'linear-gradient(135deg, #D4B0C0, #C0B0C8)',
            cursor: name.trim() ? 'pointer' : 'not-allowed',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '4px',
            boxShadow: name.trim() ? '0 10px 36px rgba(197,68,122,0.38), 0 4px 16px rgba(0,0,0,0.1)' : 'none',
            position: 'relative', overflow: 'hidden',
            transition: 'background 0.3s, box-shadow 0.3s',
          }}
        >
          {name.trim() && (
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
              style={{ position: 'absolute', top: 0, bottom: 0, width: '40%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)', pointerEvents: 'none' }}
            />
          )}
          {name.trim() && ['🌸', '🌺', '✨'].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -6, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
              style={{ position: 'absolute', left: `${20 + i * 30}%`, top: '8px', fontSize: '10px', pointerEvents: 'none' }}
            >
              {e}
            </motion.span>
          ))}
          <span style={{ fontFamily: fonts.script, fontSize: '26px', color: 'white', lineHeight: 1, fontWeight: 400, textShadow: '0 2px 8px rgba(0,0,0,0.15)', position: 'relative', zIndex: 1 }}>
            Joyfully Accept
          </span>
          <span style={{ fontFamily: fonts.sans, fontSize: '11px', color: 'rgba(255,255,255,0.85)', letterSpacing: '1.5px', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
            {name.trim() ? `${guests} guest${guests > 1 ? 's' : ''} · Send via WhatsApp` : 'Enter your name above'}
          </span>
          {name.trim() && (
            <motion.div
              style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 1, opacity: 0.85 }}
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              <svg width="26" height="26" viewBox="0 0 22 22" fill="white">
                <path d="M11 0C4.9 0 0 4.9 0 11c0 1.9.5 3.8 1.4 5.4L0 22l5.7-1.5C7.3 21.5 9.1 22 11 22c6.1 0 11-4.9 11-11S17.1 0 11 0zm5.4 15.3c-.2.6-1.2 1.1-1.7 1.2-.4.1-.9.1-1.4-.1-.3-.1-.7-.2-1.2-.5-2.1-.9-3.5-3-3.6-3.1-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .5.4.2.4.7 1.7.7 1.8.1.1.1.3 0 .4-.1.2-.1.3-.3.4-.1.2-.3.3-.4.5-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1.2-.2.6-.8.8-1 .2-.3.4-.2.7-.1.3.1 1.7.8 2 .9.3.1.5.2.5.3.1.3.1 1-.1 1.7z" />
              </svg>
            </motion.div>
          )}
        </motion.button>

        {!name.trim() && (
          <p style={{ fontFamily: fonts.sans, fontSize: '11px', color: '#B09A9A', textAlign: 'center', margin: '10px 0 0', fontStyle: 'italic' }}>
            Please enter your name to RSVP
          </p>
        )}
      </motion.div>
    </section>
  );
}
