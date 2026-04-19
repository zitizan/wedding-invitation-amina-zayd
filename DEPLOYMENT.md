# 🚀 Deployment Guide

## Repository Information
- **Repository URL:** https://github.com/zitizan/wedding-invitation-amina-zayd
- **Branch:** main
- **Status:** Repository created, code committed locally

## Push to GitHub

### Option 1: Using GitHub CLI (Recommended)
```bash
gh auth login
git push -u origin main
```

### Option 2: Using Personal Access Token
1. Go to GitHub Settings → Developer Settings → Personal Access Tokens
2. Generate a new token with `repo` permissions
3. Use the token when prompted for password:
```bash
git push -u origin main
# Username: zitizan
# Password: <your-personal-access-token>
```

### Option 3: Using SSH
```bash
# Set up SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"
# Add SSH key to GitHub account
# Then change remote URL:
git remote set-url origin git@github.com:zitizan/wedding-invitation-amina-zayd.git
git push -u origin main
```

## Deploy to Hosting

### Vercel (Recommended)
1. Visit https://vercel.com
2. Import your GitHub repository
3. Vercel will auto-detect Vite configuration
4. Deploy!

### Netlify
1. Visit https://netlify.com
2. Connect to GitHub
3. Select the repository
4. Build command: `pnpm build`
5. Publish directory: `dist`
6. Deploy!

### GitHub Pages
```bash
pnpm add -D gh-pages
# Add to package.json scripts:
# "deploy": "vite build && gh-pages -d dist"
pnpm run deploy
```

## Environment Setup

No environment variables required for basic functionality. Optional configurations:
- WhatsApp number (editable via CMS panel)
- Custom audio files (place in `public/`)

## Next Steps
1. Push code to GitHub using one of the methods above
2. Deploy to your preferred hosting platform
3. Share the live URL with your wedding guests!

## 📱 QR Code Generation
Once deployed, create a QR code for the live URL to share on wedding invitations:
- Use https://www.qr-code-generator.com
- Link to your deployed site
- Print on physical invitations

---

Need help? Check the main README.md for detailed documentation.
