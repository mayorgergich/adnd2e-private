#!/bin/bash

# Create necessary directories for Docusaurus site
mkdir -p docs/character
mkdir -p docs/campaigns
mkdir -p docs/tactics
mkdir -p src/css
mkdir -p src/pages
mkdir -p src/components/HomepageFeatures
mkdir -p src/components/SpellLink
mkdir -p static/img

# Move current markdown files to the correct directories
# Character files
[ -f "updated-character-sheet.md" ] && mv updated-character-sheet.md docs/character/
[ -f "sebaldus-connection.md" ] && mv sebaldus-connection.md docs/character/
[ -f "setting-integration.md" ] && mv setting-integration.md docs/character/
[ -f "cleric-spells.md" ] && mv cleric-spells.md docs/character/

# Tactics files
[ -f "monastic-combat.md" ] && mv monastic-combat.md docs/tactics/
[ -f "tactical-guide.md" ] && mv tactical-guide.md docs/tactics/

# Create placeholder SVG files if they don't exist
if [ ! -f "static/img/character-icon.svg" ]; then
  cat > static/img/character-icon.svg << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<svg width="200px" height="200px" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="70" r="40" fill="#8b0000"/>
    <rect x="60" y="110" width="80" height="70" fill="#8b0000"/>
</svg>
EOF
fi

if [ ! -f "static/img/combat-icon.svg" ]; then
  cat > static/img/combat-icon.svg << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<svg width="200px" height="200px" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M40,40 L160,160 M160,40 L40,160" stroke="#8b0000" stroke-width="10"/>
    <circle cx="100" cy="100" r="40" fill="none" stroke="#8b0000" stroke-width="5"/>
</svg>
EOF
fi

if [ ! -f "static/img/campaign-icon.svg" ]; then
  cat > static/img/campaign-icon.svg << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<svg width="200px" height="200px" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M30,50 L100,30 L170,50 L170,160 L30,160 Z" fill="none" stroke="#8b0000" stroke-width="5"/>
    <path d="M100,30 L100,160" stroke="#8b0000" stroke-width="3" stroke-dasharray="5,5"/>
</svg>
EOF
fi

if [ ! -f "static/img/logo.svg" ]; then
  cat > static/img/logo.svg << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<svg width="200px" height="200px" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g>
        <circle cx="100" cy="100" r="90" fill="none" stroke="#8b0000" stroke-width="10"/>
        <text x="100" y="120" font-family="serif" font-size="80" text-anchor="middle" fill="#8b0000">2E</text>
    </g>
</svg>
EOF
fi

# Create placeholder hero image if it doesn't exist
if [ ! -f "static/img/hero-background.jpg" ]; then
  touch static/img/hero-background.jpg
  echo "Please add a hero-background.jpg image to the static/img directory"
fi

# Create placeholder favicon if it doesn't exist
if [ ! -f "static/img/favicon.ico" ]; then
  touch static/img/favicon.ico
  echo "Please add a favicon.ico file to the static/img directory"
fi

# Create a simple intro file for docs section if it doesn't exist
if [ ! -f "docs/intro.md" ]; then
  cat > docs/intro.md << 'EOF'
---
sidebar_position: 1
---

# AD&D 2E Reference

Welcome to your private AD&D 2nd Edition reference site.

## What's Included

This site contains:

- Character information for Augustus "X" Groß
- Campaign setting references
- Combat tactics and eastern monastic techniques
- Spell lists and game mechanics

## Navigation

Use the sidebar navigation to explore different sections:

- **Character** - Character sheet, background information, and setting integration
- **Campaigns** - Campaign settings and references, including Mystara
- **Tactics** - Combat tactics and eastern monastic techniques integration
EOF
fi

echo "Directory structure set up successfully!"
echo "Next steps:"
echo "1. Install dependencies with: npm install"
echo "2. Start the development server with: npm start"
echo "3. Add proper images to the static/img directory"
