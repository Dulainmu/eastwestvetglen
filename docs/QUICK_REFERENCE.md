# VetFlow Quick Reference

> **Quick access to common commands, file locations, and development workflows**

---

## 🚀 Quick Start

```bash
# Development
pnpm dev                 # Start dev server (http://localhost:3000)
pnpm build              # Build for production
pnpm start              # Start production server
pnpm lint               # Run ESLint

# Database
pnpm db:push            # Push schema changes (dev)
pnpm db:migrate         # Create migration (dev)
pnpm db:seed            # Seed demo data
pnpm prisma studio      # Open Prisma Studio

# Testing
pnpm test               # Run unit tests
pnpm test --coverage    # Test with coverage
pnpm test:e2e           # Run E2E tests
```

---

## 📁 Project Structure

```
vetflow/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth routes (login, register)
│   ├── api/                 # API routes
│   │   ├── appointments/    # Appointment endpoints
│   │   ├── bookings/        # Booking endpoints
│   │   ├── cron/            # Cron jobs
│   │   └── users/           # User endpoints
│   ├── dashboard/           # Admin dashboard
│   ├── book/                # Public booking pages
│   ├── calendar/            # Calendar view
│   └── patients/            # Patient records
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   └── ...                  # Custom components
├── lib/                     # Utilities & helpers
│   ├── auth.ts              # Auth helpers
│   ├── db.ts (prisma.ts)    # Database client
│   ├── email.ts             # Email service
│   ├── sms.ts               # SMS service
│   └── validation.ts        # Zod schemas
├── prisma/                  # Database
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Migration files
├── public/                  # Static assets
├── test/                    # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/                    # Documentation
└── .env.local               # Environment variables (not in git)
```

---

## 🔑 Environment Variables

**Required:**
```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Resend (Email)
RESEND_API_KEY="re_xxxx"
FROM_EMAIL="noreply@vetflow.dulain.dev"

# Twilio (SMS)
TWILIO_ACCOUNT_SID="ACxxxx"
TWILIO_AUTH_TOKEN="xxxx"
TWILIO_PHONE_NUMBER="+61xxxx"
```

**Optional:**
```env
# Supabase (if using Supabase Storage)
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="xxxx"

# Stripe (Phase 2)
STRIPE_SECRET_KEY="sk_test_xxxx"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxxx"

# Sentry (Error Tracking)
NEXT_PUBLIC_SENTRY_DSN="https://xxxx"

# Encryption
ENCRYPTION_KEY="64-char-hex-string"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🗄️ Database Quick Reference

### Common Prisma Commands
```bash
# Generate Prisma Client
npx prisma generate

# Push schema (dev)
npx prisma db push

# Create migration
npx prisma migrate dev --name add_vaccination_table

# Deploy migrations (production)
npx prisma migrate deploy

# Open Prisma Studio
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### Key Tables
- `Clinic` - Clinic information and settings
- `User` - Users (staff and pet owners)
- `Pet` - Pet profiles
- `Appointment` - Appointments/bookings
- `Service` - Services offered (consultation, vaccination, etc.)
- `MedicalRecord` - Medical history
- `Vaccination` - Vaccination records
- `AvailabilityRule` - Vet working hours and blocked time

---

## 🎨 UI Components (shadcn/ui)

### Install Components
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add calendar
# ... see shadcn/ui docs for more
```

### Usage Example
```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

<Button variant="default">Click me</Button>
<Input type="email" placeholder="Email" />
```

---

## 🔐 Authentication

### Protect Page (Server Component)
```tsx
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function ProtectedPage() {
  const session = await auth()
  if (!session) redirect("/login")
  
  return <div>Protected content</div>
}
```

### Protect API Route
```tsx
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  return NextResponse.json({ data: "..." })
}
```

### Get Current User
```tsx
import { auth } from "@/auth"

const session = await auth()
const user = session?.user  // { id, email, role, clinicId, ... }
```

---

## 📊 API Endpoints

### Appointments
```
GET    /api/appointments              # List appointments
GET    /api/appointments/[id]         # Get appointment
POST   /api/appointments              # Create appointment
PATCH  /api/appointments/[id]         # Update appointment
DELETE /api/appointments/[id]         # Cancel appointment

POST   /api/appointments/[id]/check-in    # Check in
POST   /api/appointments/[id]/complete    # Mark complete
GET    /api/appointments/availability     # Get available slots
```

### Bookings (Public)
```
POST   /api/bookings/availability     # Get available slots
POST   /api/bookings/create           # Create booking (public)
```

### Pets
```
GET    /api/pets                      # List pets
GET    /api/pets/[id]                 # Get pet
POST   /api/pets                      # Create pet
PATCH  /api/pets/[id]                 # Update pet
```

### Users
```
GET    /api/users                     # List users
GET    /api/users/[id]                # Get user
POST   /api/users                     # Create user
PATCH  /api/users/[id]                # Update user
```

---

## 📧 Sending Notifications

### Email
```ts
import { sendAppointmentConfirmation } from "@/lib/email"

await sendAppointmentConfirmation({
  to: "owner@example.com",
  appointmentDate: new Date(),
  petName: "Max",
  serviceName: "General Consultation",
  clinicName: "Demo Clinic",
  clinicAddress: "123 Main St",
  vetName: "Dr. Sarah Johnson"
})
```

### SMS
```ts
import { sendSMS } from "@/lib/sms"

await sendSMS({
  to: "+61412345678",
  message: "Your appointment is tomorrow at 10am"
})
```

---

## 🧪 Testing Examples

### Unit Test
```ts
import { describe, it, expect } from 'vitest'
import { isSlotAvailable } from '@/lib/availability'

describe('Availability', () => {
  it('should mark slot as unavailable if booked', () => {
    const result = isSlotAvailable('09:00', [/* appointments */], [], 30)
    expect(result).toBe(false)
  })
})
```

### E2E Test
```ts
import { test, expect } from '@playwright/test'

test('booking flow', async ({ page }) => {
  await page.goto('/book/demo-clinic')
  await page.click('text=General Consultation')
  await page.click('button:has-text("Next")')
  // ... complete flow
  await expect(page.locator('text=Booking Confirmed')).toBeVisible()
})
```

---

## 🚨 Common Issues & Solutions

### Issue: "Module not found" error
**Solution:** 
```bash
pnpm install
npx prisma generate
```

### Issue: Database connection failed
**Solution:**
1. Check `DATABASE_URL` in `.env.local`
2. Verify Supabase project is running
3. Check connection pooling settings

### Issue: NextAuth session not working
**Solution:**
1. Verify `NEXTAUTH_SECRET` is set
2. Check `NEXTAUTH_URL` matches your domain
3. Clear cookies and try again

### Issue: Reminders not sending
**Solution:**
1. Check Resend/Twilio API keys
2. Verify cron job is configured in Vercel
3. Check notification logs in database

---

## 📚 Documentation Links

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Resend Docs](https://resend.com/docs)
- [Twilio Docs](https://www.twilio.com/docs)

---

## 🔧 Useful Snippets

### Format Date
```ts
import { format } from 'date-fns'

format(new Date(), 'MMM d, yyyy')  // "Feb 3, 2025"
format(new Date(), 'h:mm a')       // "2:30 PM"
```

### Form with Validation
```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

const form = useForm({
  resolver: zodResolver(schema)
})
```

### API Error Handling
```ts
try {
  const data = await someApiCall()
} catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ error: error.errors }, { status: 400 })
  }
  return NextResponse.json({ error: "Internal error" }, { status: 500 })
}
```

---

## 🎯 Performance Tips

1. **Use Server Components** - Fetch data on server when possible
2. **Loading States** - Show skeletons while loading
3. **Optimize Images** - Use Next.js `<Image>` component
4. **Cache API Responses** - Use `{ cache: 'force-cache' }` or `revalidate`
5. **Lazy Load** - Dynamically import heavy components
6. **Database Indexes** - Add indexes on frequently queried fields

---

## 📞 Support

**Development Issues:**
- Check [docs/](./docs) folder
- Search GitHub issues (when open-sourced)
- Email: dev@vetflow.dulain.dev

**Production Issues:**
- Check Sentry for errors
- Check Vercel logs
- Check UptimeRobot for outages
- Email: support@vetflow.dulain.dev

---

**Last Updated:** 2025-01-29
