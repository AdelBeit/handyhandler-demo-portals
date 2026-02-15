"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import type { MaintenanceRequest } from "@/lib/maintenance";

const statusStyles: Record<string, string> = {
  new: "badge-primary",
  resolved: "badge-ghost",
  canceled: "badge-outline",
};

export default function MaintenancePage() {
  type RequestWithAttachments = MaintenanceRequest & {
    imageUrl?: string | string[] | null;
  };

  const searchParams = useSearchParams();

  const [requests, setRequests] = useState<RequestWithAttachments[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(
    searchParams?.get("status") === "created",
  );

  const hasRequests = useMemo(() => requests.length > 0, [requests]);

  useEffect(() => {
    if (!showSuccess) {
      return;
    }
    const timer = window.setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
    return () => {
      window.clearTimeout(timer);
    };
  }, [showSuccess]);

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
        const data = (await res.json()) as RequestWithAttachments[];
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
      const updated = (await res.json()) as RequestWithAttachments;
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
      <a className="btn btn-primary" href="/dashboard/maintenance/new">
        Create new request
      </a>
      {showSuccess ? (
        <div className="rounded-box border border-success/30 bg-base-200 p-4 text-sm text-success">
          Request submitted successfully.
        </div>
      ) : null}
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
          {requests
            .slice()
            .sort((a, b) => {
              const order: Record<string, number> = {
                new: 0,
                resolved: 1,
                canceled: 2,
                cancelled: 2,
              };
              const aStatus = a.status.toLowerCase();
              const bStatus = b.status.toLowerCase();
              const statusDiff =
                (order[aStatus] ?? 99) - (order[bStatus] ?? 99);
              if (statusDiff !== 0) {
                return statusDiff;
              }
              return b.dateFiled.localeCompare(a.dateFiled);
            })
            .map((request) => {
            const statusKey = request.status.toLowerCase();
            const badgeClass = statusStyles[statusKey] ?? "badge-ghost";
            const isCanceled = statusKey === "canceled";
            const isResolved = statusKey === "resolved";

            return (
              <div key={request.id} className="rounded-box bg-base-200 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
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
                    {!isResolved ? (
                      <button
                        className="btn btn-sm btn-outline"
                        type="button"
                        disabled={isCanceled || busyId === request.id}
                        onClick={() => handleCancel(request.id)}
                      >
                        {busyId === request.id ? "Canceling..." : "Cancel"}
                      </button>
                    ) : null}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase text-base-content/50">
                    Attachments
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(() => {
                      const attachments = Array.isArray(request.imageUrl)
                        ? request.imageUrl
                        : request.imageUrl
                          ? [request.imageUrl]
                          : [];

                      if (attachments.length === 0) {
                        return (
                          <div className="rounded-full bg-base-100 px-3 py-1 text-xs text-base-content/60">
                            No attachments
                          </div>
                        );
                      }

                      return attachments.map((attachment, index) => {
                        const normalized =
                          attachment && !attachment.startsWith("/") && !attachment.startsWith("http")
                            ? `/images/${attachment}`
                            : attachment;

                        return (
                        <div
                          key={`${request.id}-attachment-${index}`}
                          className="h-12 w-12 overflow-hidden rounded-lg bg-base-100"
                          title={normalized ?? "Attachment"}
                        >
                          <img
                            src={normalized}
                            alt="Attachment thumbnail"
                            className="h-full w-full object-cover"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      );
                      });
                    })()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
