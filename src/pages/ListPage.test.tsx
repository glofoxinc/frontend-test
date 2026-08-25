import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ListPage } from './ListPage'

const listResponse = {
  count: 1351,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=151&limit=151',
  previous: null,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
  ],
}

function pokemonStub(name: string, id: number) {
  return {
    id,
    name,
    height: 7,
    weight: 69,
    base_experience: 64,
    sprites: { front_default: `https://example.com/${name}.png` },
    types: [{ slot: 1, type: { name: 'normal', url: '' } }],
    abilities: [],
    moves: [],
    forms: [],
    species: { name, url: '' },
  }
}

describe('ListPage', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn((input: RequestInfo | URL) => {
        const url = String(input)
        if (url.includes('/pokemon?')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(listResponse),
          })
        }
        const match = url.match(/\/pokemon\/([a-z-]+)(?:\?|$)/)
        if (match) {
          const name = match[1]
          const id = name === 'bulbasaur' ? 1 : name === 'charmander' ? 4 : 7
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(pokemonStub(name, id)),
          })
        }
        return Promise.resolve({ ok: false, status: 404, json: () => Promise.resolve({}) })
      }),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows loading then renders Pokémon names', async () => {
    render(
      <MemoryRouter>
        <ListPage />
      </MemoryRouter>,
    )

    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
    })
    expect(screen.getByText('Charmander')).toBeInTheDocument()
    expect(screen.getByText('Squirtle')).toBeInTheDocument()
  })

  it('filters the list when searching', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <ListPage />
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
    })

    await user.type(screen.getByPlaceholderText(/search/i), 'char')

    expect(screen.getByText('Charmander')).toBeInTheDocument()
    expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument()
    expect(screen.queryByText('Squirtle')).not.toBeInTheDocument()
  })
})
