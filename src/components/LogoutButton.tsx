"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleLogout = async () => {
    setSubmitting(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setSubmitting(false);
      router.push("/login");
    }
  };

  return (
    <button
      className="btn btn-sm btn-ghost"
      type="button"
      onClick={handleLogout}
      disabled={submitting}
    >
      {submitting ? "Signing out..." : "Sign out"}
    </button>
  );
}
