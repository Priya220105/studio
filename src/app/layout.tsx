// src/app/layout.tsx
import './globals.css'
import type { ReactNode } from 'react'
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',        // must match your CSS var
  weight: ['400', '700'],          // adjust as needed
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',  // must match your CSS var
  weight: ['400'],                 // or whatever weights you need
})

export const metadata = {
  title: 'My App',
  description: 'Example with Next.js Google Font',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${robotoMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
