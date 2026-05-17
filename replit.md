# BrightEdge Digital — E-Business Website

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
- `artifacts/ebiz-site/src/pages/` — Home, Profile, Services, Media
- `artifacts/ebiz-site/src/App.tsx` — wouter router setup

## Architecture decisions

- Frontend-only: no backend, no API calls, no React Query hooks — data comes from mock.ts
- wouter is used for client-side routing (lightweight alternative to react-router)
- React useState for all local state (service card toggle, media gallery additions)
- CSS custom properties in index.css define the full design system palette

## Product

- **Home** (`/`): Hero + service preview + media preview
- **About** (`/profile`): Company mission and about text
- **Services** (`/services`): All 6 services as cards with interactive "Select" toggle
- **Media Studio** (`/media`): Add images to gallery via form + responsive masonry grid

## User preferences

- Simple, readable code — no overcomplicating
- Mobile-first responsive design
- No error handling, no try/catch
- Lucide React for icons throughout

## Gotchas

- No backend or API — do not add fetch/React Query calls
- Keep unused imports out — TypeScript will fail the build
- Do not explicitly import React (JSX transformer handles it automatically)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
