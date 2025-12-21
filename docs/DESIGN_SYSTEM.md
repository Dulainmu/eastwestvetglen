# East West Vets – Design System

## Overview
The design philosophy for East West Vets is **"Premium Holistic"**. It balances the trustworthiness of modern Western medicine with the organic, calming nature of Eastern therapies. The aesthetic is clean, sophisticated, and warm.

## Color Palette

### Primary (Deep Emerald)
Represents nature, health, and professional trust.
- **Variable**: `--primary`
- **Value**: `171 91% 16%` (HSL) / `#044D42` (Hex)
- **Usage**: Primary buttons, headings (`primary-950` equivalent), deep backgrounds.

### Secondary (Soft Sage)
A calming, supporting color for backgrounds and secondary elements.
- **Variable**: `--secondary`
- **Value**: `174 40% 93%` (HSL) / `#E6F4F1` (Hex)
- **Usage**: Section backgrounds, subtle patterns.

### Accent (Warm Gold)
Adds a touch of premium elegance and highlights key actions.
- **Variable**: `--accent`
- **Value**: `45 65% 52%` (HSL) / `#D4AF37` (Hex)
- **Usage**: Icons, highlights, sparse button accents.

### Neutrals
- **Background**: Pure White or very soft off-white.
- **Foreground**: Deep jungle green/black (`#022c22`) for text, avoiding harsh pure black.
- **Muted**: Slate grays for secondary text.

## Typography

### Headings: **Playfair Display**
- **Type**: Serif
- **Feel**: Elegant, Established, Editorial.
- **Usage**: `h1` through `h4`, landing page titles.

### Body: **Outfit**
- **Type**: Sans-serif
- **Feel**: Modern, Clean, Friendly.
- **Usage**: Paragraphs, UI text, navigation, buttons.

## Visual Effects

### Glassmorphism
Used to create depth and a modern feel while maintaining lightness.
- **Style**: `bg-white/80` or `bg-white/5` (dark mode) with `backdrop-blur-md`.
- **Borders**: Thin, semi-transparent borders (e.g., `border-white/20`) to define edges.

### Organic Shapes
Soft, blurred background blobs break up the rigid grid structure, symbolizing the "natural" aspect of the clinic.
- **Implementation**: `rounded-full blur-[100px]` divs with low opacity primary/secondary colors.

### Shadows
Soft, diffused shadows (colored primarily) to lift elements.
- **Class**: `shadow-primary/20`

## Components

### Buttons
- **Shape**: Fully rounded (`rounded-full`).
- **Interaction**: Subtle lift (`-translate-y-0.5`) and shadow expansion on hover.
- **Primary**: Deep emerald background, white text.
- **Secondary**: Transparent background, primary border.

### Cards
- **Style**: Floating effect, often with glassmorphism or white background with soft shadows.
- **Interaction**: Lift on hover.
