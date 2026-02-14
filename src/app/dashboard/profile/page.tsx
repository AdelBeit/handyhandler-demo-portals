export default function ProfilePage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Profile</h2>
        <p className="text-base text-base-content/70">
          Your resident details will appear here.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-box bg-base-200 p-4">
          <p className="text-sm font-semibold uppercase text-base-content/60">
            Email
          </p>
          <p>taylor@demoportals.com</p>
        </div>
        <div className="rounded-box bg-base-200 p-4">
          <p className="text-sm font-semibold uppercase text-base-content/60">
            Unit
          </p>
          <p>3B</p>
        </div>
      </div>
    </div>
  );
}
