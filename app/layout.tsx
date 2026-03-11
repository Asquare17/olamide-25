import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy 25th Birthday, Olamide 🌹",
  description: "A special birthday experience made with love",
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
