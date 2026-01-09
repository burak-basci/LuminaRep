import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
