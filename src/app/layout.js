import "@/styles/globals.css";
import { inter } from "@/lib/fonts";

export const metadata = {
  title: "EVEL Cosmetics Group | Beauty, Skincare & Personal Care Company",
  description:
    "EVEL Cosmetics Group is a modern cosmetics company preparing to launch beauty, skincare, fragrance, deodorant, body care, and personal care products.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}