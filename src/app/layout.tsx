import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Arne Slot Out | Liverpool Fans Demand Change",
  description: "Join 248,391+ supporters signing the petition to remove Arne Slot as Liverpool manager. The standard has dropped. Sign the petition now.",
  metadataBase: new URL("https://arneslotout.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Arne Slot Out | Liverpool Fans Demand Change",
    description: "Join 248,391+ supporters signing the petition to remove Arne Slot. The standard has dropped.",
    url: "https://arneslotout.com",
    siteName: "Arne Slot Out",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arne Slot Out — Liverpool Fans Demand Change",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arne Slot Out | Liverpool Fans Demand Change",
    description: "Join 248,391+ supporters signing the petition to remove Arne Slot.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${outfit.variable}`}>
      <body className="bg-black text-white min-h-screen font-sans antialiased overflow-x-hidden selection:bg-red-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
