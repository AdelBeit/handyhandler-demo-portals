import Link from "next/link";
import { getMaintenanceRequests } from "@/lib/maintenance";

export default async function DashboardHome() {
  const requests = await getMaintenanceRequests();
  const openCount = requests.filter(
    (request) => request.status.toLowerCase() !== "resolved"
  ).length;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Welcome back, Taylor</h2>
        <p className="text-base text-base-content/70">
          Here is a quick snapshot of your account and recent activity.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-box bg-base-200 p-4">
          <p className="text-sm font-semibold uppercase text-base-content/60">
            Open Requests
          </p>
          <div className="flex items-center justify-between gap-3">
            <p className="text-3xl font-semibold">{openCount}</p>
            <Link className="btn btn-sm btn-outline" href="/dashboard/maintenance">
              View all
            </Link>
          </div>
        </div>
        <div className="rounded-box bg-base-200 p-4">
          <p className="text-sm font-semibold uppercase text-base-content/60">
            Next Rent Due
          </p>
          <p className="text-3xl font-semibold">Mar 1</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <button className="btn btn-primary">New maintenance request</button>
        <button className="btn btn-outline">View profile</button>
      </div>
    </div>
  );
}
