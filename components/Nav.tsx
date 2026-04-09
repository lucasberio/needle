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
    <header style={{ background: '#111111', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="max-w-5xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 36,
              letterSpacing: '0.06em',
              color: 'var(--n-white)',
              lineHeight: 1,
            }}>
              NEEDLE
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <input
              type="search"
              placeholder="Search albums..."
              className="hidden sm:block mr-3"
              style={{ width: 220, padding: '7px 12px', fontSize: 14 }}
            />
            <nav className="flex items-center gap-1">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link px-4 py-2 rounded-md ${pathname === href ? 'active' : ''}`}
                  style={{
                    color: pathname === href ? 'var(--n-white)' : '#999',
                    textDecoration: 'none',
                    fontSize: 15,
                    fontWeight: pathname === href ? 500 : 400,
                  }}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/log"
                className="btn btn-primary ml-3"
                style={{ fontSize: 14, padding: '8px 18px' }}
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
