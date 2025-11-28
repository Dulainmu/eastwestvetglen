import { PrismaClient, Role, Species, Gender, ServiceCategory, AppointmentStatus, BookingSource } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting seed...')

    // Clean existing data (in development only)
    if (process.env.NODE_ENV === 'development') {
        console.log('🗑️  Cleaning existing data...')
        await prisma.notification.deleteMany()
        await prisma.vaccination.deleteMany()
        await prisma.medicalRecord.deleteMany()
        await prisma.appointment.deleteMany()
        await prisma.availabilityRule.deleteMany()
        await prisma.service.deleteMany()
        await prisma.pet.deleteMany()
        await prisma.session.deleteMany()
        await prisma.account.deleteMany()
        await prisma.user.deleteMany()
        await prisma.clinic.deleteMany()
    }

    // 1. Create Demo Clinic
    console.log('🏥 Creating demo clinic...')
    const demoClinic = await prisma.clinic.create({
        data: {
            name: 'Happy Paws Veterinary Clinic',
            slug: 'happy-paws',
            email: 'info@happypaws.com.au',
            phone: '02 8765 4321',
            address: '123 George Street',
            city: 'Sydney',
            state: 'NSW',
            postcode: '2000',
            abn: '12 345 678 901',
            website: 'https://happypaws.com.au',
            timezone: 'Australia/Sydney',
            allowOnlineBooking: true,
            sendReminders: true,
        },
    })

    // 2. Create Users
    console.log('👥 Creating users...')
    const hashedPassword = await bcrypt.hash('password123', 12)

    // Super Admin (you)
    const superAdmin = await prisma.user.create({
        data: {
            clinicId: demoClinic.id,
            email: 'admin@vetflow.dulain.dev',
            password: hashedPassword,
            firstName: 'Dulain',
            lastName: 'Admin',
            role: Role.SUPER_ADMIN,
            mobile: '+61400000000',
        },
    })

    // Clinic Admin
    const clinicAdmin = await prisma.user.create({
        data: {
            clinicId: demoClinic.id,
            email: 'owner@happypaws.com.au',
            password: hashedPassword,
            firstName: 'Linda',
            lastName: 'Smith',
            role: Role.CLINIC_ADMIN,
            mobile: '+61400000001',
        },
    })

    // Vet 1
    const vet1 = await prisma.user.create({
        data: {
            clinicId: demoClinic.id,
            email: 'sarah@happypaws.com.au',
            password: hashedPassword,
            firstName: 'Sarah',
            lastName: 'Johnson',
            role: Role.VET,
            mobile: '+61400000002',
            veterinaryLicenseNo: 'VET123456',
            specialization: 'General Practice',
            availableForBooking: true,
        },
    })

    // Vet 2
    const vet2 = await prisma.user.create({
        data: {
            clinicId: demoClinic.id,
            email: 'james@happypaws.com.au',
            password: hashedPassword,
            firstName: 'James',
            lastName: 'Chen',
            role: Role.VET,
            mobile: '+61400000003',
            veterinaryLicenseNo: 'VET789012',
            specialization: 'Surgery',
            availableForBooking: true,
        },
    })

    // Receptionist
    const receptionist = await prisma.user.create({
        data: {
            clinicId: demoClinic.id,
            email: 'michelle@happypaws.com.au',
            password: hashedPassword,
            firstName: 'Michelle',
            lastName: 'Wong',
            role: Role.RECEPTIONIST,
            mobile: '+61400000004',
        },
    })

    // Pet Owner 1
    const owner1 = await prisma.user.create({
        data: {
            clinicId: demoClinic.id,
            email: 'john@example.com',
            password: hashedPassword,
            firstName: 'John',
            lastName: 'Davis',
            role: Role.PET_OWNER,
            mobile: '+61412345678',
            address: '45 Market Street',
            city: 'Sydney',
            state: 'NSW',
            postcode: '2000',
        },
    })

    // Pet Owner 2
    const owner2 = await prisma.user.create({
        data: {
            clinicId: demoClinic.id,
            email: 'emma@example.com',
            password: hashedPassword,
            firstName: 'Emma',
            lastName: 'Wilson',
            role: Role.PET_OWNER,
            mobile: '+61423456789',
            address: '78 King Street',
            city: 'Sydney',
            state: 'NSW',
            postcode: '2000',
        },
    })

    // 3. Create Services
    console.log('💊 Creating services...')
    const consultation = await prisma.service.create({
        data: {
            clinicId: demoClinic.id,
            name: 'General Consultation',
            description: 'Standard veterinary examination and consultation',
            duration: 30,
            price: 80,
            category: ServiceCategory.CONSULTATION,
            color: '#3b82f6',
        },
    })

    const vaccination = await prisma.service.create({
        data: {
            clinicId: demoClinic.id,
            name: 'Vaccination',
            description: 'Annual vaccinations and boosters',
            duration: 15,
            price: 65,
            category: ServiceCategory.VACCINATION,
            color: '#10b981',
        },
    })

    const dentalCleaning = await prisma.service.create({
        data: {
            clinicId: demoClinic.id,
            name: 'Dental Cleaning',
            description: 'Professional dental cleaning under sedation',
            duration: 60,
            price: 250,
            category: ServiceCategory.DENTAL,
            color: '#f59e0b',
        },
    })

    const emergency = await prisma.service.create({
        data: {
            clinicId: demoClinic.id,
            name: 'Emergency Visit',
            description: 'Urgent care for critical situations',
            duration: 30,
            price: 120,
            category: ServiceCategory.EMERGENCY,
            color: '#ef4444',
        },
    })

    // 4. Create Pets
    console.log('🐾 Creating pets...')
    const pet1 = await prisma.pet.create({
        data: {
            clinicId: demoClinic.id,
            ownerId: owner1.id,
            name: 'Max',
            species: Species.DOG,
            breed: 'Golden Retriever',
            gender: Gender.MALE,
            dateOfBirth: new Date('2020-01-15'),
            weight: 32,
            isNeutered: true,
            microchipNo: '123456789012345',
            color: 'Golden',
        },
    })

    const pet2 = await prisma.pet.create({
        data: {
            clinicId: demoClinic.id,
            ownerId: owner2.id,
            name: 'Luna',
            species: Species.CAT,
            breed: 'Persian',
            gender: Gender.FEMALE,
            dateOfBirth: new Date('2021-03-20'),
            weight: 4.5,
            isNeutered: true,
            microchipNo: '987654321098765',
            color: 'White',
        },
    })

    const pet3 = await prisma.pet.create({
        data: {
            clinicId: demoClinic.id,
            ownerId: owner1.id,
            name: 'Charlie',
            species: Species.DOG,
            breed: 'Labrador',
            gender: Gender.MALE,
            dateOfBirth: new Date('2019-06-10'),
            weight: 28,
            isNeutered: false,
            color: 'Black',
        },
    })

    // 5. Create Appointments (some upcoming, some past)
    console.log('📅 Creating appointments...')
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    // Today's appointments
    await prisma.appointment.create({
        data: {
            clinicId: demoClinic.id,
            petId: pet1.id,
            vetId: vet1.id,
            serviceId: consultation.id,
            bookedById: owner1.id,
            appointmentDate: new Date(today.getTime() + 9 * 60 * 60 * 1000), // 9 AM today
            duration: 30,
            status: AppointmentStatus.CHECKED_IN,
            bookingSource: BookingSource.ONLINE,
            reasonForVisit: 'Annual checkup',
        },
    })

    await prisma.appointment.create({
        data: {
            clinicId: demoClinic.id,
            petId: pet2.id,
            vetId: vet2.id,
            serviceId: vaccination.id,
            bookedById: owner2.id,
            appointmentDate: new Date(today.getTime() + 10 * 60 * 60 * 1000), // 10 AM today
            duration: 15,
            status: AppointmentStatus.CONFIRMED,
            bookingSource: BookingSource.ONLINE,
            reasonForVisit: 'Annual vaccination',
        },
    })

    // Tomorrow's appointment
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
    await prisma.appointment.create({
        data: {
            clinicId: demoClinic.id,
            petId: pet3.id,
            vetId: vet1.id,
            serviceId: dentalCleaning.id,
            bookedById: owner1.id,
            appointmentDate: new Date(tomorrow.getTime() + 14 * 60 * 60 * 1000), // 2 PM tomorrow
            duration: 60,
            status: AppointmentStatus.CONFIRMED,
            bookingSource: BookingSource.PHONE,
            reasonForVisit: 'Dental cleaning needed',
        },
    })

    // 6. Create Vaccinations
    console.log('💉 Creating vaccination records...')
    await prisma.vaccination.create({
        data: {
            petId: pet1.id,
            vaccineName: 'Rabies',
            dateGiven: new Date('2024-01-15'),
            givenBy: 'Dr. Sarah Johnson',
            nextDueDate: new Date('2025-01-15'),
            isCompleted: true,
        },
    })

    await prisma.vaccination.create({
        data: {
            petId: pet1.id,
            vaccineName: 'DHPP',
            dateGiven: new Date('2024-01-15'),
            givenBy: 'Dr. Sarah Johnson',
            nextDueDate: new Date('2027-01-15'),
            isCompleted: true,
        },
    })

    console.log('✅ Seed completed successfully!')
    console.log('\n📊 Created:')
    console.log(`   - 1 clinic (${demoClinic.name})`)
    console.log(`   - 7 users (1 super admin, 1 clinic admin, 2 vets, 1 receptionist, 2 pet owners)`)
    console.log(`   - 4 services`)
    console.log(`   - 3 pets`)
    console.log(`   - 3 appointments`)
    console.log(`   - 2 vaccination records`)
    console.log('\n🔐 Login credentials:')
    console.log('   Super Admin: admin@vetflow.dulain.dev / password123')
    console.log('   Clinic Admin: owner@happypaws.com.au / password123')
    console.log('   Vet: sarah@happypaws.com.au / password123')
    console.log('   Receptionist: michelle@happypaws.com.au / password123')
    console.log('   Pet Owner: john@example.com / password123')
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
