# Personal Website Style Guide

## Typography

### Fonts
- **Body Text**: Inter (via `--font-inter`)
- **Headings**: Space Grotesk (via `--font-space-grotesk`) - ONLY for main hero title
- **Monospace**: System mono font

### Font Sizes & Weights
- **Hero Title**: `text-5xl font-bold tracking-tight` + `font-[family-name:var(--font-inter)]`
- **Section Headers**: `text-xs uppercase tracking-[0.2em] font-bold text-gray-500`
- **Body Text**: `text-[15px] font-light leading-relaxed text-gray-700`
- **Emphasis**: `text-[15px] font-semibold text-gray-700`
- **Links**: `text-[#7C3AED] font-semibold hover:underline`
- **Navigation**: `text-xs uppercase tracking-[0.15em] font-bold text-gray-500`
- **Footer**: `text-xs font-mono tracking-wider text-gray-500`

## Colors

### Primary Palette
- **Purple Accent**: `#7C3AED` (primary purple)
- **Purple Hover**: `#6D28D9` (darker purple)
- **Light Purple**: `#C4B5FD` (for dots/subtle accents)

### Text Colors
- **Primary Text**: `text-gray-700` (body)
- **Secondary Text**: `text-gray-600` (less important)
- **Tertiary Text**: `text-gray-500` (labels, captions)
- **Heading Text**: `text-gray-900` (only for emphasis)

### Background Colors
- **Main**: `bg-white`
- **Subtle**: `bg-gray-50` to `bg-gray-100`
- **Cards**: `bg-white/40 backdrop-blur-sm`
- **Borders**: `border-gray-300` or `border-gray-200`

## Components

### Arrows & Bullets
- **Arrow Character**: `→`
- **Arrow Styling**: `text-[#7C3AED] font-bold`
- **Arrow Positioning**: `mt-0` (aligned with first line of text)
- **Bullet Dots**: `w-2 h-2 bg-[#C4B5FD] rounded-full`
- **Bullet Positioning**: `top-[6px]` (aligned with text baseline)

### Section Headers
```tsx
<p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 flex items-center gap-2 font-bold">
  <span className="w-2 h-2 bg-[#7C3AED] rounded-full animate-pulse" />
  section title
</p>
```

### Timeline Items
```tsx
<div className="relative pl-8">
  <div className="absolute left-0 top-[6px] w-2 h-2 bg-[#C4B5FD] rounded-full" />
  <p className="text-gray-700 leading-relaxed font-light text-[15px]">
    timeline content
  </p>
</div>
```

### List Items
```tsx
<div className="flex gap-3 group hover:translate-x-2 transition-transform">
  <span className="text-[#7C3AED] mt-0 group-hover:scale-125 transition-transform font-bold">→</span>
  <p className="text-gray-700 group-hover:text-gray-900 transition-colors font-light text-[15px] leading-relaxed">
    list item content
  </p>
</div>
```

### Buttons
```tsx
<button className="px-6 py-3 bg-[#7C3AED] text-white rounded font-bold uppercase text-xs tracking-wider hover:bg-[#6D28D9] transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg hover:shadow-[#7C3AED]/50">
  button text
</button>
```

### Cards
```tsx
<div className="bg-white/40 backdrop-blur-sm border-2 border-gray-300 rounded-lg p-6 hover:border-[#7C3AED] transition-all hover:shadow-xl hover:shadow-[#7C3AED]/10">
  card content
</div>
```

### Expandable Sections
```tsx
<button className="w-full bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg p-6 text-left">
  <div className="flex justify-between items-center">
    <h3 className="text-xs uppercase tracking-[0.2em] text-gray-600 font-bold">
      SECTION TITLE
    </h3>
    <span className="text-[#7C3AED] font-bold text-xs uppercase tracking-wider hover:underline">
      OPEN / CLOSE
    </span>
  </div>
</button>
```

## Spacing

### Vertical Spacing
- **Between Sections**: `mb-16`
- **Within Sections**: `mb-8` or `mb-6`
- **List Items**: `space-y-3` or `space-y-6`
- **Timeline Items**: `space-y-8`

### Horizontal Spacing
- **Navigation Links**: `gap-6`
- **List Items**: `gap-3`
- **Icon + Text**: `gap-2`

## Animations

### Hover Effects
- **Scale Up**: `hover:scale-105` (buttons)
- **Scale Arrow**: `group-hover:scale-125` (arrows)
- **Translate**: `hover:translate-x-2` (list items)
- **Underline**: Animated from left to right

### Pulse Animation
- **Dots**: `animate-pulse` (section header dots only)
- **Cursor**: Custom blink animation

## Backgrounds

### Gradient Orbs
```tsx
<div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#7C3AED]/20 rounded-full blur-3xl animate-pulse" />
<div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
```

### Grid Pattern
```tsx
<div className="absolute inset-0 opacity-[0.02]">
  <div className="h-full w-full" style={{
    backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
    backgroundSize: '80px 80px'
  }} />
</div>
```

## Layout

### Max Width
- **Main Content**: `max-w-4xl mx-auto`
- **Reading Content**: `max-w-3xl mx-auto` or `max-w-2xl`

### Padding
- **Page Sections**: `px-6 py-16` or `px-6 pt-48 pb-20`
- **Cards**: `p-6` or `p-8`

## Navigation

### Fixed Navigation
```tsx
<div className="fixed top-8 right-8 z-50 flex items-center gap-6 text-xs uppercase tracking-[0.15em] font-bold h-14">
  <Link href="#" className="text-gray-500 hover:text-[#7C3AED] transition-colors">
    Link Text
  </Link>
</div>
```

## Links

### Text Links
- **Color**: `text-[#7C3AED]`
- **Hover**: `hover:text-[#6D28D9]` or `hover:underline`
- **Font Weight**: `font-semibold`

### Animated Underline
```tsx
<span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#7C3AED] group-hover:w-full transition-all duration-300" />
```

## Forms & Inputs

### Input Fields
```tsx
<input className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition-all" />
```

## Accessibility

- Use semantic HTML (`header`, `main`, `section`, `nav`)
- Include hover states for all interactive elements
- Maintain adequate color contrast ratios
- Use `transition-colors` or `transition-all` for smooth state changes

## Dos and Don'ts

### ✅ Do
- Use consistent spacing (multiples of 4: 8px, 12px, 16px, 24px)
- Keep text hierarchy clear (weight + size + color)
- Use purple accent sparingly for emphasis
- Maintain light, airy feel with generous whitespace
- Align arrows and bullets perfectly with text baseline

### ❌ Don't
- Mix different shades of purple outside the defined palette
- Use heavy font weights except for tiny uppercase headers
- Add borders heavier than 2px
- Use animations that are too aggressive
- Misalign bullets or arrows with their text
- Use different font sizes for body text (stick to 15px)

## Responsive Design

- Use `md:` prefix for tablet+ styles
- Stack horizontal layouts vertically on mobile
- Reduce padding on mobile (`px-6` on mobile, `px-8` on desktop)
- Adjust hero title from `text-5xl` to `text-4xl` on mobile

## Code Style

- Use Tailwind utility classes
- Group related utilities (e.g., all text styles together)
- Order: positioning → display → spacing → sizing → colors → effects
- Use consistent naming for component variations
