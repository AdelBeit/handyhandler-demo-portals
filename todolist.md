# Portal Demo To-Do

---

## MINI-9: Sort Requests by Date Desc
Status: DONE
Description
Ensure maintenance requests are grouped by category and then sorted newest to oldest by timestamp within each category.

Acceptance Criteria
1. Primary sort is category (alphabetical).
2. Secondary sort uses the timestamp field and is descending.

---

## MINI-10: Multi-Attachment Uploads & Review
Status: DONE
Description
Allow attaching and submitting multiple files, show all attachments pre-submit, and allow removing attachments before submit.

Acceptance Criteria
1. User can attach multiple files and all are uploaded on submit.
2. Pre-submit list shows all attachments (use thumbnails like the maintenance list if possible).
3. User can remove an attachment before submission.

---

## AUTH-1: Require Authenticated Sessions
Status: IN PROGRESS
Description
Block unauthenticated users from accessing dashboard routes; require login to view `/dashboard/*`.

Acceptance Criteria
1. Unauthenticated users are redirected to `/login` when visiting dashboard routes.
2. Authenticated users can access dashboard routes without manual redirects.
3. Session persists across refreshes for a reasonable duration (cookie-based).
4. Login sets a signed, HTTP-only session cookie; logout clears it.
5. Middleware guards `/dashboard/:path*` and skips `/login` and static assets.
