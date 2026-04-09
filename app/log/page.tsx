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
    : ALBUMS.slice(0, 5)

  function toggleTag(tag: string) {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  function handleSave() {
    if (!selectedId || !rating) return
    setSaved(true)
    setTimeout(() => router.push('/diary'), 1200)
  }

  return (
    <div className="fade-up">
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: '#fff', letterSpacing: '0.04em', lineHeight: 1, marginBottom: 6 }}>
        LOG AN ALBUM
      </h1>
      <p className="mb-8" style={{ fontSize: 15, color: '#888' }}>Add an album to your listening diary.</p>

      {saved ? (
        <div className="card p-12 text-center">
          <p style={{ fontSize: 48, marginBottom: 12 }}>✓</p>
          <p className="font-medium" style={{ fontSize: 18, color: '#fff' }}>Saved to your diary</p>
          <p className="text-sm mt-2" style={{ color: '#888' }}>Redirecting...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: album search */}
          <div>
            <label className="block text-xs mb-2 section-label">Album</label>
            <input type="text" placeholder="Search by album or artist..." value={query} onChange={e => setQuery(e.target.value)} autoFocus />
            <div className="flex flex-col gap-2 mt-3">
              {results.map(album => (
                <button key={album.id} onClick={() => setSelectedId(album.id)}
                  className="flex items-center gap-4 p-3 rounded-xl text-left transition-all"
                  style={{
                    background: selectedId === album.id ? 'rgba(255,31,51,0.1)' : 'var(--n-dark)',
                    border: selectedId === album.id ? '1px solid rgba(255,31,51,0.5)' : '1px solid rgba(255,255,255,0.07)',
                    cursor: 'pointer',
                  }}>
                  <AlbumArt color={album.color} size={44} />
                  <div>
                    <p className="font-medium" style={{ fontSize: 15, color: '#fff' }}>{album.title}</p>
                    <p className="text-sm" style={{ color: '#888' }}>{album.artist} · {album.year}</p>
                  </div>
                  {selectedId === album.id && (
                    <span className="ml-auto text-xs px-2 py-1 rounded" style={{ background: 'rgba(255,31,51,0.2)', color: '#ff6b78' }}>Selected</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: details */}
          <div className="flex flex-col gap-6">
            <div>
              <label className="block section-label mb-3">Rating</label>
              <StarPicker value={rating} onChange={setRating} />
            </div>

            <div>
              <label className="block section-label mb-2">Date listened</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>

            <div>
              <label className="block section-label mb-2">
                Review <span style={{ color: '#555', textTransform: 'none', fontSize: 12, letterSpacing: 0 }}>— optional</span>
              </label>
              <textarea placeholder="What did you think?" value={review} onChange={e => setReview(e.target.value)} style={{ height: 100, resize: 'none' }} />
            </div>

            <div>
              <label className="block section-label mb-2">Context</label>
              <div className="flex flex-wrap gap-2">
                {CONTEXT_TAGS.map(tag => (
                  <button key={tag} onClick={() => toggleTag(tag)} className={`pill ${tags.includes(tag) ? 'active' : ''}`}>{tag}</button>
                ))}
              </div>
            </div>

            <button onClick={handleSave} className="btn btn-primary w-full"
              style={{ padding: '14px', fontSize: 16, opacity: (!selectedId || !rating) ? 0.4 : 1 }}
              disabled={!selectedId || !rating}>
              Save to diary
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
