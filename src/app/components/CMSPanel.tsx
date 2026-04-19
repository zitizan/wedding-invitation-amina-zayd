import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme, GalleryImage, WeddingTheme } from '../context/ThemeContext';
import { Settings, X, ChevronDown, RotateCcw, Image, Plus, Trash2, Save, FolderOpen, CheckCircle2, AlertCircle } from 'lucide-react';

// ─── Font Options ──────────────────────────────────────────────────────────────
const SCRIPT_FONTS = [
  { label: 'Great Vibes', value: "'Great Vibes', cursive" },
  { label: 'Dancing Script', value: "'Dancing Script', cursive" },
  { label: 'Sacramento', value: "'Sacramento', cursive" },
  { label: 'Pacifico', value: "'Pacifico', cursive" },
];
const SERIF_FONTS = [
  { label: 'Playfair Display', value: "'Playfair Display', serif" },
  { label: 'Cormorant Garamond', value: "'Cormorant Garamond', serif" },
  { label: 'EB Garamond', value: "'EB Garamond', serif" },
  { label: 'Libre Baskerville', value: "'Libre Baskerville', serif" },
];
const SANS_FONTS = [
  { label: 'Poppins', value: "'Poppins', sans-serif" },
  { label: 'Montserrat', value: "'Montserrat', sans-serif" },
  { label: 'Lato', value: "'Lato', sans-serif" },
  { label: 'Nunito', value: "'Nunito', sans-serif" },
];

// ─── Small reusable controls ────────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  width: '100%',
  padding: '9px 12px',
  borderRadius: '10px',
  border: '1.5px solid rgba(200,180,200,0.4)',
  background: 'rgba(255,255,255,0.75)',
  fontFamily: "'Poppins', sans-serif",
  fontSize: '13px',
  color: '#4A2A4A',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: "'Poppins', sans-serif",
      fontSize: '11px',
      color: '#9A7A8A',
      letterSpacing: '0.5px',
      margin: '0 0 5px 0',
      textTransform: 'uppercase',
    }}>
      {children}
    </p>
  );
}

function TextInput({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <Label>{label}</Label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={3}
          style={{ ...inputBase, resize: 'vertical', lineHeight: 1.5 }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          style={inputBase}
        />
      )}
    </div>
  );
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '10px',
          background: value,
          border: '2px solid rgba(255,255,255,0.9)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }} />
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%', cursor: 'pointer', borderRadius: '10px' }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: '#6A4A6A', margin: '0 0 2px 0' }}>{label}</p>
        <p style={{ fontFamily: 'monospace', fontSize: '10px', color: '#B09AB0', margin: 0 }}>{value}</p>
      </div>
    </div>
  );
}

function SliderInput({ label, value, min, max, step = 1, unit = 'px', onChange }: {
  label: string; value: number; min: number; max: number; step?: number; unit?: string; onChange: (v: number) => void;
}) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <Label>{label}</Label>
        <span style={{
          fontFamily: 'monospace', fontSize: '11px', color: '#C9A85C',
          background: 'rgba(201,168,92,0.12)', padding: '2px 8px', borderRadius: '100px',
        }}>
          {value}{unit}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: '#C9A85C', height: '4px', cursor: 'pointer' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#C0A0B0' }}>{min}{unit}</span>
        <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#C0A0B0' }}>{max}{unit}</span>
      </div>
    </div>
  );
}

function FontSelect({ label, value, options, onChange }: {
  label: string; value: string;
  options: { label: string; value: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <Label>{label}</Label>
      <div style={{ position: 'relative' }}>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ ...inputBase, appearance: 'none', paddingRight: '28px', cursor: 'pointer' }}
        >
          {options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <ChevronDown size={13} color="#C9A85C" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
      </div>
      <p style={{ fontFamily: value, fontSize: '15px', color: '#8B4A6B', margin: '6px 0 0 4px', lineHeight: 1.3 }}>
        Preview: Amina &amp; Zayd
      </p>
    </div>
  );
}

// ─── Toggle Switch ──────────────────────────────────────────────────────────────
function ToggleSwitch({ label, value, onChange, description }: {
  label: string; value: boolean; onChange: (v: boolean) => void; description?: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', gap: '10px' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: '#6A4A6A', margin: '0 0 2px 0' }}>{label}</p>
        {description && <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '10px', color: '#B09AB0', margin: 0 }}>{description}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        style={{
          flexShrink: 0, width: '40px', height: '22px', borderRadius: '100px',
          background: value ? 'linear-gradient(135deg, #C5447A, #8B2252)' : 'rgba(200,180,200,0.4)',
          border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s',
          boxShadow: value ? '0 2px 8px rgba(197,68,122,0.4)' : 'none',
        }}
      >
        <motion.div
          animate={{ x: value ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
        />
      </button>
    </div>
  );
}

// ─── Chip selector ──────────────────────────────────────────────────────────────
function ChipSelect<T extends string>({ label, value, options, onChange }: {
  label: string;
  value: T;
  options: { label: string; value: T; icon?: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <Label>{label}</Label>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {options.map(o => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            style={{
              padding: '6px 12px', borderRadius: '100px', border: 'none', cursor: 'pointer',
              background: value === o.value
                ? 'linear-gradient(135deg, #C5447A, #8B2252)'
                : 'rgba(200,180,200,0.25)',
              color: value === o.value ? 'white' : '#6A4A6A',
              fontFamily: "'Poppins', sans-serif", fontSize: '11px',
              transition: 'all 0.2s',
              boxShadow: value === o.value ? '0 2px 10px rgba(197,68,122,0.35)' : 'none',
            }}
          >
            {o.icon && <span style={{ marginRight: '4px' }}>{o.icon}</span>}
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Image card in CMS ──────────────────────────────────────────────────────────
function ImageCard({ img, index, onChange, onRemove, total }: {
  img: GalleryImage; index: number;
  onChange: (i: number, field: keyof GalleryImage, v: string) => void;
  onRemove: (i: number) => void;
  total: number;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{
      borderRadius: '14px',
      border: `1.5px solid ${img.frame}60`,
      background: `${img.frame}10`,
      marginBottom: '8px', overflow: 'hidden',
    }}>
      {/* Image header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px' }}>
        {/* Thumbnail */}
        <div style={{
          width: '42px', height: '52px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0,
          background: 'rgba(200,180,200,0.2)', border: `1.5px solid ${img.frame}60`,
        }}>
          {img.url ? (
            <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image size={16} color={img.frame} />
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: '#6A4A6A', margin: '0 0 2px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Photo {index + 1} — {img.caption || 'No caption'}
          </p>
          <p style={{ fontFamily: 'monospace', fontSize: '9px', color: '#B09AB0', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {img.url ? img.url.substring(0, 40) + '...' : 'No URL set'}
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
          {/* Frame color */}
          <div style={{ position: 'relative' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: img.frame, border: '2px solid white', boxShadow: '0 1px 4px rgba(0,0,0,0.15)', cursor: 'pointer' }} />
            <input type="color" value={img.frame} onChange={e => onChange(index, 'frame', e.target.value)}
              style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }} />
          </div>
          <button onClick={() => setExpanded(p => !p)} style={{ width: '26px', height: '26px', borderRadius: '8px', background: 'rgba(200,180,200,0.2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronDown size={13} color="#9A7A8A" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
          {total > 1 && (
            <button onClick={() => onRemove(index)} style={{ width: '26px', height: '26px', borderRadius: '8px', background: 'rgba(244,184,200,0.25)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trash2 size={11} color="#C5447A" />
            </button>
          )}
        </div>
      </div>

      {/* Expanded edit fields */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '4px 10px 12px' }}>
              <Label>Image URL</Label>
              <textarea
                value={img.url}
                onChange={e => onChange(index, 'url', e.target.value)}
                placeholder="https://images.unsplash.com/..."
                rows={2}
                style={{
                  width: '100%', padding: '8px 10px', borderRadius: '10px', fontSize: '11px',
                  border: '1.5px solid rgba(200,180,200,0.4)', background: 'rgba(255,255,255,0.8)',
                  fontFamily: 'monospace', color: '#4A2A4A', outline: 'none', resize: 'vertical',
                  marginBottom: '8px', boxSizing: 'border-box',
                }}
              />
              <Label>Caption</Label>
              <input
                type="text" value={img.caption}
                onChange={e => onChange(index, 'caption', e.target.value)}
                placeholder="Enter caption..."
                style={{
                  width: '100%', padding: '8px 10px', borderRadius: '10px', fontSize: '12px',
                  border: '1.5px solid rgba(200,180,200,0.4)', background: 'rgba(255,255,255,0.8)',
                  fontFamily: "'Poppins', sans-serif", color: '#4A2A4A', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Accordion Section ─────────────────────────────────────────────────────────
function Section({ title, icon, children, defaultOpen = false }: {
  title: string; icon: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      borderRadius: '14px',
      border: '1px solid rgba(212,175,106,0.2)',
      marginBottom: '10px',
      overflow: 'hidden',
      background: 'rgba(255,255,255,0.5)',
    }}>
      <button
        onClick={() => setOpen(p => !p)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 14px', background: 'none', border: 'none', cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>{icon}</span>
          <span style={{
            fontFamily: "'Playfair Display', serif", fontSize: '14px',
            color: '#6A3A5A', fontWeight: 500,
          }}>
            {title}
          </span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={15} color="#C9A85C" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '4px 14px 14px' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main CMS Panel ────────────────────────────────────────────────────────────
export function CMSPanel() {
  const [open, setOpen] = useState(false);
  const { theme, update, reset, loadTheme, switchPreset } = useTheme();
  const isGold = theme.preset === 'goldfoil';

  // Save / Load state
  const [fileName, setFileName] = useState('amina-zayd-invitation');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');
  const [loadStatus, setLoadStatus] = useState<'idle' | 'ok' | 'error'>('idle');
  const [loadMsg, setLoadMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Save handler ──
  const handleSave = () => {
    const name = (fileName.trim() || 'invitation').replace(/[^a-z0-9_\-]/gi, '-');
    const payload = JSON.stringify({ __weddingInvitation: true, version: 1, theme }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2500);
  };

  // ── Load handler ──
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (!parsed.__weddingInvitation || !parsed.theme) throw new Error('Invalid file');
        loadTheme(parsed.theme as WeddingTheme);
        setLoadStatus('ok');
        setLoadMsg(`Loaded: ${file.name}`);
        setTimeout(() => setLoadStatus('idle'), 3000);
      } catch {
        setLoadStatus('error');
        setLoadMsg('Invalid file — please open a saved invitation JSON');
        setTimeout(() => setLoadStatus('idle'), 4000);
      }
    };
    reader.readAsText(file);
    // reset input so same file can be re-loaded
    e.target.value = '';
  };

  // Gallery image helpers
  const updateImage = (i: number, field: keyof GalleryImage, val: string) => {
    const imgs = theme.gallery.images.map((img, idx) => idx === i ? { ...img, [field]: val } : img);
    update('gallery', { images: imgs });
  };
  const removeImage = (i: number) => {
    const imgs = theme.gallery.images.filter((_, idx) => idx !== i);
    update('gallery', { images: imgs });
  };
  const addImage = () => {
    const frames = ['#F4B8C8', '#C5A8D4', '#A8DCC8', '#FCCBA8', '#A8CEE8', '#F8E4A0'];
    const newImg: GalleryImage = {
      url: '',
      caption: `Photo ${theme.gallery.images.length + 1}`,
      frame: frames[theme.gallery.images.length % frames.length],
    };
    update('gallery', { images: [...theme.gallery.images, newImg] });
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setOpen(p => !p)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 200,
          width: '48px', height: '48px', borderRadius: '50%',
          background: open
            ? 'linear-gradient(135deg, #C5A8D4, #F4B8C8)'
            : 'linear-gradient(135deg, #C9A85C, #E8C060)',
          border: '2px solid rgba(255,255,255,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          transition: 'background 0.3s',
        }}
        title="Customize Invitation"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={20} color="white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Settings size={20} color="white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 190,
              background: 'rgba(60,20,40,0.18)',
              backdropFilter: 'blur(2px)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 195,
              width: 'min(360px, 100vw)',
              background: 'rgba(255,250,252,0.97)',
              backdropFilter: 'blur(24px)',
              borderLeft: '1px solid rgba(212,175,106,0.25)',
              boxShadow: '-20px 0 60px rgba(139,34,82,0.08), -4px 0 20px rgba(0,0,0,0.08)',
              display: 'flex', flexDirection: 'column',
              overflowY: 'hidden',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '20px 18px 14px',
              borderBottom: '1px solid rgba(212,175,106,0.2)',
              flexShrink: 0,
              background: isGold
                ? 'linear-gradient(135deg, rgba(232,200,74,0.1), rgba(197,168,53,0.06))'
                : 'linear-gradient(135deg, rgba(244,184,200,0.12), rgba(197,168,212,0.08))',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <span style={{ fontSize: '20px' }}>{isGold ? '✨' : '🌸'}</span>
                <h2 style={{
                  fontFamily: "'Great Vibes', cursive", fontSize: '28px',
                  color: isGold ? '#8B6914' : '#8B2252', margin: 0, lineHeight: 1, fontWeight: 400,
                }}>
                  Design Studio
                </h2>
              </div>
              <p style={{
                fontFamily: "'Poppins', sans-serif", fontSize: '11px',
                color: '#9A7A8A', margin: '0 0 14px 0', letterSpacing: '0.5px',
              }}>
                Customize every detail of your invitation
              </p>

              {/* ── Preset switcher ── */}
              <div style={{
                display: 'flex', gap: '6px',
                background: 'rgba(200,180,200,0.15)',
                borderRadius: '14px', padding: '4px',
              }}>
                {([
                  { preset: 'wildflower' as const, icon: '🌸', label: 'Wildflower' },
                  { preset: 'goldfoil' as const, icon: '✨', label: 'Gold Foil' },
                ] as const).map(opt => {
                  const active = theme.preset === opt.preset;
                  return (
                    <motion.button
                      key={opt.preset}
                      onClick={() => switchPreset(opt.preset)}
                      whileHover={!active ? { scale: 1.03 } : {}}
                      whileTap={{ scale: 0.97 }}
                      animate={{
                        background: active
                          ? opt.preset === 'goldfoil'
                            ? 'linear-gradient(135deg, #C9A835, #E8C84A)'
                            : 'linear-gradient(135deg, #F4B8C8, #C5A8D4)'
                          : 'transparent',
                        boxShadow: active
                          ? opt.preset === 'goldfoil'
                            ? '0 4px 16px rgba(197,168,53,0.4)'
                            : '0 4px 16px rgba(197,68,122,0.3)'
                          : 'none',
                      }}
                      style={{
                        flex: 1, padding: '9px 6px', borderRadius: '10px',
                        border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                      }}
                    >
                      <span style={{ fontSize: '14px' }}>{opt.icon}</span>
                      <span style={{
                        fontFamily: "'Poppins', sans-serif", fontSize: '11px',
                        color: active ? (opt.preset === 'goldfoil' ? '#3A2A08' : 'white') : '#9A7A8A',
                        fontWeight: active ? 500 : 400,
                        letterSpacing: '0.3px',
                      }}>
                        {opt.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 12px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(197,68,122,0.2) transparent' }}>

              {/* ── Couple & Event ── */}
              <Section title="Couple & Event" icon="💑" defaultOpen>
                <TextInput label="Partner Name 1" value={theme.couple.name1}
                  onChange={v => update('couple', { name1: v })} />
                <TextInput label="Partner Name 2" value={theme.couple.name2}
                  onChange={v => update('couple', { name2: v })} />
                <TextInput label="Date (full)" value={theme.couple.date}
                  onChange={v => update('couple', { date: v })} />
                <TextInput label="Date (short / hero)" value={theme.couple.dateShort}
                  onChange={v => update('couple', { dateShort: v })} />
                <TextInput label="Time" value={theme.couple.time}
                  onChange={v => update('couple', { time: v })} />
                <TextInput label="Venue" value={theme.couple.venue}
                  onChange={v => update('couple', { venue: v })} />
                <TextInput label="Location" value={theme.couple.location}
                  onChange={v => update('couple', { location: v })} />
                <TextInput label="Dress Code" value={theme.couple.dressCode}
                  onChange={v => update('couple', { dressCode: v })} />
                <TextInput label="Hero Subtitle" value={theme.couple.subtitle}
                  onChange={v => update('couple', { subtitle: v })} multiline />
                <TextInput label="WhatsApp Number" value={theme.couple.whatsappNumber}
                  onChange={v => update('couple', { whatsappNumber: v })} />
                <TextInput label="Footer Quote" value={theme.couple.quoteText}
                  onChange={v => update('couple', { quoteText: v })} multiline />
                <TextInput label="Quote Source" value={theme.couple.quoteSource}
                  onChange={v => update('couple', { quoteSource: v })} />
              </Section>

              {/* ── Typography – Fonts ── */}
              <Section title="Font Families" icon="🖋">
                <FontSelect label="Script Font (Names)" value={theme.fonts.script}
                  options={SCRIPT_FONTS} onChange={v => update('fonts', { script: v })} />
                <FontSelect label="Serif Font (Headings)" value={theme.fonts.serif}
                  options={SERIF_FONTS} onChange={v => update('fonts', { serif: v })} />
                <FontSelect label="Sans Font (Body)" value={theme.fonts.sans}
                  options={SANS_FONTS} onChange={v => update('fonts', { sans: v })} />
              </Section>

              {/* ── Typography – Sizes ── */}
              <Section title="Text Sizes" icon="📐">
                <SliderInput label="Names – Hero" value={theme.sizes.nameHero}
                  min={40} max={120} onChange={v => update('sizes', { nameHero: v })} />
                <SliderInput label="Section Headings" value={theme.sizes.sectionHeading}
                  min={28} max={80} onChange={v => update('sizes', { sectionHeading: v })} />
                <SliderInput label="Card Names" value={theme.sizes.cardNames}
                  min={32} max={80} onChange={v => update('sizes', { cardNames: v })} />
                <SliderInput label="Detail Text" value={theme.sizes.detailText}
                  min={11} max={22} onChange={v => update('sizes', { detailText: v })} />
                <SliderInput label="Body Text" value={theme.sizes.bodyText}
                  min={10} max={20} onChange={v => update('sizes', { bodyText: v })} />
                <SliderInput label="Subtitle Text" value={theme.sizes.subtitleText}
                  min={10} max={18} onChange={v => update('sizes', { subtitleText: v })} />
                <SliderInput label="Label / Caps Text" value={theme.sizes.labelText}
                  min={8} max={16} onChange={v => update('sizes', { labelText: v })} />
              </Section>

              {/* ── Colors ── */}
              <Section title="Text Colors" icon="🎨">
                <ColorInput label="Gold / Accent" value={theme.colors.gold}
                  onChange={v => update('colors', { gold: v })} />
                <ColorInput label="Primary Rose (Names & Headings)" value={theme.colors.primaryRose}
                  onChange={v => update('colors', { primaryRose: v })} />
                <ColorInput label="Accent Pink" value={theme.colors.accentPink}
                  onChange={v => update('colors', { accentPink: v })} />
                <ColorInput label="Body Text" value={theme.colors.bodyText}
                  onChange={v => update('colors', { bodyText: v })} />
                <ColorInput label="Subtitle Text" value={theme.colors.subtitleText}
                  onChange={v => update('colors', { subtitleText: v })} />
                <ColorInput label="Label / Small Text" value={theme.colors.labelText}
                  onChange={v => update('colors', { labelText: v })} />
              </Section>

              {/* ── Background ── */}
              <Section title="Background Gradient" icon="🌈">
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '11px', color: '#9A7A8A', marginBottom: '12px' }}>
                  Six gradient color stops that softly animate in a loop.
                </p>
                {(['color1', 'color2', 'color3', 'color4', 'color5', 'color6'] as const).map((k, i) => (
                  <ColorInput key={k} label={`Color Stop ${i + 1}`} value={theme.bg[k]}
                    onChange={v => update('bg', { [k]: v })} />
                ))}
                <SliderInput label="Animation Speed" value={theme.bg.speed}
                  min={5} max={60} unit="s" onChange={v => update('bg', { speed: v })} />
              </Section>

              {/* ── Card ── */}
              <Section title="Card & Borders" icon="💎">
                <SliderInput label="Card Background Opacity" value={Math.round(theme.card.bgOpacity * 100)}
                  min={30} max={100} unit="%" onChange={v => update('card', { bgOpacity: v / 100 })} />
                <ColorInput label="Card Border / Frame Color" value={theme.card.borderColor}
                  onChange={v => update('card', { borderColor: v })} />
              </Section>

              {/* ── Button ── */}
              <Section title="Open Button" icon="✨">
                <TextInput label="Button Label" value={theme.button.label}
                  onChange={v => update('button', { label: v })} />
                <ColorInput label="Gradient Start" value={theme.button.colorFrom}
                  onChange={v => update('button', { colorFrom: v })} />
                <ColorInput label="Gradient End" value={theme.button.colorTo}
                  onChange={v => update('button', { colorTo: v })} />
                <ColorInput label="Text Color" value={theme.button.textColor}
                  onChange={v => update('button', { textColor: v })} />
                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                  <div style={{
                    display: 'inline-block',
                    background: `linear-gradient(135deg, ${theme.button.colorFrom}, ${theme.button.colorTo})`,
                    borderRadius: '100px', padding: '10px 24px',
                    fontFamily: theme.fonts.serif, fontSize: '14px', color: theme.button.textColor,
                  }}>
                    {theme.button.label}
                  </div>
                </div>
              </Section>

              {/* ── Countdown ── */}
              <Section title="Countdown Colors" icon="⏱">
                <ColorInput label="Days" value={theme.countdown.daysColor}
                  onChange={v => update('countdown', { daysColor: v })} />
                <ColorInput label="Hours" value={theme.countdown.hoursColor}
                  onChange={v => update('countdown', { hoursColor: v })} />
                <ColorInput label="Minutes" value={theme.countdown.minutesColor}
                  onChange={v => update('countdown', { minutesColor: v })} />
                <ColorInput label="Seconds" value={theme.countdown.secondsColor}
                  onChange={v => update('countdown', { secondsColor: v })} />
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  {[theme.countdown.daysColor, theme.countdown.hoursColor, theme.countdown.minutesColor, theme.countdown.secondsColor].map((c, i) => (
                    <div key={i} style={{ flex: 1, borderRadius: '8px', padding: '8px 4px', background: c, color: '#fff', textAlign: 'center', fontFamily: "'Poppins', sans-serif", fontSize: '10px' }}>
                      {['D', 'H', 'M', 'S'][i]}
                    </div>
                  ))}
                </div>
              </Section>

              {/* ── Gallery & Animation ── */}
              <Section title="Gallery & Animation" icon="🖼">
                {/* Playback */}
                <div style={{ padding: '10px 12px', background: 'rgba(244,184,200,0.08)', borderRadius: '12px', marginBottom: '14px', border: '1px solid rgba(244,184,200,0.2)' }}>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '10px', color: '#C5447A', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>
                    ▶ Playback
                  </p>
                  <ToggleSwitch label="Auto-Play" value={theme.gallery.autoPlay}
                    onChange={v => update('gallery', { autoPlay: v })}
                    description="Automatically advance to next photo" />
                  <SliderInput label="Display Duration" value={theme.gallery.speed}
                    min={2} max={12} step={0.5} unit="s"
                    onChange={v => update('gallery', { speed: v })} />
                </div>

                {/* Transition */}
                <div style={{ padding: '10px 12px', background: 'rgba(197,168,212,0.08)', borderRadius: '12px', marginBottom: '14px', border: '1px solid rgba(197,168,212,0.2)' }}>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '10px', color: '#7A5AB8', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>
                    🎬 Transitions
                  </p>
                  <ChipSelect<'zoom-slide' | 'zoom-fade' | 'slide'>
                    label="Transition Effect"
                    value={theme.gallery.effect}
                    options={[
                      { label: 'Zoom Slide', value: 'zoom-slide', icon: '🎯' },
                      { label: 'Zoom Fade', value: 'zoom-fade', icon: '✨' },
                      { label: 'Slide', value: 'slide', icon: '↔' },
                    ]}
                    onChange={v => update('gallery', { effect: v })}
                  />
                  <ChipSelect<'rtl' | 'ltr'>
                    label="Slide Direction"
                    value={theme.gallery.slideDirection}
                    options={[
                      { label: '← Right to Left', value: 'rtl', icon: '' },
                      { label: 'Left to Right →', value: 'ltr', icon: '' },
                    ]}
                    onChange={v => update('gallery', { slideDirection: v })}
                  />
                  <SliderInput label="Transition Duration" value={theme.gallery.fadeDuration}
                    min={0.2} max={2.0} step={0.1} unit="s"
                    onChange={v => update('gallery', { fadeDuration: v })} />
                </div>

                {/* Ken Burns */}
                <div style={{ padding: '10px 12px', background: 'rgba(168,220,200,0.08)', borderRadius: '12px', marginBottom: '14px', border: '1px solid rgba(168,220,200,0.25)' }}>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '10px', color: '#4A9A7A', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>
                    🔍 Ken Burns Zoom
                  </p>
                  <SliderInput label="Zoom Intensity" value={Math.round((theme.gallery.zoomScale - 1) * 100)}
                    min={0} max={40} unit="%"
                    onChange={v => update('gallery', { zoomScale: 1 + v / 100 })} />
                  <ChipSelect<'in' | 'out' | 'alternate'>
                    label="Zoom Direction"
                    value={theme.gallery.zoomDirection}
                    options={[
                      { label: 'Zoom In', value: 'in', icon: '🔍' },
                      { label: 'Zoom Out', value: 'out', icon: '🔭' },
                      { label: 'Alternate', value: 'alternate', icon: '🔄' },
                    ]}
                    onChange={v => update('gallery', { zoomDirection: v })}
                  />
                </div>

                {/* Overlay */}
                <div style={{ padding: '10px 12px', background: 'rgba(201,168,92,0.08)', borderRadius: '12px', marginBottom: '14px', border: '1px solid rgba(201,168,92,0.2)' }}>
                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '10px', color: '#C9A85C', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 10px 0' }}>
                    🌅 Overlay & UI
                  </p>
                  <SliderInput label="Dark Overlay Strength" value={theme.gallery.overlayOpacity}
                    min={0} max={80} unit="%"
                    onChange={v => update('gallery', { overlayOpacity: v })} />
                  <ToggleSwitch label="Show Captions" value={theme.gallery.showCaptions}
                    onChange={v => update('gallery', { showCaptions: v })} />
                  <ToggleSwitch label="Show Navigation Dots" value={theme.gallery.showDots}
                    onChange={v => update('gallery', { showDots: v })} />
                  <ToggleSwitch label="Show Arrow Buttons" value={theme.gallery.showArrows}
                    onChange={v => update('gallery', { showArrows: v })} />
                </div>

                {/* Photos */}
                <div style={{ padding: '10px 12px', background: 'rgba(252,203,168,0.08)', borderRadius: '12px', border: '1px solid rgba(252,203,168,0.25)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '10px', color: '#C5787A', letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>
                      🖼 Photos ({theme.gallery.images.length})
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      onClick={addImage}
                      disabled={theme.gallery.images.length >= 12}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '4px',
                        padding: '5px 10px', borderRadius: '100px', border: 'none',
                        background: theme.gallery.images.length >= 12 ? 'rgba(200,180,200,0.3)' : 'linear-gradient(135deg, #C5447A, #8B2252)',
                        color: 'white', cursor: theme.gallery.images.length >= 12 ? 'not-allowed' : 'pointer',
                        fontFamily: "'Poppins', sans-serif", fontSize: '11px',
                      }}
                    >
                      <Plus size={11} /> Add Photo
                    </motion.button>
                  </div>

                  <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '10px', color: '#B09AB0', marginBottom: '10px', lineHeight: 1.5 }}>
                    Click any photo to edit its URL, caption, and frame color. Tap the color dot to change frame color.
                  </p>

                  {theme.gallery.images.map((img, i) => (
                    <ImageCard key={i} img={img} index={i}
                      onChange={updateImage} onRemove={removeImage}
                      total={theme.gallery.images.length} />
                  ))}
                </div>
              </Section>

            </div>

            {/* Footer – Save / Open / Reset */}
            <div style={{
              padding: '14px 16px 18px',
              borderTop: '1px solid rgba(212,175,106,0.2)',
              flexShrink: 0,
              background: 'rgba(255,252,250,0.97)',
              display: 'flex', flexDirection: 'column', gap: '10px',
            }}>

              {/* ── File name + Save ── */}
              <div>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '10px', color: '#9A7A8A', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 6px 0' }}>
                  💾 Save Your Design
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={fileName}
                    onChange={e => setFileName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSave()}
                    placeholder="file-name"
                    style={{
                      flex: 1, padding: '9px 12px', borderRadius: '10px',
                      border: '1.5px solid rgba(201,168,92,0.35)',
                      background: 'rgba(255,253,245,0.9)',
                      fontFamily: "'Poppins', sans-serif", fontSize: '12px',
                      color: '#5A3A2A', outline: 'none', boxSizing: 'border-box',
                      minWidth: 0,
                    }}
                  />
                  <motion.button
                    onClick={handleSave}
                    whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
                    style={{
                      flexShrink: 0,
                      padding: '9px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                      background: saveStatus === 'saved'
                        ? 'linear-gradient(135deg, #4AB890, #2A8A6A)'
                        : 'linear-gradient(135deg, #C9A85C, #E8C060)',
                      boxShadow: saveStatus === 'saved'
                        ? '0 4px 14px rgba(74,184,144,0.4)'
                        : '0 4px 14px rgba(201,168,92,0.35)',
                      display: 'flex', alignItems: 'center', gap: '6px',
                      transition: 'background 0.3s, box-shadow 0.3s',
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {saveStatus === 'saved' ? (
                        <motion.div key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                          style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <CheckCircle2 size={14} color="white" />
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: 'white' }}>Saved!</span>
                        </motion.div>
                      ) : (
                        <motion.div key="save" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                          style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Save size={14} color="white" />
                          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: 'white' }}>Save</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '10px', color: '#B0A090', margin: '5px 0 0', lineHeight: 1.4 }}>
                  Downloads as <strong style={{ color: '#C9A85C' }}>{(fileName.trim() || 'invitation').replace(/[^a-z0-9_\-]/gi, '-')}.json</strong>
                </p>
              </div>

              {/* ── Open saved file ── */}
              <div>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '10px', color: '#9A7A8A', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 6px 0' }}>
                  📂 Open Saved Design
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <motion.button
                  onClick={() => fileInputRef.current?.click()}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: '10px', cursor: 'pointer',
                    border: '1.5px dashed rgba(197,168,212,0.5)',
                    background: 'rgba(197,168,212,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    transition: 'background 0.2s',
                  }}
                >
                  <FolderOpen size={15} color="#7A5AB8" />
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: '#7A5AB8' }}>
                    Open .json file…
                  </span>
                </motion.button>

                {/* Load status feedback */}
                <AnimatePresence>
                  {loadStatus !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      style={{
                        marginTop: '7px', padding: '8px 12px', borderRadius: '10px',
                        background: loadStatus === 'ok' ? 'rgba(74,184,144,0.12)' : 'rgba(229,115,115,0.12)',
                        border: `1px solid ${loadStatus === 'ok' ? 'rgba(74,184,144,0.3)' : 'rgba(229,115,115,0.3)'}`,
                        display: 'flex', alignItems: 'flex-start', gap: '7px',
                      }}
                    >
                      {loadStatus === 'ok'
                        ? <CheckCircle2 size={14} color="#4AB890" style={{ flexShrink: 0, marginTop: '1px' }} />
                        : <AlertCircle size={14} color="#E57373" style={{ flexShrink: 0, marginTop: '1px' }} />}
                      <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '11px', lineHeight: 1.5, color: loadStatus === 'ok' ? '#2A8A6A' : '#C55050' }}>
                        {loadMsg}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Divider ── */}
              <div style={{ height: '1px', background: 'rgba(212,175,106,0.18)', margin: '0 0 2px' }} />

              {/* ── Reset ── */}
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={reset}
                style={{
                  width: '100%', padding: '10px',
                  borderRadius: '12px',
                  background: 'rgba(244,184,200,0.15)',
                  border: '1.5px solid rgba(197,68,122,0.22)',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
              >
                <RotateCcw size={13} color="#C5447A" />
                <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: '#C5447A' }}>
                  Reset to Defaults
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}