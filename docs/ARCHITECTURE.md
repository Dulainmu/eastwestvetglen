# Technical Architecture & Stack

## 1. Technology Stack

### Frontend
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript 5+
- **Styling:** Tailwind CSS 3.4+
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Forms:** React Hook Form + Zod validation
- **State Management:** React Context + Zustand (for complex state)
- **Date/Time:** date-fns (for timezone handling)
- **Calendar:** FullCalendar or custom with Radix UI
- **Icons:** Lucide React
- **Animation:** Framer Motion (subtle, performant)

### Backend
- **Framework:** Next.js API Routes (App Router)
- **ORM:** Prisma 5+
- **Database:** PostgreSQL 15+ (Supabase)
- **Authentication:** NextAuth.js v5 (Auth.js)
- **File Storage:** Supabase Storage (images, documents)

### Integrations
- **Email:** Resend (developer-friendly, generous free tier)
- **SMS:** Twilio (international SMS support)
- **Payments:** Stripe (future - Phase 2)

### Infrastructure
- **Hosting:** Vercel (frontend + API routes)
- **Database:** Supabase (PostgreSQL + Storage)
- **Domain:** vetflow.dulain.dev
- **CDN:** Vercel Edge Network
- **Monitoring:** Vercel Analytics + Sentry (errors)
- **Uptime:** UptimeRobot (free tier)

### Development Tools
- **Version Control:** Git + GitHub
- **Package Manager:** pnpm (faster than npm)
- **Code Quality:** ESLint + Prettier
- **Type Checking:** TypeScript strict mode
- **Testing:** Vitest + React Testing Library (Phase 2)

## 2. Architecture Patterns

### Multi-Tenancy Strategy
- **Type:** Schema-based multi-tenancy
- **Implementation:** `clinicId` in every table
- **Isolation:** Row-level security via Prisma middleware
- **Scalability:** Single database, multiple clinics

### Authentication Flow
- **Method:** JWT tokens via NextAuth.js
- **Session:** Database sessions (Prisma adapter)
- **Roles:** `SUPER_ADMIN`, `CLINIC_ADMIN`, `VET`, `RECEPTIONIST`, `PET_OWNER`
- **Permissions:** Role-based access control (RBAC)

### Data Flow
```mermaid
graph TD
    Client[Client] --> API[Next.js API Route]
    API --> Prisma[Prisma ORM]
    Prisma --> DB[(PostgreSQL)]
    
    subgraph Processing
    Validation[Validation (Zod)]
    Auth[Authorization Check (clinicId + role)]
    Logic[Business Logic]
    end
    
    API --> Validation
    Validation --> Auth
    Auth --> Logic
    Logic --> Prisma
```
