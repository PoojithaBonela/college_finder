# Assets Folder Guide

Drop your static files here. They'll be served automatically by Next.js.

## Folder Structure

```
public/assets/
├── logos/           ← App logo (CollegeFinder branding)
├── images/          ← Hero images, banners, backgrounds
├── icons/           ← Custom SVG/PNG icons
└── college-logos/   ← Individual college logo images
```

## How to Use in Code

```tsx
// Next.js Image component (recommended)
import Image from "next/image";

<Image src="/assets/logos/logo.png" alt="CollegeFinder" width={120} height={40} />

// Or plain <img> tag
<img src="/assets/college-logos/iit-bombay.png" alt="IIT Bombay" />
```

## Naming Convention

- Use **lowercase** and **hyphens**: `iit-bombay.png`, `hero-banner.jpg`
- Logos: `.png` or `.svg` (SVG preferred for crispness)
- Photos/banners: `.jpg` or `.webp`
- Icons: `.svg`
