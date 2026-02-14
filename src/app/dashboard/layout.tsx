import type { ReactNode } from "react";
import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/maintenance", label: "Maintenance" }
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <header className="border-b border-base-300 bg-base-100">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">
              HarborGate Property Management
            </p>
            <h1 className="text-lg font-semibold">Resident Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge badge-outline">Tenant</span>
            <button className="btn btn-sm btn-ghost">Sign out</button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-6 lg:grid-cols-[240px_1fr]">
        <aside className="card bg-base-100 text-base-content shadow-xl">
          <div className="card-body gap-4">
            <h2 className="card-title text-base">Navigation</h2>
            <ul className="menu rounded-box bg-base-100 p-0">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto rounded-box bg-base-200 p-4 text-sm text-base-content/70">
              Need help? Call (555) 302-1940
            </div>
          </div>
        </aside>

        <section className="card bg-base-100 text-base-content shadow-xl">
          <div className="card-body">{children}</div>
        </section>
      </div>
    </div>
  );
}
