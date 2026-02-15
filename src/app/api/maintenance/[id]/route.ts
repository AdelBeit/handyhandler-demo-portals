import { NextResponse } from "next/server";

import {
  readMaintenanceRequests,
  writeMaintenanceRequests,
} from "@/lib/maintenance";

export const dynamic = "force-dynamic";

type RouteParams = {
  params: {
    id: string;
  };
};

export async function PATCH(_request: Request, { params }: RouteParams) {
  const requests = await readMaintenanceRequests();
  const target = requests.find((item) => item.id === params.id);

  if (!target) {
    return NextResponse.json(
      { error: "Maintenance request not found." },
      { status: 404 },
    );
  }

  target.status = "Canceled";
  await writeMaintenanceRequests(requests);

  return NextResponse.json(target);
}
