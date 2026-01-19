# Design Guide

## Concept

**Video Game Terminal Aesthetic + Code UI**

A unique blend of:
- 🕹️ Video game UI elements (status bars, levels, XP)
- 💻 Terminal/console aesthetic (commands, monospace)
- 🎨 Light, minimal design (not dark/cyberpunk)
- 📦 Retro box shadows and borders

## Visual Style

### Typography
- **Font**: JetBrains Mono (monospace)
- **Style**: Code/terminal inspired
- Commands like `$ whoami`, `$ ls projects/`
- File paths like `~/users/anish-polakala`

### Colors
```
Background:     #F9FAFB (light gray)
Cards:          #FFFFFF (white)
Text:           #111827 (black)
Borders:        #000000 (solid black, 2px)
Accents:        #6B7280 (gray)
Status:         #22C55E (green)
```

### Shadows
```css
/* Retro/game-style box shadow */
shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]

/* Creates a solid, offset shadow effect */
/* Similar to old-school UI and pixel art */
```

## Elements

### Header
```
~/users/anish-polakala _
$ whoami

[about] [work] [skills] [contact]
```
- Terminal path with blinking cursor
- Command prompt style
- Bracketed navigation links

### Project Cards
```
┌────────────────────────────────┐
│ ▸ project-name.app    [STATUS]│
│                                │
│ Description here...            │
│                                │
│ STACK: React • Node • AWS      │
│ YEAR: 2024                     │
└────────────────────────────────┘
```
- Solid 2px borders
- Status badges
- Tech stack metadata
- Hover: solid shadow appears

### Skill Bars
```
TypeScript              95%
████████████████████░░  
```
- Progress bar style
- Percentage indicators
- Categorized (LANGUAGES, FRAMEWORKS, etc.)
- Black fill, gray border

### Game Elements
```
LEVEL: 21 | CLASS: Engineer | STATUS: Building

XP: ████████████████░░░░ 820/1000
```
- Character stats
- XP bar (like HP/MP in games)
- Status indicators
- Level/class system

### Status Indicator
```
● SYSTEM_ONLINE
```
- Pulsing green dot
- System status message
- Live indicator feel

## Layout Structure

```
┌─────────────────────────────────┐
│ Terminal Header                 │
│ $ whoami                        │
│ [nav] [links]                   │
├─────────────────────────────────┤
│                                 │
│ [About Box]                     │
│ - Intro text                    │
│ - Status/stats                  │
│ - XP bar                        │
│                                 │
├─────────────────────────────────┤
│                                 │
│ $ ls projects/                  │
│                                 │
│ [Project Card 1]                │
│ [Project Card 2]                │
│ [Project Card 3]                │
│                                 │
├─────────────────────────────────┤
│                                 │
│ $ cat skills.txt                │
│                                 │
│ [Skills Box]                    │
│ - Language bars                 │
│ - Framework bars                │
│ - Infrastructure bars           │
│                                 │
├─────────────────────────────────┤
│                                 │
│ $ connect --user=anish          │
│                                 │
│ [Contact Box]                   │
│ [email] [twitter]               │
│ [github] [linkedin]             │
│                                 │
├─────────────────────────────────┤
│ Footer                          │
│ © 2024  ● SYSTEM_ONLINE         │
└─────────────────────────────────┘
```

## Interactions

### Hover Effects
```css
/* Cards */
hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]

/* Links */
hover:text-gray-900
hover:underline

/* Buttons */
hover:bg-gray-900 hover:text-white
```

### Animations
- Cursor blink (underscore `_`)
- Pulsing status dot
- Smooth transitions on hover
- XP bar width animation

## Key Features

✅ **Terminal Commands**
- `$ whoami` (about section)
- `$ ls projects/` (work section)
- `$ cat skills.txt` (skills section)
- `$ connect --user=anish` (contact)

✅ **Game UI Elements**
- LEVEL, CLASS, STATUS
- XP progress bar
- Status badges ([SHIPPED], [ACTIVE])
- HP-bar style skill levels

✅ **Code Aesthetic**
- Monospace font throughout
- File extensions (.app, .txt)
- Path notation (~/users/)
- Bracket syntax ([about])

✅ **Light Theme**
- White/light gray backgrounds
- Black text and borders
- High contrast, readable
- Professional appearance

## What Makes It Work

1. **Subtle References**: Game elements are present but not overwhelming
2. **Professional**: Still suitable for job applications
3. **Unique**: Stands out from typical portfolios
4. **Readable**: Monospace font is clear and easy to read
5. **Fast**: No heavy animations or JavaScript
6. **Accessible**: High contrast, semantic HTML

## Not Included

- ❌ Pixel art or sprites
- ❌ Dark/neon cyberpunk aesthetic  
- ❌ Heavy animations
- ❌ Sound effects
- ❌ Complex game mechanics
- ❌ Dark mode toggle

## Philosophy

> "Code meets console meets character sheet"

A personal website that feels like:
- A terminal session
- A character status screen  
- A clean code editor

All while staying light, minimal, and professional.

---

**Result**: A memorable portfolio that shows personality without sacrificing professionalism.
