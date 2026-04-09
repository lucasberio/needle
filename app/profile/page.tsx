import { GENRE_STATS, MONTHLY_ACTIVITY, USER_LISTS, DIARY, getAlbum } from '@/lib/data'
import { AlbumArt, Stars, SectionLabel } from '@/components/ui'
import Link from 'next/link'

const MONTHS_SHORT = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']

export default function ProfilePage() {
  const maxActivity = Math.max(...MONTHLY_ACTIVITY)
  const avgRating = (DIARY.reduce((s, e) => s + e.rating, 0) / DIARY.length).toFixed(1)

  return (
    <div className="fade-up">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="rounded-full flex items-center justify-center font-medium flex-shrink-0"
          style={{ width: 64, height: 64, background: 'rgba(108,92,231,0.2)', color: '#a99ff5', fontSize: 22, fontFamily: 'var(--font-display)' }}
        >
          YO
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--needle-cream)' }}>yourname</h1>
          <p className="text-sm" style={{ color: 'var(--needle-muted)' }}>Austin, TX · joined 2024</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--needle-muted)' }}>48 following · 61 followers</p>
        </div>
        <button className="btn btn-ghost ml-auto text-sm">Edit profile</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {[
          { num: DIARY.length, label: 'Albums' },
          { num: DIARY.filter(e => e.review).length, label: 'Reviews' },
          { num: USER_LISTS.length, label: 'Lists' },
          { num: avgRating, label: 'Avg rating' },
        ].map(({ num, label }) => (
          <div key={label} className="rounded-xl text-center" style={{ background: 'var(--needle-dark-2)', border: '1px solid rgba(108,92,231,0.15)', padding: '12px 8px' }}>
            <p className="font-medium" style={{ fontSize: 22, color: 'var(--needle-cream)' }}>{num}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--needle-muted)' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Top genres */}
      <section className="mb-8">
        <SectionLabel>Top genres</SectionLabel>
        <div className="flex flex-col gap-3">
          {GENRE_STATS.map(({ genre, count, pct }) => (
            <div key={genre} className="flex items-center gap-3">
              <span className="text-xs w-20 flex-shrink-0" style={{ color: 'var(--needle-muted)' }}>{genre}</span>
              <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, background: 'var(--needle-purple)', opacity: 0.8 }}
                />
              </div>
              <span className="text-xs w-6 text-right" style={{ color: 'var(--needle-muted)' }}>{count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent lists */}
      <section className="mb-8">
        <SectionLabel>Lists</SectionLabel>
        <div className="flex flex-col gap-2">
          {USER_LISTS.map(list => (
            <div key={list.id} className="card p-3 flex items-center gap-3 cursor-pointer">
              <div
                className="rounded-lg flex-shrink-0"
                style={{ width: 36, height: 36, background: 'rgba(108,92,231,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}
              >
                ♪
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: 'var(--needle-cream)' }}>{list.name}</p>
                <p className="text-xs" style={{ color: 'var(--needle-muted)' }}>
                  {list.count} albums · {list.public ? 'public' : 'private'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Activity */}
      <section>
        <SectionLabel>Listening activity · last 12 months</SectionLabel>
        <div className="card p-4">
          <div className="flex items-end gap-1 h-14 mb-2">
            {MONTHLY_ACTIVITY.map((val, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm transition-opacity hover:opacity-100"
                style={{
                  height: `${(val / maxActivity) * 100}%`,
                  background: 'var(--needle-purple)',
                  opacity: 0.3 + (val / maxActivity) * 0.7,
                  minHeight: 4,
                }}
                title={`${val} albums`}
              />
            ))}
          </div>
          <div className="flex justify-between">
            {MONTHS_SHORT.map(m => (
              <span key={m} className="text-xs" style={{ color: 'var(--needle-muted)', fontSize: 10 }}>{m}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
