'use client'
import { useState } from 'react'

export function AlbumArt({ color, size = 48, className = '' }: { color: string; size?: number; className?: string }) {
  return (
    <div
      className={`art-placeholder rounded-xl flex-shrink-0 ${className}`}
      style={{ width: size, height: size, background: color, minWidth: size }}
    />
  )
}

export function Stars({ rating, max = 5, size = 16 }: { rating: number; max?: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill="none">
          <path
            d="M10 1l2.4 7.4H20l-6.2 4.5 2.4 7.4L10 16l-6.2 4.3 2.4-7.4L0 8.4h7.6z"
            fill={i < rating ? '#F4B942' : 'rgba(255,255,255,0.12)'}
          />
        </svg>
      ))}
    </div>
  )
}

export function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          className="p-0.5 transition-transform hover:scale-110"
        >
          <svg width="26" height="26" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 1l2.4 7.4H20l-6.2 4.5 2.4 7.4L10 16l-6.2 4.3 2.4-7.4L0 8.4h7.6z"
              fill={n <= (hover || value) ? '#F4B942' : 'rgba(255,255,255,0.12)'}
              style={{ transition: 'fill 0.1s' }}
            />
          </svg>
        </button>
      ))}
    </div>
  )
}

export function Avatar({ initials, colorClass, size = 36 }: { initials: string; colorClass: string; size?: number }) {
  return (
    <div
      className={`rounded-full flex items-center justify-center font-medium flex-shrink-0 text-xs ${colorClass}`}
      style={{ width: size, height: size, minWidth: size, fontSize: size * 0.32 }}
    >
      {initials}
    </div>
  )
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: 'var(--needle-muted)' }}>
      {children}
    </p>
  )
}

export function Badge({ children, variant = 'purple' }: { children: React.ReactNode; variant?: 'purple' | 'gold' }) {
  return <span className={`badge badge-${variant}`}>{children}</span>
}
