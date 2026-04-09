'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Feed' },
  { href: '/discover', label: 'Discover' },
  { href: '/diary', label: 'Diary' },
  { href: '/profile', label: 'Profile' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <header style={{ background: 'var(--needle-dark-2)', borderBottom: '1px solid rgba(108,92,231,0.2)' }}>
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--needle-cream)', letterSpacing: '-0.5px', textDecoration: 'none' }}>
            needle<span style={{ color: 'var(--needle-purple)' }}>.</span>fm
          </Link>

          <div className="flex items-center gap-1">
            <input
              type="search"
              placeholder="Search albums..."
              className="hidden sm:block mr-2"
              style={{ width: 180, padding: '5px 10px', fontSize: 13 }}
            />
            <nav className="flex items-center gap-1">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link px-3 py-1 text-sm rounded-md transition-colors ${pathname === href ? 'active' : ''}`}
                  style={{
                    color: pathname === href ? 'var(--needle-cream)' : 'var(--needle-muted)',
                    textDecoration: 'none',
                    fontSize: 13,
                  }}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/log"
                className="btn btn-primary ml-2"
                style={{ fontSize: 13, padding: '6px 14px', textDecoration: 'none' }}
              >
                + Log
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
