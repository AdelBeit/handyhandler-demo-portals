export default function Home() {
  return (
    <main className="page text-base-content">
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
      <div className="mt-6 grid w-full max-w-3xl gap-4 text-left sm:grid-cols-2">
        <div className="card bg-base-100 text-base-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Theme Check</h2>
            <p className="text-sm opacity-80">
              If DaisyUI is active, this card and the buttons should follow the
              selected theme.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-primary">Primary</span>
              <span className="badge badge-secondary">Secondary</span>
              <span className="badge badge-accent">Accent</span>
            </div>
          </div>
        </div>
        <div className="card bg-base-200 text-base-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Contrast Check</h2>
            <p className="text-sm opacity-80">
              Backgrounds should shift with the theme (base-100 vs base-200).
            </p>
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm">Secondary</button>
              <button className="btn btn-accent btn-sm">Accent</button>
            </div>
          </div>
        </div>
      </div>
      <p className="hint">Start at /login once the routes are added.</p>
    </main>
  );
}
