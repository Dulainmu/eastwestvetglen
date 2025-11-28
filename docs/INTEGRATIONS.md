# 8. THIRD-PARTY INTEGRATIONS

## 8.1 Email (Resend)

**Why Resend:**
- Developer-friendly API with simple integration
- Generous free tier (3,000 emails/month, then $0.10/1000)
- React Email component support (create emails with React)
- Built-in email templates
- Delivery tracking and analytics
- Australian data regions available
- No credit card required for free tier

**Setup:**
```bash
npm install resend
```

**Environment Variables:**
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
FROM_EMAIL=noreply@vetflow.dulain.dev
```

**Implementation:**
```typescript
// lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAppointmentConfirmation(data: {
  to: string;
  appointmentDate: Date;
  petName: string;
  serviceName: string;
  clinicName: string;
  clinicAddress: string;
  vetName: string;
}) {
  const { data: response, error } = await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: data.to,
    subject: `Appointment Confirmed: ${data.petName} on ${format(data.appointmentDate, 'MMM d, yyyy')}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #14b8a6; color: white; padding: 20px; text-align: center; }
            .content { background: #f9fafb; padding: 30px; border-radius: 8px; margin: 20px 0; }
            .detail { margin: 15px 0; }
            .label { font-weight: bold; color: #6b7280; }
            .button { background: #14b8a6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
            .footer { text-align: center; color: #9ca3af; font-size: 14px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🐾 Appointment Confirmed</h1>
            </div>
            <div class="content">
              <p>Hi there,</p>
              <p>Your appointment for <strong>${data.petName}</strong> has been confirmed!</p>
              
              <div class="detail">
                <span class="label">📅 Date & Time:</span><br>
                ${format(data.appointmentDate, 'EEEE, MMMM d, yyyy \'at\' h:mm a')}
              </div>
              
              <div class="detail">
                <span class="label">📍 Location:</span><br>
                ${data.clinicName}<br>
                ${data.clinicAddress}
              </div>
              
              <div class="detail">
                <span class="label">🐾 Service:</span><br>
                ${data.serviceName}
              </div>
              
              <div class="detail">
                <span class="label">👨‍⚕️ Veterinarian:</span><br>
                ${data.vetName}
              </div>
              
              <p>Please arrive 5 minutes early for check-in.</p>
              
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/appointments/manage" class="button">
                Manage Appointment
              </a>
            </div>
            
            <div class="footer">
              <p>Need to reschedule or cancel? <a href="${process.env.NEXT_PUBLIC_APP_URL}/appointments/manage">Manage your booking</a></p>
              <p>You're receiving this because an appointment was booked for your pet.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });

  if (error) {
    console.error('Email send error:', error);
    throw new Error('Failed to send email');
  }

  return response;
}

export async function sendAppointmentReminder(data: {
  to: string;
  appointmentDate: Date;
  petName: string;
  serviceName: string;
  clinicName: string;
  clinicAddress: string;
  vetName: string;
  manageUrl: string;
}) {
  // Similar implementation for reminders
}

export async function sendWelcomeEmail(data: {
  to: string;
  firstName: string;
  clinicName: string;
  loginUrl: string;
}) {
  // Welcome email for new users
}
```

---

## 8.2 SMS (Twilio)

**Why Twilio:**
- Industry leader in SMS/communications
- Excellent delivery rates in Australia
- Supports two-way SMS (future: confirmations via reply)
- Reliable and scalable
- Good documentation and SDKs

**Pricing:**
- Australian SMS: ~$0.08 USD per message
- Incoming SMS: $0.011 USD per message
- Phone numbers: $1.50 USD/month (optional)

**Setup:**
```bash
npm install twilio
```

**Environment Variables:**
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+61xxxxxxxxx  # Or use Messaging Service SID
```

**Implementation:**
```typescript
// lib/sms.ts
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendSMS(params: {
  to: string;  // Should be in E.164 format: +61412345678
  message: string;
}) {
  try {
    const result = await client.messages.create({
      body: params.message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: params.to,
    });

    console.log('SMS sent:', result.sid);
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error('SMS send error:', error);
    throw new Error('Failed to send SMS');
  }
}

export async function sendAppointmentReminderSMS(data: {
  to: string;
  petName: string;
  appointmentDate: Date;
  clinicName: string;
  manageUrl: string;
}) {
  const message = `VetFlow Reminder: ${data.petName}'s appointment tomorrow at ${format(data.appointmentDate, 'h:mm a')}. ${data.clinicName}. Manage: ${data.manageUrl}`;
  
  return sendSMS({
    to: data.to,
    message: message.substring(0, 160), // SMS limit
  });
}

// Helper: Format Australian phone number to E.164
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Australian mobile: 04xx xxx xxx → +614xxxxxxxxx
  if (digits.startsWith('04') && digits.length === 10) {
    return `+61${digits.substring(1)}`;
  }
  
  // Already has country code
  if (digits.startsWith('61')) {
    return `+${digits}`;
  }
  
  return phone; // Return as-is if can't parse
}
```

---

## 8.3 File Storage (Supabase Storage)

**Why Supabase Storage:**
- Integrated with Supabase PostgreSQL (single platform)
- S3-compatible API (familiar, portable)
- Built-in image optimization and transformations
- CDN included
- Generous free tier (1GB storage, 2GB bandwidth)
- Row-level security policies

**Use Cases:**
- Clinic logos
- Pet photos
- User avatars  
- Medical record attachments (X-rays, lab results PDFs)
- Vaccination certificates

**Setup:**
```typescript
// lib/storage.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role for server-side
);

export async function uploadPetPhoto(file: File, petId: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${petId}-${Date.now()}.${fileExt}`;
  const filePath = `pets/${fileName}`;

  const { data, error } = await supabase.storage
    .from('vetflow-uploads')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('vetflow-uploads')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

export async function uploadMedicalDocument(
  file: File,
  petId: string,
  recordId: string
): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${recordId}-${Date.now()}.${fileExt}`;
  const filePath = `medical-records/${petId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('vetflow-documents')
    .upload(filePath, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from('vetflow-documents')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

// Delete file
export async function deleteFile(bucket: string, path: string): Promise<void> {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) throw error;
}
```

**Storage Buckets:**
- `vetflow-uploads` - Public (pet photos, logos)
- `vetflow-documents` - Private (medical records - requires authentication)

**Security Policies (Supabase Dashboard):**
```sql
-- Allow authenticated users to upload to their clinic's folder
CREATE POLICY "Users can upload to their clinic"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'vetflow-uploads' AND
  (storage.foldername(name))[1] = auth.jwt() ->> 'clinic_id'
);

-- Allow authenticated users to read their clinic's files
CREATE POLICY "Users can view their clinic files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'vetflow-uploads' AND
  (storage.foldername(name))[1] = auth.jwt() ->> 'clinic_id'
);
```

---

## 8.4 Payments (Stripe)

**Why Stripe:**
- Industry standard for online payments
- Excellent developer experience
- PCI compliance handled automatically
- Supports Australian cards, bank transfers (BECS)
- Built-in fraud protection
- Recurring billing (subscriptions)
- Detailed reporting

**Pricing:**
- 1.75% + $0.30 AUD per transaction (Australian cards)
- No monthly fees, no setup fees

**Phase 2 Feature - Implementation:**
```typescript
// lib/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Create payment intent for appointment deposit
export async function createPaymentIntent(amount: number, metadata: {
  appointmentId: string;
  clinicId: string;
  petId: string;
}) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency: 'aud',
    metadata,
    automatic_payment_methods: { enabled: true },
  });

  return paymentIntent;
}

// Create subscription for clinic (SaaS billing)
export async function createSubscription(params: {
  clinicId: string;
  email: string;
  priceId: string; // Stripe Price ID for plan
}) {
  const customer = await stripe.customers.create({
    email: params.email,
    metadata: { clinicId: params.clinicId },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: params.priceId }],
    trial_period_days: 14,
  });

  return { customer, subscription };
}

// Webhook handler
export async function handleStripeWebhook(
  rawBody: string,
  signature: string
) {
  const event = stripe.webhooks.constructEvent(
    rawBody,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  switch (event.type) {
    case 'payment_intent.succeeded':
      // Mark appointment as paid
      break;
    case 'subscription.updated':
      // Update clinic subscription status
      break;
    case 'invoice.payment_failed':
      // Notify clinic admin
      break;
  }
}
```

---

## 8.5 Monitoring & Analytics

### **Vercel Analytics**
- Built-in web vitals tracking
- Real-time visitor analytics
- Automatic setup (zero config)
- Free tier included

### **Sentry (Error Tracking)**

**Setup:**
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

```typescript
// sentry.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
  beforeSend(event, hint) {
    // Filter out sensitive data
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers;
    }
    return event;
  },
});
```

### **UptimeRobot (Uptime Monitoring)**
- Free tier: 50 monitors
- Monitor website uptime
- API endpoint health checks
- Email/SMS alerts when down
- Public status page

**Monitors to configure:**
- Homepage: https://vetflow.dulain.dev
- API Health: https://vetflow.dulain.dev/api/health
- Database health check

---

## 8.6 Google Calendar Integration (Future)

Allow clinics to sync appointments to Google Calendar:

```typescript
// lib/google-calendar.ts
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export async function createCalendarEvent(appointment: Appointment) {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  
  await calendar.events.insert({
    calendarId: 'primary',
    requestBody: {
      summary: `${appointment.pet.name} - ${appointment.service.name}`,
      description: `Owner: ${appointment.owner.name}\nReason: ${appointment.reasonForVisit}`,
      start: {
        dateTime: appointment.appointmentDate.toISOString(),
        timeZone: appointment.clinic.timezone,
      },
      end: {
        dateTime: addMinutes(appointment.appointmentDate, appointment.duration).toISOString(),
        timeZone: appointment.clinic.timezone,
      },
    },
  });
}
```
