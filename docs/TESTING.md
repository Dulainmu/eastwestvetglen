# 11. TESTING STRATEGY

## 11.1 Testing Philosophy

**Testing Pyramid:**
```
        /\
       /E2E\     ← Few, high-value (critical user flows)
      /------\
     /  API   \   ← More (business logic, endpoints)
    /----------\
   /    Unit    \ ← Most (utilities, helpers, validation)
  /--------------\
```

**Coverage Goals:**
- Unit tests: 80%+ coverage
- API tests: 100% of critical endpoints
- E2E tests: Core user flows only

**Testing Approach:**
- Write tests for new features (TDD when possible)
- Don't test third-party libraries (Prisma, NextAuth, etc.)
- Focus on business logic and edge cases
- Mock external services (email, SMS, payment)

---

## 11.2 Unit Testing

### **Setup**

**Dependencies:**
```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

**Configuration (vitest.config.ts):**
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

**Setup File (test/setup.ts):**
```typescript
import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));
```

### **Example Tests**

**Utility Function Test:**
```typescript
// lib/__tests__/availability.test.ts
import { describe, it, expect } from 'vitest';
import { getAvailableSlots, isSlotAvailable } from '../availability';

describe('Availability Calculator', () => {
  it('should generate time slots correctly', () => {
    const slots = generateTimeSlots('09:00', '17:00', 30, 15);
    
    expect(slots).toContain('09:00');
    expect(slots).toContain('09:45');
    expect(slots).toContain('16:15');
    expect(slots).not.toContain('17:00'); // End time excluded
  });

  it('should mark slot as unavailable if appointment exists', () => {
    const existingAppointments = [
      { appointmentDate: new Date('2025-02-03T09:00:00Z'), duration: 30 }
    ];
    
    const available = isSlotAvailable(
      '09:00',
      existingAppointments,
      [],
      30
    );
    
    expect(available).toBe(false);
  });

  it('should mark slot as unavailable during vet blocked time', () => {
    const availabilityRules = [
      {
        type: 'BLOCKED',
        startTime: '12:00',
        endTime: '13:00',
        dayOfWeek: 1, // Monday
      }
    ];
    
    const available = isSlotAvailable(
      '12:30',
      [],
      availabilityRules,
      30
    );
    
    expect(available).toBe(false);
  });
});
```

**Validation Schema Test:**
```typescript
// lib/__tests__/validation.test.ts
import { describe, it, expect } from 'vitest';
import { appointmentSchema } from '../validation';

describe('Appointment Validation', () => {
  it('should accept valid appointment data', () => {
    const validData = {
      petId: 'pet_123',
      serviceId: 'service_456',
      vetId: 'vet_789',
      appointmentDate: new Date('2025-12-31T10:00:00Z'),
      reasonForVisit: 'Annual checkup',
    };
    
    expect(() => appointmentSchema.parse(validData)).not.toThrow();
  });

  it('should reject appointment in the past', () => {
    const invalidData = {
      petId: 'pet_123',
      serviceId: 'service_456',
      appointmentDate: new Date('2020-01-01T10:00:00Z'), // Past date
    };
    
    expect(() => appointmentSchema.parse(invalidData)).toThrow();
  });

  it('should reject invalid CUID format', () => {
    const invalidData = {
      petId: 'invalid-id',
      serviceId: 'service_456',
      appointmentDate: new Date('2025-12-31T10:00:00Z'),
    };
    
    expect(() => appointmentSchema.parse(invalidData)).toThrow();
  });
});
```

**Component Test:**
```typescript
// components/__tests__/AppointmentCard.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppointmentCard } from '../AppointmentCard';

describe('AppointmentCard', () => {
  const mockAppointment = {
    id: 'apt_123',
    appointmentDate: new Date('2025-02-03T09:00:00Z'),
    status: 'CONFIRMED',
    pet: { name: 'Max', species: 'DOG' },
    owner: { firstName: 'John', lastName: 'Smith', phone: '0412345678' },
    service: { name: 'General Consultation', duration: 30 },
    vet: { firstName: 'Sarah', lastName: 'Johnson' },
    reasonForVisit: 'Annual checkup',
  };

  it('should render appointment details', () => {
    render(<AppointmentCard appointment={mockAppointment} />);
    
    expect(screen.getByText('Max')).toBeInTheDocument();
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('General Consultation')).toBeInTheDocument();
  });

  it('should call onCheckIn when check-in button clicked', async () => {
    const onCheckIn = vi.fn();
    render(<AppointmentCard appointment={mockAppointment} onCheckIn={onCheckIn} />);
    
    const checkInButton = screen.getByRole('button', { name: /check in/i });
    fireEvent.click(checkInButton);
    
    expect(onCheckIn).toHaveBeenCalledWith('apt_123');
  });

  it('should show different status badge colors', () => {
    const { container } = render(<AppointmentCard appointment={mockAppointment} />);
    expect(container.querySelector('.bg-blue-100')).toBeInTheDocument(); // CONFIRMED = blue
    
    const completedAppointment = { ...mockAppointment, status: 'COMPLETED' };
    const { container: container2 } = render(<AppointmentCard appointment={completedAppointment} />);
    expect(container2.querySelector('.bg-green-100')).toBeInTheDocument(); // COMPLETED = green
  });
});
```

---

## 11.3 API Integration Testing

### **Setup**

**Mock Database:**
```typescript
// test/helpers/db.ts
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'vitest-mock-extended';

export const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prismaMock);
});
```

**Mock Prisma:**
```typescript
// lib/__mocks__/prisma.ts
import { prismaMock } from '../../test/helpers/db';
export const prisma = prismaMock;
```

### **Example API Tests**

**GET Endpoint Test:**
```typescript
// app/api/appointments/__tests__/route.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { GET } from '../route';
import { prismaMock } from '@/test/helpers/db';
import { NextRequest } from 'next/server';

describe('GET /api/appointments', () => {
  beforeEach(() => {
    // Mock auth session
    vi.mock('@/auth', () => ({
      auth: () => Promise.resolve({
        user: { id: 'user_123', clinicId: 'clinic_456', role: 'RECEPTIONIST' }
      })
    }));
  });

  it('should return appointments for authenticated user clinic', async () => {
    const mockAppointments = [
      {
        id: 'apt_1',
        clinicId: 'clinic_456',
        appointmentDate: new Date(),
        status: 'CONFIRMED',
      },
    ];

    prismaMock.appointment.findMany.mockResolvedValue(mockAppointments);

    const request = new NextRequest('http://localhost:3000/api/appointments');
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.appointments).toHaveLength(1);
    expect(prismaMock.appointment.findMany).toHaveBeenCalledWith({
      where: { clinicId: 'clinic_456' },
      include: expect.any(Object),
    });
  });

  it('should return 401 if not authenticated', async () => {
    vi.mock('@/auth', () => ({
      auth: () => Promise.resolve(null)
    }));

    const request = new NextRequest('http://localhost:3000/api/appointments');
    const response = await GET(request);

    expect(response.status).toBe(401);
  });
});
```

**POST Endpoint Test:**
```typescript
// app/api/appointments/__tests__/create.test.ts
import { describe, it, expect, vi } from 'vitest';
import { POST } from '../create/route';
import { prismaMock } from '@/test/helpers/db';
import { NextRequest } from 'next/server';

describe('POST /api/appointments/create', () => {
  it('should create appointment and send confirmation', async () => {
    const mockAppointment = {
      id: 'apt_new',
      clinicId: 'clinic_456',
      petId: 'pet_123',
      serviceId: 'service_789',
      appointmentDate: new Date('2025-12-31T10:00:00Z'),
      status: 'CONFIRMED',
    };

    prismaMock.appointment.create.mockResolvedValue(mockAppointment);

    // Mock email service
    const sendEmailMock = vi.fn().mockResolvedValue({ success: true });
    vi.mock('@/lib/email', () => ({
      sendAppointmentConfirmation: sendEmailMock
    }));

    const requestBody = {
      petId: 'pet_123',
      serviceId: 'service_789',
      appointmentDate: '2025-12-31T10:00:00Z',
      owner: {
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Smith',
      },
    };

    const request = new NextRequest('http://localhost:3000/api/appointments/create', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.appointment.id).toBe('apt_new');
    expect(sendEmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'john@example.com',
      })
    );
  });

  it('should return 400 for invalid data', async () => {
    const requestBody = {
      petId: 'invalid',
      // Missing required fields
    };

    const request = new NextRequest('http://localhost:3000/api/appointments/create', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
```

---

## 11.4 End-to-End Testing

### **Setup (Playwright)**

**Install:**
```bash
pnpm add -D @playwright/test
npx playwright install
```

**Configuration (playwright.config.ts):**
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'] },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

### **Example E2E Tests**

**Booking Flow Test:**
```typescript
// e2e/booking-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Online Booking Flow', () => {
  test('should complete full booking flow', async ({ page }) => {
    // Navigate to booking page
    await page.goto('/book/demo-clinic');
    
    // Step 1: Select service
    await page.click('text=General Consultation');
    await page.click('button:has-text("Next")');
    
    // Step 2: Select date
    await page.click('[data-testid="calendar-day-10"]');
    await page.click('text=09:00 AM');
    await page.click('button:has-text("Next")');
    
    // Step 3: Select vet
    await page.click('text=Dr. Sarah Johnson');
    await page.click('button:has-text("Next")');
    
    // Step 4: Pet information (new user)
    await page.fill('input[name="petName"]', 'Max');
    await page.selectOption('select[name="species"]', 'DOG');
    await page.fill('input[name="breed"]', 'Golden Retriever');
    await page.click('label:has-text("Male")');
    await page.click('button:has-text("Next")');
    
    // Step 5: Owner information
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Smith');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="phone"]', '0412345678');
    await page.fill('textarea[name="reasonForVisit"]', 'Annual checkup');
    await page.click('button:has-text("Next")');
    
    // Step 6: Review and confirm
    await expect(page.locator('text=Max')).toBeVisible();
    await expect(page.locator('text=John Smith')).toBeVisible();
    await page.check('input[name="agreeToTerms"]');
    await page.click('button:has-text("Confirm Booking")');
    
    // Confirmation page
    await expect(page.locator('text=Booking Confirmed')).toBeVisible();
    await expect(page.locator('text=Check your email')).toBeVisible();
  });

  test('should show validation errors for invalid data', async ({ page }) => {
    await page.goto('/book/demo-clinic');
    await page.click('text=General Consultation');
    await page.click('button:has-text("Next")');
    
    // Skip to owner info without filling required fields
    // (navigate through steps)
    
    await page.click('button:has-text("Next")');
    await expect(page.locator('text=Email is required')).toBeVisible();
  });
});
```

**Dashboard Test:**
```typescript
// e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Staff Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login as receptionist
    await page.goto('/login');
    await page.fill('input[name="email"]', 'receptionist@democlinic.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button:has-text("Sign In")');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should display today appointments', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Dashboard');
    await expect(page.locator('[data-testid="stat-total"]')).toBeVisible();
    
    // Should have at least one appointment card
    const appointmentCards = page.locator('[data-testid="appointment-card"]');
    await expect(appointmentCards).not.toHaveCount(0);
  });

  test('should check in appointment', async ({ page }) => {
    const checkInButton = page.locator('button:has-text("Check In")').first();
    await checkInButton.click();
    
    // Confirmation dialog
    await page.click('button:has-text("Confirm")');
    
    // Status should update
    await expect(page.locator('text=Checked In')).toBeVisible();
  });

  test('should filter appointments by vet', async ({ page }) => {
    await page.selectOption('select[name="vetFilter"]', 'Dr. Sarah Johnson');
    
    // All visible appointments should be for this vet
    const vetNames = page.locator('[data-testid="vet-name"]');
    const count = await vetNames.count();
    
    for (let i = 0; i < count; i++) {
      await expect(vetNames.nth(i)).toContainText('Dr. Sarah Johnson');
    }
  });
});
```

**Mobile Responsiveness Test:**
```typescript
// e2e/mobile.spec.ts
import { test, expect, devices } from '@playwright/test';

test.use(devices['iPhone 13']);

test.describe('Mobile Experience', () => {
  test('should navigate mobile menu', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Mobile menu should be collapsed
    const navLinks = page.locator('nav a');
    await expect(navLinks.first()).not.toBeVisible();
    
    // Open mobile menu
    await page.click('[data-testid="mobile-menu-button"]');
    await expect(navLinks.first()).toBeVisible();
  });

  test('booking form should be mobile-friendly', async ({ page }) => {
    await page.goto('/book/demo-clinic');
    
    // Check viewport
    const viewport = page.viewportSize();
    expect(viewport?.width).toBeLessThan(500);
    
    // All form elements should be visible and tappable
    const serviceButton = page.locator('text=General Consultation');
    await expect(serviceButton).toBeVisible();
    
    // Touch target should be at least 44x44 pixels (iOS guideline)
    const box = await serviceButton.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  });
});
```

---

## 11.5 Performance Testing

### **Lighthouse CI**

**Configuration (.lighthouserc.json):**
```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3000/",
        "http://localhost:3000/book/demo-clinic",
        "http://localhost:3000/dashboard"
      ],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["warn", { "minScore": 0.9 }],
        "categories:seo": ["warn", { "minScore": 0.9 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

**GitHub Action:**
```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - run: npm run start & npx wait-on http://localhost:3000
      - run: npx @lhci/cli@latest autorun
```

### **Load Testing (k6)**

**Simple Load Test:**
```javascript
// test/load/booking-flow.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Ramp up to 10 users
    { duration: '1m', target: 50 },   // Ramp up to 50 users
    { duration: '30s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests < 500ms
    http_req_failed: ['rate<0.01'],   // Error rate < 1%
  },
};

export default function () {
  // Test availability endpoint
  const res = http.post('http://localhost:3000/api/bookings/availability', JSON.stringify({
    clinicId: 'clinic_123',
    serviceId: 'service_456',
    date: '2025-12-31',
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
```

**Run load test:**
```bash
k6 run test/load/booking-flow.js
```

---

## 11.6 Testing Best Practices

**General:**
- ✅ Test behavior, not implementation
- ✅ Use descriptive test names: `it('should reject appointment in the past')`
- ✅ Arrange-Act-Assert pattern
- ✅ One assertion per test (when possible)
- ✅ Mock external dependencies (APIs, databases)
- ✅ Clean up after tests (database, files)

**Don't:**
- ❌ Test framework code (Next.js, Prisma)
- ❌ Test private functions (test through public API)
- ❌ Write integration tests that hit real external services
- ❌ Commit snapshots for dynamic content
- ❌ Test CSS styles (use visual regression testing instead)

**Run Tests:**
```bash
# Unit tests
pnpm test

# Unit tests with coverage
pnpm test --coverage

# E2E tests
pnpm playwright test

# E2E tests with UI
pnpm playwright test --ui

# Specific test file
pnpm test lib/__tests__/availability.test.ts

# Watch mode (re-run on file change)
pnpm test --watch
```

**Coverage Report:**
```bash
pnpm test --coverage
# View coverage/index.html
```

**CI Integration:**
```yaml
# Run all tests in CI
- name: Run tests
  run: |
    pnpm test --run
    pnpm playwright test
```
