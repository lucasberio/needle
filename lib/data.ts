export type Album = {
  id: string
  title: string
  artist: string
  year: number
  genre: string[]
  color: string
  communityRating: number
  totalListens: number
}

export type DiaryEntry = {
  id: string
  albumId: string
  date: string
  rating: number
  review?: string
  tags?: string[]
  relisten?: boolean
}

export type FeedItem = {
  id: string
  user: { handle: string; initials: string; colorClass: string }
  type: 'logged' | 'reviewed' | 'listed'
  albumId?: string
  listName?: string
  rating?: number
  review?: string
  likes: number
  timeAgo: string
}

export const ALBUMS: Album[] = [
  { id: 'in-rainbows', title: 'In Rainbows', artist: 'Radiohead', year: 2007, genre: ['Art Rock', 'Indie'], color: '#1a1a2e', communityRating: 4.6, totalListens: 84210 },
  { id: 'brat', title: 'BRAT', artist: 'Charli XCX', year: 2024, genre: ['Pop', 'Electronic'], color: '#1a2e1a', communityRating: 4.3, totalListens: 61430 },
  { id: 'to-pimp', title: 'To Pimp a Butterfly', artist: 'Kendrick Lamar', year: 2015, genre: ['Hip-hop', 'Jazz Rap'], color: '#2a1a3e', communityRating: 4.7, totalListens: 102300 },
  { id: 'blue', title: 'Blue', artist: 'Joni Mitchell', year: 1971, genre: ['Folk', 'Singer-songwriter'], color: '#1a2030', communityRating: 4.5, totalListens: 55100 },
  { id: 'loveless', title: 'Loveless', artist: 'My Bloody Valentine', year: 1991, genre: ['Shoegaze', 'Indie'], color: '#3a1a1a', communityRating: 4.5, totalListens: 48700 },
  { id: 'illinois', title: 'Illinois', artist: 'Sufjan Stevens', year: 2005, genre: ['Folk', 'Indie'], color: '#1e1e2e', communityRating: 4.5, totalListens: 42200 },
  { id: 'kind-of-blue', title: 'Kind of Blue', artist: 'Miles Davis', year: 1959, genre: ['Jazz'], color: '#102030', communityRating: 4.4, totalListens: 38900 },
  { id: 'ok-computer', title: 'OK Computer', artist: 'Radiohead', year: 1997, genre: ['Art Rock', 'Alternative'], color: '#0f3460', communityRating: 4.7, totalListens: 91800 },
  { id: 'guts', title: 'GUTS', artist: 'Olivia Rodrigo', year: 2023, genre: ['Pop', 'Rock'], color: '#2a1020', communityRating: 4.1, totalListens: 78200 },
  { id: 'imaginal-disk', title: 'Imaginal Disk', artist: 'Magdalena Bay', year: 2024, genre: ['Synth-pop', 'Electronic'], color: '#1a2030', communityRating: 4.4, totalListens: 34100 },
  { id: 'javelin', title: 'Javelin', artist: 'Sufjan Stevens', year: 2023, genre: ['Folk', 'Chamber Pop'], color: '#2a1a0a', communityRating: 4.3, totalListens: 28500 },
  { id: 'bright-future', title: 'Bright Future', artist: 'Adrianne Lenker', year: 2024, genre: ['Folk'], color: '#1a0a0a', communityRating: 4.2, totalListens: 18700 },
  { id: 'charm', title: 'Charm', artist: 'Clairo', year: 2024, genre: ['Indie Pop', 'Soul'], color: '#2d1b4e', communityRating: 4.0, totalListens: 29800 },
  { id: 'short-n-sweet', title: "Short n' Sweet", artist: 'Sabrina Carpenter', year: 2024, genre: ['Pop'], color: '#1c3a1c', communityRating: 4.0, totalListens: 67200 },
  { id: 'manning-fire', title: 'GNX', artist: 'Kendrick Lamar', year: 2024, genre: ['Hip-hop'], color: '#3d2020', communityRating: 4.5, totalListens: 89300 },
]

export const DIARY: DiaryEntry[] = [
  { id: 'd1', albumId: 'brat', date: '2026-04-06', rating: 5, review: 'Vampire hits differently at 2am.', tags: ['Late night'] },
  { id: 'd2', albumId: 'javelin', date: '2026-04-02', rating: 4, tags: ['First listen'] },
  { id: 'd3', albumId: 'imaginal-disk', date: '2026-03-31', rating: 5, review: 'The album of the year, maybe the decade.', tags: ['Road trip'] },
  { id: 'd4', albumId: 'bright-future', date: '2026-03-22', rating: 4, tags: ['Late night'] },
  { id: 'd5', albumId: 'ok-computer', date: '2026-03-18', rating: 5, review: 'Still sounds like the future.', tags: ['Relisten'] },
  { id: 'd6', albumId: 'blue', date: '2026-03-10', rating: 5, tags: ['First listen'] },
  { id: 'd7', albumId: 'in-rainbows', date: '2026-02-28', rating: 5, tags: ['Relisten'] },
  { id: 'd8', albumId: 'charm', date: '2026-02-14', rating: 4, tags: ['Late night'] },
  { id: 'd9', albumId: 'to-pimp', date: '2026-02-01', rating: 5, review: 'A masterpiece. Every single time.', tags: ['Relisten'] },
]

export const FEED: FeedItem[] = [
  {
    id: 'f1',
    user: { handle: 'mlouis', initials: 'ML', colorClass: 'text-emerald-400 bg-emerald-900/40' },
    type: 'logged',
    albumId: 'guts',
    rating: 4,
    review: '"Vampire hits differently at 2am. Best pop record of the year."',
    likes: 12,
    timeAgo: '3h ago',
  },
  {
    id: 'f2',
    user: { handle: 'tunes_kira', initials: 'TK', colorClass: 'text-amber-400 bg-amber-900/40' },
    type: 'listed',
    albumId: 'illinois',
    listName: 'Albums that wrecked me',
    likes: 7,
    timeAgo: '5h ago',
  },
  {
    id: 'f3',
    user: { handle: 'jakedisc', initials: 'JD', colorClass: 'text-purple-300 bg-purple-900/40' },
    type: 'reviewed',
    albumId: 'ok-computer',
    rating: 5,
    review: '"25 years later and Paranoid Android still sounds like it\'s from the future."',
    likes: 34,
    timeAgo: 'yesterday',
  },
  {
    id: 'f4',
    user: { handle: 'waveform99', initials: 'WF', colorClass: 'text-blue-300 bg-blue-900/40' },
    type: 'logged',
    albumId: 'imaginal-disk',
    rating: 5,
    review: '"Magdalena Bay just made a prog-pop concept album for the TikTok generation and somehow it slaps."',
    likes: 21,
    timeAgo: '2 days ago',
  },
]

export const GENRE_STATS = [
  { genre: 'Indie rock', count: 34, pct: 80 },
  { genre: 'Electronic', count: 23, pct: 55 },
  { genre: 'Folk', count: 16, pct: 38 },
  { genre: 'Hip-hop', count: 12, pct: 28 },
  { genre: 'Jazz', count: 7, pct: 16 },
]

export const MONTHLY_ACTIVITY = [3, 5, 4, 7, 5, 8, 7, 4, 3, 6, 8, 4]

export const USER_LISTS = [
  { id: 'l1', name: 'Albums that wrecked me', count: 22, public: true },
  { id: 'l2', name: 'Best of 2024', count: 15, public: true },
  { id: 'l3', name: 'Late night drives', count: 11, public: false },
  { id: 'l4', name: 'Desert island 10', count: 10, public: true },
]

export function getAlbum(id: string): Album | undefined {
  return ALBUMS.find(a => a.id === id)
}

export const CONTEXT_TAGS = ['Road trip', 'Late night', 'First listen', 'Relisten', 'Concert', 'Morning', 'Study session', 'Heartbreak']
export const GENRES = ['All', 'Indie', 'Electronic', 'Hip-hop', 'Jazz', 'Folk', 'Pop', 'Metal', 'R&B', 'Classical']
