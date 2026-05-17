# NorthSouth — E-Business Website

A polished multi-page e-business website for a digital agency, built with React + Vite and Tailwind CSS using mock JSON data.

## Run & Operate

- `pnpm --filter @workspace/ebiz-site run dev` — run the frontend (port auto-assigned)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, wouter (routing), Lucide React (icons)
- No backend — all data is mock JSON in `src/data/mock.ts`

## Where things live

- `artifacts/ebiz-site/src/` — main frontend source
- `artifacts/ebiz-site/src/data/mock.ts` — all mock data (profile, services, mediaGallery)
- `artifacts/ebiz-site/src/components/` — Navbar, Footer, ServiceCard, MediaCard
- `artifacts/ebiz-site/src/pages/` — Home, Profile, Services, Media, Booking, Consultation, Dashboard
- `artifacts/ebiz-site/src/App.tsx` — wouter router setup
- `artifacts/ebiz-site/src/i18n/translations.ts` — EN + ID translations
- `artifacts/ebiz-site/src/context/LanguageContext.tsx` — language context/provider
- `artifacts/ebiz-site/public/logo.png` — NorthSouth brand image (all 3 logo variations)

## Architecture decisions

- Frontend-only: no backend, no API calls, no React Query hooks — data comes from mock.ts
- wouter is used for client-side routing (lightweight alternative to react-router)
- React useState for all local state; localStorage for booking persistence
- CSS custom properties in index.css define the full design system palette
- Logo variations are CSS-cropped from the single brand image (public/logo.png)
  - Navbar uses Variation 1 (logo mark, left portion)
  - Footer uses Variation 3 (dark background, bottom-right portion)
  - Favicon references /logo.png

## Product

- **Home** (`/`): Hero + service preview + media preview
- **About** (`/profile`): Company mission and about text
- **Services** (`/services`): All 6 services as cards with interactive "Select" toggle
- **Media Studio** (`/media`): Add images to gallery via form + responsive masonry grid
- **Booking** (`/booking`): 3-step booking flow with simulated payment + localStorage
- **Consultation** (`/consultation`): Free consultation scheduling form
- **Dashboard** (`/dashboard`): Receipt cards from localStorage + print support

## Multilanguage

- English (EN) and Bahasa Indonesia (ID) supported
- Language switcher in Navbar (desktop + mobile)
- All UI text, page content, and service descriptions are translated

## User preferences

- Simple, readable code — no overcomplicating
- Mobile-first responsive design
- No error handling, no try/catch
- Lucide React for icons throughout

## Gotchas

- No backend or API — do not add fetch/React Query calls
- Keep unused imports out — TypeScript will fail the build
- Do not explicitly import React (JSX transformer handles it automatically)
- Logo is cropped from a single brand image via CSS margin offsets — do not use absolute paths or imports for public assets; use `/logo.png` directly in src

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
