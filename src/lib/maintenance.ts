import { readFile } from "node:fs/promises";
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

export async function getMaintenanceRequests(): Promise<MaintenanceRequest[]> {
  const filePath = path.join(process.cwd(), "data", "maintenance.json");
  const file = await readFile(filePath, "utf-8");
  return JSON.parse(file) as MaintenanceRequest[];
}
