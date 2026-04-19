import { motion } from 'motion/react';

interface FlowerProps {
  cx?: number; cy?: number; r?: number;
  petals?: number; color: string; centerColor?: string; size: number;
}

function DaisyFlower({ petals = 10, color, centerColor = '#F8E4A0', size }: FlowerProps) {
  return (
    <g>
      {Array.from({ length: petals }, (_, i) => {
        const angle = (i * 360) / petals;
        const rad = (angle * Math.PI) / 180;
        const cx = Math.cos(rad) * size * 0.58;
        const cy = Math.sin(rad) * size * 0.58;
        return (
          <ellipse
            key={i}
            cx={cx} cy={cy}
            rx={size * 0.17} ry={size * 0.42}
            fill={color} opacity={0.88}
            transform={`rotate(${angle}, ${cx}, ${cy})`}
          />
        );
      })}
      <circle cx={0} cy={0} r={size * 0.27} fill={centerColor} />
      <circle cx={0} cy={0} r={size * 0.14} fill={centerColor === '#F8E4A0' ? '#E8C840' : centerColor} />
    </g>
  );
}

function WildRose({ color, centerColor = '#FCCBA8', size }: FlowerProps) {
  return (
    <g>
      {Array.from({ length: 5 }, (_, i) => {
        const angle = (i * 72) - 90;
        const rad = (angle * Math.PI) / 180;
        const cx = Math.cos(rad) * size * 0.45;
        const cy = Math.sin(rad) * size * 0.45;
        return (
          <ellipse
            key={i}
            cx={cx} cy={cy}
            rx={size * 0.32} ry={size * 0.48}
            fill={color} opacity={0.9}
            transform={`rotate(${angle + 90}, ${cx}, ${cy})`}
          />
        );
      })}
      <circle cx={0} cy={0} r={size * 0.22} fill={centerColor} />
      {Array.from({ length: 5 }, (_, i) => (
        <circle
          key={i}
          cx={Math.cos((i * 72 * Math.PI) / 180) * size * 0.12}
          cy={Math.sin((i * 72 * Math.PI) / 180) * size * 0.12}
          r={size * 0.04}
          fill="#D4AF6A"
          opacity={0.8}
        />
      ))}
    </g>
  );
}

function TinyBloom({ color, centerColor = '#F8E4A0', size }: FlowerProps) {
  return (
    <g>
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i * 60);
        const rad = (angle * Math.PI) / 180;
        const cx = Math.cos(rad) * size * 0.5;
        const cy = Math.sin(rad) * size * 0.5;
        return (
          <ellipse
            key={i}
            cx={cx} cy={cy}
            rx={size * 0.22} ry={size * 0.38}
            fill={color} opacity={0.85}
            transform={`rotate(${angle}, ${cx}, ${cy})`}
          />
        );
      })}
      <circle cx={0} cy={0} r={size * 0.2} fill={centerColor} />
    </g>
  );
}

function LavenderSprig({ size, color = '#C5A8D4' }: { size: number; color?: string }) {
  const florets = 7;
  return (
    <g>
      <line x1={0} y1={size} x2={0} y2={-size * 0.5} stroke="#A8C890" strokeWidth={size * 0.08} strokeLinecap="round" />
      {Array.from({ length: florets }, (_, i) => {
        const y = -size * 0.4 + (i * size * 0.13);
        const side = i % 2 === 0 ? -1 : 1;
        return (
          <g key={i} transform={`translate(${side * size * 0.15}, ${y})`}>
            <ellipse cx={0} cy={0} rx={size * 0.1} ry={size * 0.18} fill={color} opacity={0.8} />
          </g>
        );
      })}
    </g>
  );
}

function Stem({ length, angle = 0, leafColor = '#A8C890' }: { length: number; angle?: number; leafColor?: string }) {
  return (
    <g transform={`rotate(${angle})`}>
      <path
        d={`M 0 0 Q ${length * 0.15} ${-length * 0.5} 0 ${-length}`}
        fill="none" stroke={leafColor} strokeWidth="2.5" strokeLinecap="round"
        opacity={0.7}
      />
      <ellipse cx={length * 0.08} cy={-length * 0.4} rx="6" ry="10" fill={leafColor} opacity={0.6} transform={`rotate(-30, ${length * 0.08}, ${-length * 0.4})`} />
      <ellipse cx={-length * 0.05} cy={-length * 0.6} rx="5" ry="9" fill={leafColor} opacity={0.55} transform={`rotate(25, ${-length * 0.05}, ${-length * 0.6})`} />
    </g>
  );
}

interface FlowerDef {
  x: number; y: number; size: number; rotation: number;
  type: 'daisy' | 'wildrose' | 'tiny' | 'lavender';
  color: string; centerColor?: string; delay: number;
  swayClass?: string; stemAngle?: number;
}

const flowerDefs: FlowerDef[] = [
  // Top left cluster
  { x: 8, y: 3, size: 52, rotation: -15, type: 'wildrose', color: '#F4B8C8', centerColor: '#FCCBA8', delay: 0, swayClass: 'sway-flower' },
  { x: 2, y: 12, size: 38, rotation: 20, type: 'daisy', color: '#C5A8D4', centerColor: '#F8E4A0', delay: 0.15, swayClass: 'sway-flower-reverse' },
  { x: 14, y: 8, size: 26, rotation: 5, type: 'tiny', color: '#FCCBA8', centerColor: '#F4B8C8', delay: 0.3, swayClass: 'sway-flower' },
  { x: 0, y: 22, size: 22, rotation: -10, type: 'lavender', color: '#B8A0D4', delay: 0.4, swayClass: 'sway-flower-reverse' },

  // Top right cluster
  { x: 78, y: 2, size: 50, rotation: 18, type: 'daisy', color: '#A8CEE8', centerColor: '#F8E4A0', delay: 0.1, swayClass: 'sway-flower-reverse' },
  { x: 88, y: 8, size: 42, rotation: -10, type: 'wildrose', color: '#F2A0B8', centerColor: '#FCCBA8', delay: 0.25, swayClass: 'sway-flower' },
  { x: 83, y: 16, size: 28, rotation: 12, type: 'tiny', color: '#A8DCC8', centerColor: '#F8E4A0', delay: 0.35, swayClass: 'sway-flower-reverse' },
  { x: 95, y: 3, size: 20, rotation: -5, type: 'lavender', color: '#C5A8D4', delay: 0.5, swayClass: 'sway-flower' },

  // Bottom left cluster
  { x: 3, y: 72, size: 46, rotation: 10, type: 'wildrose', color: '#FCCBA8', centerColor: '#F4B8C8', delay: 0.2, swayClass: 'sway-flower' },
  { x: -2, y: 82, size: 36, rotation: -20, type: 'daisy', color: '#A8DCC8', centerColor: '#F8E4A0', delay: 0.3, swayClass: 'sway-flower-reverse' },
  { x: 10, y: 80, size: 24, rotation: 8, type: 'tiny', color: '#C5A8D4', delay: 0.45, swayClass: 'sway-flower' },
  { x: 1, y: 65, size: 20, rotation: -8, type: 'lavender', color: '#D4A8E4', delay: 0.55, swayClass: 'sway-flower-reverse' },

  // Bottom right cluster
  { x: 82, y: 75, size: 48, rotation: -12, type: 'daisy', color: '#F4B8C8', centerColor: '#F8E4A0', delay: 0.15, swayClass: 'sway-flower-reverse' },
  { x: 92, y: 82, size: 40, rotation: 15, type: 'wildrose', color: '#C5A8D4', centerColor: '#FCCBA8', delay: 0.25, swayClass: 'sway-flower' },
  { x: 87, y: 70, size: 25, rotation: -5, type: 'tiny', color: '#A8CEE8', delay: 0.4, swayClass: 'sway-flower-reverse' },
  { x: 97, y: 72, size: 18, rotation: 10, type: 'lavender', color: '#FCCBA8', delay: 0.5, swayClass: 'sway-flower' },

  // Mid left
  { x: 0, y: 42, size: 34, rotation: -8, type: 'tiny', color: '#F4B8C8', centerColor: '#C5A8D4', delay: 0.35, swayClass: 'sway-flower' },
  // Mid right
  { x: 93, y: 44, size: 32, rotation: 10, type: 'tiny', color: '#A8DCC8', centerColor: '#F8E4A0', delay: 0.3, swayClass: 'sway-flower-reverse' },
];

export function WildflowerDecor() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {flowerDefs.map((f, i) => (
        // Outer div handles absolute position + sway CSS animation
        <div
          key={i}
          className={f.swayClass}
          style={{
            position: 'absolute',
            left: `${f.x}%`,
            top: `${f.y}%`,
            transformOrigin: 'bottom center',
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${3.5 + (i % 4) * 0.7}s`,
          }}
        >
          {/* Inner motion div handles bloom-in animation only (scale + opacity) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: f.delay + 0.3, duration: 1.1, type: 'spring', stiffness: 80, damping: 12 }}
          >
            <svg
              width={f.size}
              height={f.size + (f.type === 'lavender' ? f.size * 1.2 : 0)}
              viewBox={`${-f.size} ${f.type === 'lavender' ? -f.size * 1.5 : -f.size} ${f.size * 2} ${f.type === 'lavender' ? f.size * 2.5 : f.size * 2}`}
              overflow="visible"
              style={{ transform: `rotate(${f.rotation}deg)`, display: 'block' }}
            >
              <Stem length={f.size * 0.9} angle={f.rotation * 0.3} />
              {f.type === 'daisy' && <DaisyFlower color={f.color} centerColor={f.centerColor} size={f.size * 0.5} />}
              {f.type === 'wildrose' && <WildRose color={f.color} centerColor={f.centerColor} size={f.size * 0.5} />}
              {f.type === 'tiny' && <TinyBloom color={f.color} centerColor={f.centerColor} size={f.size * 0.5} />}
              {f.type === 'lavender' && <LavenderSprig size={f.size * 0.7} color={f.color} />}
            </svg>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

export function BotanicalDivider({ color = '#C9A85C' }: { color?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <div style={{ height: '1px', flex: 1, background: `linear-gradient(to right, transparent, ${color}80)` }} />
      <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
        <ellipse cx="8" cy="12" rx="6" ry="4" fill={color} opacity={0.5} transform="rotate(-30 8 12)" />
        <line x1="14" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1" opacity={0.5} />
        <circle cx="30" cy="12" r="4" fill={color} opacity={0.7} />
        <circle cx="30" cy="12" r="2" fill="#F8E4A0" opacity={0.9} />
        <line x1="38" y1="12" x2="46" y2="12" stroke={color} strokeWidth="1" opacity={0.5} />
        <ellipse cx="52" cy="12" rx="6" ry="4" fill={color} opacity={0.5} transform="rotate(30 52 12)" />
      </svg>
      <div style={{ height: '1px', flex: 1, background: `linear-gradient(to left, transparent, ${color}80)` }} />
    </div>
  );
}