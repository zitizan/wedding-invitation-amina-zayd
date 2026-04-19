import { motion } from 'motion/react';
import { BotanicalDivider } from './WildflowerDecor';
import { useTheme } from '../context/ThemeContext';

const storyEvents = [
  {
    emoji: '☕', year: '2022', title: 'First Meeting', subtitle: 'A chance encounter',
    description: "Two souls met at a mutual friend's gathering, bonded over laughter and shared dreams. That first glance changed everything.",
    color: '#F4B8C8', accent: '#C5447A',
  },
  {
    emoji: '🌸', year: '2023', title: 'First Date', subtitle: 'The beginning of forever',
    description: 'Coffee turned into sunset walks, conversations that felt like coming home. Love bloomed quietly between every word.',
    color: '#C5A8D4', accent: '#7A5AB8',
  },
  {
    emoji: '💍', year: '2024', title: 'The Proposal', subtitle: 'Under a sky full of stars',
    description: 'With wildflowers in hand and stars as witnesses, he asked the most beautiful question — and she said yes.',
    color: '#A8CEE8', accent: '#4A8AB8',
  },
  {
    emoji: '💒', year: '2026', title: 'The Wedding', subtitle: 'Forever starts here',
    description: 'On the 15th of December, surrounded by those they love, they will begin their greatest adventure together.',
    color: '#A8DCC8', accent: '#4A9A7A',
  },
];

export function StorySection() {
  const { theme } = useTheme();
  const { fonts, sizes, colors } = theme;

  return (
    <section style={{ padding: '48px 24px', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '20%', left: '-30px', width: '200px', height: '200px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,184,200,0.12) 0%, transparent 70%)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '-30px', width: '180px', height: '180px',
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(197,168,212,0.12) 0%, transparent 70%)', pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <p style={{
          fontFamily: fonts.serif,
          fontSize: `${sizes.labelText}px`,
          letterSpacing: '4px', color: colors.gold,
          textTransform: 'uppercase', marginBottom: '8px',
        }}>
          Our Journey
        </p>
        <h2 style={{
          fontFamily: fonts.script,
          fontSize: `clamp(32px, 10vw, ${sizes.sectionHeading}px)`,
          color: colors.primaryRose, margin: '0', lineHeight: 1.1, fontWeight: 400,
        }}>
          Love Story
        </h2>
        <BotanicalDivider color={colors.gold} />
      </motion.div>

      <div style={{ position: 'relative', maxWidth: '400px', margin: '0 auto' }}>
        <motion.div
          initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{
            position: 'absolute', left: '28px', top: 0, bottom: 0, width: '1.5px',
            background: 'linear-gradient(to bottom, #F4B8C8, #C5A8D4, #A8CEE8, #A8DCC8)',
            transformOrigin: 'top', zIndex: 0,
          }}
        />

        {storyEvents.map((event, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.15, duration: 0.7, type: 'spring', stiffness: 100 }}
            style={{ display: 'flex', gap: '20px', marginBottom: '32px', position: 'relative', zIndex: 1 }}
          >
            <div style={{ flexShrink: 0, position: 'relative' }}>
              <motion.div
                whileInView={{ scale: [0, 1.3, 1] }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.3, duration: 0.5 }}
                style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: `linear-gradient(135deg, ${event.color}, ${event.color}AA)`,
                  border: `2px solid ${event.accent}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', boxShadow: `0 4px 20px ${event.color}60`,
                }}
              >
                {event.emoji}
              </motion.div>
            </div>

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.72)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${event.color}50`,
                borderRadius: '16px', padding: '16px 18px',
                boxShadow: `0 4px 20px ${event.color}20`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <div>
                  <p style={{ fontFamily: fonts.serif, fontSize: `${sizes.detailText}px`, color: event.accent, margin: 0, lineHeight: 1.3 }}>
                    {event.title}
                  </p>
                  <p style={{ fontFamily: fonts.sans, fontSize: `${sizes.labelText}px`, color: '#9A7A8A', margin: '2px 0 0 0', fontStyle: 'italic' }}>
                    {event.subtitle}
                  </p>
                </div>
                <span style={{
                  fontFamily: fonts.sans, fontSize: `${sizes.labelText}px`,
                  color: event.accent, background: `${event.color}30`,
                  padding: '3px 10px', borderRadius: '100px',
                  border: `1px solid ${event.color}60`, flexShrink: 0,
                }}>
                  {event.year}
                </span>
              </div>
              <p style={{
                fontFamily: fonts.sans, fontSize: `${sizes.bodyText - 2}px`,
                color: colors.bodyText, margin: 0, lineHeight: 1.65,
              }}>
                {event.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
