# Kho Ký Ức Gia Đình — Living Family Archive (Frontend Redesign)

## Original Problem Statement
Redesign "Family Memory Hub" as a premium, emotionally resonant digital family archive for a Vietnamese extended family — a "Living Family Archive" that feels like a beautifully curated, still-growing family history book. Frontend-design-only phase, pure React with local mock data. No Firebase/backend/security/config changes.

## Architecture (this phase)
- **Pure frontend React** (CRA + craco), react-router-dom v7, TailwindCSS, framer-motion, lenis. No backend calls; all data mocked in `src/data/mockData.js`.
- Design tokens in `tailwind.config.js` + `src/index.css` (heritage palette, Newsreader + Be Vietnam Pro fonts, radius/elevation/focus).

## User Personas
- Older family members (accessibility-first: large controls, ≥44px targets, high contrast, no hover-only).
- Younger relatives curating & uploading memories on mobile.

## Core Requirements (static)
- Editorial photo-journal aesthetic, Vietnamese heritage, warm/timeless. Photography is hero, faces uncropped. Restrained motion (180–300ms), prefers-reduced-motion supported. WCAG AA, semantic headings, visible focus, status never by color alone.

## Implemented (2026-06-08)
- **Design system**: color/type/spacing/radius/elevation tokens; components — Button (via CTAs), EventBadge, MemoryCard, PersonCard, SectionHeading, Marquee, States (skeleton/empty/error/offline), motion primitives (Reveal, MaskedLines, FadeIn, SmoothScroll/Lenis).
- **Navigation**: desktop TopNav (minimal + distinct "Đăng kỷ niệm" CTA + user menu) and mobile BottomNav (5 destinations, central upload FAB).
- **Home** (`/`): masked line-by-line hero reveal + subtle parallax, editorial marquee, "Ngày này năm xưa", numbered manifesto chapters, recent memories grid (with loading skeleton), decade timeline strip, family branches, restrained memorial section.
- **Timeline** (`/dong-thoi-gian`): lightweight decade + event filter chips, entries grouped by year, loading/empty/error states.
- **Memory Detail** (`/ky-niem/:id`): large uncropped photo, caption/story, related people, comments (add), restrained share/edit, not-found state.
- **Upload prototype** (`/dang-ky-niem`): mobile-first 5-step flow (select → preview → details → review → publish) with simulated progress, partial-failure + retry, success. UI simulation only — no real upload backend.
- **Deferred pages** (`/gia-dinh`, `/album`, `/tim-kiem`, `/tuong-nho`): graceful "coming soon" empty states.
- Verified by testing agent: 21/21 frontend assertions passed, no bugs.

## Backlog (not built this phase)
- **P1**: Family page (branches + people, mobile-linear), Albums page (Tết/Sinh nhật/Đám cưới/Du lịch), Search page.
- **P2**: Memorial full experience page; account/admin; real backend wiring (Firebase/Firestore/Cloudinary) — intentionally untouched.

## Files touched (frontend only)
- Config: `public/index.html` (fonts, lang=vi, title), `src/index.css` (tokens/fonts/a11y/utilities), `tailwind.config.js` (palette+fonts), `src/App.css`, `src/App.js` (router+layout+Lenis).
- Data: `src/data/mockData.js`.
- Motion: `src/components/motion/{Reveal,SmoothScroll}.jsx`.
- System: `src/components/system/{EventBadge,SectionHeading,MemoryCard,PersonCard,Marquee,States}.jsx`.
- Layout: `src/components/layout/{TopNav,BottomNav,AppLayout}.jsx`.
- Pages: `src/pages/{Home,Timeline,MemoryDetail,Upload,ComingSoon}.jsx`.
- No backend/security/config files changed. `package.json` gained only `lenis`.
