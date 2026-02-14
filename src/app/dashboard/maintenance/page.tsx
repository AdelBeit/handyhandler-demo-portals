import { getMaintenanceRequests } from "@/lib/maintenance";

const statusStyles: Record<string, string> = {
  new: "badge-primary",
  "in progress": "badge-secondary",
  resolved: "badge-ghost",
  canceled: "badge-outline"
};

export default async function MaintenancePage() {
  const requests = await getMaintenanceRequests();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Maintenance</h2>
        <p className="text-base text-base-content/70">
          Track and manage your maintenance requests.
        </p>
      </div>
      <div className="grid gap-4">
        {requests.map((request) => {
          const statusKey = request.status.toLowerCase();
          const badgeClass = statusStyles[statusKey] ?? "badge-ghost";

          return (
            <div key={request.id} className="rounded-box bg-base-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase text-base-content/60">
                    {request.category} · Unit {request.unit}
                  </p>
                  <p className="text-lg font-semibold">{request.description}</p>
                </div>
                <span className={`badge ${badgeClass}`}>{request.status}</span>
              </div>
              <p className="mt-2 text-sm text-base-content/60">
                Filed on {request.dateFiled}
              </p>
            </div>
          );
        })}
      </div>
      <button className="btn btn-primary">Create new request</button>
    </div>
  );
}
