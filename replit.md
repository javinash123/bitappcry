# SimpleBit Merchant Dashboard

## Overview

SimpleBit is a merchant dashboard application for managing cryptocurrency payments. It provides a complete interface for businesses to create invoices, track transactions, manage payouts, and handle business profile settings including KYC verification. The application is built as a full-stack TypeScript project with a React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router) with base URL support for subdirectory deployment
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) built on Radix UI primitives
- **State Management**: TanStack React Query for server state, React useState for local state
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Server**: Node.js HTTP server with development/production mode switching
- **Development**: Vite middleware for HMR in development mode
- **Production**: Static file serving from built assets

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts` - shared between client and server
- **Validation**: Zod schemas generated from Drizzle schemas via drizzle-zod
- **Current Storage**: In-memory storage (MemStorage class) - database connection ready but uses mock data

### Project Structure
```
├── client/src/          # React frontend application
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # shadcn/ui base components
│   │   ├── dashboard/   # Dashboard-specific components
│   │   └── layout/      # Layout components (Sidebar)
│   ├── pages/           # Route page components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utilities and query client
├── server/              # Express backend
├── shared/              # Shared types and schemas
└── deployment/          # Production build output
```

### Key Design Patterns
- **Component Composition**: UI built from small, reusable shadcn/ui components
- **Responsive Design**: Mobile-first with Sheet component for mobile navigation
- **Form Validation**: Client-side validation with error state management
- **Data Tables**: Custom implementation with sorting, searching, and pagination

### Authentication Flow
- Login, signup, and forgot password pages exist as UI
- No backend authentication currently implemented
- Session management via express-session with connect-pg-simple ready

## External Dependencies

### Core Technologies
- **PostgreSQL**: Database (via DATABASE_URL environment variable)
- **Drizzle Kit**: Database migrations and schema pushing

### UI/Styling
- **Radix UI**: Accessible component primitives (dialogs, dropdowns, forms, etc.)
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Recharts**: Charting library for revenue visualization
- **Embla Carousel**: Carousel component

### Data & Forms
- **TanStack React Query**: Async state management
- **React Hook Form**: Form handling with @hookform/resolvers
- **Zod**: Schema validation
- **date-fns**: Date manipulation

### Fonts
- **Google Fonts**: Inter and Plus Jakarta Sans loaded via CDN

### Deployment

#### AWS EC2 Apache Deployment (Current)
- **Deployment Path**: `/var/www/html/simplebitmerchant/`
- **URL**: `http://3.208.52.220/simplebitmerchant/`
- **Base Path**: `/simplebitmerchant/` (configured in vite.config.ts)
- **Web Server**: Apache with mod_rewrite enabled
- **Key Configuration**: .htaccess file in deployment root handles SPA routing

#### Build & Deployment Process
1. Build command: `NODE_ENV=production npm run build`
2. Output location: `dist/public/` (includes all static assets and .htaccess)
3. Deploy to EC2: `scp -r dist/public/* ec2-user@IP:/var/www/html/simplebitmerchant/`
4. Verify: No 404 errors on subdirectory routes (Apache rewrites to index.html)

#### .htaccess Rewrite Rules
- Enables mod_rewrite for SPA routing
- Redirects all non-file/non-directory requests to index.html
- Preserves direct asset access (CSS, JS, images)
- Essential for single-page app functioning in subdirectory

#### Deployment Guides
- `deployment/AWS_EC2_DEPLOYMENT_GUIDE.md` - Comprehensive setup guide (one-time setup + troubleshooting)
- `deployment/DEPLOYMENT_CHECKLIST.md` - Quick reference checklist for deployments