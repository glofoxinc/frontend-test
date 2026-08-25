import { useEffect, useState } from 'react'
import { fetchPokemonList, type NamedResource } from '../api/pokeapi'
import { PAGE_SIZE } from '../lib/pagination'
import { ListRow } from './ListRow'

function getIdFromUrl(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\/?$/)
  return match ? Number(match[1]) : 0
}

export function ListPage() {
  const [items, setItems] = useState<NamedResource[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    fetchPokemonList(PAGE_SIZE, 0).then((data) => {
      setItems(data.results)
      setLoading(false)
    })
  }, [])

  const filtered = items
    .filter((item) => item.name.includes(search.toLowerCase()))
    .sort((a, b) => getIdFromUrl(a.url) - getIdFromUrl(b.url))

  if (loading) {
    return (
      <div className="page">
        <header className="page-header">
          <h1>Pokédex</h1>
        </header>
        <div className="loading">Loading Pokémon...</div>
      </div>
    )
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Pokédex</h1>
        <p className="page-subtitle">
          Showing {filtered.length} of {items.length} Pokémon
        </p>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="list">
        {filtered.map((item, index) => (
          <ListRow key={index} name={item.name} />
        ))}
      </div>
    </div>
  )
}
