# 📤 Upload Instructions

## Current Status
✅ GitHub repository created: https://github.com/zitizan/wedding-invitation-amina-zayd  
✅ README.md and .gitignore uploaded  
⏳ Remaining 77 source files need to be uploaded

## Quick Upload Options

### Option 1: Download and Push Locally (Recommended)

1. **Download this entire project folder** to your local machine

2. **Open terminal in the project folder** and run:
```bash
cd /path/to/wedding-invitation-amina-zayd

# Configure git (if not already done)
git config user.name "zitizan"
git config user.email "zitizan@users.noreply.github.com"

# Set remote
git remote add origin https://github.com/zitizan/wedding-invitation-amina-zayd.git

# Push using your token
git push -u origin main --force
# When prompted:
# Username: zitizan
# Password: github_pat_11BV6UUCI0gEqrJHkAUJo4_himQ91RJTN03YpUeVKD3bd3aYSEVSXAesDNLEL9jcKrW244N6QX
```

### Option 2: Upload via GitHub Web Interface

1. Go to: https://github.com/zitizan/wedding-invitation-amina-zayd
2. Click "Add file" → "Upload files"
3. Drag and drop the entire `src/` folder
4. Commit the files
5. Repeat for: `package.json`, `vite.config.ts`, `postcss.config.mjs`, etc.

### Option 3: Use GitHub Desktop

1. Download GitHub Desktop: https://desktop.github.com
2. Clone your repository
3. Copy all files from this project into the cloned folder
4. Commit and push

## Files to Upload

### Configuration Files (Root):
- package.json
- vite.config.ts  
- postcss.config.mjs
- pnpm-workspace.yaml
- .npmrc
- DEPLOYMENT.md

### Source Code (src/):
All files in the `src/` directory including:
- src/app/App.tsx
- src/app/components/ (all 11 components)
- src/app/context/ThemeContext.tsx
- src/styles/ (all CSS files)
- src/imports/ (gallery images)

### Important:
The `.gitignore` file is already uploaded, so `node_modules/` won't be included.

## After Upload

Once all files are pushed:

1. **Deploy to Vercel** (free hosting):
   - Visit: https://vercel.com
   - Import your GitHub repository
   - Deploy automatically!

2. **Share with guests:**
   - Get your live URL
   - Create a QR code
   - Share on invitations

---

Need help? Check DEPLOYMENT.md for detailed deployment instructions.
