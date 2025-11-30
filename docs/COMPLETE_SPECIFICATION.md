# VetFlow - Complete Product Specification  
**Version 1.0 | January 2025**

> Note: This is the original comprehensive specification. For organized documentation, see the `/docs` folder.

---

# TABLE OF CONTENTS

1. [Project Overview & Vision](#1-project-overview--vision)
2. [Technical Architecture & Stack](#2-technical-architecture--stack)
3. [Database Schema (Complete)](#3-database-schema-complete)
4. [Feature Specifications (Detailed)](#4-feature-specifications-detailed)
5. [User Flows & Wireframes](#5-user-flows--wireframes)
6. [UI/UX Design System](#6-uiux-design-system)
7. [API Endpoints & Routes](#7-api-endpoints--routes)

*Sections 8-12 are now in separate documentation files in `/docs`*

---

# 1. PROJECT OVERVIEW & VISION

## 1.1 Product Description
VetFlow is a modern, cloud-based veterinary clinic management and online booking system designed specifically for small to medium-sized Australian veterinary practices. It combines the booking capabilities of Vetstoria with simplified practice management features of ezyVet, at a fraction of the cost.

**Target Market:** Australian vet clinics (2-10 vets, 5-15 staff)

**Primary Value Propositions:**
- Save $3,600/year vs. ezyVet + Vetstoria
- 80% reduction in manual booking administration
- 70% reduction in appointment no-shows
- Simple, beautiful, fast interface
- Australian data hosting (compliance-ready)

## 1.2 Core User Personas

### Persona 1: Pet Owner (Sarah)
- **Age:** 28-45
- **Tech-savvy, busy professional**
- Owns 1-2 pets
- Values convenience, hates phone calls
- Books appointments outside business hours

**User Stories:**
- "I want to book a vet appointment at 11pm when I remember"
- "I want to see available times without calling"
- "I want SMS reminders so I don't forget"
- "I want to reschedule easily if something comes up"

### Persona 2: Receptionist (Michelle)
- **Age:** 25-50
- Moderately tech-savvy
- Handles 50+ bookings per day
- Frustrated with clunky software
- Needs fast, simple workflows

**User Stories:**
- "I want to check in appointments with one click"
- "I want to see today's schedule at a glance"
- "I want to quickly add notes to appointments"
- "I want to send reminders without manual work"

### Persona 3: Veterinarian (Dr. James)
- **Age:** 30-60
- Basic tech skills
- Sees 20-30 patients per day
- Needs quick access to patient history
- Limited time for admin

**User Stories:**
- "I want to see my schedule for the day in 2 seconds"
- "I want to view pet medical history during consultation"
- "I want to add treatment notes quickly"
- "I want to mark vaccinations as complete"

### Persona 4: Clinic Owner (Linda)
- **Age:** 35-65
- Business-focused, moderate tech skills
- Manages 3-5 vets, 10+ staff
- Concerned about costs and efficiency
- Needs reporting and oversight

**User Stories:**
- "I want to see how many appointments we're doing"
- "I want to track no-show rates"
- "I want to know which services are most popular"
- "I want to manage staff access and permissions"

---

# 2. TECHNICAL ARCHITECTURE & STACK

## 2.1 Technology Stack

### Frontend:
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

### Backend:
- **Framework:** Next.js API Routes (App Router)
- **ORM:** Prisma 5+
- **Database:** PostgreSQL 15+ (Supabase)
- **Authentication:** NextAuth.js v5 (Auth.js)
- **File Storage:** Supabase Storage (images, documents)

### Integrations:
- **Email:** Resend (developer-friendly, generous free tier)
- **SMS:** Twilio (international SMS support)
- **Payments:** Stripe (future - Phase 2)

### Infrastructure:
- **Hosting:** Vercel (frontend + API routes)
- **Database:** Supabase (PostgreSQL + Storage)
- **Domain:** vetflow.dulain.dev
- **CDN:** Vercel Edge Network
- **Monitoring:** Vercel Analytics + Sentry (errors)
- **Uptime:** UptimeRobot (free tier)

### Development Tools:
- **Version Control:** Git + GitHub
- **Package Manager:** pnpm (faster than npm)
- **Code Quality:** ESLint + Prettier
- **Type Checking:** TypeScript strict mode
- **Testing:** Vitest + React Testing Library (Phase 2)

## 2.2 Architecture Patterns

### Multi-Tenancy Strategy:
- **Type:** Schema-based multi-tenancy
- **Implementation:** clinicId in every table
- **Isolation:** Row-level security via Prisma middleware
- **Scalability:** Single database, multiple clinics

### Authentication Flow:
- **Method:** JWT tokens via NextAuth.js
- **Session:** Database sessions (Prisma adapter)
- **Roles:** SUPER_ADMIN, CLINIC_ADMIN, VET, RECEPTIONIST, PET_OWNER
- **Permissions:** Role-based access control (RBAC)

### Data Flow:
```
Client Component → Server Action (lib/*) → Prisma → PostgreSQL
         ↓
    Authentication Check (auth())
         ↓
    Validation (Zod)
         ↓
    Business Logic
         ↓
    Database Operation
         ↓
    Revalidate Path (Update UI)
```

---

# 3. DATABASE SCHEMA (COMPLETE)

> **See the full Prisma schema in your project's `prisma/schema.prisma` file**

## 3.1 Core Tables

### Clinic
Stores clinic information, settings, and branding.

**Key Fields:**
- `id`, `name`, `slug` (for subdomain)
- `email`, `phone`, `address`, `city`, `state`, `postcode`
- `businessHours` (JSON: operating hours for each day)
- `bookingBufferMinutes`, `defaultApptDuration`
- `allowOnlineBooking`, `requireApproval`, `sendReminders`
- `subscriptionStatus`, `subscriptionTier`, `trialEndsAt`

### User
Stores all users: clinic staff (admins, vets, receptionists) and pet owners.

**Key Fields:**
- `id`, `clinicId`
- `email`, `password` (hashed), `firstName`, `lastName`
- `role` (SUPER_ADMIN, CLINIC_ADMIN, VET, RECEPTIONIST, PET_OWNER)
- `isActive`, `veterinaryLicenseNo`, `specialization`
- `receiveEmailReminders`, `receiveSmsReminders`

**Roles:**
- `SUPER_ADMIN` - You (Dulain), access all clinics
- `CLINIC_ADMIN` - Clinic owner, full access to their clinic
- `VET` - Veterinarian, view schedule, patient records
- `RECEPTIONIST` - Front desk, manage bookings
- `PET_OWNER` - Book appointments, view own pets

### Pet
Stores pet profiles and basic medical information.

**Key Fields:**
- `id`, `clinicId`, `ownerId`
- `name`, `species`, `breed`, `color`, `microchipNo`
- `gender`, `dateOfBirth`, `weight`, `isNeutered`
- `allergies`, `medicalNotes`, `dietaryNeeds`
- `isActive`, `isDeceased`, `photoUrl`

**Species Enum:**
DOG, CAT, BIRD, RABBIT, GUINEA_PIG, HAMSTER, REPTILE, HORSE, OTHER

### Service
Services offered by the clinic (consultations, vaccinations, etc.).

**Key Fields:**
- `id`, `clinicId`
- `name`, `description`, `duration` (minutes), `price`
- `isActive`, `allowOnlineBooking`, `requiresApproval`
- `category` (CONSULTATION, VACCINATION, SURGERY, DENTAL, etc.)
- `color` (for calendar display)

### Appointment
The core booking/appointment table.

**Key Fields:**
- `id`, `clinicId`, `petId`, `vetId`, `serviceId`
- `bookedById`, `bookingSource` (ONLINE, PHONE, WALK_IN, ADMIN)
- `appointmentDate`, `duration`
- `status` (PENDING, CONFIRMED, CHECKED_IN, IN_PROGRESS, COMPLETED, NO_SHOW, CANCELED)
- `reasonForVisit`, `internalNotes`
- `checkedInAt`, `checkedOutAt`
- `reminderSentAt`, `reminderConfirmedAt`
- `canceledAt`, `cancelReason`, `canceledBy`

### AvailabilityRule
Vet working hours, blocked time, vacations.

**Key Fields:**
- `id`, `clinicId`, `vetId` (null = applies to all vets)
- `type` (WORKING_HOURS, BLOCKED, VACATION, OVERRIDE)
- `dayOfWeek`, `startTime`, `endTime` (for recurring schedules)
- `startDate`, `endDate` (for date-specific)
- `title`, `notes`, `isActive`

### MedicalRecord
Medical history from appointments.

**Key Fields:**
- `id`, `clinicId`, `petId`, `vetId`
- `visitDate`, `diagnosis`, `treatment`, `prescription`, `notes`
- `weight`, `temperature`, `heartRate`
- `followUpRequired`, `followUpDate`, `followUpNotes`
- `attachments` (JSON: array of file URLs)

### Vaccination
Vaccination records with next due dates.

**Key Fields:**
- `id`, `petId`
- `vaccineName`, `batchNumber`, `manufacturer`
- `dateGiven`, `givenBy`, `nextDueDate`
- `isCompleted`, `notes`, `reaction`

### Notification
Email/SMS notification logs.

**Key Fields:**
- `id`, `clinicId`, `userId`
- `type` (APPOINTMENT_CONFIRMATION, APPOINTMENT_REMINDER, etc.)
- `channel` (EMAIL, SMS, PUSH)
- `status` (PENDING, SENT, DELIVERED, FAILED, BOUNCED)
- `subject`, `message`, `recipientEmail`, `recipientPhone`
- `sentAt`, `deliveredAt`, `failedAt`, `errorMessage`
- `appointmentId`, `externalId` (provider's message ID)

### NextAuth.js Tables
Standard NextAuth tables: `Account`, `Session`, `VerificationToken`

---

# 4. FEATURE SPECIFICATIONS (DETAILED)

## 4.1 PHASE 1: MVP Features (Weeks 1-6)

### Feature 1: Online Booking System

**User Story:** As a pet owner, I want to book a vet appointment online so I don't have to call during business hours.

**Acceptance Criteria:**
- ✅ Pet owner can access booking page at `vetflow.dulain.dev/book/[clinic-slug]`
- ✅ Shows available time slots for next 30 days
- ✅ Only shows slots within business hours
- ✅ Respects vet availability rules
- ✅ Allows selection of service type
- ✅ Allows selection of preferred vet (or "No preference")
- ✅ Collects pet information if new user
- ✅ Collects owner contact information
- ✅ Shows booking confirmation immediately
- ✅ Sends confirmation email within 1 minute
- ✅ Sends confirmation SMS within 1 minute (if phone provided)
- ✅ Creates user account automatically (magic link for future access)

**Booking Flow (6 Steps):**
1. **Select Service** - Display all active services
2. **Select Date & Time** - Calendar + time slot picker
3. **Select Vet** (Optional) - List of vets or "No preference"
4. **Pet Information** - New pet or select existing
5. **Owner Information** - Contact details
6. **Review & Confirm** - Summary + confirm button

**Availability Calculation:**
```typescript
// Pseudocode
function getAvailableSlots(clinicId, serviceId, vetId, date) {
  1. Get clinic business hours for day of week
  2. If clinic closed, return []
  3. Get service duration
  4. Generate all possible slots (e.g., every 15 min)
  5. Get existing appointments for date
  6. Get vet availability rules (blocked time, vacation)
  7. Mark each slot as available/unavailable
  8. Return array of { time, available }
}
```

**Technical Implementation:**
- Pages: `app/book/[clinicSlug]/page.tsx`
- API: `/api/bookings/availability`, `/api/bookings/create`
- Components: Multi-step form with validation
- State: React Hook Form + Zod schemas

---

### Feature 2: Admin Dashboard

**User Story:** As a receptionist, I want to see today's appointments at a glance so I can manage check-ins efficiently.

**Acceptance Criteria:**
- ✅ Dashboard shows today's appointments in chronological order
- ✅ Each appointment shows: time, pet name, owner name, service, vet, status
- ✅ Can filter by vet, status, date range
- ✅ Can check in appointments with one click
- ✅ Can add quick notes to appointments
- ✅ Can call/email owner directly from appointment card
- ✅ Shows upcoming appointments count
- ✅ Shows no-show count
- ✅ Responsive design (works on iPad at front desk)

**Dashboard Components:**
- Stats cards (total, checked in, no-shows, revenue)
- Filter bar (vet, status, search)
- Appointment list (cards or table)
- Quick actions (check-in, add notes, cancel)

**Technical Implementation:**
- Page: `app/dashboard/page.tsx`
- API: `/api/dashboard/today`
- Components: `AppointmentCard`, `StatsCards`, `FilterBar`

---

### Feature 3: Automated Reminders

**User Story:** As a clinic, I want to automatically send reminders 24 hours before appointments to reduce no-shows.

**Acceptance Criteria:**
- ✅ System sends email reminder 24 hours before appointment
- ✅ System sends SMS reminder 24 hours before appointment
- ✅ Reminder includes: appointment details, address, cancellation link
- ✅ Recipients can confirm attendance via link
- ✅ System logs all reminder sends and delivery status
- ✅ Can manually trigger reminder from admin dashboard
- ✅ Reminders only sent for CONFIRMED appointments
- ✅ No reminders for appointments in the past

**Reminder Content:**
- **Email:** Formatted HTML with clinic branding
- **SMS:** Short text with essential details + link

**Technical Implementation:**
- Cron job: `lib/cron/send-reminders.ts`
- Email service: `lib/email.ts` (Resend)
- SMS service: `lib/sms.ts` (Twilio)
- Vercel Cron: `/api/cron/send-reminders` (runs hourly)

---

### Feature 4: Pet & Owner Records

**User Story:** As a vet, I want to view a pet's medical history before consultation so I can provide better care.

**Acceptance Criteria:**
- ✅ Can search for pet by name, owner name, or microchip
- ✅ Pet profile shows: basic info, photo, medical history, vaccinations
- ✅ Medical history sorted by date (newest first)
- ✅ Each medical record shows: date, vet, diagnosis, treatment, notes
- ✅ Vaccination history shows: vaccine name, date given, next due date
- ✅ Vaccination due dates highlighted if overdue
- ✅ Can upload documents/images to pet profile
- ✅ Owner profile linked to all their pets
- ✅ Can add new pet to existing owner easily

**Pet Profile Sections:**
- Basic info (name, species, breed, DOB, weight)
- Medical notes (allergies, conditions, diet)
- Medical records (chronological list)
- Vaccinations (with due date indicators)
- Appointments (past and upcoming)

**Technical Implementation:**
- Pages: `app/patients/page.tsx`, `app/patients/[id]/page.tsx`
- API: `/api/pets`, `/api/pets/[id]`, `/api/pets/search`
- Components: `PetProfile`, `MedicalRecordList`, `VaccinationList`

---

### Feature 5: Calendar View

**User Story:** As a vet, I want to see my daily schedule in a visual calendar so I can prepare for appointments.

**Acceptance Criteria:**
- ✅ Calendar shows day/week/month views
- ✅ Each appointment displayed as colored block (by service category)
- ✅ Click appointment to see details
- ✅ Drag & drop to reschedule (updates database)
- ✅ Shows gaps in schedule clearly
- ✅ Shows blocked time/breaks
- ✅ Can filter by vet
- ✅ Today highlighted
- ✅ Mobile-responsive (readable on phone)

**Calendar Library:**
- Option 1: FullCalendar (feature-rich, paid for premium)
- Option 2: React Big Calendar (open source)
- Option 3: Custom with Radix UI Primitives

**Technical Implementation:**
- Page: `app/calendar/page.tsx`
- Components: `Calendar` (with drag-drop support)
- API: `/api/appointments/reschedule`

---

## 4.2 PHASE 2: Enhanced Features (Weeks 7-12)

*See [docs/ROADMAP.md](./docs/ROADMAP.md) for Phase 2 and beyond*

---

# 5. USER FLOWS & WIREFRAMES

## 5.1 Online Booking Flow (Pet Owner)

```
START → Landing Page
  ↓
Select Clinic (if multi-clinic, otherwise auto)
  ↓
Select Service
  ├─ General Consultation
  ├─ Vaccination
  ├─ Dental Cleaning
  └─ Emergency
  ↓
Select Date
  ├─ Calendar view (next 30 days)
  ├─ Dates with availability highlighted
  └─ Click date
  ↓
Select Time Slot
  ├─ Morning: 09:00, 09:30, 10:00 ...
  ├─ Afternoon: 13:00, 13:30, 14:00 ...
  └─ Evening: 17:00, 17:30 ...
  ↓
Select Vet (Optional)
  ├─ Dr. Sarah Johnson
  ├─ Dr. James Chen
  └─ No Preference
  ↓
Pet Information
  ├─ Returning user: Select existing pet
  └─ New user: Enter pet details
  ↓
Owner Information
  ├─ First name, Last name
  ├─ Email, Phone
  └─ Address (optional)
  ↓
Reason for Visit
  └─ Textarea: "Why are you bringing [pet] in?"
  ↓
Review & Confirm
  ├─ Summary of booking
  ├─ Terms & conditions checkbox
  └─ [Confirm Booking] button
  ↓
Confirmation Page
  ├─ Success message
  ├─ Booking reference number
  ├─ Email sent confirmation
  ├─ [Add to Calendar] button
  └─ [Manage Booking] link
  ↓
END
```

## 5.2 Check-In Flow (Receptionist)

```
START → Dashboard
  ↓
View Today's Appointments
  ↓
Locate Appointment
  ├─ Search by pet name
  ├─ Search by owner name
  └─ Scroll through list
  ↓
Click [Check In] Button
  ↓
Confirmation Dialog
  "Check in Max (Owner: John Smith)?"
  [Cancel] [Confirm]
  ↓
Status Updated
  ├─ Appointment status: CHECKED_IN
  ├─ Timestamp recorded
  └─ Notification to vet (optional)
  ↓
Update Dashboard
  └─ Appointment moves to "Checked In" section
  ↓
END
```

## 5.3 Add Medical Record Flow (Vet)

```
START → Appointment Detail Page
  ↓
Click [Add Medical Record]
  ↓
Medical Record Form
  ├─ Visit Date (auto-filled)
  ├─ Vet (auto-filled)
  ├─ Weight (kg)
  ├─ Temperature (°C)
  ├─ Heart Rate (BPM)
  ├─ Diagnosis (text)
  ├─ Treatment (textarea)
  ├─ Prescription (textarea)
  ├─ Notes (textarea)
  ├─ Follow-up required? (checkbox)
  │   └─ If yes: Follow-up date
  └─ Attachments (file upload)
  ↓
Click [Save Record]
  ↓
Validation & Save
  ├─ Create MedicalRecord
  ├─ Link to Appointment
  └─ Link to Pet
  ↓
Update Appointment Status → COMPLETED
  ↓
Confirmation Message
  ↓
END
```

---

# 6. UI/UX DESIGN SYSTEM

## 6.1 Design Principles

1. **Simplicity First** - Every screen has ONE primary action
2. **Vet-Friendly** - Large touch targets for iPad use
3. **Pet-Centric** - Pet photos prominent
4. **Speed** - Common actions (check-in, search) in 1-2 clicks
5. **Mobile-Ready** - Works on phones for on-the-go access
6. **Accessible** - WCAG 2.1 AA compliance

## 6.2 Color Palette

```css
/* Primary (Teal - Medical, Trustworthy) */
--primary-500: #14b8a6;
--primary-600: #0d9488;

/* Accent (Blue - Technology) */
--accent-500: #3b82f6;

/* Success, Warning, Error */
--success-500: #10b981;
--warning-500: #f59e0b;
--error-500: #ef4444;

/* Neutrals */
--gray-50: #f9fafb;
--gray-900: #111827;
```

## 6.3 Typography

- **Font Family:** Inter (Google Fonts)
- **Base Size:** 16px
- **Scale:** 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px
- **Weights:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## 6.4 Component Library

**shadcn/ui Components:**
- Button, Input, Select, Textarea
- Checkbox, Radio Group
- Date Picker
- Dialog (Modal)
- Alert, Badge
- Card, Table, Tabs
- Tooltip, Avatar

**Custom Components:**
- AppointmentCard
- PetProfile
- Calendar
- StatsCards
- FilterBar

## 6.5 Key Screens

*See wireframes in original specification*

---

# 7. SERVER ACTIONS & API

> **Note:** This project primarily uses Next.js Server Actions (`lib/*-actions.ts`) instead of REST API routes. See `docs/SERVER_ACTIONS.md` for details.

## 7.1 Authentication (NextAuth)
```
POST   /api/auth/signin
POST   /api/auth/signout
GET    /api/auth/session
```

## 7.2 Clinics
```
GET    /api/clinics
GET    /api/clinics/[slug]
POST   /api/clinics
PATCH  /api/clinics/[id]
GET    /api/clinics/[id]/stats
```

## 7.3 Users
```
GET    /api/users
GET    /api/users/[id]
POST   /api/users
PATCH  /api/users/[id]
DELETE /api/users/[id]
POST   /api/users/[id]/resend-invite
```

## 7.4 Pets
```
GET    /api/pets
GET    /api/pets/[id]
POST   /api/pets
PATCH  /api/pets/[id]
DELETE /api/pets/[id]
GET    /api/pets/[id]/history
GET    /api/pets/search?q=max
```

## 7.5 Appointments
```
GET    /api/appointments
GET    /api/appointments/[id]
POST   /api/appointments
PATCH  /api/appointments/[id]
DELETE /api/appointments/[id]

POST   /api/appointments/[id]/check-in
POST   /api/appointments/[id]/complete
POST   /api/appointments/[id]/no-show
POST   /api/appointments/[id]/reschedule

GET    /api/appointments/availability
POST   /api/appointments/[id]/remind
```

## 7.6 Services
```
GET    /api/services
GET    /api/services/[id]
POST   /api/services
PATCH  /api/services/[id]
DELETE /api/services/[id]
```

## 7.7 Medical Records
```
GET    /api/medical-records
GET    /api/medical-records/[id]
POST   /api/medical-records
PATCH  /api/medical-records/[id]
DELETE /api/medical-records/[id]
POST   /api/medical-records/[id]/pdf
```

## 7.8 Vaccinations
```
GET    /api/vaccinations
POST   /api/vaccinations
PATCH  /api/vaccinations/[id]
GET    /api/vaccinations/due
```

## 7.9 Reports
```
GET    /api/reports/appointments
GET    /api/reports/revenue
GET    /api/reports/pets
GET    /api/reports/vets
POST   /api/reports/export
```

## 7.10 Notifications
```
GET    /api/notifications
POST   /api/notifications/send
GET    /api/notifications/logs
```

## 7.11 Cron Jobs
```
GET    /api/cron/send-reminders
GET    /api/cron/check-overdue-vaccinations
```

---

**For sections 8-12, see the organized documentation in `/docs`:**

- [Section 8: Third-Party Integrations](./docs/INTEGRATIONS.md)
- [Section 9: Security & Compliance](./docs/SECURITY.md)
- [Section 10: Deployment & DevOps](./docs/DEPLOYMENT.md)
- [Section 11: Testing Strategy](./docs/TESTING.md)
- [Section 12: Future Enhancements & Roadmap](./docs/ROADMAP.md)

---

**Document Version:** 1.0  
**Last Updated:** January 29, 2025  
**Author:** Dulain

**Copyright © 2025 VetFlow. All rights reserved.**
