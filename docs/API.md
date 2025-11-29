# API Endpoints & Routes

## Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login (handled by NextAuth)
- `POST /api/auth/logout` - Logout
- `GET /api/auth/session` - Get current session

## Clinics
- `GET /api/clinics` - List all clinics (Super Admin)
- `GET /api/clinics/[slug]` - Get clinic details by slug
- `POST /api/clinics` - Create new clinic
- `PATCH /api/clinics/[id]` - Update clinic settings

## Users
- `GET /api/users` - List users for a clinic
- `POST /api/users` - Create new user (Staff/Owner)
- `PATCH /api/users/[id]` - Update user details
- `DELETE /api/users/[id]` - Delete user

## Pets
- `GET /api/pets` - List pets
- `GET /api/pets/[id]` - Get pet details
- `POST /api/pets` - Create new pet
- `PATCH /api/pets/[id]` - Update pet details
- `GET /api/pets/[id]/history` - Get medical history

## Appointments
- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Create booking
- `PATCH /api/appointments/[id]` - Update appointment
- `POST /api/appointments/[id]/check-in` - Check in patient
- `POST /api/appointments/[id]/complete` - Complete appointment
- `GET /api/appointments/availability` - Check available slots

## Services
- `GET /api/services` - List services
- `POST /api/services` - Create service
- `PATCH /api/services/[id]` - Update service

## Medical Records
- `GET /api/medical-records` - List records
- `POST /api/medical-records` - Create record
- `POST /api/medical-records/[id]/pdf` - Generate PDF

## Notifications
- `GET /api/notifications` - List notifications
- `POST /api/notifications/send` - Manually send notification
