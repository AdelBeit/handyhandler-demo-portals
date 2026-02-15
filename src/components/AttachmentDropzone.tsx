"use client";

import { memo, useCallback } from "react";
import { useDropzone } from "react-dropzone";

type AttachmentDropzoneProps = {
  onFilesChange: (files: File[]) => void;
};

function AttachmentDropzone({
  onFilesChange,
}: AttachmentDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFilesChange(acceptedFiles);
      }
    },
    [onFilesChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  return (
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
  );
}

export default memo(AttachmentDropzone);
