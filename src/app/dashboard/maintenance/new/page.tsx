"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const DropzoneLoading = () => (
  <div className="flex flex-col items-center justify-center rounded-box border border-dashed border-base-content/20 bg-base-200 p-6 text-center text-sm text-base-content/60">
    <span className="font-semibold text-base-content">Loading uploader...</span>
    <span>Please wait</span>
  </div>
);

const AttachmentDropzone = dynamic(
  () => import("@/components/AttachmentDropzone"),
  {
    ssr: false,
    loading: DropzoneLoading,
  },
);

const categories = ["Plumbing", "Electrical", "HVAC", "Appliance"] as const;

export default function NewMaintenanceRequestPage() {
  type AttachmentPreview = {
    id: string;
    file: File;
    previewUrl: string;
  };

  const router = useRouter();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [attachments, setAttachments] = useState<AttachmentPreview[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const attachmentsRef = useRef<AttachmentPreview[]>([]);
  const unit = "3B";
  const attachmentCount = useMemo(() => attachments.length, [attachments]);

  const handleFilesChange = useCallback((files: File[]) => {
    if (files.length === 0) {
      return;
    }
    setAttachments((prev) => [
      ...prev,
      ...files.map((file) => ({
        id: `${file.name}-${file.lastModified}-${file.size}`,
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    ]);
  }, []);

  const removeAttachment = useCallback((id: string) => {
    setAttachments((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  useEffect(() => {
    attachmentsRef.current = attachments;
  }, [attachments]);

  useEffect(() => {
    return () => {
      attachmentsRef.current.forEach((attachment) => {
        URL.revokeObjectURL(attachment.previewUrl);
      });
    };
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      let uploadedUrls: string[] = [];
      if (attachments.length > 0) {
        const results: string[] = [];
        for (const attachment of attachments) {
          const formData = new FormData();
          formData.append("file", attachment.file);
          const uploadRes = await fetch("/api/maintenance/upload", {
            method: "POST",
            body: formData,
          });
          if (!uploadRes.ok) {
            throw new Error(`Upload failed (${uploadRes.status}).`);
          }
          const uploadPayload = (await uploadRes.json()) as { url?: string };
          if (uploadPayload.url) {
            results.push(uploadPayload.url);
          }
        }
        uploadedUrls = results;
      }

      const response = await fetch("/api/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          category,
          unit,
          imageUrl: uploadedUrls.length > 0 ? uploadedUrls : null,
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
          <AttachmentDropzone onFilesChange={handleFilesChange} />
          <div className="mt-2 text-sm text-base-content/60">
            {attachmentCount > 0 ? (
              <div className="flex flex-wrap gap-2">
                {attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center gap-2 rounded-box border border-base-content/10 bg-base-200 p-2"
                  >
                    <div className="h-12 w-12 overflow-hidden rounded-lg bg-base-100">
                      <img
                        src={attachment.previewUrl}
                        alt={attachment.file.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm text-base-content">
                        {attachment.file.name}
                      </p>
                      <button
                        type="button"
                        className="btn btn-ghost btn-xs"
                        onClick={() => removeAttachment(attachment.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
