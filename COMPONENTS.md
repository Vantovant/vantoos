# VantoOS Component Documentation

## Overview

This document provides comprehensive documentation for all components in VantoOS, designed for AI development tools and developers to understand and extend the codebase.

## Table of Contents

1. [Navigation Components](#navigation-components)
2. [UI Components](#ui-components)
3. [Page Components](#page-components)
4. [Utility Functions](#utility-functions)
5. [Icon System](#icon-system)
6. [Component Best Practices](#component-best-practices)
7. [Adding New Components](#adding-new-components)

---

## Navigation Components

### Sidebar

**Location**: `src/components/sidebar.tsx`

**Purpose**: Desktop sidebar navigation with collapsible state and dark mode toggle.

**Features**:
- Collapsible navigation (64px collapsed, 256px expanded)
- Active route highlighting
- Dark mode toggle
- Smooth transitions

**Props**: None (self-contained component)

**State**:
```typescript
const [collapsed, setCollapsed] = useState(false);   // Sidebar collapse state
const [darkMode, setDarkMode] = useState(false);     // Theme toggle state
```

**Menu Items Configuration**:
```typescript
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: CheckSquare, label: "Tasks", href: "/tasks" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: Mail, label: "Email", href: "/email" },
  { icon: DollarSign, label: "Finance", href: "/finance" },
  { icon: Plane, label: "Travel", href: "/travel" },
  { icon: ShoppingCart, label: "Shopping", href: "/shopping" },
  { icon: Settings, label: "Settings", href: "/settings" },
];
```

**Usage**:
```tsx
import { Sidebar } from "@/components/sidebar";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="lg:ml-64">
        {/* Page content */}
      </main>
    </div>
  );
}
```

**Styling Classes**:
| Class | Description |
|-------|-------------|
| `w-64` | Expanded width (256px) |
| `w-20` | Collapsed width (80px) |
| `hidden lg:flex` | Hidden on mobile, visible on desktop |
| `fixed left-0 top-0 z-40 h-screen` | Fixed positioning |

**Adding New Menu Items**:
```typescript
// Add to menuItems array in sidebar.tsx
{ icon: YourIcon, label: "New Page", href: "/new-page" },
```

---

### MobileNav

**Location**: `src/components/mobile-nav.tsx`

**Purpose**: Bottom navigation bar for mobile and tablet devices.

**Features**:
- Fixed bottom position
- 5 primary navigation items
- Active state highlighting
- Hidden on desktop (lg+)

**Props**: None (self-contained component)

**Menu Items Configuration**:
```typescript
const mobileMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: CheckSquare, label: "Tasks", href: "/tasks" },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: Mail, label: "Email", href: "/email" },
  { icon: MoreHorizontal, label: "More", href: "/settings" },
];
```

**Usage**:
```tsx
import { MobileNav } from "@/components/mobile-nav";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <MobileNav />
      <main className="pb-20 lg:pb-8">
        {/* Page content - note bottom padding for mobile nav */}
      </main>
    </div>
  );
}
```

**Styling Classes**:
| Class | Description |
|-------|-------------|
| `fixed bottom-0 left-0 right-0 z-50` | Fixed bottom positioning |
| `lg:hidden` | Hidden on desktop |
| `h-16` | Navigation height (64px) |

---

## UI Components

All UI components are located in `src/components/ui/` and follow shadcn/ui patterns.

### Button

**Location**: `src/components/ui/button.tsx`

**Purpose**: Versatile button component with multiple variants and sizes.

**Variants**:
| Variant | Description | Use Case |
|---------|-------------|----------|
| `default` | Primary blue button | Primary actions |
| `destructive` | Red button | Delete, cancel |
| `outline` | Border only | Secondary actions |
| `secondary` | Gray background | Tertiary actions |
| `ghost` | No background | Icon buttons, subtle actions |
| `link` | Underlined text | Navigation links |

**Sizes**:
| Size | Height | Use Case |
|------|--------|----------|
| `default` | 36px (h-9) | Standard buttons |
| `sm` | 32px (h-8) | Compact UI |
| `lg` | 40px (h-10) | Prominent actions |
| `icon` | 36x36px | Icon-only buttons |

**Props**:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;  // Render as child element (for Link wrapping)
}
```

**Usage Examples**:
```tsx
import { Button } from "@/components/ui/button";

// Primary button
<Button>Click me</Button>

// Icon button
<Button variant="ghost" size="icon">
  <Menu className="h-5 w-5" />
</Button>

// Destructive button
<Button variant="destructive">Delete</Button>

// Button as link
<Button asChild>
  <Link href="/page">Go to page</Link>
</Button>

// Button with icon
<Button variant="ghost" size="sm">
  <Calendar className="h-4 w-4 mr-2" />
  View Calendar
</Button>
```

---

### Card

**Location**: `src/components/ui/card.tsx`

**Purpose**: Container component for content sections with consistent styling.

**Exports**:
| Component | Description |
|-----------|-------------|
| `Card` | Main container |
| `CardHeader` | Header section with padding |
| `CardTitle` | Title text styling |
| `CardDescription` | Subtitle/description text |
| `CardContent` | Main content area |
| `CardFooter` | Footer section |

**Default Styling**:
- `rounded-xl` (12px border radius)
- `border` (subtle border)
- `bg-card` (background color)
- `shadow-sm` (subtle shadow)

**Usage Examples**:
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

// Simple card with custom padding
<Card className="p-6 mb-6">
  <h2 className="text-lg font-semibold mb-4">Card Title</h2>
  <p>Card content goes here</p>
</Card>

// Structured card with all parts
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Gradient card (AI features)
<Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
  <Sparkles className="h-5 w-5 text-primary" />
  <span>AI-Generated Content</span>
</Card>
```

---

### Avatar

**Location**: `src/components/ui/avatar.tsx`

**Purpose**: Circular avatar component for user/contact images.

**Exports**:
| Component | Description |
|-----------|-------------|
| `Avatar` | Container (circular) |
| `AvatarImage` | Image element |
| `AvatarFallback` | Fallback when image fails |

**Default Styling**:
- `h-10 w-10` (40x40px)
- `rounded-full` (circular)
- `overflow-hidden`

**Usage Examples**:
```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Avatar with image and fallback
<Avatar>
  <AvatarImage src="/user.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// Avatar with custom styling (used in VantoOS)
<Avatar className="h-10 w-10 bg-primary/10 flex items-center justify-center text-primary font-semibold">
  {userName[0]}
</Avatar>

// Smaller avatar
<Avatar className="h-8 w-8">
  <AvatarFallback>U</AvatarFallback>
</Avatar>
```

---

### Badge

**Location**: `src/components/ui/badge.tsx`

**Purpose**: Small label component for status indicators, tags, and counts.

**Variants**:
| Variant | Description | Use Case |
|---------|-------------|----------|
| `default` | Primary blue | Default labels |
| `secondary` | Gray | Status tags |
| `destructive` | Red | Urgent/error |
| `outline` | Border only | Subtle tags |

**Default Styling**:
- `rounded-md` (6px border radius)
- `px-2.5 py-0.5` (padding)
- `text-xs font-semibold`

**Usage Examples**:
```tsx
import { Badge } from "@/components/ui/badge";

// Default badge
<Badge>New</Badge>

// Status badges
<Badge variant="secondary">medium</Badge>
<Badge variant="destructive">urgent</Badge>

// Custom styled badges (used in VantoOS)
<Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
  <TrendingUp className="h-3 w-3 mr-1" />
  +12%
</Badge>

// Priority badge
<Badge variant={task.status === "urgent" ? "destructive" : "secondary"}>
  {task.status}
</Badge>
```

---

## Page Components

### Page Structure Pattern

Every page in VantoOS follows this structure:

```tsx
"use client";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Card } from "@/components/ui/card";
// ... other imports

export default function PageName() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />

      <main className="lg:ml-64 p-4 lg:p-8 pb-20 lg:pb-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Page Title</h1>
          <p className="text-muted-foreground">Page description</p>
        </div>

        {/* Page Content */}
        <Card className="p-6 mb-6">
          {/* Content */}
        </Card>
      </main>
    </div>
  );
}
```

### Dashboard (`/`)

**File**: `src/app/page.tsx`

**Sections**:
1. **AI Daily Agenda** - Gradient card with time blocks
2. **Top 5 Priorities** - Task list with urgency badges
3. **Calendar Preview** - Week overview
4. **Important Emails** - Unread email summaries
5. **Financial Snapshot** - Income/expenses in ZAR
6. **Personal Reminders** - Checkbox list
7. **Business Alerts** - Warning/info alerts

**Key Patterns**:
```tsx
// AI feature indicator
<div className="flex items-center gap-2">
  <Sparkles className="h-5 w-5 text-primary" />
  <h2>AI-Generated Content</h2>
</div>

// Gradient card for AI sections
<Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">

// Financial amounts (ZAR)
<p className="text-2xl font-bold">R12,450</p>
```

### Tasks (`/tasks`)

**File**: `src/app/tasks/page.tsx`

**Features**:
- View toggle (Kanban/List)
- Priority tags (high, medium, low)
- Auto-scheduled indicators (sparkle icon)
- Status columns

**Key Data Structure**:
```typescript
interface Task {
  title: string;
  priority: "high" | "medium" | "low";
  due: string;
  autoScheduled: boolean;
}
```

### Calendar (`/calendar`)

**File**: `src/app/calendar/page.tsx`

**Features**:
- Week view (Monday-Friday)
- Time slots (8 AM - 8 PM)
- Color-coded events
- Hover tooltips

**Key Data Structure**:
```typescript
interface Event {
  time: string;
  title: string;
  duration: string;
  color: string;
}
```

### Email (`/email`)

**File**: `src/app/email/page.tsx`

**Features**:
- Superhuman-style inbox
- Unread indicators (blue dot)
- Starred emails
- AI Reply button
- Stats sidebar

**Key Data Structure**:
```typescript
interface Email {
  from: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  starred: boolean;
  priority: "high" | "medium" | "low";
}
```

### Finance (`/finance`)

**File**: `src/app/finance/page.tsx`

**Features**:
- Monthly overview cards
- Bar chart visualization
- Transaction list
- All amounts in ZAR (R)

### Travel (`/travel`)

**File**: `src/app/travel/page.tsx`

**Features**:
- Upcoming trips
- Flight/hotel information
- Past trips history
- Status badges

### Shopping (`/shopping`)

**File**: `src/app/shopping/page.tsx`

**Features**:
- Shopping list with checkboxes
- Order tracking
- Delivery status

### Settings (`/settings`)

**File**: `src/app/settings/page.tsx`

**Features**:
- Profile card
- Settings categories
- Account actions

---

## Utility Functions

### cn() - Class Name Merger

**Location**: `src/lib/utils.ts`

**Purpose**: Merges Tailwind CSS classes intelligently, handling conflicts.

**Implementation**:
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Usage Examples**:
```typescript
import { cn } from "@/lib/utils";

// Basic usage
cn("p-4", "mt-2")                    // "p-4 mt-2"

// Conditional classes
cn("base-class", isActive && "active-class")

// Overriding classes (twMerge handles conflicts)
cn("p-4", "p-6")                     // "p-6" (later wins)

// With className prop
cn("base-styles", className)

// Complex example
cn(
  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
  isActive
    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
    : "hover:bg-secondary text-muted-foreground hover:text-foreground"
)
```

---

## Icon System

### Lucide React Icons

VantoOS uses [Lucide React](https://lucide.dev/) for all icons.

**Import Pattern**:
```typescript
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Mail,
  Settings,
  Sparkles,
  // ... more icons
} from "lucide-react";
```

**Common Icons Used**:

| Icon | Usage |
|------|-------|
| `LayoutDashboard` | Dashboard navigation |
| `CheckSquare` | Tasks |
| `Calendar` | Calendar |
| `Mail` | Email |
| `DollarSign` | Finance |
| `Plane` | Travel |
| `ShoppingCart` | Shopping |
| `Settings` | Settings |
| `Sparkles` | AI features |
| `Sun` / `Moon` | Theme toggle |
| `Menu` | Mobile menu |
| `TrendingUp` / `TrendingDown` | Financial trends |
| `Clock` | Time displays |
| `CheckCircle2` | Completed items |
| `AlertCircle` | Alerts/warnings |

**Sizing Convention**:
```tsx
// Standard icon in text
<Icon className="h-4 w-4" />

// Navigation icon
<Icon className="h-5 w-5" />

// Large icon (headers)
<Icon className="h-6 w-6" />

// Mobile navigation
<Icon className="h-6 w-6" />
```

**Icon Colors**:
```tsx
// Primary color
<Sparkles className="h-5 w-5 text-primary" />

// Accent color (AI)
<Sparkles className="h-6 w-6 text-accent animate-pulse" />

// Muted
<Icon className="h-5 w-5 text-muted-foreground" />

// Status colors
<TrendingUp className="h-3 w-3 text-green-600" />
<TrendingDown className="h-3 w-3 text-red-600" />
```

---

## Component Best Practices

### 1. Use "use client" Directive

For components with interactivity:
```tsx
"use client";
```

### 2. Follow the cn() Pattern

Always use `cn()` for class merging:
```tsx
<div className={cn("base-classes", className)}>
```

### 3. Consistent Spacing

- Cards: `p-6` (24px padding)
- Sections: `mb-6` or `mb-8`
- Grid gaps: `gap-4` or `gap-6`

### 4. Responsive Design

Always include responsive classes:
```tsx
<main className="lg:ml-64 p-4 lg:p-8 pb-20 lg:pb-8">
```

### 5. Use Semantic Colors

Prefer semantic color classes over hardcoded values:
```tsx
// ✅ Good
<div className="bg-primary text-primary-foreground">
<div className="text-muted-foreground">

// ❌ Avoid
<div className="bg-blue-500 text-white">
```

### 6. AI Feature Indicators

Mark AI-powered features with the Sparkles icon:
```tsx
<div className="flex items-center gap-2">
  <Sparkles className="h-5 w-5 text-primary" />
  <span>AI Feature</span>
</div>
```

### 7. Card Patterns

Use gradient backgrounds for AI sections:
```tsx
<Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
```

### 8. forwardRef Pattern

UI components should use forwardRef:
```tsx
const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("base", className)} {...props} />
  )
);
Component.displayName = "Component";
```

---

## Adding New Components

### Adding a New UI Component

1. **Create the component file**:
```bash
touch src/components/ui/new-component.tsx
```

2. **Follow the shadcn/ui pattern**:
```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const newComponentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        secondary: "secondary-classes",
      },
      size: {
        default: "default-size-classes",
        sm: "sm-size-classes",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface NewComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof newComponentVariants> {}

const NewComponent = React.forwardRef<HTMLDivElement, NewComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(newComponentVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
NewComponent.displayName = "NewComponent";

export { NewComponent, newComponentVariants };
```

### Adding a New Page

1. **Create the page directory and file**:
```bash
mkdir -p src/app/new-page
touch src/app/new-page/page.tsx
```

2. **Use the page template**:
```tsx
"use client";

import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Add more imports as needed

export default function NewPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />

      <main className="lg:ml-64 p-4 lg:p-8 pb-20 lg:pb-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">New Page</h1>
          <p className="text-muted-foreground">
            Description of this page
          </p>
        </div>

        {/* Page Content */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Section Title</h2>
          {/* Section content */}
        </Card>
      </main>
    </div>
  );
}
```

3. **Add to navigation** (sidebar.tsx):
```typescript
const menuItems = [
  // ... existing items
  { icon: YourIcon, label: "New Page", href: "/new-page" },
];
```

### Adding a New Layout Component

1. **Create the component**:
```bash
touch src/components/new-layout.tsx
```

2. **Follow the layout pattern**:
```tsx
"use client";

import { cn } from "@/lib/utils";

interface NewLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function NewLayout({ children, className }: NewLayoutProps) {
  return (
    <div className={cn("layout-classes", className)}>
      {children}
    </div>
  );
}
```

---

## Component Reference Quick Guide

| Component | Location | Key Props |
|-----------|----------|-----------|
| `Sidebar` | `components/sidebar.tsx` | None |
| `MobileNav` | `components/mobile-nav.tsx` | None |
| `Button` | `components/ui/button.tsx` | `variant`, `size`, `asChild` |
| `Card` | `components/ui/card.tsx` | `className` |
| `Avatar` | `components/ui/avatar.tsx` | `className` |
| `Badge` | `components/ui/badge.tsx` | `variant` |

---

## Styling Quick Reference

| Element | Classes |
|---------|---------|
| Page container | `min-h-screen bg-background` |
| Main content | `lg:ml-64 p-4 lg:p-8 pb-20 lg:pb-8` |
| Page header | `mb-8` |
| Page title | `text-3xl font-bold` |
| Section title | `text-lg font-semibold mb-4` |
| Card | `p-6 mb-6` |
| AI gradient card | `bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20` |
| Grid layout | `grid grid-cols-1 lg:grid-cols-2 gap-6` |
| Hover state | `hover:bg-secondary transition-colors` |

---

For architecture details, see [ARCHITECTURE.md](./ARCHITECTURE.md).
