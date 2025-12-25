# Content Expansion & Migration Plan

## Overview
This document outlines the strategy for modernizing and migrating content from the legacy "East West Vets" website into the new "East West Vets – Glen Waverley" Next.js application. The goal is to retain the valuable information while presenting it in a premium, user-friendly aesthetic.

## 1. Updated Sitemap Structure

We will unite the requested pages into a logical hierarchy to avoid cluttering the navigation bar.

*   **Home** (`/`)
    *   Intro / Philosophy
    *   Hours & Location Preview
    *   Featured Servicesv
    *   Meet the Team Preview
*   **About** (`/about`)
    *   About East West Vets (History/Philosophy)
    *   Our Team (Expanded bios)
*   **Services** (`/services`)
    *   *Overview Hub Page*
    *   **Western Medicine** (Surgery, X-Ray, Ultrasound, Dentistry, Vaccinations)
    *   **Natural Therapies** (Acupuncture, Chinese Herbs, Osteopathy, Laser Therapy, Vitamin C)
    *   **Behaviour & Emotion** (Consultations, Anxiety management)
    *   **Specialized Care** (Cancer, Geriatric, Palliative, Hospice)
*   **Resources** (`/resources`)
    *   **Natural Pet Food** (Raw diet philosophy, Homemade recipes/mixes)
    *   **Puppy School** (Training details, Schedule, Pricing)
    *   **Case Studies** (Success stories: Vinnie, Gracie, Jaeger, Henri)
    *   **Q&A / FAQ** (Questions with Dr. Nevill)
*   **Contact** (`/contact`)
    *   Location (Map)
    *   Contact Form
    *   Opening Hours
    *   Emergency Info

---

## 2. Page-by-Page Content Strategy

### Home Page Modernization
*   **Hero:** Retain current premium landing hero.
*   **Welcome Section:** Use the text: *"At East West Vets we practice modern Western medicine along with Chinese medicine..."* formatted as a clean "Mission Statement" block.
*   **Quick Info:** Add a "Clinic Info" bar or footer element with the hours (8:30am - 6:00pm) and phone number.

### Services Hub (`/services`)
*   **Design:** Grid layout with icon-rich cards for each major service area.
*   **Content:**
    *   **Acupuncture:** "Ancient therapy... excellent for arthritis..."
    *   **Chinese Medicine:** "Used for thousands of years... immune system repair..."
    *   **Laser Therapy:** "High power multi-wavelength... rapid healing..."
    *   **Diagnostic Services:** Ultrasound (Dr. Harold Pook), Digital X-rays (instant results).
    *   **Routine Care:** Vaccinations (Titre testing focus), Desexing, Microchipping.

### Case Studies (`/resources/case-studies`)
*   **Format:** A dedicated "Success Stories" page.
*   **Design:** Each story (Vinnie, Gracie, etc.) will be a beautiful card or separate blog-style post.
*   **Highlight:** "Vinnie: The Adrenal Tumour Survivor", "Gracie: Beating IMHA naturally", "Jeager: Overcoming Chronic Itch".
*   **Visuals:** Before/After photos (if available) or relevant stock imagery of the breeds.

### Natural Food Page (`/resources/natural-food`)
*   **Message:** "Food is Medicine."
*   **Content:** Breakdown of the "Raw Diet" philosophy vs. commercial dry food.
*   **Product Feature:** Highlight the clinic's own fresh food combinations ("8 fruits & veg, 6 herbs").
*   **Accordion:** Comparison of "Prepared Dry Foods" vs "Fresh Raw Mixes".

### Puppy School (`/resources/puppy-school`)
*   **CTA:** "Enroll your puppy today – 9555 1899"
*   **Structure:**
    *   "Why attend?" (Socialization, rules).
    *   "Curriculum" (4-week breakdown: Leadership -> Body Language -> First Aid -> Independence).
    *   "Pricing" ($70/4 sessions).

### Contact Page (`/contact`)
*   **Map:** Embed Google Map for Bentleigh/Glen Waverley location.
*   **Hours:** Grid display of opening times.
*   **Feedback:** "Feedback please!" section or simple form.

---

## 3. Design Components Required
To implement this text-heavy content without boring the user, we need:
1.  **Accordion/Collapsible:** For FAQs and detailed service descriptions.
2.  **Feature Cards:** For presenting Services summaries.
3.  **Testimonial Slider:** For Case Studies or client quotes.
4.  **Rich Text Layout:** A component to handle headings, paragraphs, and lists beautifully (typography focused).

## 4. Next Steps
1.  **Approve Plan:** Confirm this structure works for the user.
2.  **Scaffold Pages:** Create the file structure in Next.js (`app/services/page.tsx`, etc.).
3.  **Migrate Content:** Copy/Paste and format the text into the components.
