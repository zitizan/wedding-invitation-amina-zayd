#!/bin/bash

# Wedding Invitation - GitHub Push Script
# Repository: https://github.com/zitizan/wedding-invitation-amina-zayd

echo "🚀 Pushing Wedding Invitation to GitHub..."
echo ""

# Check if we have commits
COMMITS=$(git log --oneline | wc -l)
echo "📦 Found $COMMITS commits to push"
git log --oneline -3
echo ""

# Try push with different methods
echo "Attempting to push to GitHub..."
echo ""

# Method 1: Try standard push
echo "Method 1: Standard push..."
if git push -u origin main 2>/dev/null; then
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 View at: https://github.com/zitizan/wedding-invitation-amina-zayd"
    exit 0
fi

echo "⚠️  Standard push failed. Checking authentication..."
echo ""

# Check if gh CLI is available
if command -v gh &> /dev/null; then
    echo "Method 2: Using GitHub CLI..."
    echo "Please run: gh auth login"
    echo "Then run this script again"
    exit 1
fi

echo "📝 Manual Push Instructions:"
echo ""
echo "Option 1 - Install GitHub CLI (Recommended):"
echo "  brew install gh          # macOS"
echo "  gh auth login"
echo "  git push -u origin main"
echo ""
echo "Option 2 - Create a new Personal Access Token:"
echo "  1. Go to: https://github.com/settings/tokens/new"
echo "  2. Select scopes: repo (all), workflow"
echo "  3. Generate token and copy it"
echo "  4. Run: git push -u origin main"
echo "  5. Username: zitizan"
echo "  6. Password: <paste-your-token>"
echo ""
echo "Option 3 - Upload via GitHub Web UI:"
echo "  1. Go to: https://github.com/zitizan/wedding-invitation-amina-zayd"
echo "  2. Click 'Add file' → 'Upload files'"
echo "  3. Drag and drop all files from your project"
echo ""

exit 1
