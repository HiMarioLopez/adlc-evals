import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ADLC Evals | Technical Reports",
    template: "%s | ADLC Evals",
  },
  description:
    "In-depth technical evaluations of AI agent frameworks, cloud infrastructure, and development workflows. Built with reproducible methodology and transparent sourcing.",
  keywords: [
    "AI Agents",
    "Technical Evaluation",
    "Cloud Infrastructure",
    "AI SDK",
    "LLM",
    "Developer Tools",
  ],
  authors: [{ name: "Mario Lopez Martinez" }],
  openGraph: {
    title: "ADLC Evals | Technical Reports",
    description:
      "In-depth technical evaluations of AI agent frameworks and cloud infrastructure",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://basemaps.cartocdn.com" rel="preconnect" />
        <link href="https://basemaps.cartocdn.com" rel="dns-prefetch" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} overflow-x-hidden font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
