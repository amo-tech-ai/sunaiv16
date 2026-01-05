# Sun AI Agency Style Guide

This document defines the exact visual and interactive patterns of the Sun AI Agency platform as of the current implementation.

## 1. Color System

### Base Colors
| Palette | HEX | Usage |
| :--- | :--- | :--- |
| **Main Background** | `#FDFCFB` | Primary page background (warm neutral/off-white) |
| **Intelligence Background** | `#FAF8F6` | Right panel background (slightly darker/softer) |
| **Surface** | `#FFFFFF` | Card backgrounds, selection states |
| **Primary Text** | `#1A1A1A` | Headings, primary actions, active states |
| **Primary Border** | `#EFE9E4` | Panel separators, card borders |
| **Input Border** | `#D1C7BD` | Form field underlines and textarea borders |

### Typography Colors
| Level | HEX | Usage |
| :--- | :--- | :--- |
| **High Emphasis** | `#1A1A1A` | H1, H2, Primary Body |
| **Medium Emphasis** | `#444444` | Right panel intelligence notes |
| **Low Emphasis** | `#666666` | Subtitles, descriptions |
| **Labels / Meta** | `#888888`, `#999999` | Field labels, uppercase tracking text |
| **Disabled / Faint** | `#AAAAAA`, `#CCCCCC` | Placeholder text, inactive progress tracks |

### Status & Accent
| Type | HEX | Usage |
| :--- | :--- | :--- |
| **Accent (Amber)** | `#F59E0B` | Progress indicators, status dots, specific links |
| **Amber Light** | `#FCD34D` | Section accents (e.g., left borders in Step 2) |
| **Success / Recommended** | `#B45309` | "Recommended" badges, phase indicators |

---

## 2. Typography

### Font Families
- **Primary (Sans-Serif):** `Inter`, sans-serif. Used for UI controls, inputs, and functional text.
- **Display (Serif):** `Playfair Display`, serif. Used for primary headings (H1).
- **Narrative (Serif):** `Lora`, serif. Used for intelligence notes and consultant feedback.

### Hierarchy
- **H1 (Display):** `text-4xl` to `text-5xl` (36px to 48px), `font-serif`, `leading-tight`.
- **H2/H3 (Section Titles):** `text-xl` to `text-2xl`, `font-medium` or `font-serif`.
- **Body Large:** `text-lg`, `font-light`.
- **Body Standard:** `text-base` or `text-sm`.
- **Labels:** `text-xs`, `uppercase`, `tracking-widest`.

---

## 3. Spacing & Layout

### Global Layout: 3-Panel System
1. **Context Panel (Left):** 20% width (lg). Fixed/Sticky. Contains progress and summary.
2. **Work Panel (Center):** 50% width (lg). Scrollable. Centered content (`max-w-xl`).
3. **Intelligence Panel (Right):** 30% width (lg). Fixed/Sticky. Background `#FAF8F6`.

### Padding Patterns
- **Large Sections:** `p-8` (32px), `md:p-16` (64px), `lg:p-24` (96px) in the center panel.
- **Internal Spacing:** `space-y-12` (48px) or `space-y-16` (64px) between major work blocks.
- **Group Spacing:** `space-y-6` (24px) for field groups.

---

## 4. Components

### Buttons
- **Primary Block:** `bg-[#1A1A1A] text-white`. Square corners (standard), `py-5`. Transition: `hover:bg-[#333]`.
- **Inactive/Disabled:** `bg-[#EEE] text-[#AAA] cursor-not-allowed`.
- **Selection/Toggle:** `border-[#EFE9E4]`. Active state: `bg-[#1A1A1A] text-white border-[#1A1A1A]`.
- **Pill (Speed Selection):** `rounded-full`, `px-6 py-3`, `border`.

### Inputs & Forms
- **Text Inputs:** `bg-transparent`, `border-b border-[#D1C7BD]`. Focus: `border-[#1A1A1A]`.
- **Textareas:** `border border-[#D1C7BD]`, `p-4`, `resize-none`.
- **Selects:** Custom appearance-none with `border-b`.

### Indicators
- **Progress Bar:** 4px height. Track: `#EFE9E4`. Fill: `#1A1A1A`.
- **Pulse Dot:** Small `amber-400` circle with `animate-pulse` for "live" intelligence.
- **Radial Progress:** SVG-based, 176px diameter, `stroke-amber-500`.

### Content Patterns
- **Badges:** `text-[10px]`, `uppercase`, `tracking-widest`, `font-bold`.
- **Timeline:** Vertical border `[#D1C7BD]` with 10px round nodes `[#1A1A1A]`.

---

## 5. Wizard & Dashboard Patterns

### Wizard Logic
- **Single Decision Focus:** Each screen addresses one primary business dimension.
- **Progressive Intelligence:** The right panel updates notes based on user input length or step changes.

### Dashboard (Post-Wizard)
- **Header:** Bottom border `#EFE9E4`. Title left, status badge right.
- **Grid:** 3-column layout (`md:grid-cols-3`).
- **Cards:** `p-8`, `border-[#EFE9E4]`, `bg-white`. Minimalist typography-driven data.

---

## 6. Responsiveness

- **lg (1024px+):** Three-panel side-by-side architecture. Left and Right panels are sticky.
- **md (768px+):** Inputs transition to 2-column grids.
- **Mobile (<1024px):** Panels stack vertically. Left (Context) becomes a top header/summary, Right (Intelligence) follows below the Center work.

---

## 7. Accessibility

- **Font Sizing:** Minimum body size of `text-sm` (14px), default `text-base` (16px).
- **Interactivity:** Button hit areas are minimum 48px height.
- **Contrast:** High-contrast text (`#1A1A1A` on `#FDFCFB`). Accent colors used for informational status rather than critical navigation.

---

## Visual Summary
The product defines a **Premium, Editorial, and Architectural** aesthetic. It avoids standard SaaS clutter (shadows, rounded buttons, gradients) in favor of **strong borders, fine typography, and structured white space**. It feels like a high-end digital agency proposal rather than a generic software tool.