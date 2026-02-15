import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type MaintenanceRequest = {
  id: string;
  dateFiled: string;
  description: string;
  category: string;
  unit: string;
  status: string;
  imageUrl: string | null;
};

const dataFilePath = path.join(process.cwd(), "data", "maintenance.json");

export async function readMaintenanceRequests(): Promise<MaintenanceRequest[]> {
  const file = await readFile(dataFilePath, "utf-8");
  return JSON.parse(file) as MaintenanceRequest[];
}

export async function writeMaintenanceRequests(
  requests: MaintenanceRequest[],
): Promise<void> {
  const payload = `${JSON.stringify(requests, null, 2)}\n`;
  await writeFile(dataFilePath, payload, "utf-8");
}

export async function getMaintenanceRequests(): Promise<MaintenanceRequest[]> {
  return readMaintenanceRequests();
}
