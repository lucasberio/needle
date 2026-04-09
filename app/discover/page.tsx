'use client'
import { useState } from 'react'
import { ALBUMS, GENRES } from '@/lib/data'
import { AlbumArt, Stars, Badge } from '@/components/ui'
import Link from 'next/link'

export default function DiscoverPage() {
  const [activeGenre, setActiveGenre] = useState('All')

  const filtered = activeGenre === 'All'
    ? ALBUMS
    : ALBUMS.filter(a => a.genre.some(g => g.toLowerCase().includes(activeGenre.toLowerCase())))

  const topRated = [...ALBUMS].sort((a, b) => b.communityRating - a.communityRating).slice(0, 9)
  const because = ALBUMS.filter(a => a.genre.includes('Art Rock') || a.genre.includes('Shoegaze') || a.genre.includes('Alternative')).slice(0, 4)

  return (
    <div className="fade-up">
      <section className="mb-10">
        <p className="section-label">Browse by genre</p>
        <div className="flex flex-wrap gap-2">
          {GENRES.map(genre => (
            <button key={genre} onClick={() => setActiveGenre(genre)} className={`pill ${activeGenre === genre ? 'active' : ''}`}>
              {genre}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <p className="section-label">Highest rated · all time</p>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {(activeGenre === 'All' ? topRated : filtered.slice(0, 9)).map(album => (
            <Link key={album.id} href={`/album/${album.id}`} style={{ textDecoration: 'none' }}>
              <div className="card overflow-hidden group cursor-pointer">
                <AlbumArt color={album.color} size={0} className="w-full aspect-square rounded-none rounded-t-xl group-hover:opacity-75 transition-opacity" />
                <div className="p-3">
                  <p className="text-sm font-medium truncate" style={{ color: '#fff' }}>{album.title}</p>
                  <p className="text-xs truncate mt-0.5" style={{ color: '#888' }}>{album.artist}</p>
                  <p className="text-sm mt-1 font-medium" style={{ color: 'var(--n-red)' }}>★ {album.communityRating.toFixed(1)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <p className="section-label">Because you liked Radiohead</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {because.map(album => (
            <Link key={album.id} href={`/album/${album.id}`} style={{ textDecoration: 'none' }}>
              <div className="card p-4 flex items-center gap-4 group cursor-pointer">
                <AlbumArt color={album.color} size={52} className="group-hover:opacity-75 transition-opacity" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium" style={{ fontSize: 15, color: '#fff' }}>{album.title}</p>
                  <p className="text-sm mt-0.5" style={{ color: '#888' }}>{album.artist} · {album.year}</p>
                </div>
                <Badge variant="red">Similar vibe</Badge>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <p className="section-label">New releases · 2024</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ALBUMS.filter(a => a.year === 2024).map(album => (
            <Link key={album.id} href={`/album/${album.id}`} style={{ textDecoration: 'none' }}>
              <div className="card p-4 flex items-center gap-4 group">
                <AlbumArt color={album.color} size={52} className="group-hover:opacity-75 transition-opacity" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium" style={{ fontSize: 15, color: '#fff' }}>{album.title}</p>
                  <p className="text-sm mt-0.5" style={{ color: '#888' }}>{album.artist}</p>
                </div>
                <div className="text-right">
                  <Stars rating={Math.round(album.communityRating)} size={12} />
                  <p className="text-xs mt-1" style={{ color: '#777' }}>{(album.totalListens / 1000).toFixed(0)}k listens</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
