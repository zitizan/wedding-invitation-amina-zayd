import { createContext, useContext, useState, ReactNode } from 'react';

// ─── Types ─────────────────────────────────────────────────────────────────────
export interface GalleryImage {
  url: string;
  caption: string;
  frame: string;
}

export interface WeddingTheme {
  preset: 'wildflower' | 'goldfoil';
  couple: {
    name1: string;
    name2: string;
    date: string;
    dateShort: string;
    time: string;
    venue: string;
    location: string;
    dressCode: string;
    subtitle: string;
    whatsappNumber: string;
    quoteText: string;
    quoteSource: string;
  };
  fonts: {
    script: string;
    serif: string;
    sans: string;
  };
  sizes: {
    nameHero: number;
    sectionHeading: number;
    cardNames: number;
    bodyText: number;
    subtitleText: number;
    detailText: number;
    labelText: number;
  };
  colors: {
    gold: string;
    primaryRose: string;
    accentPink: string;
    bodyText: string;
    subtitleText: string;
    labelText: string;
  };
  bg: {
    color1: string;
    color2: string;
    color3: string;
    color4: string;
    color5: string;
    color6: string;
    speed: number;
  };
  card: {
    bgOpacity: number;
    borderColor: string;
  };
  button: {
    colorFrom: string;
    colorTo: string;
    textColor: string;
    label: string;
  };
  countdown: {
    daysColor: string;
    hoursColor: string;
    minutesColor: string;
    secondsColor: string;
  };
  gallery: {
    autoPlay: boolean;
    speed: number;
    zoomScale: number;
    zoomDirection: 'in' | 'out' | 'alternate';
    fadeDuration: number;
    slideDirection: 'rtl' | 'ltr';
    effect: 'zoom-fade' | 'slide' | 'zoom-slide';
    showCaptions: boolean;
    showDots: boolean;
    showArrows: boolean;
    overlayOpacity: number;
    images: GalleryImage[];
  };
}

// ─── Default gallery images ────────────────────────────────────────────────────
const DEFAULT_GALLERY_IMAGES: GalleryImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1758810410699-2dc1daec82dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGNvdXBsZSUyMHdlZGRpbmclMjBnb2xkZW4lMjBob3VyfGVufDF8fHx8MTc3NjU0MTk4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Golden Moments',
    frame: '#F4B8C8',
  },
  {
    url: 'https://images.unsplash.com/photo-1675260832247-8b8393b34a4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBob2xkaW5nJTIwaGFuZHMlMjByb21hbnRpYyUyMHN1bnNldHxlbnwxfHx8fDE3NzY1NDE5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Together Forever',
    frame: '#C5A8D4',
  },
  {
    url: 'https://images.unsplash.com/photo-1748546639032-203c5bd8ef85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkZmxvd2VyJTIwYm91cXVldCUyMHBhc3RlbCUyMHdlZGRpbmd8ZW58MXx8fHwxNzc2NTQxOTgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Wildflower Dreams',
    frame: '#A8DCC8',
  },
  {
    url: 'https://images.unsplash.com/photo-1555675770-c511412b7933?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcmluZ3MlMjBmbG93ZXJzJTIwcm9zZSUyMHBldGFsc3xlbnwxfHx8fDE3NzY1NDE5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'A Promise of Love',
    frame: '#FCCBA8',
  },
  {
    url: 'https://images.unsplash.com/photo-1769812343719-e2616162830d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdGFibGUlMjBmbG9yYWwlMjBkZWNvcmF0aW9uJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzY1NDE5ODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Floral Elegance',
    frame: '#A8CEE8',
  },
  {
    url: 'https://images.unsplash.com/photo-1769812344337-ec16a1b7cef8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZ2FyZGVuJTIwd2VkZGluZyUyMGNlcmVtb255JTIwYXJjaCUyMGZsb3dlcnN8ZW58MXx8fHwxNzc2NTQxOTg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Garden of Love',
    frame: '#F8E4A0',
  },
];

// ─── Shared couple defaults ─────────────────────────────────────────────────────
const DEFAULT_COUPLE = {
  name1: 'Amina',
  name2: 'Zayd',
  date: '15 December 2026',
  dateShort: '15 · XII · 2026',
  time: '7:00 PM',
  venue: 'Grand Palace Hall',
  location: 'Doha, Qatar',
  dressCode: 'Formal Elegance · Floral Welcome',
  subtitle: 'Together with their families invite you to celebrate their wedding',
  whatsappNumber: '97466861474',
  quoteText: '"And of His signs is that He created for you from yourselves mates that you may find tranquility in them"',
  quoteSource: '— Quran 30:21',
};

const DEFAULT_SIZES = {
  nameHero: 72,
  sectionHeading: 48,
  cardNames: 56,
  bodyText: 14,
  subtitleText: 13,
  detailText: 15,
  labelText: 11,
};

// ─── Theme 1 — Whimsical Wildflower ──────────────────────────────────────────
export const defaultTheme: WeddingTheme = {
  preset: 'wildflower',
  couple: DEFAULT_COUPLE,
  fonts: {
    script: "'Great Vibes', cursive",
    serif: "'Playfair Display', serif",
    sans: "'Poppins', sans-serif",
  },
  sizes: DEFAULT_SIZES,
  colors: {
    gold: '#C9A85C',
    primaryRose: '#8B2252',
    accentPink: '#C5447A',
    bodyText: '#6A4A5A',
    subtitleText: '#7A5A6A',
    labelText: '#8B6A7A',
  },
  bg: {
    color1: '#FFF0F5',
    color2: '#F8EDFF',
    color3: '#EDF5FF',
    color4: '#FFF5EC',
    color5: '#F0FFF8',
    color6: '#FFF0E0',
    speed: 18,
  },
  card: {
    bgOpacity: 0.88,
    borderColor: '#F4B8C8',
  },
  button: {
    colorFrom: '#C9A85C',
    colorTo: '#E8C060',
    textColor: '#ffffff',
    label: 'Open Invitation',
  },
  countdown: {
    daysColor: '#C5447A',
    hoursColor: '#7A5AB8',
    minutesColor: '#4A8AB8',
    secondsColor: '#4AB890',
  },
  gallery: {
    autoPlay: true,
    speed: 5,
    zoomScale: 1.18,
    zoomDirection: 'alternate',
    fadeDuration: 0.9,
    slideDirection: 'rtl',
    effect: 'zoom-slide',
    showCaptions: true,
    showDots: true,
    showArrows: true,
    overlayOpacity: 30,
    images: DEFAULT_GALLERY_IMAGES,
  },
};

// ─── Theme 2 — Gold Foil & White Card ────────────────────────────────────────
export const goldfoilTheme: WeddingTheme = {
  preset: 'goldfoil',
  couple: DEFAULT_COUPLE,
  fonts: {
    script: "'Great Vibes', cursive",
    serif: "'Cormorant Garamond', serif",
    sans: "'Montserrat', sans-serif",
  },
  sizes: DEFAULT_SIZES,
  colors: {
    gold: '#B8960C',
    primaryRose: '#7A6020',
    accentPink: '#C9A835',
    bodyText: '#4A3C18',
    subtitleText: '#6A5428',
    labelText: '#8A7040',
  },
  bg: {
    color1: '#FFFEF8',
    color2: '#FDF9ED',
    color3: '#FFFDF4',
    color4: '#FBF6E4',
    color5: '#FFFEF8',
    color6: '#FDF8E8',
    speed: 35,
  },
  card: {
    bgOpacity: 1.0,
    borderColor: '#C9A835',
  },
  button: {
    colorFrom: '#B8960C',
    colorTo: '#E8C84A',
    textColor: '#3A2A08',
    label: 'Open Invitation',
  },
  countdown: {
    daysColor: '#B8960C',
    hoursColor: '#A07C0A',
    minutesColor: '#C9A835',
    secondsColor: '#8B6914',
  },
  gallery: {
    autoPlay: true,
    speed: 5,
    zoomScale: 1.12,
    zoomDirection: 'in',
    fadeDuration: 1.2,
    slideDirection: 'rtl',
    effect: 'zoom-fade',
    showCaptions: true,
    showDots: true,
    showArrows: true,
    overlayOpacity: 20,
    images: DEFAULT_GALLERY_IMAGES.map(img => ({ ...img, frame: '#D4AF37' })),
  },
};

// ─── Context ───────────────────────────────────────────────────────────────────
type SectionKey = keyof WeddingTheme;
type Update<K extends SectionKey> = Partial<WeddingTheme[K]>;

interface ThemeContextValue {
  theme: WeddingTheme;
  update: <K extends SectionKey>(section: K, values: Update<K>) => void;
  reset: () => void;
  loadTheme: (t: WeddingTheme) => void;
  switchPreset: (preset: 'wildflower' | 'goldfoil') => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<WeddingTheme>(defaultTheme);

  function update<K extends SectionKey>(section: K, values: Update<K>) {
    setTheme(prev => ({
      ...prev,
      [section]: { ...prev[section], ...values },
    }));
  }

  function reset() {
    setTheme(prev =>
      prev.preset === 'goldfoil'
        ? { ...goldfoilTheme, couple: prev.couple }
        : { ...defaultTheme, couple: prev.couple }
    );
  }

  function loadTheme(t: WeddingTheme) {
    setTheme(t);
  }

  function switchPreset(preset: 'wildflower' | 'goldfoil') {
    setTheme(prev => {
      const base = preset === 'goldfoil' ? goldfoilTheme : defaultTheme;
      return { ...base, couple: prev.couple };
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, update, reset, loadTheme, switchPreset }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
