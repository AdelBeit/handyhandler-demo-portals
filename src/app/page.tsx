export default function Home() {
  return (
    <main className="page">
      <p className="eyebrow">HarborGate Property Management</p>
      <h1>Maintenance Requests Portal</h1>
      <p>
        A single-portal MVP with a dummy login, dashboard shell, profile, and
        maintenance request flow.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button className="btn btn-primary">Get Started</button>
        <button className="btn btn-outline">View Requests</button>
      </div>
      <p className="hint">Start at /login once the routes are added.</p>
    </main>
  );
}
