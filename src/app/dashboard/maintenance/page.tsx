"use client";

import { useEffect, useMemo, useState } from "react";

import type { MaintenanceRequest } from "@/lib/maintenance";

const statusStyles: Record<string, string> = {
  new: "badge-primary",
  "in progress": "badge-secondary",
  resolved: "badge-ghost",
  canceled: "badge-outline",
};

export default function MaintenancePage() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const hasRequests = useMemo(() => requests.length > 0, [requests]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const res = await fetch("/api/maintenance", {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) {
          throw new Error(`Failed to load requests (${res.status}).`);
        }
        const data = (await res.json()) as MaintenanceRequest[];
        if (active) {
          setRequests(data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Unknown error.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  const handleCancel = async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/maintenance/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error(`Cancel failed (${res.status}).`);
      }
      const updated = (await res.json()) as MaintenanceRequest;
      setRequests((prev) =>
        prev.map((item) => (item.id === id ? updated : item)),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Maintenance</h2>
        <p className="text-base text-base-content/70">
          Track and manage your maintenance requests.
        </p>
      </div>
      {loading ? (
        <div className="rounded-box bg-base-200 p-6 text-sm text-base-content/70">
          Loading requests...
        </div>
      ) : error ? (
        <div className="rounded-box border border-error/30 bg-base-200 p-6 text-sm text-error">
          {error}
        </div>
      ) : !hasRequests ? (
        <div className="rounded-box bg-base-200 p-6 text-sm text-base-content/70">
          No maintenance requests yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => {
            const statusKey = request.status.toLowerCase();
            const badgeClass = statusStyles[statusKey] ?? "badge-ghost";
            const isCanceled = statusKey === "canceled";
            const isResolved = statusKey === "resolved";

            return (
              <div key={request.id} className="rounded-box bg-base-200 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-base-100 text-xs text-base-content/50">
                      Image
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase text-base-content/60">
                        {request.category} · Unit {request.unit}
                      </p>
                      <p className="text-lg font-semibold">
                        {request.description}
                      </p>
                      <p className="mt-1 text-sm text-base-content/60">
                        Filed on {request.dateFiled}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`badge ${badgeClass}`}>
                      {request.status}
                    </span>
                    <button
                      className="btn btn-sm btn-outline"
                      type="button"
                      disabled={isCanceled || isResolved || busyId === request.id}
                      onClick={() => handleCancel(request.id)}
                    >
                      {busyId === request.id ? "Canceling..." : "Cancel"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <button className="btn btn-primary">Create new request</button>
    </div>
  );
}
