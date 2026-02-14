export default function MaintenancePage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Maintenance</h2>
        <p className="text-base text-base-content/70">
          Track and manage your maintenance requests.
        </p>
      </div>
      <div className="rounded-box bg-base-200 p-4">
        <p className="text-sm font-semibold uppercase text-base-content/60">
          Latest request
        </p>
        <p className="text-base">Kitchen sink leak — In progress</p>
      </div>
      <button className="btn btn-primary">Create new request</button>
    </div>
  );
}
