import type { Metadata, Viewport } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "CineTMA Multilingual",
  description: "Discover movies, official viewing options and verified language tracks.",
};

export const viewport: Viewport = {
  themeColor: "#0b0b0f",
};

export default function PagesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
