import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Demo Portals",
  description: "Single-portal maintenance requests demo"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
