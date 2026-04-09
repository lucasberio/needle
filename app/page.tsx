import { FEED, ALBUMS, getAlbum } from '@/lib/data'
import { AlbumArt, Stars, Avatar } from '@/components/ui'
import Link from 'next/link'

export default function FeedPage() {
  const popular = ALBUMS.slice(0, 8)

  return (
    <div className="fade-up">
      {/* Popular shelf */}
      <section className="mb-10">
        <p className="section-label">Popular this week</p>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
          {popular.map((album) => (
            <Link href={`/album/${album.id}`} key={album.id} className="flex-shrink-0 text-center group" style={{ textDecoration: 'none' }}>
              <AlbumArt color={album.color} size={96} className="mb-2 group-hover:opacity-75 transition-opacity" />
              <p className="text-sm font-medium truncate" style={{ maxWidth: 96, color: '#fff' }}>{album.title}</p>
              <p className="text-xs truncate mt-0.5" style={{ maxWidth: 96, color: '#777' }}>{album.artist.split(' ').slice(-1)[0]}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Feed - two column on wide screens */}
      <section>
        <p className="section-label">Friends are listening</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {FEED.map((item, i) => {
            const album = item.albumId ? getAlbum(item.albumId) : null
            return (
              <div key={item.id} className={`card p-5 fade-up-delay-${Math.min(i + 1, 4)}`}>
                <div className="flex gap-3">
                  <Avatar initials={item.user.initials} colorClass={item.user.colorClass} size={38} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-medium" style={{ color: 'var(--n-red)', cursor: 'pointer', fontSize: 15 }}>
                        {item.user.handle}
                      </span>
                      <span className="text-sm" style={{ color: '#666' }}>
                        {item.type === 'logged' && 'logged'}
                        {item.type === 'reviewed' && 'reviewed'}
                        {item.type === 'listed' && 'added to list'}
                        {' · '}{item.timeAgo}
                      </span>
                    </div>

                    {album && (
                      <Link href={`/album/${album.id}`} style={{ textDecoration: 'none' }}>
                        <div className="flex gap-3 items-center mb-3 group">
                          <AlbumArt color={album.color} size={58} className="group-hover:opacity-75 transition-opacity" />
                          <div>
                            <p className="font-medium" style={{ fontSize: 16, color: '#fff' }}>{album.title}</p>
                            <p className="text-sm mt-0.5" style={{ color: '#888' }}>{album.artist} · {album.year}</p>
                            {item.rating && <Stars rating={item.rating} size={13} />}
                          </div>
                        </div>
                      </Link>
                    )}

                    {item.type === 'listed' && (
                      <p className="text-sm mb-3" style={{ color: '#aaa' }}>
                        Added <span style={{ color: '#fff' }}>{album?.title}</span> to{' '}
                        <span style={{ color: 'var(--n-red)', cursor: 'pointer' }}>"{item.listName}"</span>
                      </p>
                    )}

                    {item.review && (
                      <p className="text-sm mb-3 italic" style={{ color: '#aaa', lineHeight: 1.6 }}>{item.review}</p>
                    )}

                    <div className="flex gap-5">
                      <button className="text-sm" style={{ color: '#666', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>♡ {item.likes}</button>
                      <button className="text-sm" style={{ color: '#666', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Reply</button>
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
