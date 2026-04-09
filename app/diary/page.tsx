import { DIARY, getAlbum } from '@/lib/data'
import { AlbumArt, Stars, SectionLabel } from '@/components/ui'
import Link from 'next/link'

function groupByMonth(entries: typeof DIARY) {
  const groups: Record<string, typeof DIARY> = {}
  for (const entry of entries) {
    const [year, month] = entry.date.split('-')
    const key = `${year}-${month}`
    if (!groups[key]) groups[key] = []
    groups[key].push(entry)
  }
  return groups
}

function formatMonthKey(key: string) {
  const [year, month] = key.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleString('default', { month: 'long', year: 'numeric' })
}

function formatDate(dateStr: string) {
  const [, month, day] = dateStr.split('-')
  const d = new Date(2026, Number(month) - 1, Number(day))
  return d.toLocaleString('default', { month: 'short', day: 'numeric' })
}

export default function DiaryPage() {
  const grouped = groupByMonth(DIARY)
  const months = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  return (
    <div className="fade-up">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--needle-cream)', lineHeight: 1.1 }}>
            Your diary
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--needle-muted)' }}>
            {DIARY.length} albums logged
          </p>
        </div>
        <select className="text-sm" style={{ background: 'var(--needle-dark-3)', color: 'var(--needle-cream)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '6px 10px', fontFamily: 'var(--font-body)' }}>
          <option>All time</option>
          <option>This year</option>
          <option>This month</option>
        </select>
      </div>

      {months.map(monthKey => (
        <section key={monthKey} className="mb-6">
          <SectionLabel>{formatMonthKey(monthKey)}</SectionLabel>
          <div className="card overflow-hidden" style={{ padding: 0 }}>
            {grouped[monthKey].map((entry, i) => {
              const album = getAlbum(entry.albumId)
              if (!album) return null
              const isLast = i === grouped[monthKey].length - 1
              return (
                <Link
                  key={entry.id}
                  href={`/album/${album.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="flex items-center gap-3 px-4 py-3 hover:opacity-80 transition-opacity"
                    style={{ borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <AlbumArt color={album.color} size={40} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--needle-cream)' }}>{album.title}</p>
                      <p className="text-xs" style={{ color: 'var(--needle-muted)' }}>{album.artist}</p>
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {entry.tags.map(tag => (
                            <span key={tag} className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(108,92,231,0.15)', color: '#a99ff5' }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <Stars rating={entry.rating} size={11} />
                      <p className="text-xs mt-1" style={{ color: 'var(--needle-muted)' }}>
                        {formatDate(entry.date)}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
