import { NextResponse } from "next/server";

import {
  readMaintenanceRequests,
  writeMaintenanceRequests,
  type MaintenanceRequest,
} from "@/lib/maintenance";

export const dynamic = "force-dynamic";

const REQUIRED_FIELDS = ["description", "category", "unit"] as const;

type CreateRequestPayload = {
  description?: string;
  category?: string;
  unit?: string;
  imageUrl?: string | string[] | null;
};

export async function GET() {
  const requests = await readMaintenanceRequests();
  return NextResponse.json(requests, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request: Request) {
  let payload: CreateRequestPayload;

  try {
    payload = (await request.json()) as CreateRequestPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  for (const field of REQUIRED_FIELDS) {
    if (!payload?.[field]) {
      return NextResponse.json(
        { error: `Missing required field: ${field}.` },
        { status: 400 },
      );
    }
  }

  const requests = await readMaintenanceRequests();
  const newRequest: MaintenanceRequest = {
    id: `req-${Date.now()}`,
    caseNumber: `CASE-${requests.length + 1}`,
    filedAt: new Date().toISOString(),
    description: payload.description ?? "",
    category: payload.category ?? "",
    unit: payload.unit ?? "",
    status: "New",
    imageUrl: payload.imageUrl ?? null,
  };

  requests.push(newRequest);
  await writeMaintenanceRequests(requests);

  return NextResponse.json(newRequest, { status: 201 });
}
