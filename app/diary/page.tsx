import { DIARY, getAlbum } from '@/lib/data'
import { AlbumArt, Stars } from '@/components/ui'
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
  return new Date(Number(year), Number(month) - 1).toLocaleString('default', { month: 'long', year: 'numeric' })
}

function formatDate(dateStr: string) {
  const [, month, day] = dateStr.split('-')
  return new Date(2026, Number(month) - 1, Number(day)).toLocaleString('default', { month: 'short', day: 'numeric' })
}

export default function DiaryPage() {
  const grouped = groupByMonth(DIARY)
  const months = Object.keys(grouped).sort((a, b) => b.localeCompare(a))

  return (
    <div className="fade-up">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: '#fff', lineHeight: 1, letterSpacing: '0.04em' }}>
            YOUR DIARY
          </h1>
          <p className="mt-2" style={{ fontSize: 15, color: '#888' }}>{DIARY.length} albums logged</p>
        </div>
        <select>
          <option>All time</option>
          <option>This year</option>
          <option>This month</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {months.map(monthKey => (
          <section key={monthKey}>
            <p className="section-label">{formatMonthKey(monthKey)}</p>
            <div className="card" style={{ padding: 0 }}>
              {grouped[monthKey].map((entry, i) => {
                const album = getAlbum(entry.albumId)
                if (!album) return null
                const isLast = i === grouped[monthKey].length - 1
                return (
                  <Link key={entry.id} href={`/album/${album.id}`} style={{ textDecoration: 'none' }}>
                    <div
                      className="flex items-center gap-4 px-5 py-4 hover:opacity-75 transition-opacity"
                      style={{ borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <AlbumArt color={album.color} size={46} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate" style={{ fontSize: 15, color: '#fff' }}>{album.title}</p>
                        <p className="text-sm mt-0.5" style={{ color: '#888' }}>{album.artist}</p>
                        {entry.tags && entry.tags.length > 0 && (
                          <div className="flex gap-1 mt-1.5">
                            {entry.tags.map(tag => (
                              <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(255,31,51,0.12)', color: '#ff6b78' }}>{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <Stars rating={entry.rating} size={12} />
                        <p className="text-xs mt-1" style={{ color: '#666' }}>{formatDate(entry.date)}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
