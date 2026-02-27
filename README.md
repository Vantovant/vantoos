# VantoOS - Executive AI Operating System

An AI-powered executive dashboard that combines tasks, calendar, email, finance, travel, shopping, and more into one beautiful interface. Built with Next.js, TypeScript, shadcn/ui, and Tailwind CSS.

## 🎨 Design Philosophy

VantoOS follows Motion's (usemotion.com) clean, minimal design language:
- **Primary Color**: Blue (#5B7CEE) - `hsl(223 87% 63%)`
- **Accent Color**: Purple for AI features - `hsl(280 87% 65%)`
- **Typography**: Inter font family
- **Spacing**: Premium, generous spacing
- **Borders**: 12px border radius for cards
- **Shadows**: Soft, subtle shadows
- **Theme**: Full dark mode support

## 📁 Project Structure

```
vantoos/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Dashboard (main landing page)
│   │   ├── tasks/page.tsx     # Tasks with Kanban/List view
│   │   ├── calendar/page.tsx  # Week view calendar
│   │   ├── email/page.tsx     # Superhuman-style inbox
│   │   ├── finance/page.tsx   # Financial tracking
│   │   ├── travel/page.tsx    # Travel bookings
│   │   ├── shopping/page.tsx  # Shopping lists & orders
│   │   ├── settings/page.tsx  # User settings
│   │   ├── layout.tsx         # Root layout with Inter font
│   │   ├── globals.css        # Global styles & theme
│   │   └── ClientBody.tsx     # Client-side body wrapper
│   ├── components/
│   │   ├── sidebar.tsx        # Desktop sidebar navigation
│   │   ├── mobile-nav.tsx     # Mobile bottom navigation
│   │   └── ui/                # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── avatar.tsx
│   │       └── badge.tsx
│   └── lib/
│       └── utils.ts           # cn() utility for Tailwind
├── public/                     # Static assets
└── .same/                      # Project todos and docs
```

## 🚀 Features

### Pages

#### 1. Dashboard (`/`)
- AI-Generated Daily Agenda with time blocks
- Top 5 Priorities with urgency badges
- Calendar Preview (This Week)
- Important Email Summaries
- Financial Snapshot (Income, Expenses, Balance in ZAR)
- Personal Reminders with checkboxes
- Business Alerts

#### 2. Tasks (`/tasks`)
- **Views**: Kanban board & List view toggle
- Priority tags (high, medium, low)
- Due dates
- AI auto-scheduling indicators (sparkle icons)
- Status columns: To Do, In Progress, Done

#### 3. Calendar (`/calendar`)
- Week view (Monday-Friday)
- Time slots from 8 AM - 8 PM
- Color-coded events
- Hover tooltips with event details
- Event creation button

#### 4. Email (`/email`)
- Superhuman-style clean inbox
- Unread indicators (blue dot)
- Starred emails
- AI Reply button
- Email stats sidebar (unread count, starred, avg response time)
- Quick actions (Smart Compose, Archive All)

#### 5. Finance (`/finance`)
- Monthly overview cards (Income, Expenses, Balance)
- Interactive bar chart (Income vs Expenses)
- Recent transactions list with categories
- All amounts in ZAR (South African Rand - R)

#### 6. Travel (`/travel`)
- Upcoming trips with confirmation status
- Flight and hotel information
- Past trips history
- Business/Vacation tags

#### 7. Shopping (`/shopping`)
- Shopping list with checkboxes
- Recent orders with status tracking
- Delivery status badges

#### 8. Settings (`/settings`)
- User profile card
- Settings categories (Profile, Notifications, Privacy, Appearance, Language, Help)
- Account actions (Export, Deactivate, Delete)

### Components

#### Sidebar (`sidebar.tsx`)
- Collapsible navigation
- Active route highlighting
- Dark mode toggle at bottom
- Icons for all menu items
- Smooth transitions

#### Mobile Nav (`mobile-nav.tsx`)
- Fixed bottom navigation bar
- 5 key items: Dashboard, Tasks, Calendar, Email, More
- Active state styling
- Only visible on mobile/tablet

#### UI Components
All built with Radix UI primitives and customized:
- **Button**: Multiple variants (default, destructive, outline, ghost, link)
- **Card**: Rounded containers with soft shadows
- **Avatar**: Circular user avatars with fallbacks
- **Badge**: Status indicators with color variants

## 🎨 Design System

### Colors

```css
/* Light Mode */
--primary: hsl(223 87% 63%)        /* Blue */
--accent: hsl(280 87% 65%)         /* Purple for AI */
--background: hsl(0 0% 100%)       /* White */
--foreground: hsl(222 47% 11%)     /* Dark text */
--secondary: hsl(210 40% 96%)      /* Light gray */
--border: hsl(214 32% 91%)         /* Light borders */

/* Dark Mode */
--background: hsl(222 47% 11%)     /* Dark background */
--foreground: hsl(210 40% 98%)     /* Light text */
--card: hsl(217 33% 17%)           /* Dark cards */
--border: hsl(217 33% 20%)         /* Dark borders */
```

### Typography
- **Font**: Inter (sans-serif)
- **Headings**: Bold, various sizes
- **Body**: Regular weight, 14-16px

### Spacing
- Cards: p-6 (24px padding)
- Sections: mb-6, mb-8 (24-32px margins)
- Grid gaps: gap-4, gap-6 (16-24px)

### Border Radius
- Cards: rounded-xl (12px)
- Buttons: rounded-md (6px)
- Badges: rounded-md (6px)

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.7 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)
- **Package Manager**: Bun
- **Linting**: Biome

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Vantovant/vantoos.git
cd vantoos

# Install dependencies
bun install

# Run development server
bun run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build the app
bun run build

# Start production server
bun run start
```

## 🌙 Dark Mode

Dark mode is implemented with CSS variables and toggled via the sidebar button. The theme persists across page reloads using localStorage.

```typescript
// In sidebar.tsx
const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [darkMode]);
```

## 📱 Responsive Design

- **Desktop (lg+)**: Full sidebar navigation
- **Tablet/Mobile**: Hidden sidebar, bottom navigation bar
- **Breakpoints**: Uses Tailwind's default breakpoints
- **Mobile-first**: All components are mobile-responsive

## 🎯 AI Features

AI indicators (sparkle icons) appear throughout:
- Dashboard greeting with animated sparkle
- AI-Generated Daily Agenda header
- Task auto-scheduling badges
- Email AI Reply buttons
- Finance smart insights

## 💾 Data Structure

Currently using mock data. Ready for backend integration:

```typescript
// Example task structure
{
  title: string;
  priority: "high" | "medium" | "low";
  due: string;
  autoScheduled: boolean;
}

// Example email structure
{
  from: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  starred: boolean;
  priority: "high" | "medium" | "low";
}
```

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS setup
- `tsconfig.json` - TypeScript configuration
- `components.json` - shadcn/ui configuration
- `biome.json` - Biome linter settings
- `netlify.toml` - Netlify deployment config

## 📦 Dependencies

### Core
- `next` - React framework
- `react` & `react-dom` - UI library
- `typescript` - Type safety

### Styling
- `tailwindcss` - Utility-first CSS
- `tailwind-merge` - Merge Tailwind classes
- `clsx` - Conditional classnames
- `class-variance-authority` - Component variants

### UI
- `@radix-ui/react-slot` - Composition primitive
- `@radix-ui/react-avatar` - Avatar component
- `lucide-react` - Icon library

### Fonts
- `next/font/google` - Inter font loading

## 🚀 Deployment

Ready for deployment to:
- **Netlify** (configured with netlify.toml)
- **Vercel** (Next.js native)
- **Docker** (add Dockerfile)

## 📝 To-Do

Future enhancements:
- [ ] Backend API integration
- [ ] Real-time data sync
- [ ] Task drag & drop
- [ ] Calendar event creation
- [ ] Email composition
- [ ] Financial charts with Recharts
- [ ] User authentication
- [ ] Multi-user support
- [ ] Search functionality
- [ ] Notifications system

## 🤝 Contributing

This is an open-source project. Contributions are welcome!

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Credits

- Design inspired by [Motion](https://usemotion.com)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

---

**Built with ❤️ by the VantoOS team**
