import { ALBUMS, DIARY, getAlbum } from '@/lib/data'
import { AlbumArt, Stars, SectionLabel } from '@/components/ui'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return ALBUMS.map(a => ({ id: a.id }))
}

const REVIEWS = [
  { handle: 'sarahlistens', initials: 'SL', colorClass: 'text-emerald-400 bg-emerald-900/40', rating: 5, text: 'Radiohead somehow made vulnerability sound like a transmission from outer space. Every time I think I\'ve fully heard this record, "Reckoner" opens up a new room.', likes: 48, timeAgo: '2 days ago' },
  { handle: 'kp_ears', initials: 'KP', colorClass: 'text-amber-400 bg-amber-900/40', rating: 4, text: 'The pay-what-you-want release was a cultural moment, but it\'s the music that makes you keep coming back. "All I Need" might be the most devastating three minutes of their career.', likes: 31, timeAgo: '1 week ago' },
  { handle: 'waveform99', initials: 'WF', colorClass: 'text-blue-300 bg-blue-900/40', rating: 5, text: 'Peak Radiohead. Every track serves the whole. The production by Nigel Godrich is immaculate.', likes: 19, timeAgo: '2 weeks ago' },
]

const RATING_DIST = [3, 8, 22, 38, 29]

export default function AlbumPage({ params }: { params: { id: string } }) {
  const album = getAlbum(params.id)
  if (!album) notFound()

  const userEntry = DIARY.find(e => e.albumId === album.id)
  const maxDist = Math.max(...RATING_DIST)

  return (
    <div className="fade-up">
      {/* Hero */}
      <div className="flex gap-5 mb-8">
        <AlbumArt color={album.color} size={120} className="rounded-2xl" />
        <div className="flex-1 min-w-0 pt-1">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--needle-cream)', lineHeight: 1.15, marginBottom: 4 }}>
            {album.title}
          </h1>
          <p className="text-base mb-1" style={{ color: 'var(--needle-purple)', cursor: 'pointer' }}>{album.artist}</p>
          <p className="text-sm mb-3" style={{ color: 'var(--needle-muted)' }}>
            {album.year} · {album.genre.join(', ')}
          </p>
          <div className="flex items-center gap-3 mb-4">
            <Stars rating={Math.round(album.communityRating)} size={14} />
            <span className="text-sm" style={{ color: 'var(--needle-muted)' }}>
              {album.communityRating.toFixed(1)} · {album.totalListens.toLocaleString()} listens
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link href="/log" className="btn btn-primary" style={{ fontSize: 13, textDecoration: 'none' }}>
              {userEntry ? '✓ Logged' : '+ Log this'}
            </Link>
            <button className="btn btn-ghost" style={{ fontSize: 13 }}>♡ Wishlist</button>
            <button className="btn btn-ghost" style={{ fontSize: 13 }}>≡ List</button>
          </div>
        </div>
      </div>

      {/* Rating distribution */}
      <section className="mb-8">
        <div className="card p-4">
          <p className="text-xs mb-3" style={{ color: 'var(--needle-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rating distribution</p>
          <div className="flex items-end gap-2 h-16">
            {RATING_DIST.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-sm"
                  style={{ height: `${(val / maxDist) * 100}%`, background: 'var(--needle-purple)', opacity: 0.5 + (val / maxDist) * 0.5, minHeight: 4 }}
                />
                <span style={{ fontSize: 10, color: 'var(--needle-muted)' }}>{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your entry */}
      {userEntry && (
        <section className="mb-8">
          <SectionLabel>Your entry</SectionLabel>
          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <Stars rating={userEntry.rating} size={14} />
              <span className="text-xs" style={{ color: 'var(--needle-muted)' }}>{userEntry.date}</span>
            </div>
            {userEntry.review && (
              <p className="text-sm italic" style={{ color: 'var(--needle-muted)', lineHeight: 1.6 }}>"{userEntry.review}"</p>
            )}
            {userEntry.tags && (
              <div className="flex gap-1 mt-2">
                {userEntry.tags.map(tag => (
                  <span key={tag} className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(108,92,231,0.15)', color: '#a99ff5' }}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Community reviews */}
      <section>
        <SectionLabel>Reviews</SectionLabel>
        <div className="flex flex-col gap-3">
          {REVIEWS.map((rev, i) => (
            <div key={i} className="card p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className={`rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${rev.colorClass}`} style={{ width: 28, height: 28 }}>
                  {rev.initials}
                </div>
                <span className="text-sm font-medium" style={{ color: 'var(--needle-purple)', cursor: 'pointer' }}>{rev.handle}</span>
                <span className="text-xs" style={{ color: 'var(--needle-muted)' }}>· {rev.timeAgo}</span>
                <Stars rating={rev.rating} size={11} />
              </div>
              <p className="text-sm italic" style={{ color: 'var(--needle-muted)', lineHeight: 1.65 }}>"{rev.text}"</p>
              <div className="flex gap-4 mt-3">
                <button className="text-xs" style={{ color: 'var(--needle-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>♡ {rev.likes}</button>
                <button className="text-xs" style={{ color: 'var(--needle-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Reply</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
