import { motion } from 'motion/react';

// ─── Gold leaf / branch SVG primitives ────────────────────────────────────────
function GoldLeaf({ angle = 0, length = 28, opacity = 0.75 }: { angle?: number; length?: number; opacity?: number }) {
  return (
    <ellipse
      cx={0} cy={0}
      rx={length * 0.22} ry={length * 0.48}
      fill="url(#goldLeafGrad)"
      opacity={opacity}
      transform={`rotate(${angle})`}
    />
  );
}

function GoldBranch({ x = 0, y = 0, scale = 1, flip = false, rotate = 0, opacity = 1 }: {
  x?: number; y?: number; scale?: number; flip?: boolean; rotate?: number; opacity?: number;
}) {
  const sx = flip ? -scale : scale;
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotate}) scale(${sx}, ${scale})`} opacity={opacity}>
      <defs>
        <linearGradient id="goldLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C84A" />
          <stop offset="40%" stopColor="#C9A835" />
          <stop offset="70%" stopColor="#F5E17A" />
          <stop offset="100%" stopColor="#B8960C" />
        </linearGradient>
        <linearGradient id="goldStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C9A835" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
        <radialGradient id="goldBerryGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#F5E17A" />
          <stop offset="100%" stopColor="#B8960C" />
        </radialGradient>
      </defs>

      {/* Main stem */}
      <path d="M 0 0 Q 12 -30 8 -70" fill="none" stroke="url(#goldStemGrad)" strokeWidth="1.6" strokeLinecap="round" opacity={0.8} />

      {/* Branch left lower */}
      <path d="M 3 -18 Q -14 -28 -20 -44" fill="none" stroke="url(#goldStemGrad)" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      {/* Leaf on left lower */}
      <g transform="translate(-14, -34) rotate(-55)"><GoldLeaf length={24} opacity={0.8} /></g>
      <g transform="translate(-20, -44) rotate(-65)"><GoldLeaf length={18} opacity={0.7} /></g>

      {/* Branch right lower */}
      <path d="M 5 -28 Q 22 -36 26 -52" fill="none" stroke="url(#goldStemGrad)" strokeWidth="1.2" strokeLinecap="round" opacity={0.7} />
      {/* Leaf on right lower */}
      <g transform="translate(18, -44) rotate(40)"><GoldLeaf length={22} opacity={0.8} /></g>
      <g transform="translate(26, -52) rotate(50)"><GoldLeaf length={16} opacity={0.65} /></g>

      {/* Branch left upper */}
      <path d="M 6 -48 Q -8 -58 -12 -70" fill="none" stroke="url(#goldStemGrad)" strokeWidth="1.1" strokeLinecap="round" opacity={0.65} />
      <g transform="translate(-10, -62) rotate(-50)"><GoldLeaf length={20} opacity={0.7} /></g>

      {/* Branch right upper */}
      <path d="M 8 -56 Q 20 -64 22 -76" fill="none" stroke="url(#goldStemGrad)" strokeWidth="1.1" strokeLinecap="round" opacity={0.65} />
      <g transform="translate(20, -68) rotate(45)"><GoldLeaf length={18} opacity={0.7} /></g>

      {/* Tip leaves */}
      <g transform="translate(8, -70) rotate(10)"><GoldLeaf length={20} opacity={0.75} /></g>
      <g transform="translate(4, -74) rotate(-15)"><GoldLeaf length={16} opacity={0.65} /></g>

      {/* Gold berries */}
      <circle cx={-8} cy={-46} r={3.5} fill="url(#goldBerryGrad)" opacity={0.9} />
      <circle cx={-12} cy={-50} r={2.5} fill="url(#goldBerryGrad)" opacity={0.75} />
      <circle cx={24} cy={-54} r={3} fill="url(#goldBerryGrad)" opacity={0.85} />
      <circle cx={20} cy={-46} r={2} fill="url(#goldBerryGrad)" opacity={0.7} />
      <circle cx={22} cy={-78} r={2.5} fill="url(#goldBerryGrad)" opacity={0.8} />

      {/* Tiny floating dots */}
      <circle cx={-4} cy={-20} r={1.5} fill="#E8C84A" opacity={0.6} />
      <circle cx={14} cy={-36} r={1.5} fill="#F5E17A" opacity={0.55} />
      <circle cx={10} cy={-60} r={1.5} fill="#E8C84A" opacity={0.5} />
    </g>
  );
}

function SmallSprig({ x = 0, y = 0, rotate = 0, flip = false, opacity = 0.8 }: {
  x?: number; y?: number; rotate?: number; flip?: boolean; opacity?: number;
}) {
  const sx = flip ? -1 : 1;
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotate}) scale(${sx}, 1)`} opacity={opacity}>
      <defs>
        <linearGradient id="goldLeafGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C84A" />
          <stop offset="50%" stopColor="#C9A835" />
          <stop offset="100%" stopColor="#F5E17A" />
        </linearGradient>
      </defs>
      <path d="M 0 0 Q 4 -16 2 -32" fill="none" stroke="#C9A835" strokeWidth="1.2" strokeLinecap="round" opacity={0.75} />
      <path d="M 1 -10 Q -8 -15 -10 -22" fill="none" stroke="#C9A835" strokeWidth="0.9" strokeLinecap="round" opacity={0.65} />
      <g transform="translate(-7, -18) rotate(-50)">
        <ellipse cx={0} cy={0} rx={5} ry={11} fill="url(#goldLeafGrad2)" opacity={0.8} />
      </g>
      <path d="M 2 -18 Q 10 -22 12 -28" fill="none" stroke="#C9A835" strokeWidth="0.9" strokeLinecap="round" opacity={0.65} />
      <g transform="translate(10, -25) rotate(40)">
        <ellipse cx={0} cy={0} rx={4} ry={10} fill="url(#goldLeafGrad2)" opacity={0.75} />
      </g>
      <g transform="translate(2, -32) rotate(5)">
        <ellipse cx={0} cy={0} rx={4} ry={9} fill="url(#goldLeafGrad2)" opacity={0.7} />
      </g>
      <circle cx={-8} cy={-22} r={2.2} fill="#D4AF37" opacity={0.85} />
      <circle cx={10} cy={-28} r={1.8} fill="#E8C84A" opacity={0.75} />
    </g>
  );
}

// ─── Corner configurations ─────────────────────────────────────────────────────
interface CornerDecor {
  id: string;
  style: React.CSSProperties;
  svgW: number;
  svgH: number;
  swayClass: string;
  delay: number;
  content: React.ReactNode;
}

function buildDecors(): CornerDecor[] {
  return [
    // TOP LEFT - large branch pointing right/down
    {
      id: 'tl',
      style: { position: 'absolute', top: 0, left: 0 },
      svgW: 160, svgH: 160,
      swayClass: 'sway-flower',
      delay: 0,
      content: (
        <>
          <GoldBranch x={20} y={20} scale={1.3} rotate={130} flip />
          <SmallSprig x={70} y={30} rotate={100} opacity={0.7} />
          <SmallSprig x={30} y={80} rotate={160} opacity={0.6} flip />
        </>
      ),
    },
    // TOP RIGHT - large branch pointing left/down
    {
      id: 'tr',
      style: { position: 'absolute', top: 0, right: 0 },
      svgW: 160, svgH: 160,
      swayClass: 'sway-flower-reverse',
      delay: 0.2,
      content: (
        <>
          <GoldBranch x={140} y={20} scale={1.3} rotate={50} />
          <SmallSprig x={90} y={25} rotate={80} opacity={0.7} flip />
          <SmallSprig x={130} y={75} rotate={20} opacity={0.6} />
        </>
      ),
    },
    // BOTTOM LEFT - medium branch pointing up/right
    {
      id: 'bl',
      style: { position: 'absolute', bottom: 0, left: 0 },
      svgW: 140, svgH: 140,
      swayClass: 'sway-flower-reverse',
      delay: 0.35,
      content: (
        <>
          <GoldBranch x={20} y={135} scale={1.15} rotate={-40} flip />
          <SmallSprig x={60} y={115} rotate={-70} opacity={0.65} />
        </>
      ),
    },
    // BOTTOM RIGHT - medium branch pointing up/left
    {
      id: 'br',
      style: { position: 'absolute', bottom: 0, right: 0 },
      svgW: 140, svgH: 140,
      swayClass: 'sway-flower',
      delay: 0.15,
      content: (
        <>
          <GoldBranch x={120} y={135} scale={1.15} rotate={220} />
          <SmallSprig x={80} y={110} rotate={250} opacity={0.65} flip />
        </>
      ),
    },
    // MID LEFT - thin sprig
    {
      id: 'ml',
      style: { position: 'absolute', top: '42%', left: 0 },
      svgW: 70, svgH: 90,
      swayClass: 'sway-flower',
      delay: 0.5,
      content: (
        <SmallSprig x={20} y={80} rotate={-30} flip opacity={0.55} />
      ),
    },
    // MID RIGHT - thin sprig
    {
      id: 'mr',
      style: { position: 'absolute', top: '40%', right: 0 },
      svgW: 70, svgH: 90,
      swayClass: 'sway-flower-reverse',
      delay: 0.4,
      content: (
        <SmallSprig x={50} y={80} rotate={210} opacity={0.55} />
      ),
    },
  ];
}

// ─── Main export ───────────────────────────────────────────────────────────────
export function GoldFoilDecor() {
  const decors = buildDecors();

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2 }}>
      {decors.map(d => (
        <div key={d.id} className={d.swayClass} style={{ ...d.style, animationDelay: `${d.delay}s`, animationDuration: '4.5s', transformOrigin: 'bottom center' }}>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: d.delay + 0.4, duration: 1.4, type: 'spring', stiffness: 60, damping: 14 }}
          >
            <svg width={d.svgW} height={d.svgH} viewBox={`0 0 ${d.svgW} ${d.svgH}`} overflow="visible">
              {d.content}
            </svg>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

// ─── Gold Botanical Divider ────────────────────────────────────────────────────
export function GoldFoilDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '16px 0' }}>
      <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, transparent, #C9A83580)' }} />
      <svg width="80" height="28" viewBox="0 0 80 28" fill="none" overflow="visible">
        <defs>
          <linearGradient id="divGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8C84A" />
            <stop offset="50%" stopColor="#C9A835" />
            <stop offset="100%" stopColor="#F5E17A" />
          </linearGradient>
        </defs>
        {/* Left sprig */}
        <ellipse cx="10" cy="14" rx="7" ry="4" fill="url(#divGold)" opacity={0.55} transform="rotate(-35 10 14)" />
        <ellipse cx="18" cy="11" rx="5" ry="3" fill="url(#divGold)" opacity={0.45} transform="rotate(-20 18 11)" />
        <line x1="22" y1="14" x2="30" y2="14" stroke="#C9A835" strokeWidth="1" opacity={0.5} />
        {/* Centre diamond */}
        <path d="M40 8 L44 14 L40 20 L36 14 Z" fill="url(#divGold)" opacity={0.8} />
        <circle cx="40" cy="14" r="2.5" fill="#F5E17A" opacity={0.9} />
        {/* Right sprig */}
        <line x1="50" y1="14" x2="58" y2="14" stroke="#C9A835" strokeWidth="1" opacity={0.5} />
        <ellipse cx="62" cy="11" rx="5" ry="3" fill="url(#divGold)" opacity={0.45} transform="rotate(20 62 11)" />
        <ellipse cx="70" cy="14" rx="7" ry="4" fill="url(#divGold)" opacity={0.55} transform="rotate(35 70 14)" />
      </svg>
      <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to left, transparent, #C9A83580)' }} />
    </div>
  );
}
