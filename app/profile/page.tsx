import { GENRE_STATS, MONTHLY_ACTIVITY, USER_LISTS, DIARY } from '@/lib/data'
import { Stars } from '@/components/ui'

const MONTHS_SHORT = ['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr']

export default function ProfilePage() {
  const maxActivity = Math.max(...MONTHLY_ACTIVITY)
  const avgRating = (DIARY.reduce((s, e) => s + e.rating, 0) / DIARY.length).toFixed(1)

  return (
    <div className="fade-up">
      {/* Header */}
      <div className="flex items-center gap-6 mb-10">
        <div className="rounded-full flex items-center justify-center font-medium flex-shrink-0"
          style={{ width: 80, height: 80, background: 'rgba(255,31,51,0.15)', color: '#ff6b78', fontSize: 28, fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>
          YO
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 42, color: '#fff', letterSpacing: '0.04em', lineHeight: 1 }}>YOURNAME</h1>
          <p className="mt-1" style={{ fontSize: 15, color: '#888' }}>Austin, TX · joined 2024</p>
          <p className="text-sm mt-0.5" style={{ color: '#666' }}>48 following · 61 followers</p>
        </div>
        <button className="btn btn-ghost ml-auto">Edit profile</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        {[
          { num: DIARY.length, label: 'Albums logged' },
          { num: DIARY.filter(e => e.review).length, label: 'Reviews' },
          { num: USER_LISTS.length, label: 'Lists' },
          { num: avgRating, label: 'Avg rating' },
        ].map(({ num, label }) => (
          <div key={label} className="rounded-xl text-center" style={{ background: 'var(--n-dark)', border: '1px solid rgba(255,255,255,0.08)', padding: '20px 16px' }}>
            <p style={{ fontSize: 32, fontWeight: 500, color: '#fff', fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>{num}</p>
            <p className="text-sm mt-1" style={{ color: '#888' }}>{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          {/* Top genres */}
          <p className="section-label">Top genres</p>
          <div className="flex flex-col gap-4 mb-8">
            {GENRE_STATS.map(({ genre, count, pct }) => (
              <div key={genre} className="flex items-center gap-4">
                <span className="text-sm w-24 flex-shrink-0" style={{ color: '#bbb' }}>{genre}</span>
                <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'var(--n-red)' }} />
                </div>
                <span className="text-sm w-6 text-right" style={{ color: '#888' }}>{count}</span>
              </div>
            ))}
          </div>

          {/* Activity */}
          <p className="section-label">Listening activity · last 12 months</p>
          <div className="card p-5">
            <div className="flex items-end gap-1.5 h-16 mb-3">
              {MONTHLY_ACTIVITY.map((val, i) => (
                <div key={i} className="flex-1 rounded-sm"
                  style={{ height: `${(val / maxActivity) * 100}%`, background: 'var(--n-red)', opacity: 0.3 + (val / maxActivity) * 0.7, minHeight: 4 }}
                  title={`${val} albums`} />
              ))}
            </div>
            <div className="flex justify-between">
              {MONTHS_SHORT.map(m => (
                <span key={m} style={{ fontSize: 11, color: '#666' }}>{m}</span>
              ))}
            </div>
          </div>
        </div>

        <div>
          {/* Lists */}
          <p className="section-label">Lists</p>
          <div className="flex flex-col gap-3">
            {USER_LISTS.map(list => (
              <div key={list.id} className="card p-4 flex items-center gap-4 cursor-pointer">
                <div className="rounded-lg flex-shrink-0" style={{ width: 44, height: 44, background: 'rgba(255,31,51,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                  ♪
                </div>
                <div className="flex-1">
                  <p className="font-medium" style={{ fontSize: 15, color: '#fff' }}>{list.name}</p>
                  <p className="text-sm mt-0.5" style={{ color: '#888' }}>{list.count} albums · {list.public ? 'public' : 'private'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
