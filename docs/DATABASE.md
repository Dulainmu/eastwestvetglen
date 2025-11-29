# Database Schema

> **Note:** This documentation provides an overview. For the exact schema definition, please refer to `prisma/schema.prisma`.

## Core Tables

### Clinic
Stores clinic information, settings, and branding.
- **Key Fields:** `id`, `name`, `slug`, `email`, `phone`, `address`, `businessHours`
- **Settings:** `bookingBufferMinutes`, `allowOnlineBooking`, `sendReminders`

### User
Stores all users: clinic staff (admins, vets, receptionists) and pet owners.
- **Key Fields:** `id`, `clinicId`, `email`, `password`, `firstName`, `lastName`, `role`
- **Roles:** `SUPER_ADMIN`, `CLINIC_ADMIN`, `VET`, `RECEPTIONIST`, `PET_OWNER`
- **Vet Fields:** `veterinaryLicenseNo`, `specialization`

### Pet
Stores pet profiles and basic medical information.
- **Key Fields:** `id`, `clinicId`, `ownerId`, `name`, `species`, `breed`, `dateOfBirth`
- **Medical:** `allergies`, `medicalNotes`, `dietaryNeeds`

### Service
Services offered by the clinic.
- **Key Fields:** `id`, `clinicId`, `name`, `description`, `duration`, `price`, `category`

### Appointment
The core booking/appointment table.
- **Key Fields:** `id`, `clinicId`, `petId`, `vetId`, `serviceId`, `appointmentDate`, `status`
- **Status Enum:** `PENDING`, `CONFIRMED`, `CHECKED_IN`, `IN_PROGRESS`, `COMPLETED`, `NO_SHOW`, `CANCELED`

### AvailabilityRule
Vet working hours, blocked time, vacations.
- **Key Fields:** `id`, `clinicId`, `vetId`, `type`, `dayOfWeek`, `startTime`, `endTime`

### MedicalRecord
Medical history from appointments.
- **Key Fields:** `id`, `clinicId`, `petId`, `vetId`, `visitDate`, `diagnosis`, `treatment`

### Vaccination
Vaccination records with next due dates.
- **Key Fields:** `id`, `petId`, `vaccineName`, `dateGiven`, `nextDueDate`

### Notification
Email/SMS notification logs.
- **Key Fields:** `id`, `clinicId`, `userId`, `type`, `channel`, `status`
