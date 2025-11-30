# Server Actions Reference

This project uses **Next.js Server Actions** instead of traditional REST API routes for most data mutations and fetching. This provides better type safety and simplifies the architecture.

## 1. Appointment Actions (`lib/appointment-actions.ts`)

Manage internal appointment operations (Admin/Vet dashboard).

| Action | Description | Parameters |
|Str|Str|Str|
| `getAppointments` | Fetch appointments with filtering | `clinicId`, `date`, `vetId`, `status`, `page`, `limit` |
| `updateAppointmentStatus` | Change appointment status | `appointmentId`, `status` |
| `createManualAppointment` | Admin creates appointment | `clinicId`, `ownerId`, `petId`, `serviceId`, `vetId`, `date`, `notes` |
| `updateAppointmentTime` | Reschedule appointment | `id`, `newDate`, `newDuration` |
| `searchOwners` | Search for pet owners | `clinicId`, `query` |
| `getPetsForOwner` | Get pets for a specific owner | `ownerId` |
| `createAvailabilityRule` | Block time or set vacation | `clinicId`, `vetId`, `startDate`, `endDate`, `type`, `notes` |
| `getAvailabilityRules` | Get vet schedules | `clinicId`, `date` |

## 2. Booking Actions (`lib/booking-actions.ts`)

Public-facing actions for the online booking flow.

| Action | Description | Parameters |
|Str|Str|Str|
| `getServices` | List active services for a clinic | `clinicSlug` |
| `getVets` | List available vets | `clinicSlug` |
| `getAvailableSlots` | Calculate free time slots | `date`, `clinicSlug`, `serviceId`, `vetId` |
| `createBooking` | Create new public booking | `clinicSlug`, `serviceId`, `vetId`, `date`, `time`, `details` |

## 3. Pet Actions (`lib/pet-actions.ts`)

Manage pet records.

| Action | Description | Parameters |
|Str|Str|Str|
| `createPet` | Create a new pet profile | `name`, `species`, `breed`, `gender`, `ownerId`, etc. |
| `getClients` | Search/List clients | `query` |

## 4. Other Actions

*   **`lib/medical-actions.ts`**: Manage medical records and vaccinations.
*   **`lib/client-actions.ts`**: Manage client profiles.
*   **`lib/staff-actions.ts`**: Manage clinic staff and permissions.
*   **`lib/report-actions.ts`**: Generate dashboard reports.

## Usage Example (Client Component)

```tsx
"use client"

import { updateAppointmentStatus } from "@/lib/appointment-actions"
import { toast } from "sonner"

export function CheckInButton({ id }: { id: string }) {
  async function handleCheckIn() {
    const result = await updateAppointmentStatus(id, "CHECKED_IN")
    
    if (result.success) {
      toast.success("Checked in successfully")
    } else {
      toast.error(result.error)
    }
  }

  return <button onClick={handleCheckIn}>Check In</button>
}
```
