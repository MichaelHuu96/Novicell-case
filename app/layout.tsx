import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InfinityElectronics",
  description: "Frontend case",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}