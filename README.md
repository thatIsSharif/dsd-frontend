# DSD Frontend — Warehouse Admin Dashboard

A React-based warehouse administration dashboard for managing drivers, orders, stock check-in/check-out, and daily operations. Built with TypeScript, Material UI, and Vite.

## Features

### Dashboard
- **Welcome card** with animated greeting and current date display
- **Animated stat cards** — Orders Today, Active Drivers, Items in Stock — with count-up animations and delta indicators vs. yesterday
- **Navigation card grid** — quick-access cards for all modules with staggered fade-in animations
- **Recent activity feed** — real-time timeline of check-ins, orders, and stock assignments
- **Download app banner** — CTA banner linking to the mobile app

### Stock Management
- **Stock Check-In** — record incoming stock with admin signature, attachments, and transaction history
- **Stock Check-Out** — assign stock to drivers with delivery orders, product selection, and driver signature capture

### Driver Management
- Driver selection grid with status badges (Online, Offline, On Route)
- Driver assignment for loading orders and deliveries
- Driver card with pulse-animated status indicators

### Internationalization 🌐
- **English**, **French**, and **Hindi (हिन्दी)** language support
- Full UI localization including sidebar, forms, breadcrumbs, stats, and activity feed
- Language selector in the header for instant switching

### Dark Mode 🌙
- System-wide dark mode toggle in the header
- Persistent preference saved to `localStorage`
- Custom CSS custom properties for seamless light/dark theming
- Dark-mode-aware MUI overrides

### UI Components
- **Breadcrumbs** — route-driven, localized breadcrumb navigation
- **Skeleton loading** — shimmer-animated skeleton cards, grids, and dashboard placeholders
- **Toast notifications** — context-based toast system for success/error messages with auto-dismiss
- **Animations** — fade-in-up, fade-in-down, slide-in-left, shimmer, and pulse-badge keyframe animations
- Responsive grid layouts with staggered animation delays

## Requirements

- **Node.js** 16+
- **npm** (or yarn/pnpm)

## Setup

```bash
# Install dependencies
npm install
```

## Running Locally

```bash
# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

> **Note:** To bypass CORS restrictions during local development, launch Chrome with web security disabled:
> ```
> chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
> ```

## Deployment

### Vercel (Recommended)

The app is deployed at [https://ne-warehouse-admin.vercel.app/](https://ne-warehouse-admin.vercel.app/).

### Docker + Cloud Foundry

```bash
# Build Docker image
docker build -t notionedge984/warehouse-frontend:2.5.1-20250416 .

# Push to registry
docker push notionedge984/warehouse-frontend:2.5.1-20250416

# Deploy to Cloud Foundry
cf login -a https://<base-url>.hana.ondemand.com/
cf push warehouse-frontend -o notionedge984/warehouse-frontend:2.5.1-20250416
```

## Project Structure

```plaintext
./
├── public/                     # Static assets
├── src/
│   ├── api/                    # API service layer
│   ├── assets/                 # Images, icons, Lottie animations
│   │   ├── LOTTIE/
│   │   ├── PNG/
│   │   ├── SVG/
│   │   └── WEBP/
│   ├── component/              # Reusable UI components
│   │   ├── Breadcrumbs/        # Route-driven breadcrumb navigation
│   │   ├── DarkModeToggle/     # Light/dark mode switcher
│   │   ├── DriverSelectionGrid/# Driver selection with status cards
│   │   ├── Header/             # App header with nav & controls
│   │   ├── LanguageSelect/     # i18n language selector
│   │   ├── NavigationCard/     # Dashboard navigation card
│   │   ├── SidebarNew/         # Collapsible sidebar navigation
│   │   ├── Skeleton/           # Shimmer loading placeholders
│   │   ├── Toast/              # Toast notification system
│   │   └── ...                 # Other reusable components
│   ├── context/                # React context providers
│   │   ├── sidebar/
│   │   └── timeline/
│   ├── models/                 # TypeScript data models
│   ├── resources/
│   │   └── labels/             # i18n translation files
│   │       ├── en.json         # English
│   │       ├── fr.json         # French
│   │       └── hi.json         # Hindi (हिन्दी)
│   ├── screens/                # Page-level components
│   │   ├── AllHistory/         # Full order history
│   │   ├── ForgotPassword/     # Password reset
│   │   ├── Home/               # Dashboard with stats & activity
│   │   ├── Loading/            # Loading screen
│   │   ├── Login/              # Authentication
│   │   ├── StockCheckIn/       # Stock receiving workflow
│   │   └── StockCheckOut/      # Stock dispatch workflow
│   ├── styles/                 # Global SCSS styles
│   │   ├── _animations.scss    # Keyframes & dark mode variables
│   │   ├── _toast.scss         # Toast notification styles
│   │   └── design-systems.module.scss
│   ├── utilities/              # Helpers, enums, column definitions
│   ├── App.tsx                 # Root application component
│   └── main.tsx                # Application entry point
├── Dockerfile                  # Docker container configuration
├── nginx.conf                  # Nginx config for production
├── vite.config.ts              # Vite build configuration
├── tsconfig.json               # TypeScript configuration
├── jest.config.js              # Jest test configuration
└── package.json                # Dependencies and scripts
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with Vite |
| `npm run build` | Compile TypeScript and build for production |
| `npm run lint` | Run ESLint on source files |
| `npm run preview` | Preview production build locally |
| `npm run format` | Check code formatting with Prettier |
| `npm run format:fix` | Fix code formatting |
| `npm test` | Run test suite with Jest |
| `npm run test:watch` | Run tests in watch mode |

## Coding Conventions

1. **Component declarations** use traditional `function` syntax:
   ```tsx
   // Preferred
   function MyComponent() { ... }
   ```

2. **Destructuring** for cleaner props and state access:
   ```tsx
   const { title, onPress } = props;
   ```

3. **Naming conventions:**
   - Component files: `PascalCase` (e.g., `DetailsCard.tsx`)
   - Variables and functions: `camelCase`
   - Style files: match component name (e.g., `DetailsCard.scss`)

4. **Styling:** SCSS files per component + MUI `sx` prop for component-level styles.

5. **Modular component structure:**
   ```
   DetailsCard/
   ├── propTypes/           # PropTypes definitions
   ├── DetailsCard.tsx      # Component logic
   ├── DetailsCard.scss     # Styling
   ├── DetailsCard.test.tsx # Unit tests
   └── DetailsCard.md       # Documentation
   ```

## Key Dependencies

| Package | Purpose |
|---|---|
| **Material UI** | UI component library with Material Design |
| **axios** | HTTP client for API requests |
| **date-fns** | Date/time utility library |
| **formik + yup** | Form state management and validation |
| **i18next** | Internationalization framework |
| **react-router** | Client-side routing |
| **react-spinners** | Loading spinner components |
| **sass** | SCSS preprocessing |

## Recent Enhancements (KAN-11)

- Enhanced Dashboard UI with animated stat cards, count-up animations, and responsive navigation grid
- Skeleton loading screens for dashboard and driver grid
- Route-driven breadcrumb navigation with i18n support
- Dark mode toggle with persistent `localStorage` preference
- Full Hindi (हिन्दी) language translation
- Toast notification system for success/error feedback
- CSS animation system with reusable keyframe classes
- New Driver data model and type definitions
