import type { Metadata } from "next";
import { Sora, Playfair_Display } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio",
    template: "%s · Portfolio",
  },
  description:
    "Senior full-stack engineer delivering premium, production-ready web experiences.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Portfolio",
    description:
      "Senior full-stack engineer delivering premium, production-ready web experiences.",
    url: "https://example.com",
    siteName: "Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio",
    description:
      "Senior full-stack engineer delivering premium, production-ready web experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${sora.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
