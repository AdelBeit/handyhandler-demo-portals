export default function DashboardHome() {
  return (
    <main className="min-h-screen bg-base-200 text-base-content">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6 py-16">
        <div className="card bg-base-100 text-base-content shadow-2xl">
          <div className="card-body">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-base-content/60">
              HarborGate Property Management
            </p>
            <h1 className="text-3xl font-semibold">Dashboard</h1>
            <p className="text-base text-base-content/70">
              You are signed in. Dashboard navigation will be added next.
            </p>
            <div className="card-actions">
              <button className="btn btn-primary">View maintenance</button>
              <button className="btn btn-ghost">Profile</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
