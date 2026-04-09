import { ALBUMS, DIARY, getAlbum } from '@/lib/data'
import { AlbumArt, Stars } from '@/components/ui'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return ALBUMS.map(a => ({ id: a.id }))
}

const REVIEWS = [
  { handle: 'sarahlistens', initials: 'SL', color: '#1a4a2a', rating: 5, text: 'Radiohead somehow made vulnerability sound like a transmission from outer space. Every time I think I\'ve fully heard this record, "Reckoner" opens up a new room.', likes: 48, timeAgo: '2 days ago' },
  { handle: 'kp_ears', initials: 'KP', color: '#4a3a1a', rating: 4, text: 'The pay-what-you-want release was a cultural moment, but it\'s the music that makes you keep coming back. "All I Need" might be the most devastating three minutes of their career.', likes: 31, timeAgo: '1 week ago' },
  { handle: 'waveform99', initials: 'WF', color: '#1a2a4a', rating: 5, text: 'Peak Radiohead. Every track serves the whole. The production by Nigel Godrich is immaculate.', likes: 19, timeAgo: '2 weeks ago' },
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
      <div className="flex gap-8 mb-10">
        <AlbumArt color={album.color} size={160} className="rounded-2xl flex-shrink-0" />
        <div className="flex-1 min-w-0 pt-2">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 52, color: '#fff', lineHeight: 1, letterSpacing: '0.04em', marginBottom: 6 }}>
            {album.title.toUpperCase()}
          </h1>
          <p className="mb-1" style={{ fontSize: 18, color: 'var(--n-red)', cursor: 'pointer' }}>{album.artist}</p>
          <p className="mb-4" style={{ fontSize: 15, color: '#888' }}>{album.year} · {album.genre.join(', ')}</p>
          <div className="flex items-center gap-4 mb-6">
            <Stars rating={Math.round(album.communityRating)} size={16} />
            <span style={{ fontSize: 15, color: '#aaa' }}>
              {album.communityRating.toFixed(1)} · {album.totalListens.toLocaleString()} listens
            </span>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link href="/log" className="btn btn-primary" style={{ fontSize: 14 }}>
              {userEntry ? '✓ Logged' : '+ Log this album'}
            </Link>
            <button className="btn btn-ghost" style={{ fontSize: 14 }}>♡ Wishlist</button>
            <button className="btn btn-ghost" style={{ fontSize: 14 }}>≡ Add to list</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Reviews */}
          <p className="section-label">Reviews</p>
          <div className="flex flex-col gap-4">
            {REVIEWS.map((rev, i) => (
              <div key={i} className="card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0"
                    style={{ width: 34, height: 34, background: rev.color, color: '#fff' }}>
                    {rev.initials}
                  </div>
                  <span className="font-medium" style={{ fontSize: 15, color: 'var(--n-red)', cursor: 'pointer' }}>{rev.handle}</span>
                  <span className="text-sm" style={{ color: '#666' }}>· {rev.timeAgo}</span>
                  <Stars rating={rev.rating} size={12} />
                </div>
                <p className="italic" style={{ fontSize: 15, color: '#bbb', lineHeight: 1.65 }}>"{rev.text}"</p>
                <div className="flex gap-5 mt-4">
                  <button className="text-sm" style={{ color: '#666', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>♡ {rev.likes}</button>
                  <button className="text-sm" style={{ color: '#666', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Reply</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Rating distribution */}
          <p className="section-label">Rating distribution</p>
          <div className="card p-5 mb-6">
            <div className="flex items-end gap-2 h-20 mb-3">
              {RATING_DIST.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full rounded-sm" style={{ height: `${(val / maxDist) * 100}%`, background: 'var(--n-red)', opacity: 0.4 + (val / maxDist) * 0.6, minHeight: 4 }} />
                  <span style={{ fontSize: 11, color: '#666' }}>{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Your entry */}
          {userEntry && (
            <>
              <p className="section-label">Your entry</p>
              <div className="card p-5">
                <div className="flex items-center justify-between mb-3">
                  <Stars rating={userEntry.rating} size={14} />
                  <span className="text-sm" style={{ color: '#666' }}>{userEntry.date}</span>
                </div>
                {userEntry.review && (
                  <p className="italic" style={{ fontSize: 14, color: '#aaa', lineHeight: 1.6 }}>"{userEntry.review}"</p>
                )}
                {userEntry.tags && (
                  <div className="flex gap-1 mt-3 flex-wrap">
                    {userEntry.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(255,31,51,0.12)', color: '#ff6b78' }}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
