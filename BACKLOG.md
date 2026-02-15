# Portal Demo Backlog (Gaps & Extensions)

## Active TODO

## AUTH-1: Require Authenticated Sessions
Status: TODO
Description
Block unauthenticated users from accessing dashboard routes; require login to view `/dashboard/*`.

Acceptance Criteria
1. Unauthenticated users are redirected to `/login` when visiting dashboard routes.
2. Authenticated users can access dashboard routes without manual redirects.
3. Session persists across refreshes for a reasonable duration (cookie-based).
4. Login sets a signed, HTTP-only session cookie; logout clears it.
5. Middleware guards `/dashboard/:path*` and skips `/login` and static assets.

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

## New Request Flow (MVP is dummy)
- MVP requirement: “New Request” opens as a dedicated page (traditional portal flow).
- Determine field validation requirements (if any) for MVP.
- Decide whether the submit action just shows a toast or adds a fake item to list.

---

## Future Extensions (Out of MVP)
- Real authentication and session gating.
- Persistence (localStorage or backend API).
- Real image uploads and previews.
- Role-based UI (tenant vs manager) with different views and actions.
- Activity timeline per request.
- Notifications or message thread per request.
