# VantoOS Architecture Documentation

## Overview

VantoOS is an AI-powered executive dashboard built as a modern Next.js application. This document provides a comprehensive technical overview of the system architecture for AI development tools and developers.

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Layers](#architecture-layers)
3. [Data Flow](#data-flow)
4. [Routing Structure](#routing-structure)
5. [State Management](#state-management)
6. [Styling Approach](#styling-approach)
7. [Component Architecture](#component-architecture)
8. [Responsive Design Strategy](#responsive-design-strategy)
9. [Theme System](#theme-system)
10. [Extension Points](#extension-points)
11. [Deployment Architecture](#deployment-architecture)

---

## System Overview

### Technology Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | 15.3.7 |
| Language | TypeScript | 5.8.3 |
| UI Library | React | 18.3.1 |
| Styling | Tailwind CSS | 3.4.17 |
| UI Components | shadcn/ui (Radix UI) | Latest |
| Icons | Lucide React | 0.575.0 |
| Font | Inter (Google Fonts) | - |
| Package Manager | Bun | Latest |
| Linter | Biome + ESLint | - |

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    Next.js App                        │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │                 Layout (Root)                    │ │   │
│  │  │  ┌─────────────┬──────────────────────────────┐ │ │   │
│  │  │  │   Sidebar   │         Page Content         │ │ │   │
│  │  │  │   (Desktop) │                              │ │ │   │
│  │  │  │             │  ┌────────────────────────┐  │ │ │   │
│  │  │  │             │  │   Page Components      │  │ │ │   │
│  │  │  │             │  │   (Cards, Lists, etc.) │  │ │ │   │
│  │  │  │             │  └────────────────────────┘  │ │ │   │
│  │  │  └─────────────┴──────────────────────────────┘ │ │   │
│  │  │  ┌─────────────────────────────────────────────┐ │ │   │
│  │  │  │          Mobile Navigation (Bottom)          │ │   │
│  │  │  └─────────────────────────────────────────────┘ │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Architecture Layers

### 1. Presentation Layer (`src/app/`)

The presentation layer contains all page components and layouts using the Next.js App Router pattern.

```
src/app/
├── layout.tsx          # Root layout (fonts, metadata, providers)
├── ClientBody.tsx      # Client-side hydration wrapper
├── globals.css         # Global styles and CSS variables
├── page.tsx            # Dashboard (home page)
├── tasks/page.tsx      # Tasks management
├── calendar/page.tsx   # Calendar view
├── email/page.tsx      # Email inbox
├── finance/page.tsx    # Financial tracking
├── travel/page.tsx     # Travel management
├── shopping/page.tsx   # Shopping lists
└── settings/page.tsx   # User settings
```

### 2. Component Layer (`src/components/`)

Reusable UI components are organized into two categories:

```
src/components/
├── sidebar.tsx         # Desktop sidebar navigation
├── mobile-nav.tsx      # Mobile bottom navigation
└── ui/                 # shadcn/ui primitive components
    ├── button.tsx
    ├── card.tsx
    ├── avatar.tsx
    └── badge.tsx
```

### 3. Utility Layer (`src/lib/`)

Shared utilities and helper functions:

```
src/lib/
└── utils.ts            # cn() utility for Tailwind class merging
```

---

## Data Flow

### Current State: Mock Data

VantoOS currently uses **inline mock data** within each page component. This is intentional for rapid prototyping and visual development.

```typescript
// Example: Tasks in tasks/page.tsx
const tasks = [
  { title: "Complete Q1 Report", priority: "high", due: "Today", autoScheduled: true },
  { title: "Review marketing plan", priority: "medium", due: "Tomorrow", autoScheduled: false },
];
```

### Future State: API Integration

The architecture is designed to easily transition to API-based data fetching:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   UI Layer   │ ──> │  API Layer   │ ──> │   Database   │
│  (React)     │     │  (Next.js)   │     │  (Postgres)  │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │
       └────────────────────┘
       Server Components can
       fetch data directly
```

### Data Flow Patterns

1. **Top-Down Props**: Parent components pass data to children
2. **Local State**: Component-level state for UI interactions (collapsed sidebar, dark mode)
3. **URL State**: Page routing determines active view

---

## Routing Structure

### Route Map

| Route | Page Component | Description |
|-------|---------------|-------------|
| `/` | `page.tsx` | Dashboard with AI agenda and summaries |
| `/tasks` | `tasks/page.tsx` | Task management (Kanban/List) |
| `/calendar` | `calendar/page.tsx` | Week view calendar |
| `/email` | `email/page.tsx` | Superhuman-style inbox |
| `/finance` | `finance/page.tsx` | Financial tracking (ZAR) |
| `/travel` | `travel/page.tsx` | Travel bookings |
| `/shopping` | `shopping/page.tsx` | Shopping lists and orders |
| `/settings` | `settings/page.tsx` | User preferences |

### Navigation Flow

```
                    ┌────────────────┐
                    │   Dashboard    │
                    │      (/)       │
                    └───────┬────────┘
        ┌───────────────────┼───────────────────┐
        │           │           │           │
   ┌────▼───┐  ┌────▼───┐  ┌────▼────┐  ┌───▼────┐
   │ Tasks  │  │Calendar│  │  Email  │  │ More   │
   │/tasks  │  │/calendar│ │ /email  │  │ Menu   │
   └────────┘  └─────────┘ └─────────┘  └───┬────┘
                                            │
                    ┌───────────────────────┼───────────────────────┐
                    │           │           │           │
               ┌────▼────┐ ┌────▼────┐ ┌────▼────┐ ┌────▼────┐
               │ Finance │ │ Travel  │ │Shopping │ │Settings │
               │/finance │ │/travel  │ │/shopping│ │/settings│
               └─────────┘ └─────────┘ └─────────┘ └─────────┘
```

### Route Detection

Routes are detected using the `usePathname()` hook from Next.js:

```typescript
const pathname = usePathname();
const isActive = pathname === item.href;
```

---

## State Management

### Current Approach: Local State

VantoOS uses React's built-in state management:

| State Type | Implementation | Example |
|------------|---------------|---------|
| UI State | `useState` | Sidebar collapsed state |
| Theme State | `useState` + DOM | Dark mode toggle |
| Route State | Next.js Router | Active page |

### State Locations

```typescript
// Sidebar state (sidebar.tsx)
const [collapsed, setCollapsed] = useState(false);
const [darkMode, setDarkMode] = useState(false);

// No global state management library required yet
```

### Future State Considerations

For backend integration, consider:

1. **React Server Components**: For data fetching
2. **React Query / SWR**: For client-side caching
3. **Zustand**: For global client state (if needed)
4. **Context API**: For theme/user preferences

---

## Styling Approach

### Tailwind CSS Configuration

VantoOS uses a customized Tailwind CSS setup with CSS variables for theming.

#### Color System

```css
/* Light Mode (globals.css) */
--primary: 223 87% 63%;        /* Blue #5B7CEE */
--accent: 280 87% 65%;         /* Purple (AI features) */
--background: 0 0% 100%;       /* White */
--foreground: 222 47% 11%;     /* Dark text */
--secondary: 210 40% 96%;      /* Light gray */
--border: 214 32% 91%;         /* Subtle borders */

/* Dark Mode */
--background: 222 47% 11%;     /* Dark background */
--foreground: 210 40% 98%;     /* Light text */
--card: 217 33% 17%;           /* Dark cards */
```

#### Border Radius System

```css
--radius: 0.75rem;  /* 12px - used for cards */
```

### Class Naming Conventions

```typescript
// Use semantic color classes
className="bg-primary text-primary-foreground"

// Use spacing utilities
className="p-6 mb-6 gap-4"

// Use responsive prefixes
className="lg:ml-64 p-4 lg:p-8"
```

### The `cn()` Utility

All components use the `cn()` utility for class merging:

```typescript
import { cn } from "@/lib/utils";

// Merges classes intelligently, handles conflicts
className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}
```

---

## Component Architecture

### Component Types

1. **Page Components** (`src/app/**/page.tsx`)
   - Full page layouts
   - Data fetching (future)
   - Composition of smaller components

2. **Layout Components** (`Sidebar`, `MobileNav`)
   - Navigation and structure
   - Shared across all pages
   - Handle responsive behavior

3. **UI Primitives** (`src/components/ui/`)
   - Reusable, unstyled base components
   - Built on Radix UI primitives
   - Customized with Tailwind

### Component Composition Pattern

```tsx
// Page component structure
export default function PageName() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />
      <main className="lg:ml-64 p-4 lg:p-8 pb-20 lg:pb-8">
        {/* Page content */}
        <Card className="p-6 mb-6">
          {/* Card content */}
        </Card>
      </main>
    </div>
  );
}
```

### Props Pattern

Components use TypeScript interfaces with Radix UI patterns:

```typescript
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
```

---

## Responsive Design Strategy

### Breakpoint System

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Default | 0-639px | Mobile-first base styles |
| `sm:` | 640px+ | Small tablets |
| `md:` | 768px+ | Tablets |
| `lg:` | 1024px+ | Desktop (sidebar visible) |
| `xl:` | 1280px+ | Large screens |
| `2xl:` | 1536px+ | Extra large screens |

### Navigation Strategy

```
Mobile/Tablet (<1024px):
┌─────────────────────────────────────┐
│           Page Content              │
│                                     │
│                                     │
├─────────────────────────────────────┤
│  🏠  │  ✓  │  📅  │  ✉️  │  •••  │  ← Bottom Nav
└─────────────────────────────────────┘

Desktop (≥1024px):
┌─────────┬───────────────────────────┐
│         │                           │
│ Sidebar │      Page Content         │
│         │                           │
│         │                           │
└─────────┴───────────────────────────┘
```

### Responsive Patterns

```css
/* Sidebar: Hidden on mobile, visible on desktop */
.sidebar {
  @apply hidden lg:flex;
}

/* Mobile nav: Visible on mobile, hidden on desktop */
.mobile-nav {
  @apply lg:hidden;
}

/* Main content: Accounts for sidebar on desktop */
.main-content {
  @apply lg:ml-64 p-4 lg:p-8 pb-20 lg:pb-8;
}
```

---

## Theme System

### Implementation

Dark mode is implemented using CSS classes and React state:

```typescript
// sidebar.tsx
const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [darkMode]);
```

### Tailwind Dark Mode Config

```typescript
// tailwind.config.ts
export default {
  darkMode: ["class"],
  // ...
}
```

### CSS Variable Switching

```css
/* globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
}

.dark {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
}
```

### Theme Persistence (Future)

To persist theme preference:

```typescript
// Store in localStorage
useEffect(() => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") setDarkMode(true);
}, []);

useEffect(() => {
  localStorage.setItem("theme", darkMode ? "dark" : "light");
}, [darkMode]);
```

---

## Extension Points

### Adding New Pages

1. Create `src/app/[route]/page.tsx`
2. Add route to `menuItems` in `sidebar.tsx`
3. Optionally add to `mobileMenuItems` in `mobile-nav.tsx`

### Adding New UI Components

1. Add component to `src/components/ui/`
2. Follow shadcn/ui patterns (Radix primitives + CVA variants)
3. Export from component file

### Adding New Features

| Feature | Location | Pattern |
|---------|----------|---------|
| New page section | `src/app/[page]/page.tsx` | Add Card with content |
| New navigation item | `sidebar.tsx` + `mobile-nav.tsx` | Add to menuItems array |
| New UI variant | `src/components/ui/` | Add to CVA variants |
| New utility | `src/lib/utils.ts` | Export function |

### API Integration Points

```typescript
// Server Component (future)
async function getData() {
  const res = await fetch('/api/tasks');
  return res.json();
}

// Client Component with React Query (future)
const { data: tasks } = useQuery('tasks', fetchTasks);
```

---

## Deployment Architecture

### Build Process

```bash
# Development
bun run dev          # Starts Turbopack dev server

# Production Build
bun run build        # Creates optimized production build
bun run start        # Starts production server
```

### Deployment Targets

#### Netlify (Configured)

```toml
# netlify.toml
[build]
  command = "bun run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

#### Vercel (Native)

No configuration needed - Next.js is optimized for Vercel.

### Environment Variables

For future backend integration:

```bash
# .env.local
DATABASE_URL=postgresql://...
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Production Considerations

1. **Static Assets**: Served from `public/` directory
2. **Image Optimization**: Use `next/image` for optimized images
3. **Font Loading**: Inter font loaded via `next/font/google`
4. **Code Splitting**: Automatic via Next.js App Router

---

## File Dependencies Graph

```
src/app/layout.tsx
├── globals.css
├── ClientBody.tsx
└── Inter (next/font/google)

src/app/page.tsx (Dashboard)
├── src/components/sidebar.tsx
│   ├── src/components/ui/button.tsx
│   │   └── src/lib/utils.ts
│   └── src/lib/utils.ts
├── src/components/mobile-nav.tsx
│   └── src/lib/utils.ts
├── src/components/ui/card.tsx
├── src/components/ui/badge.tsx
├── src/components/ui/avatar.tsx
├── src/components/ui/button.tsx
└── lucide-react (icons)
```

---

## Summary

VantoOS follows a clean, modular architecture optimized for:

- **Developer Experience**: TypeScript, hot reloading, modern tooling
- **Performance**: Next.js App Router, Turbopack, optimized builds
- **Maintainability**: Component-based structure, utility-first CSS
- **Extensibility**: Clear patterns for adding pages, components, and features
- **AI Tool Compatibility**: Well-documented structure for AI-assisted development

For component-specific documentation, see [COMPONENTS.md](./COMPONENTS.md).
