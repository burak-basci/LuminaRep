import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LuminaRep - Automate Your Medical Aesthetics Social Proof",
  description: "Transform Google Reviews into professional marketing assets. Automated content generation for MedSpas, cosmetic surgeons, and boutique dentists.",
  keywords: ["medical aesthetics", "social proof", "marketing automation", "medspa", "cosmetic surgery"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
