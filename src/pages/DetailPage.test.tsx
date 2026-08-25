import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { DetailPage } from './DetailPage'

const named = (name: string) => ({
  name,
  url: `https://pokeapi.co/api/v2/resource/${name}/`,
})

const mockPokemon = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  base_experience: 112,
  sprites: {
    front_default: 'https://example.com/pikachu.png',
    other: { 'official-artwork': { front_default: 'https://example.com/pikachu-art.png' } },
  },
  types: [{ slot: 1, type: named('electric') }],
  abilities: [{ ability: named('static'), is_hidden: false, slot: 1 }],
  moves: [{ move: named('thunder-shock') }],
  forms: [named('pikachu')],
  species: named('pikachu'),
}

const mockSpecies = {
  id: 25,
  name: 'pikachu',
  base_happiness: 50,
  capture_rate: 190,
  gender_rate: 4,
  hatch_counter: 10,
  color: named('yellow'),
  shape: named('quadruped'),
  habitat: named('forest'),
  generation: named('generation-i'),
  growth_rate: named('medium'),
  egg_groups: [named('ground')],
  evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/10/' },
  flavor_text_entries: [
    {
      flavor_text: 'When several of these POKéMON gather, their electricity can cause lightning storms.',
      language: named('en'),
      version: named('red'),
    },
  ],
}

const mockEvolution = {
  id: 10,
  chain: {
    species: named('pichu'),
    evolves_to: [
      {
        species: named('pikachu'),
        evolves_to: [{ species: named('raichu'), evolves_to: [] }],
      },
    ],
  },
}

function jsonOk(data: unknown) {
  return Promise.resolve({ ok: true, json: () => Promise.resolve(data) })
}

describe('DetailPage', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn((input: RequestInfo | URL) => {
        const url = String(input)

        if (url.includes('/encounters')) return jsonOk([])
        if (url.includes('/pokemon/pikachu') && !url.includes('species') && !url.includes('form')) {
          return jsonOk(mockPokemon)
        }
        if (url.includes('/pokemon-species/pikachu')) return jsonOk(mockSpecies)
        if (url.includes('/evolution-chain/')) return jsonOk(mockEvolution)
        if (url.includes('/type/electric')) {
          return jsonOk({
            id: 13,
            name: 'electric',
            damage_relations: {
              double_damage_from: [named('ground')],
              double_damage_to: [named('water')],
              half_damage_from: [],
              half_damage_to: [],
              no_damage_from: [],
              no_damage_to: [],
            },
          })
        }
        if (url.includes('/ability/static')) {
          return jsonOk({
            id: 9,
            name: 'static',
            effect_entries: [
              { effect: '...', short_effect: 'May paralyze on contact.', language: named('en') },
            ],
          })
        }
        if (url.includes('/move/thunder-shock')) {
          return jsonOk({
            id: 84,
            name: 'thunder-shock',
            accuracy: 100,
            power: 40,
            pp: 30,
            priority: 0,
            type: named('electric'),
            damage_class: named('special'),
            effect_entries: [
              { effect: '...', short_effect: 'May paralyze the target.', language: named('en') },
            ],
          })
        }
        if (url.includes('/growth-rate/medium')) {
          return jsonOk({
            id: 2,
            name: 'medium',
            descriptions: [{ description: 'Medium', language: named('en') }],
            levels: [
              { level: 50, experience: 125000 },
              { level: 100, experience: 1000000 },
            ],
          })
        }
        if (url.includes('/egg-group/ground')) {
          return jsonOk({
            id: 5,
            name: 'ground',
            pokemon_species: [named('pikachu')],
          })
        }
        if (url.includes('/pokemon-form/pikachu')) {
          return jsonOk({
            id: 25,
            name: 'pikachu',
            form_name: '',
            is_default: true,
            is_battle_only: false,
            is_mega: false,
            sprites: { front_default: 'https://example.com/pikachu.png' },
          })
        }

        return Promise.resolve({ ok: false, status: 404, json: () => Promise.resolve({}) })
      }),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  function renderDetail() {
    return render(
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <Routes>
          <Route path="/pokemon/:name" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>,
    )
  }

  it('shows loading then renders detail sections', async () => {
    renderDetail()

    expect(screen.getByText(/loading pikachu/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Overview' })).toBeInTheDocument()
    })

    expect(screen.getByRole('heading', { name: 'Species' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Evolution chain' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Type matchups' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Abilities' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Signature move' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Encounters' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Growth rate' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Egg groups' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Forms' })).toBeInTheDocument()
  })

  it('links back to the list', async () => {
    renderDetail()

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Overview' })).toBeInTheDocument()
    })

    expect(screen.getByRole('link', { name: /back to list/i })).toHaveAttribute('href', '/')
  })
})
