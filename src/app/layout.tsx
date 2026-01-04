import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { BuyMeCoffee } from "@/components/BuyMeCoffee";
import { PersonJsonLd, WebsiteJsonLd } from "@/components/JsonLd";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shawnschwartz.com"),
  title: {
    default: "Shawn Schwartz - Software Engineer & Researcher",
    template: "%s | Shawn Schwartz",
  },
  description:
    "Personal website of Shawn Schwartz. Software engineer and researcher sharing insights on programming, research, and technology.",
  keywords: [
    "Shawn Schwartz",
    "software engineer",
    "data scientist",
    "researcher",
    "Stanford PhD",
    "neuroscience",
    "cognitive science",
    "machine learning",
    "iOS developer",
    "R packages",
    "open source",
  ],
  authors: [{ name: "Shawn Schwartz" }],
  creator: "Shawn Schwartz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shawnschwartz.com",
    siteName: "Shawn Schwartz",
    title: "Shawn Schwartz - Software Engineer & Researcher",
    description:
      "Personal website of Shawn Schwartz. Software engineer and researcher sharing insights on programming, research, and technology.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shawn Schwartz - Software Engineer & Researcher",
    description:
      "Personal website of Shawn Schwartz. Software engineer and researcher sharing insights on programming, research, and technology.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
    ],
    apple: "/apple-touch-icon.png",
  },
  verification: {
    // Add your verification codes here when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PersonJsonLd />
        <WebsiteJsonLd />
        {/* AI/LLM discovery links */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Information" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM Full Information" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <CustomCursor />
          <SmoothScroll>
            <HeaderWrapper />
            <main className="flex-1">{children}</main>
            <Footer />
          </SmoothScroll>
          <BuyMeCoffee />
          <SpeedInsights />
        </ThemeProvider>
        <Script
          src="https://cdn.seline.com/seline.js"
          data-token="2162fe5e9da2b07"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
