import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'needle.fm — your music diary',
  description: 'Log, rate, and share every album you hear.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen" style={{ background: 'var(--needle-dark)' }}>
        <Nav />
        <main className="max-w-2xl mx-auto px-4 pt-6 pb-24">
          {children}
        </main>
      </body>
    </html>
  )
}
