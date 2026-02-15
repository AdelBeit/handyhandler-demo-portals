# Portal Demo Backlog (Gaps & Extensions)

## Active TODO

## MINI-7: Stabilize Dropzone Loading State
Status: TODO
Description
Avoid layout shift on the new request page by rendering a stable loading state for the dropzone.

Acceptance Criteria
1. A fixed-size dropzone placeholder renders immediately.
2. The interactive dropzone replaces it without shifting layout.
## MINI-8: Reduce Dropzone Re-renders
Status: TODO
Description
Ensure the dropzone component does not re-render on every input change; isolate state so only affected components update.

Acceptance Criteria
1. Typing in text inputs does not re-render the dropzone.
2. Dropzone rerenders only when its own state changes.

---

## MINI-9: Sort Requests by Date Desc
Status: TODO
Description
Ensure maintenance requests are grouped by category and then sorted newest to oldest by timestamp within each category.

Acceptance Criteria
1. Primary sort is category (alphabetical).
2. Secondary sort uses the timestamp field and is descending.

---

## Backlog & Notes

# Portal Demo Backlog (Gaps & Extensions)

MVP scope note: single portal only. Multi-portal selector, branding variants, and portal switching are deferred to backlog items below.

---

## Structure & Routing (Deferred)
- Decide if multi-portal is route-based (`/portal/acme`) or state-based switcher on one page.
- Define portal list and names (real vs fictional) for the portal selector view.
- Determine if each portal needs its own URL for sharable demos.
- Set a default landing path (portal selector vs direct portal).

---

## Visual Differentiation (Deferred)
- Define per-portal theming tokens (colors, typography, logo) while reusing shared components.
- Add portal-specific branding assets (logos, favicon, header treatment).
- Confirm if layout density/spacing should vary by portal.

---

## Auth & Access (MVP is dummy)
- Decide on mock credentials or fully blank login form.
- Decide whether a login CTA should transition to dashboard or just be decorative.
- Confirm if “Forgot password” or “Create account” links are needed (can be nonfunctional).

---

## Dashboard & Navigation
- Define a minimal dashboard home (welcome panel, quick actions) or go straight to Maintenance.
- Finalize menu labels per portal (e.g., “Maintenance Requests” vs “Work Orders”).
- Confirm if Profile is read-only or editable.

---

## Maintenance Requests Data Model
- Required fields: description, filed at timestamp, status, image attachments.
- Additional fields to choose: priority, category, unit/location, contact preference, preferred entry time.
- Define valid status values (e.g., New, In Progress, Scheduled, Resolved).

---

## Maintenance List Behavior
- Decide default sort (newest first) and whether filters/tabs are needed.
- Decide if list items expand to show details or open a detail panel.
- Define how image previews appear (thumbnail grid, single thumbnail, placeholder).
- Decide on empty state and “no requests” messaging.

---

## New Request Flow (MVP is dummy)
- MVP requirement: “New Request” opens as a dedicated page (traditional portal flow).
- Determine field validation requirements (if any) for MVP.
- Decide whether the submit action just shows a toast or adds a fake item to list.

---

## Dummy Data & Content
- Provide 3–5 seeded requests per portal (names, dates, statuses, descriptions).
- Provide consistent units/locations (e.g., “Unit 3B”) to make lists realistic.
- Decide on placeholder images or branded maintenance icons.

---

## Accessibility & Responsiveness
- Define mobile layout for login and dashboard.
- Decide on keyboard navigation for menus and list items.
- Ensure contrast targets per portal theme.

---

## Future Extensions (Out of MVP)
- Real authentication and session gating.
- Persistence (localStorage or backend API).
- Real image uploads and previews.
- Role-based UI (tenant vs manager) with different views and actions.
- Activity timeline per request.
- Notifications or message thread per request.

---

## Completed & History (from todolist)

## HH-MVP-1: Initialize Next.js App Shell
Status: DONE
Description
Set up a Next.js App Router project in this repo with TypeScript, ESLint, and src/ layout.

Acceptance Criteria
1. Next.js app runs locally without errors.
2. App Router enabled with `src/` directory.
3. Base layout renders a simple landing page.
## HH-MVP-2: Add DaisyUI + Tailwind Styling
Status: DONE
Description
Install and configure Tailwind CSS with DaisyUI and ensure global styles load.

Acceptance Criteria
1. Tailwind configured and working in the app.
2. DaisyUI plugin installed and available.
3. A sample component uses DaisyUI classes and renders correctly.
## HH-MVP-3: Implement Dummy Login Page
Status: DONE
Description
Create `/login` with a basic login form that accepts any input and navigates to `/dashboard`.

Acceptance Criteria
1. `/login` renders email/password fields and a submit button.
2. Submitting the form redirects to `/dashboard`.
3. No auth validation or gating is required.
## HH-MVP-4: Dashboard Shell + Navigation
Status: DONE
Description
Create dashboard shell with header and side navigation linking to Profile and Maintenance.

Acceptance Criteria
1. `/dashboard` renders a shell with nav and default content.
2. Side nav links to `/dashboard/profile` and `/dashboard/maintenance`.
3. Layout is consistent across dashboard subpages.
## HH-MVP-5: Profile Page (Read-Only)
Status: DONE
Description
Create `/dashboard/profile` showing static tenant profile data.

Acceptance Criteria
1. Profile page displays name, email, phone, unit, address, lease end date.
2. Profile data is static (no editing).
3. Styling uses DaisyUI components.
## HH-MVP-6: Maintenance Data Model + Seed Data
Status: DONE
Description
Define the maintenance request schema and seed data persisted in JSON.

Acceptance Criteria
1. `data/maintenance.json` (or similar) stores an array of maintenance requests.
2. Seed file contains demo requests (count is flexible).
3. Each request includes id, filedAt, description, category, unit, status, imageUrl.
## HH-MVP-7: Maintenance API Routes
Status: DONE
Description
Create API routes to list, create, and cancel maintenance requests using JSON storage.

Acceptance Criteria
1. `GET /api/maintenance` returns all requests.
2. `POST /api/maintenance` appends a new request.
3. `PATCH /api/maintenance/:id` (or equivalent) updates status to `Canceled`.
4. File storage is updated on create and cancel.
## HH-MVP-8: Maintenance List Page
Status: DONE
Description
Create `/dashboard/maintenance` that displays requests and allows canceling.

Acceptance Criteria
1. Page fetches requests from the API and renders a list.
2. Each item shows description, date, category, unit, status badge, and image placeholder.
3. Each item has a Cancel action that updates status to `Canceled`.
4. List updates without full page refresh on cancel.
## HH-MVP-9: New Request Page
Status: DONE
Description
Create `/dashboard/maintenance/new` for submitting a new request.

Acceptance Criteria
1. Form fields: description, category, unit, imageUrl (optional).
2. Submitting calls `POST /api/maintenance`.
3. On success, redirects back to `/dashboard/maintenance` with a success message.
## HH-MVP-10: Status Conventions
Status: DONE
Description
Ensure maintenance statuses follow the agreed values and UI reflects them.

Acceptance Criteria
1. Valid statuses are `New`, `Resolved`, `Canceled`.
2. New requests default to `New`.
3. Status badge color reflects status.
## HH-MVP-11: Attachment Uploads (Demo Storage)
Status: DONE
Description
Allow uploading attachment images and store them locally for demo usage.

Acceptance Criteria
1. New request flow uploads image files to `public/uploads`.
2. API returns a public URL (e.g., `/uploads/<filename>`).
3. Maintenance requests store the uploaded URL and display thumbnails.
4. Implementation clearly notes demo-only local storage.
## MINI-1: Open Requests View All Button
Status: DONE
Description
Add a View all button on the Open Requests card that links to the maintenance page.

Acceptance Criteria
1. Button labeled "View all" appears on the Open Requests card.
2. Clicking navigates to /dashboard/maintenance.
## MINI-2: Use Maintenance JSON Data
Status: DONE
Description
Use the JSON maintenance data for the dashboard open requests count and the maintenance list instead of placeholders.

Acceptance Criteria
1. Dashboard open requests count is derived from JSON data.
2. Maintenance page lists requests from JSON data.
3. No placeholder-only request text.
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
## MINI-4: Store Timestamps for Maintenance Requests
Status: DONE
Description
Store request timestamps with date and time (e.g., ISO 8601) so the UI can format as needed (including hours/minutes and AM/PM).

Acceptance Criteria
1. Maintenance requests include a timestamp field (ISO 8601 or equivalent).
2. New requests persist the timestamp (not just the date).
3. Existing seed data updated to include timestamps.
## MINI-5: Add Maintenance Case Number
Status: DONE
Description
Add a case number field to maintenance requests and populate it in seed data.

Acceptance Criteria
1. Maintenance requests include a case number field in the data model.
2. Seed data includes a case number for each request.
## MINI-6: Hide Cancel Button When Ineligible
Status: DONE
Description
Hide the Cancel action when a maintenance request is not eligible for cancellation (e.g., already canceled or resolved).

Acceptance Criteria
1. Cancel button is not rendered for canceled requests.
2. Cancel button is not rendered for resolved requests.
