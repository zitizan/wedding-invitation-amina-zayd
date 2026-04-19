import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { BotanicalDivider } from './WildflowerDecor';
import { useTheme } from '../context/ThemeContext';

const WEDDING_DATE = new Date('2026-12-15T19:00:00+03:00');

function getTimeLeft() {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({ value, label, color, fonts }: { value: number; label: string; color: string; fonts: { serif: string; sans: string } }) {
  return (
    <div style={{ textAlign: 'center', flex: '1 1 0' }}>
      <motion.div
        key={value}
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
        style={{
          background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)',
          border: `1.5px solid ${color}40`,
          borderRadius: '16px', padding: '14px 6px', marginBottom: '8px',
          boxShadow: `0 4px 20px ${color}20, 0 2px 8px rgba(0,0,0,0.06)`,
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)',
          borderRadius: '14px 14px 0 0',
        }} />
        <span style={{
          fontFamily: fonts.serif,
          fontSize: 'clamp(28px, 8vw, 38px)',
          color, display: 'block', lineHeight: 1, position: 'relative',
        }}>
          {String(value).padStart(2, '0')}
        </span>
      </motion.div>
      <span style={{
        fontFamily: fonts.sans, fontSize: '10px', color: '#8B6A7A',
        letterSpacing: '2px', textTransform: 'uppercase',
      }}>
        {label}
      </span>
    </div>
  );
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const { theme } = useTheme();
  const { fonts, sizes, colors, countdown, couple } = theme;

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: timeLeft.days, label: 'Days', color: countdown.daysColor },
    { value: timeLeft.hours, label: 'Hours', color: countdown.hoursColor },
    { value: timeLeft.minutes, label: 'Minutes', color: countdown.minutesColor },
    { value: timeLeft.seconds, label: 'Seconds', color: countdown.secondsColor },
  ];

  return (
    <section style={{ padding: '48px 24px', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
      >
        <p style={{
          fontFamily: fonts.serif,
          fontSize: `${sizes.labelText}px`,
          letterSpacing: '4px', color: colors.gold,
          textTransform: 'uppercase', marginBottom: '8px',
        }}>
          Counting Down To
        </p>
        <h2 style={{
          fontFamily: fonts.script,
          fontSize: `clamp(32px, 10vw, ${sizes.sectionHeading}px)`,
          color: colors.primaryRose,
          margin: '0 0 4px 0', lineHeight: 1.1, fontWeight: 400,
        }}>
          Our Special Day
        </h2>
        <BotanicalDivider color={colors.gold} />

        <div style={{ display: 'flex', gap: '10px', maxWidth: '360px', margin: '24px auto 0' }}>
          {units.map(u => (
            <TimeUnit key={u.label} value={u.value} label={u.label} color={u.color} fonts={fonts} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            marginTop: '28px',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(244,184,200,0.15)',
            border: '1px solid rgba(244,184,200,0.4)',
            borderRadius: '100px', padding: '10px 20px',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16">
            <rect x="1" y="3" width="14" height="12" rx="2" fill="none" stroke={colors.accentPink} strokeWidth="1.3" />
            <path d="M4 1 L4 5 M12 1 L12 5" stroke={colors.accentPink} strokeWidth="1.3" strokeLinecap="round" />
            <path d="M1 7 L15 7" stroke={colors.accentPink} strokeWidth="1" opacity={0.5} />
          </svg>
          <span style={{
            fontFamily: fonts.serif,
            fontSize: `${sizes.detailText - 1}px`,
            color: '#8B4A6B', fontStyle: 'italic',
          }}>
            {couple.date}
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
