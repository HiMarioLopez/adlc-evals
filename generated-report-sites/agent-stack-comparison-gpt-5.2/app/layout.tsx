import React from "react"
import type { Metadata } from 'next'
import { JetBrains_Mono, Outfit } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit'
})
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains'
})

export const metadata: Metadata = {
  title: 'Agent Stack Comparison 2026 | Vercel vs AWS',
  description: 'Technical deep-dive comparing Vercel AI SDK + AI Gateway + Sandbox vs AWS Strands + AgentCore infrastructure',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
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
