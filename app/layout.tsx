import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "Commercial Banking Market Intelligence Heat Map";
const description =
  "Interactive public market intelligence for commercial lenders exploring Texas growth, public evidence, nearby projects, and lending opportunities.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: title,
  keywords: [
    "commercial banking",
    "market intelligence",
    "Texas lending",
    "commercial real estate",
    "economic development",
    "public data",
    "bank prospecting"
  ],
  authors: [{ name: "Commercial Banking Market Intelligence" }],
  creator: "Commercial Banking Market Intelligence",
  publisher: "Commercial Banking Market Intelligence",
  category: "finance",
  formatDetection: {
    telephone: false,
    address: false,
    email: false
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title,
    description,
    siteName: title
  },
  twitter: {
    card: "summary",
    title,
    description
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#a4471f"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
