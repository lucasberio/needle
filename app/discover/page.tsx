'use client'
import { useState } from 'react'
import { ALBUMS, GENRES } from '@/lib/data'
import { AlbumArt, Stars, SectionLabel, Badge } from '@/components/ui'
import Link from 'next/link'

export default function DiscoverPage() {
  const [activeGenre, setActiveGenre] = useState('All')

  const filtered = activeGenre === 'All'
    ? ALBUMS
    : ALBUMS.filter(a => a.genre.some(g => g.toLowerCase().includes(activeGenre.toLowerCase())))

  const topRated = [...ALBUMS].sort((a, b) => b.communityRating - a.communityRating).slice(0, 6)
  const because = ALBUMS.filter(a => a.genre.includes('Art Rock') || a.genre.includes('Alternative') || a.genre.includes('Shoegaze')).slice(0, 3)

  return (
    <div className="fade-up">
      {/* Genre filter */}
      <section className="mb-8">
        <SectionLabel>Browse by genre</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {GENRES.map(genre => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`pill ${activeGenre === genre ? 'active' : ''}`}
            >
              {genre}
            </button>
          ))}
        </div>
      </section>

      {/* Top rated grid */}
      <section className="mb-8">
        <SectionLabel>Highest rated · all time</SectionLabel>
        <div className="grid grid-cols-3 gap-3">
          {(activeGenre === 'All' ? topRated : filtered.slice(0, 6)).map(album => (
            <Link key={album.id} href={`/album/${album.id}`} style={{ textDecoration: 'none' }}>
              <div className="card overflow-hidden group cursor-pointer">
                <AlbumArt color={album.color} size={0} className="w-full aspect-square rounded-none rounded-t-xl group-hover:opacity-80 transition-opacity" />
                <div className="p-2">
                  <p className="text-xs font-medium truncate" style={{ color: 'var(--needle-cream)' }}>{album.title}</p>
                  <p className="text-xs truncate" style={{ color: 'var(--needle-muted)' }}>{album.artist}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--needle-gold)' }}>
                    ★ {album.communityRating.toFixed(1)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Because you liked */}
      <section className="mb-8">
        <SectionLabel>Because you liked Radiohead</SectionLabel>
        <div className="flex flex-col gap-2">
          {because.map(album => (
            <Link key={album.id} href={`/album/${album.id}`} style={{ textDecoration: 'none' }}>
              <div className="card p-3 flex items-center gap-3 group cursor-pointer">
                <AlbumArt color={album.color} size={44} className="group-hover:opacity-80 transition-opacity" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: 'var(--needle-cream)' }}>{album.title}</p>
                  <p className="text-xs" style={{ color: 'var(--needle-muted)' }}>{album.artist} · {album.year}</p>
                </div>
                <Badge variant="purple">Similar vibe</Badge>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New releases */}
      <section>
        <SectionLabel>New releases · 2024</SectionLabel>
        <div className="flex flex-col gap-2">
          {ALBUMS.filter(a => a.year === 2024).map(album => (
            <Link key={album.id} href={`/album/${album.id}`} style={{ textDecoration: 'none' }}>
              <div className="card p-3 flex items-center gap-3 group">
                <AlbumArt color={album.color} size={44} className="group-hover:opacity-80 transition-opacity" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: 'var(--needle-cream)' }}>{album.title}</p>
                  <p className="text-xs" style={{ color: 'var(--needle-muted)' }}>{album.artist}</p>
                </div>
                <div className="text-right">
                  <Stars rating={Math.round(album.communityRating)} size={11} />
                  <p className="text-xs mt-1" style={{ color: 'var(--needle-muted)' }}>
                    {(album.totalListens / 1000).toFixed(0)}k listens
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
