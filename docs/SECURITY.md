# 9. SECURITY & COMPLIANCE

## 9.1 Authentication & Authorization

### **Authentication Strategy**

**NextAuth.js v5 (Auth.js)**
- Industry-standard authentication library
- JWT + database sessions hybrid approach
- Built-in CSRF protection
- Secure cookie handling
- OAuth provider support (future: Google Sign-In)

**Implementation:**
```typescript
// auth.config.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
          include: { clinic: true },
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Invalid email or password");
        }

        if (!user.isActive) {
          throw new Error("Account is deactivated");
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          clinicId: user.clinicId,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.clinicId = user.clinicId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as Role;
        session.user.clinicId = token.clinicId as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
```

### **Password Security**

**Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

**Hashing:**
```typescript
import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
```

### **Authorization (RBAC - Role-Based Access Control)**

**Middleware:**
```typescript
// middleware.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user;

  // Public routes
  const publicRoutes = ["/", "/login", "/register", "/book"];
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Require authentication
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Role-based access
  const adminRoutes = ["/admin", "/settings", "/reports"];
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!["CLINIC_ADMIN", "SUPER_ADMIN"].includes(user.role)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

**API Route Protection:**
```typescript
// lib/auth-helpers.ts
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function requireAuth(req: NextRequest) {
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  return session.user;
}

export async function requireRole(req: NextRequest, allowedRoles: Role[]) {
  const user = await requireAuth(req);
  
  if (user instanceof NextResponse) {
    return user; // Return error if not authenticated
  }
  
  if (!allowedRoles.includes(user.role)) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    );
  }
  
  return user;
}

// Usage in API route:
export async function GET(req: NextRequest) {
  const user = await requireRole(req, ["CLINIC_ADMIN", "SUPER_ADMIN"]);
  if (user instanceof NextResponse) return user;
  
  // User is authorized, proceed
}
```

---

## 9.2 Data Privacy & Compliance

### **Australian Privacy Act 1988**

VetFlow handles personal information and must comply with the Australian Privacy Principles (APPs):

**Key Requirements:**
1. **Transparency:** Privacy policy must clearly explain data collection
2. **Consent:** Users must consent to data collection
3. **Data minimization:** Only collect necessary data
4. **Security:** Reasonable steps to protect data
5. **Access rights:** Users can request their data
6. **Correction rights:** Users can correct their data
7. **Deletion rights:** Users can request data deletion

**Implementation:**

**Privacy Policy Page:**
```markdown
# Privacy Policy

Last updated: [Date]

## What data we collect
- Personal information (name, email, phone, address)
- Pet information (name, species, breed, medical records)
- Appointment information
- Payment information (processed by Stripe, we don't store card details)

## How we use your data
- Manage appointments and bookings
- Send appointment reminders
- Provide veterinary services
- Improve our service

## Data sharing
We do NOT sell your data. We share data only with:
- Your chosen veterinary clinic
- Service providers (email/SMS delivery)
- Payment processors (Stripe)

## Your rights
- Access your data: Request a copy of your data
- Correct your data: Update incorrect information
- Delete your data: Request account deletion
- Opt-out: Unsubscribe from marketing emails

## Data retention
- Active accounts: Data retained while account is active
- Deleted accounts: Data anonymized after 30 days
- Medical records: Retained for 7 years (legal requirement)

## Security
- Data encrypted in transit (TLS/HTTPS)
- Data encrypted at rest
- Regular security audits
- Access controls and logging

## Contact
For privacy inquiries: privacy@vetflow.dulain.dev
```

**Data Export (GDPR-style):**
```typescript
// app/api/user/export/route.ts
export async function GET(req: NextRequest) {
  const user = await requireAuth(req);
  if (user instanceof NextResponse) return user;

  // Gather all user data
  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      pets: {
        include: {
          appointments: true,
          vaccinations: true,
          medicalRecords: true,
        },
      },
      appointments: true,
    },
  });

  // Remove sensitive fields
  const exportData = {
    ...userData,
    password: undefined,
  };

  return NextResponse.json(exportData, {
    headers: {
      "Content-Disposition": `attachment; filename="vetflow-data-${user.id}.json"`,
    },
  });
}
```

**Data Deletion:**
```typescript
// app/api/user/delete/route.ts
export async function DELETE(req: NextRequest) {
  const user = await requireAuth(req);
  if (user instanceof NextResponse) return user;

  // Anonymize instead of hard delete (preserve medical records)
  await prisma.user.update({
    where: { id: user.id },
    data: {
      email: `deleted-${user.id}@vetflow.deleted`,
      firstName: "Deleted",
      lastName: "User",
      phone: null,
      mobile: null,
      address: null,
      isActive: false,
      // Keep pets and medical records but anonymize
    },
  });

  return NextResponse.json({ success: true });
}
```

### **GDPR Compliance (if targeting EU)**

If expanding to Europe, additional requirements:
- Cookie consent banner
- Data Processing Agreements (DPAs) with vendors
- Data Protection Officer (DPO) if processing large volumes
- Right to data portability
- Stricter consent requirements

---

## 9.3 Data Encryption

### **In Transit**
- **TLS 1.3** for all connections
- HTTPS enforced everywhere
- HSTS (HTTP Strict Transport Security) enabled

**Vercel Configuration (automatic):**
- Auto-renewing SSL certificates
- Force HTTPS redirects
- Security headers

### **At Rest**
- **Database:** Supabase PostgreSQL uses AES-256 encryption
- **File Storage:** Supabase Storage uses AES-256 encryption
- **Backups:** Encrypted backups

**Additional Encryption for Sensitive Fields:**
```typescript
// lib/encryption.ts
import crypto from "crypto";

const algorithm = "aes-256-gcm";
const secretKey = Buffer.from(process.env.ENCRYPTION_KEY!, "hex"); // 32 bytes

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  
  const authTag = cipher.getAuthTag();
  
  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
}

export function decrypt(encryptedData: string): string {
  const [ivHex, authTagHex, encrypted] = encryptedData.split(":");
  
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  decipher.setAuthTag(authTag);
  
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  
  return decrypted;
}

// Usage: Encrypt sensitive medical notes
const encryptedNotes = encrypt(medicalRecord.notes);
```

---

## 9.4 Audit Logging

Track all sensitive operations for security and compliance:

**Audit Log Schema:**
```prisma
model AuditLog {
  id          String   @id @default(cuid())
  clinicId    String
  userId      String?  // Null if system action
  user        User?    @relation(fields: [userId], references: [id])
  
  action      String   // "USER_LOGIN", "APPOINTMENT_CREATED", "RECORD_VIEWED"
  entity      String?  // "User", "Appointment", "MedicalRecord"
  entityId    String?
  
  ipAddress   String?
  userAgent   String?
  
  metadata    Json?    // Additional context
  
  createdAt   DateTime @default(now())
  
  @@index([clinicId, action, createdAt])
  @@index([userId, createdAt])
}
```

**Implementation:**
```typescript
// lib/audit-log.ts
export async function logAction(params: {
  clinicId: string;
  userId?: string;
  action: string;
  entity?: string;
  entityId?: string;
  metadata?: Record<string, any>;
  req?: NextRequest;
}) {
  await prisma.auditLog.create({
    data: {
      clinicId: params.clinicId,
      userId: params.userId,
      action: params.action,
      entity: params.entity,
      entityId: params.entityId,
      ipAddress: params.req
        ? params.req.headers.get("x-forwarded-for") || params.req.headers.get("x-real-ip")
        : null,
      userAgent: params.req?.headers.get("user-agent"),
      metadata: params.metadata,
    },
  });
}

// Usage in API routes:
export async function POST(req: NextRequest) {
  const user = await requireAuth(req);
  // ... create appointment ...
  
  await logAction({
    clinicId: user.clinicId,
    userId: user.id,
    action: "APPOINTMENT_CREATED",
    entity: "Appointment",
    entityId: appointment.id,
    metadata: { petId: appointment.petId, serviceId: appointment.serviceId },
    req,
  });
}
```

**Actions to Log:**
- User login/logout
- Failed login attempts (brute force detection)
- Appointment create/update/delete
- Medical record viewed/created/updated
- User created/updated/deactivated
- Settings changed
- Data exported/deleted

---

## 9.5 Backup & Disaster Recovery

### **Database Backups**

**Supabase Automatic Backups:**
- Daily automated backups (retained for 7 days)
- Point-in-time recovery (PITR) for Pro plan

**Custom Backup Script:**
```typescript
// scripts/backup-database.ts
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function backupDatabase() {
  const timestamp = new Date().toISOString().split("T")[0];
  const filename = `backup-${timestamp}.sql`;
  
  const command = `pg_dump ${process.env.DATABASE_URL} > backups/${filename}`;
  
  try {
    await execAsync(command);
    console.log(`Backup created: ${filename}`);
    
    // Upload to S3 or external storage
    // await uploadToS3(filename);
  } catch (error) {
    console.error("Backup failed:", error);
    // Send alert to admin
  }
}

// Run via cron job daily
```

### **File Storage Backups**

- Supabase Storage has built-in redundancy
- Consider periodic exports to AWS S3 for long-term archival

### **Disaster Recovery Plan**

**RTO (Recovery Time Objective):** 4 hours  
**RPO (Recovery Point Objective):** 24 hours (daily backups)

**Recovery Steps:**
1. Provision new Supabase instance
2. Restore latest database backup
3. Update environment variables
4. Redeploy application on Vercel
5. Verify functionality
6. Update DNS if needed

---

## 9.6 Security Best Practices

### **Input Validation**
```typescript
// lib/validation.ts
import { z } from "zod";

export const appointmentSchema = z.object({
  petId: z.string().cuid(),
  serviceId: z.string().cuid(),
  vetId: z.string().cuid().optional(),
  appointmentDate: z.coerce.date().refine(
    (date) => date > new Date(),
    { message: "Appointment must be in the future" }
  ),
  reasonForVisit: z.string().max(500).optional(),
});

// Usage in API route:
const body = await req.json();
const validated = appointmentSchema.parse(body); // Throws if invalid
```

### **SQL Injection Prevention**
- Use Prisma ORM (parameterized queries automatically)
- NEVER concatenate user input into raw SQL

### **XSS Prevention**
- React/Next.js escapes output by default
- Use `dangerouslySetInnerHTML` only when necessary (and sanitize with DOMPurify)

### **CSRF Protection**
- NextAuth.js handles CSRF tokens automatically
- Verify origin header for state-changing requests

### **Rate Limiting**
```typescript
// lib/rate-limit.ts
import { LRUCache } from "lru-cache";

const limiter = new LRUCache({
  max: 500,
  ttl: 60000, // 1 minute
});

export async function rateLimit(identifier: string, limit: number = 10) {
  const key = `rate-limit:${identifier}`;
  const current = (limiter.get(key) as number) || 0;
  
  if (current >= limit) {
    throw new Error("Rate limit exceeded");
  }
  
  limiter.set(key, current + 1);
}

// Usage:
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  await rateLimit(ip, 10); // Max 10 requests per minute
  
  // ... proceed with request ...
}
```

### **Secrets Management**
- Store secrets in `.env.local` (never commit to Git)
- Use Vercel Environment Variables for production
- Rotate secrets regularly (API keys, database passwords)

### **Security Headers**
```typescript
// next.config.js
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};
```
