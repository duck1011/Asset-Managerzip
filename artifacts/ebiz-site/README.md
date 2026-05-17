# NorthSouth E-Business Platform

A modern, multilingual e-business platform for digital agency services, media management, and client consultations. Built with React + Vite and a premium design system.

---

## Features

- **Multi-page site** — Home, About, Services, Media Studio, Booking, Consultation, Dashboard
- **3-step booking flow** — service selection, scheduling, Pay Now / Pay Later confirmation
- **Free consultation scheduling** — form submission with printable receipt
- **Media Studio** — add images to a masonry gallery; click to expand, right-click to delete
- **Dashboard** — unified view of bookings and consultations with left-border color indicators; isolated single-receipt printing
- **AI Chatbot** — floating chatbot with rule-based logic, bilingual EN/ID toggle, resets on close
- **Bilingual** — full English and Bahasa Indonesia support via a language context
- **localStorage persistence** — all bookings and consultations survive page refresh

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 7 |
| Styling | Tailwind CSS v4 |
| Routing | wouter |
| Animation | Framer Motion |
| Icons | Lucide React |
| Toasts | react-hot-toast |
| Date formatting | date-fns |
| UI primitives | shadcn/ui |

---

## Brand Guidelines

### Colors

| Token | Hex | Usage |
|---|---|---|
| Midnight Slate | `#0F172A` | Page headings, dark sections, navbar |
| Electric Cyan | `#06B6D4` | Primary accent, CTAs, active states |
| Hover Cyan | `#22D3EE` | Hover state on cyan elements |
| Slate Body | `#334155` | Body text |
| Slate Muted | `#64748B` | Secondary / muted text |
| Page BG | `#F8FAFC` | Light page background |

### Typography

| Role | Font | Weight |
|---|---|---|
| Headings / Logo | Space Grotesk | 600–700 |
| Body / UI | Inter | 400–500 |
| Monospace (IDs) | Menlo / system-mono | 700 |

### UI Tokens

- **Cards**: `rounded-xl`, `shadow-sm`, `hover:shadow-lg hover:-translate-y-1 transition-all duration-300`
- **Buttons**: `rounded-full`
- **Inputs**: `rounded-xl`, `focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100`
- **Section spacing**: `py-24` (standard), `py-32` (hero/feature sections)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type-check
npm run typecheck

# Build for production
npm run build
```

> **Note:** This project is part of a pnpm monorepo. When running from the repo root, use:
> ```bash
> pnpm --filter @workspace/ebiz-site run dev
> ```

---

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── ui/              # shadcn/ui primitives (Button, Input, Card…)
│   ├── Chatbot.tsx      # Floating bilingual AI chatbot
│   ├── MediaCard.tsx    # Gallery image card
│   └── ServiceCard.tsx  # Service display card with select action
├── context/
│   └── LanguageContext.tsx   # EN/ID language provider + hook
├── data/
│   └── mock.ts              # All mock data (services, media gallery, profile)
├── i18n/
│   └── translations.ts      # Full EN + ID translation strings
├── lib/
│   ├── id.ts                # generateShortId() — NS-XXXXX format
│   └── utils.ts             # cn() utility
├── pages/
│   ├── Home.tsx
│   ├── Profile.tsx
│   ├── Services.tsx
│   ├── Media.tsx
│   ├── Booking.tsx
│   ├── Consultation.tsx
│   ├── ConsultationReceipt.tsx
│   ├── Dashboard.tsx
│   └── not-found.tsx
├── App.tsx                  # Router setup + global providers
├── main.tsx
└── index.css                # Tailwind config + CSS variables + print CSS
```

---

## localStorage Schema

| Key | Contents |
|---|---|
| `userBookings` | `Booking[]` — id, service, date, timeSlot, name, email, phone, status, createdAt |
| `consultations` | `Consultation[]` — id, name, email, need, date, createdAt |
| `selectedService` | Transient — service object passed from Services → Booking page |

---

## License

MIT — feel free to use this as a starting point for your own agency platform.
