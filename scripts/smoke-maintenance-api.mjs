const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";

const log = (message) => console.log(`[smoke] ${message}`);

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const run = async () => {
  log(`BASE_URL=${baseUrl}`);

  log("GET /api/maintenance");
  const listRes = await fetch(`${baseUrl}/api/maintenance`, {
    headers: { Accept: "application/json" },
  });
  assert(listRes.ok, `GET failed: ${listRes.status}`);
  const list = await listRes.json();
  assert(Array.isArray(list), "GET response is not an array");
  assert(list.length > 0, "GET response is empty");
  log(`GET ok: ${list.length} items`);

  log("POST /api/maintenance");
  const postRes = await fetch(`${baseUrl}/api/maintenance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      description: "Smoke test request",
      category: "Plumbing",
      unit: "3B",
      imageUrl: null,
    }),
  });
  assert(postRes.ok, `POST failed: ${postRes.status}`);
  const created = await postRes.json();
  assert(created?.id, "POST response missing id");
  assert(created?.status === "New", "POST response status is not New");
  log(`POST ok: id=${created.id}`);

  log("Re-check GET /api/maintenance for new item");
  const verifyRes = await fetch(`${baseUrl}/api/maintenance`, {
    headers: { Accept: "application/json" },
  });
  assert(verifyRes.ok, `GET verify failed: ${verifyRes.status}`);
  const verifiedList = await verifyRes.json();
  const found = verifiedList.find((item) => item.id === created.id);
  assert(found, `GET verify missing id ${created.id}`);
  log(`GET verify ok: found ${created.id}`);

  log(`PATCH /api/maintenance/${created.id}`);
  const patchRes = await fetch(`${baseUrl}/api/maintenance/${created.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });
  if (!patchRes.ok) {
    const body = await patchRes.text();
    throw new Error(`PATCH failed: ${patchRes.status} ${body}`);
  }
  const updated = await patchRes.json();
  assert(updated?.status === "Canceled", "PATCH did not set status to Canceled");
  log(`PATCH ok: status=${updated.status}`);

  log("Done");
};

run().catch((error) => {
  console.error(`[smoke] FAILED: ${error.message}`);
  process.exit(1);
});
