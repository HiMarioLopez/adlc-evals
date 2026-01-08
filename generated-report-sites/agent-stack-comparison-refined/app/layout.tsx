import type { Metadata, Viewport } from 'next'
import { Sora, Fira_Code } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Agent Stack Comparison 2026 | Vercel vs AWS',
  description: 'Comprehensive technical evaluation of Vercel AI SDK and Bedrock AgentCore for building production-ready AI agents. Infrastructure, pricing, and architecture analysis.',
  keywords: ['Vercel', 'AWS', 'AI SDK', 'Bedrock AgentCore', 'Strands', 'AI Agents', 'LLM', 'Claude'],
  authors: [{ name: 'Technical Research Team' }],
  openGraph: {
    title: 'Agent Stack Comparison 2026 | Vercel vs AWS',
    description: 'Comprehensive technical evaluation of Vercel AI SDK and Bedrock AgentCore',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f6' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1117' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sora.variable} ${firaCode.variable} font-sans overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
