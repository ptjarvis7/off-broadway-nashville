'use client'

import { useState, useMemo } from 'react'
import type { Venue } from '@/types'
import VenueCard from './VenueCard'

interface Props {
  venues: Venue[]
  neighborhoods: string[]
  venueTypes: string[]
  genres: string[]
  bestForTags: string[]
}

export default function VenuesDirectory({ venues, neighborhoods, venueTypes, genres, bestForTags }: Props) {
  const [search, setSearch] = useState('')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedBestFor, setSelectedBestFor] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    return venues.filter(v => {
      if (search && !v.name.toLowerCase().includes(search.toLowerCase()) &&
        !v.shortDescription.toLowerCase().includes(search.toLowerCase()) &&
        !v.neighborhood.toLowerCase().includes(search.toLowerCase())) return false
      if (selectedNeighborhood && v.neighborhood !== selectedNeighborhood) return false
      if (selectedType && !v.venueTypeTags.includes(selectedType)) return false
      if (selectedGenre && !v.genreTags.includes(selectedGenre)) return false
      if (selectedBestFor && !v.bestForTags.includes(selectedBestFor)) return false
      return true
    })
  }, [venues, search, selectedNeighborhood, selectedType, selectedGenre, selectedBestFor])

  const hasFilters = selectedNeighborhood || selectedType || selectedGenre || selectedBestFor || search

  function clearFilters() {
    setSearch('')
    setSelectedNeighborhood('')
    setSelectedType('')
    setSelectedGenre('')
    setSelectedBestFor('')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search venues..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 border border-border rounded px-4 py-2.5 text-sm bg-white text-ink placeholder-stone-400 focus:outline-none focus:border-accent"
        />
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className={`btn-outline flex items-center gap-2 ${filtersOpen ? 'border-accent text-accent' : ''}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          Filters
        </button>
      </div>

      {filtersOpen && (
        <div className="bg-white border border-border rounded-lg p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="section-label block mb-2">Neighborhood</label>
            <select value={selectedNeighborhood} onChange={e => setSelectedNeighborhood(e.target.value)} className="w-full border border-border rounded px-3 py-2 text-sm bg-white text-ink focus:outline-none focus:border-accent">
              <option value="">All neighborhoods</option>
              {neighborhoods.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="section-label block mb-2">Venue Type</label>
            <select value={selectedType} onChange={e => setSelectedType(e.target.value)} className="w-full border border-border rounded px-3 py-2 text-sm bg-white text-ink focus:outline-none focus:border-accent">
              <option value="">All types</option>
              {venueTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="section-label block mb-2">Genre</label>
            <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)} className="w-full border border-border rounded px-3 py-2 text-sm bg-white text-ink focus:outline-none focus:border-accent">
              <option value="">All genres</option>
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="section-label block mb-2">Best For</label>
            <select value={selectedBestFor} onChange={e => setSelectedBestFor(e.target.value)} className="w-full border border-border rounded px-3 py-2 text-sm bg-white text-ink focus:outline-none focus:border-accent">
              <option value="">Any experience</option>
              {bestForTags.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
      )}

      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="text-xs text-muted">Filtering by:</span>
          {selectedNeighborhood && <button onClick={() => setSelectedNeighborhood('')} className="tag-pill-accent flex items-center gap-1">{selectedNeighborhood} <span>×</span></button>}
          {selectedType && <button onClick={() => setSelectedType('')} className="tag-pill-accent flex items-center gap-1">{selectedType} <span>×</span></button>}
          {selectedGenre && <button onClick={() => setSelectedGenre('')} className="tag-pill-accent flex items-center gap-1">{selectedGenre} <span>×</span></button>}
          {selectedBestFor && <button onClick={() => setSelectedBestFor('')} className="tag-pill-accent flex items-center gap-1">{selectedBestFor} <span>×</span></button>}
          <button onClick={clearFilters} className="text-xs text-muted hover:text-accent underline ml-1">Clear all</button>
        </div>
      )}

      <div className="text-sm text-muted mb-6">
        {filtered.length === venues.length ? `Showing all ${venues.length} venues` : `${filtered.length} of ${venues.length} venues`}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(venue => <VenueCard key={venue.id} venue={venue} />)}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🎵</div>
          <div className="font-display text-xl text-ink mb-2">No venues found</div>
          <p className="text-muted text-sm mb-4">Try adjusting your filters or clearing the search.</p>
          <button onClick={clearFilters} className="btn-primary">Clear filters</button>
        </div>
      )}
    </div>
  )
}
