# MVP To-Do (Jira-Style Tickets)

---

## HH-MVP-1: Initialize Next.js App Shell
Status: DONE
Description
Set up a Next.js App Router project in this repo with TypeScript, ESLint, and src/ layout.

Acceptance Criteria
1. Next.js app runs locally without errors.
2. App Router enabled with `src/` directory.
3. Base layout renders a simple landing page.

---

## HH-MVP-2: Add DaisyUI + Tailwind Styling
Status: DONE
Description
Install and configure Tailwind CSS with DaisyUI and ensure global styles load.

Acceptance Criteria
1. Tailwind configured and working in the app.
2. DaisyUI plugin installed and available.
3. A sample component uses DaisyUI classes and renders correctly.

---

## HH-MVP-3: Implement Dummy Login Page
Status: DONE
Description
Create `/login` with a basic login form that accepts any input and navigates to `/dashboard`.

Acceptance Criteria
1. `/login` renders email/password fields and a submit button.
2. Submitting the form redirects to `/dashboard`.
3. No auth validation or gating is required.

---

## HH-MVP-4: Dashboard Shell + Navigation
Status: DONE
Description
Create dashboard shell with header and side navigation linking to Profile and Maintenance.

Acceptance Criteria
1. `/dashboard` renders a shell with nav and default content.
2. Side nav links to `/dashboard/profile` and `/dashboard/maintenance`.
3. Layout is consistent across dashboard subpages.

---

## HH-MVP-5: Profile Page (Read-Only)
Status: DONE
Description
Create `/dashboard/profile` showing static tenant profile data.

Acceptance Criteria
1. Profile page displays name, email, phone, unit, address, lease end date.
2. Profile data is static (no editing).
3. Styling uses DaisyUI components.

---

## HH-MVP-6: Maintenance Data Model + Seed Data
Status: DONE
Description
Define the maintenance request schema and seed data persisted in JSON.

Acceptance Criteria
1. `data/maintenance.json` (or similar) stores an array of maintenance requests.
2. Seed file contains 3 realistic requests.
3. Each request includes id, dateFiled, description, category, unit, status, imageUrl.

---

## HH-MVP-7: Maintenance API Routes
Status: IN PROGRESS
Description
Create API routes to list, create, and cancel maintenance requests using JSON storage.

Acceptance Criteria
1. `GET /api/maintenance` returns all requests.
2. `POST /api/maintenance` appends a new request.
3. `PATCH /api/maintenance/:id` (or equivalent) updates status to `Canceled`.
4. File storage is updated on create and cancel.

---

## HH-MVP-8: Maintenance List Page
Status: TODO
Description
Create `/dashboard/maintenance` that displays requests and allows canceling.

Acceptance Criteria
1. Page fetches requests from the API and renders a list.
2. Each item shows description, date, category, unit, status badge, and image placeholder.
3. Each item has a Cancel action that updates status to `Canceled`.
4. List updates without full page refresh on cancel.

---

## HH-MVP-9: New Request Page
Status: TODO
Description
Create `/dashboard/maintenance/new` for submitting a new request.

Acceptance Criteria
1. Form fields: description, category, unit, imageUrl (optional).
2. Submitting calls `POST /api/maintenance`.
3. On success, redirects back to `/dashboard/maintenance` with a success message.

---

## HH-MVP-10: Status Conventions
Status: TODO
Description
Ensure maintenance statuses follow the agreed values and UI reflects them.

Acceptance Criteria
1. Valid statuses are `New`, `Resolved`, `Canceled`.
2. New requests default to `New`.
3. Status badge color reflects status.

---

## MINI-1: Open Requests View All Button
Status: DONE
Description
Add a View all button on the Open Requests card that links to the maintenance page.

Acceptance Criteria
1. Button labeled "View all" appears on the Open Requests card.
2. Clicking navigates to /dashboard/maintenance.

---

## MINI-2: Use Maintenance JSON Data
Status: DONE
Description
Use the JSON maintenance data for the dashboard open requests count and the maintenance list instead of placeholders.

Acceptance Criteria
1. Dashboard open requests count is derived from JSON data.
2. Maintenance page lists requests from JSON data.
3. No placeholder-only request text.

---

## MINI-3: Make Login the Landing Page
Status: DONE
Description
Redirect `/` visitors to `/login` so the portal entry point is the dummy login screen before exposing dashboard navigation.

Acceptance Criteria
1. `/` renders the login form or automatically routes to `/login`.
2. The redirection preserves query parameters (if any) that might be used later.
3. README or ticket notes mention that `/login` is the canonical landing page.

Notes
/login is the canonical landing page for the portal.

---

# Gaps To Resolve Before Spike

---

## G1: Portal Name
- Confirm final portal name (placeholder currently “HarborGate Property Management”).

---

## G2: API Route Shape
- Confirm whether to use `PATCH /api/maintenance/:id` or `POST /api/maintenance/cancel`.

---

## G3: JSON Storage Location
- Confirm the exact file path for JSON storage (`data/maintenance.json`).

---

## G4: Image Placeholder
- Confirm whether to use a static placeholder image URL or a local asset.
