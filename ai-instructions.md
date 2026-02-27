# AI Development Instructions for VantoOS

> This file provides context for AI development tools like Lovable, Cursor, Copilot, and others.

## Quick Summary

VantoOS is an **executive AI dashboard** built with:
- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** components
- **Lucide** icons

## What This Project Does

VantoOS is a personal productivity dashboard that combines:
- 📋 **Tasks** - Kanban and list views with priority tags
- 📅 **Calendar** - Week view with color-coded events
- ✉️ **Email** - Superhuman-style inbox
- 💰 **Finance** - Income/expense tracking in ZAR (South African Rand)
- ✈️ **Travel** - Trip management
- 🛒 **Shopping** - Shopping lists and order tracking
- ⚙️ **Settings** - User preferences

## Key Design Decisions

### 1. Navigation
- **Desktop**: Fixed sidebar on left (256px, collapsible to 80px)
- **Mobile**: Fixed bottom navigation bar

### 2. Theming
- CSS variables for light/dark mode
- Primary color: Blue (`hsl(223 87% 63%)`)
- Accent color: Purple for AI features (`hsl(280 87% 65%)`)

### 3. Components
All UI components are in `src/components/ui/` and follow shadcn/ui patterns:
- Built on Radix UI primitives
- Use `class-variance-authority` for variants
- Use `cn()` utility for class merging

### 4. Data
Currently using **mock data** inline in components. Ready for API integration.

## When Making Changes

### Creating New Pages
1. Create `src/app/[route]/page.tsx`
2. Use the standard page wrapper with `Sidebar` and `MobileNav`
3. Add route to navigation arrays in sidebar.tsx

### Adding Components
1. Place in `src/components/ui/` for primitives
2. Place in `src/components/` for layout components
3. Follow forwardRef pattern for primitives

### Styling
- Always use `cn()` for class names
- Use semantic colors: `bg-primary`, `text-muted-foreground`
- Don't hardcode colors, use CSS variables

### Icons
Import from `lucide-react`:
```tsx
import { Sparkles, Mail, Calendar } from "lucide-react";
```

## Code Snippets

### Standard Page Layout
```tsx
"use client";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />
      <main className="lg:ml-64 p-4 lg:p-8 pb-20 lg:pb-8">
        {/* Content */}
      </main>
    </div>
  );
}
```

### Card Section
```tsx
<Card className="p-6 mb-6">
  <h2 className="text-lg font-semibold mb-4">Section Title</h2>
  {/* Content */}
</Card>
```

### AI Feature Indicator
```tsx
<div className="flex items-center gap-2">
  <Sparkles className="h-5 w-5 text-primary" />
  <span>AI Feature</span>
</div>
```

## File Reference

| What | Where |
|------|-------|
| Pages | `src/app/**/page.tsx` |
| UI Components | `src/components/ui/` |
| Navigation | `src/components/sidebar.tsx`, `src/components/mobile-nav.tsx` |
| Styles | `src/app/globals.css` |
| Utilities | `src/lib/utils.ts` |
| Tailwind Config | `tailwind.config.ts` |

## Common Tasks

### Add a new navigation item
Edit `src/components/sidebar.tsx`:
```typescript
const menuItems = [
  // ... existing
  { icon: NewIcon, label: "New Page", href: "/new-page" },
];
```

### Change theme colors
Edit `src/app/globals.css`:
```css
:root {
  --primary: 223 87% 63%;  /* HSL values */
}
```

### Add a new UI component variant
Use CVA in the component file:
```typescript
const variants = cva("base", {
  variants: {
    newVariant: {
      option1: "classes...",
      option2: "classes...",
    }
  }
});
```

## Do's and Don'ts

### ✅ Do
- Use TypeScript types
- Use semantic Tailwind classes
- Follow existing component patterns
- Use `"use client"` for interactive components
- Use `cn()` for class merging

### ❌ Don't
- Hardcode colors (use CSS variables)
- Create components without proper TypeScript types
- Forget mobile-first responsive design
- Skip the Sidebar/MobileNav in new pages
- Use inline styles

## For More Details

- **Architecture**: See `ARCHITECTURE.md`
- **Components**: See `COMPONENTS.md`
- **Setup**: See `README.md`
