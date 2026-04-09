'use client'
import { useState } from 'react'
import { ALBUMS, CONTEXT_TAGS } from '@/lib/data'
import { AlbumArt, StarPicker } from '@/components/ui'
import { useRouter } from 'next/navigation'

export default function LogPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [date, setDate] = useState('2026-04-08')
  const [tags, setTags] = useState<string[]>([])
  const [saved, setSaved] = useState(false)

  const results = query.length > 0
    ? ALBUMS.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.artist.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : ALBUMS.slice(0, 4)

  const selected = ALBUMS.find(a => a.id === selectedId)

  function toggleTag(tag: string) {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  function handleSave() {
    if (!selectedId || !rating) return
    setSaved(true)
    setTimeout(() => router.push('/diary'), 1200)
  }

  return (
    <div className="fade-up max-w-lg mx-auto">
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--needle-cream)', marginBottom: 6 }}>
        Log an album
      </h1>
      <p className="text-sm mb-6" style={{ color: 'var(--needle-muted)' }}>
        Add an album to your listening diary.
      </p>

      {saved ? (
        <div className="card p-8 text-center">
          <div style={{ fontSize: 36, marginBottom: 12 }}>✓</div>
          <p className="font-medium" style={{ color: 'var(--needle-cream)' }}>Saved to your diary</p>
          <p className="text-sm mt-1" style={{ color: 'var(--needle-muted)' }}>Redirecting...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">

          {/* Search */}
          <div>
            <label className="block text-xs mb-2" style={{ color: 'var(--needle-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Album
            </label>
            <input
              type="text"
              placeholder="Search by album or artist..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              autoFocus
            />
            <div className="flex flex-col gap-1 mt-2">
              {results.map(album => (
                <button
                  key={album.id}
                  onClick={() => setSelectedId(album.id)}
                  className="flex items-center gap-3 p-2 rounded-xl text-left transition-all"
                  style={{
                    background: selectedId === album.id ? 'rgba(108,92,231,0.15)' : 'var(--needle-dark-3)',
                    border: selectedId === album.id ? '1px solid rgba(108,92,231,0.5)' : '1px solid rgba(255,255,255,0.06)',
                    cursor: 'pointer',
                  }}
                >
                  <AlbumArt color={album.color} size={38} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--needle-cream)' }}>{album.title}</p>
                    <p className="text-xs" style={{ color: 'var(--needle-muted)' }}>{album.artist} · {album.year}</p>
                  </div>
                  {selectedId === album.id && (
                    <span className="ml-auto text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(108,92,231,0.3)', color: '#a99ff5' }}>
                      Selected
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs mb-2" style={{ color: 'var(--needle-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Rating
            </label>
            <StarPicker value={rating} onChange={setRating} />
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs mb-2" style={{ color: 'var(--needle-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Date listened
            </label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>

          {/* Review */}
          <div>
            <label className="block text-xs mb-2" style={{ color: 'var(--needle-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Review <span style={{ color: 'rgba(139,133,160,0.6)', textTransform: 'none', fontSize: 11 }}>— optional</span>
            </label>
            <textarea
              placeholder="What did you think?"
              value={review}
              onChange={e => setReview(e.target.value)}
              style={{ height: 80, resize: 'none' }}
            />
          </div>

          {/* Context tags */}
          <div>
            <label className="block text-xs mb-2" style={{ color: 'var(--needle-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Context
            </label>
            <div className="flex flex-wrap gap-2">
              {CONTEXT_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`pill ${tags.includes(tag) ? 'active' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            className="btn btn-primary w-full"
            style={{ padding: '12px', fontSize: 15, opacity: (!selectedId || !rating) ? 0.4 : 1 }}
            disabled={!selectedId || !rating}
          >
            Save to diary
          </button>
        </div>
      )}
    </div>
  )
}
