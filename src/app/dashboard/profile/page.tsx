const profile = {
  name: "Taylor Martinez",
  email: "taylor@demoportals.com",
  phone: "(555) 302-1940",
  unit: "3B",
  address: "1420 Harbor Way, Unit 3B",
  leaseEndDate: "2026-09-30"
};

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Profile</h2>
        <p className="text-base text-base-content/70">
          Review your current resident information.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-box bg-base-200 p-4">
          <p className="text-sm font-semibold uppercase text-base-content/60">
            Full name
          </p>
          <p>{profile.name}</p>
        </div>
        <div className="rounded-box bg-base-200 p-4">
          <p className="text-sm font-semibold uppercase text-base-content/60">
            Email
          </p>
          <p>{profile.email}</p>
        </div>
        <div className="rounded-box bg-base-200 p-4">
          <p className="text-sm font-semibold uppercase text-base-content/60">
            Phone
          </p>
          <p>{profile.phone}</p>
        </div>
        <div className="rounded-box bg-base-200 p-4">
          <p className="text-sm font-semibold uppercase text-base-content/60">
            Unit
          </p>
          <p>{profile.unit}</p>
        </div>
        <div className="rounded-box bg-base-200 p-4 sm:col-span-2">
          <p className="text-sm font-semibold uppercase text-base-content/60">
            Address
          </p>
          <p>{profile.address}</p>
        </div>
        <div className="rounded-box bg-base-200 p-4">
          <p className="text-sm font-semibold uppercase text-base-content/60">
            Lease end date
          </p>
          <p>{profile.leaseEndDate}</p>
        </div>
      </div>
    </div>
  );
}
