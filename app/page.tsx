import { FEED, ALBUMS, getAlbum } from '@/lib/data'
import { AlbumArt, Stars, Avatar, SectionLabel } from '@/components/ui'
import Link from 'next/link'

export default function FeedPage() {
  const popular = ALBUMS.slice(0, 6)

  return (
    <div className="fade-up">
      {/* Popular shelf */}
      <section className="mb-8">
        <SectionLabel>Popular this week</SectionLabel>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
          {popular.map((album, i) => (
            <Link
              href={`/album/${album.id}`}
              key={album.id}
              className="flex-shrink-0 text-center group"
              style={{ textDecoration: 'none', animationDelay: `${i * 0.04}s` }}
            >
              <AlbumArt color={album.color} size={80} className="mb-2 group-hover:opacity-80 transition-opacity" />
              <p className="text-xs font-medium truncate" style={{ maxWidth: 80, color: 'var(--needle-cream)' }}>
                {album.title}
              </p>
              <p className="text-xs truncate" style={{ maxWidth: 80, color: 'var(--needle-muted)' }}>
                {album.artist.split(' ').slice(-1)[0]}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Activity feed */}
      <section>
        <SectionLabel>Friends are listening</SectionLabel>
        <div className="flex flex-col gap-3">
          {FEED.map((item, i) => {
            const album = item.albumId ? getAlbum(item.albumId) : null
            return (
              <div
                key={item.id}
                className={`card p-4 fade-up-delay-${Math.min(i + 1, 4)}`}
              >
                <div className="flex gap-3">
                  <Avatar initials={item.user.initials} colorClass={item.user.colorClass} size={34} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-medium" style={{ color: 'var(--needle-purple)', cursor: 'pointer' }}>
                        {item.user.handle}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--needle-muted)' }}>
                        {item.type === 'logged' && 'logged'}
                        {item.type === 'reviewed' && 'reviewed'}
                        {item.type === 'listed' && 'added to a list'}
                        {' · '}
                        {item.timeAgo}
                      </span>
                    </div>

                    {album && (
                      <Link href={`/album/${album.id}`} style={{ textDecoration: 'none' }}>
                        <div className="flex gap-3 items-center mb-3 group">
                          <AlbumArt color={album.color} size={52} className="group-hover:opacity-80 transition-opacity" />
                          <div>
                            <p className="text-sm font-medium" style={{ color: 'var(--needle-cream)' }}>{album.title}</p>
                            <p className="text-xs mt-0.5" style={{ color: 'var(--needle-muted)' }}>
                              {album.artist} · {album.year}
                            </p>
                            {item.rating && <Stars rating={item.rating} size={12} />}
                          </div>
                        </div>
                      </Link>
                    )}

                    {item.type === 'listed' && (
                      <p className="text-sm mb-3" style={{ color: 'var(--needle-muted)' }}>
                        Added{' '}
                        <span style={{ color: 'var(--needle-cream)' }}>{album?.title}</span>
                        {' '}to{' '}
                        <span style={{ color: 'var(--needle-purple)', cursor: 'pointer' }}>
                          "{item.listName}"
                        </span>
                      </p>
                    )}

                    {item.review && (
                      <p className="text-sm mb-3 italic" style={{ color: 'var(--needle-muted)', lineHeight: 1.6 }}>
                        {item.review}
                      </p>
                    )}

                    <div className="flex gap-4">
                      <button className="text-xs transition-colors hover:opacity-100" style={{ color: 'var(--needle-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        ♡ {item.likes}
                      </button>
                      <button className="text-xs transition-colors hover:opacity-100" style={{ color: 'var(--needle-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
