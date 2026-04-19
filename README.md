# 💐 Wedding Invitation - Amina & Zayd

A beautiful, mobile-responsive wedding invitation landing page with dual theme system, interactive features, and motion effects.

**Wedding Date:** December 15, 2026 | 7:00 PM  
**Venue:** Grand Palace Hall, Doha, Qatar  
**Location:** 7GQM+55 Doha

## ✨ Features

### 🎨 Dual Theme System
- **Whimsical Wildflower Theme** - Pastel + vibrant mixed colors with watercolor floral textures
- **Gold Foil & White Card Theme** - Elegant botanical decorations with animated gold shimmer text
- Seamless theme switching with preserved content and settings

### 📱 Core Sections
- **Hero Section** - Elegant entrance with animated reveal
- **Countdown Timer** - Real-time countdown to the wedding date
- **Love Story Timeline** - Romantic journey milestones
- **Photo Gallery** - Swipeable image carousel
- **RSVP Section** - Interactive guest count selector (1-10) with WhatsApp integration
- **Location Map** - Google Maps modal with Plus Code integration and Waze support

### 🎭 Motion Effects
- Floating flowers and butterflies
- Sparkle particle animations
- Smooth page transitions
- Interactive hover states

### 🎵 Media Features
- Background music toggle
- Custom audio control

### ⚙️ CMS Panel
- Comprehensive live editing system
- Real-time preview of all changes
- Save/Load functionality (JSON export/import)
- Control over:
  - Couple names, dates, and venue details
  - Color schemes and gradients
  - Typography settings
  - Card opacity and visual effects
  - Theme presets

## 🛠️ Tech Stack

- **React** - UI framework
- **Motion (Framer Motion)** - Advanced animations
- **Tailwind CSS v4** - Styling
- **TypeScript** - Type safety
- **Vite** - Build tool
- **pnpm** - Package manager

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at the preview surface in your development environment.

## 📁 Project Structure

```
src/
├── app/
│   ├── App.tsx                 # Main application
│   ├── components/
│   │   ├── CMSPanel.tsx        # Content management system
│   │   ├── CountdownTimer.tsx  # Wedding countdown
│   │   ├── FloatingCanvas.tsx  # Motion effects layer
│   │   ├── GallerySection.tsx  # Photo gallery
│   │   ├── HeroSection.tsx     # Landing page hero
│   │   ├── InvitationContent.tsx # Main content
│   │   ├── MusicToggle.tsx     # Audio controls
│   │   ├── RSVPSection.tsx     # RSVP with WhatsApp
│   │   ├── StorySection.tsx    # Love story timeline
│   │   ├── WildflowerDecor.tsx # Theme 1 decorations
│   │   └── GoldFoilDecor.tsx   # Theme 2 decorations
│   └── context/
│       └── ThemeContext.tsx    # Theme state management
├── imports/                    # Gallery images
└── styles/
    ├── fonts.css              # Font imports
    ├── theme.css              # Design tokens
    └── tailwind.css           # Tailwind config
```

## 🎨 Customization

### Update Wedding Details
Use the CMS panel (golden gear icon) to edit:
- Couple names
- Wedding date and time
- Venue and location
- Colors and fonts
- All visual properties

### Theme Switching
- Use the floating pill at bottom center
- Or toggle in CMS panel header
- All settings preserved across themes

### WhatsApp Integration
Configure WhatsApp number in CMS panel under "RSVP Settings"

## 📍 Map Integration

The location uses Google Plus Code `7GQM+55 Doha` for precise coordinates. The map modal includes:
- Embedded Google Maps iframe
- Direct "Open in Google Maps" button
- Waze navigation option

## 🎵 Audio Setup

To add custom background music:
1. Add audio file to `public/` directory
2. Update audio source in `MusicToggle.tsx`

## 💾 Export/Import Settings

The CMS panel allows you to:
- **Save Configuration** - Download complete design as JSON
- **Load Configuration** - Upload previously saved design
- Share configurations across deployments

## 📄 License

This project is open source and available for personal use.

## 🙏 Acknowledgments

Built with React, Motion, and Tailwind CSS  
Created with Claude Code

---

Made with 🌸 & love
