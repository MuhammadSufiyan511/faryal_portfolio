import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import "./globals.css";

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Faryal Zaheer | Calligraphy Artist & Visual Artist",
  description:
    "A premium single-page portfolio for Faryal Zaheer, featuring Islamic calligraphy, mixed-media works, workshops, exhibitions, and commission inquiries.",
  keywords: [
    "Faryal Zaheer",
    "calligraphy artist",
    "visual artist",
    "Islamic calligraphy",
    "mixed media",
    "artist portfolio",
  ],
  openGraph: {
    title: "Faryal Zaheer | Calligraphy Artist & Visual Artist",
    description:
      "Elegant portfolio website for an Islamic calligraphy and visual artist.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${heading.variable} ${body.variable} bg-paper text-charcoal antialiased overflow-x-clip`}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
