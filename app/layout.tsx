import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Needle — your music diary',
  description: 'Log, rate, and share every album you hear.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen" style={{ background: 'var(--n-black)' }}>
        <Nav />
        <main className="max-w-5xl mx-auto px-8 pt-8 pb-24">
          {children}
        </main>
      </body>
    </html>
  )
}
