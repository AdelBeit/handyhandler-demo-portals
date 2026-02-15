"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";

const categories = ["Plumbing", "Electrical", "HVAC", "Appliance"] as const;

export default function NewMaintenanceRequestPage() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const unit = "3B";

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          category,
          unit,
          imageUrl: attachments[0]?.name ?? null,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status}).`);
      }

      router.push(
        "/dashboard/maintenance?status=created",
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error.");
    } finally {
      setSubmitting(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setAttachments(acceptedFiles);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">New Maintenance Request</h2>
        <p className="text-base text-base-content/70">
          Submit a new request and we will notify maintenance.
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="form-control">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Describe the issue"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Category</span>
          </div>
          <select
            className="select select-bordered"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Unit</span>
          </div>
          <input
            className="input input-bordered"
            value={unit}
            disabled
            readOnly
          />
        </label>

        <div className="form-control">
          <div className="label">
            <span className="label-text">Attachments (optional)</span>
          </div>
          <div
            {...getRootProps({
              className:
                "flex cursor-pointer flex-col items-center justify-center rounded-box border border-dashed bg-base-200 p-6 text-center text-sm text-base-content/60 hover:border-base-content/40 " +
                (isDragActive
                  ? "border-primary/70 bg-primary/10"
                  : "border-base-content/20"),
            })}
          >
            <input {...getInputProps()} />
            <span className="font-semibold text-base-content">
              {isDragActive ? "Drop files to attach" : "Drop files here"}
            </span>
            <span>or click to upload</span>
          </div>
          <div className="mt-2 text-sm text-base-content/60">
            {attachments.length > 0 ? (
              <ul className="list-disc pl-5">
                {attachments.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
            ) : (
              "No attachments"
            )}
          </div>
        </div>

        {error ? (
          <div className="rounded-box border border-error/30 bg-base-200 p-4 text-sm text-error">
            {error}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit request"}
          </button>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => router.back()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
