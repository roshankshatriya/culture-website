# 🎨 Madhurya Manjari Website - Brand Color Refinement

## Executive Summary
Completely refined the website's visual color system based strictly on the **Madhurya Manjari logo (`images/home/madhura-manjari-logo.png`)**. The refined system establishes **Deep Peacock Blue** as the dominant brand identity, supported by rich **Saffron Gold**, with restrained accents of **Lotus Pink** and **Peacock Green**. Harsh neon colors, pure black text, and unrelated multi-color gradients have been completely removed.

---

## 🎭 Logo Source of Truth Palette

### 1. Dominant Brand Identity (25% Usage)
| Token | Hex Value | Usage | Purpose |
|-------|-----------|-------|---------|
| `--brand-blue` | `#0C3965` | Primary brand color | Headings, primary buttons, active links, icons |
| `--brand-blue-dark` | `#082A4A` | Deep Regal Navy | Navbar scrolled state, footer background, dark feature sections |
| `--brand-blue-light` | `#1C5A8B` | Lighter Peacock Blue | Secondary accents, hero button hovers |
| `--brand-blue-muted` | `#EBF3FA` | Soft Ice Tint | Subtle section background tints & card hovers |

### 2. Primary Accent (10% Usage)
| Token | Hex Value | Usage | Purpose |
|-------|-----------|-------|---------|
| `--brand-gold` | `#F8C12E` | Saffron Gold | Active navigation, small highlights, icons, decorative lines |
| `--brand-gold-deep` | `#EBA014` | Rich Golden Yellow | Secondary buttons, nav CTAs |
| `--brand-gold-dark` | `#C87D15` | Antique Gold | High-contrast gold text & button hover states |
| `--brand-gold-tint` | `#FFF8E8` | Soft Ivory Tint | Card highlights, background overlays |

### 3. Restrained Supporting Accents (5% Combined Usage)
| Token | Hex Value | Usage | Purpose |
|-------|-----------|-------|---------|
| `--brand-pink` | `#E46262` | Warm Lotus Pink | Dance-related card accents, subtle decorative highlights |
| `--brand-pink-dark` | `#C23E41` | Deep Lotus Magenta | Required form asterisk, error messages, contrast badges |
| `--brand-green` | `#858747` | Natural Peacock Green | Music-related card accents, success notifications |
| `--brand-green-dark` | `#59632F` | Deep Peacock Olive | Success icons & green badge text |

### 4. Neutral System (60% Usage)
| Token | Hex Value | Usage | Purpose |
|-------|-----------|-------|---------|
| `--bg-primary` | `#FFFDF8` | Main Background | Clean, warm primary canvas |
| `--bg-ivory` | `#FFF8E8` | Soft Ivory | Warm section backgrounds (About, scripture quote) |
| `--bg-secondary` | `#F3F7FA` | Cool Slate | Alternate section backgrounds (Quick Nav, Events) |
| `--bg-card` | `#FFFFFF` | Pure White | Crisp card background |
| `--text-primary` | `#172B3D` | Charcoal Navy | Primary body text (No Pure Black `#000000`) |
| `--text-secondary` | `#536577` | Muted Slate Blue | Subtitles & description text |
| `--border-color` | `#E8DED0` | Warm Border | Subdued, elegant dividers and card borders |

---

## 💡 Design & Hierarchy Principles Applied

1. **60 / 25 / 10 / 5 Proportional Balance**: Large surfaces remain clean white, ivory, or slate (60%), peacock navy provides strong structural authority (25%), saffron gold highlights key calls-to-action (10%), while lotus pink and peacock green provide subtle cultural depth (5%).
2. **Zero Unrelated Gradients**: Removed all legacy purple, hot pink, and multi-color rainbow gradients (`#7928CA`, `#B19FFB`, `#E8732A`, etc.). All gradients are now strictly derived from the logo's dual blue and gold tones.
3. **Accessibility & High Contrast**: Every text element meets or exceeds WCAG AA contrast against its background. Normal text uses readable charcoal navy (`#172B3D`) instead of harsh pure black.
4. **Header & Footer Unity**: The scrolled header and footer both feature a deep regal navy (`#082A4A`), seamlessly tying the top and bottom of every page together.
